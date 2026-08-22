import { dev } from '$app/environment';
import type { LayoutServerLoad } from './$types';

/** Colyseus-endpoint: i dev egen port (se vite.config.ts), i prod samme origin. */
export const load: LayoutServerLoad = ({ url }) => ({
	realtimeUrl: dev ? `${url.protocol}//${url.hostname}:2567` : url.origin
});
