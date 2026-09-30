# Lektion 13 — Express og routes

Efter efterårsferien åbner I den samme `server.js` som i lektion 11. Forberedelsen
er routes og et lille Express-program. I timen omskriver I til Express, beholder
listen i hukommelsen og tester `POST` med curl.

## Forberedelse

Det forventes, at du har forberedt dig — Express, routes og `my-app` (ca. 45 min).

[Forberedelse til Lektion 13](forberedelse.md)

## Program (4 timer)

| Tid | Blok | Indhold |
|---|---|---|
| 20 min | Opsamling | Framework, route, `my-app` |
| 10 min | Quiz | Forberedelsen |
| 15 min | [Øvelse 1](oevelser.md) | **Samme valg, anden syntaks** — `if` og `app.get` |
| 20 min | Gennemgang | npm og omskriv `server.js` |
| 10 min | Quiz | Routes og 404 |
| 35 min | [Øvelse 2](oevelser.md) | **Express i projektet** — samme `GET`, samme tabellen |
| 20 min | Gennemgang | curl og `POST` |
| 10 min | Quiz | Body og status |
| 30 min | [Øvelse 3](oevelser.md) | **POST med curl** — listen vokser i RAM |
| 25 min | [Øvelse 4](oevelser.md) | **Tabellen mod jeres server** — gruppens mockup og `localhost` |

Der er afsat 45 minutter til pauser, som lægges ind undervejs.

## Slides

[Forelæsningsslides](forelaesning.md?show=slide)

## Øvelser

Øvelserne står samlet her, med mere uddybning end på slidesne:

[Øvelser til Lektion 13](oevelser.md)

## Efter lektionen kan du

- forklare at en route er metode, sti og handler — samme valg som L11-`if`'et
- køre `server.js` med Express, `npm install express` og samme CORS som før
- svare `GET /api/patients` og 404 på ukendte stier
- tilføje `POST /api/patients` med `express.json()` og passende statuskoder
- teste API'et med curl og se nye patienter i tabellen efter genhentning
- sige, at listen stadig bor i processen — PostgreSQL er lektion 15
