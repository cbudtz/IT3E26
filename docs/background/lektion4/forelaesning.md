# E22 62581 Forelæsning - Lektion04

Source: Google Slides,
https://docs.google.com/presentation/d/1d3hr8L71UTtZEPDEFLyTNUIAqZiToNKFI5bRLSPJc-k
(exported as plain text; slide-break formatting from the original is lost, but
all text content is preserved).

---

Lektion 04
 Introduktion til Internettet II. Forsinkelser og tab. Protokoller. Intro til Angreb.

Quiz fra igår!
www.socrative.com 


Gantt-diagram anbefaling
Gantt diagram anbefaling: asana.com + instaGantt.com er OK og gratis
Projekt og GruppeMedlemmer oprettes i Asana
Linkes til instaGantt


Internettet - igen
Mia af forbundne enheder
Hosts ~End systemer med apps
Packet Switches
Routers 
Switches
Links
Fiber, optisk, radio…
Båndbredde
Netværk
Netværk af Netværk


Dagens program
Øvelser fra sidste fredag
Øvelser - Lektion02 
Delay, Loss, Throughput
Protocol layers
Networks under attack
Øvelser 
Mere wireshark
Lidt teori

Queuing delay og loss
Hvis pakkerne ankommer hurtigere end de kan sendes => 
Queuing delay
Loss
(Når bufferen er fuld)

FDM og TDM
FDM: Flere samtidige kanaler
TDM: Efter tur
Kan kombineres…

Two key network-core functions
Introduction: 1-8
Forwarding: 
Local action: Flytter indkomne packets fra routerens input link til det rigtige router output link

1
2
3
0111
destination address in arriving
packet’s header
header value
output link
0100
0101
0111
1001
3
2
2
1
Routing: 
Global action: Afgører source-destination veje som pakkerne tager
Routing algoritmer
Routing afgør forwarding tables!

                   
              
                   
              
                   
              
                   
              
                   
              
                   
              
local forwarding table
local forwarding table
routing algorithm
8

Packet switching
Flere deler samme link
~TDM
~Optimal udnyttelse

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

Hvordan ser det ud i virkeligheden?
windows: tracert {internet adresse}
Mac: traceroute {internet adresse}
Lad os prøve det! 

Throughput/Bandwidth
Throughput: 
Rate (bits/tid) fra sender til modtager
Bandwidth
Maksimal rate
Flaskehals/Bottleneck
Mindste kapacitet



Lidt om sikkerhed
Netværks-sikkerhed
how bad guys can attack computer networks
how we can defend networks against attacks
how to design architectures that are immune to attacks
Internettet blev ikke designet til sikkerhed...
original vision: “a group of mutually trusting users attached to a transparent network”
Internet protocol designers playing “catch-up”
security considerations in all layers!



Klassiske Bad guys
Infektioner
Virus, worms
Packet sniffing
Spoofing

Klassiske Bad guys
Infektioner
Malware
Virus: self-replicating infection by receiving/executing  object (e.g., e-mail attachment)
Kræver brugeren aktivt gør noget
Worm:self-replicating infection by passively receiving object that gets itself executed
Benytter eksisterende sikkerhedshuller
Spyware
Opsnapper data (kodeord etc.)
Botnets
Når først virus/worm er inde, risikerer man at blive botnet-bot
Klynge af intetanende computere
Kan bruges til DDOS - Distributed Denial Of Service attack

Klassiske Bad guys

BotNet - DDoS
Udvælg mål
Brug bots til at sende skrammel-trafik
Overbelast målet
Målet går ned eller bliver unreachable.
Skal løses på ISP niveau…
ISP'er blokerer trafik fra mistænkelige IP'er

Klassiske Bad guys

Packet Sniffing
Virker på Broadcast medier
Wireless
Delt ethernet
Kan gøres med Wireshark...

Klassiske Bad guys

Spoofing
Udgiver sig for at være en anden…
Falsk IP adresse
Falsk MAC adresse

Protokol preview
Netværk er komplekse
hosts
routers
links of various media
applications
protocols
hardware, software

Internet protokol stacken
Application: supporting network applications
Transport: process-process data transfer
Network: routing of datagrams from source to destination
Link: Data transfer between neighboring  network elements
Physical: bits “on the wire”
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
~Postbuddet behøver ikke …
Kende indholdet i brevet (Sprog, Modtager)
Vide hvad der sker med brevet efter postkontoret.. (Postkontorer i andre dele af verdenen)
application

transport

network

link

physical

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

Vejen fra host til host...

Resumé
Internettet som netværk af netværk
Intro til protokoller
Netværkets hosts, access network og core
Multiplexing - TDM og FDM
Packet switching vs Circuit switching
Performance,delay og Loss
Intro til sikkerhedsproblemer
Lagdeling i protokolstakken

Wireshark

Quiz
www.socrative.com 

Gruppedannelse
Alle der vil til eksamen (ikke re-eksamen) skal i en gruppe
Hvis ikke i finder ud af det selv, tager jeg en beslutning torsdag 16/9 og fylder grupperne op.
Jeg medierer gerne, hvis der er gruppe-problemer/udfordringer
