# Lektion 11 — Forberedelse

D1 er afleveret. Mockuppet er en klient: siden kører i browseren, og dataene
ligger i `localStorage`. Forberedelsen er to begrebstekster og en kort
skitse af jeres eget system. I timen samler vi begge dele op, før I skriver
en server.

Forberedelsen er ca. 55 minutter.

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

## 3. Jeres system (~15 min)

Brug de to tekster på gruppens mockup. Skriv det ned, så du kan have det
fremme i timen. En halv side er nok. Papir er fint.

1. Hvem er klienten i mockuppet i dag? Er den tynd eller tyk, og hvorfor?
2. Tag gruppens vigtigste brugerhandling. Navngiv de tre lag: hvad brugeren
   ser, hvilken beslutning applikationen skulle tage, og hvad der skulle
   gemmes. Databasen findes ikke endnu. Navngiv den alligevel.
3. Tegn et sekvensdiagram for den handling med livlinjerne bruger, browser,
   server og database. En udfyldt pil er et kald, der venter på svar. En
   stiplet pil tilbage er svaret.

Notation, hvis den er rusten: [Sequence diagram](https://sparxsystems.com/resources/tutorials/uml2/sequence-diagram.html), kun **Lifelines** og **Messages**. Netbank-eksemplet i den første artikel er den samme slags række.

## Når du er færdig

Du skal kunne forklare:

- at klienten anmoder, og serveren venter og svarer
- at det samme program kan være klient i ét kald og server i et andet
- forskellen på et lag og en tier, og hvad præsentation, applikation og data hver især er
- forskellen på en tynd og en tyk klient, og hvor jeres mockup sidder
- at `localStorage` ikke er en server og ikke er datalaget i et færdigt system

Og du skal have skitsen med: tynd eller tyk, de tre lag for jeres handling, og sekvensdiagrammet.

HTTP i detaljer, og det at skrive serveren, tager vi i timen.

## Praktisk

- Installer Node.js LTS, hvis du ikke har det: [https://nodejs.org](https://nodejs.org). Kør `node -v` i en terminal og tjek, at den svarer med et versionsnummer.
- Du skriver ikke serveren hjemmefra.
- Hav gruppens mockup-URL og skitsen med.
