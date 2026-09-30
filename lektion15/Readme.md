# Lektion 15 — PostgreSQL og SQL

Patientlisten fra lektion 13 ligger stadig i hukommelsen. Forberedelsen er
tabellen, nøglerne og tre SQLBolt-lektioner. I timen opretter I `patients` i
PostgreSQL og skriver `SELECT`, `INSERT`, `UPDATE` og `DELETE` i `psql`.
Express kalder tabellen i lektion 17.

## Forberedelse

Det forventes, at du har forberedt dig — fem lectures og SQLBolt lektion 1, 2
og 13 (ca. 65 min).

[Forberedelse til Lektion 15](forberedelse.md)

## Program (4 timer)

| Tid | Blok | Indhold |
|---|---|---|
| 25 min | Opsamling | Tabel, nøgler, `SELECT`, `WHERE`, `INSERT` |
| 10 min | Quiz | Forberedelsen |
| 20 min | Gennemgang | `psql` og `CREATE TABLE` |
| 10 min | Quiz | Tabel og typer |
| 35 min | [Øvelse 1](oevelser.md) | **Patienttabellen** — to rækker i `lektion15` |
| 25 min | Gennemgang | `UPDATE` og `DELETE` |
| 10 min | Quiz | `WHERE` før skrivning |
| 30 min | [Øvelse 2](oevelser.md) | **Ret, slet, og de fem** — testpatienterne |
| 30 min | [Øvelse 3](oevelser.md) | **Gruppens tabel** — én tabel til projektet |

Der er afsat 45 minutter til pauser, som lægges ind undervejs.

## Slides

[Forelæsningsslides](forelaesning.md?show=slide)

## Øvelser

Øvelserne står samlet her, med mere uddybning end på slidesne:

[Øvelser til Lektion 15](oevelser.md)

## Efter lektionen kan du

- forklare tabel, række, kolonne, primærnøgle og fremmednøgle
- oprette `patients` med `SERIAL`, `VARCHAR` til CPR og `PRIMARY KEY`
- hente, indsætte, rette og slette en række i `psql`
- tjekke resultatet med `SELECT`, `WHERE` og `\d`
- lade `server.js` være, som den var i lektion 13
