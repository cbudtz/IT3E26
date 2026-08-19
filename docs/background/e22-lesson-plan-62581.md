# E22 Lektionsplan — 62581 IT og kommunikation

> Source: Google Sheets "Ikke gældende - under revision! E22 Lektionsplan 62581"
> (https://docs.google.com/spreadsheets/d/1kfsmW0XuC7GLUPjza2c1VSEbI2x4PEPSll6KObkmLuM)
> in the [E22 Drive folder](https://drive.google.com/drive/folders/1qZ0IESfW2jFlFGfR5Igs1LZxHWu5rJUK).
> Sheet title itself warns: *"Ikke gældende - under revision!"* ("Not valid — under revision!").
> Dates below are from autumn 2022 (E22). "KR x.y" = chapter references in
> Kurose & Ross, *Computer Networking — A Top-Down Approach*.

The course alternates two weekly tracks: **Web** (Wed, E5B) and **Netværk**
(Fri, E4B). Note: Delaflevering (milestone) dates say 2021 in the original
sheet — likely a leftover from F21.

| Lektion | Emner | Dato | Forberedelse |
|---|---|---|---|
| 1 | **Introduktion.** Web: HTML-introduktion (tags `<p>`, `<h>`, `<img>`, `<a>`). Udviklingsmetoder: Milestone-diagrammer og Gantt-diagrammer. Sekvensdiagrammer. Robustness diagrams. | 01/09/2022 | Forberedelse |
| 2 | Netværk: Introduktion til Internettet I. Hvad er internettet. Internettet som netværk. | 02/09/2022 | Forberedelse |
| 3 | Web: HTML II og CSS. Dynamiske elementer. Styling. `<ul>`, `<li>`, `<input>`, `<form>`, `<button>`. Gruppedannelse færdig — oprettelse af grupperservere | 08/09/2022 | Forberedelse |
| 4 | Netværk: Introduktion til Internettet II. Forsinkelser og tab. Protokoller. Angreb. | 09/09/2022 | Forberedelse |
| 5 | Web: Webservere (Tomcat) og serveradministration. Linux og Bash. | 15/09/2022 | Forberedelse |
| 6 | Netværk: Applikationslaget I. | 16/09/2022 | Forberedelse |
| 7 | Web: Dynamiske sider I. Socketprogrammering. Backend med Java. HttpServlets. HTTP requests. HTTP headers. Postman. | 22/09/2022 | Forberedelse |
| 8 | Netværk: Transportlaget I. | 23/09/2022 | Forberedelse |
| 9 | NB 8–15! Web: Client-Server-arkitektur — tynde vs. tykke klienter. Lagdelte applikationer. Tilstandsdiagrammer. JavaScript primer. | 29/09/2022 | Forberedelse |
| 10 | Netværk: Transportlaget II. | 30/09/2022 | Forberedelse |
| **Delaflevering 1** | **Forstudie og prototype/mockup af journalsystem** | 03/10 | Oplæg |
| 11 | Web: Application-state. Serialisering. Dataprotokoller. | 06/10/2022 | Forberedelse |
| 12 | Netværk: Transportlaget III, Netværkslaget I — Datadelen I. | 07/10/2022 | Forberedelse |
| 13 | Web: Client-side interaktivitet. Mere JavaScript. REST-API'er med Java. | 13/10/2022 | Forberedelse |
| 14 | Netværk: Netværkslaget II — Datadelen II. | 14/10/2022 | KR 4.3 |
| — | Efterårsferie | 20/10 | — |
| 15 | Netværk: Netværkslaget III — Kontrol delen. | 27/10/2022 | KR 5.1–5.4 |
| 16 | Netværk: Linklaget I. Intro, fejl, multiple access links. | 28/10/2022 | KR 6.1–6.3 |
| 17 | Web: Mere API'er og JavaScript. | 03/11/2022 | Forberedelse |
| 18 | Netværk: Linklaget II. Adressering på linklaget. En web-forespørgsels vej gennem internettet. | 04/11/2022 | KR 6.4 & 6.7 |
| **Delaflevering 2** | **Minimalt fungerende system** | 10/11 | Oplæg |
| 19 | Web: IT-sikkerhed. Access control — authentication og authorization. | 10/11/2022 | Forberedelse |
| 20 | Netværk: Sikkerhed. Kryptografi. | 11/11/2022 | KR 8.1–8.4 |
| 21 | Web: IT-angreb part 2. Protokol-møde. | 17/11/2022 | Forberedelse |
| 22 | Netværk: Sikkerhed. Email-kryptering. SSL/TLS. Gæsteforelæsning fra K-net (ISP for DTU-kollegierne). | 18/11/2022 | KR 8.5–8.8 |
| 23 | Fullstack: Gennemgang af en flerlagsapplikation. Kursusevaluering. Projektarbejde. | 24/11/2022 | Ingen forberedelse |
| 24 | Netværk: Trådløse netværk. | 25/11/2022 | KR 7.1–7.3 |
| 25 | Web/Programmering/Udviklingsmetoder: Opsamling. | 01/12/2022 | N/A |
| 26 | Netværk: Opsamling. | 02/12/2022 | N/A |
| **Delaflevering 3** | **System med minimal sikkerhed** | 03/12 | Oplæg |
| **Eksamen** | | 09/12 | Eksamensspørgsmål |

## Semester project (E22)

Running case: a **journalsystem** (electronic health record system) built up
over three milestones:

1. **Delaflevering 1** — forstudie (pre-study) + prototype/mockup
2. **Delaflevering 2** — minimalt fungerende system (minimal working system)
3. **Delaflevering 3** — system med minimal sikkerhed (with authentication etc.)

## Tech stack used in E22

- Frontend: HTML, CSS, client-side JavaScript
- Backend: Java, HttpServlets on Apache Tomcat; socket programming; REST APIs
- Tools: Postman, Linux/Bash server administration
- Modelling: UML (sequence, state), robustness diagrams; Gantt/milestone planning
