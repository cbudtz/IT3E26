import { eq } from 'drizzle-orm';
import { env } from '$env/dynamic/private';
import { db, schema } from '$lib/server/db';

/** Uden DATABASE_URL virker live-host stadig, men flueben og selv-prøvning er slået fra. */
export const publishingEnabled = () => !!env.DATABASE_URL;

export async function listPublicSlugs(): Promise<Set<string>> {
	if (!publishingEnabled()) return new Set();
	const rows = await db.select({ slug: schema.publicQuizzes.quizSlug }).from(schema.publicQuizzes);
	return new Set(rows.map((r) => r.slug));
}

export async function isPublic(slug: string): Promise<boolean> {
	if (!publishingEnabled()) return false;
	const rows = await db
		.select({ slug: schema.publicQuizzes.quizSlug })
		.from(schema.publicQuizzes)
		.where(eq(schema.publicQuizzes.quizSlug, slug))
		.limit(1);
	return rows.length > 0;
}

export async function setPublic(slug: string, by: string, on: boolean): Promise<void> {
	if (!publishingEnabled()) return;
	if (on) {
		await db.insert(schema.publicQuizzes).values({ quizSlug: slug, publishedBy: by }).onConflictDoNothing();
	} else {
		await db.delete(schema.publicQuizzes).where(eq(schema.publicQuizzes.quizSlug, slug));
	}
}
