import { redirect, type Handle, type ServerInit } from '@sveltejs/kit';
import { bootstrap } from '$lib/server/bootstrap';
import { getSessionUser } from '$lib/server/auth/session';

export const init: ServerInit = async () => {
	await bootstrap();
};

/** Kun disse stier kraever login. Alt andet (materiale, studerende-quiz) er aabent. */
const PROTECTED = [/^\/quiz\/host(\/|$)/];

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.user = await getSessionUser(event.cookies);

	if (!event.locals.user && PROTECTED.some((re) => re.test(event.url.pathname))) {
		const next = encodeURIComponent(event.url.pathname + event.url.search);
		redirect(303, `/auth/login?next=${next}`);
	}
	return resolve(event);
};
