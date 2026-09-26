# E22 62581 Forelæsning - Lektion07

Source: Google Slides,
https://docs.google.com/presentation/d/1qfz2f-kFaXYACX5hHw_cxty_G9ZKwmbhhy3jVx_s4nQ
(exported as plain text; slide-break formatting from the original is lost, but
all text content is preserved).

---

Lektion 07
Web: Dynamiske sider I 


Agenda	
Sockets
Hvordan bruger man dem i praksis?
Webservere i Java
WAR og JAR
Streams 
Lav jeres første dynamiske side
Brandøvelse kl. 10.15 🚒


Sockets i praksis
Applikationens interface med internettet
Port nummer
TCP/UDP
IP
Server Applikationen behøver ikke at kende sin ip
Klienten skal vide ip
Hvorfor?

Java-Sockets
TCP
Socket
ServerSocket
UDP
DatagramSocket 
(Uheldigt navn)
Ikke en direkte forbindelse til Netværkslaget
Message
Segment
Datagram/Packet
Frame
Bits

TCP sockets
Serversocket
Socket der venter på en forbindelse
ServerSocket = new ServerSocket(port)
Socket.accept() 
Blokerer og venter
Returnerer et Socket object når der opstår forbindelse
Forbindelsen fortsætter på et separat socket-objekt!



TCP socket - Streams
Duplex - Både input og output
InputStream inputStream = activeSocket.getInputStream();
Giver en Stream - Dynamisk object
byte[] bytes = inputStream.readAllBytes();
OutputStream outputStream = activeSocket.getOutputStream();
.write(byte[])
Sender med .flush();




Streams og readers
Streams er upraktisk
InputStreamReader inputStreamReader = new InputStreamReader(inputStream);
BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
String s = bufferedReader.readLine();


Streams og Writers
PrintWriter printWriter = new PrintWriter(outputStream);
printWriter.print("HTTP/1.1 200\r\n");
printWriter.close();

TCP klient socket
Tager initiativet
Er nødt til at kende en adresse og en port
Socket socket = new Socket("localhost",9876);
Ellers helt identisk med activeSocket


UDP
Den venter vi lidt med

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

Servlets - Eksempel


Request parametre
somePage.html?param1=hello&param2=world
param1=hello og param2=world

Request headers
HTTP headers (Hvis man synes at de er spændende)
String contentLength = request.getHeader("Content-Length");

Request Stream
InputStream inStream= request.getInputStream();  
Hvis man gerne vil have fat i den rå stream

Response
Writer
PrintWriter writer = response.getWriter();
Headers
response.setHeader("Header-Name", "Header Value");
Rå stream
OutputStream outputStream = response.getOutputStream();
Redirect
response.sendRedirect("login.html")

Cookies
Cookie cookie = new Cookie("myCookie", "myCookieValue");
cookie.setMaxAge(24 * 60 * 60);  // 24 hours. 
response.addCookie(cookie);
Cookie[] cookies = req.getCookies();

Session objektet
Cookie - link til brugeren
Bevares mellem requests.
Giver mulighed for state
HttpSession session = request.getSession();
session.setAttribute("userName", "theUserName");
String userName = (String) session.getAttribute("userName");


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

War med Maven
Fast struktur
Sørger for at war-filen bliver korrekt 

Tomcat og War filer
Tomcat som standard konfigureret til
Udpakke .war filer i /webapps
grp2.war bliver udpakket til webapps/grp2
bliver vist på localhost:8080/grp2
ROOT.war bliver vist på localhost:8080


Pause

Lagdelte arkitekturer
Tynd Klient
Kun View er på Klient siden
Tyk klient 
Flere lag på klienten
Javascript mm
Mere om det senere

Lagdelte arkitekturer
Tynd Klient
Kun View er på Klient siden
Tyk klient 
Flere lag på klienten
Javascript mm
Mere om det senere

Streams
Input og output
Sockets
Keyboard
Filer
Printere
Hukommelse

Tastatur

Filer

Streams er ens - abstraktion over input og output
Giver alle en outputstream
socket.getOutputStream();
new FileOutputStream(new File("filename"));
new PrintStream(System.out);
