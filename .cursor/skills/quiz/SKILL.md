---
name: quiz
description: >-
  Write and review 62580 quiz JSON. Distractors must not be eliminable
  without knowing the answer, and multiple-choice order is then shuffled so
  the correct index is not stuck on 0 or 1. Use when writing, rewriting,
  updating, or reviewing a quiz (quiz-lektionN.json, "ret quizzen", "bland
  svarmulighederne").
---

# Quiz

`correct` er indeks ind i `options`. Skriv spørgsmålet færdigt først. Bland bagefter.

Sand/falsk har kun to pladser. Fritekst (`open`) og korte tekstsvar (`short`) har intet indeks. Dem blander scriptet ikke.

## Review, før du blander

For hvert multiple-choice-spørgsmål: kan en studerende, der ikke kender svaret, strege tre muligheder ud alene på formuleringen? Hvis ja, så skriv mulighederne om.

De fire muligheder skal være samme slags svar på samme spørgsmål. Samme form, omtrent samme længde. De forkerte er nærliggende misforståelser fra lektionen, ikke et andet emne, en vittighed eller et svar der grammatisk ikke passer.

Det rigtige svar må ikke være det eneste, der nævner ordene fra spørgsmålet, og det må ikke være det eneste lange og præcise svar.

## Bland den ene quiz, når spørgsmålene er skrevet

Når reviewet er bestået og quiz-filen er gemt, kør selv scriptet på den fil — ikke på de andre quizzer:

```
node .cursor/skills/quiz/scripts/shuffle-quiz-options.mjs lektionN/quiz-lektionN.json
```

Én fil pr. kørsel. Flere quizzer i samme lektion køres hver for sig, efter den pågældende fil er skrevet. Kør det ikke igen, medmindre brugeren beder om det. Et nyt kørsel blander om.

Scriptet bevarer hvilke tekster der er rigtige, og skriver de nye indeks.
