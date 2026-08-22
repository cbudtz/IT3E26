import { resolve } from 'node:path';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { env } from '$env/dynamic/private';
import { db, schema } from '$lib/server/db';
import { pruneSessions } from '$lib/server/auth/session';

/** Koerer migrationer og seeder SUPERUSERS. Kaldes én gang ved opstart (hooks.server.ts init). */
export async function bootstrap() {
	await migrate(db, { migrationsFolder: resolve(process.cwd(), 'drizzle') });

	const users = (env.SUPERUSERS ?? '')
		.split(/[,;\s]+/)
		.map((u) => u.trim().toLowerCase())
		.filter(Boolean);
	if (users.length) {
		await db
			.insert(schema.superusers)
			.values(users.map((username) => ({ username })))
			.onConflictDoNothing();
	}
	await pruneSessions();
	console.log(`[bootstrap] DB migreret. Superusers: ${users.join(', ') || '(ingen - saet SUPERUSERS)'}`);
}
