# E22 62581 Øvelser Lektion 17

Source: Google Docs,
https://docs.google.com/document/d/1cVQInIyn1nbfgucO9OWnUmagWvS68ZL_fTmzOv98Dfc

---

Øvelser - Lektion 17
Fejlhåndtering


Opgave 1 - Overfør data med JSON
Lav en PatientService - Patienter behøver kun at have navn (cpr mm kan I tilføje senere)
Jeres pom skal ca. indeholde det her:
  
<packaging>war</packaging>

   <properties>
       <maven.compiler.source>17</maven.compiler.source>
       <maven.compiler.target>17</maven.compiler.target>
   </properties>

   <dependencies>
<dependency>
  <groupId>org.glassfish.jersey.containers</groupId>
  <artifactId>jersey-container-servlet</artifactId>
  <version>3.0.6</version>
</dependency>
<dependency>
  <groupId>org.glassfish.jersey.inject</groupId>
  <artifactId>jersey-hk2</artifactId>
  <version>3.0.6</version>
</dependency>
<dependency>
  <groupId>org.glassfish.jersey.media</groupId>
  <artifactId>jersey-media-json-jackson</artifactId>
  <version>3.0.6</version>
</dependency>
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

      <!-- Old school xml bindings to shut up tomcat -->
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
   </dependencies>
	1. Lav en service der kan returnere en liste af patienter - Den kunne se ca. sådan ud:

@Path("patients")
public class PatientService {

   @GET
   @Produces(MediaType.APPLICATION_JSON)
   public List<Patient> getPatients() {
       return PatientDao.getInstance().getGiraffes();
   }

}
	   2. Husk at implementere en data-klasse (PatientDao) der kan returnere en liste af patienter
   3. Afprøv dit endpoint eks: 
http://localhost:8080/IT3ExampleProject_war/rest/patients 
Opgave 2 Brug data fra en hjemmeside
      1. Lav en index.html fil i en webapp folder under main
      2. Lav en knap og en unordered list:
<button onclick="hentPatienter();">test</button>
<ul id="patienter">
</ul>
	      3. Skriv en funktion - eks hentPatienter() der kalder backenden:

async function hentPatienter(){
  let result = await fetch("rest/patients");
   console.log(result.status)
   if (result.status!=200){
       alert("noget gik galt!");
   }
   let json = await result.json();
   console.log(json)
}
	         4. Hvad sker der? Får du et output i konsollen?
         5. Brug nu json-objektet til at lave en html liste:

let listelements =""
   json.forEach(function(element){
      listelements += ("<li>"+element.name+"</li>")
   })
	            6. Nu kan du komme listen ind i html-listen:

let list= document.getElementById("patienter");
   list.innerHTML=listelements
	               7. Virker det? Hvorfor? Kan du forklare hvad der sker?
Opgave 4 Opret en ny giraf
Nu vil vi lave en ny giraf!
               1. Tilføj en form med et name felt og en knap:

<form id="patientform">
   <input type="text" name="name">
</form>
<button onclick="opretGiraf()">Ny giraf</button>
	                  2. Skriv et javascript, der kan sende data som et json-objekt:

    let form= document.getElementById("patientform");
   let formData = new FormData(form)
   let patientJson = Object.fromEntries(formData);
   let res = await fetch("rest/patients", {
       method:"POST",
       body: JSON.stringify(patientJson),
       headers:{
           'content-type':"application/json"
       }
   })
	                     3. Implementér Backenden til. Der skal nok være et endpoint med ca. denne signatur. Jeg forventer at i selv kan implementere det:
 @POST
  @Consumes(MediaType.APPLICATION_JSON)
   public void postPatient(Patient p) {//...}
	                     4. Kan du få det til at virke? Ellers spørg!


Opgave 5 - Response ved fejl
Fortsæt med din Patient-service. Tilføj cpr nummer til patienten.
 Hvis et cpr allerede er i brug (patienten allerede er oprettet i systemet), så returnér et Response-objekt med en passende statuskode og en fornuftig besked.
                     1. Omskriv din metode til at returnere et Response-objekt i stedet. eks: 
        @POST
        @Consumes(MediaType.APPLICATION_JSON)
        public Response createPatient(Ingredient ingredient){
                //Implementation
}


Et response objekt kan oprettes således: 
Response.status(400).entity("message").build();


                     2. Test din løsning med reqbin!
                     3. Skriv din javaScript på hjemmesiden om, så den kan fange en fejl-besked - eks:   
 if (result.status!=200){
       alert("noget gik galt!");
   }
	                     4. Opgave 6 - WebApplicationException
Kast nu en WebApplicationException i stedet for et Response. Hvis id’et allerede findes så kast en WebApplicationException med din valgte statuskode.
WebApplicationException er en unchecked Exception - så man behøver ikke at erklære den i metode signaturen. Klassens konstruktør kan tage imod et Response objekt, så det kan genbruges fra opgave 1. 
Afprøv resultatet med reqbin.
Opgave 7 (optional) - ExceptionMapper
Kast nu din egen 'InvalidIdException' i stedet og brug en ExceptionMapper til at omdanne den til et Response. ExceptionMapper-løsningen er lidt mere kompleks til at starte med, men giver muligheden for at kaste applikationens egne Exceptions i stedet for WebApplicationExceptions. 
Implementer 2 klasser: En InvalidIdException som extender Exception og en InvalidIdExceptionMapper som implementerer ExceptionMapper<InvalidIdException>. Mapperen kræver en toResponse-metode, som skal returnere et Response med en statuskode. Husk at bruge annotationen @Provider på InvalidIdExceptionMapper klassen.
Ændr din ingredient-metode til at smide en InvalidIdException. Afprøv med Postman.


Opgave 8 
                     1. Implementér at man kan hente en patient med et specifikt cpr nummer. Metode-signaturen ser ca. sådan ud:
 @GET
   @Path("{cpr}")
   public Patient getPatient(@PathParam("cpr") String cpr){
	                     2. Implementer også gerne @DELETE for øvelsens skyld
