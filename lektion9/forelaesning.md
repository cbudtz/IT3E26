# Lektion 9 — Klient-tilstand og en URL

Christian Budtz — [chbu@dtu.dk](mailto:chbu@dtu.dk)

---

## Program i dag

- Opsamling: `localStorage`
- Quiz: forberedelsen
- Øvelse 1: Gem listen
- Gennemgang: setter og render
- Quiz: tilstand
- Øvelse 2: Patientlisten følger data
- Gennemgang: statisk deploy til Vercel
- Øvelse 3: Mockuppet får en URL
- Øvelse 4: Videre på D1

Pauser lægges ind undervejs.

---

## Læringsmål i dag

Efter lektionen skal du kunne:

- forklare at `localStorage` gemmer tekst, og at en liste skal igennem `JSON.stringify` / `JSON.parse`
- gemme listen i en variabel og tegne tabellen fra en setter
- lægge det statiske mockup på Vercel og åbne URL'en
- holde password ude af `localStorage` — D1 har stadig ingen egen backend

---

# Opsamling — forberedelsen

---

## Hvor vi er

Lektion 7: `fetch` henter patientlisten og tegner rækkerne med det samme.

I forberedelsen lagde I en liste i `localStorage`. Den overlevede refresh. Tabellen læste den ikke.

I dag skal listen **bo et sted**, og skærmen skal følge med. Til sidst får prototypen en URL, og I arbejder videre på D1. Der er stadig ingen egen server.

---

## `localStorage`

Browserens lager på den her origin. Overlever refresh og en lukket fane.

```js
localStorage.setItem("noegle", "tekst");
const tekst = localStorage.getItem("noegle");
localStorage.removeItem("noegle");
```

Værdien er **altid en streng**. `getItem` giver `null`, hvis nøglen ikke findes.

---

## En liste er tekst

```js
const json = localStorage.getItem("patienter");
const liste = json ? JSON.parse(json) : [];

localStorage.setItem("patienter", JSON.stringify(liste));
```

`JSON.stringify` og `JSON.parse` kender I fra Lektion 7. Her gemmer de i browseren i stedet for at rejse over nettet.

Password hører ikke hjemme her. Lageret kan læses af script på samme side.

---

## `sessionStorage`

Samme metoder. Data dør, når fanen lukkes.

Til mockuppet bruger I `localStorage`, så patientlisten stadig er der efter refresh.

Det er browseren. Det er ikke et login på en server.

---

## Tabellen læser ikke lageret

I konsollen overlevede Nancy et refresh. `patienter.html` tegnede hende ikke af den grund.

Lager og tegning er to skridt. Øvelse 1 kobler kun lageret på scriptet. Tegningen samler vi bagefter.

---

# Quiz — forberedelsen

---

## Quiz!

Gå til [/quiz](/quiz) og indtast koden fra tavlen.

**Lektion 9: forberedelse** — `localStorage` og JSON.

---

# Øvelse 1

---

## Øvelse 1: Gem listen

Skriv lageret ind i `patienter.js`. Tabellen tegner I som i Lektion 7.

- `setItem` med `JSON.stringify` efter I har listen
- `getItem` ved opstart, og `JSON.parse` kun når værdien ikke er `null`
- Refresh uden netværk: konsollen viser stadig patienterne

Detaljerne står i [øvelsesarket](oevelser.md).

---

# Pause

---

# Gennemgang — tilstand

---

## To opgaver

1. **Husk** listen.
2. **Tegn** tabellen ud fra listen.

I Lektion 7 skete begge dele i samme åndedrag efter `fetch`. I dag er tegningen en funktion, og den eneste måde at ændre listen på kalder den funktion.

---

## `renderTabel`

Samme løkke som i Lektion 7. Den læser variablen. Den henter ikke selv.

```js
let patienter = [];

function renderTabel() {
  const tbody = document.getElementById("liste");
  tbody.replaceChildren();
  for (const p of patienter) {
    const tr = document.createElement("tr");
    const cpr = document.createElement("td");
    const navn = document.createElement("td");
    cpr.textContent = p.cpr;
    navn.textContent = p.navn;
    tr.append(cpr, navn);
    tbody.append(tr);
  }
}
```

`textContent` — samme regel som i Lektion 7.

---

## Setteren

```js
function setPatienter(next) {
  patienter = next;
  localStorage.setItem("patienter", JSON.stringify(patienter));
  renderTabel();
}
```

Setteren gemmer, skriver til `localStorage` og tegner. Den gør ikke andet.

`patienter.push(...)` ved siden af setteren opdaterer tabellen ikke. Tabellen læser kun variablen, når `renderTabel` kører.

Linjerne fra øvelse 1 flytter herind. `console.log` udgår, når tabellen tegner.

---

## `fetch` skriver, den tegner ikke

```js
async function hentPatienter() {
  const res = await fetch("https://it3e26.vercel.app/api/patients");
  if (!res.ok) throw new Error("Kunne ikke hente patienter");
  setPatienter(await res.json());
}
```

Når kaldet lykkes, er tabellen allerede tegnet, fordi setteren kaldte `renderTabel`.

Ved opstart: læs `localStorage` og kald `setPatienter`, hvis der ligger en liste. Så viser refresh noget, også før netværket svarer.

---

## Hvad I skriver selv

Frameworks kan spore, at listen ændrede sig, og tegne for jer. I kalder `renderTabel` selv.

I behøver ikke en liste af lyttere. Én setter er nok, så længe tabellen er det eneste, der skal følge med.

---

# Quiz — tilstand

---

## Quiz!

Gå til [/quiz](/quiz) og indtast koden fra tavlen.

**Lektion 9: tilstand** — setter, render og `localStorage`.

---

# Øvelse 2

---

## Øvelse 2: Patientlisten følger data

Byg videre på øvelse 1.

- `setPatienter` gemmer, skriver til `localStorage` og kalder `renderTabel`
- `fetch` kalder setteren og tegner ikke selv
- Refresh viser listen i tabellen, før netværket svarer

Detaljerne står i [øvelsesarket](oevelser.md).

---

# Pause

---

# Gennemgang — Vercel

---

## En URL

D1 er en klikbar prototype. En adresse slår en zip-fil: I kan åbne den i timen, og underviser kan åbne den uden jeres computer.

Det er **statiske filer**: HTML, CSS og JavaScript fra GitHub. Ingen database, ingen hemmeligheder, ingen egen server.

Lektion 21 tager deployment og miljøvariabler. I dag er det mockuppet.

---

## Live

Kontoen er oprettet i forberedelsen. I timen starter I ved **Import**.

1. Log ind på [vercel.com](https://vercel.com) med GitHub.
2. **Import Project**, og vælg gruppens repository.
3. **Application Preset: Other**. **Root Directory** er mappen med `index.html`.
4. **Deploy**. Åbn `https://….vercel.app`.

Billederne står i [øvelse 3](oevelser.md).

Én i gruppen ejer projektet og inviterer resten. Næste `git push` opdaterer siden.

---

## Når URL'en er forkert

- 404: Root Directory peger på en mappe uden HTML.
- Gammel side: push'en er ikke landet endnu. Tjek at branchen er den, Vercel bygger.
- `fetch` til underviser-API'et virker her. I kalder stadig `https://it3e26.vercel.app`, ikke jeres egen backend.

---

# Øvelse 3

---

## Øvelse 3: URL til mockuppet

Gruppen deployer det repository, I allerede har, til Vercel.

**Øvelsen er i hus**, når underviser kan åbne jeres URL, og mockuppet vises.

---

# Øvelse 4

---

## Øvelse 4: Videre på D1

Læg tilstanden ind på den skærm, URL'en åbner. Brug resten af tiden på den klikbare sti, I vil aflevere.

Ingen egen backend. Password hører ikke hjemme i `localStorage`.

Detaljerne står i [øvelsesarket](oevelser.md).
