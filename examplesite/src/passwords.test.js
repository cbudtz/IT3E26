import assert from 'node:assert/strict';
import { test } from 'node:test';
import { hashPassword, verifyPassword } from './passwords.js';

test('hashPassword returns a bcrypt hash, not the plaintext', async () => {
	const hash = await hashPassword('password');
	assert.notEqual(hash, 'password');
	assert.match(hash, /^\$2[aby]\$/);
});

test('verifyPassword accepts the original password', async () => {
	const hash = await hashPassword('p@ssw0rd');
	assert.equal(await verifyPassword('p@ssw0rd', hash), true);
});

test('verifyPassword rejects a different password', async () => {
	const hash = await hashPassword('password');
	assert.equal(await verifyPassword('12345678', hash), false);
});

test('verifyPassword does not trim the password', async () => {
	const hash = await hashPassword('password');
	assert.equal(await verifyPassword('password ', hash), false);
});
