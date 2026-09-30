import assert from 'node:assert/strict';
import { test } from 'node:test';
import { config } from 'dotenv';
import request from 'supertest';
import { loginSuccessBody, normalizeCpr } from './login.js';

config({ path: '.env' });
const hasDb = Boolean(process.env.DATABASE_URL);

test('normalizeCpr strips hyphen and spaces', () => {
	assert.equal(normalizeCpr('251248-9996'), '2512489996');
	assert.equal(normalizeCpr('251248 9996'), '2512489996');
});

test('login success body keeps cpr and navn and adds user plus 5 minute expiry', () => {
	const now = Date.parse('2026-09-30T08:30:00.000Z');
	const body = loginSuccessBody(
		{ cpr: '2512489996', navn: 'Nancy Ann Test Berggren' },
		now
	);
	assert.deepEqual(body, {
		cpr: '2512489996',
		navn: 'Nancy Ann Test Berggren',
		user: { cpr: '2512489996', navn: 'Nancy Ann Test Berggren' },
		expiry: '2026-09-30T08:35:00.000Z'
	});
});

async function postLogin(body) {
	const { default: app } = await import('../server.js');
	return request(app).post('/api/login').send(body);
}

test('login Nancy with password succeeds', { skip: !hasDb }, async () => {
	const before = Date.now();
	const res = await postLogin({ cpr: '2512489996', password: 'password' });
	const after = Date.now();
	assert.equal(res.status, 200);
	assert.equal(res.body.cpr, '2512489996');
	assert.equal(res.body.navn, 'Nancy Ann Test Berggren');
	assert.deepEqual(res.body.user, {
		cpr: '2512489996',
		navn: 'Nancy Ann Test Berggren'
	});
	const expiry = Date.parse(res.body.expiry);
	const fiveMin = 5 * 60 * 1000;
	assert.ok(expiry >= before + fiveMin && expiry <= after + fiveMin);
	assert.equal('password' in res.body, false);
	assert.equal('password' in res.body.user, false);
});

test('login Kirsten with 12345678 succeeds', { skip: !hasDb }, async () => {
	const res = await postLogin({ cpr: '2911829996', password: '12345678' });
	assert.equal(res.status, 200);
	assert.equal(res.body.cpr, '2911829996');
});

test('login Max with qwertyui succeeds', { skip: !hasDb }, async () => {
	const res = await postLogin({ cpr: '0107729995', password: 'qwertyui' });
	assert.equal(res.status, 200);
});

test('login Brita with p@ssw0rd succeeds', { skip: !hasDb }, async () => {
	const res = await postLogin({ cpr: '1509819996', password: 'p@ssw0rd' });
	assert.equal(res.status, 200);
});

test('login Anders with password succeeds', { skip: !hasDb }, async () => {
	const res = await postLogin({ cpr: '3103979995', password: 'password' });
	assert.equal(res.status, 200);
});

test('login accepts hyphenated CPR', { skip: !hasDb }, async () => {
	const res = await postLogin({ cpr: '251248-9996', password: 'password' });
	assert.equal(res.status, 200);
	assert.equal(res.body.cpr, '2512489996');
});

test('Kirsten CPR with Nancy password is 401', { skip: !hasDb }, async () => {
	const res = await postLogin({ cpr: '2911829996', password: 'password' });
	assert.equal(res.status, 401);
	assert.deepEqual(res.body, { error: 'forkert cpr eller password' });
});

test('missing fields is 400', { skip: !hasDb }, async () => {
	const res = await postLogin({});
	assert.equal(res.status, 400);
	assert.deepEqual(res.body, { error: 'cpr og password skal sendes' });
});

test('POST /api/login without JSON body is 400', { skip: !hasDb }, async () => {
	const { default: app } = await import('../server.js');
	const res = await request(app).post('/api/login');
	assert.equal(res.status, 400);
	assert.deepEqual(res.body, { error: 'cpr og password skal sendes' });
});
