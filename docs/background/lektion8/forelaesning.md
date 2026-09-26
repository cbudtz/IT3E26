# E22 62581 Forelæsning - Lektion08

Source: Google Slides,
https://docs.google.com/presentation/d/1Dyec4er-09aeHX2Cqzmq3MR8xXTNTddhPiHtE0RZG2E
(exported as plain text; slide-break formatting from the original is lost, but
all text content is preserved).

---

Lektion 08
Netværk: Transportlaget


Agenda	
Transport-lags-services
Multiplexing og Demultiplexing
UDP
Reliable data transfer

By popular demand
WORK IN PROGRESS:
Eksamensspørgsmål 

Flyttet undervisning!
1/10 flyttet til 30/9 og 7/10


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

Transport-lag og netværks-lag
Kollegianere og postkasser
Host: Kollegiet
IP: Post-adresse
Process: Kollegianer
Socket: Postkasse
Port: Nummer på postkasse
Message: Brev

Beskeder på forskellige lag
PDU'er
Protocol Data Unit
Message
Segment
Datagram/Packet
Frame
Bits

Transport-lag og netværks-lag
Transportlag:
Kommunikation mellem Processer
Netværkslag
Kommunikation mellem Hosts

Tansportlaget

Transportlaget

To primære protokoller
TCP: Transmission Control Protocol
Reliable, in-order delivery
Congestion control 
Flow control
Connection setup
UDP: User Datagram Protocol
Unreliable, unordered delivery
No-frills extension of “best-effort” IP
Services not available: 
delay guarantees
bandwidth guarantees

Multiplexing og Demultiplexing
Multiplexing
Kombination af flere signaler over samme medie
Demultiplexing
Opsplitning af et signal i flere signaler
Mux/Demux i transportlaget
Flere applikationer anvender samme internetforbindelse
Sockets/Ports

Flere klienter ~ Flere (TCP) sockets

Demultiplexing
Host modtager IP datagram/packet
Datagram har modtager IP og afsender IP
Datagrammet indeholder et TCP/UDP Segment
Segmentet har modtager og afsender port
Host bruger IP/Port til at aflevere til rette socket/process

Connection-less Demultiplexing
TCP
Velkomst-socket 
Sekundær socket til hver client
UDP er connectionless
Én socket til alle pakker
Demultiplexing på afsender IP! (evt. port)

Connectionless demultiplexing: Eksempel



Connection-oriented demultiplexing

	
TCP socket kan identificeres af 4 parametre
source IP address
source port number
dest IP address
dest port number


Connection-oriented demultiplexing

	

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

UDP karakteristika
No connection establishment 
Sparer RTT
Simple: 
no connection state at sender, receiver
small header size
No congestion control
UDP can blast away as fast as desired!
can function in the face of congestion

UDP segment header


	

UDP Checksum
Detektion af defekte segmenter

Pålidelig data-overførsel
Er internettet som standard pålideligt?

Hvordan skaber man pålidelighed?
Med en protokol til at skabe pålidelighed…
Skal kompensere for underliggende lags problemer
Tab
Rækkefølge
Korrupte data

Hvordan skaber man pålidelighed?
Problem: Hosts kender ikke hinandens tilstand
Nåede beskeden frem?
Løsning
Beskeder om beskeder…
Kvitteringer
(Anbefalet post)

Hvordan håndterer man problemer?
Bitfejl
Segmentet er gået i stykker
Løsning
Kvittering
ACK (Acknowledgement) - Modtager kvitterer for pakken OK
NACK (Negative) - Modtager informerer om DEFEKT pakke
Afsender gensender
Stop and Wait?
Afsender venter på OK

Protokol for gensendelse
Sneak peak på Tilstandsdiagram!

Hvad hvis ACK eller NAK går galt??
What happens if ACK/NAK corrupted?
Sender doesn’t know what happened at receiver!
Can’t just retransmit: possible duplicate
Hvad med Stop and go?
Hvad med duplikater?
Sender retransmits current pkt if ACK/NAK corrupted
Sender adds sequence number to each pkt
Receiver discards (doesn’t deliver up) duplicate pkt



Løsning på defekt ACK
Nu med gensendelse!

Hvad med tabte pakker?
Hvad gør man i virkeligheden
Venter et 'rimeligt' tidsrum
Prøver igen


Eksempel

Ineffektivt at vente
Båndbredden bliver kun brugt når der sendes noget

Pipelining

Hvad når der bliver tabt en pakke?

Go-Back-N:sender
Sender window
Op til N pakker undervejs
Hver har et sekvens nummer
Cumulative ACKs
Når alle pakker inden n er ACK'ed → window rykker til n+1


Go-Back-N:receiver
ACK for hver pakke
ACK nummer på sidste pakke der er ankommet i rigtig orden!
Gentag ACK hvis næste pakke er out-of order!

Så længe rcv_base ikke er kommet sendes sidste grønne ACK


Selective Repeat

Resumé
Transportlag
Sockets med Ports
UDP
Upålidelig
Kun én Port
TCP
Protokol der skaber pålidelighed 
ServerSockets
Socket til hver klient
Reliable transfer
ACK og Sliding window
Mere om det næste uge
