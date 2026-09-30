// Browser-side hjaelper til Colyseus. Holder et plain-JSON snapshot af rum-state,
// saa Svelte-komponenter bare kan laese `snap` reaktivt.
import { Client, type Room } from '@colyseus/sdk';

export type QuestionResultSnap = {
	id: string;
	type: 'mc' | 'tf' | 'short' | string;
	prompt: string;
	options: string[];
	tally: number[];
	unanswered: number;
	shortAnswers: string[];
	correctOptions: number[];
	correctText: string[];
};

export type Snapshot = {
	phase: 'lobby' | 'question' | 'reveal' | 'ended';
	title: string;
	joinCode: string;
	questionIndex: number;
	questionCount: number;
	gradedCount: number;
	question: { id: string; type: 'mc' | 'tf' | 'short' | 'open'; prompt: string; options: string[] };
	tally: number[];
	answerCount: number;
	unansweredCount: number;
	correctOptions: number[];
	correctText: string[];
	shortAnswers: string[];
	results: QuestionResultSnap[];
	players: Record<string, { nickname: string; score: number; hasAnswered: boolean }>;
};

export const EMPTY: Snapshot = {
	phase: 'lobby', title: '', joinCode: '', questionIndex: -1, questionCount: 0, gradedCount: 0,
	question: { id: '', type: 'mc', prompt: '', options: [] },
	tally: [], answerCount: 0, unansweredCount: 0, correctOptions: [], correctText: [], shortAnswers: [],
	results: [], players: {}
};

export function connect(endpoint: string) {
	return new Client(endpoint);
}

/** Abonnér paa state som plain JSON. Returnerer unsubscribe. */
export function watch(room: Room, onSnap: (s: Snapshot) => void) {
	// join() resolver foer foerste ROOM_STATE er modtaget, saa state kan vaere tom her -
	// udfyld manglende felter med EMPTY i stedet for at give komponenterne undefined.
	const push = () =>
		onSnap({ ...EMPTY, ...structuredClone((room.state as { toJSON(): Partial<Snapshot> }).toJSON()) });
	push();
	const off = room.onStateChange(push);
	return () => off.clear?.();
}

/** Stabil "device-id" i localStorage, saa reconnection kan genkende en studerende. */
export function deviceId(): string {
	const k = 'it3e26_device';
	let v = localStorage.getItem(k);
	if (!v) {
		v = crypto.randomUUID();
		localStorage.setItem(k, v);
	}
	return v;
}
