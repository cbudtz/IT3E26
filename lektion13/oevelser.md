# Lektion 13 — Øvelser

Man lærer routes bedst ved at omskrive serveren og kalde den uden browseren.
Detaljerne, der ikke står på slidesne, står her.

Hvis du ikke nåede [forberedelsen](forberedelse.md), så læs Express-lectures
og kør `my-app`, før du rører gruppens `server.js`.

| Øvelse | Hvornår | Tid |
|---|---|---|
| **1** Samme valg, anden syntaks | Efter quizzen om forberedelsen | ~15 min |
| **2** Express i projektet | Efter quizzen om routes | ~35 min |
| **3** POST med curl | Efter quizzen om POST | ~30 min |
| **4** Tabellen mod jeres server | Efter øvelse 3 | ~25 min |

AI er tilladt, men du skal kunne forklare hver linje, du skriver. En løsning,
du ikke kan gennemgå, tæller ikke.

---

## Øvelse 1 — Samme valg, anden syntaks

**Mål:** Du kan pege på metode, sti og handler i både L11 og Express.

Arbejd på papir eller i editoren — uden at ændre `server.js` endnu.

### Det skal du lave

1. Åbn gruppens `server.js` fra lektion 11 (eller skriv skelettet, hvis filen
   mangler).
2. Åbn `index.js` fra `my-app` i forberedelsen.
3. For `GET /api/patients`: skriv tre korte sætninger — hvad tjekker `if`'et,
   og hvad gør `app.get`'s første og andet argument?
4. For 404: hvor i L11 sendes fejlen, og hvor i Express fanger I «alt andet»?
5. Byt med en gruppekammerat, og ret hinandens svar.

### Tjekliste

- [ ] Metode og sti er navngivet for `GET /api/patients`
- [ ] Handleren er koden, der kalder `res.json` / `res.end`
- [ ] 404 er ikke en tom patientliste
- [ ] I er enige om, at listen stadig hedder `patients` i processen

### Øvelsen er i hus når…

en anden kan sige, hvilket `if` i L11 svarer til `app.get("/api/patients", …)`.

### Hvis du sidder fast

Kig på freeCodeCamp-lecturen om routing: metoden er `get`, stien er
strengen, funktionen er `(req, res) => { … }`.

### Hvis du har ekstra tid

Skriv `app.post("/api/patients", …)` som én sætning: hvad skal metoden og
handleren gøre, før I koder den?

---

## Øvelse 2 — Express i projektet

**Mål:** `server.js` kører med Express. `GET /api/patients` og 404 opfører sig
som i lektion 11. Tabellen henter stadig JSON fra `localhost:3000`.

Arbejd i gruppens projekt. Behold filnavnet `server.js`.

### Det skal du lave

1. `npm init -y` og `npm install express` i projektmappen.
2. Erstat `http.createServer` med Express som på slidesne: `require`,
   `app.use` til CORS, `express.json()`, `patients`-array.
3. `app.get("/api/patients", …)` svarer med `res.json(patients)`.
4. Sidste middleware: `404` og `{ error: "not found" }`.
5. `app.listen(3000)`. Start med `node server.js`.
6. Tjek `http://localhost:3000/api/patients` og at `/` giver 404 JSON.
7. Bekræft at tabellen viser de samme navne som før omskrivningen.

### Udgangspunkt

Listen fra lektion 11 — mindst to patienter med `cpr` og `navn`.

### Tjekliste

- [ ] `package.json` og `package-lock.json` findes; `node_modules/` er ikke
  committet
- [ ] Kun `GET /api/patients` giver 200 med listen
- [ ] `GET /` og ukendte stier giver 404 JSON
- [ ] CORS-headeren er sat, så `fetch` fra en lokal HTML-side virker
- [ ] Tabellen og browser-JSON viser samme data

### Øvelsen er i hus når…

du kan stoppe processen, starte igen og vise JSON plus tabelrækker uden
at ændre `fetch`-URL'en.

### Hvis du sidder fast

- `Cannot find module 'express'`: kør `npm install express` i mappen, hvor
  `server.js` ligger.
- 404 på `/api/patients`: tjek stien — præcis `/api/patients`, ikke
  trailing slash, medmindre I har ændret begge steder.
- Tom tabel, JSON OK: CORS eller forkert `fetch`-URL.

### Hvis du har ekstra tid

Tilføj en tredje patient i arrayet i filen. Genstart og tjek tabellen.
Skriv ikke `POST` endnu — det er næste øvelse.

---

## Øvelse 3 — POST med curl

**Mål:** `POST /api/patients` tilføjer en patient til listen i hukommelsen. Du
kan bevise det med curl uden at åbne DevTools.

Serveren skal køre, mens du sender requests.

### Det skal du lave

1. Tilføj `app.post("/api/patients", …)` **over** 404-handleren.
2. Læs `cpr` og `navn` fra `req.body`. Svar `400`, hvis et felt mangler.
3. `push` til `patients`. Svar `201` og den nye patient som JSON.
4. Genstart `node server.js`.
5. Send `POST` med curl (JSON-body med `Content-Type: application/json`).
6. Kør `curl http://localhost:3000/api/patients` og find den nye patient.
7. Åbn samme URL i browseren og sammenlign.

Eksempel (Windows CMD — én linje):

```bash
curl -X POST http://localhost:3000/api/patients -H "Content-Type: application/json" -d "{\"cpr\":\"0201029994\",\"navn\":\"Ny Test Person\"}"
```

PowerShell kan kræve `curl.exe` i stedet for aliaset til `Invoke-WebRequest`.

### Tjekliste

- [ ] `express.json()` står **før** POST-routen
- [ ] `POST` uden body eller uden `cpr`/`navn` giver `400`
- [ ] Vellykket `POST` giver `201`
- [ ] `GET` efter `POST` viser den nye patient
- [ ] Genstart af processen fjerner curl-patienten igen (listen var kun i RAM)

### Øvelsen er i hus når…

du kan vise terminal-output fra `POST` og derefter `GET`, hvor den nye CPR
står i arrayet.

### Hvis du sidder fast

- `req.body` er `{}`: mangler `express.json()` eller forkert
  `Content-Type`.
- `POST` giver 404: routen er registreret efter catch-all — flyt `app.post`
  op.
- curl fejl på Windows: prøv `curl.exe` eller én linje uden linjeskift.

### Hvis du har ekstra tid

Send `POST` med samme CPR to gange. Beslut i gruppen, om det er OK i
mockuppet — I behøver ikke løse dubletter endnu. Notér det til lektion 15.

---

## Øvelse 4 — Tabellen mod jeres server

**Mål:** Gruppens patienttabel viser data fra jeres Express-server, også
efter I har tilføjet en patient med curl.

### Det skal I nå

1. Åbn mockuppet lokalt (HTML-fil eller dev-server), mens `node server.js`
   kører. Vercel-URL'en kan ikke nå jeres bærbare.
2. Bekræft at `fetch` peger på `http://localhost:3000/api/patients`.
3. Kør `POST` med curl for en patient, I kan genkende i jeres domæne (navn
   fra jeres testcase — ikke rigtige CPR).
4. Genindlæs siden eller kør den funktion, der henter listen igen. Den nye
   række skal vises.
5. Skriv tre korte bullets til jeres projektlog: hvad ligger i browseren nu,
   hvad ligger på serveren, og hvad kommer i PostgreSQL i lektion 15.

### Tjekliste

- [ ] Tabellen og curl-`GET` viser samme antal patienter
- [ ] I kan forklare, hvorfor Vercel-siden ikke kan POST'e til jeres laptop
- [ ] Gruppen ved, at genstart af serveren sletter curl-data

### Øvelsen er i hus når…

en anden i gruppen kan demo: curl-`POST`, refresh af tabellen, og forklaring
af hvor listen bor.

### Hvis I sidder fast

Samme fejlsøgning som lektion 11: JSON i browseren på `localhost:3000`, men
tom tabel peger på URL eller CORS — ikke på Express syntaks.

### Hvis I har ekstra tid

Tegn sekvensdiagram: bruger, browser, Express — med `GET` efter curl-`POST`.
Databasen som livlinje med note «lektion 15».
