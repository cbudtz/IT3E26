# Lektion 7 — Client-side interaktivitet

Christian Budtz — [chbu@dtu.dk](mailto:chbu@dtu.dk)

---

## Program i dag

- Live demo: blodtryk og `classList`
- Opsamling: DOM fra Lektion 5
- Quiz: DOM
- Gennemgang: `fetch`
- Quiz: fetch
- Øvelse 1: Patientliste
- Øvelse 2: Login

Pauser lægges ind undervejs.

---

## Læringsmål i dag

Efter lektionen skal du kunne:

- læse et input, forgrene med `if` og sætte én CSS-klasse med `classList`
- hente JSON med `fetch` og `async`/`await`
- vise data i DOM'en
- sende login med `POST`

---

# Live demo — inputvalidering

---

## Blodtryk: feltet Øvre

Vi læser ét felt, forgrener med `if` og sætter én CSS-klasse.

<a href="/lektion7/dom-blodtryk.html" target="_blank" rel="noreferrer">Åbn DOM-demoen</a>

Prøv tomt felt, 89, 90, 139 og 140. Kun feltet **Øvre** ændrer farve.
