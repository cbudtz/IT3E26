# Lektion 11 — Forberedelse

D1 er afleveret. Mockuppet er en klient: siden kører i browseren, og dataene
ligger i `localStorage`. Forberedelsen er client-server, tre lag, og hvad
Node er. I timen samler vi det op. Skitsen af jeres eget system er en øvelse
dér, før I skriver en server.

Forberedelsen er ca. 60 minutter.

## 1. Client-server (~25 min)

**[Client–server model](https://en.wikipedia.org/wiki/Client%E2%80%93server_model)**

Læs disse afsnit:

1. Indledningen
2. **Client and server role**
3. **Client and server communication**
4. **Example** (netbanken)
5. **Server-side** → *General concepts*
6. **Client side** → *General concepts*
7. **Centralized computing**

Fokusér på, at klienten starter samtalen, og at serveren venter og svarer.
Klienten behøver ikke vide, hvordan serveren finder svaret, kun hvilken
protokol de deler. I netbank-eksemplet skifter rollen: webserveren er server
for browseren og klient over for databaseserveren.

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

## 3. Node (~15 min)

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

## 4. Kør en fil (~10 min)

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

Og du skal have kørt `node hej.js`.

Skitsen af jeres system, HTTP i detaljer, og det at skrive serveren, tager vi i timen.

## Praktisk

- `node -v` og `npm -v` skal svare med et versionsnummer.
- Du skriver ikke serveren hjemmefra.
- Hav gruppens mockup-URL med. Skitsen tegner I i øvelsen.

