# E22 62581 Lektion 16.pptx

Source: PowerPoint,
https://drive.google.com/file/d/1xUf_uKcO-xMoYam2yifOiWbpiPnK8XFX
(exported as plain text; slide-break formatting from the original is lost, but
all text content is preserved).

---

Computer Networking: A Top-Down Approach 
8
th
 Edition, Global Edition  
Jim Kurose, Keith Ross
Copyright © 2022 Pearson Education Ltd
Chapter 6
The Link Layer 
and LANs
A note on the use of these PowerPoint slides:
We’re making these slides freely available to all (faculty, students, readers). They’re in PowerPoint form so you see the animations; and can add, modify, and delete slides  (including this one) and slide content to suit your needs. They obviously represent a 
lot
 of work on our part. In return for use, we only ask the following:


If you use these slides (e.g., in a class) that you mention their source (after all, we’d like people to use our book!)
If you post any slides on a www site, that you note that they are adapted from (or perhaps identical to) our slides, and note our copyright of this material.

For a revision history, see the slide note for this page. 

Thanks and enjoy!  JFK/KWR

     All material copyright 1996-2020
     J.F Kurose and K.W. Ross, All Rights Reserved

Link layer and LANs: our goals
understand principles behind link layer services:
error detection, correction
sharing a broadcast channel: multiple access
link layer addressing
local area networks: Ethernet, VLANs
datacenter networks

instantiation, implementation of various link layer technologies
Link Layer: 6-
‹#›

Link layer, LANs: roadmap
a day in the life of a web request

introduction
error detection, correction 
multiple access protocols
LANs
addressing, ARP
Ethernet
switches
VLANs
link virtualization: MPLS
data center networking


Link Layer: 6-
‹#›

Link layer: introduction
terminology:
nodes
hosts and routers
links
communication channels
connect adjacent nodes 
wired 
wireless 
LANs
frame
, 
Link 
layer packet
encapsulates datagram





mobile network
enterprise
          network






national or global ISP

datacenter 
network

                   
              










                   
              




                   
              




                   
              




                   
              




                   
              




                   
              




                   
              




                   
              




                   
              




                   
              








































































































































































                   
              




                   
              




                   
              




                   
              




                   
              













































































link layer 
has responsibility of 
transferring datagram from one node 
to 
physically adjacent 
node over a li
nk

Link Layer: 6-
‹#›

Link layer: context
datagram transferred by
 different link protocols
 over different links:
e.g., WiFi on first link, Ethernet on next link
each link protocol provides different services
e.g. reliable data transfer over link
transportation analogy:
trip from Princeton to Lausanne
limo: Princeton to JFK
plane: JFK to Geneva
train: Geneva to Lausanne
tourist = 
datagram
transport segment = 
communication link
transportation mode = 
link-layer
 
protocol
travel agent = 
routing algorithm

Link Layer: 6-
‹#›

Link layer: services
framing, link access:
 
encapsulate datagram into frame, adding header, trailer
channel access (if shared medium)
MAC addresses 
source, 
destination 
reliable delivery between adjacent nodes
seldom used on low bit-error links
wireless links: high error rates
Q:
 
why both link-level and end-end reliability?
























































































































…






































…
Link Layer: 6-
‹#›

Link layer: services (more)
flow control: 
pacing between nodes
error detection: 
errors caused by signal attenuation, noise. 
receiver detects errors, 
signals retransmission, 
or drops frame 
error correction: 
receiver 
corrects
 
bit error(s) 
without retransmission
half-duplex and full-duplex:
duplex: Both ends can send
half duplex
: 
no
 sending
 at same time
























































































































…






































…
Link Layer: 6-
‹#›

Where is the link layer implemented?
in each-and-every host
network interface card
 
(NIC) (or chip)
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

Link Layer: 6-
‹#›

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

link
h

link
h

datagram

datagram

datagram
Link Layer: 6-
‹#›

Link layer, LANs: roadmap
a day in the life of a web request

introduction
error detection, correction 
multiple access protocols
LANs
addressing, ARP
Ethernet
switches
VLANs
link virtualization: MPLS
data center networking


Link Layer: 6-
‹#›

Error detection
Link Layer: 6-
‹#›
EDC: error detection and correction bits (e.g., redundancy)
D:  data protected by error checking, may include header fields 
Error detection not 100% reliable!
protocol may miss some errors, but rarely
larger EDC field yields better detection and correction

datagram

D
EDC

d data bits




b
it-error prone link


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

Parity checking
Link Layer: 6-
‹#›
single bit parity
:
 
detect single bit errors

0111000110101011
1
parity
bit
d data bits
two-dimensional bit parity:
 detect 
and correct 
single bit errors
d
1,1
d
2,1
d
i,1
. . .
d
1,j+1
d
2,j+1
d
i,j+1
. . .
. . .
d
1,j
d
2,j
d
i,j
. . .
d
i+1,1
d
i+1,j+1
d
i+1,j
. . .
. . .
. . .
. . .
row parity
column
 parity
0 1 1 1 0  1
1 0 1 0 1  1
1 1 1 1 0  0
0
 0 1 0 1  0
no errors:
0 1 1 1 0  1
1 0 1 0 1  1
1 
0
 1 1 0  0
0
 0 1 0 1  0
parity
error
parity
error
detected
and
correctable
single-bit
error:
Even parity: 
set parity bit so there is an even number of 1’s
* Check out the online interactive exercises for more examples: h
ttp://gaia.cs.umass.edu/kurose_ross/interactive/

Internet checksum (review)
sender
:
treat contents
 of UDP segment 
(including UDP header fields and IP addresses) 
as sequence of 
16-bit integers
checksum: 
addition 
(one’s complement sum)
 of 
segment content
checksum value
 put into UDP checksum field
receiver
:
compute checksum
 of received segment
check if computed 
checksum equals checksum
 field value:
not equal - error detected
equal - no error detected. 
But maybe errors nonetheless?
 More later ….

Goal
:
 detect errors (
i.e., 
flipped bits) in transmitted segment

Transport Layer: 3-
‹#›

Cyclic Redundancy Check (CRC)
more powerful error-detection coding
D: 
data bits
 
(given, think of these as a binary number)
G: 
bit pattern
 (generator), of 
r+1 
bits 
(given)
Link Layer: 6-
‹#›
goal: 
choose 
r
 CRC bits, 
R
, such that <D,R> exactly divisible by G (mod 2) 
receiver knows G, divides <D,R> by G.  If non-zero remainder: error detected!
can detect all burst errors less than r+1 bits
widely used in practice (Ethernet, 802.11 WiFi)
r
 CRC bits

d data bits

D
R
<D,R> = D  2
r
   XOR  R  
*
bit pattern
formula for bit pattern

Link Layer: 6-
‹#›
Cyclic Redundancy Check (CRC): example
We want:
D
.
2
r
  XOR  R = nG
* Check out the online interactive exercises for more examples: h
ttp://gaia.cs.umass.edu/kurose_ross/interactive/
D
.
2
r
G
R
 = remainder 
[
           
]
or equivalently:
D
.
2
r
 = nG  XOR  R 
or equivalently:
  
   if we divide D
.
2
r
 by G, want remainder R to satisfy:
1  0  0  1
1  0  1  0
1  0  1
0  0  0
1  0  0  1
1  0  0  1
1  0  0  1
0  0  0
1  1  0
1  1  0  0
1  0  1  0
0  1  1
  0  1  1
D
R

1  0  0  1
G



0  0  0
1  0  1  1  1  0

2
r
*
1
0
1

Link layer, LANs: roadmap
a day in the life of a web request

introduction
error detection, correction 
multiple access protocols
LANs
addressing, ARP
Ethernet
switches
VLANs
link virtualization: MPLS
data center networking


Link Layer: 6-
‹#›

Multiple access links, protocols
Link Layer: 6-
‹#›
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

Multiple access protocols
Link Layer: 6-
‹#›
single 
shared 
broadcast channel 
two or more 
simultaneous transmissions
 by nodes:
 interference 
collision
 if node receives two or more signals at the same time
distributed algorithm that determines 
how nodes share channel
, i.e., determine when node can transmit
communication about channel sharing 
must use channel itself! 
no out-of-band channel for coordination
multiple access protocol

An ideal multiple access protocol
Link Layer: 6-
‹#›
given: 
multiple access channel (MAC) of rate 
R
 bps
	(ikke forveksle med MAC-addresse)

wishes
1. 
when 
one node
 wants to transmit, it can send at 
rate 
R
.
2. when 
M nodes
 want to transmit, each can send at average 
rate 
R/M
3. fully decentralized:
no special node
 to coordinate transmissions
no synchronization
 of clocks, slots
4. 
simple

MAC protocols: taxonomy
Link Layer: 6-
‹#›
three broad classes:
channel partitioning
divide channel
 into smaller “pieces” (
time slots
, 
frequency
, code)
allocate piece to node for 
exclusive use
random access
channel 
not divided
, 
allow collisions
“
recover
” from collisions
“taking turns”
nodes 
take turns
, but nodes with more to send can take longer turns

Channel partitioning MAC protocols: TDMA
Link Layer: 6-
‹#›
TDMA: time division multiple access 
access to channel in “rounds” 
each station gets fixed length slot (length = packet transmission time) in each round 
unused slots go idle 
example: 6-station LAN, 1,3,4 have packets to send, slots 2,5,6 idle 



1
3
4



1
3
4
6-slot
frame
6-slot
frame

Channel partitioning MAC protocols: FDMA
Link Layer: 6-
‹#›
FDMA: frequency division multiple access 
channel spectrum divided into 
frequency bands
each station assigned fixed frequency band
unused transmission time in frequency bands go idle 
example: 6-station LAN, 1,3,4 have packet to send, frequency bands 2,5,6 idle 




frequency bands
time




FDM cable

Random access protocols
Link Layer: 6-
‹#›
when node has packet to send
transmit 
at full channel data rate R.
no 
a priori
 
coordination 
among nodes
two or more transmitting nodes: “
collision
” 
random access MAC protocol 
specifies: 
how to 
detect
 collisions
how to 
recover 
from collisions (e.g., via delayed retransmissions)
examples of random access MAC protocols:
ALOHA, slotted ALOHA
CSMA, CSMA/CD, CSMA/CA

Slotted ALOHA
Link Layer: 6-
‹#›
assumptions
:
all frames same size
time 
divided into equal size 
slots 
(time to transmit 1 frame)
nodes start to transmit only slot beginning 
nodes are synchronized
if 2 or more nodes transmit in slot, 
all nodes detect collision
operation:
when 
node
 obtains fresh frame, 
transmits
 in next slot
if 
no collision
:
 node can send 
new frame in next slot
if collision:
 node 
retransmits
 frame in each subsequent slot 
with probability 
p
 
until success
randomization 
– 
why
?

Slotted ALOHA
Link Layer: 6-
‹#›
Pros:
single 
active 
node 
can continuously transmit at 
full rate
 of channel
highly decentralized: 
only slots
 in nodes need to be 
in sync
simple

Cons:
collisions
, wasting slots
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
C
: collision
S
: success
E
: empty

efficiency: 
long-run  fraction of successful slots  (many nodes, all with many frames to send)
suppose:
 
N
 nodes
 with many frames to send, each transmits in slot with 
probability 
p
prob that given node has success in a slot  = 
p(1-p)
N-1
prob that 
any
 node has a success = 
Np(1-p)
N-1
max efficiency: find 
p* 
that maximizes  
Np(1-p)
N-1
for many nodes, take limit of 
Np*(1-p*)
N-1 
as 
N
 goes to infinity, gives
:
    
max efficiency = 1/e = .37
at best:
 
useful  transmissions 37% of time! (ved mange afsendere)
Slotted ALOHA: efficiency
Link Layer: 6-
‹#›

Pure ALOHA
Link Layer: 6-
‹#›
unslotted Aloha
: simpler, no synchronization
when
 frame first arrives: 
transmit immediately
 
collision probability increases
 with no synchronization:
frame sent at t
0
 collides with other frames sent in [t
0
-1,t
0
+1]


t
0
 + 1
t
0
 - 1
t
0



will overlap
with end of 
i’s frame
will overlap
with start of 
i’s frame
pure Aloha efficiency: 18%
 !

CSMA (carrier sense multiple access)
Link Layer: 6-
‹#›
simple 
CSMA:
 
listen before transmit
:
if channel sensed idle:
 transmit entire frame
if channel sensed busy:
 defer transmission 
human analogy: don’t interrupt others!
CSMA/CD:
 
CSMA with 
collision detection
collisions 
detected
 within short time
colliding transmissions
 
aborted
, 
reducing
 channel 
wastage
collision detection easy in wired, difficult with wireless
human analogy: the 
polite conversationalist

CSMA: collisions
Link Layer: 6-
‹#›
collisions 
can
 still occur
 with carrier sensing: 
propagation delay
 means two nodes may not hear each other’s just-started transmission
collision: 
entire packet transmission time wasted
distance & propagation delay play role in in determining collision probability

spatial layout of nodes

CSMA/CD:
Link Layer: 6-
‹#›
CSMA/CS reduces the amount of time wasted in collisions
transmission aborted on collision detection


spatial layout of nodes

Ethernet CSMA/CD algorithm
Link Layer: 6-
‹#›
NIC receives datagram from network layer, creates frame
If NIC senses channel:
if 
idle: 
start 
frame 
transmission
. 
if 
busy: 
wait 
until channel idle, then transmit
If NIC transmits entire frame without collision, NIC is done with frame !
If NIC 
detects another
 transmission while sending:  
abort
, 
send jam signal
After aborting, NIC enters 
binary (exponential) backoff: 
after 
m
th collision, NIC chooses 
K 
at random from 
{0,1,2,4
,
…, 2
m
-1}
. NIC waits 
K
·512 bit times, returns to Step 2
more collisions: longer backoff interval

CSMA/CD efficiency
Link Layer: 6-
‹#›
T
prop
 = max prop delay between 2 nodes in LAN
t
trans
 = time to transmit max-size frame


efficiency → 1 
as 
t
prop
  goes to 0
as 
t
trans
  goes to infinity
better performance than ALOHA: and simple, cheap, decentralized
!

“Taking turns” MAC protocols
Link Layer: 6-
‹#›
channel partitioning MAC protocols:
share 
channel 
efficiently
 
and 
fairly
 
at high load
inefficient at low load
: delay in channel access, 1/N bandwidth allocated even if only 1 active node! 
random access MAC protocols
efficient at low load
: single node can fully utilize channel
high load
:
 collision overhead
“taking turns” protocols
look for best of both worlds!

“Taking turns” MAC protocols
Link Layer: 6-
‹#›





polling:
 
master node
 “invites” other nodes to transmit in turn
typically used with “dumb” devices
concerns:
polling overhead
 
latency
single point of failure
 (master)
master
slaves

poll

data

data

“Taking turns” MAC protocols
Link Layer: 6-
‹#›
token passing:
control 
token
 
passed from one node to next sequentially.
token message
concerns:
token overhead 
latency
single point of failure (token)





T
data
(nothing
to send)
T

Cable access network: FDM, TDM 
and
 random access!
Link Layer: 6-
‹#›

cable headend
CMTS


ISP
cable modem
termination system

cable
modem
splitter








































…






















…
Internet frames, TV channels, control  transmitted 
downstream at different frequencies

multiple
 
downstream (broadcast) 
FDM channels: up to 1.6 Gbps/channel 
single CMTS transmits into channels
multiple
 
upstream channels (up to 1 Gbps/channel)
multiple access: 
all users contend (random access) for certain upstream channel time slots; others assigned TDM

Cable access network:
Link Layer: 6-
‹#›
DOCSIS: 
data over cable service interface specificaiton
FDM 
over upstream, downstream frequency channels
TDM upstream
: some slots assigned, some have contention
downstream MAP frame
: assigns upstream slots
request for upstream slots
 (and data) 
transmitted random access
 (binary backoff) in selected slots
 
Residences with cable modems


Downstream channel i
Upstream channel j

MAP frame for
Interval [t1, t2]
t
1
t
2
Assigned minislots containing cable modem
upstream data frames
Minislots containing 
minislots request frames

cable headend
CMTS

Summary of 
MAC
 protocols
Link Layer: 6-
‹#›
channel partitioning, 
by time, frequency or code
Time Division, Frequency Division
random access 
(dynamic), 
ALOHA, S-ALOHA, CSMA, CSMA/CD
carrier sensing: easy in some technologies (wire), hard in others (wireless)
CSMA/CD used in Ethernet
CSMA/CA used in 802.11
taking turns
polling from central site, token passing
Bluetooth, (FDDI), 
token ring

Link layer, LANs: roadmap
a day in the life of a web request

introduction
error detection, correction 
multiple access protocols
LANs
addressing, ARP
Ethernet
switches
VLANs
link virtualization: MPLS
data center networking


Link Layer: 6-
‹#›
