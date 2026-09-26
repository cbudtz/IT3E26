# Lektion 13 — Forberedelse

I lektion 11 skrev I `server.js`: én proces, ét `if`, og JSON på
`GET /api/patients`. Listen ligger stadig i hukommelsen. Forberedelsen er,
hvad en route er, og et lille Express-program I selv har startet. I timen
samler vi begge dele op og lægger routen ind i `server.js`. Den kalder I
med curl.

Forberedelsen er ca. 45 minutter.

## 1. Framework og route (~25 min)

Node kan tage imod et request. Det gjorde jeres `http.createServer`. Den
vælger ikke selv, hvilken funktion der skal køre for en metode og en sti.
Det `if`, I skrev, er den valg. Express gør valget til en route.

**[Back End Development and APIs](https://www.freecodecamp.org/learn/back-end-development-and-apis-v9/)**

Kapitel **Back End Development and APIs**. Lav disse lectures:

1. [What is Express.js?](https://www.freecodecamp.org/learn/back-end-development-and-apis-v9/lecture-working-with-express/what-is-express-js)
2. [What Is Routing and How Do Route Methods Work in Express?](https://www.freecodecamp.org/learn/back-end-development-and-apis-v9/lecture-understanding-routing-in-express-js/what-is-routing-and-how-do-route-methods-work-in-express)
3. [What Are Route Paths in Express?](https://www.freecodecamp.org/learn/back-end-development-and-apis-v9/lecture-understanding-routing-in-express-js/what-are-route-paths-in-express)
4. [What Are the Different Response Methods in Express?](https://www.freecodecamp.org/learn/back-end-development-and-apis-v9/lecture-understanding-routing-in-express-js/what-are-the-different-response-methods-in-express)

Fokusér på, at Express ligger oven på Node, og at en route er en metode, en
sti og en funktion. `app.get` er det `if`, der i `server.js` tjekker `GET`
og `/api/patients`. `app.listen` starter processen, ligesom `server.listen`.

`/api/patients` er en statisk sti, samme slags som `/home` i lecturen om
route paths. `res.send` sender tekst. `res.json` sender JSON, og det er det,
jeres server allerede svarer. `res.status(404)` sætter statuskoden, før
svaret sendes.

`app.get` henter. `app.post` opretter. Det er det samme som i lektion 11:
`POST` sender noget, der skal gemmes.

I response-lecturen: læs `res.send`, `res.json` og `res.status`. `res.redirect`
og `res.render` bruger I ikke. Spring **route parameters**, **route
handlers**, `app.route()`, `express.Router()` og **static files** over.
Workshoppen **Build a Random Joke App** er ikke forberedelse.

## 2. Kør et Express-program (~20 min)

Følg [How Do You Create a Basic Express App?](https://www.freecodecamp.org/learn/back-end-development-and-apis-v9/lecture-working-with-express/how-do-you-create-a-basic-express-app)
i en ny mappe, `my-app`. Ikke i gruppens projekt. `server.js` skal blive
stående, som den er.

Når `Hello World!` vises på `http://localhost:3000`, så stop processen med
Ctrl+C og tilføj en route mere i `index.js`, over `app.listen`:

```js
app.get("/api/patients", (req, res) => {
  res.json([{ cpr: "2512489996", navn: "Nancy Ann Test Berggren" }]);
});
```

Start igen med `node index.js`. Åbn de to adresser i browseren:

- `http://localhost:3000/` skal vise teksten fra `res.send`
- `http://localhost:3000/api/patients` skal vise JSON-listen

Stop processen bagefter. Port 3000 skal være fri til timen.

## Når du er færdig

Du skal kunne forklare:

- at jeres `if` i `server.js` vælger handler ud fra metode og sti, og at en
  route er det valg skrevet som metode, sti og funktion
- at Express ligger oven på den Node-server, I allerede har, og at
  `app.listen` stadig er processen, der venter
- at `GET` henter, og at `POST` sender noget, der skal gemmes
- forskellen på `res.send` og `res.json`
- at listen i `my-app` bor i processen, ikke i en database og ikke i
  `localStorage`

Og du skal have set begge adresser i browseren.

Curl, `POST` ind i listen, 404-svaret fra lektion 11 og omskrivningen af
`server.js` tager vi i timen. PostgreSQL er lektion 15.

## Praktisk

- freeCodeCamp kræver login (gratis), hvis du vil gemme din fremgang.
- Node skal svare på `node -v`. Det installerede I til lektion 11.
- Hav `server.js` med. Den skal stadig være `http.createServer`.
- `my-app` ligger uden for gruppens repository.
