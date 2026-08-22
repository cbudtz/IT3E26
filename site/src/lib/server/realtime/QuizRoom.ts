import { Room, type Client } from 'colyseus';
import { QuizState, Player, Question } from './state.ts';

/** Et spørgsmål som underviseren har defineret (facit forlader aldrig serveren). */
export type QuestionDef = {
	id: string;
	type: 'mc' | 'tf' | 'short';
	prompt: string;
	options: string[];
	/** Index i options (mc/tf) eller accepterede tekstsvar (short). */
	correct: number[] | string[];
};

export type QuizRoomOptions = {
	quizId: string;
	joinCode: string;
	questions: QuestionDef[];
	/** Hemmelighed underviserens klient sender for at få styringsrettigheder. */
	hostToken: string;
};

const isCorrect = (q: QuestionDef, value: string): boolean => {
	if (q.type === 'short') {
		const norm = (s: string) => s.trim().toLowerCase();
		return (q.correct as string[]).some((c) => norm(c) === norm(value));
	}
	return (q.correct as number[]).includes(Number(value));
};

export class QuizRoom extends Room {
	state = new QuizState();

	private questions: QuestionDef[] = [];
	private hostToken = '';
	private hostSessionId: string | null = null;
	/** questionId -> sessionId -> rå svarværdi. Bruges til persistering. */
	private answers = new Map<string, Map<string, string>>();

	onCreate(options: QuizRoomOptions) {
		this.questions = options.questions ?? [];
		this.hostToken = options.hostToken;
		this.state.phase = 'lobby';
		this.state.joinCode = options.joinCode;
		this.state.questionIndex = -1;
		this.state.questionCount = this.questions.length;
		this.state.question = new Question();
		this.state.answerCount = 0;

		this.onMessage('host:claim', (client, msg: { token: string }) => {
			if (msg?.token && msg.token === this.hostToken) this.hostSessionId = client.sessionId;
		});
		this.onMessage('host:next', (client) => this.ifHost(client, () => this.nextQuestion()));
		this.onMessage('host:reveal', (client) => this.ifHost(client, () => this.reveal()));
		this.onMessage('host:end', (client) =>
			this.ifHost(client, () => {
				this.state.phase = 'ended';
			})
		);
		this.onMessage('answer', (client, msg: { value: string }) => this.submit(client, msg?.value));
	}

	onJoin(client: Client, options: { nickname?: string }) {
		this.state.players.set(
			client.sessionId,
			new Player({ nickname: options?.nickname?.slice(0, 40) || 'Anonym', score: 0, hasAnswered: false })
		);
	}

	onLeave(client: Client) {
		// Behold spilleren kortvarigt, så et wifi-hik ikke koster deres score.
		this.allowReconnection(client, 60).catch(() => this.state.players.delete(client.sessionId));
	}

	private ifHost(client: Client, fn: () => void) {
		if (client.sessionId === this.hostSessionId) fn();
	}

	private nextQuestion() {
		const next = this.state.questionIndex + 1;
		if (next >= this.questions.length) {
			this.state.phase = 'ended';
			return;
		}
		const q = this.questions[next];
		this.state.questionIndex = next;
		this.state.phase = 'question';
		this.state.question = new Question({
			id: q.id,
			type: q.type,
			prompt: q.prompt,
			options: q.options ?? []
		});
		// ArraySchema#splice() kan ikke indsaette flere end den sletter - toem og fyld i stedet.
		while (this.state.tally.length > 0) this.state.tally.pop();
		for (let i = 0; i < (q.options?.length ?? 0); i++) this.state.tally.push(0);
		this.state.answerCount = 0;
		this.answers.set(q.id, new Map());
		this.state.players.forEach((p) => (p.hasAnswered = false));
	}

	private submit(client: Client, value: string) {
		if (this.state.phase !== 'question' || typeof value !== 'string') return;
		const q = this.questions[this.state.questionIndex];
		const perQuestion = this.answers.get(q.id)!;
		if (perQuestion.has(client.sessionId)) return; // ét svar pr. spørgsmål

		perQuestion.set(client.sessionId, value.slice(0, 500));
		this.state.answerCount = perQuestion.size;

		const player = this.state.players.get(client.sessionId);
		if (player) player.hasAnswered = true;

		if (q.type !== 'short') {
			const i = Number(value);
			if (Number.isInteger(i) && i >= 0 && i < this.state.tally.length) this.state.tally[i]++;
		}
	}

	private reveal() {
		if (this.state.questionIndex < 0) return;
		const q = this.questions[this.state.questionIndex];
		for (const [sessionId, value] of this.answers.get(q.id) ?? []) {
			const player = this.state.players.get(sessionId);
			if (player && isCorrect(q, value)) player.score++;
		}
		this.state.phase = 'reveal';
		// TODO(plan): persistér this.answers til Postgres via Drizzle her.
	}
}
