# Lektion 9 — Forberedelse

I Lektion 7 hentede I patientlisten og tegnede tabellen med det samme. Nu skal
data kunne **blive i browseren**, også efter et refresh. I timen samler vi det
til én tilstand: når listen ændres, tegnes tabellen igen. Derefter lægger I
mockuppet på Vercel, så det har en URL, og arbejder videre på D1.

Der er ingen Node og ingen egen backend. D1 er stadig en klikbar frontend.
Forberedelsen er ca. 30 minutter. Spring workshops over, medmindre det står her.

## 1. localStorage og sessionStorage (~20 min)

**[JavaScript](https://www.freecodecamp.org/learn/javascript-v9/)**

Kapitlet **JavaScript** → modulet **localStorage and CRUD Operations** →
lecturen **Working with Client-Side Storage and CRUD Operations**.

Lav kun disse to:

1. [What Is localStorage, and What Are Some Common Methods?](https://www.freecodecamp.org/learn/javascript-v9/lecture-working-with-client-side-storage-and-crud-operations/what-is-localstorage-and-what-are-some-common-methods)
2. [What Is sessionStorage, and What Are Some Common Methods?](https://www.freecodecamp.org/learn/javascript-v9/lecture-working-with-client-side-storage-and-crud-operations/what-is-sessionstorage-and-what-are-some-common-methods)

Fokusér på `setItem`, `getItem` og `removeItem`, og på at værdien er en
**streng**. En liste af patienter skal derfor igennem `JSON.stringify`, når
den gemmes, og `JSON.parse`, når den læses — det kender I fra Lektion 7.

`localStorage` overlever refresh og en lukket fane. `sessionStorage` dør med
fanen. Til mockuppet bruger I `localStorage`. Det er browserens lager, ikke
et login på en server.

Spring resten af lecturen over: CRUD-overblik, cookies, Cache API, IndexedDB
og service workers. Workshoppen **Todo App** er lang (omkring 70 trin) og er
ikke forberedelse.

## 2. Prøv det på patientlisten (~10 min)

Åbn `patienter.html` fra Lektion 7. Genindlæs siden: tabellen er tom, indtil
`fetch` svarer.

I konsollen på den samme side:

```js
localStorage.setItem(
  "patienter",
  JSON.stringify([{ cpr: "2512489996", navn: "Nancy" }])
);
JSON.parse(localStorage.getItem("patienter"));
```

Genindlæs, og kør kun den nederste linje igen. Listen er der. Tabellen på
siden læser den ikke — det kobler vi i timen.

`getItem` giver `null`, hvis nøglen ikke findes. Tjek det, før I parser.
Slet prøven bagefter med `localStorage.removeItem("patienter")`, hvis I ikke
vil have den liggende.

## Når du er færdig

Du skal kunne forklare:

- at `localStorage` gemmer tekst i browseren, og at den stadig er der efter
  et refresh
- forskellen på `localStorage` og `sessionStorage`
- at `JSON.stringify` / `JSON.parse` er vejen ind og ud, når værdien er en
  liste eller et objekt
- at `getItem` giver `null`, når nøglen mangler
- at password ikke hører hjemme i `localStorage`
- at tabellen fra Lektion 7 ikke læser lageret af sig selv

Setteren, der får tabellen til at følge listen, tager vi i gennemgangen.
Vercel tager vi også i timen — du skal ikke deploye hjemmefra.

> Bemærk: freeCodeCamp kræver login (gratis), hvis du vil gemme din fremgang.

## Praktisk

- Hav gruppens GitHub-repository klar (fra Lektion 5). HTML-filerne skal
  ligge i repoet, så vi kan pege Vercel på dem.
- Opret en gratis Vercel-konto med GitHub, hvis du ikke har en:
  [https://vercel.com/signup](https://vercel.com/signup). Én i gruppen er nok
  som ejer; resten kan inviteres i timen.
- Du deployer ikke hjemmefra. I timen får mockuppet en URL.
