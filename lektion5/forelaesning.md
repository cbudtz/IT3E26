# Lektion 5 — Git og JavaScript

Christian Budtz — [chbu@dtu.dk](mailto:chbu@dtu.dk)

---

## Program i dag

- Opsamling: Git-forberedelsen
- Quiz: Git
- Øvelse 1: Git-samarbejde
- Gennemgang: JavaScript-grundlag
- Quiz: JavaScript
- Øvelse 2: JavaScript i browseren og i projektet

Pauser lægges ind undervejs.

---

## Læringsmål i dag

Efter lektionen skal du kunne:

- forklare commit, branch, merge, push og pull
- lave en ændring på en branch og få den ind i projektet via en pull request
- bruge variabler, arrays, objekter, funktioner og simple betingelser i JavaScript
- koble JavaScript til en HTML-side
- reagere på en hændelse og ændre DOM'en

---

![Linus Torvalds, skaberen af Git, giver fingeren](images/linus-torvalds.webp)

Linus Torvalds — skaberen af Git.

---



# Gennemgang — Git-samarbejde

---



## Fra arbejdsmappe til historik

Et **workspace** er de filer, du arbejder i lige nu. Et lokalt **repository**
indeholder projektets historik. Et **commit** er et navngivet punkt i den
historik.

```text
arbejdsmappe → commit → commit → commit
```

Et commit er ikke det samme som en backup af hele computeren. Det er en gemt
ændring i projektets historik.

---



## Branches

En branch er en separat udviklingslinje. Brug en branch, når du arbejder på en
opgave, så `main` kan blive stabil.

```text
main:     A────B────────E
               \      /
feature:        C────D
```

Gode branchnavne fortæller, hvad du arbejder på, fx
`feature/login-validation`.

---



## Et sikkert samarbejdsflow

1. Hent det nyeste fra `main`.
2. Opret eller skift til din branch.
3. Lav en lille, afgrænset ændring.
4. Commit med en meningsfuld besked.
5. Push branchen til GitHub.
6. Opret en pull request.
7. Få en anden til at læse ændringen.
8. Merge, når ændringen er klar.

Arbejd ikke direkte på `main`, og commit aldrig adgangskoder, API-nøgler eller
andre hemmeligheder.

---



## Git og GitHub

- **Git** er versionskontrolsystemet på din computer.
- **GitHub** er en remote tjeneste, hvor repositoryet kan deles.
- `push` sender lokale commits til en remote.
- `pull` henter ændringer fra en remote og integrerer dem lokalt.
- En pull request er en forespørgsel om at få en branch ind i en anden branch.

En pull request er ikke en særlig slags commit. Det er en samarbejds- og
review-proces omkring commits.

---



# Quiz — Git

---



## Quiz!

Gå til [/quiz](/quiz) og indtast koden fra tavlen.

**Lektion 5: Git** — commit, branch, merge, push, pull og pull request.

---



# Øvelse 1: Git-samarbejde

I arbejder i gruppens repository med en lille, ufarlig ændring.

- branch fra `main`
- lille commit med en forklarende besked
- push og pull request
- review og merge

Detaljerne står i [øvelsesarket](oevelser.md).

---



# Pause

---



# Gennemgang — JavaScript-grundlag

---



## JavaScript i forhold til HTML og CSS

- HTML beskriver indhold og struktur.
- CSS beskriver udseende og placering.
- JavaScript beskriver adfærd og reaktioner.

JavaScript kører i browseren og kan læse og ændre den HTML, browseren har
bygget som DOM.

- Kan køres direkte i console i browseren - lad os prøve!

---



## JavaScript i forhold til C#

I kender allerede programmering fra C#. Brug det som afsæt, men pas på med at
forvente, at sprogene fungerer ens:


| C#                                                    | JavaScript                                     |
| ----------------------------------------------------- | ---------------------------------------------- |
| Variabler har deklarerede typer, fx `int count`       | Variabler får type fra den aktuelle værdi      |
| Kode organiseres ofte i klasser og metoder            | Funktioner kan ligge frit uden en klasse       |
| Programmet kører typisk som en kompileret applikation | Koden kører her i browserens JavaScript-miljø  |
| UI-events håndteres af controls og event handlers     | DOM-events håndteres med fx `addEventListener` |


Grundidéer som variabler, lister, objekter, funktioner, betingelser og events er stadig genkendelige.

---



## Variabler og værdier

```js
const appName = "Blodtryksdagbog";
let visits = 0;
const isReady = true;

visits = visits + 1;
```

Brug `const`, når variablen ikke skal tildeles en ny værdi. Brug `let`, når den
skal kunne ændres. JavaScript er dynamisk typet, så værdien har en type, selv om
variablen ikke har en typeangivelse i koden.

I C# ville en tilsvarende variabel typisk have en eksplicit type:

```csharp
int visits = 0;
visits = visits + 1;
```

JavaScript skriver typen anderledes:

```js
let visits = 0;
visits = visits + 1;
```

---



## Arrays

En array er en liste af værdier i rækkefølge. Første element har indeks `0`.

```js
const measurements = [118, 124, 121];

console.log(measurements[0]); // 118
console.log(measurements.length); // 3

measurements.push(130);
```

`.push()` lægger et nyt element til sidst i listen.

---



## Objekter

Et objekt samler relaterede værdier under navne. I JavaScript behøver du ikke
en klasse for at lave et objekt.

```js
const measurement = {
  systolic: 124,
  diastolic: 82,
  unit: "mmHg"
};

console.log(measurement.systolic);
```

Punktnotationen `measurement.systolic` læser feltet `systolic`.

---



## Liste af objekter

Målinger, aftaler og patienter er typisk en liste af objekter:

```js
const measurements = [
  { systolic: 118, diastolic: 76 },
  { systolic: 124, diastolic: 82 }
];

for (const m of measurements) {
  console.log(m.systolic);
}
```

`for...of` går listen igennem ét element ad gangen.

---



## Funktioner

En funktion samler en handling, som kan bruges flere gange:

```js
function greeting(name) {
  return `Hej, ${name}`;
}

const message = greeting("Maja");
```

Parametre er input til funktionen. `return` sender en værdi tilbage.

---



## Betingelser

```js
const loggedIn = true;

if (loggedIn) {
  console.log("Vis forsiden");
} else {
  console.log("Vis login");
}
```

`if` konverterer værdien til sand eller falsk. En ikke-tom streng er sand —
også `"false"`:

```js
if ("false") {
  console.log("Vis forsiden"); // kører!
}

if ("false" === true) {
  console.log("Vis forsiden"); // kører ikke
}
```

Brug `===` til at sammenligne uden automatisk typekonvertering.

---



## JavaScript-filen og browseren

```html
<script src="app.js" defer></script>
```

`defer` betyder, at browseren kan læse HTML'en færdig, før scriptet kører.
Åbn browserens DevTools og brug fanen **Console** til at se fejl og skrive
små eksperimenter.

---



## Events og DOM

```html
<button id="vis-besked">Vis besked</button>
<p id="besked"></p>
```

```js
const button = document.getElementById("vis-besked");
const message = document.getElementById("besked");

button.addEventListener("click", () => {
  message.innerText = "Hej fra JavaScript";
});
```

Et event er noget, der sker, fx et klik. En event listener kobler hændelsen
sammen med den funktion, der skal køre.

---



# Quiz — JavaScript

---



## Quiz!

Gå til [/quiz](/quiz) og indtast koden fra tavlen.

**Lektion 5: JavaScript** — `let`/`const`, arrays, objekter, funktioner,
betingelser, events og DOM.

---



# Øvelse 2: JavaScript i browseren

Først bygger du en lille interaktion med en knap og et DOM-element. Derefter
flytter du idéen over i projektets mockup.

Detaljerne står i [øvelsesarket](oevelser.md).