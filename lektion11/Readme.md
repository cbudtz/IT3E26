# Lektion 11 — Client-server

Dagen efter D1. Mockuppet er en tyk klient. Forberedelsen er client-server,
tre lag og Node. I timen samler vi det op, tegner jeres system og skriver
en minimal Node-server: `GET /api/patients`.

## Forberedelse

Det forventes, at du har forberedt dig — client-server, tre lag og Node
(ca. 60 min). `node -v` skal svare. Skitsen tegner I i timen.

[Forberedelse til Lektion 11](forberedelse.md)

## Program (4 timer)

| Tid | Blok | Indhold |
|---|---|---|
| 20 min | Opsamling | Client-server, tynd og tyk, tre lag, Node |
| 10 min | Quiz | Forberedelsen |
| 15 min | [Øvelse 1](oevelser.md) | **Jeres system** — tynd eller tyk, tre lag, sekvensdiagram |
| 20 min | Gennemgang | HTTP: metode, sti, status, JSON |
| 25 min | Gennemgang | `server.js` — ét `GET`, 404 på resten |
| 10 min | Quiz | Request og response |
| 40 min | [Øvelse 2](oevelser.md) | **Skriv serveren** — JSON på `localhost:3000` |
| 30 min | [Øvelse 3](oevelser.md) | **Pilene matcher kaldet** — sekvensdiagram for gruppens handling |

Der er afsat 45 minutter til pauser, som lægges ind undervejs.

## Slides

[Forelæsningsslides](forelaesning.md?show=slide)

## Øvelser

Øvelserne står samlet her, med mere uddybning end på slidesne:

[Øvelser til Lektion 11](oevelser.md)

## Efter lektionen kan du

- forklare at klienten anmoder, og at serveren venter og svarer
- skelne tynd og tyk klient og placere jeres mockup
- navngive præsentation, applikation og data for én handling i gruppen
- skrive en Node-server, der svarer JSON på `GET /api/patients` og 404 ellers
- pege tabellen på `localhost` og se, at listen bor i server-processen
- tegne sekvensdiagrammet for den handling, så pilene matcher kaldet
