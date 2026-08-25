import { listQuizzes } from '$lib/server/quizzes';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => ({
	user: locals.user,
	quizzes: await listQuizzes()
});
