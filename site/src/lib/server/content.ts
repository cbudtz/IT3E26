import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, posix } from 'node:path';
import { env } from '$env/dynamic/private';
import { marked } from 'marked';
import { enhanceLessonPlan } from './lessonPlan';
import { HIDDEN_DIRS, isHiddenSlug, mediaTypeFor, rewriteHref } from './contentPaths';

export { HIDDEN_DIRS, isHiddenSlug, mediaTypeFor, rewriteHref } from './contentPaths';

/**
 * Rod for kursusmaterialet (markdown). Default: repo-roden (én mappe over site/).
 * I CapRover/Docker sættes CONTENT_DIR til mappen hvor README.md og lektion-mapperne ligger.
 */
export const CONTENT_DIR = resolve(env.CONTENT_DIR ?? resolve(process.cwd(), '..'));

/** Filnavne vi prøver, når en URL peger på en mappe. Rækkefølge = prioritet. */
const INDEX_NAMES = ['README.md', 'Readme.md', 'readme.md', 'index.md'];

/** Lektionsnumre der har en index-fil i `lektionN/`. */
export async function availableLessons(): Promise<Set<number>> {
	const found = new Set<number>();
	const entries = await readdir(CONTENT_DIR, { withFileTypes: true }).catch(() => []);
	for (const e of entries) {
		if (!e.isDirectory()) continue;
		const m = /^lektion(\d+)$/i.exec(e.name);
		if (!m) continue;
		const n = Number(m[1]);
		const dir = resolve(CONTENT_DIR, e.name);
		for (const name of INDEX_NAMES) {
			if (await exists(resolve(dir, name))) {
				found.add(n);
				break;
			}
		}
	}
	return found;
}

export type Page = {
	/** URL-sti uden foranstillet slash, fx "lektion1" eller "lektion1/forberedelse". */
	slug: string;
	title: string;
	html: string;
	/** HTML pr. slide, splittet på en linje med kun `---`. */
	slides: string[];
	/** Relativ fil i CONTENT_DIR, fx "lektion1/Readme.md" (til "rediger på GitHub"-links). */
	file: string;
};

const exists = async (p: string) => stat(p).then((s) => s.isFile()).catch(() => false);

/** Mapper en URL-slug til en markdown-fil. Returnerer null hvis ingen passer. */
async function resolveFile(slug: string): Promise<string | null> {
	const safe = posix.normalize('/' + slug).replace(/^\/+/, ''); // fjerner ../ og dobbelt-slash
	if (safe.includes('..') || isHiddenSlug(safe)) return null;

	const candidates = safe === '' ? INDEX_NAMES : [
		`${safe}.md`,
		...INDEX_NAMES.map((n) => posix.join(safe, n))
	];
	for (const rel of candidates) {
		if (await exists(resolve(CONTENT_DIR, rel))) return rel;
	}
	return null;
}

/** Kilden til den viste side, eller null hvis slug er en mappe-liste uden .md. */
export async function readMarkdownSource(
	slug: string
): Promise<{ file: string; markdown: string } | null> {
	const file = await resolveFile(slug);
	if (!file) return null;
	const markdown = await readFile(resolve(CONTENT_DIR, file), 'utf8');
	return { file, markdown };
}

/** Læser et kursusbillede fra CONTENT_DIR. */
export async function readMedia(
	slug: string
): Promise<{ body: Buffer; type: string } | null> {
	const type = mediaTypeFor(slug);
	if (!type) return null;
	const safe = posix.normalize('/' + slug).replace(/^\/+/, '');
	try {
		const body = await readFile(resolve(CONTENT_DIR, safe));
		return { body, type };
	} catch {
		return null;
	}
}

function titleFrom(markdown: string, fallback: string): string {
	const m = markdown.match(/^#\s+(.+)$/m);
	return m ? m[1].replace(/[*_`]/g, '').trim() : fallback;
}

/** Splitter markdown på en linje der kun er `---`. Ignorerer separators inde i code fences. */
export function splitSlides(markdown: string): string[] {
	const parts: string[] = [];
	let buf: string[] = [];
	let inFence = false;
	for (const line of markdown.split(/\r?\n/)) {
		if (/^```/.test(line)) inFence = !inFence;
		if (!inFence && /^\s*---\s*$/.test(line)) {
			const chunk = buf.join('\n').trim();
			if (chunk) parts.push(chunk);
			buf = [];
		} else {
			buf.push(line);
		}
	}
	const last = buf.join('\n').trim();
	if (last) parts.push(last);
	return parts;
}

async function toHtml(markdown: string, fromFile: string): Promise<string> {
	const renderer = new marked.Renderer();
	const baseLink = renderer.link.bind(renderer);
	const baseImage = renderer.image.bind(renderer);
	renderer.link = (token) => baseLink({ ...token, href: rewriteHref(token.href, fromFile) });
	renderer.image = (token) => baseImage({ ...token, href: rewriteHref(token.href, fromFile) });
	return await marked.parse(markdown, { renderer, gfm: true });
}

/** Mappe uden README: vis en simpel liste over undermapper og .md-filer. */
async function directoryListing(slug: string): Promise<Page | null> {
	const safe = posix.normalize('/' + slug).replace(/^\/+/, '');
	if (safe.includes('..') || isHiddenSlug(safe)) return null;
	const dir = resolve(CONTENT_DIR, safe);
	const entries = await readdir(dir, { withFileTypes: true }).catch(() => null);
	if (!entries) return null;
	const items = entries
		.filter((e) => !e.name.startsWith('.') && !HIDDEN_DIRS.has(e.name) && (e.isDirectory() || e.name.endsWith('.md')))
		.sort((a, b) => Number(b.isDirectory()) - Number(a.isDirectory()) || a.name.localeCompare(b.name, 'da'))
		.map((e) => {
			const href = '/' + posix.join(safe, e.isDirectory() ? e.name : e.name.replace(/\.md$/, ''));
			return `<li><a href="${href}">${e.isDirectory() ? e.name + '/' : e.name}</a></li>`;
		});
	const title = safe || 'Forside';
	const html = `<h1>${title}</h1><ul>${items.join('')}</ul>`;
	return { slug, title, file: safe, html, slides: [html] };
}

export async function loadPage(slug: string): Promise<Page | null> {
	const file = await resolveFile(slug);
	if (!file) return directoryListing(slug);
	const markdown = await readFile(resolve(CONTENT_DIR, file), 'utf8');
	const chunks = splitSlides(markdown);
	const available = await availableLessons();
	const [rawHtml, ...rawSlides] = await Promise.all([
		toHtml(markdown, file),
		...chunks.map((chunk) => toHtml(chunk, file))
	]);
	const html = enhanceLessonPlan(rawHtml, available);
	const slides = (rawSlides.length ? rawSlides : [rawHtml]).map((s) =>
		enhanceLessonPlan(s, available)
	);
	return {
		slug,
		title: titleFrom(markdown, slug || 'Forside'),
		html,
		slides,
		file
	};
}
