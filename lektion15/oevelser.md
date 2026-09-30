# Lektion 15 — Øvelser

Man lærer SQL bedst ved at skrive sætningerne i `psql` og læse, hvad der
kommer tilbage. Detaljerne, der ikke står på slidesne, står her.

Hvis du ikke nåede [forberedelsen](forberedelse.md), så læs de fem lectures
og lav SQLBolt lektion 1, 2 og 13, før du opretter `patients`.

| Øvelse | Hvornår | Tid |
|---|---|---|
| **1** Patienttabellen | Efter quizzen om tabel og typer | ~35 min |
| **2** Ret, slet, og de fem | Efter quizzen om `WHERE` | ~30 min |
| **3** Gruppens tabel | Efter øvelse 2 | ~30 min |

AI er tilladt, men du skal kunne forklare hver sætning, du kører. En
løsning, du ikke kan gennemgå, tæller ikke.

---

## Øvelse 1 — Patienttabellen

**Mål:** `patients` findes i databasen `lektion15`, med to rækker du kan
hente via `cpr`.

Arbejd i `psql`. Rør ikke `server.js`.

### Få `psql` op

PostgreSQL skal køre på din egen maskine. Installationen sker i timen, hvis
`psql` ikke findes endnu.

1. Hent installeren fra [postgresql.org/download](https://www.postgresql.org/download/).
   Vælg Windows eller macOS. Spring Stack Builder over.
2. Vælg en adgangskode til brugeren `postgres`, og husk den.
3. Åbn **SQL Shell (psql)**. Tryk Enter på server, database, port og
   brugernavn, så du får standarden `localhost`, databasen `postgres`, port
   `5432` og brugeren `postgres`. Skriv adgangskoden.
4. Prompten skal være `postgres=#`.

### Det skal du lave

1. Opret databasen og skift til den:

```sql
CREATE DATABASE lektion15;
\c lektion15
```

2. Opret tabellen:

```sql
CREATE TABLE patients (
  id SERIAL PRIMARY KEY,
  cpr VARCHAR(10) NOT NULL UNIQUE,
  navn VARCHAR(200) NOT NULL
);
```

3. Læg to rækker i. `id` skal du ikke selv skrive.

```sql
INSERT INTO patients (cpr, navn)
VALUES ('2512489996', 'Nancy Ann Test Berggren');

INSERT INTO patients (cpr, navn)
VALUES ('0107729995', 'Max Test Berggren');
```

4. Hent Max, og tjek at CPR starter med 0:

```sql
SELECT id, cpr, navn
FROM patients
WHERE cpr = '0107729995';
```

5. Kør `\d patients`, og peg på primærnøglen og på `UNIQUE`.

### Tjekliste

- [ ] Prompten viser `lektion15=>`
- [ ] `\d patients` viser `id` som primary key og `cpr` som `character varying`
- [ ] Max' CPR i resultatet er `0107729995`, ikke `107729995`
- [ ] `server.js` er uændret

**Øvelsen er i hus**, når en sidekammerat kan køre `SELECT` på din maskine og
få Max tilbage.

### Hvis du sidder fast

- Mangler semikolon, venter `psql` på resten. Skriv `;` på næste linje.
- Dobbelte anførselstegn er navne på kolonner. Tekst skal stå i enkelte
  anførselstegn.
- `relation "patients" does not exist` betyder, at du ikke er i `lektion15`.
  Kør `\c lektion15`.
- Prompten `postgres=#` er databasen `postgres`, ikke din tabel.

### Hvis du har ekstra tid

- Kør `SELECT * FROM patients;`, og sammenlign med den `SELECT`, der navngiver
  kolonnerne.
- Prøv at indsætte Max én gang til, og læs fejlen fra `UNIQUE`.

---

## Øvelse 2 — Ret, slet, og de fem

**Mål:** Du kan ændre én række og slette én række, og `patients` ender med
de fem testpatienter fra lektion 7.

### Det skal du lave

1. Læg en række i, som ikke skal blive:

```sql
INSERT INTO patients (cpr, navn)
VALUES ('0000000000', 'Slet mig');
```

2. Skriv `WHERE` som `SELECT`, før du retter Nancy:

```sql
SELECT id, cpr, navn
FROM patients
WHERE cpr = '2512489996';
```

3. Ret navnet, og hent rækken igen:

```sql
UPDATE patients
SET navn = 'Nancy Test Berggren'
WHERE cpr = '2512489996';

SELECT navn FROM patients WHERE cpr = '2512489996';
```

4. Sæt det rigtige navn tilbage med en ny `UPDATE` og samme `WHERE`.
5. Slet fejlrækken, og vis, at den er væk:

```sql
DELETE FROM patients
WHERE cpr = '0000000000';

SELECT * FROM patients WHERE cpr = '0000000000';
```

6. Læg de tre, der mangler, ind, så tabellen har alle fem. Navnene står på
   slidesne. Password skal ikke med.

```sql
INSERT INTO patients (cpr, navn) VALUES
  ('2911829996', 'Kirsten Test Berggren'),
  ('1509819996', 'Brita Test Berggren'),
  ('3103979995', 'Anders Test Jensen');
```

7. `SELECT cpr, navn FROM patients ORDER BY id;` skal vise fem rækker.

### Tjekliste

- [ ] Nancy hedder igen `Nancy Ann Test Berggren`
- [ ] `SELECT` på `0000000000` giver nul rækker
- [ ] Fem rækker, og Max' CPR starter med 0
- [ ] Ingen password-kolonne

**Øvelsen er i hus**, når de fem rækker kan læses op, og du kan forklare,
hvorfor `UPDATE` og `DELETE` fik en `WHERE`.

### Hvis du sidder fast

- `UPDATE` uden `WHERE` har ændret alle navne. Kør `SELECT * FROM patients;`,
  og ret række for række med `WHERE cpr = '...'`.
- `DELETE` uden `WHERE` har tømt tabellen. Kør øvelse 1's to `INSERT` igen,
  og derefter de tre her.
- Fejlen `duplicate key` betyder, at CPR allerede findes. Spring den `INSERT`
  over.

### Hvis du har ekstra tid

- Ret Kirstens navn med `WHERE id = ...` i stedet for `WHERE cpr = ...`, og
  sæt det tilbage.
- Kør `\d patients` igen, og forklar forskellen på `PRIMARY KEY` og `UNIQUE`.

---

## Øvelse 3 — Gruppens tabel

**Mål:** Gruppen har én tabel i `lektion15` til sit eget projekt, med én
syntetisk række, som `SELECT` kan hente.

Arbejd i gruppens database fra øvelse 1. Brug syntetiske data. Ingen rigtige
CPR, navne eller målinger.

### Det skal I nå

1. Vælg én slags række, projektet skal kunne gemme. Skriv kolonnerne,
   typerne og primærnøglen på papir, før I kører `CREATE TABLE`.
2. Opret tabellen med et navn, der ikke er `patients`. Brug `SERIAL PRIMARY
   KEY` på `id`, medmindre I kan forklare en anden primærnøgle.
3. `INSERT` én syntetisk række. `SELECT` den med `WHERE`.
4. Skriv denne linje på papir, og kør den ikke:

```sql
patient_id INTEGER REFERENCES patients (id)
```

   Den er fremmednøglen, hvis en anden tabel skal pege på en patient. I
   opretter ikke den anden tabel i dag.
5. Skriv tre bullets til projektloggen: hvad ligger i `server.js`, hvad
   ligger i `patients`, og hvad jeres nye tabel hedder.

### Tjekliste

- [ ] `\d` viser både `patients` og gruppens tabel
- [ ] `SELECT` med `WHERE` finder den syntetiske række
- [ ] Fremmednøgle-linjen står på papiret og er ikke kørt
- [ ] `server.js` er stadig uændret

**Øvelsen er i hus**, når en anden i gruppen kan hente rækken og pege på
primærnøglen i `\d`.

### Hvis I sidder fast

- `CREATE TABLE` fejler, hvis navnet findes. Vælg et andet navn, eller kør
  `\d` og brug den tabel, I allerede har.
- Tekst i `VALUES` skal i enkelte anførselstegn. Tal skal ikke.
- Hold tabellen til de kolonner, den centrale handling i D2 skal bruge. Flere
  tabeller kan vente til lektion 18.

### Hvis I har ekstra tid

- Læg en række mere i, og hent begge med `SELECT` uden `WHERE`.
- Skriv, hvilken kolonne I ville filtrere på i brugergrænsefladen. Det er
  jeres `WHERE`.
