# Lektion 11 — Øvelser

Man lærer grænsen mellem browser og server ved at starte processen selv.
Detaljerne, der ikke står på slidesne, står her.

Hvis du ikke nåede [forberedelsen](forberedelse.md), så læs client-server
og tre lag, og tag øvelserne bagefter.

| Øvelse | Hvornår | Tid |
|---|---|---|
| **1** Jeres system | Efter quizzen om forberedelsen | ~15 min |
| **2** Skriv serveren | Efter quizzen om request og response | ~40 min |
| **3** Pilene matcher kaldet | Efter øvelse 2 | ~30 min |

AI er tilladt, men du skal kunne forklare hver linje, du skriver. En løsning,
du ikke kan gennemgå, tæller ikke.

---

## Øvelse 1 — Jeres system

**Mål:** De to tekster fra forberedelsen sidder på gruppens mockup. En halv
side. Papir er fint.

### Det skal du lave

1. Hvem er klienten i mockuppet i dag? Er den tynd eller tyk, og hvorfor?
2. Tag gruppens vigtigste brugerhandling. Navngiv de tre lag: hvad brugeren
   ser, hvilken beslutning applikationen skulle tage, og hvad der skulle
   gemmes. Databasen findes ikke endnu. Navngiv den alligevel.
3. Tegn et sekvensdiagram for den handling med livlinjerne bruger, browser,
   server og database. En udfyldt pil er et kald, der venter på svar. En
   stiplet pil tilbage er svaret.

Notation, hvis den er rusten: [Sequence diagram](https://sparxsystems.com/resources/tutorials/uml2/sequence-diagram.html), kun **Lifelines** og **Messages**. Netbank-eksemplet i client-server-artiklen er den samme slags række.

### Tjekliste

- [ ] Tynd eller tyk er begrundet i, hvor logikken sidder
- [ ] Præsentation, applikation og data er navngivet for jeres handling
- [ ] Diagrammet har et kald, der venter, og et svar tilbage
- [ ] Databasen er med, selvom I ikke har den endnu

### Øvelsen er i hus når…

en anden i gruppen kan sige, om mockuppet er tyndt eller tykt, og læse ét
kald og ét svar på diagrammet.

### Hvis du sidder fast

Mockuppet kører i browseren, og listen ligger i `localStorage`. Det er en
tyk klient. Databasen på diagrammet er det, der skulle gemmes. I kalder den
ikke endnu.

### Hvis du har ekstra tid

Skriv de tre lag med én sætning hver, ved siden af diagrammet.

---

## Øvelse 2 — Skriv serveren

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

## Øvelse 3 — Pilene matcher kaldet

**Mål:** Sekvensdiagrammet fra øvelse 1 beskriver det kald, I lige har
kørt. Det er gruppens diagram for den vigtigste brugerhandling.

### Det skal du lave

1. Behold livlinjerne bruger, browser, server og database.
2. Skriv beskeden fra browser til server som `GET /api/patients`.
3. Skriv svaret tilbage som `200` og JSON-listen.
4. Lad databasen stå på diagrammet. I har ikke kaldt den endnu. En note på
   pilen er nok: «kommer i lektion 15».
5. Ret de tre lag fra øvelse 1, hvis øvelse 2 flyttede noget: listen
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
