# Lektion 5 — Øvelser

Man lærer Git og JavaScript bedst ved at prøve selv. Dette ark samler dagens to
øvelser med den uddybning, der ikke kan være på slidesne.

Hvis du ikke nåede [forberedelsen](forberedelse.md), så start der — eller gør
det parallelt med Øvelse 1.

| Øvelse | Hvornår | Tid |
|---|---|---|
| **1** Git-samarbejde | Efter Git-gennemgangen | ~25 min |
| **2** JavaScript i browseren og projektet | Efter JS-gennemgangen | ~85 min |

AI er tilladt, men du skal kunne forklare hver Git-kommando, hver regel og hver
linje kode, du bruger. En løsning, du ikke kan gennemgå, tæller ikke.

---

## Øvelse 1 — Git-samarbejde

**Mål:** Gennemføre et lille samarbejdsflow uden at arbejde direkte på `main`.

Arbejd i gruppens GitHub-repository. Hvis gruppens repository ikke er klar, så
brug det repository, underviseren viser.

### Det skal I lave

1. Hent den nyeste version af `main`.
2. Opret en branch med dit navn eller din opgave, fx `feature/about-page`.
3. Lav en lille ændring i en HTML-fil, fx en tekst, en footer eller en kort
   projektbeskrivelse.
4. Commit ændringen med en besked, der beskriver ændringen.
5. Push branchen og opret en pull request.
6. Lad en anden læse ændringen, og merge den efter aftale.

### Tjekliste

- [ ] Ændringen er lavet på en branch, ikke direkte på `main`.
- [ ] Commit-beskeden forklarer ændringen.
- [ ] Pull requesten har en kort beskrivelse.
- [ ] En anden har kigget på ændringen før merge.

### Tjek resultatet

Find committen og pull requesten på GitHub. Skift derefter til den opdaterede
`main` og hent ændringen lokalt. Kontrollér, at ændringen også findes i din
lokale projektmappe.

**Øvelsen er i hus**, når gruppen har gennemført branch → commit → push → pull
request → review → merge.

### Hvis I sidder fast

- Tjek hvilken branch der er aktiv, før du laver en commit.
- Se på GitHub, om branchen faktisk er pushed.
- Spørg gruppen eller underviseren, før du sletter noget eller bruger
  `reset --hard`.

### Hvis I har ekstra tid

- Lav en ny lille branch og få en anden til at reviewe den.
- Tilføj en `.gitignore`, hvis repositoryet mangler en.
- Sammenlign en ændring i pull requestens diff med den oprindelige fil.

---

## Øvelse 2 — JavaScript i browseren og projektet

**Mål:** Reagere på et klik og ændre indhold på siden med JavaScript.

Arbejd i en ny mappe eller i projektets mappe. Start med en lille separat øvelse,
før du ændrer gruppens mockup.

### Del 1 — En lille interaktion

Opret `index.html` og `app.js` med dette udgangspunkt:

```html
<!DOCTYPE html>
<html lang="da">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Min JavaScript-side</title>
    <script src="app.js" defer></script>
  </head>
  <body>
    <h1>Min side</h1>
    <label for="navn">Dit navn</label>
    <input id="navn" type="text">
    <button id="hils">Sig hej</button>
    <p id="besked"></p>
  </body>
</html>
```

I `app.js`:

```js
const nameInput = document.getElementById("navn");
const button = document.getElementById("hils");
const message = document.getElementById("besked");

button.addEventListener("click", () => {
  const name = nameInput.value;
  message.innerText = `Hej, ${name}!`;
});
```

### Det skal du undersøge

1. Hvad sker der, hvis inputfeltet er tomt?
2. Hvordan kan du vise en anden besked, hvis feltet er tomt?
3. Hvordan kan du tælle, hvor mange gange der er klikket?
4. Hvordan kan du ændre knappens tekst efter første klik?

### Del 2 — Brug det i jeres mockup

Tilføj én lille interaktion til projektets frontend, fx:

- vis eller skjul en hjælpebesked
- skift mellem to visninger på en side
- vis en velkomstbesked med brugerens navn
- filtrér en fast liste, uden at hente data fra en server
- markér en aftale eller måling som valgt

Hold dataene faste i HTML eller JavaScript. Vi arbejder ikke med backend eller
`fetch` endnu.

### Tjekliste

- [ ] JavaScript ligger i en separat `app.js`-fil.
- [ ] HTML-filen kobler filen på med `<script ... defer>`.
- [ ] Koden finder mindst ét element med `getElementById`.
- [ ] En event listener reagerer på et klik.
- [ ] Siden ændrer synligt indhold i DOM'en.

### Tjek med DevTools

Åbn siden i browseren og brug **Console**:

- Er der JavaScript-fejl?
- Bliver event listeneren kørt?
- Hvad indeholder variablerne lige før ændringen?

Inspicér derefter elementet i DOM-træet og se, om teksten ændres.

**Øvelsen er i hus**, når din lille øvelse virker, og gruppens mockup har én
synlig JavaScript-interaktion.

### Hvis du sidder fast

- Tjek at filnavnet i `src="app.js"` passer præcist.
- Tjek at hvert `id` i JavaScript findes i HTML'en.
- Tjek browserens Console for den første fejl, ikke kun den sidste.
- Brug `console.log(nameInput.value)` til at se, hvad du faktisk læser.

### Hvis I har ekstra tid

- Brug en `if`-betingelse til at validere et tomt inputfelt.
- Lav en anden knap, der nulstiller beskeden.
- Giv interaktionen en tydelig tilstand i jeres mockup, som I kan beskrive i
  et simpelt tilstandsdiagram.
