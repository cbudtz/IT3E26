# E22 62581 Forelæsning - Lektion25

Source: Google Slides,
https://docs.google.com/presentation/d/1PsOpHgSNEoEKqyiV6MdgAQZX0RXxCeDqQxCF9LTj35A
(exported as plain text; slide-break formatting from the original is lost, but
all text content is preserved).

---

Lektion 25 - Recap - web
Christian Budtz - chbu@dtu.dk 

IT og Kommunikation
Semester - En computer - et program
Semester - En computer - flere programmer (Java  + SQL)
Semester - Flere computere - flere programmer (HTML/CSS/JS/Java/SQL)
Nu bliver det kompliceret!


Hybrideksamen
Teoretisk spørgsmål i Netværksteknologi
Spørgsmål i projektet
Web teknologi / Metode

Læringsmål
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

Eksamensspørgsmål
Web/Udviklingsmetoder
'Lagdeling i applikationen'
Sekvensdiagrammer og planlægning
HTML og udvalgte HTML-elementer
CSS vs. HTML
JavaScript
Webservere
Dynamiske Hjemmesider
Applikationens tilstand
Serialisering med XML (og evt. json)
Sikkerhed i webapplikationer
Cyber-attacks

Eksamensspørgsmål
Netværk
Computernetværk og internettet x 2
Netværksegenskaber x 2
Applikationslaget x 4
Transportlaget x 3
Netværkslaget x 3
Linklaget x 3
Trådløse netværk
Netværkssikkerhed x 2

1 'Lagdeling i applikationen' / Distribution af applikationen


Hvilke lag kan man have i en web-applikation?
Hvor ligger de henne?
Hvad er formålet med at lagdele en applikation?
Hvordan har I gjort det?



Distribuerede systemer
Skalering
Vertikal skalering - Større computer
Øvre teknisk mulig grænse
Horisontal skalering - Flere computere
The sky is the limit!
Redundans
Eks. Ekstra servere
Replication
Ekstra kopier af data
(også redundans)
Caching
Som replication, men kan blive 'stale'
Planlæg med fejl

Krav til distribuerede systemer
Fault-Tolerant
Highly Available 
Recoverable 
Consistent 
Scalable
Predictable Performance
Secure

Flerlags arkitektur
Arkitektur pattern
Client-Server
Separation of Concerns
Typiske Lag
Presentation
View
Presentation logic
Application
Service Layer
Business
Domæne logik
Data
Persistens
3 part

Flere måder at distribuere lagene på
Tyk klient
Mere af applikationen rykker ned på klienten
Flere grader af 'tykhed'
Fra presentation logic
Til hele applikationen (bortset fra data)

Dødssyg use case - Login - N-lags Arkitektur

Dødssyg use case - Login - Flow 1

Web teknologier
Frontend
HTML (Lektion 1 +3)
CSS (Lektion 3)
JS (Lektion 7)
(WebAssembly) 
Backend (Lektion 5)
Java (Lektion 7)
MySQL (Lektion 11)


2 Sekvensdiagrammer og Planlægning
Hvad bruges sekvensdiagrammer til?
Giv et eksempel på hvordan det kan bruges - eks. i en webapplikation
Hvordan kan man planlægge med Ganttdiagrammer og Milestoneplaner

Sekvens diagram
https://www.uml-diagrams.org/sequence-diagrams.html 
Aktører
Klasser (evt. BCE)
Beskeder
Send
Call and return
Til at modellere adfærd	på
Analyse-niveau
Design
Implementering

Sekvens diagram
Call and return
Loop
System sekvensdiagram
Aktør og system
Design sekvensdiagm
Klasser i systemet


Gantt Diagram - hængeparti fra sidst
Opgaver
Tid
Bindinger
End-Start, Start-start, end-end
Kritisk vej
Slack
Definerer det hurtigste et projekt kan blive færdigt

Gantt -diagrammer
Identificerede opgaver konverteres til liste.
Bindinger (dependencies) identificeres
Finish to start
Start to start
Finish to finish
Opgaver, der er bundne sættes efter hinanden
Bindinger er vigtige for kritisk vej!
Henry Gantt

Estimer varigheden af de forskellige opgaver
Brug din erfaring
Brug teamets erfaring
Brug ekspert-erfaring 
(Beware! - de siger måske bare det du gerne vil høre!)
Brug estimat-metoder
PERT formel (kræver erfaring): Expected = (Optimistisk +4 * realistisk + Pessimistisk) / 6
Planning poker (overraskende godt til ukendte opgaver:  https://en.wikipedia.org/wiki/Planning_poker 
Opgaver på ca.  10-50 timer...
(Gang med Pi)

2.e Identificer kritisk vej
Konstruér Gantt-diagram
Brug et værktøj
Parallelisér!
Vær opmærksom på bindinger
Find kritisk vej!'

Kritisk vej kan ændre sig
Opdatér
Monitorér
Sæt alle sejl på kritisk vej!
Bedste ressourcer 

HTML og udvalgte HTML-elementer


Hvad er html?
eks. <HTML> <head> <body> <div> <a href="/somepage.html"> <form action="/" method="GET"> <input type="number"> <h1> <p>



3 HTML
HyperText Markup Language
En del af Markup Languages
Deklarativt sprog
Tillader at definere indhold og struktur
Med et énkelt dynamisk element: <a href>

Deklarative vs. Imperative- & OO-sprog


Deklarative
Beskriver udseende 
Eks. HTML, CSS, SQL, XML
(Klassediagram)
Imperative
Beskriver opførsel
Eks. Pascal, C, JavaScript, Java ....
(Sekvensdiagrammer)
Nogle er objektorienterede
kobler data og opførsel sammen
Java, C++, C#, Javascript (både -og)



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


Samlet struktur
<!DOCTYPE html><html lang="en">	<head>  		<meta charset="UTF-8">	  	<title>IT3 Lektion 1 - a</title>	</head>	<body>		<div>Killinger!</div>		<a href="https://hiddendoor.org/kitten-coloring-page-en-van-kitties-pages/">		 	<img src="https://www.publicdomainpictures.net/pictures/90000/velka/kitties.jpg" height="100px">		</a>		<form action="somepage.html">  			<input type="text" id="knap" name="username" required>			<button type="submit">Send</button>			<button type="reset">reset</button>		</form>	</body></html>

4 CSS vs HTML
Struktur og Layout
Margin, Padding, position, size, border, color
id, class, selectors

CSS - Cascading stylesheets
Definerer HTML-elementernes udseende og placering
Kan placeres på 3 niveauer
 Element specifikt
style attributten : <h1 style="color:blue;margin-left:30px;">
Indlejret i htmldokumentet
<head>	<style>body {background-color: blue;}</style></head>
I separat .css - fil (oftest den bedste løsning)
<link rel="stylesheet" type="text/css" href="mystyle.css">



Syntaks
styles refererer til elementer
Indbyggede klasser "":- eks. table, body
id'er "#" : #submitbutton
Egne klasser "." : .container
Pseudo-klassser ":": button:hover
Pseudo-elementer "::" : p::first-line
Kan kombineres ( , > , + 
p a {color: red;}
selector { attribut: værdi; }

Nogle interessante attributter
Placering
position 
float / clear
padding
margin
Udseende
color: red, #b73e3e, rgba(183 62 62 / 20%)
font, font-size, font-family
<link href="https://fonts.googleapis.com/css?family=Lobster" rel="stylesheet" type="text/css">
height, width, max-width, max-height
border-radius
border-???
background-color

5 JavaScript

JavaScript
JavaScript != Java
Java: JVM 
Kører på OS'et
Direkte adgang til OS
JavaScript: Browser
Kører sandboxed
Ingen direkte adgang til OS
Sproget i browseren (der er også webassembly)
Bruges til at manipulere DOM og til async requests
Fælles:
WORA: Kan køre på alle platforme med JVM/Browser

JavaScript
JavaScript != Java
Typesvagt vs Typestærkt
let a; vs String a;
Dynamisk typet vs Statisk typet
let a = "a"; a=9 vs int a = 9; a = "hat" 

JavaScript
JavaScript != Java
Typesvagt vs Typestærkt
let a; vs String a;
Dynamisk typet vs Statisk typet
let a = "a"; a=9 vs int a = 9; a = "hat" 

JS variabeltyper
var a;var b;var c;let d;let e;//variables have no type
a = "string"; // a has type String
b = true; // Boolean
c = 123 // Number
d = {color: "red", speed= 200}; //Object
e  = ["Hello", 1, true]; //Array - has a lot of extra functionality
e = function(arg1, arg2){}; //Function (no argument types!)

JS Dynamic typing og type coercion
let a = "someString";
let a = 1234;
let b = "1234";
a == b //true - I JS kan man sammenligne tal og bogstaver...; 
a === b //false;

JS - Functions as Variables
//variable assignment - anonymous function gets assigned to myfunction
let myfunction = function(arg1, callbackfunction){
		callbackfunction("got argument: " + arg1);	
} 
//'Real' function declaration
function displayText(text){
	alert(text);
}
myfunction("some text", displayText); //Function passed as parameter


6 Webservere
Linux og shell
Tomcat
Servlets
WebServices



Webservere
Fysisk server
Virtualiseret server
Operativ system
Webserver
Web-Application

Virtualisering
Hypervisor kører på Computeren
Udstiller 'virtuel hardware' til containers
Bro til rigtig hardware
Operativ-system og software installeres i containere


Linux Shell - Bash
Nyttige kommandoer
sudo - brug administrator rettigheder
pwd - aktuel sti
cd - skift bibliotek
ls - list filer
ls -a - alle filer
ls -l udvidet information (blandt andet om ejerskab)
ls -R (recursive - se alle under biblioteker)
mkdir "navn" - opret bibliotek med "navn"
rmdir "navn" - fjern mappe
touch - opret en fil
ssh - Forbind til en remote host

Nyttige linux kommandoer - brugere/rettigheder
su - switch user
Hver bruger har en egen home folder hvor de har rettigheder
sudo - brug superbruger
sudo -s bliv superbruger
drwxrwxrwx - directory-ejer-gruppe-alle
chmod - ændr rettigheder
u=rwx, g=rwx, a=rwx
chown "bruger" - skift ejer

Web-Servere
Rene HTML -servere
Deler bare oldschool html-filer ud
apache/nginx og mange flere
Dynamiske webservere
Tomcat: kan afvikle Java
Java-webcontainers

7 Dynamiske Hjemmesider


Klient/Server arkitektur
Server side: Servlets og API'er
Client side: JavaScript
Cookies

Dynamiske Hjemmesider


Hjemmeside der ser forskellig ud alt efter input
Forskellige måder at være dynamisk
Client side - JS
Server side - Backend/Webserver framework

Servlets
Java indpakning til Sockets
Tager imod et request  
Svarer med et response
HTTPServlet
Implementerer HTTP protokollen
Har metoder der kan overrides:
doGet()
doPost()
doPut()
doDelete()
...
Kilde: Jenkov.com

Servlets og web-applikationer
Servlets kan afvikles på en webserver
Pakkes i .war-filer

WAR - Web Application Archive
Indpakning til Java-webservers (eks. tomcat)
Zippet
Indeholder 
klasser
servlets
Statiske filer
html
css
js
Konfiguration
web.xml (Kan godt klare sig uden)

Lagdelte arkitekturer
Tynd Klient
Kun View er på Klient siden
Tyk klient 
Flere lag på klienten
Javascript mm
Mere om det senere

Cookies

8 Applikationens tilstand


Tilstandsdiagrammer
Klient og Server tilstand
Cookies
Fejlhåndtering i backend og front



Tilstandsmaskiner - og diagrammer
Et objekt har en tilstand
Et objekt kan være hvad som helst
Bruger
Bil
TCP-protokol
whitebox: Tilstanden udgøres af
Objektets attributters tilstande
Tekstuel: 
Fil åben
Knap nedtrykket
Logget ind ⇔ Logget ud

Objekt-tilstande
Betinget af attributter
Login ok
Betinget af "logintoken != null"
Navn fundet
navn != null
Pakke modtaget 
pakke!= null

Tilstandsdiagram

Samtidige undertilstande

Stateless vs stateful
Stateful
Serveren holder styr på klientens progressen

REST - REpresentational State Transfer
Client-Server arkitektur
Web-service arkitektur
Klient-uafhængig
Browser
Andet system
Måleapparat
Kommunikation uden state (tilstand)
Serveren holder ikke styr på sessioner
Data og funktionalitet udbydes gennem et uniformt interface

9 Serialisering med XML (og evt. json)


Træstruktur
vs HTML
XML skema
Serialisering og Deserialisering 


Serialisering
Transformering af et objekt/datastruktur til et format der kan gemmes eller overføres
Eks. 
Java Objekt til fil
HTML-form-værdier til XML
Java Objekt til SQL
De-Serialisering
Den modsatte process


Java Objekt serialisering
Effektivt
Proprietært - Virker kun mellem javaapplikationer
Praktisk taget ulæseligt
�� sr User�3C���Ԥ L passWordt Ljava/lang/String;L userNameq ~ xpt testPasst testUser

Java Objekt serialisering
Afhængigt af Streams
Objekt → Byte sekvens, der kan gemmes try {
            FileOutputStream out = new FileOutputStream("User.obj");
            ObjectOutputStream objectOut = new ObjectOutputStream(out);
            objectOut.writeObject(s);
            objectOut.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }


XML
HTMLs fætter
eXtensible Markup Language
Lavet til serialisering
Selv-beskrivende
Tags fortæller hvad de indeholder
Lidt old-school
Ekstremt udbredt i sundhedssektoren
https://www.medcom.dk/standarder 

Eksempel
Træstruktur
Rod-element
Elementer
Attributter
Underobjekter

XML Schema - XSD


XML Schema
Fast struktur for XML
Kontrakt mellem afsender og modtager
Bruger attributter
<xs:element name="username" type="xs:string"/>
Simpelt element
Kan nestes
<xs:complexType>
Fast sammensætning af flere elementer
"Svarer til et objekt" 
<xs:sequence> 
Hvis rækkefølgen er vigtig

10 Sikkerhed i webapplikationer


Access Control
Identificiation
Authentication
Authorization
Audit
Token/Cookie baseret sikkerhed

Tokenbaseret sikkerhed med JWT



JSON Web Token (jwt)
3 delt signeret token
Header - hashing algoritme
Payload - med claims
Signature - hashet med secret på serveren
Base64 kodet
Tegnsæt-sikker kodning - IKKE kryptering
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ

{"alg":"HS256","typ":"JWT"}.{"sub":"1234567890","name":"John Doe","admin":true}.L@36pDLpGN4X{

Fetch- Send token med i headeren
	var authHeader = "Bearer " + localStorage.getItem("jwt");
	 fetch(baseUrl + "rest/giraffes", {
            headers: {
                Authorization: authHeader
            }
        }).then(...)

Authorization: Bearer er standard for token baseret login.

Access Control
Identification
Hvem du påstår du er 
Authentication
Validering af identitet
Something you know - Password, PIN
Something you have - Nøgle, Token
Something you are - Iris, Fingeraftryk
2FA - kombination af flere.
Authorization
Hvad du får adgang til!
Audit
Hvem gjorde hvad?

Oauth2
Baseret på HTTP redirects
Redirect fra jeres server til 3. parts login/authentication
(Re)redirect tilbage til jeres server - med ticket/code
Brugeren godkender udstedelse af en access token
I får aldrig brugerens kodeord
Stateless - Serveren kender ikke login-status
Cookies:
Stateful - serveren holder styr på cookien's betydning
Besværligt med multidomain - da cookie er bundet til domain

Oauth - Sekvensdiagram (FB eksempel)
Brugeren redirect'es til FB
Brugeren giver tilladelse til at FB giver data videre.
FB redirecter browseren tilbage til jer - incl en ticket/code
Jeres server veksler ticket/code for en access token.
Jeres server bruger token til at tilgå data fra FB
Det er muligt at definere scopeHvilke data jeres applikation må tilgå- Authorization!

Access Control: Authorization 
Typiske rettigheder (filsystem)
Read (R), Write (CUD), Execute
Flere forskellige varianter
DAC - Discretionary
MAC - Mandatory
RBAC - Role Based
ABAC - Attribute Based
(BGAC - Break Glass) - Relevant i sundhedssektoren
(RSBAC - Rule-Set Based)
(HBAC - Host Based)

Implementerings løsninger
Access Control Lists
Lister over rettigheder
Ressource -> Rolle -> Rettighed
giraffes - > girafpasser -> get, post
giraffes/341234 ->chbu -> get, put, delete (specifik ressource, specifik rolle)
Som Maps
{ giraffes: {girafpasser:{get,post}}, giraffes/341234:{chbu:{get,put,delete}}}
Som matrix

Implementeres med multikey-map eller map med konkatenering af rolle og ressource
girafpasser
chbu
giraffes
get, post
giraffes/341234
get, put, delete

Cyberattacks
Denial of Service
Man in the Middle
Spoofing
Phishing
SQL injection
Virus, Trojan, Worm
Rainbow-table attack

Denial-of-service (DoS) distributed DOS (DDoS) attack


Kræver mange computere eks. BotNet
Udvælg mål
Brug Hosts/bots til at sende trafik
Overbelast målet
Målet går ned eller bliver unreachable.
Skal løses på ISP niveau…
ISP'er blokerer trafik fra mistænkelige IP'er


Man in the middle
Opfang afsender besked.
Send modificeret besked til modtager (eks med egen nøgle/kontonummer etc).
Vent på svar 
Modificer svar til afsender

Spoofing
Udgive sig for at være en anden
IP
MAC
Email
Websites

Phishing 

Social engineering!
Eks.: Mail fra troværdig kilde
Spoof Email adresse 
from: direktør@danskebank.dk
(ingen umiddelbar garanti for afsender)
Eks. Microsoft support!
Vi skal liiiige installere noget software for at diagnosticere din maskine...
Målrettet
Overfør penge
Overfør data
Download malware




SQL Injection Attack
Hjemmeside med tekst fejler sanerer ikke input
“SELECT * FROM users WHERE account = '"  + userProvidedAccountNumber +  " ';"
Angriber skriver SQL i inputfelt
' or '1' = '1';
Hjemmeside henter data der ikke burde være tilgængelig
“SELECT * FROM users WHERE account = '"  or '1' = '1' ";”


SQL Injection Attack



Malware
Macro - sårbarhed i installerede programmer - eks word, excel
File - Troværdige filer med ondsindet kode
Virus: Spreder sig ved aktiv bruger indblanding
Worm: Spreder sig af sig selv
Trojan: Gemt i rigtigt program.
Ransomware: Malware der krypterer data og sender nøglen til angriberen

Hashing og Salting
Hashing: Potentielt modtagelig for Rainbow-table-attack
Rainbow-table - Tabel over alle kombinationer af kodeord og hashes
Beskyttes ved at tilføje et 'salt'
Tilfældigt genereret string der tillægges.
Hvert kodeord har sit eget salt
BCrypt algoritmen er (2021) stadig en god standard.
Implementeret med JBcrypt
Argon2 er på vej ind

Q&A
