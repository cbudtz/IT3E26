# Offentlige quizzer til selv-prøvning – Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Underviser kan markere en quiz som offentlig på `/quiz/host`; studerende kan tage den anonymt i eget tempo på `/quiz/practice/<slug>` med øjeblikkelig facit.

**Architecture:** Ny tabel `public_quizzes` (slug-PK) styrer hvilke quiz-JSON'er der er synlige på `/quiz`. Ny route `/quiz/practice/[...slug]` sender spørgsmål uden `correct` til klienten; hvert svar POSTes som form action og bedømmes server-side med samme regel som live-rummet. Score og indeks lever kun i klientens `$state` – intet gemmes. Ren logik (bedømmelse, strip, filtrering, form-parsing) ligger i alias-frie moduler så de kan testes med `node --test`.

**Tech Stack:** SvelteKit 2 / Svelte 5 (runes, form actions, `use:enhance`), drizzle-orm + postgres, drizzle-kit for migration, `node --test` med `--experimental-strip-types`.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-09-04-offentlige-quizzer-design.md`.
- Arbejd i et worktree: `git worktree add .worktrees/feat-offentlige-quizzer -b feat-offentlige-quizzer` (jf. `AGENTS.md`). Alle stier nedenfor er relative til repo-roden i worktreet; kommandoer køres fra `site/`.
- Ingen ændring af Colyseus-state, `persist.ts` eller resultatsider. Eneste rettelse i `QuizRoom.ts` er at importere `isCorrect` fra det nye `grading.ts` i stedet for at definere den lokalt (DRY).
- Ingen rækker i `quiz_runs` / `quiz_answers`. Ingen `"public"`-felt i quiz-JSON. Ingen login på practice-siden.
- Manglende `DATABASE_URL`: live-host virker stadig; flueben og "Prøv en quiz selv" er slået fra (ingen kast).
- Testfiler i `site/src/lib/server/*.test.ts` må **ikke** importere `$lib`/`$env`/`@sveltejs/kit` – `npm test` kører rå Node. Rene moduler må kun bruge relative imports (type-imports er ok).
- Brugertekster på dansk: "Offentlig", "Prøv en quiz selv", "Næste", "Rigtigt!", "Forkert.", "Du fik x af N rigtige".
- Commit-beskeder afsluttes med `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`.

---

## File Structure

| Fil | Ansvar |
| --- | --- |
| `site/src/lib/server/grading.ts` (ny) | `isCorrect(q, value)` – flyttet fra `QuizRoom.ts`. Ren. |
| `site/src/lib/server/realtime/QuizRoom.ts` (ændres) | Importér `isCorrect` fra `../grading.ts`. |
| `site/src/lib/server/practice.ts` (ny) | Rene hjælpere: `stripCorrect`, `selectPublic`, `parsePublishForm`, `parseAnswerForm`. |
| `site/src/lib/server/practice.test.ts` (ny) | Unit-tests for `grading.ts` + `practice.ts`. |
| `site/src/lib/server/db/schema.ts` (ændres) | Tabel `publicQuizzes`. |
| `site/drizzle/0002_public_quizzes.sql` + `meta/*` (genereret) | Migration. |
| `site/src/lib/server/publicQuizzes.ts` (ny) | DB-adgang: `publishingEnabled`, `listPublicSlugs`, `isPublic`, `setPublic`. |
| `site/src/routes/quiz/host/+page.server.ts` (ændres) | Load `publicSlugs` + `canPublish`; action `publish`. |
| `site/src/routes/quiz/host/+page.svelte` (ændres) | Checkbox "Offentlig" pr. quiz. |
| `site/src/routes/quiz/+page.server.ts` (ny) | Load liste over offentlige quizzer. |
| `site/src/routes/quiz/+page.svelte` (ændres) | Sektion "Prøv en quiz selv". |
| `site/src/routes/quiz/practice/[...slug]/+page.server.ts` (ny) | Load (404-guard, strip `correct`) + action `answer`. |
| `site/src/routes/quiz/practice/[...slug]/+page.svelte` (ny) | Ét spørgsmål ad gangen, feedback, Næste, slutskærm. |

---

### Task 1: Udtræk bedømmelse til `grading.ts`

**Files:**
- Create: `site/src/lib/server/grading.ts`
- Modify: `site/src/lib/server/realtime/QuizRoom.ts:26-31`
- Test: `site/src/lib/server/practice.test.ts`

**Interfaces:**
- Produces: `isCorrect(q: QuestionDef, value: string): boolean` – `short`: trim+lowercase-match mod `q.correct` (strings); `mc`/`tf`: `Number(value)` findes i `q.correct` (numbers).

- [ ] **Step 1: Skriv de fejlende tests**

Opret `site/src/lib/server/practice.test.ts`:

```ts
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { isCorrect } from './grading.ts';
import type { QuestionDef } from './realtime/QuizRoom.ts';

const mc: QuestionDef = { id: 'q1', type: 'mc', prompt: 'Hvad er 2+2?', options: ['3', '4', '5'], correct: [1] };
const short: QuestionDef = { id: 'q2', type: 'short', prompt: 'Hovedstad i DK?', options: [], correct: ['København'] };

test('isCorrect: rigtigt mc-svar', () => {
	assert.equal(isCorrect(mc, '1'), true);
});

test('isCorrect: forkert mc-svar', () => {
	assert.equal(isCorrect(mc, '0'), false);
	assert.equal(isCorrect(mc, 'abc'), false);
});

test('isCorrect: short er case-insensitive og trimmet', () => {
	assert.equal(isCorrect(short, '  københavn '), true);
	assert.equal(isCorrect(short, 'Aarhus'), false);
});
```

- [ ] **Step 2: Kør testen og se den fejle**

Run: `npm test` (fra `site/`)
Expected: FAIL – `Cannot find module './grading.ts'`

- [ ] **Step 3: Opret `grading.ts`**

```ts
import type { QuestionDef } from './realtime/QuizRoom';

const norm = (s: string) => s.trim().toLowerCase();

/** Samme regel for live-rum og selv-prøvning. */
export const isCorrect = (q: QuestionDef, value: string): boolean => {
	if (q.type === 'short') return (q.correct as string[]).some((c) => norm(c) === norm(value));
	return (q.correct as number[]).includes(Number(value));
};
```

- [ ] **Step 4: Brug den i `QuizRoom.ts`**

Erstat linje 26-31 (`const norm = ...` og `const isCorrect = ...`) med én import øverst i filen, efter de eksisterende imports:

```ts
import { isCorrect } from '../grading.ts';
```

Slet `norm` og den lokale `isCorrect`. Intet andet i filen ændres.

- [ ] **Step 5: Kør tests + typecheck**

Run: `npm test`
Expected: 5 tests pass (2 gamle + 3 nye).

Run: `npm run check`
Expected: 0 errors.

- [ ] **Step 6: Commit**

```bash
git add site/src/lib/server/grading.ts site/src/lib/server/realtime/QuizRoom.ts site/src/lib/server/practice.test.ts
git commit -m "Udtræk quiz-bedømmelse til grading.ts så den kan genbruges

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 2: Rene practice-hjælpere

**Files:**
- Create: `site/src/lib/server/practice.ts`
- Test: `site/src/lib/server/practice.test.ts`

**Interfaces:**
- Consumes: `QuestionDef` fra `./realtime/QuizRoom`.
- Produces:
  - `type PracticeQuestion = Omit<QuestionDef, 'correct'>`
  - `stripCorrect(questions: QuestionDef[]): PracticeQuestion[]`
  - `selectPublic<T extends { slug: string }>(all: T[], publicSlugs: Iterable<string>): T[]`
  - `parsePublishForm(fd: FormData): { slug: string; on: boolean } | null` – `slug` skal være ikke-tom streng; `on` er `true` hvis feltet `on` er `'1'`.
  - `parseAnswerForm(fd: FormData): { questionId: string; value: string } | null` – begge ikke-tomme strenge; `value` afkortes til 200 tegn.

- [ ] **Step 1: Tilføj fejlende tests**

Tilføj til `site/src/lib/server/practice.test.ts` (under de eksisterende):

```ts
import { stripCorrect, selectPublic, parsePublishForm, parseAnswerForm } from './practice.ts';

test('stripCorrect fjerner facit men beholder resten', () => {
	const out = stripCorrect([mc, short]);
	assert.equal(out.length, 2);
	for (const q of out) assert.equal('correct' in q, false);
	assert.deepEqual(out[0], { id: 'q1', type: 'mc', prompt: 'Hvad er 2+2?', options: ['3', '4', '5'] });
});

test('selectPublic beholder kun offentlige slugs i oprindelig rækkefølge', () => {
	const all = [
		{ slug: 'lektion1/quiz-a', title: 'A' },
		{ slug: 'lektion3/quiz-b', title: 'B' },
		{ slug: 'lektion5/quiz-c', title: 'C' }
	];
	assert.deepEqual(selectPublic(all, new Set(['lektion5/quiz-c', 'lektion1/quiz-a', 'ukendt'])), [all[0], all[2]]);
	assert.deepEqual(selectPublic(all, []), []);
});

test('parsePublishForm: publicér og afpublicér', () => {
	const on = new FormData();
	on.set('slug', 'lektion1/quiz-a');
	on.set('on', '1');
	assert.deepEqual(parsePublishForm(on), { slug: 'lektion1/quiz-a', on: true });

	const off = new FormData();
	off.set('slug', 'lektion1/quiz-a');
	assert.deepEqual(parsePublishForm(off), { slug: 'lektion1/quiz-a', on: false });

	assert.equal(parsePublishForm(new FormData()), null);
});

test('parseAnswerForm kræver questionId og value, afkorter value', () => {
	const fd = new FormData();
	fd.set('questionId', 'q1');
	fd.set('value', 'x'.repeat(300));
	const r = parseAnswerForm(fd);
	assert.equal(r?.questionId, 'q1');
	assert.equal(r?.value.length, 200);

	const missing = new FormData();
	missing.set('questionId', 'q1');
	assert.equal(parseAnswerForm(missing), null);
});
```

- [ ] **Step 2: Kør og se dem fejle**

Run: `npm test`
Expected: FAIL – `Cannot find module './practice.ts'`

- [ ] **Step 3: Implementér `practice.ts`**

```ts
import type { QuestionDef } from './realtime/QuizRoom';

export type PracticeQuestion = Omit<QuestionDef, 'correct'>;

/** Facit må ikke forlade serveren før der er svaret. */
export function stripCorrect(questions: QuestionDef[]): PracticeQuestion[] {
	return questions.map(({ correct: _correct, ...rest }) => rest);
}

export function selectPublic<T extends { slug: string }>(all: T[], publicSlugs: Iterable<string>): T[] {
	const set = new Set(publicSlugs);
	return all.filter((q) => set.has(q.slug));
}

const str = (v: FormDataEntryValue | null) => (typeof v === 'string' ? v.trim() : '');

export function parsePublishForm(fd: FormData): { slug: string; on: boolean } | null {
	const slug = str(fd.get('slug'));
	if (!slug) return null;
	return { slug, on: fd.get('on') === '1' };
}

export function parseAnswerForm(fd: FormData): { questionId: string; value: string } | null {
	const questionId = str(fd.get('questionId'));
	const value = str(fd.get('value')).slice(0, 200);
	if (!questionId || !value) return null;
	return { questionId, value };
}
```

- [ ] **Step 4: Kør tests**

Run: `npm test`
Expected: 9 tests pass.

- [ ] **Step 5: Commit**

```bash
git add site/src/lib/server/practice.ts site/src/lib/server/practice.test.ts
git commit -m "Tilføj rene hjælpere til selv-prøvning af quizzer

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 3: Tabel `public_quizzes` + migration + DB-modul

**Files:**
- Modify: `site/src/lib/server/db/schema.ts` (tilføj efter `quizAnswers`)
- Create (genereret): `site/drizzle/0002_public_quizzes.sql`, `site/drizzle/meta/0002_snapshot.json`, opdateret `site/drizzle/meta/_journal.json`
- Create: `site/src/lib/server/publicQuizzes.ts`

**Interfaces:**
- Produces:
  - `schema.publicQuizzes` med kolonner `quizSlug` (PK), `publishedBy`, `publishedAt`.
  - `publishingEnabled(): boolean` – `true` hvis `DATABASE_URL` er sat.
  - `listPublicSlugs(): Promise<Set<string>>` – tom `Set` hvis DB er slået fra.
  - `isPublic(slug: string): Promise<boolean>` – `false` hvis DB er slået fra.
  - `setPublic(slug: string, by: string, on: boolean): Promise<void>` – insert (onConflictDoNothing) eller delete. No-op hvis DB er slået fra.

- [ ] **Step 1: Tilføj tabel til schema**

Tilføj nederst i `site/src/lib/server/db/schema.ts`:

```ts
/** Quizzer som studerende kan tage selv på /quiz/practice. Tom tabel = intet offentligt. */
export const publicQuizzes = pgTable('public_quizzes', {
	quizSlug: text('quiz_slug').primaryKey(),
	publishedBy: text('published_by').notNull(),
	publishedAt: timestamp('published_at', { withTimezone: true }).notNull().defaultNow()
});
```

- [ ] **Step 2: Generér migration**

Run (fra `site/`): `npx drizzle-kit generate --name public_quizzes`
Expected output indeholder: `1 tables` / `public_quizzes 3 columns` og `[✓] Your SQL migration file ➜ drizzle\0002_public_quizzes.sql`.

Verificér at `site/drizzle/0002_public_quizzes.sql` er præcis:

```sql
CREATE TABLE "public_quizzes" (
	"quiz_slug" text PRIMARY KEY NOT NULL,
	"published_by" text NOT NULL,
	"published_at" timestamp with time zone DEFAULT now() NOT NULL
);
```

og at `site/drizzle/meta/_journal.json` har fået en tredje entry med `"idx": 2, "tag": "0002_public_quizzes"`. Hvis drizzle-kit brokker sig over `DATABASE_URL`, kør med `DATABASE_URL=postgres://x npx drizzle-kit generate --name public_quizzes` (generate åbner ingen forbindelse).

- [ ] **Step 3: Opret `publicQuizzes.ts`**

```ts
import { eq } from 'drizzle-orm';
import { env } from '$env/dynamic/private';
import { db, schema } from '$lib/server/db';

/** Uden DATABASE_URL virker live-host stadig, men flueben og selv-prøvning er slået fra. */
export const publishingEnabled = () => !!env.DATABASE_URL;

export async function listPublicSlugs(): Promise<Set<string>> {
	if (!publishingEnabled()) return new Set();
	const rows = await db.select({ slug: schema.publicQuizzes.quizSlug }).from(schema.publicQuizzes);
	return new Set(rows.map((r) => r.slug));
}

export async function isPublic(slug: string): Promise<boolean> {
	if (!publishingEnabled()) return false;
	const rows = await db
		.select({ slug: schema.publicQuizzes.quizSlug })
		.from(schema.publicQuizzes)
		.where(eq(schema.publicQuizzes.quizSlug, slug))
		.limit(1);
	return rows.length > 0;
}

export async function setPublic(slug: string, by: string, on: boolean): Promise<void> {
	if (!publishingEnabled()) return;
	if (on) {
		await db.insert(schema.publicQuizzes).values({ quizSlug: slug, publishedBy: by }).onConflictDoNothing();
	} else {
		await db.delete(schema.publicQuizzes).where(eq(schema.publicQuizzes.quizSlug, slug));
	}
}
```

- [ ] **Step 4: Typecheck og migrér lokalt**

Run: `npm run check`
Expected: 0 errors.

Run: `npm run dev` (kræver `DATABASE_URL` i `site/.env`), se serverloggen.
Expected: `[bootstrap] DB migreret. ...` uden fejl. Stop serveren igen (Ctrl+C).

- [ ] **Step 5: Commit**

```bash
git add site/src/lib/server/db/schema.ts site/drizzle site/src/lib/server/publicQuizzes.ts
git commit -m "Tilføj tabel public_quizzes og DB-adgang til offentliggørelse

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 4: Checkbox "Offentlig" på `/quiz/host`

**Files:**
- Modify: `site/src/routes/quiz/host/+page.server.ts` (hele filen)
- Modify: `site/src/routes/quiz/host/+page.svelte` (hele filen)

**Interfaces:**
- Consumes: `listQuizzes()` fra `$lib/server/quizzes`; `listPublicSlugs`, `setPublic`, `publishingEnabled` fra `$lib/server/publicQuizzes`; `parsePublishForm` fra `$lib/server/practice`.
- Produces: page data `{ user, quizzes, publicSlugs: string[], canPublish: boolean }`; action `?/publish` med felter `slug`, `on` (`'1'` = offentlig).

- [ ] **Step 1: Skriv `+page.server.ts`**

```ts
import { fail } from '@sveltejs/kit';
import { listQuizzes } from '$lib/server/quizzes';
import { listPublicSlugs, publishingEnabled, setPublic } from '$lib/server/publicQuizzes';
import { parsePublishForm } from '$lib/server/practice';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const [quizzes, publicSlugs] = await Promise.all([listQuizzes(), listPublicSlugs()]);
	return {
		user: locals.user,
		quizzes,
		publicSlugs: [...publicSlugs],
		canPublish: publishingEnabled()
	};
};

export const actions: Actions = {
	publish: async ({ request, locals }) => {
		const input = parsePublishForm(await request.formData());
		if (!input) return fail(400, { error: 'Ugyldig quiz' });
		// Ukendt slug: ingen skrivning.
		const known = (await listQuizzes()).some((q) => q.slug === input.slug);
		if (!known) return fail(404, { error: `Ingen quiz "${input.slug}"` });
		await setPublic(input.slug, locals.user!, input.on);
	}
};
```

- [ ] **Step 2: Skriv `+page.svelte`**

```svelte
<script lang="ts">
	import { enhance } from '$app/forms';

	let { data } = $props();
	const isPublic = (slug: string) => data.publicSlugs.includes(slug);
</script>

<svelte:head><title>Quiz-host · IT3E26</title></svelte:head>

<h1>Quiz-host</h1>
<p class="muted">Logget ind som <strong>{data.user}</strong> · <a href="/quiz/host/results">Resultater</a> · <a href="/auth/logout">Log ud</a></p>

<h2>Start en quiz</h2>
{#if data.quizzes.length === 0}
	<p>Ingen quizzer fundet. Læg en <code>quiz-*.json</code> i en lektionsmappe.</p>
{:else}
	{#if !data.canPublish}
		<p class="muted">DATABASE_URL mangler – quizzer kan ikke gøres offentlige.</p>
	{/if}
	<ul class="list">
		{#each data.quizzes as q (q.slug)}
			<li>
				<a href="/quiz/host/run/{q.slug}">{q.title}</a> <span class="muted">({q.slug})</span>
				<form method="POST" action="?/publish" use:enhance class="publish">
					<input type="hidden" name="slug" value={q.slug} />
					<label>
						<input
							type="checkbox"
							name="on"
							value="1"
							checked={isPublic(q.slug)}
							disabled={!data.canPublish}
							onchange={(e) => e.currentTarget.form?.requestSubmit()}
						/>
						Offentlig
					</label>
				</form>
			</li>
		{/each}
	</ul>
{/if}

<style>
	.muted { color: #57606a; }
	.list { padding-left: 1.2rem; }
	.list li { margin: 0.4rem 0; display: flex; gap: 0.8rem; align-items: baseline; flex-wrap: wrap; }
	.publish { display: inline; }
	.publish label { font-weight: 400; cursor: pointer; }
</style>
```

Bemærk: en uafkrydset checkbox sendes ikke med i form-data, så `parsePublishForm` ser `on` som `false` – det er afpublicering.

- [ ] **Step 3: Typecheck**

Run: `npm run check`
Expected: 0 errors.

- [ ] **Step 4: Manuel verifikation**

Run: `npm run dev`. Log ind og åbn `/quiz/host`.
- Sæt flueben ved en quiz → ingen sideskift, fluebenet bliver stående efter reload (F5).
- Fjern fluebenet → forbliver væk efter reload.
- I `npm run db:studio` (eller psql): `public_quizzes` har rækken ved sat flueben, og den er væk efter fjernelse.

- [ ] **Step 5: Commit**

```bash
git add site/src/routes/quiz/host/+page.server.ts site/src/routes/quiz/host/+page.svelte
git commit -m "Lad underviser markere quizzer som offentlige på /quiz/host

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 5: Sektion "Prøv en quiz selv" på `/quiz`

**Files:**
- Create: `site/src/routes/quiz/+page.server.ts`
- Modify: `site/src/routes/quiz/+page.svelte:1-3, 32-33, 41`

**Interfaces:**
- Consumes: `listQuizzes`, `listPublicSlugs`, `selectPublic`.
- Produces: page data `{ practiceQuizzes: { slug: string; title: string }[] }` (ud over `realtimeUrl` fra layout).

- [ ] **Step 1: Opret `+page.server.ts`**

```ts
import { listQuizzes } from '$lib/server/quizzes';
import { listPublicSlugs } from '$lib/server/publicQuizzes';
import { selectPublic } from '$lib/server/practice';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [all, publicSlugs] = await Promise.all([listQuizzes(), listPublicSlugs()]);
	return { practiceQuizzes: selectPublic(all, publicSlugs) };
};
```

- [ ] **Step 2: Opdatér `+page.svelte`**

Tilføj `let { data } = $props();` som første linje i `<script>` (efter imports). Indsæt følgende **efter** `<p class="muted">Underviser? …</p>` og **før** `</section>`:

```svelte
	{#if data.practiceQuizzes.length > 0}
		<h2>Prøv en quiz selv</h2>
		<p class="muted small">Ingen kode, ingen login – du får facit efter hvert spørgsmål.</p>
		<ul class="practice">
			{#each data.practiceQuizzes as q (q.slug)}
				<li><a href="/quiz/practice/{q.slug}">{q.title}</a></li>
			{/each}
		</ul>
	{/if}
```

Tilføj til `<style>`:

```css
	h2 { margin-top: 2.5rem; }
	.small { margin-top: 0; }
	.practice { padding-left: 1.2rem; }
	.practice li { margin: 0.4rem 0; }
```

- [ ] **Step 3: Typecheck + manuel verifikation**

Run: `npm run check` → 0 errors.

Run: `npm run dev`, åbn `/quiz` i et inkognitovindue (ikke logget ind):
- Med mindst én offentlig quiz: sektionen vises med titlen som link til `/quiz/practice/<slug>`.
- Fjern alle flueben på `/quiz/host` → sektionen forsvinder helt (ingen tom overskrift).
- "Deltag i quiz"-formularen virker som før.

- [ ] **Step 4: Commit**

```bash
git add site/src/routes/quiz/+page.server.ts site/src/routes/quiz/+page.svelte
git commit -m "Vis offentlige quizzer under 'Prøv en quiz selv' på /quiz

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 6: Øvelsessiden `/quiz/practice/[...slug]`

**Files:**
- Create: `site/src/routes/quiz/practice/[...slug]/+page.server.ts`
- Create: `site/src/routes/quiz/practice/[...slug]/+page.svelte`

**Interfaces:**
- Consumes: `loadQuiz` (`$lib/server/quizzes`), `isPublic`, `stripCorrect`, `parseAnswerForm`, `isCorrect`.
- Produces:
  - page data `{ title: string; slug: string; questions: PracticeQuestion[] }`
  - action `?/answer` med felter `questionId`, `value`; returnerer `{ questionId: string; isCorrect: boolean; correct: number[] | string[] }`; 400 ved ugyldigt svar eller ukendt `questionId`; 404 hvis quizzen ikke (længere) er offentlig.

- [ ] **Step 1: Skriv `+page.server.ts`**

```ts
import { error, fail } from '@sveltejs/kit';
import { loadQuiz } from '$lib/server/quizzes';
import { isPublic } from '$lib/server/publicQuizzes';
import { isCorrect } from '$lib/server/grading';
import { parseAnswerForm, stripCorrect } from '$lib/server/practice';
import type { Actions, PageServerLoad } from './$types';

async function loadPublicQuiz(slug: string) {
	const quiz = await loadQuiz(slug);
	if (!quiz || !(await isPublic(quiz.slug))) error(404, `Ingen offentlig quiz "${slug}"`);
	return quiz;
}

export const load: PageServerLoad = async ({ params }) => {
	const quiz = await loadPublicQuiz(params.slug);
	return { title: quiz.title, slug: quiz.slug, questions: stripCorrect(quiz.questions) };
};

export const actions: Actions = {
	answer: async ({ params, request }) => {
		const quiz = await loadPublicQuiz(params.slug);
		const input = parseAnswerForm(await request.formData());
		if (!input) return fail(400, { error: 'Ugyldigt svar' });
		const q = quiz.questions.find((x) => x.id === input.questionId);
		if (!q) return fail(400, { error: 'Ukendt spørgsmål' });
		return { questionId: q.id, isCorrect: isCorrect(q, input.value), correct: q.correct };
	}
};
```

- [ ] **Step 2: Skriv `+page.svelte`**

Score og indeks bor kun her – refresh starter forfra (som spec'en ønsker). Feedback for det aktuelle spørgsmål vises kun når `form.questionId` matcher, så et gammelt svar aldrig "smitter" næste spørgsmål.

```svelte
<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props();

	let index = $state(0);
	let score = $state(0);
	let shortText = $state('');
	let chosen = $state<string | null>(null);

	const total = $derived(data.questions.length);
	const q = $derived(data.questions[index]);
	const done = $derived(index >= total);
	const result = $derived(form && 'questionId' in form && q && form.questionId === q.id ? form : null);
	const answered = $derived(result !== null);
	const correctOptions = $derived((result?.correct ?? []) as number[]);
	const correctText = $derived((result?.correct ?? []) as string[]);

	function next() {
		index += 1;
		shortText = '';
		chosen = null;
	}
</script>

<svelte:head><title>{data.title} · IT3E26</title></svelte:head>

{#if total === 0}
	<section class="center">
		<h1>{data.title}</h1>
		<p>Denne quiz har ingen spørgsmål endnu.</p>
		<p><a href="/quiz">Tilbage til quiz</a></p>
	</section>
{:else if done}
	<section class="center">
		<h1>{data.title}</h1>
		<p class="big">Du fik {score} af {total} rigtige</p>
		<p><a href="/quiz">Tilbage til quiz</a></p>
	</section>
{:else}
	<section>
		<p class="muted">{data.title} · Spørgsmål {index + 1} af {total}</p>
		<h1 class="prompt">{q.prompt}</h1>

		<form
			method="POST"
			action="?/answer"
			use:enhance={() => {
				return async ({ result, update }) => {
					if (result.type === 'success' && result.data?.isCorrect) score += 1;
					await update({ reset: false });
				};
			}}
		>
			<input type="hidden" name="questionId" value={q.id} />

			{#if q.type === 'short'}
				<div class="short">
					<input name="value" bind:value={shortText} placeholder="Skriv dit svar" maxlength="200" autocomplete="off" disabled={answered} required />
					<button type="submit" disabled={answered}>Svar</button>
				</div>
				{#if result}
					<p class="result {result.isCorrect ? 'ok' : 'nope'}">{result.isCorrect ? 'Rigtigt!' : 'Forkert.'}</p>
					<p>Facit: <strong>{correctText.join(' / ')}</strong></p>
				{/if}
			{:else}
				<div class="options">
					{#each q.options as opt, i (i)}
						<button
							type="submit"
							name="value"
							value={String(i)}
							class="opt"
							class:mine={chosen === String(i)}
							class:correct={answered && correctOptions.includes(i)}
							class:wrong={answered && chosen === String(i) && !correctOptions.includes(i)}
							disabled={answered}
							onclick={() => (chosen = String(i))}
						>
							<span class="letter">{String.fromCharCode(65 + i)}</span> {opt}
						</button>
					{/each}
				</div>
				{#if result}
					<p class="result {result.isCorrect ? 'ok' : 'nope'}">{result.isCorrect ? 'Rigtigt!' : 'Forkert.'}</p>
				{/if}
			{/if}
		</form>

		{#if form && 'error' in form && !answered}
			<p class="error">{form.error}</p>
		{/if}

		{#if answered}
			<button class="next" onclick={next}>{index + 1 === total ? 'Se resultat' : 'Næste'}</button>
		{/if}
		<p class="muted">Din score: {score}</p>
	</section>
{/if}

<style>
	.center { text-align: center; margin-top: 3rem; }
	.big { font-size: 1.5rem; }
	.muted { color: #57606a; }
	.error { color: #cf222e; }
	.prompt { font-size: 1.6rem; margin: 0.2rem 0 1.2rem; }
	.options { display: grid; gap: 0.7rem; }
	.opt {
		text-align: left; font-size: 1.15rem; padding: 0.9rem 1rem; border-radius: 10px;
		border: 2px solid #d0d7de; background: #fff; cursor: pointer;
	}
	.opt:disabled { cursor: default; opacity: 0.9; }
	.opt.mine { border-color: #0969da; background: #ddf4ff; }
	.opt.correct { border-color: #1a7f37; background: #dafbe1; }
	.opt.wrong { border-color: #cf222e; background: #ffebe9; }
	.letter { display: inline-block; width: 1.6em; font-weight: 700; color: #57606a; }
	.short { display: flex; gap: 0.5rem; }
	.short input { flex: 1; font-size: 1.2rem; padding: 0.6rem 0.8rem; border: 1px solid #d0d7de; border-radius: 8px; }
	.short button, .next { font-size: 1.1rem; padding: 0.6rem 1rem; border: 0; border-radius: 8px; background: #0969da; color: #fff; cursor: pointer; }
	.next { margin-top: 1.2rem; }
	.result { margin-top: 1rem; font-weight: 600; font-size: 1.1rem; }
	.result.ok { color: #1a7f37; }
	.result.nope { color: #cf222e; }
</style>
```

- [ ] **Step 3: Typecheck**

Run: `npm run check`
Expected: 0 errors. (Hvis `form.questionId` giver typefejl: `'questionId' in form`-guarden bør snævre typen; ellers cast `form as { questionId?: string }` i `result`-derived.)

- [ ] **Step 4: Manuel verifikation (inkognito, ikke logget ind)**

Run: `npm run dev`.
1. `/quiz/practice/<offentlig slug>`: første spørgsmål vises. Åbn DevTools → Network → dokumentet: JSON i `data` indeholder **ingen** `correct`.
2. Vælg rigtigt mc-svar → grøn "Rigtigt!", knappen markeres grøn, score 1, "Næste" vises.
3. Næste → forkert svar → rød "Forkert.", dit valg rødt, facit grønt, score uændret.
4. Short-spørgsmål (fx skriv facit i forkert casing) → "Rigtigt!" + facit vises.
5. Sidste spørgsmål → knappen hedder "Se resultat" → "Du fik x af N rigtige" + link til `/quiz`.
6. F5 midt i → starter fra spørgsmål 1 med score 0.
7. `/quiz/practice/lektion1/findes-ikke` → 404. Fjern flueben på en quiz i `/quiz/host` → dens practice-URL giver 404.
8. `psql`/db:studio: `quiz_runs` og `quiz_answers` har **ikke** fået nye rækker.
9. Live-flowet (`/quiz/host/run/...` + `/quiz/play`) virker stadig og bedømmer korrekt (regressionstjek af Task 1).

- [ ] **Step 5: Commit**

```bash
git add "site/src/routes/quiz/practice/[...slug]/+page.server.ts" "site/src/routes/quiz/practice/[...slug]/+page.svelte"
git commit -m "Tilføj /quiz/practice: tag offentlige quizzer i eget tempo med facit pr. spørgsmål

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 7: Afslutning

- [ ] **Step 1: Fuldt tjek**

Run: `npm test` → 9 pass. Run: `npm run check` → 0 errors. Run: `npm run build` → bygger uden fejl.

- [ ] **Step 2: Færdiggør branchen**

Brug `superpowers:finishing-a-development-branch` (merge til `main` eller PR efter brugerens valg).
