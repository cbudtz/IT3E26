# E22 62581 Øvelser - Lektion11

Source: Google Docs,
https://docs.google.com/document/d/1SQ8IMjNgEOWtY4LGSTlnMOSPGpKGo_oQ23bUqPg_sZU

---

Øvelser - Lektion 11
Opsamling
Hvis du ikke nåede i mål i sidste uge så fortsæt med JavaScript øvelserne. Spørg endelig, hvis der uklarheder/problemer!!


Har du mod på ekstra så kig på debugging : https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/#debugging 


Serialisering af data - Java-Object Serializer
Klon projektet fra github: https://github.com/cbudtz/XMLserialiser.git  - Husk at vælge trust Maven project
1. Prøv at køre main() i JavaSerializer-klassen.
2. Forklar:
   1. Hvad gør main metoden?
   2. Hvad gør de to private metoder?
3. Find output-filen
   1. Åbn den med en text-editor
   2. Hvad indeholder den?
   3. Er det nemt at læse?
   4. Er der nogen problemer mht kompatibilitet med andre programmeringssprog?
Standardiseret serialisering af data - XML
Lav en tilsvarende klasse der serialiserer data til XML
1. I pom.xml er allerede et xml-serialiserings-bibliotek - fasterxml
2. Skriv en klasse -XML-serializer.
3. Lav en main metode der
4. Opretter et User-objekt (Ligesom i Java-Serializeren)
5. Opretter et XMLMapper-objekt med
XmlMapper mapper = new XmlMapper();
6. Prøv nu at konvertere user objektet til xml med
String xmlString = mapper.writeValueAsString(user);
NB: Du skal nok bruge en try-catch...
   7. Udskriv strengen til konsollen
   8. Hvordan ser det ud?
   9. Prøv nu at gemme det til en fil med:
mapper.writeValue(new File("User.xml"),user);
   10. Find output filen 
   11. Er indholdet læseligt?
      1. Optional: du kan prøve at indsætte
mapper.enable(SerializationFeature.INDENT_OUTPUT);
efter at du opretter mapper-objektet - så bliver det endnu pænere;
         12. Prøv nu at tilføje kode til at indlæse objektet fra XML
           User userFromXML = mapper.readValue(new File("User.xml"), User.class);
            System.out.println("Read from XML: ");
            System.out.println(userFromXML);
            13. Snedigt ikke?


XML over netværk
Servlet der svarer med xml
Kig evt. på Lektion 7 for at genopfriske HTTPServlets. 
            1. Tilføj war-plugin'et til pom.xml (hvis det ikke allerede er der):
<plugin>
   <groupId>org.apache.maven.plugins</groupId>
   <artifactId>maven-war-plugin</artifactId>
   <version>3.3.2</version>
</plugin>


               2. Konfigurer det til at være et web projekt ved at tilføje 
<packaging>war</packaging>
eks:
   <groupId>gruppe01</groupId>
    <artifactId>XMLserialiser</artifactId>
    <version>1</version>
    <packaging>war</packaging>
                  3. Tilføj også servlet-api dependency'et
<dependency>
   <groupId>jakarta.servlet</groupId>
   <artifactId>jakarta.servlet-api</artifactId>
   <version>5.0.0</version>
</dependency>


                     4. Kør nu en maven package for at checke at der bliver lavet en .war fil:
  
                     5. Lav nu en servlet, der kan sende noget XML:

@WebServlet(name = "xmlservlet",urlPatterns = "/api")
public class XMLServlet extends HttpServlet {
   XmlMapper mapper = new XmlMapper();
   @Override
   protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
       User user = new User();
       user.setPassWord("Test Pass");
       user.setUserName("Test User");
       String xmlString = mapper.writeValueAsString(user);
       PrintWriter writer = resp.getWriter();
       writer.write(xmlString);
       writer.flush();
   }
}
	                        6. Konfigurer nu jeres tomcat server (Se Øvelser - Lektion07):
                        1. Husk at sætte den til at deploye jeres war
                        7. Kør jeres server og test at det virker! (eks:)
http://localhost:8080/XMLserialiser_war/api 
  
                        8. Spørg hvis det ikke fungerer!
Hurra - vi kan nu sende data over netværket - det bliver nyttigt når vi skal udveksle data med andre grupper!
Servlet der kan tage imod XML
                           1. Prøv nu at skrive noget kode, så din servlet kan tage imod XML:

    @Override
   protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
       User user = mapper.readValue(req.getInputStream(), User.class);
       System.out.println(user);
       resp.getWriter().write("Tak for brugeren: " + user);
   }
	                              2. Genstart din Tomcat-server og check at det virker ved at Bruge den indbyggede http-klient i IntelliJ - Den kræver bare en .http fil i dit projekt. (eks: Test.http)
Indsæt noget gyldig testdata i Content, en URL i adressebaren og skift til POST
  



                                 3. Prøv at trykke Send - virkede det? Ellers spørg!
                                 4. Optional: Prøv også at skrive et lille Java-program, der kan teste POST til din servlet. Her er noget kode til inspiration

URL url = new URL("http://localhost:8080/XMLserialiser_war/api");
HttpURLConnection http = (HttpURLConnection)url.openConnection();
http.setRequestMethod("POST");
http.setDoOutput(true);
http.setRequestProperty("Content-Type", "application/xml");

String data = "<User><userName>Test User</userName><passWord>Test Pass</passWord></User>";
byte[] out = data.getBytes(StandardCharsets.UTF_8);

OutputStream stream = http.getOutputStream();
stream.write(out);

System.out.println(http.getResponseCode() + " " + http.getResponseMessage());
http.disconnect();
