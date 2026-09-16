import { error, fail } from '@sveltejs/kit';
import { loadQuiz } from '$lib/server/quizzes';
import { isPublic } from '$lib/server/publicQuizzes';
import { isCorrect } from '$lib/server/grading';
import { parseAnswerForm, stripCorrect } from '$lib/server/practice';
import type { Actions, PageServerLoad } from './$types';

async function loadPublicQuiz(slug: string) {
	const quiz = await loadQuiz(slug);
	if (!quiz || !(await isPublic(quiz.slug))) error(404, `Ingen offentlig quiz "${slug}"`);
	return quiz;
}

export const load: PageServerLoad = async ({ params }) => {
	const quiz = await loadPublicQuiz(params.slug);
	return { title: quiz.title, slug: quiz.slug, questions: stripCorrect(quiz.questions) };
};

export const actions: Actions = {
	answer: async ({ params, request }) => {
		const quiz = await loadPublicQuiz(params.slug);
		const input = parseAnswerForm(await request.formData());
		if (!input) return fail(400, { error: 'Ugyldigt svar' });
		const q = quiz.questions.find((x) => x.id === input.questionId);
		if (!q) return fail(400, { error: 'Ukendt spørgsmål' });
		return { questionId: q.id, isCorrect: isCorrect(q, input.value), correct: q.correct };
	}
};
