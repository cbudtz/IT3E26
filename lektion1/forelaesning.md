# Lektion 1 — HTML-introduktion

Fokus er at komme fra en tom mappe til en enkel, forståelig HTML-side.

## Velkommen til Digitale Systemer & Anvendelse

På 1. semester arbejdede I primært med én computer og ét program. På 2.
semester arbejdede I med én computer og flere programmer, blandt andet Java og
SQL. På 3. semester arbejder vi med flere computere og flere teknologier:

- frontend i browseren med HTML, CSS og JavaScript
- backend og servere
- databaser
- netværkskommunikation mellem systemets dele

Kurset er derfor et hybridkursus:

- 1/4 netværksteknologi
- 1/4 metode: projekt, UML og UX
- 1/2 fullstack-web

Vi kombinerer teori med øvelser og et gennemgående EHR-projekt. Grupper på 4-5
personer anbefales.

## Underviserne

På web- og metodetråden møder I blandt andre:

- Christian Budtz på de første web-lektioner
- Rolf Nordahl på metode, projekt, UML og UX
- Birger Andersen på senere web-lektioner

## Kursusramme

- Eksamen kombinerer web samt netværk/metode.
- Planlægning, milestones, Gantt, WBS og UML indgår i Lektion 2.
- Web-sporet bruger HTML, CSS og JavaScript på frontend.
- Backend og database behandles senere i kurset.

## Mål

Efter lektionen skal du kunne:

- oprette en HTML-fil i VS Code og åbne den i en browser
- forklare HTML-dokumentets grundstruktur
- bruge tags, attributter og korrekt nesting
- indsætte overskrifter, afsnit, billeder og links
- bruge `src`, `alt`, `href` og `id`
- skelne mellem relative og absolutte stier
- bruge void elements korrekt
- inspicere og validere HTML

## HTML, CSS og JavaScript

- **HTML** beskriver sidens indhold og struktur.
- **CSS** beskriver sidens udseende.
- **JavaScript** beskriver sidens dynamiske adfærd.

HTML er et deklarativt markup-sprog: Vi beskriver, hvad indholdet er, og
browseren fortolker strukturen.

## HTML-boilerplate

En minimal HTML5-side kan se sådan ud:

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

- `<!DOCTYPE html>` angiver HTML5.
- `<html>` er dokumentets yderste element.
- `<head>` indeholder metadata.
- `<title>` vises i browserfanen.
- `<body>` indeholder sidens synlige indhold.

### Find syntaksfejlen

Dette eksempel ligner boilerplaten, men indeholder en fejl:

```html
<html>
  <head>
    <title>DTU Web Programmering
    <title>
  </head>
  <body>
    <h1>Lektioner</h1>
    <p>Lektion 1: Introduktion og HTML</p>
  </body>
</html>
```

`title`-elementet bliver åbnet igen i stedet for at blive lukket. Det korrekte
er:

```html
<title>DTU Web Programmering</title>
```

Browseren forsøger ofte at rette fejlen automatisk, så siden måske stadig ser
ud til at virke. HTML-træet kan dog blive anderledes end forventet, og fejl kan
give problemer med browserens fortolkning, tilgængelighed og senere CSS eller
JavaScript. Brug derfor DevTools og validatoren til at finde sådanne fejl.

## Tags og elementer

Et almindeligt element har et starttag og et afsluttende tag:

```html
<p>Et afsnit med tekst.</p>
```

Elementer kan ligge inde i hinanden. Det kaldes nesting:

```html
<p>Dette er <strong>vigtigt</strong>.</p>
```

Tags skal lukkes i den rigtige rækkefølge. Et `img`-element er derimod et void
element og skal ikke have et afsluttende tag.

```html
<img src="images/kat.jpg" alt="En kat i en kurv">
```

## Attributter

Attributter giver et element ekstra information og skrives i starttagget:

```html
<p id="intro">Introduktion til siden</p>
```

Vigtige attributter:

- `id`: en unik identifikator
- `src`: placeringen af en ressource, for eksempel et billede
- `alt`: alternativ tekst til et billede
- `href`: destinationen for et link
- `class`: en kategori, som blandt andet kan bruges af CSS senere

## Links og stier

```html
<a href="https://www.dtu.dk">Besøg DTU</a>
<a href="om-os.html">Om os</a>
<a href="#kontakt">Gå til kontakt</a>

<h2 id="kontakt">Kontakt</h2>
```

En relativ sti peger på noget i projektet, mens en absolut URL indeholder hele
adressen:

```html
<img src="images/kat.jpg" alt="En kat">
<img src="https://example.com/kat.jpg" alt="En kat">
```

## Semantisk HTML

Brug elementer efter deres betydning, ikke kun efter deres standardudseende:

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

Andre elementer, der bruges i Cat Photo App, er `ul`/`li`, `figure`,
`figcaption`, `em` og `strong`.

## Øvelser

### Øvelse 0: Kom i gang

Opret en mappe, lav `index.html`, skriv boilerplaten og åbn siden i browseren.

### Øvelse 1: Cat Photo App

Arbejd med freeCodeCamps Cat Photo App. Fokusér på billeder, links, lister,
sektioner, alternativ tekst og korrekt nesting.

### Øvelse 2: Login-side

Lav en enkel login-side til den kommende sundhedsapp. Brug overskrift,
introduktion, link tilbage til forsiden og et billede eller logo med `alt`-tekst.
Formularer gennemgås grundigt i en senere lektion.

## DevTools og validator

Brug browserens DevTools til at inspicere DOM-træet, se et elements attributter
og finde fejl i nesting.

Brug W3C-validatoren til at finde syntaksfejl og manglende eller ugyldige
attributter. Validatoren er et hjælpemiddel, men erstatter ikke forståelsen af
HTML-strukturen.

## Opsamling

Afslut med quizzen `Lektion 1-2: HTML`. Spørg især ind til forskellen på
`head` og `body`, brugen af `src`, `alt` og `href`, boilerplate, void elements
og korrekt nesting.
