import assert from 'node:assert/strict';
import { test } from 'node:test';
import { config } from 'dotenv';
import request from 'supertest';

config({ path: '.env' });

const hasDb = Boolean(process.env.DATABASE_URL);

test('GET /api/patients returns five MedCom patients without password fields', { skip: !hasDb }, async () => {
	const { default: app } = await import('../server.js');
	const res = await request(app).get('/api/patients');
	assert.equal(res.status, 200);
	assert.equal(Array.isArray(res.body), true);
	assert.equal(res.body.length, 5);
	const cprs = res.body.map((p) => p.cpr).sort();
	assert.deepEqual(cprs, ['0107729995', '1509819996', '2512489996', '2911829996', '3103979995']);
	for (const p of res.body) {
		assert.equal(typeof p.navn, 'string');
		assert.equal('password' in p, false);
		assert.equal('password_hash' in p, false);
		assert.equal('passwordHash' in p, false);
	}
	const nancy = res.body.find((p) => p.cpr === '2512489996');
	assert.equal(nancy.navn, 'Nancy Ann Test Berggren');
});
