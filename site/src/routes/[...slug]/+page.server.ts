import { error } from '@sveltejs/kit';
import { loadPage } from '$lib/server/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const page = await loadPage(params.slug ?? '');
	if (!page) error(404, `Ingen side for "/${params.slug}"`);
	return { page };
};
