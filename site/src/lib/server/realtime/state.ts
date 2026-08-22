// Delt state-skema mellem server og klient (Colyseus synkroniserer det automatisk).
// Bruger den decorator-frie schema()-API, saa vi undgaar TS-decorator-opsaetning.
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
	title: 'string',
	joinCode: 'string',
	questionIndex: 'number',
	questionCount: 'number',
	question: Question,
	/** Antal svar pr. svarmulighed - vises live paa projektoren. */
	tally: ['number'],
	answerCount: 'number',
	/** Udfyldes foerst ved 'reveal' (facit forlader ellers aldrig serveren). */
	correctOptions: ['number'],
	correctText: ['string'],
	/** Indsendte tekstsvar (kun short) - vises ved reveal. */
	shortAnswers: ['string'],
	players: { map: Player }
});
