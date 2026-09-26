# E22 62581 Forelæsning - Lektion 26

Source: Google Slides,
https://docs.google.com/presentation/d/1N540ll8J_VpouLwjysxIDviuDMhfO2AIralax4mNBCg
(exported as plain text; slide-break formatting from the original is lost, but
all text content is preserved).

---

Lektion 26 - Recap - Netværk
Introduktion til Netværk 1

Læringsmål
beskrive og forklare netværkskomponenter og kommunikationen fra en computer til en anden over Internettet.
beskrive og forklare metoder og protokoller i Internetprotokolstakken, adressering i IP-baserede netværk samt et programs anvendelse af protokoller i applikationslag og transportlag.
anvende væsentlige værktøjer og metoder til analyse af trafik og fejl på et netværk.
udvikle konfigurerbare, lagdelte applikationer der anvender filer og kommunikerer over et netværk.
sammenligne metoder og services i de forskellige protokoller i TCP/IP protokolstakken samt vurdere protokollers anvendelse til bestemte formål.
deltage i en faglig diskussion indenfor fagområdet.

Eksamensspørgsmål i netværk
Følger Lærebogen næsten fuldstændigt

Computernetværk og internettet


Hosts, Switches, Routers, Forbindelser (Kabler, Lysledere, Radio), Protokoller, ISP'er IXP…

Hvad er Internettet?!!?
Mia af forbundne enheder
Hosts ~End systemer med apps
Packet Switches
Routers 
Switches
Links
Fiber, optisk, radio…
Båndbredde
Netværk
Samarbejdende

Hvad er Internettet?!!?
Netværk af netværk
Tonsvis af protokoller til kommunikation
HTTP
TCP
IP
OSPF
WIFI
Ethernet

Links
Bit: Høj spænding/lav spænding, ændringer i lys/radiosignal
Physical link: 
Hvad forbinder sender og modtager
Guided media: 
Kobber, Fiber, Coax
Unguided media: 
Radio-signaler



Computernetværk og internettet


Packet netværk vs Circuit netværk - Frequency Division Multiplexing, Time Division Multiplexing

Packet switching
Transmission delay
L/R at sende ud på mediet
Store and forward
Hele pakken skal opbevares på routeren før den kan sendes videre
End-end delay
2*L/R (Ovenfor)

Queuing delay og loss
Hvis pakkerne ankommer hurtigere end de kan sendes => 
Queuing delay
Loss
(Når bufferen er fuld)
(Mere om det senere)

Circuit switching
Reserveret linje
Sikrer mod fejl
Queue loss
Ineffektivt!
Bliver kun sendt noget mellem 2 computere


Hvordan deler man en forbindelse?
FDM Frequency Division Multiplexing
Hver sin kanal/frekvensbånd
TDM: Time Division Multiplexing
"Tag tur" - Klinter skiftes
Kan kombineres



Packet vs Circuit switching
Packet Pro's
Packet switching tillader flere at bruge det samme netværk
Linjen kan udnyttes optimalt
Cons
Congestion (Forstoppelse)
Forsinkelser
Tab
Båndbredde garantier? (QoS)

Netværksegenskaber


Delay (Processing, Queuing, Transmission, Propagation), 
Packet Loss
Båndbredde



Forsinkelser i internettet - 4 stk
Processing
Den tid computeren/routeren skal bruge på at håndtere pakken
Transmission
Den tid det tager at sende pakken ud på mediet - 
afhængig af båndbredde
Propagation
Hastigheden i mediet
Max: lyshastighed ~300.000 km/s
Queue
Tiden som pakken venter i kø i netværks-knuden
Afhængig af trafikken i netværket

Processing
Check af bit-fejl
Afgøre output link 
Fra forwarding table
Typisk  <1 msec


Transmission
Den tid det tager at afsende pakken
L: packet length
R: Transmission Rate /Båndbredde
dtrans = L/R 
eks. 12.000 bit/100.000.000 bit/s ~0,1 msec

Propagation
Den tid det tager at transportere pakken i mediet (kablet/lyslederen)
dprop = d/s
d: distancen ~længden af kablet
s: hastighed i mediet ~2*108 m/s
eks: 2000 km/200.000km/s ~ 10 ms 
Som regel meget større end dtrans og dproc

Queuing
Ventetiden på ouput-linket / i bufferen
Varierer! 
Afhænger af congestion - trafiksituationen

Queuing delay
R: link bandwidth (bps)
L: packet length (bits)
a: average packet arrival rate

La/R ~ 0: gns. queueing delay lille
La/R → 1: gns. queueing delay stort
La/R > 1: Mere end kapaciteten!->  average delay infinite!
Pakker bliver droppet

Netværksegenskaber
Lagdeling i Internettet (Application, Transport, Network, Link, Physical)
Ansvarsområder



Multi-tier network
Top Level (Globale) ISP'er
Konkurrence
IXP'er
Content provider networks

Multi-tier internet
Regionale ISP'er - Eks. Globalconnect
Multinationale ISP'er
Andre aktører
Google
Amazon
Akamai

Internet protokol stacken
Application: supporting network applications
IMAP, SMTP, HTTP
Transport: process-process data transfer
TCP, UDP 
Port - angiver hvilken process (program) der er modtager/afsender
Network: routing of datagrams from source to destination
Routing protocols
IP-addresse - Angiver hvilken host, der afsender/modtager
Link: Data transfer between neighboring  network elements
Ethernet, 802.11 (WiFi), PPP
MAC-adresse -Angiver hvilket netværkskort der afsender/modtager
Physical: bits “on the wire”
010101110
application

transport

network

link

physical

Hvorfor lagdeling?
Håndtere kompleksitet
Separation of Concerns
Hver del kan håndteres separat
Hvert lag behøver ikke 
~Postbuddet behøver ikke 
Kende indholdet i brevet (Sprog, Modtager)
Vide hvad der sker med brevet efter postkontoret.. (Postkontorer i andre dele af verdenen)
application

transport

network

link

physical

Applikationslaget
Processer, Client-Server, sockets (UDP/TCP), Pålidelig overførsel, Timing, Sikkerhed



Processes communicating


process: 
program running within a host
within same host, two processes communicate using  
inter-process communication (defined by OS)
processes in different hosts communicate by 
exchanging messages

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

Sockets
process sends/receives messages to/from its socket
socket analogous to door
sending process shoves message out door
sending process relies on transport infrastructure on other side of door to deliver message to socket at receiving process
two sockets involved: one on each side

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

Eksempler på krav fra applikationer

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

Applikationslaget
HTTP - GET/POST, Url, Content-type, Fejlkoder, Cookies, Web Cache

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

HTTP: Request syntaks
Headers + Body

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

Web cache (proxy servers)
Fremskudt server
Nedsætter forsinkelse
Aflaster hoved-server
Kontakter kun hoved-server, hvis data er gamle

Applikationslaget


DNS - DNS-hierarki (root, tld, authoritative), Caching

DNS
Distribueret database
Hierarki af servere
Applikationslags-protokol
Oversætter domæne-navne til IP-adresser
Incl. Alias'er, Mail-Servere

Hierarki
Rækkefølge:
client queries root server to find .com DNS server
client queries .com DNS server to get amazon.com DNS server
client queries amazon.com DNS server to get  IP address for www.amazon.com

2 måder at finde IP med DNS
Iterativ - 
local dns går igennem alle skridt

2 måder at finde IP med DNS
Iterativ - 
local dns går igennem alle skridt

Caching af DNS
En DNS record har en TTL
Time to Live
Computeren gemmer ip'en indtil udløb
Hvis man flytter IP tager det op til TTL før alle ved det!
Gamle IP'er
Typisk timer

Applikationslaget
Implementering i Java. Socket. Server Socket, DatagramSocket. Streams.

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




TCP klient socket
Tager initiativet
Er nødt til at kende en adresse og en port
Socket socket = new Socket("localhost",9876);
Ellers helt identisk med activeSocket


Transportlaget
Hosts, Ports 
Multiplexing/Demultiplexing.
Best-Effort, Pålidelighed.



Transportlaget
Logisk kommunikation mellem Applikationer
På forskellige hosts
Opdeler Applikationslags-meddelelser (messages)
Segments
Videresender til Netværkslaget
packets / datagrams
Samler beskeder fra Netværkslaget
To dominerende protokoller
TCP, UDP

Multiplexing og Demultiplexing
Multiplexing
Kombination af flere signaler over samme medie
Demultiplexing
Opsplitning af et signal i flere signaler
Mux/Demux i transportlaget
Flere applikationer anvender samme internetforbindelse
Sockets/Ports

Demultiplexing
Host modtager IP datagram/packet
Datagram har modtager IP og afsender IP
Datagrammet indeholder et TCP/UDP Segment
Segmentet har modtager og afsender port
Host bruger IP/Port til at aflevere til rette socket/process

UDP
'Rent nødvendige' Internet transport protocol
“best effort” service - Segmenter kan blive
Tabt
Leverer i forkert rækkefølge
connection-less:
Intet handshake mellem UDP sender, receiver
Hvert UDP segment håndteres uafhængigt
Fleksibel
Valgfrihed mht ekstra funktionalitet
eks. In-order
Retransmission

Transportlaget


Connectionless: UDP vs.  
Connection oriented: TCP 
TCP protokoller, Pipelined protocol, Flow control.

Pipelining

Go-Back-N:sender
Sender window
Op til N pakker undervejs
Hver har et sekvens nummer
Cumulative ACKs
Når alle pakker inden n er ACK'ed → window rykker til n+1


TCP flow control
Hvad hvis data ankommer hurtigere end applikationen kan tømme buffers??

TCP flow control
Modtager annoncerer buffer plads!
Afsender begrænser data undervejs
→ Garanterer at bufferen hos Modtager ikke bliver overfyldt og pakker går tabt

TCP flow control
IKKE det samme som congestion control
Virker kun hos sender
Hjælper ikke hvis det er routere på vejen, der bliver fyldt
Undgår Pakke tabt
Congestion control virker først når der ER pakketab

Transportlaget
Congestion control, TCP -Fairness med TCP Congestion Control



Hvad skaber congestion?

Max hastighed bliver nået
Delay går mod uendeligt

Congestion 
Throughput kan ikke overstige kapacitet
Delay stiger dramatisk når man nærmer sig kapaciteten
Tab og retransmission mindsker effektivt throughput
Unødvendige retransmissioner mindsker effektivitet
Upstream kapacitet bliver spildt når pakker tabes downstream

Metoder - End-end congestion control


Ingen explicit feedback fra netværk
Tab udledes fra observeret tab og delay
Måden TCP virker på

Retransmission scenarier

TCP congestion control: AIMD
approach: senders can increase sending rate until packet loss (congestion) occurs, then decrease sending rate on loss event
AIMD sawtooth
behavior: probing
for bandwidth
TCP sender  Sending rate
time
increase sending rate by 1 maximum segment size every RTT until loss detected
Additive Increase
cut sending rate in half at each loss event

Multiplicative Decrease
Transport Layer: 3-67
67

Q: is TCP Fair?
Example: two competing TCP sessions:
additive increase gives slope of 1, as throughout increases
multiplicative decrease decreases throughput proportionally 
R
R
equal bandwidth share
Connection 1 throughput
Connection 2 throughput
congestion avoidance: additive increase
loss: decrease window by factor of 2
congestion avoidance: additive increase
loss: decrease window by factor of 2
A: Yes, under idealized assumptions:
same RTT
fixed number of sessions only in congestion avoidance 
Is TCP fair?
Transport Layer: 3-68
68

Netværkslaget
Forwarding og Routing
Router arkitektur



Network layer: data plane, control plane
Data plane:
local, per-router function
determines how datagram arriving on router input port is forwarded to router output port

Control plane
network-wide logic
determines how datagram is routed among routers along end-end path from source host to destination host

1
2
3
0111
values in arriving 
packet header
two control-plane approaches:
traditional routing algorithms: implemented in routers
software-defined networking (SDN): implemented in (remote) servers

Transport Layer: 3-70
70

Router architecture overview
high-level view of generic router architecture:
high-speed 
switching
fabric
routing 
processor
router input ports
router output ports
forwarding data plane  (hardware) operates in nanosecond timeframe
routing, management
control plane (software)
operates in millisecond 
time frame
Transport Layer: 3-71
71

Input port functions
switch
fabric
line
termination
physical layer:
bit-level reception
link 
layer 
protocol
(receive)
link layer:
e.g., Ethernet
(chapter 6)
lookup,
forwarding


queueing
decentralized switching: 
using header field values, lookup output port using forwarding table in input port memory (“match plus action”)
goal: complete input port processing at ‘line speed’
input port queuing: if datagrams arrive faster than forwarding rate into switch fabric
Transport Layer: 3-72
72

Longest prefix matching
when looking for forwarding table entry for given destination address, use longest address prefix that matches destination address.
longest prefix match
Destination Address Range                        
11001000  00010111  00010
11001000  00010111  00011***
11001000  00010111  00011000
otherwise             
Link interface
0
1
2
3
********
***
********
********
11001000  00010111  00011000  10101010 
examples:
which interface?
which interface?
11001000  00010111  00010110  10100001 
Transport Layer: 3-73
73

Switching fabrics
bus
memory
memory
interconnection
network
three major types of switching fabrics:
transfer packet from input link to appropriate output link

switching rate: rate at which packets can be transfer from inputs to outputs
often measured as multiple of input/output line rate
N inputs: switching rate N times line rate desirable
Transport Layer: 3-74
74

Weighted Fair Queuing (WFQ): 
generalized Round Robin
Scheduling policies: weighted fair queueing
classify 
arrivals
departures
link
R
w1
w2
w3
wi
Σjwj
minimum bandwidth guarantee (per-traffic-class)
each class, i, has weight, wi, and gets weighted amount of service in each cycle:
Transport Layer: 3-75
75

IPv4 og IPv6, Subnets, NAT
DHCP


Netværkslaget

IP Datagram format
ver
length
32 bits
payload data 
(variable length,
typically a TCP 
or UDP segment)
16-bit identifier
header
 checksum
time to
live
source IP address
head.
len
type of
service
flgs
fragment
 offset
upper
 layer
destination IP address
options (if any)
IP protocol version number
header length(bytes)
upper layer protocol (e.g., TCP or UDP)
total datagram
length (bytes)
“type” of service:
diffserv (0:5)
ECN (6:7)
 
fragmentation/
reassembly
TTL: remaining  max hops
(decremented at each router)
20 bytes of TCP
20 bytes of IP
= 40 bytes + app layer overhead for TCP+IP
overhead
e.g., timestamp, record route taken
32-bit source IP address
32-bit destination IP address
header checksum
Maximum length: 64K bytes
Typically: 1500 bytes or less
Transport Layer: 3-77
77

Subnets
223.1.1.1
223.1.1.2
223.1.1.3
223.1.1.4
223.1.2.9
223.1.2.2
223.1.2.1
223.1.3.2
223.1.3.1
223.1.3.27
What’s a subnet ?
device interfaces that can physically reach each other without passing through an intervening router
"Området mellem 2 IP'er"
                   
              
network consisting of 3 subnets
IP addresses have structure: 
subnet part: devices in same subnet have common high order bits
host part: remaining low order bits 

Transport Layer: 3-78
78

DHCP client-server scenario
DHCP server: 223.1.2.5
Arriving client
DHCP discover
src : 0.0.0.0, 68     
dest.: 255.255.255.255,67
yiaddr:    0.0.0.0
transaction ID: 654
DHCP offer
src: 223.1.2.5, 67      
dest:  255.255.255.255, 68
yiaddr: 223.1.2.4
transaction ID: 654
lifetime: 3600 secs
DHCP request
src:  0.0.0.0, 68     
dest::  255.255.255.255, 67
yiaddr: 223.1.2.4
transaction ID: 655
lifetime: 3600 secs
DHCP ACK
src: 223.1.2.5, 67      
dest:  255.255.255.255, 68
yiaddr: 223.1.2.4
transaction ID: 655
lifetime: 3600 secs
Broadcast: is there a DHCP server out there?
Broadcast: I’m a DHCP server! Here’s an IP address you can use 
Broadcast: OK.  I would like to use this IP address!
Broadcast: OK.  You’ve got that IP address!
The two steps above can be skipped “if a client remembers and wishes to reuse a previously allocated network address” [RFC 2131]
Transport Layer: 3-79
79

DHCP: more than IP addresses
DHCP can return more than just allocated IP address on subnet:
address of first-hop router for client
name and IP address of DNS sever
network mask (indicating network versus host portion of address)

Transport Layer: 3-80
80

NAT: network address translation
S: 10.0.0.1, 3345
D: 128.119.40.186, 80
1
10.0.0.4
138.76.29.7
1: host 10.0.0.1 sends datagram to 128.119.40.186, 80
NAT translation table
WAN side addr        LAN side addr
138.76.29.7, 5001   10.0.0.1, 3345
……                                         ……
S: 128.119.40.186, 80 
D: 10.0.0.1, 3345

4
S: 138.76.29.7, 5001
D: 128.119.40.186, 80
2
2: NAT router changes datagram source address from 10.0.0.1, 3345 to 138.76.29.7, 5001,
updates table
S: 128.119.40.186, 80 
D: 138.76.29.7, 5001

3
3: reply arrives, destination address: 138.76.29.7, 5001
10.0.0.1
10.0.0.2
10.0.0.3
                   
              
Transport Layer: 3-81
4: NAT Router changes , destination address: 10.0.0.1, 3345
81

not all routers can be upgraded simultaneously
no “flag days”
how will network operate with mixed IPv4 and IPv6 routers? 
Transition from IPv4 to IPv6
IPv4 source, dest addr 
IPv4 header fields 
IPv4 datagram
IPv6 datagram
IPv4 payload 
UDP/TCP payload
IPv6 source dest addr
IPv6 header fields
tunneling: IPv6 datagram carried as payload in IPv4 datagram among IPv4 routers (“packet within a packet”)
tunneling used extensively in other contexts (4G/5G)

Transport Layer: 3-82
82

Link-State vs. Distance-Vector
Intra-AS vs Inter-AS Routing
OSPF vs BGP


Netværkslaget - Routing Algoritmer 

Routing protocol goal: determine good routes,
through network of routers
route/path: routers packets traverse 
good: 
least cost, 
fastest
least congested
Routing protocols
mobile network
enterprise
          network
national or global ISP
datacenter 
network
                   
              
                   
              
                   
              
                   
              
                   
              
                   
              
                   
              
                   
              
                   
              
                   
              
                   
              
application
transport
network
link
physical
application
transport
network
link
physical
                   
              
                   
              
                   
              
                   
              
network
link
physical
network
link
physical
network
link
physical
network
link
physical
network
link
physical
                   
              
Transport Layer: 3-84
84

Graph abstraction: link costs
Transport Layer: 3-85
graph: G = (N,E)

ca,b: cost of direct link connecting a and b
             e.g., cw,z = 5, cu,z = ∞
cost 
defined by network operator
1?
inversely related to bandwidth
inversely related to congestion
N (nodes): set of routers = { u, v, w, x, y, z }
E (edges): set of links ={ (u,v), (u,x), (v,x), (v,w), (x,w), (x,y), (w,y), (w,z), (y,z) }
85

Dijkstra’s algorithm: an example
Transport Layer: 3-86
D(w),p(w)
5,u
4,x
3,y
3,y
resulting least-cost-path tree from u:
resulting forwarding table in u:
v
x
y
w
x
(u,v)
(u,x)
(u,x)
(u,x)
(u,x)
destination
outgoing link
route from u to v directly
route from u to all other destinations via x 
86

Bellman-Ford Example
Transport Layer: 3-87
u
y
z
2
2
1
3
1
1
2
5
3
5
Suppose that u’s neighboring nodes, x,v,w, know that for destination z:
Du(z) = min { cu,v + Dv(z),
                    cu,x + Dx(z),
                    cu,w + Dw(z) }
Bellman-Ford equation says:
Dv(z) = 5
v
Dw(z) = 3
w
Dx(z) = 3
x
= min {2 + 5,
           1 + 3,
           5 + 3}  = 4
node achieving minimum (x) is next hop on estimated least-cost path to destination (z)

Hierarchical OSPF
Transport Layer: 3-88
two-level hierarchy: local area, backbone.
link-state advertisements flooded only in area, or backbone
each node has detailed area topology; only knows direction to reach other destinations

area border routers: “summarize” distances  to destinations in own area, advertise in backbone
area 1
area 2
area 3
backbone
internal
routers
                   
              
                   
              
                   
              
                   
              
                   
              
                   
              
                   
              
                   
              
                   
              
                   
              
                   
              
                   
              
                   
              
                   
              
                   
              
backbone router: runs OSPF limited to backbone
boundary router: connects to other ASes
local routers: 
flood LS in area only
compute routing within area
forward packets to outside via area border router

2b
2d
2c
2a
AS 2
3b
3d
3c
3a
AS 3
1b
1d
1c
1a
AS 1
  X
Hot potato routing
Transport Layer: 3-89
2d learns (via iBGP) it can route to X via 2a or 2c
hot potato routing: choose local gateway that has least intra-domain cost (e.g., 2d chooses 2a, even though more AS hops to X): don’t worry about inter-domain cost!
AS3,X 
AS1,AS3,X 
OSPF link weights
201
112
263

Netværksadaptorer, Error detection, Multiple access Links, TDM og FDM,
Linklaget

Where is the link layer implemented?
in each-and-every host
network interface card (NIC) (or chip)
Ethernet, WiFi card or chip
implements link, physical layer
attaches into host’s system buses
combination of 
hardware, 
software, 
firmware
controller
physical

cpu
memory
host bus 
(e.g., PCI)
network interface
application
transport
network
link
link
physical
Transport Layer: 3-91
91

controller
physical

memory
CPU
Interfaces communicating
controller
physical

cpu
memory
application
transport
network
link
link
physical
application
transport
network
link
link
physical
sending side:
encapsulates datagram in frame
adds 
error checking bits, 
reliable data transfer, 
flow control, etc.
receiving side:
looks for errors, reliable data transfer, flow control, etc.
extracts datagram, passes to upper layer at receiving side
linkh
linkh
datagram
datagram
datagram
Transport Layer: 3-92
92

Error detection
Transport Layer: 3-93
EDC: error detection and correction bits (e.g., redundancy)
D:  data protected by error checking, may include header fields 
Error detection not 100% reliable!
protocol may miss some errors, but rarely
larger EDC field yields better detection and correction
datagram
D
EDC
d data bits
bit-error prone link
D’
EDC’
all
bits in D’
OK
?
N
detected 
error
otherwise
datagram

Multiple access links, protocols
Transport Layer: 3-94
two types of “links”:
point-to-point
point-to-point link between Ethernet switch, host
PPP for dial-up access
broadcast (shared wire or medium)
old-fashioned Ethernet
upstream HFC in cable-based access network
802.11 wireless LAN, 4G/4G. satellite

shared wire (e.g., 
cabled Ethernet)
shared radio: WiFi
shared radio: satellite 
humans at a cocktail party 
(shared air, acoustical)
shared radio: 4G/5G
94

Linklaget
Linklags-protokoller: Random access, Taking turns - 
Forskellige medier og Collisions
Slotted Aloha, CSMA/CD



 Summary of MAC protocols
Transport Layer: 3-96
channel partitioning, by time, frequency or code
Time Division, Frequency Division
random access (dynamic), 
ALOHA, S-ALOHA, CSMA, CSMA/CD
carrier sensing: easy in some technologies (wire), hard in others (wireless)
CSMA/CD used in Ethernet
CSMA/CA used in 802.11
taking turns
polling from central site, token passing
Bluetooth, (FDDI), token ring 
96

Random access protocols
Transport Layer: 3-97
when node has packet to send
transmit at full channel data rate R.
no a priori coordination among nodes
two or more transmitting nodes: “collision” 
random access MAC protocol specifies: 
how to detect collisions
how to recover from collisions (e.g., via delayed retransmissions)
examples of random access MAC protocols:
ALOHA, slotted ALOHA
CSMA, CSMA/CD, CSMA/CA
97

“Taking turns” MAC protocols
Transport Layer: 3-98
channel partitioning MAC protocols:
share channel efficiently and fairly at high load
inefficient at low load: delay in channel access, 1/N bandwidth allocated even if only 1 active node! 
random access MAC protocols
efficient at low load: single node can fully utilize channel
high load: collision overhead
“taking turns” protocols
look for best of both worlds!
polling
98

Slotted ALOHA
Transport Layer: 3-99
Pros:
single active node can continuously transmit at full rate of channel
highly decentralized: only slots in nodes need to be in sync
simple

Cons:
collisions, wasting slots
idle slots
nodes may be able to detect collision in less than time to transmit packet
clock synchronization
1
1
1
1
2
3
2
2
3
3
node 1
node 2
node 3
C
C
C
S
S
S
E
E
E
C: collision
S: success
E: empty
99

CSMA/CD:
Transport Layer: 3-100
CSMA/CS reduces the amount of time wasted in collisions
transmission aborted on collision detection

spatial layout of nodes 
100

Linklaget
Linklagsadressering: MAC, ARP, Ethernet frame

MAC addresses
Transport Layer: 3-102
each interface on LAN 
has unique 48-bit MAC address
has a locally unique 32-bit IP address (as we’ve seen)
1A-2F-BB-76-09-AD
58-23-D7-FA-20-B0
0C-C4-11-6F-E3-98
71-65-F7-2B-08-53
   LAN
(wired or wireless)
137.196.7/24
137.196.7.78
137.196.7.14
137.196.7.88
137.196.7.23
102

ARP: address resolution protocol
Transport Layer: 3-103
ARP table: each IP node (host, router) on LAN has table
Question: how to determine interface’s MAC address, knowing its IP address?
1A-2F-BB-76-09-AD
58-23-D7-FA-20-B0
0C-C4-11-6F-E3-98
71-65-F7-2B-08-53
   LAN
137.196.7.78
137.196.7.14
137.196.7.88
137.196.7.23
ARP
ARP
ARP
ARP
IP/MAC address mappings for some LAN nodes:
          < IP address; MAC address; TTL>
TTL (Time To Live): time after which address mapping will be forgotten (typically 20 min)
103

ARP protocol in action
Transport Layer: 3-104
58-23-D7-FA-20-B0
137.196.7.14
B
C
D
TTL
71-65-F7-2B-08-53
137.196.7.23
A
ARP table in A
IP addr
MAC addr
TTL
example: A wants to send datagram to B
B’s MAC address not in A’s ARP table, so A uses ARP to find B’s MAC address
A receives B’s reply, adds B entry into its local ARP table
3
137.196.
       7.14
58-23-D7-FA-20-B0
500
104

Switch: self-learning
Transport Layer: 3-105
A
A’
B
B’
C
C’
1
2
3
4
5
6
 
 
 
 
 
 
switch learns which hosts can be reached through which interfaces
A A’
Source: A
Dest: A’
MAC addr   interface    TTL
Switch table 
(initially empty)
A
1
60
when frame received, switch “learns”  location of sender: incoming LAN segment
records sender/location pair in switch table
105

Ethernet frame structure (more)
Transport Layer: 3-106
dest.
address
source
address
data (payload)
CRC
preamble
type
addresses: 6 byte source, destination MAC addresses
if adapter receives frame with matching destination address, or with broadcast address (e.g., ARP packet), it passes data in frame to network layer protocol
otherwise, adapter discards frame
type: indicates higher layer protocol 
mostly IP but others possible, e.g., Novell IPX, AppleTalk
used to demultiplex up at receiver
CRC: cyclic redundancy check at receiver
error detected: frame is dropped
106

Trådløse netværk
Trådløse karakteristika
Wireless LAN

Elements of a wireless network
Transport Layer: 3-108
wired network 
infrastructure
 wireless link
typically used to connect mobile(s) to base station, also used as backbone link 
multiple access protocol coordinates link access 
various transmission rates and distances, frequency bands
108

Characteristics of selected wireless links
Transport Layer: 3-109
Indoor
Outdoor
Midrange
outdoor
Long range
outdoor
10-30m
50-200m
200m-4Km
4Km-15Km
2 Mbps

4G LTE
802.11ac
802.11n
802.11g
802.11b
3.5 Gbps
600 Mbps
54 Mbps
11 Mbps
Bluetooth
802.11ax
14 Gbps
5G
10 Gbps
802.11 af,ah
109

Wireless network taxonomy
Transport Layer: 3-110
single hop
multiple hops
infrastructure
(e.g., APs)
no
infrastructure
host connects to  base station (WiFi, cellular) which connects to  larger Internet
no base station, no connection to larger  Internet (Bluetooth, ad hoc nets)
host may have to relay through several wireless nodes to connect to larger 
Internet: mesh net
no base station, no connection to larger  Internet. May have to relay to reach other  a given wireless node MANET, VANET
110

Wireless link characteristics (2)
Transport Layer: 3-111
SNR: signal-to-noise ratio
larger SNR – easier to extract signal from noise (a “good thing”)
SNR versus Bit Error Rate tradeoffs
given physical layer: increase power -> increase SNR->decrease BER
given SNR: choose physical layer that meets BER requirement, giving highest throughput
SNR may change with mobility: dynamically adapt physical layer (modulation technique, rate) 

10
20
30
40
QAM256 (8 Mbps)
QAM16 (4 Mbps)
BPSK (1 Mbps)
SNR(dB)
BER
10-1
10-2
10-3
10-5
10-6
10-7
10-4
111

CDMA: two-sender interference
Transport Layer: 3-112
using same code as sender 1, receiver recovers sender 1’s original data from summed channel data!
Sender 1
Sender 2
channel sums together transmissions by sender 1 and 2
… now that’s useful!
112

Collision Avoidance: RTS-CTS exchange
Transport Layer: 3-113
AP
A
B
RTS(A)
RTS(B)
RTS(A)
CTS(A)
CTS(A)
DATA (A)
ACK(A)
ACK(A)
reservation collision
defer
time
113

802.11 frame: addressing
Transport Layer: 3-114
2
2
6
6
6
2
6
0 - 2312
4
Address 1: MAC address of wireless host or AP  to receive this frame
Address 4: used only in ad hoc mode
frame
control
duration
address
1
address
2
address
4
address
3
payload
CRC
seq
control
Address 2: MAC address
of wireless host or AP 
transmitting this frame
Address 3: MAC address of router interface to which AP is attached
114

Personal area networks: Bluetooth
Transport Layer: 3-115
less than 10 m diameter
replacement for cables (mouse, keyboard, headphones)
ad hoc: no infrastructure
2.4-2.5 GHz ISM radio band, up to 3 Mbps
master controller / clients devices:
master polls clients, grants requests for client transmissions
radius of
coverage
C
C
C
P
P
P
P
M
C
master device
client device
parked device (inactive)
P
M
115

Recap

Netværkssikkerhed
Symmetrisk kryptering vs Asymmetrisk kryptering
TLS, PGP



What is network security?
Transport Layer: 3-118
confidentiality: only sender, intended receiver should “understand” message contents
sender encrypts message
receiver decrypts message
authentication: sender, receiver want to confirm identity of each other 
message integrity: sender, receiver want to ensure message not altered (in transit, or afterwards) without detection
access and availability: services must be accessible and available to users
118

Symmetric key cryptography
plaintext
plaintext
K
S
encryption
algorithm
decryption 
algorithm
K
S
ciphertext
K  (m)
S
symmetric key crypto: Bob and Alice share same (symmetric) key: K
e.g., key is knowing substitution pattern in mono alphabetic substitution cipher
Q: how do Bob and Alice agree on key value?
Transport Layer: 3-119
119

Public Key Cryptography
Transport Layer: 3-120
m = K  (K  (m))
B
+
B
-
plaintext
encryption
algorithm
decryption 
algorithm
K  (m)
B
+
ciphertext
plaintext
message, m
K 
B
+
Bob’s public key 
Bob’s private key 
K 
B
-
Wow - public key cryptography revolutionized 2000-year-old (previously only symmetric key) cryptography!
similar ideas emerged at roughly same time, independently in US and UK (classified)
120

Secure e-mail: integrity, authentication
Transport Layer: 3-121
 Alice sends m to Bob, with confidentiality, message integrity, authentication
H( )
.
KA( )
.
-
KA(H(m))
-
m
KA
-
m
Internet
+
KS( )
.
KB( )
.
+
KS(m )
KB(KS )
+
KS
KB
+
KS
+
message integrity, authentication
confidentiality
Alice uses three keys: her private key, Bob’s public key, new symmetric key
What are Bob’s complementary actions?
121

t-tls: cryptographic keys
Transport Layer: 3-122
considered bad to use same key for more than one cryptographic function
different keys for message authentication code (MAC) and encryption
four keys:
Kc : encryption key for data sent from client to server
Mc : MAC key for data sent from client to server
Ks : encryption key for data sent from server to client
Ms : MAC key for data sent from server to client
keys derived from key derivation function (KDF)
takes master secret and (possibly) some additional random data to create new keys
122

Netværks sikkerhed 
Hashing, Message Authentication, Digital signatur, Certificate Authorities
TLS

Message digests
Transport Layer: 3-124
Hash function properties:
many-to-1
produces fixed-size msg digest (fingerprint)
given message digest x, computationally infeasible to find m such that x = H(m)


large 
message
m
H: Hash
Function
H(m)
computationally expensive to public-key-encrypt long messages 
goal: fixed-length, easy- to-compute digital “fingerprint”
apply hash function H to m, get fixed size message digest, H(m)
124

Digital signature = signed message digest
Transport Layer: 3-125
digital
signature
(encrypt)
+
Bob sends digitally signed message:
large 
message
m
H: Hash
Function
H(m)
Alice verifies signature, integrity of digitally signed message:
H: Hash
function
H(m)
H(m)
large 
message
m
Bob’s 
private
key 
K 
B
-
KB(H(m))
-
encrypted 
message digest
KB(H(m))
-
encrypted 
message digest
digital
signature
(decrypt)
Bob’s 
public
key 
K 
B
+
?
equal
125

Public key Certification Authorities (CA)
Transport Layer: 3-126
certification authority (CA): binds public key to particular entity, E
entity (person, website, router) registers its public key with CE provides “proof of identity” to CA
CA creates certificate binding identity E to E’s public key
certificate containing E’s public key digitally signed by CA: CA says “this is E’s public key”
Bob’s 
identifying information 
K 
B
+
certificate for Bob’s public key, signed by CA
Bob’s 
public
key 
K 
B
+
digital
signature
(encrypt)
CA’s 
private
key 
K 
CA
-
126

A day in the life: scenario
127
Comcast network 
68.80.0.0/13
Google’s network 
64.233.160.0/19 
64.233.169.105
web server
DNS server

school network 
68.80.2.0/24
browser
                   
              
                   
              
                   
              
                   
              
                   
              
                   
              
web page
arriving mobile client attaches to network …


requests web page: www.google.com


scenario:
Sounds 
simple!

A day in the life: connecting to the Internet
128
                   
              
router has 
DHCP server
arriving mobile:
DHCP client
connecting laptop needs to get its own IP address, addr of first-hop router, addr of DNS server: use DHCP
DHCP
UDP
IP
Eth
Phy
DHCP
DHCP
DHCP
DHCP
DHCP
DHCP
UDP
IP
Eth
Phy
DHCP
DHCP
DHCP
DHCP
DHCP
DHCP request encapsulated in UDP, encapsulated in IP, encapsulated in 802.3 Ethernet

Ethernet frame broadcast (dest: FFFFFFFFFFFF) on LAN, received at router running DHCP server
Ethernet demuxed to IP demuxed, UDP demuxed to DHCP 

A day in the life: connecting to the Internet
129
                   
              
router has 
DHCP server
arriving mobile:
DHCP client
DHCP
UDP
IP
Eth
Phy
DHCP
UDP
IP
Eth
Phy
DHCP server formulates DHCP ACK containing client’s IP address, IP address of first-hop router for client, name & IP address of DNS server

DHCP
DHCP
DHCP
DHCP
DHCP
DHCP
DHCP
DHCP
DHCP
encapsulation at DHCP server, frame forwarded (switch learning) through LAN, demultiplexing at client

Client now has IP address, knows name & addr of DNS 
server, IP address of its first-hop router
DHCP client receives DHCP ACK reply

A day in the life… ARP  (before DNS, before HTTP)
130
                   
              
router has 
ARP server
arriving mobile:
ARP client
DNS
UDP
IP
Eth
Phy
Eth
Phy
   ARP
before sending HTTP request, need IP address of www.google.com:  DNS
DNS
DNS
DNS
DNS query created, encapsulated in UDP, encapsulated in IP, encapsulated in Eth.  To send frame to router, need MAC address of router interface: ARP

ARP query broadcast, received by router, which replies with ARP reply giving MAC address of router interface
client now knows MAC address of first hop router, so can now send frame containing DNS query 
ARP query
ARP
ARP reply

A day in the life… using DNS
131
                   
              
DNS
UDP
IP
Eth
Phy
DNS
DNS
DNS
Comcast network 
68.80.0.0/13
DNS 
server

                   
              
                   
              
                   
              
DNS
DNS
DNS
DNS
DNS
IP datagram containing DNS query forwarded via LAN switch from client to 1st hop router
IP datagram forwarded from campus network into Comcast network, routed (tables created by RIP, OSPF, IS-IS and/or BGP routing protocols) to DNS server
demuxed to DNS
DNS replies to client with IP address of www.google.com 
DNS
UDP
IP
Eth
Phy
DNS
DNS
DNS
DNS
DNS

A day in the life…TCP connection carrying HTTP
132
                   
              
DNS
DNS
DNS
Comcast network 
68.80.0.0/13
                   
              
64.233.169.105
Google web server
                   
              
HTTP
TCP
IP
Eth
Phy
HTTP
to send HTTP request, client first opens TCP socket to web server
TCP SYN segment (step 1 in TCP 3-way handshake) inter-domain routed to web server
TCP connection established!
SYN
SYN
SYN
SYN

TCP
IP
Eth
Phy
SYN
SYN
SYN
SYNACK
SYNACK
SYNACK
SYNACK
SYNACK
SYNACK
SYNACK
web server responds with TCP SYNACK (step 2 in TCP 3-way handshake)
132

A day in the life… HTTP request/reply 
133
                   
              
DNS
DNS
DNS
Comcast network 
68.80.0.0/13
                   
              
64.233.169.105
Google web server
                   
              
HTTP
TCP
IP
Eth
Phy
HTTP
TCP
IP
Eth
Phy
HTTP
HTTP request sent into TCP socket
IP datagram containing HTTP request routed to www.google.com
IP datagram containing HTTP reply routed back to client
web server responds with HTTP reply (containing web page)
HTTP
HTTP
HTTP
HTTP
HTTP
HTTP
HTTP
HTTP
HTTP
HTTP
HTTP
HTTP
HTTP
web page finally (!!!) displayed
133
