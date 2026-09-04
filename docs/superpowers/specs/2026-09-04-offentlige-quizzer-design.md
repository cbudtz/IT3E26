# Offentlige quizzer til selv-prøvning

Dato: 2026-09-04

## Problem

Quizzer kører kun live: underviseren hoster, studerende joiner med en kode. Der er ingen måde at øve en quiz alene, og ingen måde at gøre en quiz synlig uden et live-rum.

## Mål

- Underviser kan på `/quiz/host` markere en quiz som **offentlig** med et flueben.
- Studerende/anonyme kan på `/quiz` vælge en offentlig quiz og tage den i eget tempo.
- Øjeblikkelig feedback pr. spørgsmål. Ingen login. Ingen gemte resultater.

## Ikke-mål

- Ingen Colyseus, join-kode eller host-styring i øvelsesmode.
- Ingen rækker i `quiz_runs` / `quiz_answers`.
- Ingen `"public"` i quiz-JSON. Ingen tilbage-knap. Ingen navn.

## Data

Ny tabel `public_quizzes`:

| Kolonne | Type |
| --- | --- |
| `quiz_slug` | `text` PK |
| `published_by` | `text` not null (DTU-brugernavn) |
| `published_at` | `timestamptz` not null default now() |

Drizzle-migration `0002_public_quizzes` (kører via eksisterende bootstrap). Tom tabel = intet offentligt.

Manglende `DATABASE_URL`: live-host virker; flueben og “prøv selv” er slået fra.

## Host (`/quiz/host`)

Samme liste som i dag. Ved hver quiz: checkbox **Offentlig**. Toggle via form action (insert/delete på slug). Ukendt slug: ingen skrivning.

Linket til live-run er uændret. Siden kræver stadig login.

## Deltag (`/quiz`)

Eksisterende “Deltag i quiz” uændret.

Ny sektion **Prøv en quiz selv** under formularen: titler der både har JSON og findes i `public_quizzes`. Tom liste → sektionen udelades.

## Øvelse (`/quiz/practice/[...slug]`)

404 hvis slug mangler JSON eller ikke er offentlig.

Load sender spørgsmål **uden** `correct`. Score og indeks bor i klienten. Refresh starter forfra.

Flow: ét spørgsmål → POST svar → rigtigt/forkert + facit → **Næste**. Sidste: “Du fik x af N rigtige” + link til `/quiz`.

Bedømmelse genbruger samme regel som live-rummet (`trim` + lowercase for short; index-match for mc/tf). Ugyldigt svar: 400.

## Tests

Nye unit-tests ved siden af `quizRuns.test.ts`:

- publicér / afpublicér; liste rummer kun offentlige slugs
- øvelses-load stripper `correct`
- bedømmelse: rigtigt mc, forkert mc, short case-insensitive
- ikke-offentlig slug er ikke tilgængelig

Ingen ændring af Colyseus, persist eller resultatsider.
