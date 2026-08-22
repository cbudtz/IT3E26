# E22 62581 Øvelser - Lektion 01

Source: Google Docs,
https://docs.google.com/document/d/1p5E4HrDzWy1eOASW-pinKAiEJxcVjau4kUVrOuiPXbw

---

Øvelser - Lektion 01

1 Distribuerede systemer
2 HTML intro
3 Lav en login-side til dit nye Journal-system (EHR system)
4 Sekvensdiagram
5 Introduktion til semesterprojekt

## 1 Distribuerede systemer

Diskutér med sidepersonen:
1. Er du stødt på en Bohr-bug?
   1. Beskriv den.
   2. Hvorfor var det en Bohr-Bug?
2. Er du stødt på en Heisen-bug?
   1. Beskriv den
   2. Hvorfor var det en Heisen-Bug?
3. Hvad kan gå galt i et distribueret system, som ikke går galt i et 'en computer system'?
4. Hvad er en "leader-election" algoritme?
   1. Hvorfor er det vigtigt i decentraliserede systemer?

## 2 HTML intro

Har du ikke allerede set på [Responsive Web Design Certification](https://www.freecodecamp.org/learn/responsive-web-design/#basic-html-and-html5) frem til 'Link to Internal Sections' - bliver du måske nødt til at gøre det undervejs.

Lav din første hjemmeside:
1. Start med File->new Project->Web
2. Lav en index.html fil:
3. Indsæt
   1. En overskrift (`<h1>`, `<h2>` eller hvad du nu synes)
   2. En brødtekst i en paragraph
   3. Et billede fra en lokal fil - læg en billed-fil i projektet
   4. Et billede med en ekstern url - eks: https://www.publicdomainpictures.net/pictures/90000/velka/kitties.jpg
   5. Et tekst-link til en side
   6. Gør et af billederne til et link…
   7. Juster højden af billederne med attributten: `height="100px"`
   8. Til inspiration:
   9. Hvis du ikke kan få det til at lykkes - så kig lidt på ugens eksempel: https://github.com/cbudtz/IT3_E21_01a

## 3 Lav en login-side til dit nye Journal-system (EHR system)

Eksperimenter med `<input>` elementerne og `<button>`
1. Se https://www.w3schools.com/html/html_form_input_types.asp
2. Prøv at lave en login.html side
3. Til inspiration:
4. Har du ekstra tid er du velkommen til at eksperimentere

## 4 Sekvensdiagram

Lav et sekvensdiagram, der beskriver hvordan du regner med at login-flowet skal være i EHR systemet.

## 5 Introduktion til semesterprojekt

Hvis Du har ekstra tid, så kig på semesterprojektet og få et overblik.

### Oplæg

Region Hovedstaden har besluttet sig for at sende et EHR system i udbud. Denne gang vil de starte småt og kun udvikle grund-funktionaliteten til at starte med og kun til deres ambulatorier. Indtil videre har de beslutte at de vil have:

"Et system der tillader sygehuspersonale at oprette konsultationer til patienterne. Konsultationerne har et starttidspunkt og en varighed og et tilknyttet notat. Det skal være muligt at hente aftaler og notater fra et eksternt system (De andre grupper) via udveksling med en fælles standard (Den skal I definere grupperne imellem!) i XML format.

Der ønskes senere udviklet en mulighed for at gemme laboratorie-data knyttet til patienterne (Semesterprojekt 3)

Systemet skal være webbaseret og køre på en udleveret server (opsat af jer). Serveren er en virtualiseret linux (ubuntu) server.
Det er op til projektgruppen at yderligere afdække muligheder og behov. Da plejepersonalet imidlertid er presset på grund af sparekrav, m.m. er det nødvendigt at projektgrupperne foretager denne informationsindsamling uden kontakt til sygehusenes personale.

Til den første delaflevering skal laves en analyse af Regionens vision og en Mockup af de væsentligste skærmbilleder i systemet, således at systemets Use Cases kan verificeres med brugerne.
Systemet skal selvfølgelig dokumenteres som vanligt. Det forventes bla. at der afleveres en milestone-plan, en liste over delopgaver og en risikoanalyse.
Det forventes at der udvikles og afleveres diagrammer og beskrivelse af den centrale Use Case i systemet samt afleveres et link til en hjemmeside - eller en zip fil med html filer der, der demonstrerer Use Casen's brugergrænseflader.
Systemet skal IKKE implementeres med en backend eller database før delaflevering 2. Der skal desuden afleveres et link til den relaterede kode på github.

Hvis noget er uklart kan I stille spørgsmål via
mail: chbu@dtu.dk eller
discord: https://discord.gg/5tJtCBYxdC

### Del 2

Som del 1, men nu med backend. Der skal designes og programmeres et api og eventuelt en database, således at data kan persisteres i systemet. Der skal afleveres relevante diagrammer og projektrapport. Det forventes at systemet er sat i drift på Jeres DTU-cloud vm.

### Del 3

Samme omfang og scope som Del 1 og 2, men nu med minimalt fungerende sikkerhed.
