import { basename } from 'node:path';
import { error } from '@sveltejs/kit';
import { readMarkdownSource } from '$lib/server/content';
import type { RequestHandler } from './$types';

function attachment(name: string): string {
	const ascii = name.replace(/[^\x20-\x7E]/g, '_');
	return `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(name)}`;
}

export const GET: RequestHandler = async ({ params }) => {
	const source = await readMarkdownSource(params.slug ?? '');
	if (!source) error(404, 'Ingen markdown-fil at downloade');
	return new Response(source.markdown, {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8',
			'Content-Disposition': attachment(basename(source.file)),
			'Cache-Control': 'no-store'
		}
	});
};
