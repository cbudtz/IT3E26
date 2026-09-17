# Underviser-API: patienter og login (POC)

Dato: 2026-09-17

## Problem

Lektion 7 skal lære `fetch` mod ægte JSON, før grupperne har egen backend
(D16). Der findes en visningsapp på Vercel (`examplesite`) og en Neon/Vercel
Postgres, men ingen endpoints at kalde.

## Mål

- Underviser-hostet Express-API i `examplesite`, som de studerende kalder **i
  timen** (ikke i forberedelsen).
- `GET /api/patients` — åben liste med fem syntetiske patienter.
- `POST /api/login` — tjek CPR + password; bruges på den login-side, de
  allerede har fra L1/L3 (label skiftes til CPR i L7).
- Drizzle + Neon HTTP-driver, som Vercel dokumenterer.

## Ikke-mål

- Ingen tokens, cookies eller sessions (L21).
- Ingen rolle/authorization (D7). Ingen læger — kun patienter.
- Ingen patient-CRUD (`POST`/`PUT`/`DELETE` på `/api/patients`). D16’s
  CRUD-spejl til L15 udskydes; POC’en er liste + login.
- Ingen ændring af kursussitet (`site/`) eller CapRover.
- Ingen L7-forberedelse eller øvelsesark i denne spec.

## Placering og stack

Alt lever i `examplesite/` (allerede deployet på Vercel).

- Express 5, eksporteret som nu (`module.exports = app`; `listen` kun når
  `VERCEL` ikke er sat).
- Drizzle ORM med `drizzle-orm/neon-http` + `@neondatabase/serverless`
  (`neon(process.env.DATABASE_URL)`).
- `dotenv` læser `examplesite/.env` lokalt. Filen er gitignored (`*.env`).
  På Vercel sættes `DATABASE_URL` som environment variable.
- `cors` med `origin: '*'` — studerende kalder fra `file://` og localhost.
- Tabel oprettes med `drizzle-kit push` (POC, ingen migrationshistorik).

## Data

Tabel `patients`:

| Kolonne | Type |
| --- | --- |
| `cpr` | `text` PK, 10 cifre uden bindestreg |
| `navn` | `text` not null |
| `password_hash` | `text` not null (bcryptjs) |

Fem rækker fra MedComs officielle test-CPR-liste (Excel revideret 02/07-2024,
https://svn.medcom.dk/svn/drafts/Klassifikationer/TestPatienter.xlsx).
Hver patient har sit eget dårlige kodeord (hashet i DB, aldrig i JSON).

Kun de *aktuelle* test-CPR-numre. De gamle Nancy Berggren-numre må ikke
bruges (MedCom/sundhed.dk). Stavemåde: **Berggren** (ikke Berggreen).

| CPR | Navn | Kodeord (kun i seed/øvelsesark) |
| --- | --- | --- |
| `2512489996` | Nancy Ann Test Berggren | `password` |
| `2911829996` | Kirsten Test Berggren | `12345678` |
| `0107729995` | Max Test Berggren | `qwertyui` |
| `1509819996` | Brita Test Berggren | `p@ssw0rd` |
| `3103979995` | Anders Test Jensen | `password` |

Kilder: [MedCom nationale test-CPR-numre](https://medcom.dk/standarder/tabeller/nationale-test-cpr-numre/),
[HL7 DK Core](https://hl7.dk/fhir/core/Patient-NancyAnn.html) (samme numre).
Må kun bruges i test/undervisning — ikke produktion.

Seed er idempotent: insert kun hvis `cpr` mangler. Kør ved kold start, så
Vercel-funktioner ikke duplikerer. Eksisterende hashes overskrives ikke.

Hashing: `bcryptjs` (ren JS, virker på Vercel). Sammenligning ved login:
`bcrypt.compare(password, password_hash)`. Password trimmes **ikke**.

## HTTP

JSON in/out. `express.json()`.

### `GET /api/patients`

Åben. Returnerer `200` `[{ "cpr": "2512489996", "navn": "Nancy Ann Test Berggren" }, …]`.
Aldrig `password` eller `password_hash`.

### `POST /api/login`

Body: `{ "cpr": "2512489996", "password": "password" }`.

CPR normaliseres: bindestreg og mellemrum fjernes, så `251248-9996` virker.
Password sammenlignes som sendt (ingen trim).

| Situation | Status | Body |
| --- | --- | --- |
| OK | 200 | `{ "cpr", "navn" }` |
| Mangler `cpr` eller `password` | 400 | `{ "error": "cpr og password skal sendes" }` |
| Forkert kombination | 401 | `{ "error": "forkert cpr eller password" }` |
| DB nede | 500 | `{ "error": "serverfejl" }` |

GET 500 ved DB-fejl, samme `{ "error": "serverfejl" }`.

## Filer

| Fil | Ansvar |
| --- | --- |
| `src/db.js` | `dotenv` + `neon` + `drizzle` |
| `src/schema.js` | Drizzle-tabel `patients` |
| `src/seed.js` | Idempotent insert af de fem patienter |
| `src/passwords.js` | `hashPassword` / `verifyPassword` (bcryptjs) |
| `server.js` | CORS, JSON, routes, statiske filer som i dag |
| `drizzle.config.js` | `dialect: 'postgresql'`, schema-sti |
| `README.md` | Kørsel, seed/`push`, curl-eksempler, de fem CPR + kodeord |

## Tests

`node:test` i `examplesite/`:

- GET-liste har fem MedCom-patienter (Nancy, Kirsten, Max, Brita, Anders) og **ingen** `password`-felt.
- Login Nancy `2512489996` + `password` → 200.
- Login Kirsten `2911829996` + `12345678` → 200.
- Login Max `0107729995` + `qwertyui` → 200.
- Login Brita `1509819996` + `p@ssw0rd` → 200.
- Login Anders `3103979995` + `password` → 200.
- Kirstens CPR + Nancys kode → 401.
- Login uden felter → 400.
- CPR med bindestreg accepteres.

HTTP-tests rammer Express-appen (supertest eller `app.handle`). DB: rigtig
Neon via `DATABASE_URL` når den findes; ellers skippes integrationstests.

## Drift

Lokalt: `node --env-file=.env server.js` (eller `dotenv` i `db.js`).
Vercel: samme repo-root-mappe `examplesite` som nu; `DATABASE_URL` i projektet.
Før første deploy: `npx drizzle-kit push` mod den URL.
