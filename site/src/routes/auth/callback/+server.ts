import { redirect, error } from '@sveltejs/kit';
import { validateTicket } from '$lib/server/auth/cas';
import { createSession, isSuperuser } from '$lib/server/auth/session';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const ticket = url.searchParams.get('ticket');
	if (!ticket) error(400, 'Mangler CAS-ticket');

	// Service-URL'en skal matche den vi sendte i login-kaldet - uden query.
	const user = await validateTicket(`${url.origin}/auth/callback`, ticket);
	if (!user) error(401, 'CAS-login kunne ikke valideres');

	if (!(await isSuperuser(user.username))) {
		redirect(303, `/auth/denied?u=${encodeURIComponent(user.username)}`);
	}

	await createSession(cookies, user.username);
	const next = cookies.get('it3e26_next') ?? '/quiz/host';
	cookies.delete('it3e26_next', { path: '/' });
	redirect(303, next);
};
