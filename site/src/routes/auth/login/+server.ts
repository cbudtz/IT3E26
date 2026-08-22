import { redirect } from '@sveltejs/kit';
import { loginUrl } from '$lib/server/auth/cas';
import type { RequestHandler } from './$types';

/** Sender brugeren til DTU CAS. `next` (relativ sti) huskes i en cookie. */
export const GET: RequestHandler = ({ url, cookies }) => {
	const next = url.searchParams.get('next') ?? '/quiz/host';
	cookies.set('it3e26_next', next.startsWith('/') ? next : '/quiz/host', {
		path: '/', httpOnly: true, sameSite: 'lax', maxAge: 600
	});
	redirect(302, loginUrl(`${url.origin}/auth/callback`));
};
