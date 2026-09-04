# Lektion 3 — Øvelser

Man lærer CSS og formularer bedst ved at prøve selv. Dette ark samler
dagens to øvelser med den uddybning, der ikke kan være på slidesne.

Hvis du ikke nåede [forberedelsen](forberedelse.md) (især Cafe Menu til
trin 28), så start der — eller gør det parallelt med Øvelse 1.

| Øvelse                        | Hvornår                       | Tid     |
| ----------------------------- | ----------------------------- | ------- |
| **1** Style login-siden       | Efter formular-gennemgangen   | ~40 min |
| **2** Videre på mockupet      | Efter Øvelse 1                | ~40 min |


AI er tilladt, men du skal kunne forklare hver regel og hvert tag, du
skriver. En side, du ikke kan gennemgå, tæller ikke.

---

## Øvelse 1 — Style login-siden

**Mål:** Gøre Lektion 1's `login.html` til en rigtig formular, og style den
med et eksternt stylesheet. Det er den CSS, I øvede i Cafe Menu — nu på
*jeres* side.

Arbejd videre i **samme mappe** som Lektion 1 (`index.html` og `login.html`).

### Det siden skal indeholde

1. En `<form>` med:
  - `<label>` + `<input type="text">` til brugernavn
  - `<label>` + `<input type="password">` til adgangskode
  - `<button type="submit">` til at logge ind
  - `for` på hvert `label` matcher `id` på feltet
2. Logoet fra Lektion 1 (eller et nyt) med `alt`-tekst.
3. Et link tilbage til `index.html`.
4. En fil `styles.css` i samme mappe, koblet med:

```html
<link rel="stylesheet" href="styles.css">
```

I behøver ikke `action` eller `method`. Mockupet sender ikke noget til en
server. `action="#"` er fint, eller udelad dem.

Udgangspunkt — byt app-navnet ud:

```html
<!DOCTYPE html>
<html lang="da">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Log ind — Blodtryksdagbog</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <div class="kort">
      <h1>Blodtryksdagbog</h1>
      <p>Log ind for at fortsætte.</p>
      <form action="#">
        <label for="brugernavn">Brugernavn</label>
        <input id="brugernavn" type="text" required>
        <label for="kode">Adgangskode</label>
        <input id="kode" type="password" required>
        <button type="submit">Log ind</button>
      </form>
      <p><a href="index.html">Tilbage til forsiden</a></p>
    </div>
  </body>
</html>
```

### Styling — tjekliste

I `styles.css` skal du bruge **class-selectors** (ikke kun type-selectors
på `body` og `h1`). Wrap login-siden i et `<div class="kort">` (eller
lignende), og style den.

Mindst:

- **farver** — tekst og baggrund (`color`, `background-color`)
- **kanter** — `border` og gerne `border-radius`
- **luft** — `padding` og `margin`
- **placering** — giv formularen en `width` (eller `max-width`) og centrér
  den med `margin: auto`
- **skygge** — `box-shadow` på kortet/formularen (valgfrit, men det løfter
  siden)

I må gerne kopiere idéer fra Cafe Menu (bredde, centrering, class på et
"kort"). Byt teksten og farverne til *jeres* projekt.

### Tjek med DevTools

Åbn `login.html` i browseren: højreklik → *Inspicér* → fanen *Styles*.

- Find formularen i DOM-træet. Tjek at `<label>`, `<input>` og `<button>`
  ligger inde i `<form>`.
- Klik på et styled element. Se hvilke regler der rammer det — og slå en
  egenskab til og fra.
- Ret en farve live. Den forsvinder ved reload, medmindre du gemmer den i
  `styles.css`.

**Øvelsen er i hus**, når `login.html` har en formular med labels,
`styles.css` er koblet på, tjeklisten ovenfor er opfyldt, og du har kigget
siden efter i DevTools.

### Hvis du sidder fast

- Mangler stylesheetet at slå igennem? Tjek stien i `<link>` og at filen
  hedder præcis `styles.css`. Hard-refresh (Ctrl+F5).
- `label` flytter ikke fokus? Så matcher `for` og `id` ikke — de skal være
  identiske, også store/små bogstaver.
- Centrering virker ikke? `margin: auto` kræver en `width` (eller
  `max-width`) på det element, du centrerer.
- Bed en sidekammerat eller underviseren om at kigge med. Vis koden, ikke
  bare skærmen.

### Hvis du har ekstra tid

- `:hover` på knappen.
- Et `type="email"`-felt, hvis jeres case logger ind med e-mail.
- Style forsiden `index.html` med det *samme* `styles.css`, så de to sider
  ligner hinanden.
- Fortsæt Cafe Menu fra trin 28 mod **trin 55** (padding), hvis du stoppede
  tidligt i forberedelsen.

---

## Øvelse 2 — Videre på mockupet

**Mål:** Bruge HTML + CSS på flere skærme i *jeres* sundhedsteknologiske
case. Det er stadig D1-mockup — klikbart, uden backend.

Arbejd i gruppen, i den mappe I allerede har.

### Det I skal nå

1. Style `index.html`, så forsiden hænger sammen med login-siden (samme
  `styles.css`, samme farver og typografi).
2. Skitsér **1–2 skærme mere** som HTML-filer, fx:
  - en oversigt (liste over målinger, aftaler, medicin — det jeres case
    handler om)
  - en detalje- eller formularside (ny måling, ny aftale, …)
3. Link siderne sammen, så man kan klikke sig rundt. Logoet kan være et
  link hjem til `index.html`.

Siderne behøver ikke være færdige. De skal *ligne* skærme i appen og bruge
de tags og den CSS, I har lært.

### Tjek med DevTools

Inspicér den nye side. Tjek nesting, at billeder har `alt`, og at
stylesheetet rammer de rigtige elementer.

**Øvelsen er i hus**, når forsiden er stylet, I har mindst én ekstra
HTML-side ud over login, og siderne linker til hinanden.

### Hvis du har ekstra tid

- Gentag formular-mønsteret (`<form>`, `<label>`, `<input>`) på en
  "ny måling"- eller "ny aftale"-side.
- En `position: fixed` topbjælke med appens navn og et link til login.
- Fortsæt Cafe Menu, eller kig på
  [freeCodeCamp CSS](https://www.freecodecamp.org/learn/responsive-web-design-v9)
  — men D1-mockupet kommer først.

Hvis I er færdige med det: snak i gruppen om, hvilke 2–3 skærme der *skal*
være med i D1, og hvad der kan vente.
