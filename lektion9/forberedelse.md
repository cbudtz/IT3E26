# Lektion 9 — Forberedelse

I Lektion 7 hentede I patientlisten og tegnede tabellen med det samme. Nu skal
noget kunne **blive i browseren** efter et refresh: hvem der er logget ind, og
en kladde I selv skriver. Patientlisten gemmer I ikke. I timen tegner en
setter forhåndsvisningen, når kladden ændres. Derefter lægger I mockuppet på
Vercel, så det har en URL, og arbejder videre på D1.

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
**streng**. Et objekt skal derfor igennem `JSON.stringify`, når det gemmes,
og `JSON.parse`, når det læses — `stringify` kender I fra Lektion 7.

`localStorage` overlever refresh og en lukket fane. `sessionStorage` dør med
fanen. Til mockuppet bruger I `localStorage` til login-state og en kladde.
Det er browserens lager, ikke et login på en server. Patientlisten gemmes
ikke.

Spring resten af lecturen over: CRUD-overblik, cookies, Cache API, IndexedDB
og service workers. Workshoppen **Todo App** er lang (omkring 70 trin) og er
ikke forberedelse.

## 2. Prøv det i konsollen (~10 min)

Åbn den `patienter.html`, du lavede i Lektion 7. Genindlæs siden: tabellen
er tom, indtil `fetch` svarer. Lageret ændrer ikke på det.

I konsollen på den samme side:

```js
localStorage.setItem(
  "login",
  JSON.stringify({ navn: "Nancy", expiresAt: Date.now() + 5 * 60 * 1000 })
);
JSON.parse(localStorage.getItem("login"));
```

Genindlæs, og kør kun den nederste linje igen. Objektet er der. Siden viser
det ikke — det kobler vi i timen.

`getItem` giver `null`, hvis nøglen ikke findes. Tjek det, før I parser.
Slet prøven bagefter med `localStorage.removeItem("login")`. Ligger der en
nøgle `patienter` fra en tidligere prøve, så slet den også. CPR hører ikke
hjemme i lageret.

## Når du er færdig

Du skal kunne forklare:

- at `localStorage` gemmer tekst i browseren, og at den stadig er der efter
  et refresh
- forskellen på `localStorage` og `sessionStorage`
- at `JSON.stringify` / `JSON.parse` er vejen ind og ud, når værdien er en
  liste eller et objekt
- at `getItem` giver `null`, når nøglen mangler
- at password og CPR ikke hører hjemme i `localStorage`
- at siden ikke læser lageret af sig selv

Setteren, der får en forhåndsvisning til at følge en kladde, tager vi i
gennemgangen. Patientlisten bliver hentet med `fetch`. Den gemmes ikke.
Vercel tager vi også i timen — du skal ikke deploye hjemmefra.

> Bemærk: freeCodeCamp kræver login (gratis), hvis du vil gemme din fremgang.

## Praktisk

- Hav gruppens GitHub-repository klar (fra Lektion 5). HTML-filerne skal
  ligge i repoet, så vi kan pege Vercel på dem.
- Opret en gratis Vercel-konto med GitHub, hvis du ikke har en:
  [https://vercel.com/signup](https://vercel.com/signup). Én i gruppen er nok
  som ejer; resten kan inviteres i timen.
- Du deployer ikke hjemmefra. I timen får mockuppet en URL.
