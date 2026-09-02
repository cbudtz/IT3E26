#!/usr/bin/env node
/**
 * Pull E22 Drive lesson slides + exercises into docs/background/lektionN/.
 * Usage: node pull.mjs [--force] <lessonNumber>
 */
import { mkdir, readFile, writeFile, access } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const UA = { 'User-Agent': 'Mozilla/5.0 (compatible; IT3E26-drive-pull/1.0)' };

const args = process.argv.slice(2);
const force = args.includes('--force');
const lessonArg = args.find((a) => a !== '--force');
if (!lessonArg || !/^\d{1,2}$/.test(lessonArg)) {
	console.error('Usage: node pull.mjs [--force] <lessonNumber>');
	process.exit(1);
}

const lessonNum = Number(lessonArg);
const lessonPad = String(lessonNum).padStart(2, '0');
const lessonDirName = `lektion${lessonNum}`;

const repoRoot = await findRepoRoot(fileURLToPath(import.meta.url));
const inventoryPath = join(repoRoot, 'docs/background/e22-drive-materials.md');
const outDir = join(repoRoot, 'docs/background', lessonDirName);

const folderId = await readFolderId(inventoryPath, lessonPad);
const folderUrl = `https://drive.google.com/drive/folders/${folderId}`;
console.error(`Folder: ${folderUrl}`);

const files = await listFolderFiles(folderId);
const slides = pickFile(files, 'presentation', /forel|slides|html/i);
const exercises = pickFile(files, 'document', /øvel|ovel|exercis/i);

if (!slides || !exercises) {
	console.error('Could not identify both slides and exercises.');
	console.error('Found:', files);
	process.exit(1);
}

const slidesText = await exportText(slides);
const exercisesText = await exportText(exercises);

await mkdir(outDir, { recursive: true });

const slidesPath = join(outDir, 'forelaesning.md');
const exercisesPath = join(outDir, 'oevelser.md');
const readmePath = join(outDir, 'README.md');

await writeUnlessExists(slidesPath, wrapMarkdown({
	title: slides.name,
	kind: 'Google Slides',
	url: slides.url,
	body: slidesText,
	slides: true
}));
await writeUnlessExists(exercisesPath, wrapMarkdown({
	title: exercises.name,
	kind: 'Google Docs',
	url: exercises.url,
	body: exercisesText,
	slides: false
}));
await writeUnlessExists(readmePath, buildReadme({
	lessonPad,
	slides,
	exercises
}));

console.log(`Wrote ${outDir}`);
console.log(`Slides: ${slides.name} (${slides.id})`);
console.log(`Exercises: ${exercises.name} (${exercises.id})`);
console.log('Next: fill Contents in README.md and add a row to docs/background/README.md');

async function findRepoRoot(startFile) {
	let dir = dirname(startFile);
	for (let i = 0; i < 8; i++) {
		try {
			await access(join(dir, 'docs/background/e22-drive-materials.md'));
			return dir;
		} catch {
			dir = dirname(dir);
		}
	}
	throw new Error('Could not find repo root (docs/background/e22-drive-materials.md)');
}

async function readFolderId(path, pad) {
	const md = await readFile(path, 'utf8');
	const re = new RegExp(
		String.raw`\[Lektion ${pad}\]\(https://drive\.google\.com/drive/folders/([^)]+)\)`
	);
	const match = md.match(re);
	if (!match) {
		throw new Error(`No Drive folder for Lektion ${pad} in ${path}`);
	}
	return match[1];
}

async function listFolderFiles(folderId) {
	const url = `https://drive.google.com/embeddedfolderview?id=${folderId}`;
	const html = await fetchText(url);
	const files = [];
	for (const block of html.split(/class="flip-entry"/).slice(1)) {
		const href = block.match(
			/href="https:\/\/docs\.google\.com\/(document|presentation)\/d\/([A-Za-z0-9_-]+)/
		);
		if (!href) continue;
		const kind = href[1];
		const id = href[2];
		if (files.some((f) => f.id === id)) continue;
		const title = block.match(/flip-entry-title">([^<]+)/);
		files.push({
			kind,
			id,
			name: decodeHtml(title?.[1]?.trim() || fallbackName(kind, id, html)),
			url: `https://docs.google.com/${kind}/d/${id}`
		});
	}
	if (files.length === 0) {
		throw new Error(`No Docs/Slides links in ${url}`);
	}
	return files;
}

function fallbackName(kind, id, html) {
	const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	const named = html.match(
		new RegExp(`(?:title|aria-label|data-tooltip)="([^"]+)"[^>]{0,200}${escaped}|${escaped}[^>]{0,200}(?:title|aria-label)="([^"]+)"`, 'i')
	);
	if (named?.[1] || named?.[2]) return named[1] || named[2];
	return kind === 'presentation' ? 'Forelæsning' : 'Øvelser';
}

function pickFile(files, kind, nameRe) {
	const ofKind = files.filter((f) => f.kind === kind);
	return ofKind.find((f) => nameRe.test(f.name)) || ofKind[0] || null;
}

async function exportText(file) {
	const url =
		file.kind === 'presentation'
			? `${file.url}/export/txt`
			: `${file.url}/export?format=txt`;
	const text = await fetchText(url);
	if (/^\s*<(!DOCTYPE|html|HTML)/.test(text)) {
		throw new Error(`Export returned HTML (file not public?): ${url}`);
	}
	return text.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n').trim() + '\n';
}

async function fetchText(url) {
	const res = await fetch(url, { headers: UA, redirect: 'follow' });
	if (!res.ok) {
		throw new Error(`HTTP ${res.status} for ${url}`);
	}
	return await res.text();
}

function wrapMarkdown({ title, kind, url, body, slides }) {
	const note = slides
		? '(exported as plain text; slide-break formatting from the original is lost, but\nall text content is preserved).'
		: null;
	const lines = [`# ${title}`, '', `Source: ${kind},`, url];
	if (note) lines.push(note);
	lines.push('', '---', '', body.replace(/\s+$/, ''), '');
	return lines.join('\n');
}

function buildReadme({ lessonPad, slides, exercises }) {
	return `# Lektion ${lessonPad} (E22) — old course materials

Full verbatim text pulled from the old course's Google Drive folder for
Lektion ${lessonPad}, referenced in [../e22-drive-materials.md](../e22-drive-materials.md).

| File | Contents | Source |
|---|---|---|
| [forelaesning.md](forelaesning.md) | Lecture slides (verbatim export — fill in topics) | Google Slides "${slides.name}" |
| [oevelser.md](oevelser.md) | Exercises (verbatim export — fill in topics) | Google Docs "${exercises.name}" |
`;
}

async function writeUnlessExists(path, contents) {
	if (!force) {
		try {
			await access(path);
			console.error(`Exists, skipping (use --force): ${path}`);
			return;
		} catch {
			// create
		}
	}
	await writeFile(path, contents, 'utf8');
}

function decodeHtml(s) {
	return s
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'");
}
