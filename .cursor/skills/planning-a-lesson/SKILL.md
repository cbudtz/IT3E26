---
name: planning-a-lesson
description: Use when the user asks to plan, write, rewrite or update a lesson (lektion N, "lav lektion 7", "opdater øvelserne til L9") for the 62580 course — Readme, forberedelse, forelæsning, øvelser or quiz.
---

# Planlægning af en lektion

Forberedelsen er ankeret. Forelæsning, øvelser og quiz aligner til den — ikke omvendt.
Ved hvert **CHECKPOINT**: stop, forelæg for brugeren og spørg om det uklare. Gæt ikke.

Deliverables i `lektionN/`: `Readme.md`, `forberedelse.md`, `forelaesning.md`, `oevelser.md`, `quiz-lektionN*.json`.
Skabeloner: `docs/templates/`. Referencelektioner: `lektion1/`, `lektion3/`, `lektion5/`.

## 1. Find emnet

- Rækken for lektionen i `README.md` (uge, dato, spor, indhold) — det er emnet.
- `docs/Lektionsplan.md` — placering i forløbet; hvilken deliverable (D1–D3) peger lektionen mod.
- `docs/E26UpdatePlan.md` — beslutninger D1–D6 (vanilla JS, VS Code m.fl.) begrænser teknologivalg.

## 2. Find eksisterende materiale

- Forrige lektioner i `lektionN/` — hvad kan de studerende allerede, og hvad har de fået lovet ("gennemgås i Lektion X")?
- `docs/background/` — gammelt E22-materiale. Find lektionen på **emne** via `docs/background/e22-lesson-plan-62581.md` (numrene matcher ikke). Respektér `#NYT`-noter. Mangler mappen: brug skill `pulling-e22-drive-material`.
- Notér gaps: hvad kræver emnet, som hverken E22 eller tidligere lektioner dækker?

## 3. Overordnet plan — CHECKPOINT

Forelæg kort: 4–7 læringsmål, blokopdeling med tider, hvad forberedelsen dækker vs. hvad gennemgangen tilføjer, øvelser, gaps fra trin 2. Quiz brugeren om alt uklart (ressourcer, omfang, projektkobling) før du skriver filer.

## 4. Forberedelse (`forberedelse.md`)

Ud fra eksisterende ressourcer (freeCodeCamp, Learn Git Branching o.l.). Angiv tid, hvad der fokuseres på, hvad der springes over, "Når du er færdig", "Praktisk". Er ressourcevalget uklart: **CHECKPOINT**.

## 5. Forelæsning (`forelaesning.md`)

- Blokke: gennemgang på 20–45 min, hver afsluttet med quiz og/eller øvelse. `# Pause`-slides mellem blokke.
- Første gennemgang er *opsamling* på forberedelsen — ikke førstegangsgennemgang.
- Læringsmål er samme liste som i Readme.
- Detaljer, der ikke kan stå på en slide, hører i øvelsesarket — link dertil.

## 6. Øvelser (`oevelser.md`)

Oversigtstabel (øvelse, hvornår, tid) + AI-reglen. Hver øvelse: mål, trin, tjekliste, "øvelsen er i hus når…", hjælp hvis man sidder fast, ekstra tid. Sidste øvelse bruges direkte på gruppens projekt.

## 7. Quiz (`quiz-lektionN.json`)

Format som `lektion5/quiz-lektion5.json`. Én quiz pr. blok, der afsluttes med quiz. Spørgsmål dækker forberedelse + gennemgang op til det punkt, hvor quizzen ligger.

## 8. Readme (`Readme.md`)

Skrives sidst ud fra `lektion-readme-template.md`, når programmet ligger fast. Programtabellen linker til `oevelser.md` og slides til `forelaesning.md?show=slide`.

## 9. Gap-analyse — CHECKPOINT

Tabel: læringsmål × (forberedelse / gennemgang / øvelse / quiz). Hvert mål skal være introduceret i forberedelse eller gennemgang **og** trænet i en øvelse. Rapportér huller, løse løfter til senere lektioner og afvigelser fra planen i trin 3.

## Typiske fejl

- Gennemgang, der gentager forberedelsen fra bunden i stedet for at samle op.
- Øvelser uden målbar afslutning eller uden kobling til projektet.
- Quiz glemt, eller quiz der spørger om noget, der først gennemgås senere.
- E22-materiale kopieret uden at følge `#NYT`-noterne eller D1–D6.
