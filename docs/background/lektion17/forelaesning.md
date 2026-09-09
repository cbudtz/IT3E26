# E22 Forelæsning - Lektion17

Source: Google Slides,
https://docs.google.com/presentation/d/17iBD-Si-3B_WpduPaopJR6Jvh9hFbEFXOXt-4cdjZW4
(exported as plain text; slide-break formatting from the original is lost, but
all text content is preserved).

---

Lektion 17
Opsamling på JavaScript. Serialisering med JSON



Agenda	
Full circle web application
Mere API med Jersey
Nu med JSON
Mere Integration med REST API'er 
Rest-klient med Javascript
Rest-klient med Java

Hvad er et API	
Application Programming Interface
Forbindelse mellem computer-programmer
Specifikation af hvad et program tilbyder andre programmer
Et eksempel: 
https://dawadocs.dataforsyningen.dk/dok/api/adresse#s%C3%B8gning 
https://api.dataforsyningen.dk/adresser?vejnavn=R%C3%B8dkildevej&husnr=46&struktur=mini 


Maven Dependencies
      <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <version>4.0.1</version>
        </dependency>
        <dependency>
            <groupId>javax.ws.rs</groupId>
            <artifactId>javax.ws.rs-api</artifactId>
            <version>2.1.1</version>
        </dependency>
        <dependency>
            <groupId>org.glassfish.jersey.containers</groupId>
            <artifactId>jersey-container-servlet</artifactId>
            <version>2.25</version>
        </dependency>


Ekstra dependencies for at gøre Jersey tilfreds
        <dependency>
            <groupId>javax.xml.bind</groupId>
            <artifactId>jaxb-api</artifactId>
            <version>2.3.1</version>
        </dependency>
        <!-- Same as Above -->
        <dependency>
            <groupId>javax.activation</groupId>
            <artifactId>activation</artifactId>
            <version>1.1</version>
        </dependency>
        <dependency>
            <groupId>com.sun.xml.bind</groupId>
            <artifactId>jaxb-impl</artifactId>
            <version>2.3.4</version>
            <scope>runtime</scope>
        </dependency>


Serialisering til JSON 
Mindre overhead
Minder mere om JS-objekter
Nemmere at arbejde med i frontend
(XML-support i Jersey er dodgy)

         <dependency>
            <groupId>org.glassfish.jersey.media</groupId>
            <artifactId>jersey-media-json-jackson</artifactId>
            <version>2.25</version>
        </dependency>


Fordele ved XML
Kan være skemafast 
XSD - XML schema definition
WSDL - Web service definition
Har man skemaet/wsdl kan man potentielt autogenerere koden
Udbredt i Sundhedssektoren

Hente data asynkront med JS - fetch api'et - review
fetch("url")
Henter data
fetch("url",{options})
method: POST
headers: {'authorization': "bearer sometoken", 'Content-Type': 'application/json'}
Promise baseret
Promise pr = fetch("url")
pr.then((result)=>{})
fetch(baseUrl + "rest/patients")     .then((response)=> response.text()             .then((text)=> showpatient(json))     )

Hvad går det .then() ud på??
Asynkront kald
Programmet fortsætter mens det udføres i baggrunden
"Egen tråd"
Callback-funktion
Eksekveres når kaldet er færdigt
Afventer et "Promise"


Async/Await variant
"Syntactic sugar" på promisesasync function getPatients(){	try{		const res = await fetch("url,");		const json = await res.json();	} catch (e) {		//handle error	}}
De facto i 'egen tråd'
Lidt mere læsevenlig.


Serialisering af en HTML form...

Demo time
Backend til frontend 
… og tilbage igen

https://github.com/cbudtz/IT3ExampleProject  /https://github.com/cbudtz/jersey3war 

Fejlhåndtering
Jersey
HTTP statuskoder
3 måder at håndtere fejl
Response
WebApplicationException
ExceptionMapper
fetch
fetch().then(function(res){
res.status
res.statusText
.catch()
Kun ved netværksfejl!

Fejlhåndtering
HTTP - Statuskoder
Success
200: OK
201: Created
Redirection
304: Not modified
Client
400: Bad request
401: Unauthorized
403: Forbidden
404: Not found
Server
500: Internal Server Error 

Jersey 3 - måder


Response
Svar med et Response 
WebApplicationException
Jersey RuntimeException - UnChecked
ExceptionMapper
Applikationens egne Exceptions
Mappes til HTTP fejl



Response - exception handling


public Response addPatient(Patient patient){
	if (Patient==null){
		return Response.status(Status.BAD_REQUEST). //Status 400
entity("No payload").build();
}
return Response.ok().build();
}


WebApplicationException - exception handling




public Response addPatient(Patient patient){
	if (!checkAvailable(patient.id)){
		throw new WebApplicationException(
"ID is taken", Status.BAD_REQUEST); //Status 40
}
return Response.ok().build();
}


ExceptionMapper - exception handling


public Response addPatient(Patient patient) throws InvalidIdException{
	if (!checkAvailable(patient.id)){
		throw new InvalidIDException("ID is taken")
}
return Response.ok().build();
}


ExceptionMapper - exception handling part 2


@Provider
public class InvalidIdExceptionMapper implements ExceptionMapper<InvalidIdException> {
		public Response toResponse(InvalidIdException ex) {
			return Response.status(400).
				entity(ex.getMessage()).
				type("text/plain").
				build();
		}
}



Frontend Exception Handling


async function fetchPatients(){
	try {
let res = await fetch("rest/patients")
if (res.status !== 200){
		//handle the error
} else {
let json = await res.json();
// do something with the payload
}
} catch (e) {
	//Handle network error!
}
}

Demo time
Exception handling!

Singleton Pattern - Begræns instanser til én
public class GiraffeSingleton {
   private static GiraffeSingleton instance = new GiraffeSingleton(); 
   private GiraffeSingleton(){    /*Private constructor    */};
   public static GiraffeSingleton getInstance(){
       return instance;
   }
}


Demo time
Singleton - Database adaptor

Øvelser
