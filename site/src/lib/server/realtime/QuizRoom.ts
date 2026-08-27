import { Room, CloseCode, type Client } from 'colyseus';
import { QuizState, Player, Question, QuestionResult } from './state.ts';
import { startRun, saveAnswers, endRun } from './persist.ts';

/** Et spoergsmaal som underviseren har defineret (facit forlader foerst serveren ved reveal). */
export type QuestionDef = {
	id: string;
	type: 'mc' | 'tf' | 'short';
	prompt: string;
	options: string[];
	/** Index i options (mc/tf) eller accepterede tekstsvar (short). */
	correct: number[] | string[];
};

export type QuizRoomOptions = {
	quizSlug: string;
	title: string;
	joinCode: string;
	questions: QuestionDef[];
	/** Hemmelighed underviserens klient sender for at faa styringsrettigheder. */
	hostToken: string;
	/** DTU-brugernavn paa host (til resultat-loggen). */
	host: string;
};

const norm = (s: string) => s.trim().toLowerCase();

const isCorrect = (q: QuestionDef, value: string): boolean => {
	if (q.type === 'short') return (q.correct as string[]).some((c) => norm(c) === norm(value));
	return (q.correct as number[]).includes(Number(value));
};

const clear = (arr: { length: number; pop(): unknown }) => {
	while (arr.length > 0) arr.pop();
};

export class QuizRoom extends Room {
	state = new QuizState();

	private quizSlug = '';
	private questions: QuestionDef[] = [];
	private hostToken = '';
	private hostSessionId: string | null = null;
	private runId: number | null = null;
	private revealed = new Set<string>();
	/** questionId -> sessionId -> raa svarvaerdi. */
	private answers = new Map<string, Map<string, string>>();

	async onCreate(options: QuizRoomOptions) {
		this.quizSlug = options.quizSlug;
		this.questions = options.questions ?? [];
		this.hostToken = options.hostToken;
		this.state.phase = 'lobby';
		this.state.title = options.title ?? '';
		this.state.joinCode = options.joinCode;
		this.state.questionIndex = -1;
		this.state.questionCount = this.questions.length;
		this.state.question = new Question();
		this.state.answerCount = 0;
		this.state.unansweredCount = 0;

		this.onMessage('host:claim', (client, msg: { token: string }) => {
			const ok = !!msg?.token && msg.token === this.hostToken;
			if (ok) {
				this.hostSessionId = client.sessionId;
				// Host er ikke deltager.
				this.state.players.delete(client.sessionId);
			}
			// Svar altid, saa host-UI'et ved om det har styringen.
			client.send('host:claimed', { ok });
		});
		this.onMessage('host:next', (client) => this.ifHost(client, () => this.nextQuestion()));
		this.onMessage('host:reveal', (client) => this.ifHost(client, () => this.reveal()));
		this.onMessage('host:end', (client) => this.ifHost(client, () => this.end()));
		this.onMessage('answer', (client, msg: { value: string }) => this.submit(client, msg?.value));

		this.runId = await startRun({
			quizSlug: options.quizSlug,
			title: options.title,
			joinCode: options.joinCode,
			host: options.host ?? ''
		}).catch((e) => {
			console.error('[quiz] kunne ikke logge koersel:', e.message);
			return null;
		});
	}

	onJoin(client: Client, options: { nickname?: string }) {
		this.state.players.set(
			client.sessionId,
			new Player({ nickname: options?.nickname?.trim().slice(0, 40) || 'Anonym', score: 0, hasAnswered: false })
		);
	}

	async onLeave(client: Client, code?: number) {
		const consented = code === CloseCode.CONSENTED;

		// Uden host giver rummet ingen mening - og en efterladt join-kode ville
		// kunne "stjaele" studerende fra en senere quiz med samme kode.
		if (client.sessionId === this.hostSessionId) {
			if (consented) return void this.disconnect();
			try {
				await this.allowReconnection(client, 120);
			} catch {
				await this.disconnect();
			}
			return;
		}
		if (consented) {
			this.state.players.delete(client.sessionId);
			return;
		}
		// Behold spilleren kortvarigt, saa et wifi-hik ikke koster deres score.
		try {
			await this.allowReconnection(client, 90);
		} catch {
			this.state.players.delete(client.sessionId);
		}
	}

	onDispose() {
		if (this.runId && this.state.phase !== 'ended') void endRun(this.runId).catch(() => {});
	}

	private ifHost(client: Client, fn: () => void) {
		if (client.sessionId === this.hostSessionId) fn();
	}

	private nextQuestion() {
		const next = this.state.questionIndex + 1;
		if (next >= this.questions.length) return this.end();
		const q = this.questions[next];
		this.state.questionIndex = next;
		this.state.phase = 'question';
		this.state.question = new Question({ id: q.id, type: q.type, prompt: q.prompt, options: q.options ?? [] });
		clear(this.state.tally);
		for (let i = 0; i < (q.options?.length ?? 0); i++) this.state.tally.push(0);
		clear(this.state.correctOptions);
		clear(this.state.correctText);
		clear(this.state.shortAnswers);
		this.state.answerCount = 0;
		this.state.unansweredCount = 0;
		this.answers.set(q.id, new Map());
		this.state.players.forEach((p) => (p.hasAnswered = false));
	}

	private submit(client: Client, value: string) {
		if (this.state.phase !== 'question' || typeof value !== 'string') return;
		if (client.sessionId === this.hostSessionId) return;
		const q = this.questions[this.state.questionIndex];
		const perQuestion = this.answers.get(q.id)!;
		if (perQuestion.has(client.sessionId)) return; // ét svar pr. spoergsmaal

		const v = value.slice(0, 200);
		perQuestion.set(client.sessionId, v);
		this.state.answerCount = perQuestion.size;

		const player = this.state.players.get(client.sessionId);
		if (player) player.hasAnswered = true;

		if (q.type === 'short') {
			this.state.shortAnswers.push(v);
		} else {
			const i = Number(v);
			if (Number.isInteger(i) && i >= 0 && i < this.state.tally.length) this.state.tally[i]++;
		}
	}

	private reveal() {
		if (this.state.questionIndex < 0 || this.state.phase !== 'question') return;
		const q = this.questions[this.state.questionIndex];
		const rows: { nickname: string; value: string; isCorrect: boolean }[] = [];
		for (const [sessionId, value] of this.answers.get(q.id) ?? []) {
			const player = this.state.players.get(sessionId);
			const ok = isCorrect(q, value);
			if (player && ok && !this.revealed.has(q.id)) player.score++;
			rows.push({ nickname: player?.nickname ?? '?', value, isCorrect: ok });
		}
		this.revealed.add(q.id);
		if (q.type === 'short') (q.correct as string[]).forEach((c) => this.state.correctText.push(c));
		else (q.correct as number[]).forEach((i) => this.state.correctOptions.push(i));
		this.state.unansweredCount = Math.max(0, this.state.players.size - rows.length);
		this.state.results.push(this.snapshotResult(q));
		this.state.phase = 'reveal';

		if (this.runId) void saveAnswers(this.runId, q, rows).catch((e) => console.error('[quiz] gem svar:', e.message));
	}

	private snapshotResult(q: QuestionDef) {
		const r = new QuestionResult();
		r.id = q.id;
		r.type = q.type;
		r.prompt = q.prompt;
		r.unanswered = this.state.unansweredCount;
		for (const o of q.options ?? []) r.options.push(o);
		for (const n of this.state.tally) r.tally.push(Number(n));
		for (const a of this.state.shortAnswers) r.shortAnswers.push(String(a));
		for (const i of this.state.correctOptions) r.correctOptions.push(Number(i));
		for (const t of this.state.correctText) r.correctText.push(String(t));
		return r;
	}

	private end() {
		if (this.state.phase === 'ended') return;
		if (this.state.phase === 'question' && this.state.questionIndex >= 0) this.reveal();
		this.state.phase = 'ended';
		if (this.runId) void endRun(this.runId).catch(() => {});
	}
}
