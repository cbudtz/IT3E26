import { dirname, posix, sep } from 'node:path';

/** Rasterformater vi vil vise i markdown/slides. SVG holdes ude (XSS). */
const MEDIA_TYPES: Record<string, string> = {
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.png': 'image/png',
	'.gif': 'image/gif',
	'.webp': 'image/webp',
	'.avif': 'image/avif'
};

/** Mapper der ikke vises på kurssitet (lærer-docs, build, kildekode). */
export const HIDDEN_DIRS = new Set(['docs', 'site', 'node_modules', '.git', '.svelte-kit', 'build']);

/** True hvis stien peger ind i en skjult mappe. */
export function isHiddenSlug(slug: string): boolean {
	const parts = posix.normalize('/' + slug).replace(/^\/+/, '').split('/').filter(Boolean);
	return parts.some((p) => p.startsWith('.') || HIDDEN_DIRS.has(p));
}

/**
 * Omskriver relative markdown-links og billedstier til site-ruter:
 *   forberedelse.md         -> /lektion1/forberedelse   (fra lektion1/Readme.md)
 *   lektion1/Readme.md      -> /lektion1
 *   forelaesning.md?show=slide -> /lektion1/forelaesning?show=slide
 *   images/linus.jpg        -> /lektion5/images/linus.jpg
 * Absolutte URL'er, ankre og mailto røres ikke.
 */
export function rewriteHref(href: string, fromFile: string): string {
	if (/^([a-z]+:|\/\/|#|\/)/i.test(href)) return href;
	const [beforeHash, hash = ''] = href.split('#');
	const [path, query = ''] = beforeHash.split('?');
	const baseDir = dirname(fromFile.split(sep).join('/'));
	let target = posix.normalize(posix.join(baseDir === '.' ? '' : baseDir, path));
	target = target.replace(/\/?(README|Readme|readme|index)\.md$/, '').replace(/\.md$/, '').replace(/\/+$/, '');
	if (target === '.' ) target = '';
	return '/' + target + (query ? '?' + query : '') + (hash ? '#' + hash : '');
}

/** Content-Type for en kursus-billedsti, eller null hvis den ikke må serveres. */
export function mediaTypeFor(slug: string): string | null {
	const safe = posix.normalize('/' + slug).replace(/^\/+/, '');
	if (!safe || safe.includes('..') || isHiddenSlug(safe)) return null;
	return MEDIA_TYPES[posix.extname(safe).toLowerCase()] ?? null;
}
