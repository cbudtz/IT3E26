# Lektion 11 — Øvelser

Man lærer grænsen mellem browser og server ved at starte processen selv.
Detaljerne, der ikke står på slidesne, står her.

Hvis du ikke nåede [forberedelsen](forberedelse.md), så start med skitsen —
tynd eller tyk, de tre lag, sekvensdiagrammet — og skriv serveren bagefter.

| Øvelse | Hvornår | Tid |
|---|---|---|
| **1** Skriv serveren | Efter quizzen om request og response | ~40 min |
| **2** Pilene matcher kaldet | Efter øvelse 1 | ~30 min |

AI er tilladt, men du skal kunne forklare hver linje, du skriver. En løsning,
du ikke kan gennemgå, tæller ikke.

---

## Øvelse 1 — Skriv serveren

**Mål:** En proces svarer JSON på `GET /api/patients`. Jeres tabel henter
derfra. Et ændret navn ses efter genstart.

Arbejd i gruppens projekt, i en fil der hedder `server.js`. Tabellen er den,
I allerede har fra lektion 7. Felterne er `cpr` og `navn`.

### Det skal du lave

1. Skriv `server.js` med en liste af mindst to patienter.
2. `GET /api/patients` svarer `200` og `JSON.stringify` af listen.
3. Enhver anden metode eller sti svarer `404` og `{"error":"not found"}`.
4. Sæt `Access-Control-Allow-Origin: *` og `Content-Type: application/json`.
5. Lyt på port 3000. Start med `node server.js`.
6. Åbn `http://localhost:3000/api/patients` og tjek, at du ser JSON.
7. Skift `fetch`-URL'en i tabellen til `http://localhost:3000/api/patients`.
8. Ret et navn i listen, genstart processen, og hent tabellen igen.

### Tjekliste

- [ ] `node -v` svarer, før du skriver filen
- [ ] Kun `GET` og kun stien `/api/patients` giver 200
- [ ] `http://localhost:3000/` giver 404, ikke en tom liste
- [ ] Tabellen viser de navne, der står i `server.js`
- [ ] Et nyt navn kræver genstart. Det kommer ikke fra `localStorage`

### Øvelsen er i hus når…

du kan stoppe processen, ændre et navn, starte igen og pege på det nye navn
i tabellen — og forklare, at listen bor i processen.

### Hvis du sidder fast

- `node server.js` skal køres i den mappe, filen ligger i. En anden port i
  fejlteksten betyder, at noget allerede lytter på 3000. Stop den proces,
  eller skift port begge steder.
- Tabellen er tom, men browseren på `localhost:3000/api/patients` viser
  JSON: så er det `fetch`-URL'en eller CORS-headeren.
- Siden på Vercel kan ikke nå din bærbare. Åbn HTML-filen lokalt, mens
  `node server.js` kører.

### Hvis du har ekstra tid

Tilføj en tredje patient. Genstart, og se rækken dukke op. Skriv ikke
`POST`. Det er lektion 13.

---

## Øvelse 2 — Pilene matcher kaldet

**Mål:** Sekvensdiagrammet fra forberedelsen beskriver det kald, I lige har
kørt. Det er gruppens diagram for den vigtigste brugerhandling.

### Det skal du lave

1. Behold livlinjerne bruger, browser, server og database.
2. Skriv beskeden fra browser til server som `GET /api/patients`.
3. Skriv svaret tilbage som `200` og JSON-listen.
4. Lad databasen stå på diagrammet. I har ikke kaldt den endnu. En note på
   pilen er nok: «kommer i lektion 15».
5. Ret de tre lag fra forberedelsen, hvis øvelse 1 flyttede noget: listen
   ligger nu i server-processen, ikke i `localStorage`.

### Tjekliste

- [ ] Tiden går nedad
- [ ] Der er et kald, der venter, og et svar tilbage
- [ ] Sti og statuskode er dem, I kan se i browseren
- [ ] Diagrammet handler om gruppens handling, ikke om netbank-eksemplet
- [ ] I kan forklare, hvorfor databasen er med, selvom `server.js` ikke spørger den

### Øvelsen er i hus når…

en anden i gruppen kan læse diagrammet og sige, hvilket request browseren
sender, og hvad processen svarer.

### Hvis du sidder fast

Kig på fanen, der viser `http://localhost:3000/api/patients`. Det, I ser
der, er svaret. Requestet er den adresse og metoden `GET`.

### Hvis du har ekstra tid

Tegn det samme forløb én gang til, som det ser ud efter lektion 15: serveren
spørger databasen, før den svarer browseren. Gem begge. I skal kunne se,
hvad der mangler.
