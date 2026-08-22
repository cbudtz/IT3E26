// Delt state-skema mellem server og klient (Colyseus synkroniserer det automatisk).
// Bruger den decorator-frie schema()-API, så vi undgår TS-decorator-opsætning.
import { schema } from '@colyseus/schema';

export const Player = schema({
	nickname: 'string',
	score: 'number',
	hasAnswered: 'boolean'
});

export const Question = schema({
	id: 'string',
	/** 'mc' = multiple choice, 'tf' = sand/falsk, 'short' = kort tekstsvar */
	type: 'string',
	prompt: 'string',
	options: ['string']
});

export const QuizState = schema({
	/** 'lobby' | 'question' | 'reveal' | 'ended' */
	phase: 'string',
	joinCode: 'string',
	questionIndex: 'number',
	questionCount: 'number',
	question: Question,
	/** Antal svar pr. svarmulighed - vises live på projektoren. */
	tally: ['number'],
	answerCount: 'number',
	players: { map: Player }
});
