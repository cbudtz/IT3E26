import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';

const loginDir = join(dirname(fileURLToPath(import.meta.url)), '../../routes/auth/login');

/**
 * /auth/login må ikke kun være et +server.ts-endpoint.
 * Client-routeren ignorerer endpoints, så et klik på "Host en quiz" lander i
 * [...slug] og 404'er indtil et fuldt page-load (refresh) rammer endpointet.
 */
test('auth/login is a page route so client-side navigation can follow the login redirect', () => {
	assert.equal(existsSync(join(loginDir, '+page.server.ts')), true);
	assert.equal(existsSync(join(loginDir, '+page.svelte')), true);
	assert.equal(existsSync(join(loginDir, '+server.ts')), false);
});
