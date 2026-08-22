import { desc, eq, sql } from 'drizzle-orm';
import { db, schema } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const runs = await db
		.select({
			id: schema.quizRuns.id,
			title: schema.quizRuns.title,
			quizSlug: schema.quizRuns.quizSlug,
			joinCode: schema.quizRuns.joinCode,
			host: schema.quizRuns.host,
			startedAt: schema.quizRuns.startedAt,
			endedAt: schema.quizRuns.endedAt,
			answers: sql<number>`count(${schema.quizAnswers.id})::int`,
			participants: sql<number>`count(distinct ${schema.quizAnswers.nickname})::int`
		})
		.from(schema.quizRuns)
		.leftJoin(schema.quizAnswers, eq(schema.quizAnswers.runId, schema.quizRuns.id))
		.groupBy(schema.quizRuns.id)
		.orderBy(desc(schema.quizRuns.startedAt))
		.limit(100);
	return { runs };
};
