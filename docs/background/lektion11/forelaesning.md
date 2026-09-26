# E22 62581 Forelæsning - Lektion11

Source: Google Slides,
https://docs.google.com/presentation/d/16PzkTcnIjHSWEk6gKIFzKi2Wwb_0UWIXQg-aEasXapw
(exported as plain text; slide-break formatting from the original is lost, but
all text content is preserved).

---

Lektion 11
Opsamling på JavaScript. Serialisering med XML og XML over nettet


Denne her gang
Repetition af JavaScript fra sidste uge
Nedsat tempo!
Sig til når det går for stærkt

Agenda	
JavaScript opsamling
Serialisering
XML
XML over nettet
Netværk: Congestion Control

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
d = {color: "red", speed: 200}; //Object
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
function somefunction(arg, argFunc){		return argFunc(arg);}somefunction("cat")	

Scope traps!
a = true;if (a){            var oneVar = "hat"            let anotherVar = "cap"}console.log(oneVar) //works - even if we left the scopeconsole.log(anotherVar); //undefined - proper block scoped variable

JavaScript in the browser
Demo Time
<script></script>
document.getElementById("someId");
element.innerHtml / innerText
<button onclick="somefunction();">

Nok til frontend interaktivitet….


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


Java Objekt de-serialisering
 try {
            FileInputStream fIn = new FileInputStream("User.obj");
            ObjectInputStream oIn = new ObjectInputStream(fIn);
            Object o = oIn.readObject();
            return (User) o;
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }


Lad os prøve det!

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
Attributter
Underobjekter

XML regler
Wellformed XML
Valideret XML
Tags kan være med eller uden attributter
Udbredt som grænseflade mellem systemer/databaser


XML attributes
Alternativ til Elements
Ingen regler for hvornår


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

XML Schema
Kan bruges til at generere Java Klasser
Java klasser kan bruges til at generere schema
Sikker på at overholde kontrakten!
(Frygteligt besværligt ;)  ) 
Afprøv evt: Convert XML Schema (XSD) to Java Pojo Classes - Online 

Serialisering af XML i Java
XML er en tekst
Kan læses og skrives af et vilkårligt program
Java kan hjælpe en med det
Simple Api for XML, SAX
Document Object Model DOM
Jackson (Det vi bruger)


XML og Java


XML og Java

Lad os afprøve det!

Øvelser og Pause
