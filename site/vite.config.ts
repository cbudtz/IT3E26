import adapter from '@sveltejs/adapter-node';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import { createServer } from 'node:http';
import { attachColyseus } from './src/lib/server/realtime/attach.ts';

/**
 * Port som Colyseus lytter paa under `vite dev`.
 * I produktion deler Colyseus port med SvelteKit (se server.ts) - i dev kan den
 * ikke det, fordi Vites HMR allerede ejer 'upgrade'-eventet paa Vite-serveren.
 * Det er stadig SAMME proces, saa det er én `npm run dev` og HMR virker.
 */
const DEV_REALTIME_PORT = 2567;

function colyseusDev(): Plugin {
	return {
		name: 'colyseus-dev',
		apply: 'serve',
		configureServer(server) {
			// QuizRoom persisterer via process.env.DATABASE_URL (ingen $env i u-bundlet kode).
			Object.assign(process.env, loadEnv(server.config.mode, process.cwd(), ''));
			const rt = createServer();
			void attachColyseus(rt).then(() => {
				rt.listen(DEV_REALTIME_PORT, () => {
					console.log('  -> Colyseus (dev): ws://localhost:' + DEV_REALTIME_PORT);
				});
			});
		}
	};
}

export default defineConfig({
	plugins: [
		colyseusDev(),
		sveltekit({
			compilerOptions: {
				runes: ({ filename }) => (filename.includes('node_modules') ? undefined : true)
			},
			adapter: adapter()
		})
	]
});
