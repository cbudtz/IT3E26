# Lektion 7 — Øvelser

Man lærer `fetch` bedst ved at prøve selv. Dette ark samler dagens to øvelser
med den uddybning, der ikke kan være på slidesne.

Hvis du ikke nåede [forberedelsen](forberedelse.md), så start der — eller gør
det parallelt med Øvelse 1.

API-kontrakt, statuskoder og testpatienter:

[API til Lektion 7](api.md)

| Øvelse | Hvornår | Tid |
|---|---|---|
| **1** Patientliste | Efter fetch-quizzen | ~45 min |
| **2** Login | Efter øvelse 1 | ~40 min |

AI er tilladt, men du skal kunne forklare hver linje, du skriver. En løsning,
du ikke kan gennemgå, tæller ikke.

---

## Øvelse 1 — Patientliste

**Mål:** Hente den åbne patientliste og vise `cpr` og `navn` i en HTML-tabel.

Arbejd i projektmappen (en ny fil er fint, fx `patienter.html`). I har **ingen
egen backend** — I kalder underviser-API'et.

```
GET https://it3e26.vercel.app/api/patients
```

### Udgangspunkt

```html
<!DOCTYPE html>
<html lang="da">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Patienter</title>
    <script src="patienter.js" defer></script>
  </head>
  <body>
    <h1>Patienter</h1>
    <p id="status"></p>
    <table>
      <thead>
        <tr>
          <th>CPR</th>
          <th>Navn</th>
        </tr>
      </thead>
      <tbody id="liste"></tbody>
    </table>
  </body>
</html>
```

I `patienter.js`:

1. Skriv en `async`-funktion, der kalder `fetch` på URL'en ovenfor.
2. Tjek `res.ok`. Hvis kaldet fejler, skriv en besked i `#status`.
3. Læs JSON med `await res.json()`.
4. Tøm `tbody` og tilføj én `<tr>` pr. patient med to `<td>`: `cpr` og `navn`.
5. Brug `textContent` til cellerne — ikke `innerHTML`.
6. Kald funktionen, når scriptet kører.

Gennemgangen viste løkken med `createElement`. Den må I gerne bruge.

### Tjekliste

- [ ] JavaScript ligger i en separat fil med `defer`.
- [ ] Kaldet går til underviser-API'et (ikke et lokalt mock-array).
- [ ] `response.ok` er tjekket, før JSON læses.
- [ ] Tabellen har `thead` med CPR og Navn.
- [ ] Der er én række pr. patient i `tbody`.
- [ ] Password vises **ikke** (det er heller ikke i svaret).

### Tjek med DevTools

Åbn **Network**. Genindlæs siden.

- Ser du et `GET` til `/api/patients` med status 200?
- Fanen **Response** (eller Preview) viser en JSON-array?
- Console er uden fejl, når tabellen er tegnet?

**Øvelsen er i hus**, når de fem testpatienter står i tabellen med CPR og navn.

### Hvis du sidder fast

- Tjek at URL'en er stavet præcis som i [api.md](api.md).
- Tjek at `id="liste"` findes i HTML'en.
- Log `patienter` med `console.log`, før du tegner rækkerne.
- Hvis tabellen er tom: kører funktionen overhovedet? Er den `async`, og
  huskede du at kalde den?
- Bed en sidekammerat eller underviseren om at kigge med. Vis koden, ikke
  bare fejlen.

### Hvis du har ekstra tid

- Style tabellen (kanter, padding, skiftende rækker).
- Giv én række en CSS-klasse med `classList` (fx Nancy), så demoen fra starten
  også sidder i jeres egen kode.
- Vis en fejl i `#status`, hvis netværket fejler (`try`/`catch`).
- Tilføj et søgefelt, der filtrerer på navn — stadig kun med de hentede data.

---

## Øvelse 2 — Login

**Mål:** Få login-formularen til at kalde `POST /api/login` og vise fejl eller
succes. Ingen rigtig session — I viser svaret i DOM'en.

Arbejd videre i gruppens `login.html` fra Lektion 3. Har I den ikke, så brug
udgangspunktet nedenfor.

Eksempel (I skal skrive jeres egen):
[https://it3e26.vercel.app/login.html](https://it3e26.vercel.app/login.html)

Test-CPR og koder står i [api.md](api.md). Prøv mindst Nancy
(`2512489996` / `password`) og ét forkert kodeord.

### Det skal I nå

1. Formularen må **ikke** genindlæse siden. Lyt på `submit` og kald
   `event.preventDefault()`.
2. Send JSON `{ "cpr", "password" }` med `POST` til
   `https://it3e26.vercel.app/api/login`.
3. Sæt headeren `Content-Type: application/json`.
4. Body'en skal være `JSON.stringify(...)`.
5. Ved `res.ok`: vis succes — fx gå til en `velkommen.html`, eller skriv
   patientens `navn` på siden.
6. Ved fejl (fx 401): vis en fejlbesked. Skjul den igen ved næste forsøg.

Feltet må gerne hedde "brugernavn" i HTML'en. I JSON-body'en skal nøglen hedde
`cpr`.

### Udgangspunkt, hvis login.html mangler

```html
<form id="login-form">
  <label for="brugernavn">CPR</label>
  <input id="brugernavn" type="text" autocomplete="username">
  <label for="kode">Adgangskode</label>
  <input id="kode" type="password" autocomplete="current-password">
  <p id="fejl" hidden>Forkert CPR eller kodeord</p>
  <button type="submit">Log ind</button>
</form>
```

```js
const form = document.getElementById("login-form");
const fejl = document.getElementById("fejl");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  // fetch POST ...
});
```

### Tjekliste

- [ ] `preventDefault` kører, så siden ikke reloader.
- [ ] Network viser et `POST` til `/api/login` med JSON-body.
- [ ] Forkert kode viser en fejl på siden.
- [ ] Rigtig kode viser succes (redirect eller navn).
- [ ] I gemmer ikke password i `localStorage` eller i Git.

### Tjek resultatet

Network: status 200 med Nancy, status 401 med forkert kode. Fanen **Payload**
(eller Request) indeholder `cpr` og `password`.

**Øvelsen er i hus**, når både fejl og succes kan ses på jeres egen side — eller
når samme idé sidder i projektets mockup.

### Hvis I sidder fast

- Genindlæser siden? Så mangler `preventDefault`.
- 400 "cpr og password skal sendes"? Tjek nøglenavne og `JSON.stringify`.
- 401 hver gang? Tjek koden i [api.md](api.md) — den trimmes ikke.
- CORS-fejl i Console? URL'en skal være underviser-API'et, ikke et andet host.

### Hvis I har ekstra tid

- Vis `data.navn` fra 200-svaret på velkomst-siden.
- Brug `data.error` fra 400/401 som fejltekst.
- Flyt login ind på den skærm i mockupet, hvor det hører til i jeres projekt.
