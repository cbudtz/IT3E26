# Lektion 11 — Øvelser

Man lærer grænsen mellem browser og server ved at starte processen selv.
Detaljerne, der ikke står på slidesne, står her.

Hvis du ikke nåede [forberedelsen](forberedelse.md), så læs client-server
og tre lag, før du skriver serveren. Sekvensdiagrammet er lagt op sent:
læs [Wikipedia](https://en.wikipedia.org/wiki/Sequence_diagram) eller se
[videokapitlet](https://www.youtube.com/watch?v=WnMQ8HlmeXc&t=4637s), før
I tegner i øvelse 2, hvis notationen ikke sidder.

| Øvelse | Hvornår | Tid |
|---|---|---|
| **1** Skriv serveren | Efter quizzen om request og response | ~40 min |
| **2** Modellér kaldet | Efter øvelse 1 | ~35 min |

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

## Øvelse 2 — Modellér kaldet

**Mål:** Diagrammet beskriver det kald, I lige har kørt. Papir er fint.
Notationen står i forberedelsen: [Sequence diagram](https://en.wikipedia.org/wiki/Sequence_diagram)
og [videokapitlet](https://www.youtube.com/watch?v=WnMQ8HlmeXc&t=4637s)
fra 1:17:17 til Communications Diagram.

### Det skal du lave

1. Livlinjer: bruger, browser og server. Tiden går nedad. Databasen er
   ikke med. `server.js` spørger den ikke.
2. Beskeden fra browser til server er `GET /api/patients`. Svaret tilbage
   er `200` og JSON-listen. En udfyldt pil venter. En stiplet pil er
   svaret.
3. Navngiv de tre lag for den handling, ud fra koden: hvad brugeren ser,
   hvilken beslutning `if`'et i `server.js` tager, og hvor listen bor.
4. Skriv hvor det kører. HTML-filen er åbnet lokalt. Node kører på den
   bærbare. Vercel-URL'en kan ikke lave det kald.
5. Er klienten tynd eller tyk efter ændringen, og hvorfor? Begrund det
   med, hvor logikken sidder.

### Tjekliste

- [ ] Tiden går nedad
- [ ] Sti og statuskode er dem, I kan se i browseren
- [ ] Præsentation, applikation og data er navngivet for det kald
- [ ] Listen er placeret i server-processen, ikke i `localStorage`
- [ ] I kan sige, hvorfor siden på Vercel ikke kan hente listen
- [ ] Tynd eller tyk er begrundet i, hvor logikken sidder
- [ ] Diagrammet handler om jeres kald, ikke om journal-eksemplet

### Øvelsen er i hus når…

en anden i gruppen kan læse diagrammet og sige, hvilket request browseren
sender, hvad processen svarer, og hvorfor Vercel ikke er med i kaldet.

### Hvis du sidder fast

Kig på fanen, der viser `http://localhost:3000/api/patients`. Det, I ser
der, er svaret. Requestet er den adresse og metoden `GET`. `if`'et er
beslutningen. Arrayet er dataene.

### Hvis du har ekstra tid

Tegn det samme forløb én gang til, som det ser ud efter lektion 15: serveren
spørger databasen, før den svarer browseren. Gem begge. I skal kunne se,
hvad der mangler i dag.
