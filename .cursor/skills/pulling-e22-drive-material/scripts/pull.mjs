#!/usr/bin/env node
/**
 * Pull E22 Drive lesson slides + exercises into docs/background/lektionN/.
 * Usage: node pull.mjs [--force] <lessonNumber>
 */
import { mkdir, readFile, writeFile, access } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { inflateRawSync } from 'node:zlib';

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
const slides =
	pickFile(files, 'presentation', /forel|slides|html/i) ||
	pickFile(files, 'pptx', /forel|slides|\.pptx/i);
const exercises = pickFile(files, 'document', /øvel|ovel|exercis/i);

if (!slides && !exercises) {
	console.error('Could not identify slides or exercises.');
	console.error('Found:', files);
	process.exit(1);
}
if (!slides || !exercises) {
	console.error(`Partial folder: ${slides ? 'slides only' : 'exercises only'}.`);
}

await mkdir(outDir, { recursive: true });

if (slides) {
	await writeUnlessExists(join(outDir, 'forelaesning.md'), wrapMarkdown({
		title: slides.name,
		kind: slides.kind === 'pptx' ? 'PowerPoint' : 'Google Slides',
		url: slides.url,
		body: await exportText(slides),
		slides: true
	}));
}
if (exercises) {
	await writeUnlessExists(join(outDir, 'oevelser.md'), wrapMarkdown({
		title: exercises.name,
		kind: 'Google Docs',
		url: exercises.url,
		body: await exportText(exercises),
		slides: false
	}));
}
await writeUnlessExists(join(outDir, 'README.md'), buildReadme({
	lessonPad,
	slides,
	exercises
}));

console.log(`Wrote ${outDir}`);
if (slides) console.log(`Slides: ${slides.name} (${slides.id})`);
if (exercises) console.log(`Exercises: ${exercises.name} (${exercises.id})`);
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
		const title = block.match(/flip-entry-title">([^<]+)/);
		const name = decodeHtml(title?.[1]?.trim() || '');
		const doc = block.match(
			/href="https:\/\/docs\.google\.com\/(document|presentation)\/d\/([A-Za-z0-9_-]+)/
		);
		const upload = block.match(
			/href="https:\/\/drive\.google\.com\/file\/d\/([A-Za-z0-9_-]+)/
		);
		if (doc) {
			const kind = doc[1];
			const id = doc[2];
			if (files.some((f) => f.id === id)) continue;
			files.push({
				kind,
				id,
				name: name || fallbackName(kind, id, html),
				url: `https://docs.google.com/${kind}/d/${id}`
			});
			continue;
		}
		if (!upload) continue;
		const id = upload[1];
		if (files.some((f) => f.id === id)) continue;
		const alt = block.match(/alt="([^"]*)"/)?.[1] || '';
		if (!/\.pptx$/i.test(name) && !/powerpoint/i.test(alt)) {
			console.error(`Skipping unsupported upload: ${name || id}`);
			continue;
		}
		files.push({
			kind: 'pptx',
			id,
			name: name || 'Forelæsning.pptx',
			url: `https://drive.google.com/file/d/${id}`
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
	if (file.kind === 'pptx') return pptxToText(await fetchBuffer(file.id));
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

async function fetchBuffer(fileId) {
	const url = `https://drive.google.com/uc?export=download&id=${fileId}`;
	const res = await fetch(url, { headers: UA, redirect: 'follow' });
	if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
	const buf = Buffer.from(await res.arrayBuffer());
	if (buf.length < 4 || buf.readUInt32LE(0) !== 0x04034b50) {
		throw new Error(`PowerPoint download was not a zip: ${url}`);
	}
	return buf;
}

function pptxToText(buf) {
	const slides = [...unzip(buf).entries()]
		.filter(([name]) => /^ppt\/slides\/slide\d+\.xml$/.test(name))
		.sort((a, b) => slideNumber(a[0]) - slideNumber(b[0]));
	const text = slides
		.map(([, xml]) =>
			[...xml.toString('utf8').matchAll(/<a:t[^>]*>([^<]*)<\/a:t>/g)]
				.map((m) => decodeHtml(m[1]))
				.join('\n')
				.trim()
		)
		.filter(Boolean)
		.join('\n\n');
	if (!text) throw new Error('PowerPoint contained no slide text');
	return text + '\n';
}

function slideNumber(name) {
	return Number(name.match(/slide(\d+)\.xml/)[1]);
}

function unzip(buf) {
	let eocd = -1;
	const min = Math.max(0, buf.length - 22 - 65535);
	for (let i = buf.length - 22; i >= min; i--) {
		if (buf.readUInt32LE(i) === 0x06054b50) {
			eocd = i;
			break;
		}
	}
	if (eocd < 0) throw new Error('Not a zip file');
	const count = buf.readUInt16LE(eocd + 10);
	let p = buf.readUInt32LE(eocd + 16);
	const out = new Map();
	for (let n = 0; n < count; n++) {
		if (buf.readUInt32LE(p) !== 0x02014b50) throw new Error('Bad zip central directory');
		const method = buf.readUInt16LE(p + 10);
		const compSize = buf.readUInt32LE(p + 20);
		const nameLen = buf.readUInt16LE(p + 28);
		const extraLen = buf.readUInt16LE(p + 30);
		const commentLen = buf.readUInt16LE(p + 32);
		const localOff = buf.readUInt32LE(p + 42);
		const name = buf.subarray(p + 46, p + 46 + nameLen).toString('utf8');
		p += 46 + nameLen + extraLen + commentLen;
		if (!/^ppt\/slides\/slide\d+\.xml$/.test(name)) continue;
		const localNameLen = buf.readUInt16LE(localOff + 26);
		const localExtraLen = buf.readUInt16LE(localOff + 28);
		const dataStart = localOff + 30 + localNameLen + localExtraLen;
		const data = buf.subarray(dataStart, dataStart + compSize);
		const xml = method === 0 ? data : method === 8 ? inflateRawSync(data) : null;
		if (!xml) throw new Error(`Unsupported zip method ${method} in ${name}`);
		out.set(name, xml);
	}
	return out;
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
	const rows = [];
	if (slides) {
		const kind = slides.kind === 'pptx' ? 'PowerPoint' : 'Google Slides';
		rows.push(
			`| [forelaesning.md](forelaesning.md) | Lecture slides (verbatim export — fill in topics) | ${kind} "${slides.name}" |`
		);
	}
	if (exercises) {
		rows.push(
			`| [oevelser.md](oevelser.md) | Exercises (verbatim export — fill in topics) | Google Docs "${exercises.name}" |`
		);
	}
	return `# Lektion ${lessonPad} (E22) — old course materials

Full verbatim text pulled from the old course's Google Drive folder for
Lektion ${lessonPad}, referenced in [../e22-drive-materials.md](../e22-drive-materials.md).

| File | Contents | Source |
|---|---|---|
${rows.join('\n')}
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
