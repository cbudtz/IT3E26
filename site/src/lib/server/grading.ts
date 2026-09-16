import type { QuestionDef } from './realtime/QuizRoom.ts';

const norm = (s: string) => s.trim().toLowerCase();

/** Samme regel for live-rum og selv-prøvning. */
export const isCorrect = (q: QuestionDef, value: string): boolean => {
	if (q.type === 'short') return (q.correct as string[]).some((c) => norm(c) === norm(value));
	return (q.correct as number[]).includes(Number(value));
};
