# Lektion 1 — Øvelser

Man lærer HTML bedst ved at prøve selv. Dette ark samler dagens tre øvelser
med den uddybning, der ikke kan være på slidesne.

Hvis du ikke nåede [forberedelsen](forberedelse.md), så start der — eller
gør det parallelt med Øvelse 0.


| Øvelse                   | Hvornår                     | Tid     |
| ------------------------ | --------------------------- | ------- |
| **0** VS Code op at køre | Sammen, efter spørgeskemaet | ~15 min |
| **1** Cat Photo App      | Efter HTML-gennemgangen     | ~50 min |
| **2** Login-side         | Efter Cat Photo App         | ~40 min |


AI er tilladt, men du skal kunne forklare hvert tag, du skriver. En side, du
ikke kan gennemgå, tæller ikke.

---

## Øvelse 0 — VS Code op at køre

**Mål:** En HTML-fil på din egen maskine, åbnet i browseren. Det er det
udviklingsmiljø, vi bruger resten af kurset.

### Sådan gør du

1. Opret en mappe til dagens arbejde, fx `mit-site`.
2. Åbn mappen i VS Code: *File → Open Folder*.
3. Opret filen `index.html` i mappen (*File → New File*, eller højreklik i
  filoversigten).
4. Skriv boilerplaten nedenfor i filen og gem.
5. Åbn filen i browseren:
  - Hvis du har udvidelsen *Live Server*: højreklik i editoren →
   *Open with Live Server*.
  - Ellers: træk `index.html` over i et browservindue, eller dobbeltklik
  på filen i stifinderen.



### Boilerplate

```html
<!DOCTYPE html>
<html lang="da">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Min første side</title>
  </head>
  <body>
    <h1>Velkommen</h1>
    <p>Dette er min første webside.</p>
  </body>
</html>
```

Det er den grundstruktur, I så i forberedelsen: `DOCTYPE`, `html`, `head`
(metadata, titel i fanen) og `body` (det synlige indhold).

**Øvelsen er i hus**, når siden vises i browseren med overskrift og afsnit.

### Hvis du har ekstra tid

Eksperimentér i `index.html` — gem, og se browseren opdatere:

- Skift teksten i `<h1>` og `<p>`.
- Tilføj et `<h2>` og et afsnit mere.
- Tilføj et billede med en ekstern URL, fx:

```html
<img src="https://www.publicdomainpictures.net/pictures/90000/velka/kitties.jpg" alt="To killinger">
```

Vi vender tilbage til billeder, links og stier i gennemgangen og i Øvelse 2.

---



## Øvelse 1 — Cat Photo App

**Mål:** Få de HTML-elementer ind under huden, som gennemgangen dækkede, i et
styret tempo. freeCodeCamp tjekker hvert trin, så du ved, om koden er rigtig.

Fortsæt i **Basic HTML** dér, hvor forberedelsen stoppede:

**[Responsive Web Design](https://www.freecodecamp.org/learn/responsive-web-design-v9)**
→ kapitlet **HTML** → modulet **Basic HTML** → workshoppen **Cat Photo App**
(42 trin).

Du skal være logget ind (gratis), ellers gemmes fremgangen ikke.

### Det du øver

Gennemgangen nåede længere end forberedelsen. Cat Photo App samler det:

- billeder (`img`, `src`, `alt`) og links (`a`, `href`)
- `target="_blank"` — åbn link i nyt faneblad
- billede som link (`img` nested i `a`)
- lister: `ul` / `ol` og `li`
- semantisk ramme: `main`, `section`, `footer`
- `figure` og `figcaption`
- `em` og `strong`
- kommentarer (`<!-- -->`) og nesting (luk i omvendt rækkefølge)

Læs forklaringen på hvert trin — det er ikke et kapløb om at trykke *Check*.

### Hvis du sidder fast

- Læs opgavens eksempel og den røde fejltekst. Den siger ofte præcis, hvilket
tag eller hvilken attribut der mangler.
- Kig i browserens *preview* til højre: ser siden ud, som trinnet beskriver?
- Spring ikke trin over. Senere trin bygger på den HTML, du allerede har.
- Bed en sidekammerat eller underviseren om at kigge med. Vis koden, ikke
bare fejlen.

**Øvelsen er i hus**, når du er igennem Cat Photo App — eller så langt, du
når på tiden. Det, du ikke når, kan du færdiggøre efter lektionen.

---



## Øvelse 2 — Login-side til jeres kommende sundhedsapp

**Mål:** Anvende det du har lært om HTML fra freeCodeCamp i *dit eget* projekt. Du skal
selv finde ud af tekstfelt og knap. Formularer (`<form>`, `action`, `method`)
gennemgås rigtigt i Lektion 3 — i dag er det nok, at siden *ser ud* som en
login-side.

I har endnu ikke valgt projektcase (det sker i Lektion 2). Find på et kort
navn til appen, fx *Blodtryksdagbog* eller *Aftalesystem*, og skriv en
login-side til den. Det er øvelse — ikke den færdige D1-mockup.

Arbejd videre i **samme mappe** som Øvelse 0.

### Det siden skal indeholde

Lav en ny fil `login.html` med korrekt boilerplate (`lang="da"`, charset,
viewport, `<title>`). På siden skal der være:

1. En overskrift med appens navn, og et kort afsnit der fortæller, at man
  skal logge ind.
2. Et tekstfelt og en knap. Find selv ud af de to elementer — søg fx efter
  *HTML input* og *HTML button*, eller kig på
   [W3Schools' oversigt over input-typer](https://www.w3schools.com/html/html_form_input_types.asp).
3. Et link tilbage til forsiden (`index.html`).
4. Et billede eller logo med `alt`-tekst. Læg en billedfil i projektet og
  peg på den med en **relativ sti** (fx `logo.png` eller `images/logo.png`)
   — ikke en `https://…`-adresse. Så øver du det, gennemgangen sagde om
   relative vs. absolutte stier.
5. På forsiden `index.html`: et link *hen til* `login.html`, så de to sider
  hænger sammen.

Du behøver ikke CSS. Siden må gerne se enkel ud.

### Tjek med DevTools

Når siden vises i browseren: højreklik → *Inspicér*. Find dit `<input>` og
din `<button>` i DOM-træet. Tjek at attributterne er dem, du skrev — og at
nesting ser rigtig ud.

Browseren *gætter* ofte videre, selv om koden er forkert. DevTools viser,
hvad træet faktisk er.

**Øvelsen er i hus**, når `login.html` opfylder listen ovenfor, de to sider
linker til hinanden, og du har kigget siden efter i DevTools.

### Hvis du har ekstra tid

Byg videre på den samme side — stadig uden at gøre login "rigtigt":

- Et felt til adgangskode (`type="password"`) ud over brugernavn.
- Gør logoet til et link (nest `img` i `a`), som i Cat Photo App.
- En liste over tre ting, appen kan — `ul` eller `ol`.
- Semantisk ramme: `header`, `main`, `footer`.
- En HTML-kommentar, der forklarer et valg, du har truffet.
- Juster billedets højde med attributten `height` (fx `height="80"`). I
Lektion 3 gør vi det med CSS i stedet.

Hvis du er færdig med det: kig på projekteksemplerne fra
[forelæsningen](forelaesning.md?show=slide) (medicintracker, aftalesystem,
blodtryksdagbog, …) og skitsér, hvad *din* login-side skulle rumme, hvis I
vælger den case.