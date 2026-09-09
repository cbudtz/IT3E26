# Lektion 3 — HTML II og CSS

Christian Budtz — [chbu@dtu.dk](mailto:chbu@dtu.dk)

---

## Program i dag

- Gennemgang: `id`, `class`, `div` — og `span` vs `div` vs `p`
- Gennemgang: CSS fra forberedelsen
- Quiz: HTML Fundamentals + CSS
- Gennemgang: `<form>`, `<input>`, `<label>`, `<button>` — nyt
- Quiz: Formularer (kort)
- Øvelse 1: Style jeres login-side
- Øvelse 2: Videre på mockupet

Pauser lægges ind undervejs.

---

## Læringsmål i dag

Efter lektionen skal du kunne:

- forklare hvornår du bruger `id`, `class` og `div`
- forklare forskellen på HTML (indhold) og CSS (udseende)
- koble en HTML-side til en separat `styles.css`
- style med type- og class-selectors
- bruge `width`, farve, `margin` (inkl. `auto`) og padding
- bygge en formular med `<form>`, `<label>`, `<input>` og `<button>`
- anvende det på jeres projekts login- eller formularside

---



# Gennemgang — HTML Fundamentals

---



## id og class

Fra forberedelsen:

- `id` — unikt på siden. Ét element.
- `class` — kan sidde på mange elementer.

```html
<label for="kode">Adgangskode</label>
<input id="kode" type="password">

<div class="kort">…</div>
```

`id` til at pege på *ét* felt (`label`, senere JavaScript).
`class` til CSS — samme udseende flere steder.

---



## div

`<div>` er en kasse uden egen betydning. Den grupperer, så I kan style.

```html
<div class="kort">
  <h1>Log ind</h1>
  <p>…</p>
</div>
```

Ikke et afsnit (`<p>`). Ikke en overskrift. Bare en ramme.

I Øvelse 1: wrap login-siden i et `div` med en `class`.

---



## span vs div vs p

Tre måder at «pakke» indhold — forskellig betydning:


| Element  | Type   | Betydning                             | Note                      |
| -------- | ------ | ------------------------------------- | ------------------------- |
| `<p>`    | blok   | Et afsnit — tekst med mening          | Ekstra linje før og efter |
| `<div>`  | blok   | Kasse uden mening — gruppering/layout | Linebreak før og efter    |
| `<span>` | inline | Stykke *i* en linje — style et ord    | Ingen linebreak           |


```html
<p>
  Log ind med dit
  <span class="highlight">studie-id</span>.
</p>

<div class="kort">
  <p>…</p>
</div>
```

- Brug `<p>` til tekstafsnit.
- Brug `<div>` når I skal samle flere elementer (fx et kort).
- Brug `<span>` når I kun vil farve eller fremhæve noget *inde i* teksten.

`<div>` og `<span>` er «tomme» — vælg dem når I ikke har et mere præcist tag.

---



## HTML-entiteter

Når tegnet selv er HTML-syntaks, kan browseren ikke se forskel på indhold og kode:


| Tegn            | Skrives |
| --------------- | ------- |
| `<`             | &amp;lt;    |
| `>`             | &amp;gt;    |
| `&`             | &amp;amp;   |
| hårdt mellemrum | &amp;nbsp;  |


I skriver almindelig tekst i felter og overskrifter — ikke tegn, der *er* HTML.
Derfor møder I dem sjældent. Vid at de findes - slå dem op efter behov.

---



# Gennemgang — CSS

---



## HTML og CSS

- **HTML** — sidens indhold og struktur (deklarativt)
- **CSS** — sidens udseende og placering (deklarativt)
- **JavaScript** — sidens adfærd (imperativt) — Lektion 5

HTML beskriver *hvad*. CSS beskriver *hvordan det ser ud*.
I har mødt deklarativt sprog før: SQL.

---



## Eksempel — uden og med CSS

Samme HTML. Forskellen er stylesheetet.

[Uden CSS](login.html) · [Med CSS](login-styled.html)

Hvilke ting har ændret sig?

Font, afrundede hjørner, bredde, centrering, kant, skygge, farver, placering.

Åbn begge ved siden af hinanden. I øvelsen gør I det samme på *jeres* login-side.

---



## Tre steder at lægge CSS

1. **Inline** — på ét element:

```html
<h1 style="color: blue;">Overskrift</h1>
```

1. **I dokumentet** — `<style>` i `<head>`
2. **I en fil** — det I skal bruge:

```html
<link rel="stylesheet" href="styles.css">
```

I Cafe Menu flyttede I CSS ud i en fil. Det er standarden til D1.

---



## Syntaks

```css
selector {
  egenskab: værdi;
}
```

`h1` er type. `.menu` er class. `#login` er id.

---



## Syntaks — tre selectors

```css
h1 {
  text-align: center;
}

.menu {
  width: 80%;
}

#login {
  margin: auto;
}
```

---



## Selectors


| Selector | Matcher        | Note                |
| -------- | -------------- | ------------------- |
| `h1`     | alle `<h1>`    | type (html element) |
| `.menu`  | `class="menu"` | class               |
| `#login` | `id="login"`   | id                  |


`id` er unik, `class` kan genbruges.

---



## Specificity — hvem vinder?

Mere specifik regel vinder:

1. type (`h1`) — svagest
2. class (`.knap`)
3. id (`#send`) — stærkest af de tre

```css
p { color: blue; }
.fremhaev { color: red; }   /* vinder over p */
#advarsel { color: black; } /* vinder over .fremhaev */
```

`!important` er en nødbremse — ikke en metode. Hvis du har brug for den er det ved at gå galt.

---



## Box model - elementer på siden.

Inde fra og ud:

**indhold → padding → border → margin**

- **padding** — afstand *inden i* elementet
- **margin** — afstand *uden for* elementet
- `margin: auto` — centrerer (vandret), når der er en `width`

Kig i DevTools: *Computed*.

---



## Enheder


| Enhed       | Type                            | Brug                           |
| ----------- | ------------------------------- | ------------------------------ |
| `px`        | absolut                         | kanter, skarpe mål             |
| `rem`       | relativ                         | tekst og luft — standard nu    |
| `%`         | relativ                         | andel af det omgivende element |
| `vh` / `vw` | relativ (viewport height/width) | andel af vinduet               |


`em` er relativ til *elementets* font. `rem` er relativ til roden — lettere at styre.

`px` er den absolutte. `%`, `rem`, `vh`/`vw` er relative.

---



## position


| Værdi      | Relativt til                               |
| ---------- | ------------------------------------------ |
| `static`   | normalt flow (default)                     |
| `relative` | dér hvor elementet ellers ville være       |
| `absolute` | nærmeste positionerede forælder            |
| `fixed`    | viewport — bliver på skærmen               |
| `sticky`   | scroller med, indtil den *sætter sig fast* |


`position: fixed` — bliver på samme sted i vinduet, også når man scroller.

Float til layout: spring over. Side om side kommer I til senere (flexbox).

---



## Andre nyttige egenskaber

```css
.kort {
  color: #333;
  background-color: #f4f4f4;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  padding: 1.5rem;
  max-width: 24rem;
}
```

Det er det, I skal bruge på login-siden.

---



## :hover

`:hover` er en **pseudoklasse** — den matcher et element i en bestemt tilstand (musen over).

```css
button:hover {
  background-color: #222;
}
```

Samme familie: `:focus`, `:active`. Skrives med én kolon (`:`), ikke to (`::` — det er pseudo-*elementer* som `::before`).

---



## DevTools — Styles

Højreklik → *Inspicér* → fanen *Styles*.

- Se hvilke regler der rammer elementet
- Slå en egenskab til og fra
- Ret en værdi live — forsvinder ved reload, medmindre I gemmer i filen

Når siden *ser* rigtig ud, men I ikke ved hvorfor: kig her.

---



# Quiz — HTML og CSS

---



## Quiz!

Gå til [/quiz](/quiz) og indtast koden fra tavlen.

**Lektion 3: HTML og CSS** — `id`/`class`/`div`, CSS-regler, stylesheet, selectors og `margin`.

---



## Pause

---



# Gennemgang — Formularer

---



## Sidst og nyt

**Lektion 1:** `<h1>`, `<p>`, `<img>`, `<a>`, lister, `login.html` med et felt og en knap.

**I dag nyt:** feltet og knappen ind i en rigtig formular.

```html
<form>
  <label for="brugernavn">Brugernavn</label>
  <input id="brugernavn" type="text" required>
  <button type="submit">Log ind</button>
</form>
```

---



## `<form>`

Ramme om felter, der hører sammen.

```html
<form action="#" method="get">
  …
</form>
```

- `action` — *hvor* browseren vil sende hen
- `method` — `get` eller `post`

Til D1 mockup: I submitter **ikke** til en server. Brug `action="/enandenside.html"` — eller udelad `action`.
HTTP hører til senere (Lektion 9).

---



## `<input>`

```html
<input type="text" id="brugernavn" required>
<input type="password" id="kode" required>
<input type="email" id="mail" placeholder="navn@dtu.dk">
```

- `text` — brugernavn
- `password` — adgangskode (prikker)
- `email` — browseren tjekker format

`required` — feltet skal udfyldes. `placeholder` — hint i det tomme felt.

Der findes flere (`checkbox`, `radio`, `date`, `file`, …). Til login er `text` og `password` nok.

---



## `<label>`

Klik på teksten — feltet får fokus. Det kræver at `for` matcher `id`:

```html
<label for="kode">Adgangskode</label>
<input id="kode" type="password" required>
```

Uden `label` er feltet sværere at ramme — og sværere at bruge med skærmlæser.

`id` til `label`. `class` til CSS. `name` først, når noget sendes til en server.

---



## `<button>`

```html
<button type="submit">Log ind</button>
<button type="reset">Nulstil</button>
<button type="button">Luk</button>
```

- `submit` — standard inde i en `<form>`
- `reset` — tømmer felterne
- `button` — gør ingenting af sig selv (JavaScript senere)

Foretræk `<button>` frem for `<input type="submit">`.

---



## Samlet — login til jeres app

```html
<link rel="stylesheet" href="styles.css">
…
<form action="#">
  <label for="brugernavn">Brugernavn</label>
  <input id="brugernavn" type="text" required>
  <label for="kode">Adgangskode</label>
  <input id="kode" type="password" required>
  <button type="submit">Log ind</button>
</form>
```

`lang="da"`, charset og viewport som i Lektion 1.
Byt navnet ud med *jeres* projekt. Den fulde fil står i [øvelsesarket](oevelser.md).

---



# Quiz — Formularer

---



## Quiz!

Gå til [/quiz](/quiz) og indtast koden fra tavlen.

**Lektion 3: Formularer** — `<form>`, `<label>`/`for`, `input`-typer, `action`, `button`.

---



# Øvelser

**Man lærer bedst CSS og formularer ved at prøve selv.**

Detaljerne — tjekliste og ekstra tid — står i [øvelsesarket](oevelser.md).

---



## Øvelse 1: Style login-siden

Freestyle i VS Code. Samme mappe som Lektion 1.

- rigtig `<form>` med `<label>`, brugernavn, adgangskode og knap
- `styles.css` med `<link>`
- class-selectors, farve, kant, luft, centrering
- inspicér i DevTools (*Styles*)

Ikke mere Cafe Menu — det var forberedelsen.

---



## Øvelse 2: Videre på mockupet

I grupper: style forsiden, og skitsér 1–2 skærme mere med HTML + CSS.

Det er stadig mockup — ingen backend.