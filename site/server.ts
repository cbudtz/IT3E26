/**
 * Produktions-entry: SvelteKit (adapter-node) og Colyseus i SAMME proces paa
 * SAMME port - altsaa én app i CapRover.
 *
 * Kør med:  node server.ts   (Node >= 22 stripper typerne selv)
 */
import { createServer } from 'node:http';
import { toNodeHandler } from 'colyseus';
// @ts-expect-error - genereres af `vite build` (adapter-node)
import { handler } from './build/handler.js';
import { attachColyseus } from './src/lib/server/realtime/attach.ts';

const port = Number(process.env.PORT ?? 3000);
const httpServer = createServer();
const gameServer = await attachColyseus(httpServer);

const colyseusRoutes = toNodeHandler(gameServer.router.handler);

// Colyseus og adapter-node vil begge gerne vaere catch-all. Vi fjerner de
// listeners de selv har sat paa, og dirigerer eksplicit i stedet: kendte
// Colyseus-routes (/matchmake/*) til Colyseus, alt andet til SvelteKit.
httpServer.removeAllListeners('request');
httpServer.on('request', (req, res) => {
	const path = (req.url ?? '').split('?')[0];
	// Kun Colyseus' egne endpoints - ellers sluger dens catch-all forsiden.
	if (path.startsWith('/matchmake/') && gameServer.router.findRoute(req.method, path) !== undefined) {
		return colyseusRoutes(req, res);
	}
	return handler(req, res, () => {
		res.statusCode = 404;
		res.end('Not found');
	});
});

httpServer.listen(port, () => {
	console.log('SvelteKit + Colyseus lytter paa http://localhost:' + port);
});
