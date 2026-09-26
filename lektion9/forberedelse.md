# Lektion 9 — Forberedelse

I Lektion 7 hentede I patientlisten og tegnede tabellen med det samme. Nu skal
data kunne **blive i browseren**, også efter et refresh. I timen samler vi det
til én tilstand: når listen ændres, tegnes tabellen igen. Derefter lægger I
mockuppet på Vercel, så det har en URL.

To ting mere, som mockuppet har brug for inden D1: layout side om side
(flexbox, som Lektion 3 udskød), og at login-formularen **bliver på siden**,
når I trykker send.

Der er ingen Node og ingen egen backend. D1 er stadig en klikbar frontend.
Forberedelsen er ca. 50 minutter. Spring workshops over, medmindre det står her.

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

## 2. Flexbox (~15 min)

**[Responsive Web Design](https://www.freecodecamp.org/learn/responsive-web-design-v9)**

Kapitlet **CSS** → modulet **CSS Flexbox** → lecturen **Working with CSS Flexbox**.

Lav begge:

1. [What Is CSS Flexbox, and When Should You Use It?](https://www.freecodecamp.org/learn/responsive-web-design-v9/lecture-working-with-css-flexbox/what-is-css-flexbox)
2. [What Are Some Common Flex Properties, and How Do They Work?](https://www.freecodecamp.org/learn/responsive-web-design-v9/lecture-working-with-css-flexbox/what-are-some-common-flex-properties)

Fokusér på, at flexbox lægger elementer i en række eller en kolonne, og på
`display: flex`, `flex-direction`, `justify-content` og `gap`. Det er det, I
bruger, når to dele af mockuppet skal stå ved siden af hinanden.

Spring workshoppen **Photo Gallery** og resten af modulet over.

## 3. Formularen bliver på siden (~15 min)

Tilbage i **[JavaScript](https://www.freecodecamp.org/learn/javascript-v9/)**.

Kapitlet **JavaScript** → modulet **Form Validation** → lecturen
**Understanding Form Validation**.

Lav disse tre:

1. [What Are Some Ways to Validate Forms Using JavaScript?](https://www.freecodecamp.org/learn/javascript-v9/lecture-understanding-form-validation/what-are-some-ways-to-validate-forms-using-javascript)
2. [What Is the Purpose of the preventDefault() Method?](https://www.freecodecamp.org/learn/javascript-v9/lecture-understanding-form-validation/what-is-the-purpose-of-e-preventdefault)
3. [How Does the Submit Event Work with Forms?](https://www.freecodecamp.org/learn/javascript-v9/lecture-understanding-form-validation/how-does-the-submit-event-work-with-forms)

Fokusér på `submit`-hændelsen og `preventDefault()`. Uden det navigerer
browseren væk, og jeres `fetch` fra Lektion 7 når ikke at køre. I timen
kobler I det på login-formularen.

Spring workshoppen **Envelope Budget App** over.

## Når du er færdig

Du skal kunne forklare:

- at `localStorage` gemmer tekst i browseren, og at den stadig er der efter
  et refresh
- forskellen på `localStorage` og `sessionStorage`
- at `JSON.stringify` / `JSON.parse` er vejen ind og ud, når værdien er en
  liste eller et objekt
- at password ikke hører hjemme i `localStorage`
- at `display: flex` lægger børn i en række, og hvad `justify-content` og
  `gap` gør
- at `preventDefault()` på formularens `submit` holder siden, så I selv kan
  håndtere indsendelsen

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
