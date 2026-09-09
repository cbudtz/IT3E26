# E22 62581 Forelæsning - Lektion13

Source: Google Slides,
https://docs.google.com/presentation/d/17W4rc3-D3zuLnNthF5owiL9oDORwOCvgisHPjQzxUl8
(exported as plain text; slide-break formatting from the original is lost, but
all text content is preserved).

---

Lektion 13
Client-side interaktivitet. Mere JavaScript. Rest API'er med Java


Agenda	
REST API'er 
API med Jersey
Rest-klient med Javascript
Rest-klient med Java

Hvad er et API	
Application Programming Interface
Forbindelse mellem computer-programmer
Specifikation af hvad et program tilbyder andre programmer
Et eksempel: 
https://dawadocs.dataforsyningen.dk/dok/api/adresse#s%C3%B8gning 
https://api.dataforsyningen.dk/adresser?vejnavn=R%C3%B8dkildevej&husnr=46&struktur=mini 


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

Rest til Webapplikationer
Klienten - Presentation
View
Presentation logic
"api-klient"
Server
Api-lag
Business Logic
Persistence lag

REST (JSON/XML)

REST - Webservice-Protokol
Bygger på HTTP-protokollen
Anvender HTTP Verbs
POST, GET, PUT, DELETE
Create, Read, Update, Delete
(SQL: INSERT, SELECT, UPDATE, DELETE)
Ressourceorienteret 
GET /patients/2509811699 HTTP/1.1
Selvbeskrivende beskeder
eks:
"Tilstand gennem links"
Ingen state på serveren, men de links man bruger, signalerer hvor man er i et flow
eks: PUT /patients/2509811699/appointments

Stateless vs stateful
Stateful
Serveren holder styr på klientens progressen

Stateless vs stateful
Stateless
Klienten holder styr på egen progression
Serveren holder ikke styr på login-status
Serveren udsteder og validerer tokens / cookies

REST - webservices
Ressourcer 
"Data endepunkter"
Identificeres med en URL
eks: /patients/
specifikt eks: /patients/2509811699
specifik under-ressource eks: /patients/2509811699/appointments

REST - webservices
Dataformat
Ensartet
JSON
XML

Eks: Opret bruger (Create)
POST 
/users
XML i body

Eks: Hent bruger (Read)
GET
/users/{id}
Ingen body

Eks: Opdater bruger (Update)
PUT
/users/{id}
Fuld XML i body

List alle:
GET http://localhost:8080/api/prescriptions
List med søgekriterie:
GET http://localhost:8080/api/prescriptions?pharmacist=Christian
Hent specifikt ID:
GET http://localhost:8080/api/prescriptions/1234
List underressourcer:
GET http://localhost:8080/api/prescriptions/1234/contents

API - specifikation  -eks: 

Rest API med Java - JAX-RS
JAX-RS - Specifikation af REST-annotationer
eks: @Path, @GET, @PUT, @POST, @DELETE
@Path("hello")
public class HelloService {
	
	@GET
	public String getHello(){
		return "Hello";
	}

Rest API med Java - Jersey
Jersey - Implementering af JAX-RS
Reference implementation
Laver annoterede klasser til servlets
Konfigureres med en Application class
import javax.ws.rs.ApplicationPath;

import javax.ws.rs.core.Application;

@ApplicationPath("/rest")
public class AppConfig extends Application{
}


Vigtige Annotationer
@ApplicationPath
@Path
Både på klasse- og metode-niveau
@GET, PUT,POST,DELETE
@Produces, @Consumes
Content-type
@Consumes(MediaType.APPLICATION_JSON)
Default: Hvad som helst
@PathParam
rest/prescriptions/1234
@Path(“/{id}”)
PrescriptionDto Get(@PathParam(“id”)String id) { … }
@QueryParam
rest/prescriptions?operator=Christian
PrescriptionDto GetByOperator(@QueryParam("operator") String operator)

Hvorfor REST?
Hvad skal vi med de services?
Hvorfor ikke bare danne siden på serveren?
jsp, jsf
asp
php
'Tynde klienter' vs 'Tykke klienter'
Konkurrence gennem årtier…
Andet end Browsere vil måske tilgå vores api?
Måleapparater
Andre websystemer

Tykke og Tynde klienter 
Tynde klienter
Hurtig opstart
Hele brugergrænsefladen genereres og sendes
Simpel browser
Centralisering af præsentations logik
Færre opdaterings-problemer
Tykke klienter
Skal downloade præsentationslogik
JavaScript
Kun data sendes
Ingen page-reloads

Eksempel på asynkron load - kun data sendes
<html>
<head>

<script src="dawa.js"></script>
</head>
<body>
<h2>Simpel adresse søgning - combobox</h2>
<input type="text" id="input" onkeyup="loadAddresses();" list="datalist">
<datalist id="datalist">
<!-- List of streets from DAWA -->
</datalist>
</body>
</html>

Eksempel på asynkron load - kun data sendes
function loadAddresses(){
  fetch('http://dawa.aws.dk/vejnavne/autocomplete?q=' +
document.getElementById("input").value)
.then(function(res){
res.json()
	.then(function(json){
		//do something with the data
}
		)
;
}

Maven Dependencies
<dependency>
   <groupId>jakarta.servlet</groupId>
   <artifactId>jakarta.servlet-api</artifactId>
   <version>5.0.0</version>
</dependency>
<dependency>
   <groupId>jakarta.ws.rs</groupId>
   <artifactId>jakarta.ws.rs-api</artifactId>
   <version>3.1.0</version>
</dependency>
<dependency>
   <groupId>org.glassfish.jersey.containers</groupId>
   <artifactId>jersey-container-servlet</artifactId>
   <version>3.0.6</version>
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


Demo

Midtvejsevaluering
https://evaluering.dtu.dk/ 

Øvelsestid
Øvelse 1 - Rest API

Sende XML med Jersey - kluntet udgave

@Path("patient")
@Produces(MediaType.APPLICATION_XML)
public class PatientService {
   XmlMapper mapper = new XmlMapper();
   @GET
   public String getAhoy() throws JsonProcessingException {
       Patient patient = new Patient();
       patient.setCpr("123456-xxxx");
       patient.setName("TestBruger");
       String s = mapper.writeValueAsString(patient);
       System.out.println(s);
       return s;
   }
}

Sende XML med Jersey - Lidt mere elegant

@Path("patient")
@Produces(MediaType.APPLICATION_XML)
public class PatientService {
   @GET
   public Patient getPatient() throws JsonProcessingException {
       Patient patient = new Patient();
       patient.setCpr("123456-xxxx");
       patient.setName("TestBruger");
       return patient;
   }


Øvelse 2

Hente data asynkront med JS - fetch api'et
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


Demo

Async/Await variant
"Syntactic sugar" på promisesasync funktionsnavn = ()=>{	try{		const res = await fetch("url,");		const json = await res.json();	} catch (e) {		//handle error	}}
De facto i 'egen tråd'
Lidt mere læsevenlig.


Hente Data i Java
Java's indbyggede API er frygteligt besværligt
Unirest
Simpel HTTP klient

String s = Unirest.get("http://localhost:8080/it3_E21_web_war/rest/patient")
.asString().getBody();


Øvelse 3+4
