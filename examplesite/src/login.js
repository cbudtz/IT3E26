import { eq } from 'drizzle-orm';
import { getDb, schema } from './db.js';
import { verifyPassword } from './passwords.js';

const LOGIN_TTL_MS = 5 * 60 * 1000;

export function normalizeCpr(cpr) {
	return String(cpr ?? '').replace(/\D/g, '');
}

export function loginSuccessBody(patient, now = Date.now()) {
	const user = { cpr: patient.cpr, navn: patient.navn };
	return {
		cpr: user.cpr,
		navn: user.navn,
		user,
		expiry: new Date(now + LOGIN_TTL_MS).toISOString()
	};
}

export async function login(cprRaw, password) {
	if (cprRaw == null || cprRaw === '' || password == null || password === '') {
		return { status: 400, body: { error: 'cpr og password skal sendes' } };
	}
	const cpr = normalizeCpr(cprRaw);
	if (!cpr || password === '') {
		return { status: 400, body: { error: 'cpr og password skal sendes' } };
	}
	const rows = await getDb()
		.select()
		.from(schema.patients)
		.where(eq(schema.patients.cpr, cpr))
		.limit(1);
	const row = rows[0];
	if (!row || !(await verifyPassword(password, row.passwordHash))) {
		return { status: 401, body: { error: 'forkert cpr eller password' } };
	}
	return { status: 200, body: loginSuccessBody(row) };
}
