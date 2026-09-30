import type { QuestionDef } from './realtime/QuizRoom.ts';

const norm = (s: string) => s.trim().toLowerCase();

/** Fritekst har intet facit og tæller ikke med i scoren. */
export const isGraded = (q: { type: string }): boolean => q.type !== 'open';

/** Samme regel for live-rum og selv-prøvning. */
export const isCorrect = (q: QuestionDef, value: string): boolean => {
	if (!isGraded(q)) return false;
	if (q.type === 'short') return (q.correct as string[]).some((c) => norm(c) === norm(value));
	return (q.correct as number[]).includes(Number(value));
};
