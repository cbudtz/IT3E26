import { error } from '@sveltejs/kit';
import { asc, eq } from 'drizzle-orm';
import { db, schema } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const id = Number(params.id);
	if (!Number.isInteger(id)) error(404);
	const [run] = await db.select().from(schema.quizRuns).where(eq(schema.quizRuns.id, id)).limit(1);
	if (!run) error(404, 'Kørsel findes ikke');
	const answers = await db
		.select()
		.from(schema.quizAnswers)
		.where(eq(schema.quizAnswers.runId, id))
		.orderBy(asc(schema.quizAnswers.answeredAt));

	// Pr. spoergsmaal: antal svar, antal rigtige, fordeling af svarvaerdier.
	const byQuestion = new Map<string, { prompt: string; total: number; correct: number; values: Map<string, number> }>();
	const byPerson = new Map<string, { total: number; correct: number }>();
	for (const a of answers) {
		const q = byQuestion.get(a.questionId) ?? { prompt: a.prompt, total: 0, correct: 0, values: new Map() };
		q.total++;
		if (a.isCorrect) q.correct++;
		q.values.set(a.value, (q.values.get(a.value) ?? 0) + 1);
		byQuestion.set(a.questionId, q);
		const p = byPerson.get(a.nickname) ?? { total: 0, correct: 0 };
		p.total++;
		if (a.isCorrect) p.correct++;
		byPerson.set(a.nickname, p);
	}
	return {
		run,
		questions: [...byQuestion.entries()].map(([id, q]) => ({
			id, prompt: q.prompt, total: q.total, correct: q.correct,
			values: [...q.values.entries()].sort((x, y) => y[1] - x[1])
		})),
		people: [...byPerson.entries()]
			.map(([nickname, p]) => ({ nickname, ...p }))
			.sort((x, y) => y.correct - x.correct || x.nickname.localeCompare(y.nickname, 'da'))
	};
};
