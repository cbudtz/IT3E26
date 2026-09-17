# Underviser-API — Lektion 7

Live base-URL:

**https://it3e26.vercel.app**

Eksempel-login (ingen session — kun `fetch` + vis/skjul fejl + redirect):
[https://it3e26.vercel.app/login.html](https://it3e26.vercel.app/login.html)

API'et er åbent fra browseren (`file://` og localhost) — CORS tillader
`origin: '*'`. I har **ingen egen backend** i dag; I kalder kun dette API
med `fetch`.

Numrene er [MedComs officielle test-CPR](https://medcom.dk/standarder/tabeller/nationale-test-cpr-numre/).
De må **kun** bruges i test og undervisning — ikke i produktion.

## GET `/api/patients`

Åben liste. Ingen login. Svaret er JSON med `cpr` og `navn` — aldrig
password.

```
GET https://it3e26.vercel.app/api/patients
```

Eksempel:

```json
[
  { "cpr": "2512489996", "navn": "Nancy Ann Test Berggren" },
  { "cpr": "2911829996", "navn": "Kirsten Test Berggren" },
  { "cpr": "0107729995", "navn": "Max Test Berggren" },
  { "cpr": "1509819996", "navn": "Brita Test Berggren" },
  { "cpr": "3103979995", "navn": "Anders Test Jensen" }
]
```

I JavaScript:

```js
const res = await fetch("https://it3e26.vercel.app/api/patients");
if (!res.ok) {
  throw new Error("Kunne ikke hente patienter");
}
const patienter = await res.json();
```

## POST `/api/login`

Body skal være JSON: `{ "cpr", "password" }`.
Sæt headeren `Content-Type: application/json`.

CPR kan skrives med eller uden bindestreg (`251248-9996` virker).
Password sendes som det er (ingen trim).

```
POST https://it3e26.vercel.app/api/login
```

```js
const res = await fetch("https://it3e26.vercel.app/api/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ cpr: "2512489996", password: "password" })
});
const data = await res.json();
```

| Status | Hvornår | Body |
| --- | --- | --- |
| 200 | Rigtig CPR + kode | `{ "cpr", "navn" }` |
| 400 | `cpr` eller `password` mangler | `{ "error": "cpr og password skal sendes" }` |
| 401 | Forkert kombination | `{ "error": "forkert cpr eller password" }` |
| 500 | Serverfejl | `{ "error": "serverfejl" }` |

Tjek `res.ok` (status 200–299). Ved 400/401 ligger beskeden i `data.error`.

## Testpatienter

| CPR | Navn | Password |
| --- | --- | --- |
| `2512489996` | Nancy Ann Test Berggren | `password` |
| `2911829996` | Kirsten Test Berggren | `12345678` |
| `0107729995` | Max Test Berggren | `qwertyui` |
| `1509819996` | Brita Test Berggren | `p@ssw0rd` |
| `3103979995` | Anders Test Jensen | `password` |

Der er ingen tokens og ingen roller. Et 200-svar betyder, at kombinationen
er gyldig — I viser det i DOM'en, I gemmer det ikke som session.
