# E22 62581 Forelæsning - Lektion10

Source: Google Slides,
https://docs.google.com/presentation/d/1dFDrGkxOX2O_5hFfPHbei-Cmbex26xLifXalaLhZVgU
(exported as plain text; slide-break formatting from the original is lost, but
all text content is preserved).

---

Lektion 10
Transportlaget II


Agenda	

Transportlaget II

Transportlaget - TCP
Connection Oriented
Point to point
Reliable - In-order Byte stream
Full Duplex
Cumulative ACKs
Pipeliniing
Flow control

TCP segment structure
source port #
dest port #
32 bits
not
used
receive window
flow control: # bytes receiver willing to accept
sequence number
segment seq  #: counting bytes of data into bytestream (not segments!)
application
data 
(variable length)
data sent by application into TCP socket
A
acknowledgement number
ACK: seq # of next expected byte; A bit: this is an ACK
options (variable length)
TCP options
head
len
length (of TCP header)
checksum
Internet checksum
RST, SYN, FIN: connection management
F
S
R
Urg data pointer
P
U
C
E
C, E: congestion notification
Transport Layer: 3-4
4

TCP sequence number
Sequence number
Nummeret på første BYTE i segmentet!!
Ack
Seq nummer på NÆSTE BYTE man mangler
Kumulativt!
Hvad med out-of-order?
Ingen spec
Kan både discardes eller gemmes


SEQ og ACK
NB: 1 Byte
(Telnet protokol)

Hvad med tabte pakke og RTT?
Hvordan sætter man en grænse for timeout?
Skal være længere end RTT
Men RTT varierer!
For kort
For mange retransmissioner
For lang
For lang ventetid → lag


Estimering af RTT
Sample RTT
Tid fra SEQ til ACK
(ikke retransmissioner)
Estimated RTT
Gennemsnit over flere segmenter
EWMA - Exponential Weighted Moving Average
EstimatedRTT = (1- α)*EstimatedRTT + α*SampleRTT
α - Vægten af Sidste nye måling - Typisk 0.125
Sidste nye måling vægter med 12,5% 
For hver ny måling 'fortyndes' tidligere målinger

TCP RTT estimat

Timeout beregningen
Estimated RTT + "Sikkerhedsmargen"
Gennemsnitlig variabilitet:
DevRTT = (1-β)*DevRTT + β*|SampleRTT-EstimatedRTT|
β = 0.25 (typisk)

TCP Sender
Data fra application
Segment med Seq nummer - Første byte  i segmentet's nummer
Start timer - Hvis den ikke kører
Timeren er for ældste UnAcked segment
Event: TimeOut
Gensend segment der er timet ud.
Genstart timer
Event: ACK modtaget
Update ACK for segment (hvis den ikke allerede er ACK'ed)
Start timer for evt. unacked segment 

TCP receiver
Event: InOrder segment ankommer 
Send Kumulativ ACK
Event: OutOfOrder segment ankommer
Send duplicate ACK (Gentag seq nummer for den sidste pakke der kom i orden

Retransmission scenarier

Ingen retransmission
Tabt ACK, men næste ACK kommer før timeout

Fast Retransmit

TCP flow control
Hvad hvis data ankommer hurtigere end applikationen kan tømme buffers??

TCP flow control
Speciel header angiver hvor mange bytes modtager kan klare!

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

TCP connection management


Før Data
Handshake
Forhandling om seq numre og buffer størrelser

2 way handshake… Problemer?

2 way handshake… Problemer?

2 way handshake… Problemer?


TCP: 3 Way handshake...
Først når første datapakke kommer er forbindelsen helt etableret!

Den høflige exit
TCP close
Client sender FIN bit=1
Server svarer med ACK + EVT. FIN

Øvelser
Resten af øvelserne

TCP Congestion control
Ikke det samme som Flow Control
Flow Control virker ved flaskehals hos modtager
Congestion control virker ved flaskehalse i netværket


Congestion Control
Congestion: For mange sender for meget til at netværket kan håndtere det
→ Delay
→ Packet loss

Congestion Control

Flow Control


Hvad skaber congestion?
Simpel udgave:
2 Hosts sender til 2 Hosts over links med R kapacitet
Routeren har uendelig buffer
Ingen retransmissioner
Hvad sker der når λin →  R/2

Hvad skaber congestion?

Max hastighed bliver nået
Delay går mod uendeligt

Eksempel 2
Router med begrænset buffer
Sender retransmitterer tabte pakker
λ’in >=  λin

Perfekte forhold
Vi kender buffer-kapaciteten 
sender KUN hvis der er ledigt
(Ikke brug for retransmissioner)
Throughput optimalt
Delay minimalt

Mere realistisk
Pakker går tabt
Vi gensender KUN, hvis vi ved pakken er tabt
Når vi nærmer os maksimum begynder vi at bruge kapacitet på retransmissioner

Nu med overflødige retransmissioner 
Pakker bliver gensendt pga. timeout

Problemer med congestion
Forsinkelser
Spildt kapacitet

Mere komplicerede problemer
A øger transmissions-hastigheden λin
D's pakker bliver udkonkurreret og throughput → 0 
Al upstream kapacitet går tabt


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

Metoder - Network-assisted congestion control
Routere giver direkte feedback
Fortæller om congestion eller send rate
Specielle protokoller
(TCP ECN, ATM, DECbit)

Øvelsestid
