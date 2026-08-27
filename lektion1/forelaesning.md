# Lektion 01 — Introduktion

Christian Budtz — chbu@dtu.dk

---

## Program i dag

- Kursusintro
- Hvor står vi? — spørgeskema + quiz
- Øvelse 0: VS Code op at køre
- Gennemgang: HTML
- Øvelse 1: Cat Photo App
- Øvelse 2: Login-side

Pauser lægges ind undervejs.

---

## Underviserne

- Christian Budtz — de første web-lektioner
- Rolf Nordahl — metode, projekt, UML og UX (kursusansvarlig)
- Birger Andersen — netværk og senere web-lektioner

---

## Digitale Systemer & Anvendelse

- 1. semester — én computer, ét program
- 2. semester — én computer, flere programmer (Python, C#, SQL)
- 3. semester — flere computere, flere teknologier
  (HTML, CSS, JavaScript, servere, databaser)

Nu bliver det kompliceret!

---

## Hybridkursus

- 1/4 netværksteknologi
- 1/4 metode: projekt, UML og UX
- 1/2 fullstack-web

Teori og øvelser. Gennemgående gruppeprojekt.
Grupper på 4–5. Gruppedannelse i Lektion 2.

---

## Projektet — tre delafleveringer

- **D1** — forstudie og klikbar frontend-mockup (uden backend)
- **D2** — MVP: frontend, backend/API, PostgreSQL, én central brugerhandling
- **D3** — fungerende system med login, deployment og færdig portefølje

I vælger selv en afgrænset sundhedsteknologisk case.
Portefølje + website skal være godkendt for at I kan gå til eksamen.

---

## Eksamen

Individuel mundtlig eksamen baseret på projektet.

- Web samt netværk/metode
- Alle hjælpemidler, inkl. internet
- I medbringer porteføljen og adgang til det kørende website

---

## AI-politik

AI-værktøjer (ChatGPT, Copilot, Cursor, …) er tilladt.

- Al kode skal kunne forklares
- AI-brug dokumenteres i porteføljen
- Til den mundtlige eksamen skal I kunne gennemgå koden linje for linje

Hvis I ikke kan forklare det, ejer I det ikke.

---

## Læringsmål i dag

Efter lektionen skal du kunne:

- oprette en HTML-fil i VS Code og åbne den i en browser
- forklare HTML-dokumentets grundstruktur
- bruge tags, attributter og korrekt nesting
- indsætte overskrifter, afsnit, billeder og links
- skelne mellem relative og absolutte stier
- inspicere og validere HTML

---

# Hvor står vi?

---

## Spørgeskema

Sprog, Git og IDE — bruges også til gruppedannelse.

Linket kommer på tavlen. Udfyld det nu.

---

## Quiz!

Gå til [/quiz](/quiz) og indtast koden fra tavlen.

**Hvor står vi?** — programmering, databaser, UML og Git
fra 1. og 2. semester.

---

## Pause

---

# Øvelse 0 — VS Code

---

## Lad os prøve det selv!

Frem med VS Code.

Vi gør det sammen nu:

1. Opret en mappe, fx `mit-site`
2. Åbn mappen i VS Code: *File → Open Folder*
3. Opret filen `index.html`
4. Skriv boilerplaten (næste slide)
5. Åbn filen i browseren (højreklik → *Open with Live Server*,
   eller træk filen over i browseren)

---

## HTML-boilerplate

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

Når siden vises i browseren, er Øvelse 0 i hus.

---

# Gennemgang — HTML

---

## Web-teknologier

**Frontend**

- HTML (Lektion 1 + 3)
- CSS (Lektion 3)
- JavaScript (Lektion 5 + 7)

**Backend** — senere i kurset

- JavaScript på serveren (Node.js)
- PostgreSQL

---

## Frontend

- **HTML** — sidens indhold og struktur (deklarativt)
- **CSS** — sidens udseende (deklarativt)
- **JavaScript** — sidens adfærd (imperativt)

HTML beskriver *hvad* indholdet er. Browseren fortolker strukturen.

---

## HTML

HyperText Markup Language

- En del af markup-sprogene
- Deklarativt sprog
- Definerer indhold og struktur
- Ét dynamisk element: `<a href>`

---

## Et eksempel

```html
<html>
<head>
   <title> DTU Web Programmering
   <title>
</head>
<body>
<h1><b> Lektioner</b></h1>
<h2><i> E26 </i></h2>
<p>Lektion 1: Introduktion og HTML</p>
<p>Lektion 2: Projekt</p>
<p>Lektion 3: HTML 2 + CSS</p>
</body>
</html>
```

---

## Kan du se syntaks-fejlen?

Hvad er konsekvensen?

---

## Fejlen

`title` åbnes igen i stedet for at blive lukket:

```html
<title>DTU Web Programmering</title>
```

Browseren gætter ofte videre — siden *ser* måske fin ud.
Træet bliver alligevel forkert. Det giver ballade senere
med CSS, JavaScript og tilgængelighed.

---

## HTML-tags

Åbnings- og lukketag:

```html
<tag>indhold</tag>
```

Hierarkisk — luk i omvendt rækkefølge:

```html
<html>
  <body>
    Tekst
  </body>
</html>
```

Indre HTML:

```html
<h1>Noget html</h1>
```

---

## Attributter

Ekstra information i starttagget:

```html
<img src="katter.jpg" alt="En kat i en kurv">
<p id="intro">Introduktion</p>
```

| Attribut | Bruges til |
|---|---|
| `src` | placering af en ressource, fx et billede |
| `alt` | alternativ tekst til billedet |
| `href` | destinationen for et link |
| `id` | unik identifikator |
| `class` | kategori — bruges af CSS senere |

---

## Vigtige tags

Overskrifter: `<h1>`, `<h2>`, … `<h6>`

Afsnit — ekstra linje før og efter:

```html
<p>Et afsnit med tekst.</p>
```

Billede — void element, intet lukketag:

```html
<img src="katter.jpg" alt="En kat i en kurv">
```

Link:

```html
<a href="https://www.dtu.dk">Besøg DTU</a>
```

---

## Nesting

Elementer kan ligge inde i hinanden. Luk i den rigtige rækkefølge:

```html
<p>Dette er <strong>vigtigt</strong>.</p>
```

HTML-kommentarer vises ikke på siden:

```html
<!-- Dette er en kommentar -->
```

---

## Links og stier

```html
<a href="https://www.dtu.dk">Besøg DTU</a>
<a href="om-os.html">Om os</a>
<a href="#kontakt">Gå til kontakt</a>
<a href="https://www.dtu.dk" target="_blank">DTU i nyt faneblad</a>

<h2 id="kontakt">Kontakt</h2>
```

- Absolut URL: hele adressen, `https://…`
- Relativ sti: noget i projektet, `om-os.html` eller `images/kat.jpg`
- `#id`: hop til et element på samme side
- `target="_blank"`: åbn i nyt faneblad

---

## Billede som link

Hele billedet bliver klikbart, når `<img>` ligger inde i `<a>`:

```html
<a href="https://www.dtu.dk">
  <img src="images/logo.png" alt="DTU-logo">
</a>
```

Relativ vs. absolut sti virker på samme måde for billeder:

```html
<img src="images/kat.jpg" alt="En kat">
<img src="https://example.com/kat.jpg" alt="En kat">
```

---

## Lister

```html
<ul>
  <li>Kattefoder</li>
  <li>Garnnøgle</li>
</ul>

<ol>
  <li>Åbn VS Code</li>
  <li>Opret index.html</li>
</ol>
```

`ul` = unummereret. `ol` = nummereret. Hvert punkt er et `li`.

---

## Semantisk HTML

Brug elementer efter deres *betydning*, ikke kun efter udseende:

```html
<header>
  <h1>Min side</h1>
</header>
<main>
  <section>
    <h2>Om projektet</h2>
    <p>Projektets beskrivelse.</p>
  </section>
</main>
<footer>Kontakt os</footer>
```

`header`, `main`, `section` og `footer` erstatter ikke `h1`/`p` —
de *rammer* indholdet ind.

---

## figure, em og strong

```html
<figure>
  <img src="images/kat.jpg" alt="En kat i en kurv">
  <figcaption>Maja i sin yndlingskurv</figcaption>
</figure>

<p>Katte er <em>pattedyr</em> og <strong>rovdyr</strong>.</p>
```

- `figure` + `figcaption`: billede med billedtekst
- `em`: eftertryk (typisk kursiv)
- `strong`: stærk betydning (typisk fed)

---

## Document Object Model — DOM

HTML bliver til et træ i browseren.

```
html
├─ head
│  └─ title
└─ body
   ├─ h1
   └─ p
```

Elementer kan have et `id`. Så kan man pege på dem
med links (`#kontakt`) — og senere med JavaScript.

---

## DevTools

Højreklik på siden → *Inspicér*.

- Se DOM-træet
- Find et elements attributter
- Spot fejl i nesting

Når siden *ser* rigtig ud, men koden er forkert:
kig i DevTools, ikke kun på skærmen.

---

## W3C-validator

https://validator.w3.org/

Finder syntaksfejl og manglende eller ugyldige attributter.

Et hjælpemiddel — erstatter ikke, at I forstår strukturen.

---

## Quiz!

Gå til [/quiz](/quiz) og indtast koden fra tavlen.

**Lektion 1–2: HTML** — tags, attributter, boilerplate og nesting.

---

## Pause

---

# Øvelser

---

## Øvelse 1: Cat Photo App

freeCodeCamp, *Cat Photo App* (42 trin) — styret øvelse.

Fortsæt i **Basic HTML** dér, hvor forberedelsen stoppede.

Fokus:

- billeder, links og `target`
- lister
- `section` / `main` / `footer`
- `figure` / `figcaption`
- `em` / `strong`
- kommentarer og nesting

---

## Øvelse 2: Login-side

Freestyle i VS Code. En login-side til jeres kommende sundhedsapp.

- overskrift og kort intro
- et tekstfelt og en knap (find selv ud af det)
- link tilbage til en forside
- et billede eller logo med `alt`-tekst
- inspicér med DevTools

Formularer gennemgås rigtigt i Lektion 3.

---

## Man lærer bedst HTML ved at prøve selv!
