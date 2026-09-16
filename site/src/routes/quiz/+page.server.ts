import { listQuizzes } from '$lib/server/quizzes';
import { listPublicSlugs } from '$lib/server/publicQuizzes';
import { selectPublic } from '$lib/server/practice';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [all, publicSlugs] = await Promise.all([listQuizzes(), listPublicSlugs()]);
	return { practiceQuizzes: selectPublic(all, publicSlugs) };
};
