# Lektion 11 — Client-server

Christian Budtz — [chbu@dtu.dk](mailto:chbu@dtu.dk)

---

## Program i dag

- Opsamling: client-server, tynd og tyk, tre lag
- Opsamling: jeres skitse
- Quiz: forberedelsen
- Gennemgang: HTTP, nok til én server
- Gennemgang: `server.js`
- Quiz: request og response
- Øvelse 1: Skriv serveren
- Øvelse 2: Sekvensdiagrammet passer til kaldet

Pauser lægges ind undervejs.

---

## Læringsmål i dag

Efter lektionen skal du kunne:

- forklare at klienten anmoder, og at serveren venter og svarer
- skelne tynd og tyk klient og placere jeres mockup
- navngive præsentation, applikation og data for én handling i gruppen

---

## Læringsmål i dag

- skrive en Node-server, der svarer JSON på `GET /api/patients` og 404 ellers
- pege tabellen på `localhost` og se, at listen bor i server-processen
- tegne sekvensdiagrammet for den handling, så pilene matcher kaldet

---

# Opsamling — client-server

---

## Hvor vi er

D1 er en klient.

Siden kører i browseren. Dataene ligger i `localStorage`.

I dag sætter vi navn på det, I læste, og på skitsen I har med.

---

## Klienten starter

Klienten anmoder.

Serveren venter.

Uden et request sker der ingenting på serveren.

---

## Request og response

Klienten sender et request.

Serveren sender et response tilbage.

Klienten behøver ikke vide, hvordan svaret blev fundet. Den skal kende protokollen.

---

## Rollen kan skifte

Webserveren er server for browseren.

Samme webserver er klient, når den spørger databasen.

Det er netbank-eksemplet.

---

## Tynd klient

Næsten ingen egen logik.

Den viser. Serveren beslutter.

---

## Tyk klient

Kan noget uden serveren.

Logik og data kan ligge hos klienten.

Wikipedia kalder det *rich client*. Vi siger tyk.

---

## Jeres mockup

Det er en tyk klient.

Præsentationen, beslutningerne og listen ligger i browseren.

`localStorage` er ikke en server.

---

## Ikke en klient

Et program, der aldrig sender eller modtager noget over nettet, er ikke en klient.

Jeres `fetch` til underviser-API'et var allerede et request. Mockuppets egen liste var det ikke.

---

# Opsamling — tre lag

---

## Lag og tier

Et lag er et ansvar.

En tier er et sted, det kører.

Samme tre lag kan ligge på én maskine.

---

## Præsentation

Det, brugeren ser og rører ved.

I mockuppet: HTML, CSS og det, JavaScript tegner.

---

## Applikation

Beslutningen.

Må den her måling gemmes. Hvem er patienten. Hvad er næste skridt.

---

## Data

Det, der bliver gemt, og som andre skal kunne hente igen.

Ikke kun det, der tilfældigvis ligger i en variabel lige nu.

---

## Hvor det sidder i dag

| Lag | I mockuppet |
|---|---|
| Præsentation | Browseren |
| Applikation | Browseren |
| Data | `localStorage` |

Én tier. Tre lag mast sammen.

---

## Hvor det skal hen

Præsentationen bliver i browseren.

Applikationen flytter over i serveren. Det starter i dag, som én liste i en proces.

Datalaget bliver PostgreSQL. Det er lektion 15. Repository-laget ligger der.

---

# Opsamling — jeres skitse

---

## Skitsen

I har skrevet: tynd eller tyk, de tre lag, et sekvensdiagram.

Vi bruger den. Vi tegner den ikke forfra.

---

## Sekvensdiagram

Tiden går nedad.

En livlinje er en deltager.

En udfyldt pil venter på svar. En stiplet pil er svaret.

---

## Livlinjer

Bruger. Browser. Server. Database.

Databasen er med, selvom den ikke findes endnu.

Pilene skal vise den handling, gruppen faktisk bygger.

---

## Kig på skitsen

Passer "tyk" med, at listen ligger i browseren?

Ligger beslutningen i applikationslaget eller i det, brugeren ser?

Er der et kald, der venter, og et svar tilbage?

---

# Quiz — forberedelsen

---

## Quiz!

Gå til [/quiz](/quiz) og indtast koden fra tavlen.

**Lektion 11: forberedelse** — client-server, tynd og tyk, tre lag.

---

# Pause

---

# Gennemgang — HTTP

---

## Det, I allerede har kaldt

```js
const res = await fetch("https://it3e26.vercel.app/api/patients");
```

Browseren anmoder. En server svarer med JSON.

I dag skriver I den server, for én liste.

---

## Metoden

`GET` henter.

`POST` sender noget, der skal gemmes.

I dag er det kun `GET`.

---

## Stien

`/api/patients`

Det er den ressource, requestet gælder.

En anden sti er et andet request.

---

## Status

`200` — her er indholdet.

`404` — den sti findes ikke.

Statuskoden er første linje i svaret. Ikke en del af JSON-listen.

---

## Kroppen

På et `GET`, der lykkes, er kroppen listen.

```json
[{ "cpr": "2512489996", "navn": "Nancy Ann Test Berggren" }]
```

Samme felter som tabellen allerede læser.

---

## Stateless

Serveren husker ikke samtalen.

Næste request starter forfra.

Derfor er `localStorage` ikke en session. Sessioner er lektion 19.

---

## To oprindelser

Siden ligger ét sted. Serveren lytter på `localhost:3000`.

Browseren spørger kun på tværs, hvis svaret tillader det.

```js
res.setHeader("Access-Control-Allow-Origin", "*");
```

Samme aside som i lektion 7.

---

# Gennemgang — serveren

---

## Én fil

`server.js` i det projekt, I allerede har.

Ingen Express. Ingen database. Ingen HTML fra serveren.

Lektion 13 åbner den samme fil igen.

---

## Listen bor i processen

```js
const patients = [
  { cpr: "2512489996", navn: "Nancy Ann Test Berggren" },
  { cpr: "0107729995", navn: "Max Test Berggren" }
];
```

Det er ikke datalaget. Det er en liste i hukommelsen, så I kan se grænsen.

---

## Processen venter

```js
const http = require("node:http");

const server = http.createServer((req, res) => {
  // ét request ad gangen, her
});

server.listen(3000);
```

Uden `listen` er der ingen server.

---

## To headere på hvert svar

```js
res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Content-Type", "application/json");
```

Den første lukker browseren ind. Den anden siger, at kroppen er JSON.

---

## Kun ét kald lykkes

```js
if (req.method === "GET" && req.url === "/api/patients") {
  res.writeHead(200);
  res.end(JSON.stringify(patients));
  return;
}
```

Metode og sti skal begge passe.

---

## Alt andet er 404

```js
res.writeHead(404);
res.end(JSON.stringify({ error: "not found" }));
```

En forkert sti må ikke ligne en tom patientliste.

---

## Se svaret

Start med `node server.js`.

Åbn `http://localhost:3000/api/patients`.

I skal se JSON, før I rører ved tabellen.

---

## Peg tabellen hertil

Skift URL'en i det `fetch`, I allerede har.

Fra `https://it3e26.vercel.app/api/patients`.

Til `http://localhost:3000/api/patients`.

Tabellen kender felterne. Den skal ikke skrives om.

---

## Ændr et navn

Ret et navn i listen. Genstart processen.

Refresh tabellen.

Navnet skifter, fordi dataene sidder i den proces, I startede. Ikke i `localStorage`.

---

## Det, filen ikke er

Ikke tre lag i koden. Listen og svaret ligger i samme fil.

Ikke Express. Det er lektion 13.

Ikke PostgreSQL. Det er lektion 15.

---

# Quiz — request og response

---

## Quiz!

Gå til [/quiz](/quiz) og indtast koden fra tavlen.

**Lektion 11: serveren** — metode, sti, status og JSON.

---

# Pause

---

# Øvelser

**Man lærer grænsen ved at starte processen selv.**

Detaljerne står i [øvelsesarket](oevelser.md).

---

## Øvelse 1: Skriv serveren

Skriv `server.js`.

`GET /api/patients` svarer 200 og JSON. Alt andet svarer 404.

Tabellen henter fra `localhost:3000`. Et ændret navn ses efter genstart.

---

## Øvelse 2: Pilene matcher kaldet

Opdatér sekvensdiagrammet fra forberedelsen.

Kaldet fra browser til server er `GET /api/patients`.

Svaret er `200` og JSON-listen.

Diagrammet er gruppens, for den handling I faktisk bygger.
