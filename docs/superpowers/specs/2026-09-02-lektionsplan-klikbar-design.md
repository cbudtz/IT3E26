# Klikbar lektionsplan

Dato: 2026-09-02

## Problem

Forsidens lektionsplan i `README.md` er den eneste indgang til lektionsmateriale. Kun lektion 1 er et link, og det ligger i emne-cellen (blandet med `` `kode` `` og tomme `[](lektion1/Readme.md)`-fragmenter). Det er svært at se, at man kan klikke, og Markdown kan ikke lægge ét link om en hel celle med blandet formatering.

## Mål

- På kurssitet: rækker med eksisterende lektionsmateriale er tydeligt klikbare (chip på nummeret + hover på hele rækken).
- På GitHub: samme rækker virker via et almindeligt markdown-link på lektionsnummeret.
- Markdown forbliver kilden. Klikbarhed på sitet følger mapperne, ikke en vedligeholdt href i emne-teksten.

## Ikke-mål

- Ingen ny CMS-model, JSON-plan eller npm-afhængighed til HTML-parsing.
- Ingen disabled/grå rækker for lektioner uden materiale.
- Ingen klikbarhed for D1/D2/D3, eksamen eller mapper uden index-fil (fx `lektion3/` med kun quiz-json).
- Ingen ændring af slide-navigation eller andre tabeller (fx programmet i `lektion1/Readme.md`).

## Kilder og sandhed

| Overflade | Hvad der styrer klikbarhed |
| --- | --- |
| GitHub | Forfatteren skriver `[N](lektionN/)` i første kolonne, kun når mappen findes. |
| Kurssitet | Efter `marked`: første celle er et rent tal `N`, **og** `lektionN/` har en index-fil. |

Index-filer er de samme som resten af sitet: `README.md`, `Readme.md`, `readme.md`, `index.md`. En mappe uden en af dem tæller ikke.

Når en ny lektion oprettes, bliver rækken klikbar på sitet automatisk. Til GitHub tilføjes `[N](lektionN/)` i samme omgang.

## Markdown (`README.md`)

1. Under `## Lektionsplan`, før tabellen, én linje:

   `Klik på en lektion for at åbne materialet.`

2. Første kolonne for lektion 1 (den eneste mappe med index i dag):

   `[1](lektion1/)`

3. Emne-cellen for lektion 1 er almindelig tekst uden links. Bevar indholdet, fjern fragment-linkene. Tags skrives som kode, fx `` `<p>` ``, ikke som `[,](lektion1/Readme.md)`.

4. Øvrige rækker (2–26, D1–D3, eksamen) forbliver uden links, indtil deres mappe findes.

`rewriteHref` i `content.ts` omsætter allerede `lektion1/` og `lektion1/Readme.md` til `/lektion1`. Ingen ændring af den funktion.

## Site: HTML-forstærkning

Efter `toHtml` kører en funktion `enhanceLessonPlan(html): Promise<string>` på både den fulde side-HTML og hvert slide-chunk.

Kun tabeller hvis første header-celle — tags stripped, trimmet, case-insensitive — er præcis `Lektion`. Andre tabeller røres ikke.

For hver datarække:

1. Tag første celles synlige tekst (tags stripped, trimmet).
2. Match kun `/^\d+$/` (fx `1`, `10`). Ikke `**D1** (tirs.)`, `—`, `20 min`.
3. Hvis `lektionN/` har en index-fil: sæt `class="lesson-row"` og `data-href="/lektionN"` på `<tr>`. Href er uden trailing slash.
4. Hvis første celle ikke allerede indeholder et `<a>`, wrap tallet: `<a href="/lektionN">N</a>`. Dobbel-wrap ikke GitHub-fallback-linket.

Rækker der ikke matcher, eller mangler index-fil, ændres ikke.

Ingen ny parser-pakke. Operér på den HTML `marked` allerede laver (`<table>`, `<thead>`, `<tbody>`, `<tr>`, `<td>`).

## Site: udseende og klik

CSS i `+layout.svelte` (samme sted som øvrig `.markdown table`-styling):

- `tr.lesson-row { cursor: pointer; }`
- Hover: tydelig baggrund på alle celler i rækken (virker i både light og dark).
- Første celles `a` styles som en chip (baggrund, afrunding, lidt padding, ingen understregning). Chippen er det tastatur-fokuserbare kontrol og beholder et synligt fokus-omrids.

Klik i `+page.svelte` med delegation på dokument-`<article class="markdown">` (ikke i slide-mode):

- Hvis klikket rammer et `a` eller `button`, gør ingenting (lad browseren følge linket).
- Ellers, hvis nærmeste `tr.lesson-row` har `data-href`, naviger dertil med Sveltes `goto`.

Tastaturbrugere bruger chip-linket. `data-href` på rækken er mus-forstærkning, ikke en ekstra knap.

Slide-mode: samme HTML-forstærkning, men ingen række-delegation (slides har egen klik-håndtering i margen). Chip-linket virker stadig.

## Fejl og kanttilfælde

| Situation | Adfærd |
| --- | --- |
| Lektion 1 med `lektion1/Readme.md` | Chip + række-hover + GitHub-link. |
| Lektion 2 uden mappe | Neutral række, ingen cursor, ingen chip. |
| `lektion3/` kun med quiz-json | Neutral række. |
| D1 / D2 / D3 / eksamen | Neutral række. |
| Program-tabel i `lektion1/Readme.md` (første header er `Tid`) | Uændret. |
| Klik på et andet link i en forstærket række | Følg det link; hop ikke til lektionen. (Efter oprydning har emne-cellen ingen links.) |
| Manglende/ødelagt HTML fra marked | Forstærkningen springer tabellen over; siden vises stadig. |

## Test

Ingen ny testrunner. Verificér manuelt:

1. Forside `/`: lektion 1 har chip; hover highlighter rækken; klik på emne-teksten åbner `/lektion1`; klik på chippen gør det samme.
2. Lektion 2–26, D1 og eksamen ser neutrale ud og reagerer ikke på klik.
3. `/lektion1`: program-tabellen er uændret.
4. `README.md` på GitHub: `1` er et link, emne-teksten er det ikke.
5. `pnpm check` (svelte-check) i `site/` er rent.

## Filer

- `README.md` — hint, GitHub-link på `1`, ryd emne-celle.
- `site/src/lib/server/content.ts` — `enhanceLessonPlan`, kald fra `loadPage`.
- `site/src/routes/+layout.svelte` — chip- og hover-CSS.
- `site/src/routes/[...slug]/+page.svelte` — klik-delegation i dokument-visning.
