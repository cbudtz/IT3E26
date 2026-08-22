# E22 62581 Forelæsning - Lektion 01 Introduktion
__Kommenteret af CHBU__ - Indføjet #NYT hvor der ændringer - Dette til basis for nyt kursus
Source: Google Slides,
https://docs.google.com/presentation/d/1vb_ZrRC0YAfk6bXH2EPZZp1q2RjRMzeqKfxZvY5mHyE
(exported as plain text; slide-break formatting from the original is lost, but
all text content is preserved).

---

Lektion 01 - Introduktion
Christian Budtz - chbu@dtu.dk

Underviserne på IT og Kommunikation
Christian Budtz (5 første web-lektioner) #NYT: Web delen 
Henrik Tange (Netværkskommunikation 13 lektioner) #NYT: Rolf Nordahl 6 lektioner i Metode - Projekt, UML, UX.
Bo Holst-Christensen (X web-lektioner) #NYT: Birger Andersen
??? (Resterende web-lektioner)

IT og Kommunikation
1 Semester - En computer - et program
2Semester - En computer - flere programmer (Java + SQL)
3 Semester - Flere computere - flere programmer (HTML/CSS/JS/Java/SQL)

Nu bliver det kompliceret!

Hybridkursus 
½ Netværksteknologi #NYT: 1/4 Netværk + 1/4 Metode (Projekter, UML, UX) + 1/2 Fullstack Web
Teoretisk og øvelser
½ Web og metode (Dynamiske hjemmesider og UML) 
Øvelser og gennemgående projekt
Journalsystem med dataopsamling #NYT EHR er standard projekt - Jeg opfordrer til 
Grupper af 4-5
Gruppedannelse færdig næste torsdag
Jeg skal oprette servere til hver gruppe #NYT: Uafklaret - Måske web deployment - Vercel, Render el. lign

Hybrideksamen (Indtil videre) #NYT: Web + NET/Metode 
Kan ændre sig!
Teoretisk spørgsmål i Netværksteknologi
Spørgsmål i projektet
Web teknologi / Metode

Læringsmål #NYT - læringsmål er opdaterede! Træk fra nyt kursus
anvende fagtermer korrekt.
beskrive og forklare de mest almindeligt forekommende software arkitekturer.
beskrive og forklare de mest almindeligt forekommende distributionsteknikker samt lag-opdeling og abstraktions principper i en protokolstak.
beskrive og forklare tilstandsdiagrammer og sekvensdiagrammer, samt anvende disse til at fastlægge en protokol.
beskrive og forklare dataudveksling via XML, samt anvende XML til dataudveksling i Java programmer.
beskrive og forklare installation og konfiguration af et system, samt almindeligt forekommende sikkerhedsproblematikker i forbindelse med systemer og data netværk
beskrive og forklare netværkskomponenter og kommunikationen fra en computer til en anden over Internettet.
beskrive og forklare metoder og protokoller i Internetprotokolstakken, adressering i IP-baserede netværk samt et programs anvendelse af protokoller i applikationslag og transportlag.
anvende væsentlige værktøjer og metoder til analyse af trafik og fejl på et netværk.
udvikle konfigurerbare, lagdelte applikationer der anvender filer og kommunikerer over et netværk.
sammenligne metoder og services i de forskellige protokoller i TCP/IP protokolstakken samt vurdere protokollers anvendelse til bestemte formål.
deltage i en faglig diskussion indenfor fagområdet.

Læringsmål i dag #NYT: Opdateres
beskrive og forklare de mest almindeligt forekommende software arkitekturer.
beskrive og forklare de mest almindeligt forekommende distributionsteknikker samt lag-opdeling og abstraktions principper i en protokolstak.
udvikle konfigurerbare, lagdelte applikationer der anvender filer og kommunikerer over et netværk.
Min tolkning
Intro til distribuerede systemer
Planlægning: Milestone og Gantt diagrammer
UML: Robustness (BCE) - diagrammer. Sekvensdiagrammer.
HTML

Distribuerede systemer
"System in which components located on networked computers communicate and coordinate their actions by passing messages. The components interact with each other in order to achieve a common goal"
"A distributed system in its most simplest definition is a group of computers working together as to appear as a single computer to the end-user."
~ Flere samarbejdende computere
Din computer og en server
Servere der snakker sammen
P2P - Peer to Peer

Eksempler på distribuerede systemer
Database og Web-server (og klient)
Database og server kan skaleres individuelt

Eksempler på distribuerede systemer
Vertikal skalering - Større computer
Øvre teknisk mulig grænse
Horisontal skalering - Flere computere
The sky is the limit!

Horisontal skalering
Pro
Redundans og fejltolerance
Intet Single-point of failure
Billigere computere
Efter en vis grænse…
Lav latens
Computere kan stå tæt på klienterne

Horisontal skalering
Con
Inkonsistens
Risiko for forskel i data
Løsninger
Transaktionsstyring - kompliceret…
Sharding - del databasen op efter en nøgle

Typer af distribuerede systemer
Centraliseret
En ejer af systemet
En autoritet
Decentraliseret
Flere klienter skal aftale hvem der bestemmer
Hvad hvis en går "rogue"?

Krav til distribuerede systemer
Fault-Tolerant
Highly Available
Recoverable
Consistent
Scalable
Predictable Performance
Secure

Fejl i distribuerede systemer
Bohrbug - Konsekvent og reproducerbar fejl
Heisenbug - Kommer og går - Kan ikke reproduceres systematisk - Timing problem?

Fejl i distribuerede systemer
Halting failures
Noget stopper - ingen forklaring/advarsel
Fail-stop
Noget stopper - med forklaring/advarsel
Omission failures
Noget går tabt - en besked eks.
Network failures
Forbindelsen bliver tabt
Network partition failure
Flere dele af systemet bliver adskilt
Timing failures
En besked bliver forsinket og udløber/en login-session udløber, etc.
Byzantine failures
Fejl der præsenterer sig forskelligt for forskellige brugere

8 Fallacies - fejlagtige antagelser
The network is reliable.
Internettet er best-effort
Latency is zero.
Bandwidth is infinite.
The network is secure.
Topology doesn't change.
Internettet er altid under forandring. Mobiler skifter netværk eks.
There is one administrator.
Transport cost is zero.
The network is homogeneous.

Løsninger?
Redundans
Eks. Ekstra servere
Replication
Ekstra kopier af data
(også redundans)
Caching
Som replication, men kan blive 'stale'
Planlæg med fejl

Netværkskommunikation
Internettet er Best-effort
Data går tabt
Gensendes?
Anmodninger går galt
Server svarer ikke, gør noget uventet, svarer for sent…
Klienten går ned, svarer ikke, gør noget uventet...

Forvent fejl!
Gennemtænk fejlscenarier
Klient og Server skal kunne håndtere at modparten "går ned"
Minimér transmission af data
Tænk over forsinkelser
Forvent fejl i data
Brug redundans mod 'Single point of failure'

Internettet - at a glance
Application layer
(Applikations-protokol: FTP, HTTP, SMTP)
Transportlag
(Port: Hvilket program)
Netværk
(IP-addresse: Hvilket Computer-netværkskort)
Link
(MAC-addresse: Hvilken fysisk indgang på et netværks-device)
(Fysisk lag)
Kabler/Routers/Netværkskort

Pause

Quiz!
https://www.socrative.com/ DTUDIPLOM

Planlægning #NYT - rykkes til L2
Hvordan spiser man en elefant?

Planlægning #NYT - L2
Hvordan spiser man en elefant?
En bid af gangen

Milestoneplan #NYT - L2
Del projektet op i 'sprints'
Typisk 3 ugers arbejde pr. sprint
Stopklods for afsporet projekt
Tab max 3 ugers arbejde....

Work Breakdown Structure #NYT - L2
Nedbryd projektet i overskuelige bidder
Hvis bidden er svær at estimere er den måske for stor!
Meget store elefanter skal deles ud for ikke at blive rådne
5-40 timer
Metoder:
Mindmap
Post-its
Kanban
Scrum
Liste

Gantt Diagram #NYT - rykkes
Rækkefølge
Bindinger
Varighed

Ansvarsfordeling #NYT rykkes
Sæt ansvarlig på opgaver!
Senest når opgaven er planlagt til at starte
Kun én ansvarlig!
Hvis alle har ansvar - har INGEN ansvar
Måske skal opgaven deles i mindre?

UML - Robustness Diagram #NYT rykkes
Til at identificere
Grænseflader
Controllers
Dataobjekter
Simplificeret klasse-diagram med retning…

Sekvens diagram #Nyt rykkes
Til at beskrive forløbet i et system
Aktører
Klasser (evt. BCE)
Beskeder
Send
Call and return
Til at modellere adfærd på
Analyse-niveau
Design
Implementering

Sekvens diagram
Call and return
Loop

Sekvens diagram
Create
Destroy

Sekvens diagram
https://www.uml-diagrams.org/sequence-diagrams.html

Web teknologier #NYT lyttet rundt - Java udgår->JS MySQL udgår->PostGreSQL
Frontend
HTML (Lektion 1 +3)
CSS (Lektion 3)
JS (Lektion 7)
(WebAssembly)
Backend (Lektion 5)
Java (Lektion 7)
MySQL (Lektion 11)

Frontend Teknologier #NYT - lidt dvælen ved deklarative og Imperative sprog
HTML - HyperText Markup Language
Definerer sidens indhold og struktur (Deklarativt sprog)
CSS - Cascading Style Sheets
Definerer sidens udseende (uafhængigt af indhold) (Deklarativt)
JavaScript
Scripting sprog til browseren (Imperativt)

Backend Teknologier
Php, Java, C#, Python, JavaScript, Ruby, Dart, Go
Og mange flere
Klassisk teknologi: CGI #NYT: UD!
Scripting sprog til en webserver
Kan kalde Java Kode og returnere resultatet
Kompliceret og Rodet.
Implementeret i mange webservere som standard.
Mere moderne
Servlets - Framework implementeret i højniveausprog -eks. Java, der håndterer web-server ⇔ Java
Kræver Sprogspecifik server - Eks. Java Server, der kan køre servlets
Endnu mere moderne
Frameworks håndterer det hele

Backend teknologier på kurset
Vi laver en mini HTML server med Java-Socket programmering #NYT JS -
Tager noget tid, men giver indsigt i hvad en Web-server håndterer
Senere bruger vi servlets og frameworks
For at nå at lave et rigtigt system

HTML
HyperText Markup Language
En del af Markup Languages
Deklarativt sprog
Tillader at definere indhold og struktur
Med et énkelt dynamisk element: <a href>

Et eksempel
<html>
<head>
   <title> DTU Web Programmering
   <title>
</head>
<body>
<h1><b> Lektioner</b></h1>
<h2><i> E21 </i></h2>
<p>Lektion1: Introduktion og HTML</p>
<p>Lektion2: Netværk </p>
<p>Lektion3: HTML 2 + CSS </p>
</body>
</html>

Kan du se syntaks-fejlen? Hvad er konsekvensen?

Lad os prøve det selv!
Frem med IntelliJ #Nyt VsCode

HTML tags
Opening and closing tag:
<tag> </tag>
Hierarkisk
<html>
<body>
Tekst
<body>
<html>
Attributter
<img src="someimage.png">
Indre html
<h1>Noget html</h1>
Value
<input value="halløj" type="button"></input>

Vigtige tags
Headings
<h1>,<h2>...
Division - opdeling i sektioner - Med line break
<div>
Span - Opdeling i blokke - Uden line break
<span>
Paragraph - Opdeling med - Med ekstra linje før og efter
<p>
Image
<img src="someimage.png" alt="Alternativ tekst">
Anchor
<a href="https://www.publicdomainpictures.net/">Tryk på mig!</a>

Document Object Model - DOM
Træ-struktur
Elementer kan have et id
<div id="divid"></div>
Man kan tage fat i et element
document.getElementById("divid");
Elementets attributes
value
innerText
innerHTML
attributter

Gruppedannelsen E22
Spørgeskema

Man lærer bedst HTML ved at prøve selv!
www.socrative.com
Øvelse 01
