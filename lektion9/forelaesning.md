# Lektion 9 — Klient-tilstand og en URL

Christian Budtz — [chbu@dtu.dk](mailto:chbu@dtu.dk)

---

## Program i dag

- Opsamling: `localStorage`
- Quiz: forberedelsen
- Øvelse 1: Login-state
- Gennemgang: setter og render
- Quiz: tilstand
- Øvelse 2: Kladde til et notat
- Gennemgang: statisk deploy til Vercel
- Øvelse 3: Mockuppet får en URL
- Øvelse 4: Videre på D1

Pauser lægges ind undervejs.

---

## Læringsmål i dag

Efter lektionen skal du kunne:

- forklare at `localStorage` gemmer tekst, og at login-state og kladden skal igennem `JSON.stringify` / `JSON.parse`
- vise navn og minutter til logout efter et refresh, indtil `expiresAt`
- gemme kladden i en variabel og tegne forhåndsvisningen fra en setter
- lægge det statiske mockup på Vercel og åbne URL'en
- holde password, CPR og patientlisten ude af `localStorage` — D1 har stadig ingen egen backend

---

# Opsamling — forberedelsen

---

## Hvor vi er

Lektion 7: `fetch` henter patientlisten og tegner rækkerne med det samme. Den liste gemmer vi ikke.

I forberedelsen lagde I et objekt i `localStorage`. Det overlevede refresh. Siden læste det ikke.

I dag skal login-state og en kladde **bo et sted**, og skærmen skal følge med. Til sidst får prototypen en URL, og I arbejder videre på D1. Der er stadig ingen egen server.

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

## Et objekt er tekst

```js
const json = localStorage.getItem("login");
const login = json ? JSON.parse(json) : null;

localStorage.setItem("login", JSON.stringify({ navn: "Nancy", expiresAt: 0 }));
```

`JSON.stringify` og `JSON.parse` kender I fra Lektion 7. Her gemmer de i browseren i stedet for at rejse over nettet.

Password, CPR og patientlisten hører ikke hjemme her. Lageret kan læses af script på samme side. Ligger nøglen `patienter` der, så slet den.

---

## `sessionStorage`

Samme metoder. Data dør, når fanen lukkes.

Til mockuppet bruger I `localStorage` til login-state: navn og et udløbstidspunkt. Patientlisten gemmes ikke.

Det er browseren. Det er ikke et login på en server. Password og CPR hører ikke hjemme i lageret.

---

## Siden læser ikke lageret

I forberedelsen overlevede objektet et refresh. Siden viste det ikke.

I dag er det login-state og kladden, der skal overleve refresh. Patientlisten hentes med `fetch` og gemmes ikke.

---

# Quiz — forberedelsen

---

## Quiz!

Gå til [/quiz](/quiz) og indtast koden fra tavlen.

**Lektion 9: forberedelse** — `localStorage` og JSON.

---

# Øvelse 1

---

## Øvelse 1: Login-state

Først vis tilstanden. Så refresh — I er logget ud. Så læs den fra `localStorage`.

- Efter login: topbar med navn og minutter til `expiresAt` (fem minutter frem)
- Refresh uden `setItem`: baren er væk
- Gem `{ navn, expiresAt }` med `JSON.stringify`, og læs den når scriptet starter
- Vis kun, hvis udløbet ligger i fremtiden

Ikke password. Ikke CPR. Ikke patientlisten.

Detaljerne står i [øvelsesarket](oevelser.md).

---

# Pause

---

# Gennemgang — tilstand

---

## To opgaver

1. **Husk** kladden.
2. **Tegn** forhåndsvisningen ud fra kladden.

Feltet og visningen er ikke det samme. I dag er tegningen en funktion, og den eneste måde at ændre kladden på kalder den funktion.

---

## `renderKladde`

Den læser variablen. Den lytter ikke selv på feltet.

```js
let kladde = { tekst: "" };

function renderKladde() {
  const vis = document.getElementById("forhaand");
  vis.textContent = kladde.tekst || "Intet notat endnu";
}
```

`textContent` — samme regel som i Lektion 7.

---

## Setteren

```js
function setKladde(next) {
  kladde = next;
  localStorage.setItem("kladde", JSON.stringify(kladde));
  renderKladde();
}
```

Setteren gemmer, skriver til `localStorage` og tegner. Den gør ikke andet.

`kladde.tekst = "hej"` ved siden af setteren opdaterer forhåndsvisningen ikke. Den læser kun variablen, når `renderKladde` kører.

---

## Feltet skriver, det tegner ikke

```js
document.getElementById("kladde-tekst").addEventListener("input", (event) => {
  setKladde({ tekst: event.target.value });
});
```

Når der skrives, er forhåndsvisningen allerede tegnet, fordi setteren kaldte `renderKladde`.

Ved opstart: læs `localStorage`, læg teksten i feltet, og kald `renderKladde`. Så viser refresh kladden. Patientlisten er ikke med i objektet.

---

## Hvad I skriver selv

Frameworks kan spore, at teksten ændrede sig, og tegne for jer. I kalder `renderKladde` selv.

I behøver ikke en liste af lyttere. Én setter er nok, så længe forhåndsvisningen er det eneste, der skal følge med.

---

# Quiz — tilstand

---

## Quiz!

Gå til [/quiz](/quiz) og indtast koden fra tavlen.

**Lektion 9: tilstand** — setter, render og `localStorage`.

---

# Øvelse 2

---

## Øvelse 2: Kladde til et notat

Først vis kladden. Så refresh — teksten er væk. Så gem den i `setKladde`, og læs den ved opstart.

- `setKladde` sætter variablen, skriver til `localStorage` og kalder `renderKladde`
- Feltet kalder setteren og tegner ikke selv
- Refresh viser teksten igen. Patientlisten er ikke i lageret

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

Læg login-baren og kladden ind på den skærm, URL'en åbner. Brug resten af tiden på den klikbare sti, I vil aflevere.

Ingen egen backend. Password, CPR og patientlisten hører ikke hjemme i `localStorage`.

Detaljerne står i [øvelsesarket](oevelser.md).
