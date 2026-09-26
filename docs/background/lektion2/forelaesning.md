# E22 62531 Forelæsning - Lektion 02 Netværk 1

Source: Google Slides,
https://docs.google.com/presentation/d/1pYR1ZbdqYuJw9mii3Q13eRb4ZSSBkQzh1aXwqbDOQYA
(exported as plain text; slide-break formatting from the original is lost, but
all text content is preserved).

---

Lektion 02
Introduktion til Netværk 1

Læringsmål
beskrive og forklare netværkskomponenter og kommunikationen fra en computer til en anden over Internettet.
beskrive og forklare metoder og protokoller i Internetprotokolstakken, adressering i IP-baserede netværk samt et programs anvendelse af protokoller i applikationslag og transportlag.
anvende væsentlige værktøjer og metoder til analyse af trafik og fejl på et netværk.
udvikle konfigurerbare, lagdelte applikationer der anvender filer og kommunikerer over et netværk.
sammenligne metoder og services i de forskellige protokoller i TCP/IP protokolstakken samt vurdere protokollers anvendelse til bestemte formål.
deltage i en faglig diskussion indenfor fagområdet.

Gantt Diagram - recap
Opgaver
Tid
Bindinger
End-Start, Start-start, end-end
Kritisk vej
Slack
Definerer det hurtigste et projekt kan blive færdigt

Hvad er Internettet?!!?

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

Nogle forbundne enheder

Hvad er Internettet?!!?
Netværk af netværk
Tonsvis af protokoller til kommunikation
HTTP
TCP
IP
OSPF
WIFI
Ethernet

Internettet som en service
Måden som de fleste brugere ser det - "Har du  internet?"
Infrastruktur der giver
Web, streaming video, multimedia teleconferencing, email, games, e-commerce, social media, inter-connected appliances
Programmør interface til distribuerede systemer
Tillader standardiseret forbindelse 
Uden at kende underliggende hardware!
'Software-postvæsen'

Protokoller to the rescue
Netværks-protokoller
Computere
Al kommunikation bruger protokoller
 Menneske-protokol
"Hvad er klokken?"
"Må jeg spørge om noget?"
"Hej, hvad hedder du?"
Specifikke beskeder
Specifikke formater
Specifik rækkefølge
Specifikke handlinger

Protokoller
Eksempler?

Network Edge
hosts: clients and servers
servers often in data centers



Access network
hosts: clients and servers
servers often in data centers
Forbindelserne
Trådløse
Trådede



Network Core
Forbundne Routers
Netværk af netværk

Netværksegenskaber?
Hvad er et godt netværk?

Netværksegenskaber?
Båndbredde
Forsinkelse
Pålidelighed
Brugere der skal dele?

Et Access Network
Kablet netværk
Delt i flere frekvenser
Frequency Division Multiplexing

Lidt nærmere kig….
Kabel->Fiber-ISP (Internet Service provider)
Flere deler den samme båndbredde
Båndbredde op/ned kan være forskellig...

Access Network - Hjemme-netværk
Typisk kort rækkevidde
<50m

Access Network - Mobilt
Typisk lang rækkevidde
10km

Hosts - Sender data-pakker
Hosts:
Application message
Opdeles i chunks, eller packets a L bits længde
Transmitterer med Hastigheden R
Båndbredde
Introduction: 1-20

Links
Bit: Høj spænding/lav spænding, ændringer i lys/radiosignal
Physical link: 
Hvad forbinder sender og modtager
Guided media: 
Kobber, Fiber, Coax
Unguided media: 
Radio-signaler



Links - Guided media
Ethernet - Twisted Pair  <10 Gbps
Coax <10 Gbps
Optisk fiber - 178 Tbps (nuværende rekord)
400 Gbps/kanal



Links - Unguided media
Radiobølger
Udbredelse i flere retninger
Kugle giver 8 x reduktion i signalstyrke ved en fordobling i afstand
Retningsbestemte sendere
Bølgelængde afgør rækkevidde, men også hastighed
Refleksion, obstruktion, interferens
WLAN
WAN (Mobil)
Satellit 
Geostationær,
Starlink


Network Core
Internetudbydernes netværk 
Netværk af netværk
Forbundne Routers
"Postcentraler"
Packet switching
Applikationsbeskeder bliver delt i packets
Packets bliver forwarded
Hver pakke på fuld kapacitet



Pause!

Socrative
www.socrative.com 

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

Hvordan forbinder man ISP'er
Duer ikke at forbinde alle
Kræver N2 forbindelser


Multi-tier network
Top Level (Globale) ISP'er

Multi-tier network
Top Level (Globale) ISP'er
Konkurrence
IXP'er

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
