# examplesite

Underviser-hostet Express-API til Lektion 7: åben patientliste og login med MedCom-testpatienter. **Kun test/undervisning** — ikke produktion.

CORS er sat til `origin: '*'`, så kaldet kan komme fra `file://` og localhost.

## Lokal kørsel

1. Kopiér `.env.example` til `.env` og sæt `DATABASE_URL` til din Neon/Postgres-forbindelse.
2. Opret tabellen:

```bash
npm run db:push
```

3. Start serveren:

```bash
npm start
```

Serveren lytter på `http://localhost:3000` (eller `PORT`).

## Test

```bash
npm test
```

HTTP-tests springes over (exit 0) hvis `DATABASE_URL` mangler. Password-unit tests kører altid.

## API

### GET /api/patients

Åben liste med de fem patienter. Returnerer kun `cpr` og `navn`.

```bash
curl http://localhost:3000/api/patients
```

### POST /api/login

Body: `{ "cpr", "password" }`. CPR kan sendes med bindestreg eller mellemrum; password trimmes ikke.

```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d "{\"cpr\":\"2512489996\",\"password\":\"password\"}"
```

| Status | Body |
| --- | --- |
| 200 | `{ "cpr", "navn" }` |
| 400 | `{ "error": "cpr og password skal sendes" }` |
| 401 | `{ "error": "forkert cpr eller password" }` |
| 500 | `{ "error": "serverfejl" }` |

## Testpatienter (MedCom)

| CPR | Navn | Password |
| --- | --- | --- |
| `2512489996` | Nancy Ann Test Berggren | `password` |
| `2911829996` | Kirsten Test Berggren | `12345678` |
| `0107729995` | Max Test Berggren | `qwertyui` |
| `1509819996` | Brita Test Berggren | `p@ssw0rd` |
| `3103979995` | Anders Test Jensen | `password` |

Numrene er MedComs officielle test-CPR. Må **kun** bruges i test/undervisning.
