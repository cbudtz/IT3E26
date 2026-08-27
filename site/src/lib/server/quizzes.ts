import { readdir, readFile } from 'node:fs/promises';
import { resolve, posix } from 'node:path';
import { CONTENT_DIR, HIDDEN_DIRS, isHiddenSlug } from './content';
import type { QuestionDef } from './realtime/QuizRoom';

export type QuizDef = {
	/** fx "lektion1/quiz-hvor-staar-vi" (sti uden .json) */
	slug: string;
	title: string;
	questions: QuestionDef[];
};

/** Finder alle quiz*.json under CONTENT_DIR (max 3 niveauer). */
export async function listQuizzes(): Promise<Omit<QuizDef, 'questions'>[]> {
	const out: Omit<QuizDef, 'questions'>[] = [];
	async function walk(rel: string, depth: number) {
		if (depth > 3) return;
		const entries = await readdir(resolve(CONTENT_DIR, rel), { withFileTypes: true }).catch(() => []);
		for (const e of entries) {
			if (e.name.startsWith('.') || HIDDEN_DIRS.has(e.name)) continue;
			const p = posix.join(rel, e.name);
			if (e.isDirectory()) await walk(p, depth + 1);
			else if (/^quiz.*\.json$/i.test(e.name)) {
				const q = await loadQuiz(p.replace(/\.json$/i, '')).catch(() => null);
				if (q) out.push({ slug: q.slug, title: q.title });
			}
		}
	}
	await walk('', 0);
	return out.sort((a, b) => a.slug.localeCompare(b.slug, 'da'));
}

export async function loadQuiz(slug: string): Promise<QuizDef | null> {
	const safe = posix.normalize('/' + slug).replace(/^\/+/, '');
	if (safe.includes('..') || !safe || isHiddenSlug(safe)) return null;
	const raw = await readFile(resolve(CONTENT_DIR, safe + '.json'), 'utf8').catch(() => null);
	if (!raw) return null;
	const json = JSON.parse(raw) as { title?: string; questions?: Partial<QuestionDef>[] };
	const questions: QuestionDef[] = (json.questions ?? []).map((q, i) => ({
		id: q.id ?? `q${i + 1}`,
		type: q.type ?? 'mc',
		prompt: q.prompt ?? '',
		options: q.type === 'tf' && !q.options?.length ? ['Sandt', 'Falsk'] : (q.options ?? []),
		correct: (q.correct ?? []) as number[] | string[]
	}));
	return { slug: safe, title: json.title ?? safe, questions };
}
