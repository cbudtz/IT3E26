/**
 * Persistering af quiz-koersler direkte via `postgres` (raa SQL).
 * Bevidst uden $lib/$env: denne fil koeres ogsaa u-bundlet af server.ts i prod.
 * Tabellerne oprettes af Drizzle-migrationerne (se db/schema.ts).
 */
import postgres from 'postgres';

let sql: ReturnType<typeof postgres> | null = null;
const get = () => {
	if (sql) return sql;
	const url = process.env.DATABASE_URL;
	if (!url) return null; // ingen DB (fx smoke-test) -> persistering springes stille over
	sql = postgres(url, { max: 2 });
	return sql;
};

export async function startRun(p: { quizSlug: string; title: string; joinCode: string; host: string }) {
	const s = get();
	if (!s) return null;
	const [row] = await s`
		insert into quiz_runs (quiz_slug, title, join_code, host)
		values (${p.quizSlug}, ${p.title}, ${p.joinCode}, ${p.host})
		returning id`;
	return row.id as number;
}

export async function saveAnswers(
	runId: number,
	q: { id: string; prompt: string },
	rows: { nickname: string; value: string; isCorrect: boolean }[]
) {
	const s = get();
	if (!s || !rows.length) return;
	await s`
		insert into quiz_answers ${s(
			rows.map((r) => ({
				run_id: runId,
				question_id: q.id,
				prompt: q.prompt,
				nickname: r.nickname,
				value: r.value,
				is_correct: r.isCorrect
			}))
		)}`;
}

export async function endRun(runId: number) {
	const s = get();
	if (!s) return;
	await s`update quiz_runs set ended_at = now() where id = ${runId}`;
}
