Projektstruktur og planlægning begynder i L2, efter at L1 har været en ren
HTML-introduktion. L2 fokuserer på scope: hvad prøver gruppen at løse, for
hvem, og hvad er ikke med? L4 omsætter scopet til en konkret projektplan med
milepæle og work breakdown. Projektlektionerne L2, L4, L6, L8 og L12 danner
derefter et forløb om scope, planlægning, brugeroplevelse, prototyping,
monitorering og status. L9 er klient-tilstand og en statisk Vercel-URL, så
D1 kan afleveres som en klikbar prototype uden backend. L10 er
projektarbejde mod D1; L11 kommer dagen efter afleveringen. Mockuppet er
en tyk klient: præsentation, logik og `localStorage` ligger i browseren.
Forberedelsen er client-server, tre lag, sekvensdiagram-notation og Node
(`node hej.js`, ikke serverkode hjemmefra). I timen opsamles det, og I
skriver `server.js` med `GET /api/patients`, JSON på `localhost:3000` og
404 på resten — uden Express og uden database. Patienttabellen fra L7
peges om på jeres egen proces. Først derefter modellerer I interaktionen:
sekvensdiagram af det kald, der lige kørte, hvor de tre lag sidder i den
kode, og at siden skal åbnes lokalt, fordi Vercel ikke kan nå den
bærbare.
L13 lægger Express oven på samme fil. L15 er SQL
i `psql`: én patienttabel, uden Express. L17 lægger et repository imellem
de samme routes og tabellen, og kører den centrale brugerhandling, så D2
kan være et fullstack-MVP uden login. Adgangskontrol
starter lokalt i L19. L21 gør den færdig og deployer backend med login.
L10, L18 og L25 er reserveret til konkret projektarbejde. Sekvensdiagrammer
og komponentdiagrammer sidder ikke på holdet, selvom 62420/62450 har UML.
Regn dem ikke for kendte. D1 er en klikbar
frontend-mockup med JavaScript, uden backend, med en offentlig URL. D2 er et MVP med frontend,
backend/API, PostgreSQL og én central brugerhandling. D3 udvider MVP'et til
et fungerende system med flere brugerflows, authentication, deployment og
færdig portefølje.