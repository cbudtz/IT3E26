# Lektion 11 — Forberedelse

D1 er afleveret. Mockuppet er en klient: siden kører i browseren, og dataene
ligger i `localStorage`. Forberedelsen er client-server, tre lag, et
sekvensdiagram, og hvad Node er. I timen samler vi det op, skriver serveren
og peger tabellen på den. Sekvensdiagrammet over jeres kald tegner I
bagefter, når I kan se request og svar.

Afsnittet om sekvensdiagrammer er lagt op sent. Tag det med, også hvis du
allerede har lavet resten.

Forberedelsen er ca. 80 minutter.

## 1. Client-server (~25 min)

**[Client–server model](https://en.wikipedia.org/wiki/Client%E2%80%93server_model)**

Læs disse afsnit:

1. Indledningen
2. **Client and server role**
3. **Client and server communication**
4. **Server-side** → *General concepts*
5. **Client side** → *General concepts*
6. **Centralized computing**

Spring **Example** over. Artiklen bruger en netbank. Vi bruger det samme
mønster på en journal:

En kliniker slår en patient op. Browseren spørger journalens webserver.
Webserveren er server for browseren. Samme webserver er klient, når den
spørger databasen efter patientens række. Browseren behøver ikke vide,
hvordan rækken blev fundet.

Fokusér på, at klienten starter samtalen, og at serveren venter og svarer.
Klienten behøver ikke vide, hvordan serveren finder svaret, kun hvilken
protokol de deler.

I **Centralized computing** hedder det *thin client* og *rich client*. I
timen siger vi tyk klient om rich client. En tynd klient har næsten ingen
egen logik. En tyk klient kan noget uden serveren.

Et program, der aldrig sender eller modtager noget over et netværk, er ikke
en klient.

Spring **Computer security**, **Early history** og **Comparison with
peer-to-peer architecture** over.

## 2. Tre lag (~15 min)

**[Multitier architecture](https://en.wikipedia.org/wiki/Multitier_architecture)**

Læs disse dele:

1. Indledningen, til og med forskellen på *layer* og *tier*
2. **Three-tier architecture** — presentation, application og data
3. **Web development** — de tre punkter om frontend, applikation og database

Et lag er en opdeling af ansvaret. En tier er, hvor det kører. Samme tre lag
kan ligge på én maskine eller på flere. Præsentation er det, brugeren ser og
rører ved. Applikationen er beslutningerne. Data er det, der bliver gemt.

Spring listerne over CORBA, Java RMI og de øvrige protokoller. Spring også
**Common layers** og afsnittet om strict og relaxed layering over.

## 3. Sekvensdiagram (~20 min)

**[Sequence diagram](https://en.wikipedia.org/wiki/Sequence_diagram)**

Læs indledningen, til og med at tiden går nedad langs livlinjerne, og
afsnittet om beskeder. En udfyldt pil er et kald, der venter. En stiplet
pil er svaret tilbage.

Se kun sekvensdiagram-kapitlet i videoen, cirka 9 minutter, fra 1:17:17 og
frem til Communications Diagram:

[UML Diagrams Full Course — Sequence Diagram](https://www.youtube.com/watch?v=WnMQ8HlmeXc&t=4637s)

Spring aktiveringsbokse, asynkrone pile og combined fragments (`alt`,
`loop`, `opt`) over. Dem bruger vi ikke. Resten af det to timer lange
kursus er ikke forberedelse.

## 4. Node (~15 min)

JavaScript har indtil nu kørt i browseren. Node er det, der kan køre det
samme sprog uden for browseren. Det er den proces, serveren bliver.

**[Back End Development and APIs](https://www.freecodecamp.org/learn/back-end-development-and-apis-v9/)**

Kapitel **Back End Development and APIs**, modulet **Introduction to Node.js**. Lav kun denne lecture:

1. [What Is Node and What Are Some Differences Between the Browser and Node Runtime Environment?](https://www.freecodecamp.org/learn/back-end-development-and-apis-v9/lecture-working-with-nodejs-and-event-driven-architecture/what-is-node-and-what-are-some-differences-between-the-browser-and-node-runtime-environment)

Fokusér på, at browseren har DOM, og at Node ikke har. Node kan bygge en
server, der tager imod HTTP. Der er ikke noget `window`.

Spring **What Are the Advantages and Disadvantages of Using Node on the Back-End?**
over. Event loop og tråde tager vi ikke. Spring også **How Can You Install
Node on Your Computer?** over. NVM er ikke nødvendigt. Workshoppen **Learn
Node.js REPL** er ikke forberedelse.

## 5. Kør en fil (~10 min)

Installer Node.js LTS fra [https://nodejs.org](https://nodejs.org).

Lav en fil `hej.js`:

```js
console.log("hej fra Node");
```

Kør den i den mappe, filen ligger i:

```text
node hej.js
```

Terminalen skal skrive linjen, og processen stopper. Der er ingen browser og
ingen server. Det er bare JavaScript uden for browseren.

## Når du er færdig

Du skal kunne forklare:

- at klienten anmoder, og serveren venter og svarer
- at det samme program kan være klient i ét kald og server i et andet
- forskellen på et lag og en tier, og hvad præsentation, applikation og data hver især er
- forskellen på en tynd og en tyk klient
- at `localStorage` ikke er en server og ikke er datalaget i et færdigt system
- at Node kører JavaScript uden for browseren, og at den ikke har DOM
- at tiden i et sekvensdiagram går nedad, at en udfyldt pil er et kald, der venter, og at en stiplet pil er svaret

Og du skal have kørt `node hej.js`.

HTTP, serveren og diagrammet over det kald, I lige har kørt, tager vi i timen.

## Praktisk

- `node -v` og `npm -v` skal svare med et versionsnummer.
- Du skriver ikke serveren hjemmefra.
- Hav gruppens mockup med, lokalt. Diagrammet tegner I, når serveren svarer.

