# Lektion 7 — Client-side interaktivitet

Christian Budtz — [chbu@dtu.dk](mailto:chbu@dtu.dk)

---

## Program i dag

- Live demo: blodtryk og `classList`
- Opsamling: DOM fra Lektion 5
- Quiz: DOM
- Gennemgang: `fetch`
- Quiz: fetch
- Øvelse 1: Patientliste
- Øvelse 2: Login

Pauser lægges ind undervejs.

---

## Læringsmål i dag

Efter lektionen skal du kunne:

- læse et input, forgrene med `if`/`else if` og sætte én CSS-klasse med `classList`
- forklare at `fetch` henter data fra en URL, mens siden kører i browseren
- kalde `GET /api/patients` med `async`/`await`, tjekke `response.ok` og læse JSON
- vise listen i en HTML-tabel (`cpr` og `navn`)
- sende `POST /api/login` fra login-formularen
- kende CORS som grunden til at underviser-API'et tillader `origin: '*'`
- bruge én af delene i projektets mockup (stadig uden egen backend)

---

# Live demo — inputvalidering

---

## Blodtryk: feltet Øvre

Vi læser ét felt, forgrener med `if` og sætter én CSS-klasse.

<a href="/lektion7/dom-blodtryk.html" target="_blank" rel="noreferrer">Åbn DOM-demoen</a>

Prøv tomt felt, 89, 90, 139 og 140. Kun feltet **Øvre** ændrer farve.

---

## Det I så

| Input | Tekst | Klasse på Øvre |
|---|---|---|
| tomt | Udfyld feltet Øvre | `fejl` |
| 89 | Lav | `lav` |
| 90 | OK | `ok` |
| 139 | OK | `ok` |
| 140 | Høj | `hoj` |

Feltet **Nedre** er med i HTML'en, men koden læser det ikke. Bevidst.

---

# Opsamling — DOM

---

## Fra Lektion 5

I kan allerede:

- finde et element med `getElementById`
- lytte på klik med `addEventListener`
- skrive tekst med `innerText`

I dag: **læse et tal**, **forgrene**, og **skifte CSS-klasse**.

---

## Find, lyt, læs

```js
const upper = document.getElementById("oevre");
const button = document.getElementById("vurder");

button.addEventListener("click", () => {
  const raw = upper.value.trim();
  // ...
});
```

`value` er altid en **streng** — også fra `type="number"`.

---

## classList

CSS-klassen sidder på elementet. JavaScript tænder og slukker den:

```js
upper.classList.remove("fejl", "lav", "ok", "hoj");
upper.classList.add("ok");
```

Fjern de gamle tilstande **før** du lægger den nye på. Ellers hænger forrige
farve ved.

---

## Tomt felt først

```js
if (raw === "") {
  result.innerText = "Udfyld feltet Øvre";
  upper.classList.add("fejl");
  return;
}

const value = Number(raw);
```

`return` stopper funktionen. Først derefter er det sikkert at bruge tallet.

---

## if / else if

```js
if (value < 90) {
  upper.classList.add("lav");
} else if (value <= 139) {
  upper.classList.add("ok");
} else {
  upper.classList.add("hoj");
}
```

89 er lav. 90 og 139 er OK. 140 er høj. Grænserne ligger i koden — ikke i CSS.

---

# Quiz — DOM

---

## Quiz!

Gå til [/quiz](/quiz) og indtast koden fra tavlen.

**Lektion 7: DOM** — events, `classList`, betingelser og `Number`.

---

# Pause

---

# Gennemgang — fetch

---

## Opsamling fra forberedelsen

I har hentet en JSON-liste og tegnet den i DOM'en (Authors Page).

I timen bruger vi **samme mønster** på patientlisten:

- JSON er tekst, indtil I parser den
- `patient.navn` læser et felt
- `fetch` er asynkront
- workshoppen brugte `.then()` — vi bruger `async`/`await`

Nyt i dag: `response.ok`, CORS, og rækker i en **tabel**.

---

## JSON

Svaret fra API'et er tekst. `res.json()` giver JavaScript-objekter:

```json
[
  { "cpr": "2512489996", "navn": "Nancy Ann Test Berggren" }
]
```

```js
const patienter = await res.json();
console.log(patienter[0].navn);
```

Password kommer **aldrig** med i listen.

---

## fetch og await

```js
const res = await fetch("https://it3e26.vercel.app/api/patients");
const patienter = await res.json();
```

Siden bliver på skærmen. Browseren henter dataene i baggrunden.
`await` venter på svaret, uden at I skal kæde `.then()`.

Funktionen, der bruger `await`, skal være `async`.

---

## response.ok

`fetch` kaster **ikke** en fejl ved HTTP 401 eller 404. I får et svar —
bare med en dårlig status.

```js
const res = await fetch("https://it3e26.vercel.app/api/patients");
if (!res.ok) {
  throw new Error("Kunne ikke hente patienter");
}
const patienter = await res.json();
```

`res.ok` er sand, når status er 200–299.

---

## CORS — kort

Browseren blokerer `fetch` til et **andet origin** (anden protokol, host
eller port), medmindre serveren tillader det.

Underviser-API'et sender `Access-Control-Allow-Origin: *`, så kaldet virker
fra `file://` og localhost.

I bygger **ikke** API'et i dag. CORS er grunden til, at I overhovedet kan
kalde det.

---

## Fra array til tabel

```html
<table>
  <thead>
    <tr><th>CPR</th><th>Navn</th></tr>
  </thead>
  <tbody id="liste"></tbody>
</table>
```

```js
const tbody = document.getElementById("liste");
tbody.innerHTML = "";
for (const p of patienter) {
  const tr = document.createElement("tr");
  const cpr = document.createElement("td");
  const navn = document.createElement("td");
  cpr.textContent = p.cpr;
  navn.textContent = p.navn;
  tr.append(cpr, navn);
  tbody.append(tr);
}
```

`thead` er fast. `tbody` fylder I i løkken. Brug `textContent` — ikke
`innerHTML` — til data fra API'et.

---

## POST kommer i øvelse 2

Login er et `POST` med JSON i body:

```js
const res = await fetch("https://it3e26.vercel.app/api/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ cpr: "...", password: "..." })
});
```

Husk `event.preventDefault()`, så formularen ikke genindlæser siden.

Kontrakt og testpatienter: [API til Lektion 7](api.md).

---

# Quiz — fetch

---

## Quiz!

Gå til [/quiz](/quiz) og indtast koden fra tavlen.

**Lektion 7: fetch** — JSON, `async`/`await`, `response.ok` og CORS.

---

# Pause

---

# Øvelser

**Man lærer fetch bedst ved at prøve selv.**

Detaljerne står i [øvelsesarket](oevelser.md).

API'et: [https://it3e26.vercel.app/api/patients](https://it3e26.vercel.app/api/patients)

---

## Øvelse 1: Patientliste

Hent `GET /api/patients` og vis `cpr` og `navn` i en tabel.

- `async`/`await`
- tjek `response.ok`
- én række pr. patient i `tbody`

---

## Øvelse 2: Login

Formularen kalder `POST /api/login` — på jeres `login.html` eller samme
idé i projektet.

- `preventDefault`
- vis fejl ved 401
- vis succes (redirect eller navn) ved 200

Der gemmes ingen session. I viser svaret i DOM'en.
