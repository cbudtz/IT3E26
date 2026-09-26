# Lektion 9 — Øvelser

Man lærer tilstand bedst ved at prøve selv. Dette ark samler dagens fire
øvelser med den uddybning, der ikke kan være på slidesne.

Hvis du ikke nåede [forberedelsen](forberedelse.md), så start der — eller gør
det parallelt med Øvelse 1.

| Øvelse | Hvornår | Tid |
|---|---|---|
| **1** Gem listen | Efter forberedelses-quizzen | ~15 min |
| **2** Patientlisten følger data | Efter tilstands-quizzen | ~35 min |
| **3** URL til mockuppet | Efter Vercel-gennemgangen | ~25 min |
| **4** Videre på D1 | Efter øvelse 3 | ~45 min |

AI er tilladt, men du skal kunne forklare hver linje, du skriver. En løsning,
du ikke kan gennemgå, tæller ikke.

---

## Øvelse 1 — Gem listen

**Mål:** Patientlisten ligger som tekst i `localStorage` og kan læses igen
efter et refresh. Tabellen tegner I stadig som i Lektion 7.

Arbejd videre i `patienter.html` / `patienter.js` fra Lektion 7. I har
**ingen egen backend**. I kalder stadig underviser-API'et:

```
GET https://it3e26.vercel.app/api/patients
```

### Det skal du lave

1. Når `hentPatienter` har listen, gem den med
   `localStorage.setItem("patienter", JSON.stringify(...))`.
2. Når scriptet starter: læs nøglen. Hvis `getItem` ikke giver `null`,
   parse og `console.log` listen.
3. Rør ikke løkken, der tegner rækkerne. Den flytter vi i øvelse 2.

### Tjekliste

- [ ] **Application** → **Local Storage**: nøglen `patienter` er en streng,
      der starter med `[`.
- [ ] Refresh med **Network** → **Offline** skriver stadig patienterne i
      konsollen.
- [ ] Password vises ikke og gemmes ikke.

**Øvelsen er i hus**, når et refresh uden netværk logger CPR og navn fra
lageret.

### Hvis du sidder fast

- Konsollen er tom efter refresh: kalder du `setItem` med `JSON.stringify`,
  og læser du med `JSON.parse`?
- `JSON.parse` kaster: tjek for `null` fra `getItem`, før du parser.
- Nøglen findes ikke: gem først efter et vellykket `fetch`, mens netværket
  er slået til.
- Bed en sidekammerat eller underviseren om at kigge med. Vis koden, ikke
  bare fejlen.

### Hvis du har ekstra tid

- Kald `removeItem("patienter")`, genindlæs, og se at `getItem` giver
  `null`.

---

## Øvelse 2 — Patientlisten følger data

**Mål:** Patienttabellen tegnes fra en variabel. Når listen skiftes, tegnes
tabellen igen, og listen overlever et refresh.

Arbejd videre i samme filer. Linjerne fra øvelse 1 flytter ind i setteren.
`console.log` udgår, når tabellen tegner.

### Det skal du lave

1. Behold variablen `let patienter = []`.
2. Flyt løkken fra Lektion 7 over i `renderTabel`. Den tømmer `tbody` og
   lægger én række pr. patient. Brug `textContent`.
3. Skriv `setPatienter(next)`. Den sætter `patienter = next`, gemmer med
   `JSON.stringify` under nøglen `"patienter"` og kalder `renderTabel`.
4. `hentPatienter` tjekker `res.ok`, læser JSON og kalder `setPatienter`.
   Den tegner ikke rækker selv.
5. Når scriptet starter: hvis `localStorage` har en liste, kald
   `setPatienter(JSON.parse(...))` før `fetch`. Bagefter henter I den friske
   liste fra API'et.

### Tjekliste

- [ ] Tabellen har stadig `thead` med CPR og Navn, og én række pr. patient.
- [ ] `fetch` kalder `setPatienter` og rører ikke `tbody`.
- [ ] Password vises ikke og gemmes ikke.
- [ ] Efter et vellykket kald ligger listen under `localStorage` → `patienter`.
- [ ] Refresh viser rækkerne, også hvis du slår netværket fra i DevTools
      bagefter (listen kommer fra lageret).

### Tjek med DevTools

Åbn **Application** → **Local Storage** → din origin. Efter kaldet skal
nøglen `patienter` være en JSON-array.

Slå **Network** → **Offline**, og genindlæs. Tabellen skal stadig vise de
gemte patienter. Slå netværket til igen og genindlæs: `fetch` opdaterer
listen.

**Øvelsen er i hus**, når et refresh uden netværk stadig viser CPR og navn
i tabellen, og et kald med netværk opdaterer samme tabel via `setPatienter`.

### Hvis du sidder fast

- Tabellen er tom efter `fetch`: kalder `setPatienter` `renderTabel`?
- Refresh glemmer listen: kalder du `setItem` med `JSON.stringify`, og læser
  du med `JSON.parse` ved opstart?
- `JSON.parse` kaster: gem kun strengen fra `JSON.stringify`, og tjek for
  `null` fra `getItem` før du parser.
- Rækkerne fordobles: tøm `tbody` i starten af `renderTabel`.
- Bed en sidekammerat eller underviseren om at kigge med. Vis koden, ikke
  bare fejlen.

### Hvis du har ekstra tid

- Skriv antallet af patienter i `#status` fra `renderTabel`, så teksten
  følger med, når listen skifter.

---

## Øvelse 3 — URL til mockuppet

**Mål:** Gruppens mockup kan åbnes på en `https://….vercel.app`-adresse.
Det er den adresse, I afleverer til D1.

Arbejd i **gruppens GitHub-repository**. HTML, CSS og JavaScript skal være
committet og pushet. Én i gruppen ejer Vercel-projektet og inviterer resten
under **Settings → Members** (eller deler URL'en, så de andre kan se siden).

Billederne er fra et eksempel-repository. I vælger **gruppens** repository,
ikke det, der står på billedet.

Kontoen er oprettet i forberedelsen. Start ved **Import**.

### Mangler kontoen

1. Åbn [https://vercel.com](https://vercel.com) og vælg **Sign Up**.

   ![Vercels forside med Log In og Sign Up](screenshots/01-log-ind.png)

2. Vælg **Continue with GitHub**.

   ![Opret konto: Continue with GitHub](screenshots/02-continue-with-github.png)

3. Godkend at Vercel må bruge jeres GitHub-konto: **Authorize**.

   ![GitHub spørger om I vil godkende Vercel](screenshots/03-authorize.png)

### Det skal I nå

1. Log ind på [https://vercel.com](https://vercel.com). På **Deploy your
   first project** — **Import** ud for **Import Project**.

   ![Import Project, ikke Agent eller Domain](screenshots/04-import-project.png)

2. Vælg **GitHub**.

   ![Vælg GitHub som Git-udbyder](screenshots/05-vaelg-github.png)

3. Hvis listen er tom, står der **Install**. Tryk den.

   ![Install, så Vercel kan se jeres GitHub-repositories](screenshots/06-install.png)

4. Vælg bare **All repositories**. I kan også vælge det specifikke projekt.
   Scroll ned og afslut installationen.

   ![Install Vercel: vælg hvilke repositories den må se](screenshots/07-vaelg-repositories.png)

5. Find gruppens repository, og tryk **Import** på den række.

   ![Listen af repositories med Import på hver række](screenshots/08-import-repo.png)

6. På **New Project**:
   - **Application Preset** skal være **Other**. I udfylder ikke en
     build-kommando.
   - **Root Directory** er `./`, når `index.html` ligger i repo-roden.
     Ellers tryk **Edit** og vælg mappen med `index.html`.
   - Fold ikke **Environment Variables** ud. I har ingen server.
   - Tryk **Deploy**. Hobby-planen er den gratis.

   ![New Project med preset Other og Deploy](screenshots/09-new-project.png)

7. **Congratulations** betyder, at siden er oppe. Forhåndsvisningen er
   jeres mockup. Ignorér boksen **Install Coding Agent Plugin**, og kør
   ikke kommandoen deri. URL'en ender på `.vercel.app`. Åbn den i et
   vindue, hvor I ikke er logget ind på Vercel.

   ![Congratulations med forhåndsvisning af den deployede side](screenshots/10-congratulations.png)

8. Lav en lille synlig ændring, commit, push, og genindlæs URL'en når
   deployet er færdigt. Ændringen skal være på den offentlige side.

I deployer ikke en server. `fetch` mod underviser-API'et må gerne blive i
mockuppet. Kaldet skal gå til `https://it3e26.vercel.app`, ikke til en fil
på jeres computer.

### Tjekliste

- [ ] URL'en åbner mockuppet og ikke en Vercel-404.
- [ ] CSS og JavaScript indlæses (Network i DevTools på den offentlige URL).
- [ ] Et nyt push ændrer den offentlige side.
- [ ] Repositoryet indeholder ikke passwords eller rigtige persondata.

### Tjek resultatet

Send URL'en til en anden i gruppen, som ikke kører siden lokalt. De skal
kunne åbne mockuppet.

**Øvelsen er i hus**, når den offentlige URL viser mockuppet, og I kan
pege på det commit, siden er bygget fra.

### Hvis I sidder fast

- 404: Root Directory er forkert, eller `index.html` er ikke pushet.
- Siden er gammel: se i Vercel under **Deployments**, om det seneste push
  er **Ready**, og om produktion peger på den branch, I pusher til.
- `fetch` fejler kun på URL'en: tjek at adressen er
  `https://it3e26.vercel.app/api/patients` og ikke en relativ sti til en
  fil, der kun findes på din computer.
- Bed underviseren om at kigge med på Deployment-loggen, ikke kun på
  fejlteksten i browseren.

---

## Øvelse 4 — Videre på D1

**Mål:** Den offentlige URL åbner en skærm i gruppens mockup, hvor data
overlever et refresh. Resten af tiden bruges på den klikbare sti, I vil
aflevere.

D1 er forstudie og klikbar frontend-mockup med URL. Ingen egen backend.

### Det skal I nå

1. Læg patientlisten fra øvelse 2 ind på en side, URL'en faktisk åbner
   (`index.html` eller den første skærm i mockuppet). Samme setter:
   `setPatienter` gemmer, skriver til `localStorage` og kalder `renderTabel`.
2. Commit, push, og vent til deployet er **Ready**. Åbn URL'en et sted, hvor
   siden ikke kører lokalt. Slå netværket fra og genindlæs: CPR og navn er
   der stadig.
3. Skriv URL'en øverst i gruppens README.
4. Brug resten af tiden på stien, I vil vise til D1: de skærme, mockuppet
   allerede har. Hold password ude af `localStorage` og ude af Git.

### Tjekliste

- [ ] URL'en åbner mockuppet, og patientlisten ligger på den sti.
- [ ] Refresh uden netværk på den offentlige URL viser stadig CPR og navn.
- [ ] README har URL'en.
- [ ] Repositoryet indeholder ikke passwords eller rigtige persondata.

**Øvelsen er i hus**, når underviser kan åbne URL'en, refreshe og stadig se
data, og gruppen kan klikke den sti, I vil aflevere.

### Hvis I sidder fast

- URL'en viser en anden side end den, I lige har rettet: er filen committet
  og pushet, og er deployet **Ready**?
- Listen forsvinder på URL'en, men ikke lokalt: `setPatienter` skal køre i
  det script, den offentlige side henter.
- Bed underviseren om at kigge med på URL'en, ikke kun på jeres lokale fil.

### Hvis I har ekstra tid

- Lad `#status` på mockup-siden følge med, når listen skifter, som i
  øvelse 2.
