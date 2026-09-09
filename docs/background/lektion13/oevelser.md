# E22 62581 Øvelser - Lektion13

Source: Google Docs,
https://docs.google.com/document/d/1wDdeON_85VMIYdE1mWpuOUIkbG2rM0G3HX0GPISvPjA

---

Øvelser - Lektion 13
1 REST service 101
1.1 Første REST Service
1. Arbejd videre med projektet fra sidste uge.
2. Tilføj Dependencies til REST - JAX-RS og Jersey:
<!-- Servlet container (Jersey) -->
<dependency>
   <groupId>org.glassfish.jersey.containers</groupId>
   <artifactId>jersey-container-servlet</artifactId>
   <version>3.0.6</version>
</dependency>
<!-- Injection manager -->
<dependency>
   <groupId>org.glassfish.jersey.inject</groupId>
   <artifactId>jersey-hk2</artifactId>
   <version>3.0.6</version>
</dependency>
<dependency>
   <groupId>org.glassfish.jersey.core</groupId>
   <artifactId>jersey-common</artifactId>
   <version>3.0.6</version>
</dependency>


<!-- Servlet API -->
<dependency>
   <groupId>jakarta.servlet</groupId>
   <artifactId>jakarta.servlet-api</artifactId>
   <version>5.0.0</version>
</dependency>
<!-- JAX-RS Rest specification -->
<dependency>
   <groupId>jakarta.ws.rs</groupId>
   <artifactId>jakarta.ws.rs-api</artifactId>
   <version>3.1.0</version>
</dependency>


   3. Tilføj nu en konfigurations-klasse (AppConfig): 
@ApplicationPath("/rest")
public class AppConfig extends Application{
}
	   4. Tilføj en Rest-Service
@Path("ahoy")
public class AhoyService {
   @GET
   public String getAhoy(){
       return "Ahoy Sailor!";
   }
}
	

   5. Kør nu tomcat serveren
   6. Check om det virker på http://localhost:8080/it3_E21_web_war/rest/ahoy (Husk at udskifte med din rigtige url

1.2 Post Service
   1. Prøv nu at tilføje en postAhoy(String name) metode som returnerer "Ahoy " + name
   1. Husk at Annotere metoden med @POST
   2. Genstart serveren
   3. Afprøv om det virker med HTTP klienten i IntellliJ (se sidste uge) 


2 XML med Jersey
Brug XML-mapperen fra sidste uge til at lave en XML-string og returner den
   1. Tilføj XmlMapper dependency'et fra sidste uge
<dependency>
           <groupId>com.fasterxml.jackson.dataformat</groupId>
           <artifactId>jackson-dataformat-xml</artifactId>
           <version>2.12.5</version>
</dependency>
	   2. Opret en klasse, Patient, med et navn og et cpr-nummer og giv den getters og setters
   3. Modificér getAhoy-metoden, så den opretter et Patient objekt og sætter navn og cpr til noget test data. 
   4. Måske skulle du også skifte navn til PatientService og Path til patient?
   5. Serialiser Data til XML og returner xmlStringen.
   6. Hvordan ser det ud?
   7. Der mangler formentlig en header - annotér klassen med @Produces for at markere at Content-type er XML:
@Path("patient")
@Produces(MediaType.APPLICATION_XML)
public class PatientService {


   8. Nu ser det forhåbentlig sådan ud:
  


2A Lidt mere elegant løsning
Det er lidt rigeligt besværligt at skulle kalde mapperen hver gang. Jersey kan gøre det mere elegant
      1. Tilføjer du dependency'et 
<dependency>
   <groupId>org.glassfish.jersey.media</groupId>
   <artifactId>jersey-media-jaxb</artifactId>
   <version>3.0.6</version>
</dependency>
         2. Tilføj annotationen XMLRootelement til din patient
import javax.xml.bind.annotation.XmlRootElement;


@XmlRootElement
public class Patient {
            3. Nu kan du lave GET end-pointet om til:
@GET
public Patient getPatient() throws JsonProcessingException {
   Patient patient = new Patient();
   patient.setCpr("123456-xxxx");
   patient.setName("TestBruger");
   return patient;
}
               4. 

3 Hente XML med JS
Prøv nu at modificere din index.html fil i projektet så den kan hente XML fra serveren og vise det på siden
               1. Tilføj en patient-div 
<div id="patient"></div>
               2. Tilføj en knap 
<button onclick="getPatient();">Hent patient</button>
               3. Lav en javascript funktion der kan hente patienten
function getPatient(){
   fetch("rest/patient")
       .then(function (data){
       data.text()
.then(function(text){
           alert(text)
           }
       )
   })
}
                  4. Kan du forklare hvad funktionen gør?
                  1. Hvad gør de to 'then() ?
                  5. Prøv at ændre funktionen så den udskriver teksten i patient-div'en i stedet
                  6. Kan du få det til at se ca.  sådan her ud?
  
                  7. Det ser måske ikke så flot ud - og det er ihvertfald ikke et objekt.
                  8. Du kan evt. konvertere det til et xmlDoc sådan her:
let xmlDoc = new DOMParser().parseFromString(text,"text/xml")
document.getElementById("patient").innerText=xmlDoc.getElementsByTagName("name").item(0).innerHTML +xmlDoc.getElementsByTagName("cpr").item(0).innerHTML


4 Hent XML med Java
Skriv et lille program der kan hente XML fra dit rest-endpoint - på samme måde som du gjorde med js
                     1. Vi bruger en HTTP klient, Unirest, der gør det hele lidt nemmere:
       <dependency>
            <groupId>com.mashape.unirest</groupId>
            <artifactId>unirest-java</artifactId>
            <version>1.4.9</version>
        </dependency>
                        2. Hvis du vil hente data fra en URL, er det relativt simpelt:
String s = Unirest.get("http://localhost:8080/it3_E21_web_war/rest/patient").asString().getBody();
System.out.println(s);
                           3. Hent data med UniRest og Konverter det til et Java-objekt (Se øvelserne fra sidste uge)
                           4. Udskriv objektet for at se at det virker.
                           5. Nu har I en god basis til at udveksle data med andre grupper.
