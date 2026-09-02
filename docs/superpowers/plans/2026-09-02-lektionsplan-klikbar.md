# Klikbar lektionsplan Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Gør forsidens lektionsplan tydeligt klikbar på sitet (chip + række-hover) med GitHub-fallback via et markdown-link på lektionsnummeret.

**Architecture:** Markdown-tabellen i `README.md` er kilden. En ren funktion `enhanceLessonPlan(html, available)` forstærker kun tabeller hvis første header-celle er `Lektion`, og kun rækker hvis første celle er et tal `N` der findes i `available`. `loadPage` udfylder `available` ved at scanne `lektionN/`-mapper med index-fil. CSS og klik-delegation ligger i layout/page; slide-mode får HTML-forstærkningen men ikke række-klik.

**Tech Stack:** SvelteKit 2, Svelte 5, `marked`, Node indbyggede `node:test` (ingen ny npm-pakke).

## Global Constraints

- Ingen ny npm-afhængighed til HTML-parsing; operér på den HTML `marked` allerede laver.
- Ingen ny npm-testrunner; HTML-forstærkningen testes med Node's `node:test`.
- Ingen disabled/grå rækker for lektioner uden materiale.
- Index-filer (samme som sitet): `README.md`, `Readme.md`, `readme.md`, `index.md`.
- Hint-tekst verbatim: `Klik på en lektion for at åbne materialet.`
- Forstærkede rækker: `class="lesson-row"` og `data-href="/lektionN"` (ingen trailing slash).
- `rewriteHref` ændres ikke.
- Ingen række-delegation i slide-mode.
- Commit kun hvis brugeren har bedt om det; hop over commit-trin indtil da.

## File structure

| Fil | Ansvar |
| --- | --- |
| `site/src/lib/server/lessonPlan.ts` | Ren HTML-forstærkning. Ingen `$env`, ingen fs. |
| `site/src/lib/server/lessonPlan.test.ts` | `node:test` for tabeller, rækker, GitHub-link, kanttilfælde. |
| `site/src/lib/server/content.ts` | `availableLessons()` + kald `enhanceLessonPlan` fra `loadPage`. |
| `site/src/routes/+layout.svelte` | Chip-, hover- og fokus-CSS. |
| `site/src/routes/[...slug]/+page.svelte` | Klik-delegation i dokument-visning. |
| `README.md` | Hint, `[1](lektion1/)`, ryd emne-cellens fragment-links. |
| `site/package.json` | Script `test` der kører `node:test`. |

---

### Task 1: `enhanceLessonPlan`

**Files:**
- Create: `site/src/lib/server/lessonPlan.ts`
- Create: `site/src/lib/server/lessonPlan.test.ts`
- Modify: `site/package.json` (script `test`)

**Interfaces:**
- Consumes: intet
- Produces: `export function enhanceLessonPlan(html: string, available: ReadonlySet<number>): string`

- [ ] **Step 1: Tilføj test-script**

I `site/package.json`, under `scripts`, tilføj:

```json
"test": "node --experimental-strip-types --test src/lib/server/lessonPlan.test.ts"
```

Behold de eksisterende scripts uændret.

- [ ] **Step 2: Skriv den failing test**

Opret `site/src/lib/server/lessonPlan.test.ts`:

```ts
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { enhanceLessonPlan } from './lessonPlan.ts';

const plan = `
<table>
<thead>
<tr>
<th>Lektion</th>
<th>Dato</th>
<th>Spor</th>
<th>Emner</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>2/9</td>
<td><strong>Web</strong></td>
<td>HTML-introduktion</td>
</tr>
<tr>
<td>2</td>
<td>4/9</td>
<td><strong>Projekt</strong></td>
<td>Project Scope</td>
</tr>
<tr>
<td><strong>D1</strong> (tirs.)</td>
<td>6/10</td>
<td>—</td>
<td>Delaflevering 1</td>
</tr>
<tr>
<td>10</td>
<td>2/10</td>
<td><strong>Projektarbejde</strong></td>
<td>Frem mod D1</td>
</tr>
</tbody>
</table>
`;

const program = `
<table>
<thead>
<tr>
<th>Tid</th>
<th>Blok</th>
<th>Indhold</th>
</tr>
</thead>
<tbody>
<tr>
<td>20 min</td>
<td>Kursusintro</td>
<td>Kursets opbygning</td>
</tr>
</tbody>
</table>
`;

test('forstærker kun rækker hvis N er i available', () => {
	const html = enhanceLessonPlan(plan, new Set([1]));
	assert.match(html, /<tr[^>]*class="lesson-row"[^>]*data-href="\/lektion1"/);
	assert.match(html, /<a href="\/lektion1">1<\/a>/);
	assert.doesNotMatch(html, /data-href="\/lektion2"/);
	assert.doesNotMatch(html, /data-href="\/lektion10"/);
	const d1 = html.split('<tr').find((r) => r.includes('D1'));
	assert.ok(d1);
	assert.equal(d1.includes('lesson-row'), false);
});

test('dobbelt-wrapper ikke et eksisterende GitHub-link', () => {
	const withLink = plan.replace('<td>1</td>', '<td><a href="/lektion1">1</a></td>');
	const html = enhanceLessonPlan(withLink, new Set([1]));
	assert.equal(html.includes('<a href="/lektion1"><a href="/lektion1">'), false);
	assert.match(html, /<td><a href="\/lektion1">1<\/a><\/td>/);
	assert.match(html, /class="lesson-row"/);
	assert.match(html, /data-href="\/lektion1"/);
});

test('matcher lektion 10 som 10, ikke 1', () => {
	const html = enhanceLessonPlan(plan, new Set([10]));
	assert.match(html, /data-href="\/lektion10"/);
	assert.doesNotMatch(html, /data-href="\/lektion1"/);
});

test('rører ikke program-tabeller', () => {
	const html = enhanceLessonPlan(program, new Set([1, 20]));
	assert.equal(html.includes('lesson-row'), false);
	assert.equal(html, program);
});

test('rører ikke HTML uden lektionsplan-tabel', () => {
	const html = enhanceLessonPlan('<p>hej</p>', new Set([1]));
	assert.equal(html, '<p>hej</p>');
});

test('header Lektion er case-insensitive', () => {
	const html = enhanceLessonPlan(
		plan.replace('<th>Lektion</th>', '<th>lektionsplan</th>'),
		new Set([1])
	);
	assert.equal(html.includes('lesson-row'), false);
	const ok = enhanceLessonPlan(plan.replace('<th>Lektion</th>', '<th>LEKTION</th>'), new Set([1]));
	assert.match(ok, /lesson-row/);
});
```

- [ ] **Step 3: Kør testen og bekræft at den fejler**

```bash
cd site
npm test
```

Expected: FAIL, modul `./lessonPlan.ts` findes ikke (ERR_MODULE_NOT_FOUND).

- [ ] **Step 4: Implementer `enhanceLessonPlan`**

Opret `site/src/lib/server/lessonPlan.ts`:

```ts
const TAG = /<[^>]+>/g;
const TABLE = /<table\b[^>]*>[\s\S]*?<\/table>/gi;
const ROW = /<tr\b[^>]*>[\s\S]*?<\/tr>/gi;

export function cellText(html: string): string {
	return html.replace(TAG, ' ').replace(/\s+/g, ' ').trim();
}

function firstHeaderCell(table: string): string {
	const th = table.match(/<th\b[^>]*>([\s\S]*?)<\/th>/i);
	return th ? cellText(th[1]) : '';
}

function enhanceRow(tr: string, available: ReadonlySet<number>): string {
	if (/<th\b/i.test(tr)) return tr;
	const td = tr.match(/<td\b[^>]*>([\s\S]*?)<\/td>/i);
	if (!td) return tr;
	const inner = td[1];
	const text = cellText(inner);
	if (!/^\d+$/.test(text)) return tr;
	const n = Number(text);
	if (!available.has(n)) return tr;
	const href = `/lektion${n}`;
	const newInner = /<a\b/i.test(inner) ? inner : `<a href="${href}">${n}</a>`;
	const newTd = td[0].replace(inner, newInner);
	return tr.replace(td[0], newTd).replace(/^<tr\b([^>]*)>/i, (_m, attrs: string) => {
		let next = attrs as string;
		if (/\bclass="/i.test(next)) next = next.replace(/\bclass="/i, 'class="lesson-row ');
		else next += ' class="lesson-row"';
		next += ` data-href="${href}"`;
		return `<tr${next}>`;
	});
}

export function enhanceLessonPlan(html: string, available: ReadonlySet<number>): string {
	return html.replace(TABLE, (table) => {
		if (firstHeaderCell(table).toLowerCase() !== 'lektion') return table;
		return table.replace(ROW, (tr) => enhanceRow(tr, available));
	});
}
```

- [ ] **Step 5: Kør testen og bekræft at den består**

```bash
cd site
npm test
```

Expected: alle 6 tests `ok` / pass. Hvis Node afviser `--experimental-strip-types`, kør i stedet:

```bash
node --test --experimental-strip-types src/lib/server/lessonPlan.test.ts
```

fra `site/`. Ret ikke testene til at matche en forkert implementation; ret implementationen.

- [ ] **Step 6: Commit (kun hvis brugeren har bedt om commit)**

```bash
git add site/src/lib/server/lessonPlan.ts site/src/lib/server/lessonPlan.test.ts site/package.json
git commit -m "feat: forstærk lektionsplan-rækker ud fra eksisterende lektioner"
```

---

### Task 2: Scan mapper og kald fra `loadPage`

**Files:**
- Modify: `site/src/lib/server/content.ts`

**Interfaces:**
- Consumes: `enhanceLessonPlan(html: string, available: ReadonlySet<number>): string` fra `$lib/server/lessonPlan`
- Produces: `loadPage` returnerer HTML hvor lektionsplan-tabeller er forstærket; `available` indeholder `N` kun når `lektionN/` har en index-fil

- [ ] **Step 1: Importer og tilføj `availableLessons`**

I toppen af `site/src/lib/server/content.ts`, tilføj importen ved de øvrige imports:

```ts
import { enhanceLessonPlan } from './lessonPlan';
```

Lige efter `const INDEX_NAMES = ...` (behold listen uændret), tilføj:

```ts
/** Lektionsnumre der har en index-fil i `lektionN/`. */
export async function availableLessons(): Promise<Set<number>> {
	const found = new Set<number>();
	const entries = await readdir(CONTENT_DIR, { withFileTypes: true }).catch(() => []);
	for (const e of entries) {
		if (!e.isDirectory()) continue;
		const m = /^lektion(\d+)$/i.exec(e.name);
		if (!m) continue;
		const n = Number(m[1]);
		const dir = resolve(CONTENT_DIR, e.name);
		for (const name of INDEX_NAMES) {
			if (await exists(resolve(dir, name))) {
				found.add(n);
				break;
			}
		}
	}
	return found;
}
```

- [ ] **Step 2: Kald forstærkningen i `loadPage`**

Erstat funktionskroppen af `loadPage` med:

```ts
export async function loadPage(slug: string): Promise<Page | null> {
	const file = await resolveFile(slug);
	if (!file) return directoryListing(slug);
	const markdown = await readFile(resolve(CONTENT_DIR, file), 'utf8');
	const chunks = splitSlides(markdown);
	const available = await availableLessons();
	const [rawHtml, ...rawSlides] = await Promise.all([
		toHtml(markdown, file),
		...chunks.map((chunk) => toHtml(chunk, file))
	]);
	const html = enhanceLessonPlan(rawHtml, available);
	const slides = (rawSlides.length ? rawSlides : [rawHtml]).map((s) =>
		enhanceLessonPlan(s, available)
	);
	return {
		slug,
		title: titleFrom(markdown, slug || 'Forside'),
		html,
		slides,
		file
	};
}
```

Rør ikke `rewriteHref`, `splitSlides`, `toHtml` eller `directoryListing`.

- [ ] **Step 3: Verificér at `lektion3` uden README ikke tæller**

Fra `site/`:

```bash
npx --yes tsx -e "import { availableLessons } from './src/lib/server/content.ts'; const s = await availableLessons(); console.log([...s].sort((a,b)=>a-b).join(','));"
```

Expected: `1` (kun `lektion1/` har index). Hvis `tsx` ikke kan importere `$env/dynamic/private`, spring dette trin over og verificér i Task 6 på forsiden: lektion 3-rækken har ingen chip.

Alternativ uden tsx — midlertidig `console.log` i `loadPage` er ikke tilladt at lade ligge; brug Task 6.

- [ ] **Step 4: Kør enhedstestene igen**

```bash
cd site
npm test
```

Expected: stadig alle tests pass.

- [ ] **Step 5: Commit (kun hvis brugeren har bedt om commit)**

```bash
git add site/src/lib/server/content.ts
git commit -m "feat: forstærk lektionsplan-HTML når lektionN har index"
```

---

### Task 3: Chip- og hover-CSS

**Files:**
- Modify: `site/src/routes/+layout.svelte` (markdown-table-reglerne nederst i `<style>`)

**Interfaces:**
- Consumes: `tr.lesson-row` og `data-href` fra Task 1
- Produces: synlig chip på første celles `a`, række-hover, fokus-omrids

- [ ] **Step 1: Tilføj CSS efter de eksisterende `.markdown table`-regler**

I `site/src/routes/+layout.svelte`, lige efter:

```css
:global(.markdown th), :global(.markdown td) { border: 1px solid var(--border); padding: 0.4em 0.8em; vertical-align: top; }
:global(.markdown th) { background: var(--header-bg); }
:global(.markdown tr:nth-child(2n)) { background: var(--header-bg); }
```

indsæt:

```css
:global(.markdown tr.lesson-row) { cursor: pointer; }
:global(.markdown tr.lesson-row:hover td) {
	background: color-mix(in srgb, var(--accent) 12%, var(--bg));
}
:global(.markdown tr.lesson-row td:first-child a) {
	display: inline-block;
	padding: 0.15em 0.65em;
	border-radius: 999px;
	background: color-mix(in srgb, var(--accent) 14%, transparent);
	color: var(--link);
	font-weight: 700;
	text-decoration: none;
}
:global(.markdown tr.lesson-row td:first-child a:focus-visible) {
	outline: 2px solid var(--accent);
	outline-offset: 2px;
}
```

Ingen grå/disabled-styling. Rækker uden `lesson-row` er uændrede.

- [ ] **Step 2: Commit (kun hvis brugeren har bedt om commit)**

```bash
git add site/src/routes/+layout.svelte
git commit -m "style: chip og række-hover på klikbare lektioner"
```

---

### Task 4: Række-klik i dokument-visning

**Files:**
- Modify: `site/src/routes/[...slug]/+page.svelte`

**Interfaces:**
- Consumes: `tr.lesson-row[data-href]` fra Task 1; SvelteKit `goto`
- Produces: klik på rækken (ikke på `a`/`button`) navigerer til `data-href`; slide-mode uændret

- [ ] **Step 1: Erstat `+page.svelte` med**

```svelte
<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import SlideDeck from '$lib/SlideDeck.svelte';

	let { data } = $props();

	const slideMode = $derived(page.url.searchParams.get('show') === 'slide');

	function onLessonRowClick(e: MouseEvent) {
		const t = e.target;
		if (!(t instanceof Element)) return;
		if (t.closest('a, button')) return;
		const row = t.closest('tr.lesson-row');
		if (!(row instanceof HTMLElement)) return;
		const href = row.dataset.href;
		if (!href) return;
		e.preventDefault();
		goto(href);
	}
</script>

<svelte:head>
	<title>{data.page.title} · IT3E26</title>
</svelte:head>

{#if slideMode}
	<SlideDeck slides={data.page.slides} />
{:else}
	<article class="markdown" onclick={onLessonRowClick}>
		{@html data.page.html}
	</article>
{/if}
```

`SlideDeck` får ingen `onclick` her. Chip-linket i slides virker som et almindeligt `<a>`.

- [ ] **Step 2: Commit (kun hvis brugeren har bedt om commit)**

```bash
git add site/src/routes/[...slug]/+page.svelte
git commit -m "feat: klik på lektionsplan-række åbner lektionen"
```

---

### Task 5: GitHub-fallback i `README.md`

**Files:**
- Modify: `README.md`

**Interfaces:**
- Consumes: intet
- Produces: hint-linje; `[1](lektion1/)` i første kolonne; emne-celle uden links

- [ ] **Step 1: Hint under overskriften**

Erstat

```markdown
## Lektionsplan


| Lektion
```

med

```markdown
## Lektionsplan

Klik på en lektion for at åbne materialet.

| Lektion
```

- [ ] **Step 2: Link nummeret og ryd emne-cellen for lektion 1**

Erstat lektion-1-rækken med (behold Dato-kolonnen `2/9`):

```markdown
| [1](lektion1/) | 2/9   | **Web**            | HTML-introduktion: dokumentstruktur og tags (`<p>`, `<h>`, `<img>`, `<a>`). Introduktion til projektemner og afklaring (omfang – patientfokus) |
```

Ingen `[,](lektion1/Readme.md)`. Ingen link i emne-cellen. Rækker 2–26, D1–D3, eksamen og erstatning forbliver uden links.

- [ ] **Step 3: Commit (kun hvis brugeren har bedt om commit)**

```bash
git add README.md
git commit -m "docs: tydeliggør klikbar lektionsplan i README"
```

---

### Task 6: Verifikation

**Files:** ingen nye filer

**Interfaces:**
- Consumes: Tasks 1–5
- Produces: grønt `npm test`, rent `npm run check`, manuel forside-adfærd ifølge spec

- [ ] **Step 1: Enhedstest**

```bash
cd site
npm test
```

Expected: alle tests pass.

- [ ] **Step 2: svelte-check**

```bash
cd site
npm run check
```

Expected: ingen errors. Hvis `lessonPlan.test.ts` giver typefejl på `node:test`, tilføj i `site/tsconfig.json`:

```json
{
	"extends": "./.svelte-kit/tsconfig.json",
	"compilerOptions": { },
	"exclude": ["src/**/*.test.ts"]
}
```

Behold de eksisterende `compilerOptions`. Kør `npm run check` igen. Expected: rent.

- [ ] **Step 3: Manuel forside**

Start `npm run dev` i `site/` hvis den ikke kører. Åbn `/` i browseren.

1. Lektion 1: nummeret er en chip; hover highlighter hele rækken; klik på emne-teksten åbner `/lektion1`; klik på chippen gør det samme.
2. Lektion 2–26, D1, eksamen: ingen chip, ingen pointer-cursor, klik gør ingenting.
3. `/lektion1`: program-tabellen (header `Tid`) er uændret.
4. Tab til chippen på forsiden: synligt fokus-omrids; Enter følger linket.
5. Bekræft i `README.md` at `1` er `[1](lektion1/)` og at emne-teksten ikke er et link.

- [ ] **Step 4: Commit eventuelle check-fixes (kun hvis brugeren har bedt om commit)**

```bash
git add site/tsconfig.json
git commit -m "chore: hold node:test ude af svelte-check"
```

Kun hvis tsconfig faktisk blev ændret i Step 2.
