# Lektion 7 — Client-side interaktivitet

Fra DOM og events til at hente API-data med `fetch`. Timen åbner med
blodtryksdemoen, der ikke nåede med i Lektion 5. Derefter henter I
patientliste og logger ind mod underviser-API'et.

## Program (4 timer)

| Tid | Blok | Indhold |
|---|---|---|
| 15 min | Live demo | Blodtryk: tomt / 89 / 90 / 139 / 140 — `classList` på **Øvre** |
| 15 min | Opsamling | Kort opsamling på DOM fra Lektion 5 og det, I så i demoen |
| 10 min | Quiz | DOM, events, `classList`, betingelser |
| 25 min | Gennemgang | `fetch`, `async`/`await`, JSON, `response.ok` — CORS som aside |
| 10 min | Quiz | fetch |
| 45 min | Øvelse 1 | **Patientliste** — hent `GET /api/patients` og vis listen i DOM'en |
| 40 min | Øvelse 2 | **Login** — formularen kalder `POST /api/login`, eller samme idé i projektet |

Der er afsat 45 minutter til pauser, som lægges ind undervejs.

## Slides

[Forelæsningsslides](forelaesning.md?show=slide)

## Underviser-API

Live: [https://it3e26.vercel.app/api/patients](https://it3e26.vercel.app/api/patients)
· eksempel-login: [https://it3e26.vercel.app/login.html](https://it3e26.vercel.app/login.html)

Kontrakt, `fetch`-eksempler, statuskoder og de fem testpatienter (CPR + kode)
står her:

[API til Lektion 7](api.md)

## Efter lektionen kan du

- læse et input, forgrene med `if`/`else if` og sætte én CSS-klasse med `classList`
- forklare at `fetch` henter data fra en URL, mens siden kører i browseren
- kalde `GET /api/patients` med `async`/`await`, tjekke `response.ok` og læse JSON
- vise listen i DOM'en
- sende `POST /api/login` fra login-formularen
- kende CORS som grunden til at underviser-API'et tillader `origin: '*'`
- bruge én af delene i projektets mockup (stadig uden egen backend)
