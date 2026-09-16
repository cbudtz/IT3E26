import type { QuestionDef } from './realtime/QuizRoom.ts';

export type PracticeQuestion = Omit<QuestionDef, 'correct'>;

/** Facit må ikke forlade serveren før der er svaret. */
export function stripCorrect(questions: QuestionDef[]): PracticeQuestion[] {
	return questions.map(({ correct: _correct, ...rest }) => rest);
}

export function selectPublic<T extends { slug: string }>(all: T[], publicSlugs: Iterable<string>): T[] {
	const set = new Set(publicSlugs);
	return all.filter((q) => set.has(q.slug));
}

const str = (v: FormDataEntryValue | null) => (typeof v === 'string' ? v.trim() : '');

export function parsePublishForm(fd: FormData): { slug: string; on: boolean } | null {
	const slug = str(fd.get('slug'));
	if (!slug) return null;
	return { slug, on: fd.get('on') === '1' };
}

export function parseAnswerForm(fd: FormData): { questionId: string; value: string } | null {
	const questionId = str(fd.get('questionId'));
	const value = str(fd.get('value')).slice(0, 200);
	if (!questionId || !value) return null;
	return { questionId, value };
}
