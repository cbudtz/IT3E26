# Lektion 15 — Forberedelse

I lektion 13 ligger patientlisten i hukommelsen i `server.js`. Den forsvinder,
når processen stopper. Forberedelsen er, hvad en tabel er, og at du selv har
skrevet `SELECT`, `WHERE` og `INSERT`. I timen samler vi begge dele op i
PostgreSQL. Routen kalder databasen i lektion 17.

Forberedelsen er ca. 65 minutter.

## 1. Tabel, SQL og nøgler (~40 min)

En relationel database gemmer rækker i tabeller. SQL er de sætninger, der
opretter tabellen og lægger rækker i den.

**[Relational Databases](https://www.freecodecamp.org/learn/relational-databases-v9/)**

Kapitel **Relational Databases**, modulet **SQL and PostgreSQL**. Lav disse
lectures:

1. [What Are Relational Databases, and How Do They Differ from Non-Relational Databases?](https://www.freecodecamp.org/learn/relational-databases-v9/lecture-working-with-relational-databases/what-are-relational-databases-and-how-do-they-differ-from-non-relational-databases)
2. [What Is SQL, and How Can You Create a Database with Tables?](https://www.freecodecamp.org/learn/relational-databases-v9/lecture-working-with-relational-databases/what-is-sql-and-how-can-you-create-a-database-with-tables)
3. [What Are the Basic Data Types in SQL?](https://www.freecodecamp.org/learn/relational-databases-v9/lecture-working-with-relational-databases/what-are-the-basic-data-types-in-sql)
4. [How Do You Insert and View Data in a Table?](https://www.freecodecamp.org/learn/relational-databases-v9/lecture-working-with-relational-databases/how-do-you-insert-and-view-data-in-a-table)
5. [What Are Primary and Foreign Keys in SQL, and How Do They Work?](https://www.freecodecamp.org/learn/relational-databases-v9/lecture-working-with-relational-databases/what-are-primary-and-foreign-keys-in-sql-and-how-do-they-work)

Fokusér på, at en tabel har kolonner og rækker, og at en række er én
patient, ét produkt eller én film. `CREATE TABLE` navngiver kolonnerne og
deres type. `INSERT INTO` med kolonnenavne lægger en række i. `SELECT` henter
rækker, og `WHERE` vælger hvilke. En primærnøgle udpeger én række. En
fremmednøgle peger på primærnøglen i en anden tabel.

`VARCHAR` og `INTEGER` er typer, du skal kunne genkende. `SERIAL` er
PostgreSQL's måde at nummerere primærnøglen på. Den taster du i timen.

Spring lecturen om at installere Postgres over. Spring **relationstyper** og
**joins** over. Modulet **SQL and Bash** (normalisering, SQL injection, N+1)
og værkstedet **Build a Database of Video Game Characters** er ikke
forberedelse.

## 2. Skriv `SELECT`, `WHERE` og `INSERT` (~25 min)

**[SQLBolt](https://sqlbolt.com/)**

Lav disse lektioner. De kører i browseren. Tabellen hedder `movies`: én række
pr. film, kolonner for titel, år og instruktør. Det er samme form som
patientlisten, bare med andre kolonner.

1. [SELECT queries 101](https://sqlbolt.com/lesson/select_queries_introduction)
2. [Queries with constraints (Pt. 1)](https://sqlbolt.com/lesson/select_queries_with_constraints)
3. [Inserting rows](https://sqlbolt.com/lesson/inserting_rows)

Lektion 3 til 12 er filtre, joins og aggregater. Spring dem over via menuen,
og gå til lektion 13. Løsningen ligger bag et link, hvis du sidder fast. Brug
den først, når du har prøvet selv.

## Når du er færdig

Du skal kunne forklare:

- at en tabel er kolonner og rækker, og at én række er én ting (en patient, en
  film)
- at `SELECT` henter rækker, `WHERE` filtrerer dem, og `INSERT INTO` lægger en
  ny række i
- at en primærnøgle udpeger én række, og at en fremmednøgle peger på en
  primærnøgle i en anden tabel
- at listen i `server.js` stadig bor i processen. Den er endnu ikke en tabel

Og du skal have løst de tre SQLBolt-lektioner.

`psql`, `CREATE TABLE` på en patienttabel, `UPDATE` og `DELETE` tager vi i
timen. At en Express-route kalder databasen, er lektion 17.

## Praktisk

- freeCodeCamp kræver login (gratis), hvis du vil gemme din fremgang.
- SQLBolt kræver ingen konto.
- Installer ikke PostgreSQL før timen.
- `server.js` skal blive stående, som den er fra lektion 13.
- SQLBolt kører SQLite. `SELECT`, `WHERE` og `INSERT` er de samme sætninger,
  som du skriver i PostgreSQL.
