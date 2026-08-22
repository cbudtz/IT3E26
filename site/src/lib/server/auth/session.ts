import { randomBytes } from 'node:crypto';
import { eq, lt } from 'drizzle-orm';
import type { Cookies } from '@sveltejs/kit';
import { db, schema } from '$lib/server/db';

export const SESSION_COOKIE = 'it3e26_session';
const TTL_MS = 1000 * 60 * 60 * 12; // 12 timer - en undervisningsdag

export async function createSession(cookies: Cookies, username: string) {
	const id = randomBytes(32).toString('base64url');
	const expiresAt = new Date(Date.now() + TTL_MS);
	await db.insert(schema.sessions).values({ id, username, expiresAt });
	cookies.set(SESSION_COOKIE, id, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
		expires: expiresAt
	});
}

export async function getSessionUser(cookies: Cookies): Promise<string | null> {
	const id = cookies.get(SESSION_COOKIE);
	if (!id) return null;
	const [row] = await db.select().from(schema.sessions).where(eq(schema.sessions.id, id)).limit(1);
	if (!row || row.expiresAt < new Date()) return null;
	return row.username;
}

export async function destroySession(cookies: Cookies) {
	const id = cookies.get(SESSION_COOKIE);
	if (id) await db.delete(schema.sessions).where(eq(schema.sessions.id, id));
	cookies.delete(SESSION_COOKIE, { path: '/' });
}

export async function isSuperuser(username: string): Promise<boolean> {
	const [row] = await db.select().from(schema.superusers).where(eq(schema.superusers.username, username)).limit(1);
	return !!row;
}

/** Ryd udloebne sessioner (kaldes ved opstart). */
export const pruneSessions = () => db.delete(schema.sessions).where(lt(schema.sessions.expiresAt, new Date()));
