# Teacher Patient API Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `GET /api/patients` and `POST /api/login` to the Vercel-hosted Express app in `examplesite/`, backed by Drizzle + Neon and five MedCom test patients.

**Architecture:** Keep the existing Express app (static `public/` + Vercel export). Add Drizzle with Neon HTTP, a `patients` table, idempotent seed, CORS `*`, JSON body parsing. No tokens, no CRUD, no changes under `site/`.

**Tech Stack:** Express 5, drizzle-orm neon-http, `@neondatabase/serverless`, bcryptjs, cors, dotenv, drizzle-kit, node:test, supertest. ESM (`"type": "module"`).

## Global Constraints

- Work only in `examplesite/` (plus this plan/spec if needed). Do not modify `site/`.
- Driver: `drizzle-orm/neon-http` + `neon(process.env.DATABASE_URL)` from `@neondatabase/serverless`.
- ESM: `"type": "module"`; `export default app`; listen only when `!process.env.VERCEL`.
- `GET /api/patients` is open; JSON items are only `{ cpr, navn }` — never `password` or `password_hash`.
- `POST /api/login` body `{ cpr, password }`. CPR: strip hyphen/spaces (keep digits). Password: no trim. bcryptjs compare against `password_hash`.
- Exact error bodies: 400 `{ "error": "cpr og password skal sendes" }`; 401 `{ "error": "forkert cpr eller password" }`; 500 `{ "error": "serverfejl" }`.
- Patients (MedCom, names = fornavn + efternavn):

| cpr | navn | password |
| --- | --- | --- |
| 2512489996 | Nancy Ann Test Berggren | password |
| 2911829996 | Kirsten Test Berggren | 12345678 |
| 0107729995 | Max Test Berggren | qwertyui |
| 1509819996 | Brita Test Berggren | p@ssw0rd |
| 3103979995 | Anders Test Jensen | password |

- CORS `origin: '*'`. Seed insert-if-missing; do not overwrite existing hashes.
- HTTP/DB tests skip (exit 0) when `DATABASE_URL` is unset. Password unit tests always run.
- Danish strings and MedCom CPRs verbatim. No sessions/tokens/doctors/CRUD.

---

### Task 1: ESM scaffold, schema, db, drizzle config

**Files:**
- Modify: `examplesite/package.json`
- Modify: `examplesite/server.js` (ESM conversion only; no API routes yet)
- Create: `examplesite/src/schema.js`
- Create: `examplesite/src/db.js`
- Create: `examplesite/drizzle.config.js`

**Interfaces:**
- Consumes: existing CJS `server.js` and `package.json`
- Produces: `export const patients` table; `export const db`; `export default app` (still serves `public/`)

- [ ] **Step 1: Convert package.json to ESM and add dependencies**

Set `"type": "module"`. Add scripts `test` and `db:push`. Dependencies: `drizzle-orm`, `@neondatabase/serverless`, `bcryptjs`, `cors`, `dotenv`. Dev: `drizzle-kit`, `supertest`. Keep `express`.

```json
{
	"name": "examplesite",
	"private": true,
	"type": "module",
	"scripts": {
		"start": "node server.js",
		"test": "node --test src/*.test.js",
		"db:push": "drizzle-kit push"
	},
	"dependencies": {
		"@neondatabase/serverless": "^1.0.2",
		"bcryptjs": "^3.0.2",
		"cors": "^2.8.5",
		"dotenv": "^17.2.2",
		"drizzle-orm": "^0.45.2",
		"express": "^5.2.1"
	},
	"devDependencies": {
		"drizzle-kit": "^0.31.10",
		"supertest": "^7.1.4"
	}
}
```

Use current npm versions if these pins fail to resolve (`npm install` in `examplesite/`).

- [ ] **Step 2: npm install**

Run from `examplesite/`: `npm install`

Expected: lockfile updated, no errors.

- [ ] **Step 3: Create schema, db, drizzle config**

`examplesite/src/schema.js`:

```js
import { pgTable, text } from 'drizzle-orm/pg-core';

export const patients = pgTable('patients', {
	cpr: text('cpr').primaryKey(),
	navn: text('navn').notNull(),
	passwordHash: text('password_hash').notNull()
});
```

`examplesite/src/db.js`:

```js
import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema.js';

config({ path: '.env' });

const url = process.env.DATABASE_URL;
if (!url) {
	throw new Error('DATABASE_URL mangler');
}

const sql = neon(url);
export const db = drizzle({ client: sql, schema });
export { schema };
```

`examplesite/drizzle.config.js`:

```js
import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';

config({ path: '.env' });

export default defineConfig({
	schema: './src/schema.js',
	out: './drizzle',
	dialect: 'postgresql',
	dbCredentials: { url: process.env.DATABASE_URL }
});
```

- [ ] **Step 4: Convert server.js to ESM without changing routes**

```js
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.get('/', (_req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(express.static(path.join(__dirname, 'public')));

export default app;

if (!process.env.VERCEL) {
	const port = Number(process.env.PORT) || 3000;
	app.listen(port, () => {
		console.log('http://localhost:' + port);
	});
}
```

Do **not** import `db.js` here yet (it throws without `DATABASE_URL` at import time, which would break static-only local start). Routes that need DB come in later tasks.

- [ ] **Step 5: Sanity-check ESM loads**

Run from `examplesite/`: `node -e "import('./server.js').then(() => { console.log('ok'); process.exit(0); })"`

Expected: prints `ok`. Then Ctrl is unnecessary because process.exit(0). If listen keeps the process alive, wrap: only import, then exit — the `if (!process.env.VERCEL)` block will listen. Set `VERCEL=1` so it does not listen:

`npx --yes cross-env` is extra. On PowerShell: `$env:VERCEL='1'; node -e "import('./server.js').then(() => { console.log('ok'); process.exit(0); })"`

Expected: `ok`

- [ ] **Step 6: Commit**

```bash
git add examplesite/package.json examplesite/package-lock.json examplesite/server.js examplesite/src/schema.js examplesite/src/db.js examplesite/drizzle.config.js
git commit -m "chore(examplesite): ESM scaffold with Drizzle Neon schema"
```

---

### Task 2: Password hashing helpers (TDD)

**Files:**
- Create: `examplesite/src/passwords.js`
- Test: `examplesite/src/passwords.test.js`

**Interfaces:**
- Consumes: bcryptjs
- Produces: `hashPassword(plain: string): Promise<string>`, `verifyPassword(plain: string, hash: string): Promise<boolean>`

- [ ] **Step 1: Write the failing tests**

`examplesite/src/passwords.test.js`:

```js
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
```

- [ ] **Step 2: Run tests — expect RED (module not found)**

Run from `examplesite/`: `node --test src/passwords.test.js`

Expected: FAIL, cannot find `./passwords.js` (or `hashPassword` export).

- [ ] **Step 3: Minimal implementation**

`examplesite/src/passwords.js`:

```js
import bcrypt from 'bcryptjs';

const ROUNDS = 10;

export async function hashPassword(plain) {
	return bcrypt.hash(plain, ROUNDS);
}

export async function verifyPassword(plain, hash) {
	return bcrypt.compare(plain, hash);
}
```

- [ ] **Step 4: Run tests — expect GREEN**

`node --test src/passwords.test.js`

Expected: 4 passing, no warnings.

- [ ] **Step 5: Commit**

```bash
git add examplesite/src/passwords.js examplesite/src/passwords.test.js
git commit -m "feat(examplesite): hash and verify patient passwords with bcryptjs"
```

---

### Task 3: Seed + GET /api/patients (TDD)

**Files:**
- Create: `examplesite/src/seed.js`
- Create: `examplesite/src/patients.js` (query helper: list without hashes)
- Modify: `examplesite/server.js`
- Test: `examplesite/src/patients.test.js`

**Interfaces:**
- Consumes: `db`, `patients` schema, `hashPassword`
- Produces: `seedPatients(): Promise<void>` (insert if cpr missing); `listPatients(): Promise<{cpr, navn}[]>`; `GET /api/patients`

Patient seed data (verbatim):

```js
export const SEED_PATIENTS = [
	{ cpr: '2512489996', navn: 'Nancy Ann Test Berggren', password: 'password' },
	{ cpr: '2911829996', navn: 'Kirsten Test Berggren', password: '12345678' },
	{ cpr: '0107729995', navn: 'Max Test Berggren', password: 'qwertyui' },
	{ cpr: '1509819996', navn: 'Brita Test Berggren', password: 'p@ssw0rd' },
	{ cpr: '3103979995', navn: 'Anders Test Jensen', password: 'password' }
];
```

If `DATABASE_URL` is missing, skip HTTP tests with `test('...', { skip: !process.env.DATABASE_URL }, ...)`. Load dotenv at the top of the test file via `import 'dotenv/config'` **before** skip check. Do not import `src/db.js` in the test file when URL is missing (it throws). Import `app` only inside tests that run, or make `db.js` lazy (preferred for this task):

**Change `src/db.js` to lazy getDb()** so importing server does not throw without DATABASE_URL:

```js
import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema.js';

config({ path: '.env' });

let _db;

export function getDb() {
	if (_db) return _db;
	const url = process.env.DATABASE_URL;
	if (!url) throw new Error('DATABASE_URL mangler');
	_db = drizzle({ client: neon(url), schema });
	return _db;
}

export { schema };
```

Update Task 1's `db.js` if it still throws at import — do that in this task.

- [ ] **Step 1: Write failing HTTP test**

`examplesite/src/patients.test.js`:

```js
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
```

- [ ] **Step 2: Run test — expect RED (404)**

`node --test src/patients.test.js`

Expected: skip if no DB; with DB, FAIL status 404 (route missing). If table missing, run `npx drizzle-kit push` once against `.env` then re-run until the failure is “route missing” or similar, then implement.

- [ ] **Step 3: Implement seed, list, route, CORS, json, 500 handler**

`examplesite/src/seed.js` — insert only when cpr is absent (`onConflictDoNothing` on `cpr`).

`examplesite/src/patients.js`:

```js
import { getDb, schema } from './db.js';

export async function listPatients() {
	const rows = await getDb().select({
		cpr: schema.patients.cpr,
		navn: schema.patients.navn
	}).from(schema.patients);
	return rows;
}
```

In `server.js` add:

```js
import cors from 'cors';
import { seedPatients } from './src/seed.js';
import { listPatients } from './src/patients.js';

app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/api/patients', async (_req, res) => {
	try {
		await seedPatients();
		const body = await listPatients();
		res.json(body);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'serverfejl' });
	}
});
```

Keep existing `/` and static after or before API — API must not be swallowed. Put API routes **before** `express.static`.

`seedPatients` uses `hashPassword` + `getDb().insert(schema.patients).values(...).onConflictDoNothing()`.

- [ ] **Step 4: drizzle-kit push (once, if table missing)**

From `examplesite/`: `npx drizzle-kit push`

Expected: creates `patients`. Non-interactive; if it prompts, pass `--force` if supported.

- [ ] **Step 5: Run tests — expect GREEN**

`node --test src/patients.test.js src/passwords.test.js`

Expected: all pass (or patients skipped without DB).

- [ ] **Step 6: Commit**

```bash
git add examplesite/src/db.js examplesite/src/seed.js examplesite/src/patients.js examplesite/src/patients.test.js examplesite/server.js
git commit -m "feat(examplesite): open GET /api/patients with MedCom seed"
```

---

### Task 4: POST /api/login + README (TDD)

**Files:**
- Create: `examplesite/src/login.js`
- Modify: `examplesite/server.js`
- Test: `examplesite/src/login.test.js`
- Create: `examplesite/README.md`

**Interfaces:**
- Consumes: `getDb`, `schema.patients`, `verifyPassword`, `seedPatients`
- Produces: `normalizeCpr(input)`, `login(cpr, password) -> {ok, status, body}`; `POST /api/login`

- [ ] **Step 1: Write failing login tests**

`examplesite/src/login.test.js` — skip HTTP cases without `DATABASE_URL`. Always test `normalizeCpr` without DB:

```js
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { config } from 'dotenv';
import request from 'supertest';
import { normalizeCpr } from './login.js';

config({ path: '.env' });
const hasDb = Boolean(process.env.DATABASE_URL);

test('normalizeCpr strips hyphen and spaces', () => {
	assert.equal(normalizeCpr('251248-9996'), '2512489996');
	assert.equal(normalizeCpr('251248 9996'), '2512489996');
});

async function postLogin(body) {
	const { default: app } = await import('../server.js');
	return request(app).post('/api/login').send(body);
}

test('login Nancy with password succeeds', { skip: !hasDb }, async () => {
	const res = await postLogin({ cpr: '2512489996', password: 'password' });
	assert.equal(res.status, 200);
	assert.deepEqual(res.body, { cpr: '2512489996', navn: 'Nancy Ann Test Berggren' });
	assert.equal('password' in res.body, false);
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
```

- [ ] **Step 2: Run — expect RED (login.js missing or 404)**

`node --test src/login.test.js`

- [ ] **Step 3: Implement login helper and route**

`examplesite/src/login.js`:

```js
import { eq } from 'drizzle-orm';
import { getDb, schema } from './db.js';
import { verifyPassword } from './passwords.js';

export function normalizeCpr(cpr) {
	return String(cpr ?? '').replace(/\D/g, '');
}

export async function login(cprRaw, password) {
	if (cprRaw == null || cprRaw === '' || password == null || password === '') {
		return { status: 400, body: { error: 'cpr og password skal sendes' } };
	}
	const cpr = normalizeCpr(cprRaw);
	if (!cpr || password === '') {
		return { status: 400, body: { error: 'cpr og password skal sendes' } };
	}
	const rows = await getDb()
		.select()
		.from(schema.patients)
		.where(eq(schema.patients.cpr, cpr))
		.limit(1);
	const row = rows[0];
	if (!row || !(await verifyPassword(password, row.passwordHash))) {
		return { status: 401, body: { error: 'forkert cpr eller password' } };
	}
	return { status: 200, body: { cpr: row.cpr, navn: row.navn } };
}
```

`POST /api/login` in `server.js`: `await seedPatients()` then `login(req.body.cpr, req.body.password)`; 500 on throw with `{ error: 'serverfejl' }`.

- [ ] **Step 4: Tests GREEN**

`node --test src/*.test.js`

Expected: all pass / skip-without-DB only on HTTP tests.

- [ ] **Step 5: README**

`examplesite/README.md` covering: local `npm start`, `DATABASE_URL` in `.env`, `npm run db:push`, `npm test`, curl for GET and POST, the five CPR/password pairs, CORS, “kun test/undervisning”.

- [ ] **Step 6: Commit**

```bash
git add examplesite/src/login.js examplesite/src/login.test.js examplesite/server.js examplesite/README.md
git commit -m "feat(examplesite): POST /api/login with MedCom CPR and hashed passwords"
```
