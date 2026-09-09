# E22 62581 Forelæsning - Lektion09

Source: Google Slides,
https://docs.google.com/presentation/d/14SEugwYa2RAxX_RKNG_FckVyBIScmflg_a3AfHouM1c
(exported as plain text; slide-break formatting from the original is lost, but
all text content is preserved).

---

Lektion 09
Client-Server arkitektur - Tynde vs Tykke Klienter. Lagdeling af applikationer. Tilstandsdiagrammer. JavaScript Primer.

Agenda	
Client-Server
Tynde og tykke klienter
Lagdeling
Tilstandsdiagrammer
JavaScript Primer

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
Tynd Klient:
Viser kun view
Ingen logik til Presentation/Application/Businesss/Data
Presentation logic på Servere

Flere måder at distribuere lagene på
Tyk klient
Mere af applikationen rykker ned på klienten
Flere grader af 'tykhed'
Fra presentation logic
Til hele applikationen (bortset fra data)

Mere lagdeling

MVC - Mere lagdeling
Adskillelse af logiske dele - Separation of Concerns 
GRASP - Lav kobling - High Cohesion

Tykkere klienter med JavaScript
Flytte presentation logic til klienten
Mere responsiv fornemmelse - Mere 'nativt'
Velegnet til interaktive elementer.
Muligt at ændre i html-siden uden at kalde backenden

Demo

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
Ændrer tilstand hvis attributter ændrer tilstand
Kræver en hændelse
UML: 
metodekald 
besked
timer
trigger (condition)

Objekt-tilstande
Et objekt har typisk et antal forskellige tilstande
I en given tilstand kan et objekt
Udføre en aktivitet
Vente 
Opfylde en betingelse

Objekt-tilstande
Betinget af attributter
Login ok
Betinget af "logintoken != null"
Navn fundet
navn != null
Pakke modtaget 
pakke!= null

Tilstandsskift
Et objekt kan skifte fra en tilstand til en anden.
Transition
Betinget af en trigger
Uden trigger
evt. Samme tilstand

Eksempel
Loginside vist
Hjemmeside vist
Login
Logout

Overgange - Triggers/Hændelser
En eller flere vilkårlige hændelser trigger samme overgang
Logout, Timeout
Guard condition
Hændelse [Betingelse]
Login [Password korrekt]'
[Guard]


Tilstandsmaskiner
Viser et objekts tilstande i sin levetid
Hændelser som objektet kan reagere på
Mulige resultater
Mulige overgang
Finite State Machine
Endeligt antal tilstande og overgange
Deterministisk
Alle hændelser resultater i én specifik overgang
Non-deterministisk
Nogle hændelser kan resulterer i flere forskellige overgange
Software:
Deterministiske FSM'er

Start tilstand og sluttilstand

Start tilstand og sluttilstand
Alternativ

Start tilstand og sluttilstand
Alternativ

Handlinger der ikke giver tilstandsskift
Entry - Handling ved start af tilstandsskift
Exit - Handling ved slut af tilstandsskift
Vente-aktivitet - Udføres løbende under tilstanden


Sammensatte tilstande
Tilstande med undertilstande i
Sekventielle
én undertilstand af gangen
Samtidige
Flere samtidige undertilstande

Eksempel

Samtidige undertilstande

Hvornår tilstandsdiagrammer?
Analyse af domænet
Beskriv eksisterende processer og protokoller
Designprocessen
Hvilke tilstande kan softwaren være i?
eks. Klar, venter på svar, fejl
Test
Test af mulige tilstande

Design elementer
Sekvensdiagram
Beskeder mellem objekter
(Kollaboration/Kommunikationsdiagram)
Samarbejde mellem objekter
Klassediagram
Struktur af klasser
Aktivitetsdiagram
Algoritmer
Tilstandsdiagram
Overgange mellem tilstande

Eksempel - Parsing af HTML-tags

Eksempel - Parsing af HTML-tags
0
1
2
3
4
5
6
7
8

Tilstandstabel
Repræsentation i tabelform
Angiver skift til andre tilstande
Guf for elektronik-nørder

Kodeeksempel - HTML Parser

Første omgang øvelser
Øvelse 1+2

JavaScript primer
JavaScript != Java
Java: JVM 
Kører på OS'et
Direkte adgang til OS
JavaScript: Browser
Kører sandboxed
Ingen direkte adgang til OS
Fælles:
WORA: Kan køre på alle platforme med JVM/Browser

JavaScript primer
JavaScript != Java
Typesvagt vs Typestærkt
let a; vs String a;
Dynamisk typet vs Statisk typet
let a = "a"; a=9 vs int a = 9; a = "hat" 

JavaScript primer
JavaScript != Java
Java: Strengt OO
alt er i class'es
JS: OO as you like 
Kode kan ligge udenfor klasser/objekter
Klasser ikke nødvendige
Objekter kan oprettes uden klasser
let someObj = {data:"someData"}
Eller med klasser 
class SomeClass {       constructor(){      }   }


JavaScript Dynamiske typer og objekter
let obj = {name:"brian"}
obj.age = 14; //Går ikke i Java - hvorfor?

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


JS optional parameters
function somefunction(arg, argFunc){		return arcFunc(arg);}somefunction("cat")	

Scope traps!
a = true;if (a){            var oneVar = "hat"            let anotherVar = "cap"}console.log(oneVar) //works - even if we left the scopeconsole.log(anotherVar); //undefined - proper blockscoped variable

JavaScript in the browser
Demo Time
<script></script>
document.getElementById("someId");
element.innerHtml / innerText
<button onclick="somefunction();">

Nok til frontend interaktivitet….


Socrative
www.socrative.com 

Learning by Doing!
Øvelse 3
