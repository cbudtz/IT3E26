# E22 62581Forelæsning - Lektion06

Source: Google Slides,
https://docs.google.com/presentation/d/1qN0mQqU4SEiresenGRdt7n_yHTLkjUyXKomb9JMiydw
(exported as plain text; slide-break formatting from the original is lost, but
all text content is preserved).

---

Lektion 06
Applikationslaget

Illustrationer fra: Computer Networking: A Top-Down Approach 8th Edition, Global Edition  Jim Kurose, Keith RossCopyright © 2022 Pearson Education Ltd

Agenda	
Applikationslaget
Netværksøvelser
Videre på øvelser fra igår

Nogle netværks applikationer
social networking
Web
text messaging
e-mail
multi-user network games
streaming stored video (YouTube, Hulu, Netflix) 
P2P file sharing
real-time video conferencing



Hvordan laver man en netværks-applikation?
write programs that:
run on (different) end systems
communicate over network
e.g., web server software communicates with browser software
no need to write software for network-core devices
network-core devices do not run user applications 
applications on end systems  allows for rapid app development, propagation



Klient-Server arkitektur
server: 
always-on host
permanent IP address
often in data centers, for scaling
clients:
contact, communicate with server
may be intermittently connected
may have dynamic IP addresses
do not communicate directly with each other
examples: 
HTTP, IMAP, FTP

Peer-2-Peer
no always-on server
arbitrary end systems directly communicate
peers request service from other peers, provide service in return to other peers
self scalability – new peers bring new service capacity, as well as new service demands
peers are intermittently connected and change IP addresses
complex management
example: P2P file sharing

Processes communicating


process: 
program running within a host
within same host, two processes communicate using  
inter-process communication (defined by OS)
processes in different hosts communicate by 
exchanging messages

Sockets
process sends/receives messages to/from its socket
socket analogous to door
sending process shoves message out door
sending process relies on transport infrastructure on other side of door to deliver message to socket at receiving process
two sockets involved: one on each side

Addressing processes - Sockets og Ports


to receive messages, process must have identifier
host device has unique 32-bit IP address
Is that enough?
Nope - Multiple processes can use the network
Solution: Ports!
Ports  (Socket identifier) :
example port numbers:
HTTP server: 80 
Mail server: 25
Tomcat: 8080
Program-adresse:
{IP}:{Port}
130.225.170.167:8080/ 

Application layer protocols
types of messages exchanged, 
e.g., request, response 
message syntax:
what fields in messages & how fields are delineated
message semantics 
meaning of information in fields
rules 
when and how processes send & respond to messages

Application layer protocols - examples
open protocols:
defined in RFCs, everyone has access to protocol definition
allows for interoperability
e.g., HTTP, HTTPS, SMTP
proprietary protocols:
e.g., Skype

Hvad har en applikation brug for?
data integrity
some apps (e.g., file transfer, web transactions) require 100% reliable data transfer 
other apps (e.g., audio) can tolerate some loss
timing
some apps (e.g., Internet telephony, interactive games) require low delay to be “effective”
throughput
some apps (e.g., multimedia) require minimum amount of throughput to be “effective”
other apps (“elastic apps”) make use of whatever throughput they get 
security
encryption, data integrity, 

Eksempler på krav fra applikationer

Internet transport protocols services (Laget under!)


TCP service:
reliable transport between sending and receiving process
flow control: sender won’t overwhelm receiver 
congestion control: throttle sender when network overloaded
does not provide: timing, minimum throughput guarantee, security
connection-oriented: setup required between client and server processes
UDP service:
unreliable data transfer between sending and receiving process
does not provide: reliability, flow control, congestion control, timing, throughput guarantee, security, or connection setup.

Applikationslags-protokoller og deres Transportlagsprotokoller

Securing TCP


Vanilla TCP & UDP sockets:
no encryption
cleartext passwords sent into socket traverse Internet  in cleartext (!)
Transport Layer Security (TLS) 
provides encrypted TCP connections
data integrity
end-point authentication
Implementeret i Applikationslaget!
Har et TLS-socket API
cleartext sent into socket  traverse Internet  encrypted

Web og HTTP
Web-side
Objekter: HTML, JPEG billeder, Lyd-filer
En base-html side
Refererer til resten af indholdet - "hyper-referencer"

HTTP overblik
HTTP: hypertext transfer protocol
Web’s application layer protocol
client/server model:
client: browser 
requests, receives, (using HTTP protocol) and “displays” Web objects 
server: Web server 
sends (using HTTP protocol) objects in response to requests



HTTP overblik
HTTP uses TCP:
client initiates TCP connection (creates socket) to server (url/ip),  port 80
server accepts TCP connection from client
HTTP messages (application-layer protocol messages) exchanged between browser (HTTP client) and Web server (HTTP server)
TCP connection closed


HTTP connections: two types


Non-persistent HTTP
TCP connection opened
at most one object sent over TCP connection
TCP connection closed
downloading multiple objects required multiple connections
Persistent HTTP
TCP connection opened to a server
multiple objects can be sent over single TCP connection between client, and that server
TCP connection closed

Non-persistent HTTP eksempel
www.someSchool.edu/someDepartment/home.index 

 

Non-persistent HTTP eksempel
www.someSchool.edu/someDepartment/home.index 

 

Non-persistent HTTP: Svartid


RTT (definition): time for a small packet to travel from client to server and back
HTTP response time (per object):
one RTT to initiate TCP connection
one RTT for HTTP request and first few bytes of HTTP response to return
object/file transmission time
Non-persistent HTTP response time =  2RTT+ file transmission time

Persistent HTTP (HTTP 1.1+)
Persistent  HTTP (HTTP1.1):
server leaves connection open after sending response
subsequent HTTP messages  between same client/server sent over open connection
client sends requests as soon as it encounters a referenced object
as little as one RTT for all the referenced objects (cutting response time in half)



HTTP: Request syntaks
Headers + Body

HTTP Request skema

Andre HTTP requests - Verbs
POST (Create)
Send (form) data
GET (Read)
Hent data
(Hent hjemmeside)
PUT (Update)
Opdater data
DELETE
Slet data

… Vigtige senere til At sende data til backend
HEAD
Kun headers
OPTIONS
Hvilke Verbs er mulige?

HTTP Response syntaks

HTTP Response status koder
200 OK
request succeeded, requested object later in this message
3xx Redirect 
301 Moved Permanently
requested object moved, new location specified later in this message (in Location: field)
4xx Client error
400 Bad Request
request msg not understood by server
403 Forbidden
404 Not Found
requested document not found on this server
5xx Server error
500 Internal server error
505 HTTP Version Not Supported

Cookies - Til Application state
HTTP er Stateless 
Serveren og klienten ved ikke hvor langt man er nået
Løsning: Cookies
1) cookie header line of HTTP response message
2) cookie header line in next HTTP request message
3) cookie file kept on user’s host, managed by user’s browser
4) back-end database at Web site

Cookies

Hvad bliver cookies brugt til?
authorization
shopping carts
recommendations
user session state (Web e-mail)

Tracking!
Cookiedirektivet
GDPR
Meta-data er ligeså stor en industri som oliebranchen!

Web cache (proxy servers)
Fremskudt server
Nedsætter forsinkelse
Aflaster hoved-server
Kontakter kun hoved-server, hvis data er gamle

DNS: Internettets telefonbog...
Domain Name System

DNS: Domain Name System


Computere er identificeret med IP-addresser
Ingen kan huske dem... 

DNS
Distribueret database
Hierarki af servere
Applikationslags-protokol
Oversætter domæne-navne til IP-adresser
Incl. Alias'er, Mail-Servere

DNS
Hvorfor Distribueret database
Intet single point of failure
Ellers komplet umuligt at skalere 
Comcast: 600 mia DNS requests om dagen!

Hierarki
Rækkefølge:
client queries root server to find .com DNS server
client queries .com DNS server to get amazon.com DNS server
client queries amazon.com DNS server to get  IP address for www.amazon.com

DNS root name servers
Øverste autoritet
13 server-klynger
Internettet kan ikke fungere uden!
ICANN Styrer dem
(Internet Corporation for Assigned Names and Numbers) 

Top-Level Domain (TLD) servers
TLD - Styrer:
.dk, .com, .org, .net, .edu, .aero, .jobs, .museums, and all top-level country domains, e.g.: .cn, .uk, .fr, .ca, .jp
Danmark:https://www.dk-hostmaster.dk/da 


Authoritative og Loacal DNS servers
Organisationernes egne DNS-servere
Alle kan opstille dem
Local
Ikke med i hierarkiet
Når computeren får en IP-adresse følger DNS med (Fra DHCP serveren)
Local cache

2 måder at finde IP med DNS
Iterativ - 
local dns går igennem alle skridt

2 måder at finde IP med DNS
Rekursiv - 
Hver server spørger den næste



Caching af DNS
En DNS record har en TTL
Time to Live
Computeren gemmer ip'en indtil udløb
Hvis man flytter IP tager det op til TTL før alle ved det!
Gamle IP'er
Typisk timer

DNS records
A: 
name is hostname
value is IPv4 address
AAAA:
samme, men IPv6
NS: NameServer
name is domain (e.g., foo.com)
value is hostname of authoritative name server for this domain
CNAME: Canonical Name 
name is alias
value: real name
eks: www.ibm.com viderestiller til servereast.backup2.ibm.com 
MX:
name: mail-adresse (gmail.com)
value: mailserver (mail1.google.com)

DNS protokol
DNS har selvfølgelig også en protokol
… Vi går ikke i detaljer med den...
