# Prerequisite courses — 62420 & 62450

> Sources: https://kurser.dtu.dk/course/62420 (2025/26, last updated 18-08-2025)
> and https://kurser.dtu.dk/course/62450 (2025/26, last updated 13-02-2026).
> Both taught in **English**, course responsible **Daniel Zielasko**
> (danzi@dtu.dk), Dept. 62. Descriptions in Danish, kept verbatim.

## 62420 Informationsteknologi 1 (1st semester, 7.5 ECTS)

- **Schedule:** E1A (man 8–12) + E2B (tors 8–12, ~half the weeks)
- **Exam:** individual oral based on project; pass/fail, external censor;
  submitted project report must be approved to attend
- **Form:** samtaleforedrag, øvelser, projektbaserede opgaveafleveringer

### Overordnede kursusmål

At introducere den studerende til mikrodatamater og deres anvendelse til
modellering af specifikke problemer. I kurset fokuseres på modellering af
systemer bestående af sensorer, kontrollere og lignende komponenter.

### Kursusindhold

- **Programmering:** data-typer og -strukturer; variable og operatorer;
  selektion og iteration; klasser, objekter, attributter og metoder;
  tabeller/lister og filer; kommunikation med eksterne enheder (seriel port)
- **Systemudvikling:** introduktion til Unified Process
- **UML:** klassediagrammer, aktivitetsdiagrammer, sekvensdiagrammer
- **Grundlæggende:** computer hardware, digital repræsentation

### Notable

- Programming language is **not named** ("et program", serial-port sensors) —
  Java is out; most likely Python. Needs confirmation from course
  responsible before stack decisions.

## 62450 Informationsteknologi 2 (2nd semester, 5 ECTS)

- **Schedule:** F1A (man 8–12)
- **Exam:** individual oral; 7-step scale, external censor
- **Form:** forelæsninger, gruppeøvelser, projektopgave med løbende formativ
  feedback
- **Prerequisite:** 62420

### Overordnede kursusmål

Kurset giver den studerende færdigheder til at udvikle mindre IT-systemer
med flere parallelle opgaver, der opretter, anvender og ændrer data i en
database.

### Kursusindhold

- **Objektorienteret programmering:** indkapsling, arv, polymorfi,
  abstraktion; klassedesign og ansvarsfordeling; UML-klassediagrammer og
  objektrelationer; fejlhåndtering og undtagelser
- **Databaser:** relationelle databaser og grundlæggende databasedesign; SQL
  (CRUD, simple joins); databaseintegration i objektorienterede applikationer
- **Samtidighed:** tråde; kommunikation og synkronisering mellem tråde
- **Grafiske brugergrænseflader:** event-drevet programmering; adskillelse
  af UI-logik og applikationslogik
- **Brugercentreret design & evaluering:** usability og UX; brugercentreret
  designproces; evalueringsmetoder

## Consequences for 62580 (web track)

Students arrive at 3rd semester already knowing:

| 62580 learning goal | Incoming level (from 62420/62450) |
|---|---|
| User-centered design (personas, scenarios, usability) | Basic UCD process + evaluation methods — **reinforce in web context** |
| Databases & data management | SQL CRUD + joins, DB integration in OO apps — **add web/API dataflow** |
| UML modelling | Class/activity/sequence diagrams — **reuse, apply to system description** |
| Programming | OOP incl. exceptions, threads, event-driven GUIs — JS/DOM events map naturally |
| Client-server, HTTP, HTML/CSS/JS, JSON, web auth, deployment | **Genuinely new** — the core of the web track |
