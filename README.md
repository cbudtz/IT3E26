# IT3E26 — 62580 Digitale Systemer & Anvendelse

Kursusmateriale til **62580 Digitale Systemer & Anvendelse**, 3. semester
sundhedsteknologi (diplomingeniør), DTU Ballerup — E26-udgaven af kurset,
der afløser 62581 IT og kommunikation.

- 13 uger med lektioner i **Web**, **Projekt**, **Projektarbejde** og **Net**
  (onsdag E5B og fredag E4B)
- Gruppeprojekt med kørende system + projektportefølje, afleveres over
  **3 delafleveringer** og forsvares ved individuel mundtlig eksamen
- Baggrund og planlægning: [docs/](docs/) — kursusbeskrivelser,
  [opdateringsplan](docs/E26UpdatePlan.md) og det gamle E22-materiale

## Lektionsplan (udkast)

| Lektion | Spor | Emner | E22-grundlag |
|---|---|---|---|
| 1 | **Web** | HTML-introduktion: dokumentstruktur og tags `<p>`, `<h>`, `<img>`, `<a>` | L1 |
| 2 | **Projekt** | Project Scope: problem, målgruppe, mål, afgrænsning og interessenter. Introduktion til projektplanlægning | nyt + F25 scope |
| 3 | **Web** | HTML II og CSS: dynamiske elementer, semantisk HTML, grundlæggende accessibility, styling og `<form>`-elementer | L3 (omarbejdet) |
| 4 | **Projekt** | Fra scope til projektplan: milepæle, work breakdown, arbejdspakker, opgaveansvar, tidsestimater og afhængigheder | F25 projektplan |
| 5 | **Web** | JavaScript-primer: sproget, events, simpel DOM-manipulation | L9 |
| 6 | **Projekt** | User Experience: brugerens behov, mål, situation og oplevelse som grundlag for projektets løsning | nyt (bygger på 62450) |
| 7 | **Web** | Client-side interaktivitet: DOM, events, fetch af API-data | L13 (omarbejdet) |
| 8 | **Projekt** | Prototyping og afprøvning: hvad skal prototypen undersøge, hvordan vurderes den, og hvordan omsættes læring til næste milepæl? | F25 prototype-materiale |
| 9 | **Web** | Dynamiske sider: Node.js-backend, HTTP requests/responses, API-test (Postman/curl) | L7 (omarbejdet) |
| 10 | **Projektarbejde** | Projektarbejde frem mod D1: scope statement, første projektplan og klikbar frontend-mockup | F25 aflevering 1 |
| **D1** | — | **Delaflevering 1: Forstudie og klikbar frontend-mockup** (projektcase afklares) | D1 |
| 11 | **Web** | Client-server-arkitektur: tynde vs. tykke klienter, lagdelte applikationer, HTTP på overordnet niveau. Sekvensdiagrammer for systemets vigtigste interaktioner | L9 |
| 12 | **Projekt** | Monitorering og styring: status, fremdrift, risiko, scope creep, opdatering af plan og næste iteration | F25 statusrapporter |
| 13 | **Web** | Application state: JSON-datastrukturer, sessions | L11 (omarbejdet) |
| 14 | Net | Hvad er internettet: internettet som netværk, netværksforståelse på overordnet niveau | L2 (forkortet) |
| 15 | **Web** | REST API'er i Node.js: ressourcer, routes, HTTP-metoder, JSON, CRUD og implementering af API'et i backend | nyt |
| 16 | Net | Centrale protokoller på overordnet niveau: HTTP, DNS og en web-forespørgsels vej gennem nettet | L6 + L18 |
| 17 | **Web** | Fullstack-integration: frontend, REST API og PostgreSQL. Dataflow, fejlhåndtering og test af den centrale brugerhandling | nyt |
| 18 | **Projektarbejde** | Projektarbejde frem mod D2: implementering af MVP, integration og løbende test | projektarbejde |
| **D2** | — | **Delaflevering 2: MVP** (frontend, backend/API, PostgreSQL, én central brugerhandling) | D2 |
| 19 | **Web** | Deployment: fra kode til kørende system (hosting, domæner). Fullstack-gennemgang af en flerlagsapplikation. Kursusevaluering | L5 + L23 (omarbejdet) |
| 20 | Net | IT-sikkerhed: netværkssikkerhed, kryptografi og TLS/HTTPS | L20 + L22 |
| 21 | **Web** | IT-sikkerhed: authentication | L19 |
| 22 | Net | Sikkerhed og privatliv i digitale systemer: trusselsmodel, angreb, GDPR og sundhedsdata | L4 + L20 (omarbejdet) |
| 23 | **Web** | Opsamling: web, programmering, udviklingsmetoder | L25 |
| 24 | — | — | — |
| 25 | **Projektarbejde** | Projektarbejde frem mod D3: færdiggørelse, deployment, dokumentation og forberedelse af portefølje | projektarbejde |
| 26 | Net | Opsamling: digitale systemer i helhed, eksamensforberedelse | L26 |
| **D3** | — | **Delaflevering 3: Fungerende system + authentication + portefølje** | D3 |
| — | — | **Eksamen: individuel mundtlig (portefølje + website forud godkendt)** | — |

### Fjernet ift. E22 (ikke i den nye kursusbeskrivelse)

- **Forsinkelser og tab** samt transport-/netværkslagsdybde (gammelt
  Kurose-spor)
- **Kryptering som selvstændig lektion** — HTTPS indgår nu i L20 som en del af
  protokol-overblikket
- **Netværkssikkerhed som separat lektion** — samlet i L22 (sikkerhed og
  privatliv)
- **Pakkeanalyse/netværksanalyse-værktøjer** (Wireshark, ping/traceroute) —
  var et 62581-læringsmål, ikke 62580
- **Protokol-møde** og serialiserings-begrebet — var knyttet til det gamle
  datamarshalling-mål
- **Linux/Bash og serveradministration** — allerede fjernet; deployment er
  nu hosting-orienteret (L19)

Projektstruktur og planlægning begynder i L2, efter at L1 har været en ren
HTML-introduktion. L2 fokuserer på scope: hvad prøver gruppen at løse, for
hvem, og hvad er ikke med? L4 omsætter scopet til en konkret projektplan med
milepæle og work breakdown. Projektlektionerne L2, L4, L6, L8 og L12 danner
derefter et forløb om scope, planlægning, brugeroplevelse, prototyping,
monitorering og status. Web-sporet bygger samtidig backend-delen op gennem
L9, L11, L13, L15 og L17, så D2 kan være et reelt fullstack-MVP. L10, L18 og
L25 er reserveret
til konkret projektarbejde. UML antages kendt fra 62420/62450 og
genundervises ikke. D1 er en klikbar frontend-mockup med
JavaScript uden backend. D2 er et MVP med frontend, backend/API, PostgreSQL
og én central brugerhandling. D3 udvider MVP'et til et fungerende system med
flere brugerflows, authentication, deployment og færdig portefølje.

> Udkast — lektionsemnerne er weblærerens forslag til at forene det gamle
> E22-materiale med de nye 62580-kursusmål. Omfordelingen af Net-sporet
> skal aftales med kursusansvarlig (Rolf Nordahl) og netværkssporets lærer; se
> beslutningsloggen i [opdateringsplanen](docs/E26UpdatePlan.md) (D10, D13).
