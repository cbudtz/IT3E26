# Lektion 7 — Forberedelse

I Lektion 5 arbejdede I med DOM og events. Nu skal JavaScript hente data udefra.
Målet med forberedelsen er, at du kan **hente og parse en JSON-liste af objekter og
forstå, hvordan rækkerne ender i en HTML-tabel**. I timen bruger I det på
patientlisten (`cpr` og `navn`).

Underviser-API'et kalder I **ikke** hjemmefra — det gør I sammen i øvelse 1.

**[JavaScript](https://www.freecodecamp.org/learn/javascript-v9/)**

Spring workshops og resten af certificeringen over, medmindre det står her.

## 1. Javascript objekter og JSON (~10 min)

Kapitlet **JavaScript** → **Objects** → lecturen **Working with JSON**.

Lav begge:

1. [What Is JSON, and How Do You Access Values Using Bracket and Dot Notation?](https://www.freecodecamp.org/learn/javascript-v9/lecture-working-with-json/what-is-json-and-how-do-you-access-values-using-bracket-and-dot-notation)
2. [How Do JSON.parse() and JSON.stringify() Work?](https://www.freecodecamp.org/learn/javascript-v9/lecture-working-with-json/how-do-json-parse-and-json-stringify-work)

Fokusér på, at JSON er tekst, at `parse` giver et JavaScript-objekt (eller en
array af objekter), og at du læser felter med `patient.navn`. `stringify` skal
I bruge, når I senere sender login med POST.

Spring wildlife-tracker, record collection og optional chaining over.

## 2. Fetch og async (~20 min)

Hop i oversigten til **Asynchronous JavaScript** → lecturen
**Understanding Asynchronous Programming**.

Lav disse fem (spring script `async` vs `defer`, JS-engine og Geolocation over):

1. [What Is Asynchronous JavaScript, and How Does It Differ from Synchronous JavaScript?](https://www.freecodecamp.org/learn/javascript-v9/lecture-understanding-asynchronous-programming/what-is-asynchronous-javascript-and-how-does-it-differ-from-synchronous-javascript)
2. [What Is the Fetch API, and What Are Common Types of Resources That Are Fetched from the Network?](https://www.freecodecamp.org/learn/javascript-v9/lecture-understanding-asynchronous-programming/what-is-the-fetch-api-and-what-are-common-types-of-resources-that-are-fetched-from-the-network)
3. [How Does the Fetch API Work with Common HTTP Methods and `res.json()`?](https://www.freecodecamp.org/learn/javascript-v9/lecture-understanding-asynchronous-programming/how-does-the-fetch-api-work-with-common-http-methods-and-res-json)
4. [What Are Promises, and How Does Promise Chaining Work?](https://www.freecodecamp.org/learn/javascript-v9/lecture-understanding-asynchronous-programming/what-are-promises-and-how-does-promise-chaining-work)
5. [What Is Async/Await, and How Does It Work?](https://www.freecodecamp.org/learn/javascript-v9/lecture-understanding-asynchronous-programming/what-is-async-await-and-how-does-it-work)

Læg mærke til, at `fetch` er asynkront, at `.json()` giver dataene, og at
`async`/`await` er den form, I bruger i timen. Lecture 3 viser også POST og
`JSON.stringify` — det hører til øvelse 2, men det er fint at se det nu.

## 3. Build an fCC Authors Page (~25–30 min)

Samme modul → workshoppen
**[Build an fCC Authors Page](https://www.freecodecamp.org/learn/javascript-v9/workshop-fcc-authors-page/step-1)**.

Workshoppen henter en JSON-liste og tegner den i DOM'en med `.then()`. Det er
samme mønster som patientlisten — bare med forfattere i stedet for patienter,
og med kort i stedet for en tabel.

**Øvelsen er i hus**, når siden viser listen fra API'et, og du kan pege på
`fetch`, `.then` / `.json()`, og hvor hvert objekt skrives i HTML.

## 4. HTML-tabel (~5 min)

I timen skal listen i en **tabel**, ikke i kort som i workshoppen. Tabeller
har I ikke haft i L1–L5.

**[Responsive Web Design](https://www.freecodecamp.org/learn/responsive-web-design-v9)**
→ kapitlet **HTML** → **Forms and Tables** → lecturen **Working with Tables**.

Kun den ene lecture:

1. [What Are HTML Tables Used For, and What Should They Not Be Used For?](https://www.freecodecamp.org/learn/responsive-web-design-v9/lecture-working-with-tables/what-are-html-tables-used-for)

Det, du skal huske: `table`, `thead`/`tbody`, `tr`, `th` og `td`. Tabeller er
til data (CPR + navn), ikke til side-layout.

Spring *Final Exams Table*, *Book Catalog Table* og resten af HTML-kapitlet over.

Hvis du har ekstra tid: [Build an fCC Forum Leaderboard](https://www.freecodecamp.org/learn/javascript-v9/lab-fcc-forum-leaderboard/build-an-fcc-forum-leaderboard). Den er ikke påkrævet.

## Når du er færdig

Du skal kunne forklare:

- at JSON er tekst, og at `res.json()` / `JSON.parse` giver objekter, du kan
  læse med punktum (`patient.navn`)
- at `fetch` henter data, mens siden kører, og at det er asynkront
- forskellen på `.then()` (workshoppen) og `async`/`await` (timen)
- hvordan en tabel er bygget, så du i timen kan lægge én række pr. patient
  med kolonnerne CPR og navn

`response.ok`, CORS og underviser-API'et tager vi i gennemgangen.

> Bemærk: freeCodeCamp kræver login (gratis), hvis du vil gemme din fremgang.

