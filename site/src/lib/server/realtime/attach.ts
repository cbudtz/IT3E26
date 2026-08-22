import type { Server as HttpServer } from 'node:http';
import { Server } from 'colyseus';
import { WebSocketTransport } from '@colyseus/ws-transport';
import { QuizRoom } from './QuizRoom.ts';

let gameServer: Server | null = null;

/**
 * Forbereder Colyseus paa en eksisterende http.Server: registrerer rooms og
 * binder matchmaking-routes (/matchmake/*) samt WebSocket-upgrade - men binder
 * IKKE porten. Kalderen styrer listen(), saa SvelteKit og Colyseus kan dele
 * baade proces og port.
 *
 * Idempotent, saa Vites HMR ikke starter to instanser.
 */
export async function attachColyseus(httpServer: HttpServer): Promise<Server> {
	if (gameServer) return gameServer;

	gameServer = new Server({
		transport: new WebSocketTransport({ server: httpServer }),
		greet: false
	});
	gameServer.define('quiz', QuizRoom).filterBy(['joinCode']);

	// serverless() = "gør alt klar, men lad porten vaere".
	await gameServer.serverless();
	return gameServer;
}

/**
 * Express-app'en som Colyseus har bundet sine routes paa. Montér SvelteKits
 * handler her EFTER attachColyseus(), saa /matchmake/* rammer Colyseus foerst
 * og alt andet falder igennem til SvelteKit.
 */
export function realtimeExpressApp(server: Server) {
	return (server.transport as unknown as { getExpressApp(): any }).getExpressApp();
}
