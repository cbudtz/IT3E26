# Lektion 9 — Forberedelse

I Lektion 7 hentede I patientlisten og tegnede tabellen med det samme. Nu skal
data kunne **blive i browseren**, også efter et refresh. I timen samler vi det
til én tilstand: når listen ændres, tegnes tabellen igen. Derefter lægger I
mockuppet på Vercel, så det har en URL.

Der er ingen Node og ingen egen backend. D1 er stadig en klikbar frontend.

**[JavaScript](https://www.freecodecamp.org/learn/javascript-v9/)**

Spring workshops og resten af certificeringen over, medmindre det står her.

## 1. localStorage og sessionStorage (~20 min)

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
ikke forberedelse. I har ekstra tid i timen til jeres eget mockup.

## Når du er færdig

Du skal kunne forklare:

- at `localStorage` gemmer tekst i browseren, og at den stadig er der efter
  et refresh
- forskellen på `localStorage` og `sessionStorage`
- at `JSON.stringify` / `JSON.parse` er vejen ind og ud, når værdien er en
  liste eller et objekt
- at password ikke hører hjemme i `localStorage`

Setteren, der får tabellen til at følge listen, tager vi i gennemgangen.
Vercel tager vi også i timen — du skal ikke deploye hjemmefra.

> Bemærk: freeCodeCamp kræver login (gratis), hvis du vil gemme din fremgang.

## Praktisk

- Medbring den bærbare og gruppens projektmappe.
- Hav gruppens GitHub-repository klar (fra Lektion 5). HTML-filerne skal
  ligge i repoet, så vi kan pege Vercel på dem.
- Opret en gratis Vercel-konto med GitHub, hvis du ikke har en:
  [https://vercel.com/signup](https://vercel.com/signup). Én i gruppen er nok
  som ejer; resten kan inviteres i timen.
- Du deployer ikke hjemmefra. I timen får mockuppet en URL.
