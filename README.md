# IT3E26 — 62580 Digitale Systemer & Anvendelse

Kursusmateriale til **62580 Digitale Systemer & Anvendelse**, 3. semester
sundhedsteknologi (diplomingeniør), DTU Ballerup — E26-udgaven af kurset,
der afløser 62581 IT og kommunikation.

- To spor: **Web** (onsdag E5B) og **Net** (fredag E4B), 13 uger
- Gruppeprojekt med kørende system + projektportefølje, afleveres over
  **3 delafleveringer** og forsvares ved individuel mundtlig eksamen
- Baggrund og planlægning: [docs/](docs/) — kursusbeskrivelser,
  [opdateringsplan](docs/E26UpdatePlan.md) og det gamle E22-materiale

## Lektionsplan (udkast)

| Lektion | Spor | Emner | E22-grundlag |
|---|---|---|---|
| 1 | **Web** | Introduktion til kurset og projektet. Dannelse af projektgrupper. Projektets scope: problem, målgruppe, mål, afgrænsning, interessenter og første prototypeidé. Kort introduktion til Project Scope Statement. HTML-introduktion (tags `<p>`, `<h>`, `<img>`, `<a>`) | L1 (udvidet) |
| 2 | Net | Fra idé til system: behov, koncept, design, implementering. Projektgrupperne lægges fast | nyt |
| 3 | **Web** | HTML II og CSS: dynamiske elementer, styling, `<form>`-elementer. Gruppe-repos og publicering af statiske sider (GitHub Pages) | L3 (omarbejdet) |
| 4 | Net | Hvad er internettet: internettet som netværk, netværksforståelse på overordnet niveau | L2 (forkortet) |
| 5 | **Web** | JavaScript-primer: sproget, events, simpel DOM-manipulation | L9 |
| 6 | Net | Centrale protokoller på overordnet niveau: HTTP, DNS — en web-forespørgsels vej gennem nettet | L6 + L18 |
| 7 | **Web** | Client-side interaktivitet: DOM, events, fetch af API-data | L13 (omarbejdet) |
| 8 | Net | Klient-server-kommunikation og dataudveksling: JSON, HTTPS | L8 + L22 |
| 9 | **Web** | Client-server-arkitektur: tynde vs. tykke klienter, lagdelte applikationer, HTTP på overordnet niveau. Sekvensdiagrammer for systemets vigtigste interaktioner | L9 |
| 10 | Net | Datahåndtering på overordnet niveau: dataflow i digitale systemer | nyt |
| **D1** | — | **Delaflevering 1: Forstudie og klikbar frontend-mockup** (projektcase afklares) | D1 |
| 11 | **Web** | Dynamiske sider: backend-intro, HTTP requests/responses, API-test (Postman/curl) | L7 (omarbejdet) |
| 12 | Net | Databaser i praksis: databaser bag et API | nyt |
| 13 | **Web** | Application state: JSON-datastrukturer, sessions | L11 (omarbejdet) |
| 14 | Net | Modellering og systembeskrivelse: UML på overordnet niveau | nyt (bygger på 62420/62450) |
| 15 | **Web** | Brugercentreret design: personas, scenarier, usability | nyt (bygger på 62450) |
| 16 | Net | Sikkerhed og privatliv: trusselsmodel, angreb, GDPR og sundhedsdata | L4 + L20 (omarbejdet) |
| 17 | **Web** | Accessibility (WCAG) og UI-polering; fortsat API-integration | nyt |
| 18 | Net | Analyse og beskrivelse af et digitalt system: komponenter og samspil | nyt |
| **D2** | — | **Delaflevering 2: MVP** (frontend, backend/API, PostgreSQL, én central brugerhandling) | D2 |
| 19 | **Web** | IT-sikkerhed: authentication og authorization | L19 |
| 20 | Net | Net-sporets planlagte indhold | afventer netplan |
| 21 | **Web** | IT-angreb: validering, forsvar mod XSS/SQL-injection | L21 |
| 22 | Net | Digitale værktøjer og platforme til opbygning af systemer | nyt |
| 23 | **Web** | Deployment: fra kode til kørende system (hosting, domæner). Fullstack-gennemgang af en flerlagsapplikation. Kursusevaluering | L5 + L23 (omarbejdet) |
| 24 | Net | Systemanalyse i praksis: analyse af et komplet digitalt system | nyt |
| 25 | **Web** | Opsamling: web, programmering, udviklingsmetoder | L25 |
| 26 | Net | Opsamling: digitale systemer i helhed, eksamensforberedelse | L26 |
| **D3** | — | **Delaflevering 3: Fungerende system + authentication + portefølje** | D3 |
| — | — | **Eksamen: individuel mundtlig (portefølje + website forud godkendt)** | — |

### Fjernet ift. E22 (ikke i den nye kursusbeskrivelse)

- **Forsinkelser og tab** samt transport-/netværkslagsdybde (gammelt
  Kurose-spor)
- **Kryptering som selvstændig lektion** — HTTPS indgår nu i L8 som en del af
  protokol-overblikket
- **Netværkssikkerhed som separat lektion** — samlet i L16 (sikkerhed og
  privatliv)
- **Pakkeanalyse/netværksanalyse-værktøjer** (Wireshark, ping/traceroute) —
  var et 62581-læringsmål, ikke 62580
- **Protokol-møde** og serialiserings-begrebet — var knyttet til det gamle
  datamarshalling-mål
- **Linux/Bash og serveradministration** — allerede fjernet; deployment er
  nu hosting-orienteret (L23)

Projektstruktur og planlægning er flyttet frem til L1 og L2, fordi det er en
forudsætning for projektarbejdet. L1 fokuserer på scope frem for en fuld
projektstyringslektion: hvad prøver gruppen at løse, for hvem, og hvad er ikke
med? Sekvensdiagrammer introduceres først, når client-server-arkitekturen
bliver relevant i L9. D1 er en klikbar frontend-mockup med
JavaScript uden backend. D2 er et MVP med frontend, backend/API, PostgreSQL
og én central brugerhandling. D3 udvider MVP'et til et fungerende system med
flere brugerflows, authentication, deployment og færdig portefølje.

> Udkast — lektionsemnerne er weblærerens forslag til at forene det gamle
> E22-materiale med de nye 62580-kursusmål. Omfordelingen af Net-sporet
> skal aftales med kursusansvarlig (Rolf Nordahl) og netværkssporets lærer; se
> beslutningsloggen i [opdateringsplanen](docs/E26UpdatePlan.md) (D10, D13).
