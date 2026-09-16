import { fail } from '@sveltejs/kit';
import { listQuizzes } from '$lib/server/quizzes';
import { listPublicSlugs, publishingEnabled, setPublic } from '$lib/server/publicQuizzes';
import { parsePublishForm } from '$lib/server/practice';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const [quizzes, publicSlugs] = await Promise.all([listQuizzes(), listPublicSlugs()]);
	return {
		user: locals.user,
		quizzes,
		publicSlugs: [...publicSlugs],
		canPublish: publishingEnabled()
	};
};

export const actions: Actions = {
	publish: async ({ request, locals }) => {
		const input = parsePublishForm(await request.formData());
		if (!input) return fail(400, { error: 'Ugyldig quiz' });
		// Ukendt slug: ingen skrivning.
		const known = (await listQuizzes()).some((q) => q.slug === input.slug);
		if (!known) return fail(404, { error: `Ingen quiz "${input.slug}"` });
		try {
			await setPublic(input.slug, locals.user!, input.on);
		} catch {
			return fail(503, { error: 'Kunne ikke gemme – prøv igen' });
		}
	}
};
