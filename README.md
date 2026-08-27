# IT3E26 — 62580 Digitale Systemer & Anvendelse

Velkommen til **62580 Digitale Systemer & Anvendelse**, 3. semester
sundhedsteknologi, DTU Ballerup — E26.

Kurset bygger på de foregående IT kurser og fortsætter hvor de slap. Nu arbejder vi med systemer hele vejen fra brugergrænsefladen til servere og databaser.

Kurset består af fullstack web-udvikling, projektudvikling og netværkværksteknologi

- Projekt og UX undervises af Rolf Nordahl (kursusansvarlig).
- Netværksteknologi af Birger Andersen.
- Christian Budtz står for web-udvikling.

**Gruppeprojektet** afleveres i tre trin i form af **3 Delafleveringer** og skal — sammen med website og portefølje — **være godkendt for at man kan deltage i den individuelle mundtlige eksamen:**

- **D1** — forstudie og klikbar frontend-mockup (uden backend)
- **D2** — MVP med frontend, backend/API, PostgreSQL og én central brugerhandling
- **D3** — fungerende system med authentication, deployment og færdig portefølje

**Det forventes, at du har ++forberedt dig til hver undervisningsgang.**++ Hvad du
skal lave, står under *Forberedelse* på den enkelte lektion.

Vi glæder os til at se jer!

## Lektionsplan


| Lektion        | Spor               | Emner                                                                                                                                                                                                                                |
| -------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1              | **Web**            | [HTML-introduktion: dokumentstruktur og tags](lektion1/Readme.md) `<p>`[,](lektion1/Readme.md) `<h>`[,](lektion1/Readme.md) `<img>`[,](lektion1/Readme.md) `<a>`. Introduktion til projektemner og afklaring (omfang – patientfokus) |
| 2              | **Projekt**        | Project Scope: problem, målgruppe, mål, afgrænsning og interessenter. Introduktion til projektplanlægning. GDPR-intro. Gruppedannelse og valg af projekt                                                                             |
| 3              | **Web**            | HTML II og CSS: dynamiske elementer, semantisk HTML, grundlæggende accessibility, styling og `<form>`-elementer                                                                                                                      |
| 4              | **Projekt**        | Fra scope til projektplan: milepæle, work breakdown, arbejdspakker, opgaveansvar, tidsestimater og afhængigheder                                                                                                                     |
| 5              | **Web**            | JavaScript-primer: sproget, events, simpel DOM-manipulation                                                                                                                                                                          |
| 6              | **Projekt**        | User Experience: brugerens behov, mål, situation og oplevelse som grundlag for projektets løsning                                                                                                                                    |
| 7              | **Web**            | Client-side interaktivitet: DOM, events, fetch af API-data                                                                                                                                                                           |
| 8              | **Projekt**        | Prototyping og afprøvning: hvad skal prototypen undersøge, hvordan vurderes den, og hvordan omsættes læring til næste milepæl?                                                                                                       |
| 9              | **Web**            | Dynamiske sider: Node.js-backend, HTTP requests/responses, API-test (Postman/curl)                                                                                                                                                   |
| 10             | **Projektarbejde** | Projektarbejde frem mod D1: scope statement, første projektplan og klikbar frontend-mockup                                                                                                                                           |
| **D1** (tirs.) | —                  | **Delaflevering 1: Forstudie og klikbar frontend-mockup** (projektcase afklares)                                                                                                                                                     |
| 11             | **Web**            | Client-server-arkitektur: tynde vs. tykke klienter, lagdelte applikationer, HTTP på overordnet niveau. Sekvensdiagrammer for systemets vigtigste interaktioner                                                                       |
| 12             | **Projekt**        | Monitorering og styring: status, fremdrift, risiko, scope creep, opdatering af plan og næste iteration                                                                                                                               |
| 13             | **Web**            | Application state: JSON-datastrukturer og SQL-primer                                                                                                                                                                                 |
| 14             | Net                | Hvad er internettet: internettet som netværk, netværksforståelse på overordnet niveau, protokolstakken, intro til HTTP                                                                                                               |
| 15             | **Web**            | REST API'er i Node.js: ressourcer, routes, HTTP-metoder, JSON, CRUD og implementering af API'et i backend                                                                                                                            |
| 16             | Net                | Centrale protokoller på overordnet niveau: HTTP, XML (HL7), DNS og en web-forespørgsels vej gennem nettet                                                                                                                            |
| 17             | **Web**            | Fullstack-integration: frontend, REST API og PostgreSQL. Dataflow, fejlhåndtering og test af den centrale brugerhandling                                                                                                             |
| 18             | **Projektarbejde** | Projektarbejde frem mod D2: implementering af MVP, integration og løbende test                                                                                                                                                       |
| **D2** (tirs.) | —                  | **Delaflevering 2: MVP** (frontend, backend/API, PostgreSQL, én central brugerhandling)                                                                                                                                              |
| 19             | **Web**            | Deployment: fra kode til kørende system (hosting, domæner). Fullstack-gennemgang af en flerlagsapplikation. Kursusevaluering                                                                                                         |
| 20             | Net                | IT-sikkerhed: netværkssikkerhed, kryptografi og TLS/HTTPS                                                                                                                                                                            |
| 21             | **Web**            | IT-sikkerhed: authentication, sessions                                                                                                                                                                                               |
| 22             | Net                | Sikkerhed og privatliv i digitale systemer: trusselsmodel, angreb, firewall, GDPR og sundhedsdata. VPN og virtuelle netværk                                                                                                          |
| 23             | **Web**            | Opsamling: web, programmering, udviklingsmetoder                                                                                                                                                                                     |
| 24             | Net                | Meddeles senere                                                                                                                                                                                                                      |
| 25             | **Projektarbejde** | Projektarbejde frem mod D3: færdiggørelse, deployment, dokumentation og forberedelse af portefølje                                                                                                                                   |
| 26             | Net                | Opsamling: digitale systemer i helhed, eksamensforberedelse                                                                                                                                                                          |
| **D3** (tirs.) | —                  | **Delaflevering 3: Fungerende system + authentication + portefølje**                                                                                                                                                                 |
| —              | —                  | **Eksamen: individuel mundtlig (portefølje + website forud godkendt)**                                                                                                                                                               |


Projektstruktur og planlægning begynder i L2, efter at L1 har været en ren
HTML-introduktion. L2 fokuserer på scope: hvad prøver gruppen at løse, for
hvem, og hvad er ikke med? L4 omsætter scopet til en konkret projektplan med
milepæle og work breakdown. Projektlektionerne L2, L4, L6, L8 og L12 danner
derefter et forløb om scope, planlægning, brugeroplevelse, prototyping,
monitorering og status. Web-sporet bygger samtidig backend-delen op gennem
L9, L11, L13, L15 og L17, så D2 kan være et reelt fullstack-MVP. L10, L18 og
L25 er reserveret til konkret projektarbejde. UML antages kendt fra 1.–2.
semester (62420/62450) og genundervises ikke. D1 er en klikbar
frontend-mockup med JavaScript uden backend. D2 er et MVP med frontend,
backend/API, PostgreSQL og én central brugerhandling. D3 udvider MVP'et til
et fungerende system med flere brugerflows, authentication, deployment og
færdig portefølje.