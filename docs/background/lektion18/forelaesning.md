# E22 62581 Lektion18.pptx

Source: PowerPoint,
https://drive.google.com/file/d/1RL4i69QW7UK6lVpE48bZDZT4McDDshaq
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

Link layer: introduction
terminology:
hosts and routers: nodes
communication channels that connect adjacent nodes along communication path: links
wired 
wireless 
LANs
layer-2 packet: 
frame
, encapsulates datagram





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
adds error checking bits, reliable data transfer, flow control, etc.
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

Slotted ALOHA
Link Layer: 6-
‹#›
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
C
: collision
S
: success
E
: empty

CSMA/CD:
Link Layer: 6-
‹#›
CSMA/CS reduces the amount of time wasted in collisions
transmission aborted on collision detection


spatial layout of nodes

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

MAC addresses
Link Layer: 6-
‹#›
32-bit IP address: 
network-layer
 address for interface
used for layer 3 (network layer) forwarding
e.g.: 128.119.40.136

MAC (or LAN or physical or Ethernet) address:
 
function:
 
used “locally” to get frame from one interface to another physically-connected interface (same subnet, in IP-addressing sense)
48-bit MAC address (for most LANs) burned in NIC ROM, also sometimes software settable

hexadecimal (base 16) notation
(each “numeral” represents 4 bits)
e.g.: 1A-2F-BB-76-09-AD

MAC addresses
Link Layer: 6-
‹#›
each interface on LAN 
has unique 48-bit 
MAC
 address
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

MAC addresses
Link Layer: 6-
‹#›
MAC address allocation administered by IEEE
manufacturer buys portion of MAC address space (to assure uniqueness)
analogy:
MAC address: like Social Security Number
IP address: like postal address
 MAC flat address: portability 
can move interface from one LAN to another
recall IP address 
not
 portable: depends on IP subnet to which node is attached

ARP: address resolution protocol
Link Layer: 6-
‹#›
ARP table: 
each IP node (host, router) on LAN has table
Question:
 
how to determine interface’s MAC address, knowing its IP address?

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

ARP protocol in action
Link Layer: 6-
‹#›

58-23-D7-FA-20-B0






137.196.7.14
B
C
D
TTL
71-65-F7-2B-08-53


137.196.7.23
A


ARP table in 
A
IP addr
MAC addr
TTL
example: A wants to send datagram to B
B’s MAC address not in A’s ARP table, so A uses ARP to find B’s MAC address
A
 broadcasts 
ARP query
, containing B's IP addr
destination MAC address = 
FF-FF-FF-FF-FF-FF
all nodes on LAN receive ARP query 

1


Source MAC:  
71-65-F7-2B-08-53
Source IP: 137.196.7.23 
Target IP address: 
137.196.7.14
…







1
Ethernet frame (sent to FF-FF-FF-FF-FF-FF)

ARP protocol in action
Link Layer: 6-
‹#›

58-23-D7-FA-20-B0






137.196.7.14
B
C
D
TTL
71-65-F7-2B-08-53


137.196.7.23
A


ARP table in 
A
IP addr
MAC addr
TTL
example: A wants to send datagram to B
B’s MAC address not in A’s ARP table, so A uses ARP to find B’s MAC address
B
 replies to A with ARP response, giving its MAC address

2


Target IP address: 
137.196.7.14
Target MAC address: 
                    58-23-D7-FA-20-B0
…





2
ARP message into Ethernet frame (sent to 
71-65-F7-2B-08-53
)

ARP protocol in action
Link Layer: 6-
‹#›

58-23-D7-FA-20-B0






137.196.7.14
B
C
D
TTL
71-65-F7-2B-08-53


137.196.7.23
A


ARP table in 
A
IP addr
MAC addr
TTL
example: A wants to send datagram to B
B’s MAC address not in A’s ARP table, so A uses ARP to find B’s MAC address
A
 receives B’s reply, adds B entry into its local ARP table

3




137.196.
       7.14
58-23-D7-FA-20-B0
500

Routing to another subnet: addressing
Link Layer: 6-
‹#›
walkthrough
: sending a  datagram from 
A
 to 
B
 via 
R
focus on addressing – at IP (datagram) and MAC layer (frame) levels
R

A

B


                   
              












1A-23-F9-CD-06-9B
222.222.222.220
111.111.111.110
E6-E9-00-17-BB-4B
CC-49-DE-D0-AB-7D
111.111.111.112
111.111.111.111
74-29-9C-E8-FF-55
222.222.222.222
49-BD-D2-C7-56-2A
222.222.222.221
88-B2-2F-54-1A-0F
assume that:
A knows B’s IP address
A knows IP address of first hop router, R 
(how?)
A knows R’s MAC address 
(how?)

Routing to another subnet: addressing
Link Layer: 6-
‹#›
R
1A-23-F9-CD-06-9B
222.222.222.220
111.111.111.110
E6-E9-00-17-BB-4B
CC-49-DE-D0-AB-7D
111.111.111.112
111.111.111.111
74-29-9C-E8-FF-55

A
222.222.222.222
49-BD-D2-C7-56-2A
222.222.222.221
88-B2-2F-54-1A-0F

B


                   
              

















IP
Eth
Phy

IP src: 111.111.111.111
   IP dest: 222.222.222.222
A creates IP datagram with IP source A, destination B 
A creates link-layer frame containing A-to-B IP datagram
 R's 
MAC address is frame’s destination
MAC src: 74-29-9C-E8-FF-55
   MAC dest: 
E6-E9-00-17-BB-4B

Routing to another subnet: addressing
Link Layer: 6-
‹#›
R
1A-23-F9-CD-06-9B
222.222.222.220
111.111.111.110
E6-E9-00-17-BB-4B
CC-49-DE-D0-AB-7D
111.111.111.112
111.111.111.111
74-29-9C-E8-FF-55

A
222.222.222.222
49-BD-D2-C7-56-2A
222.222.222.221
88-B2-2F-54-1A-0F

B


                   
              
















IP
Eth
Phy
frame sent from A to R




IP
Eth
Phy
frame received at R, datagram removed, passed up to IP
MAC src: 74-29-9C-E8-FF-55
   MAC dest: E6-E9-00-17-BB-4B


IP src: 111.111.111.111
   IP dest: 222.222.222.222

IP src: 111.111.111.111
   IP dest: 222.222.222.222

Routing to another subnet: addressing
Link Layer: 6-
‹#›
R
1A-23-F9-CD-06-9B
222.222.222.220
111.111.111.110
E6-E9-00-17-BB-4B
CC-49-DE-D0-AB-7D
111.111.111.112
111.111.111.111
74-29-9C-E8-FF-55

A
222.222.222.222
49-BD-D2-C7-56-2A
222.222.222.221
88-B2-2F-54-1A-0F

B


                   
              













IP src: 111.111.111.111
   IP dest: 222.222.222.222
MAC src: 
1A-23-F9-CD-06-9B
  MAC dest: 
49-BD-D2-C7-56-2A




R determines outgoing interface, passes datagram with IP source A, destination B to link layer 
R creates link-layer frame 
containing A-to-B IP datagram. Frame destination address: 
B's MAC address




IP
Eth
Phy

Routing to another subnet: addressing
Link Layer: 6-
‹#›
R
1A-23-F9-CD-06-9B
222.222.222.220
111.111.111.110
E6-E9-00-17-BB-4B
CC-49-DE-D0-AB-7D
111.111.111.112
111.111.111.111
74-29-9C-E8-FF-55

A
222.222.222.222
49-BD-D2-C7-56-2A
222.222.222.221
88-B2-2F-54-1A-0F

B


                   
              















IP
Eth
Phy





IP
Eth
Phy
IP src: 111.111.111.111
   IP dest: 222.222.222.222
MAC src: 
1A-23-F9-CD-06-9B
  MAC dest: 
49-BD-D2-C7-56-2A



transmits link-layer frame
R determines outgoing interface, passes datagram with IP source A, destination B to link layer 
R creates link-layer frame 
containing A-to-B IP datagram. Frame destination address: 
B's MAC address

Routing to another subnet: addressing
Link Layer: 6-
‹#›
R
1A-23-F9-CD-06-9B
222.222.222.220
111.111.111.110
E6-E9-00-17-BB-4B
CC-49-DE-D0-AB-7D
111.111.111.112
111.111.111.111
74-29-9C-E8-FF-55

A
222.222.222.222
49-BD-D2-C7-56-2A
222.222.222.221
88-B2-2F-54-1A-0F

B


                   
              















IP
Eth
Phy





IP
Eth
Phy
B receives frame, extracts IP datagram destination B 
B passes datagram up protocol stack to IP
IP src: 111.111.111.111
   IP dest: 222.222.222.222

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

Ethernet
Link Layer: 6-
‹#›
“dominant” wired LAN technology: 
first widely used LAN technology
simpler, cheap
kept up with speed race: 10 Mbps – 400 Gbps 
single chip, multiple speeds (e.g., Broadcom  BCM5761)


Metcalfe’s Ethernet sketch
https://www.uspto.gov/learning-and-resources/journeys-innovation/audio-stories/defying-doubters

Ethernet: physical topology
Link Layer: 6-
‹#›
bus: 
popular through mid 90s
all nodes in same collision domain (can collide with each other)
bus: 
coaxial cable










switched
 



 

 







switched: 
prevails today
active link-layer 2 
switch
 
in center
each “spoke” runs a (separate) Ethernet protocol (nodes do not collide with each other)

Ethernet frame structure
Link Layer: 6-
‹#›
sending interface encapsulates IP datagram (or other network layer protocol packet) in 
Ethernet frame




dest.
address
source
address
data (payload)
CRC
preamble
type
preamble: 
 used to synchronize receiver, sender clock rates
7 bytes of 10101010 followed by one byte of 10101011

Ethernet frame structure 
(more)
Link Layer: 6-
‹#›

dest.
address
source
address
data (payload)
CRC
preamble
type
addresses: 
6 byte source, destination MAC addresses
if adapter receives frame with matching destination address, or with broadcast address (e.g., ARP packet), it passes data in frame to network layer protocol
otherwise, adapter discards frame
type: 
indicates higher layer protocol 
mostly IP but others possible, e.g., Novell IPX, AppleTalk
used to demultiplex up at receiver
CRC: 
cyclic redundancy check at receiver
error detected: frame is dropped

Ethernet: unreliable, connectionless
Link Layer: 6-
‹#›
connectionless: 
no handshaking between sending and receiving NICs 
unreliable: 
receiving NIC doesn’t send ACKs or NAKs to sending NIC
data in dropped frames recovered only if initial sender uses higher layer rdt (e.g., TCP), otherwise dropped data lost
Ethernet’s MAC protocol: unslotted 
CSMA/CD with binary backoff

802.3 Ethernet standards: link & physical layers
Link Layer: 6-
‹#›
different physical layer media: fiber, cable



application
transport
network
link
physical

MAC protocol
and frame format
100BASE-TX
100BASE-T4
100BASE-FX

100BASE-T2
100BASE-SX
100BASE-BX

fiber physical layer

copper (twister pair) physical layer
many
 
different Ethernet standards
common MAC protocol and frame format
different speeds: 2 Mbps, 10 Mbps, 100 Mbps, 1Gbps, 10 Gbps, 40 Gbps

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

Ethernet switch
Link Layer: 6-
‹#›
Switch is a 
link-layer
 device: takes an 
active
 role
store, 
forward Ethernet frames
examine incoming frame’s MAC address, 
selectively
 forward  frame to one-or-more outgoing links when frame is to be forwarded on segment, uses CSMA/CD to access segment
transparent: 
hosts 
unaware
 
of presence of switches
plug-and-play, self-learning
switches do not need to be configured

Switch: multiple simultaneous transmissions
Link Layer: 6-
‹#›
switch with six interfaces (
1,2,3,4,5,6
)  
A
A
’
B
B
’
C
C’


1
2
3
4
5
6
 
 
 
 


 
 








hosts have dedicated, direct connection to switch
switches buffer packets
Ethernet protocol used on 
each
 incoming link
, so: 
no collisions; full duplex
each link is its own collision domain
switching: 
A-to-A’ and B-to-B’ can transmit simultaneously, without collisions

Switch: multiple simultaneous transmissions
Link Layer: 6-
‹#›
switch with six interfaces (
1,2,3,4,5,6
)  
A
A
’
B
B
’
C
C’


1
2
3
4
5
6
 
 
 
 


 
 








hosts have dedicated, direct connection to switch
switches buffer packets
Ethernet protocol used on 
each
 incoming link, so: 
no collisions; full duplex
each link is its own collision domain
switching: 
A-to-A’ and B-to-B’ can transmit simultaneously, without collisions
but A-to-A’ and C to A’ can 
not 
happen simultaneously

Switch forwarding table
Link Layer: 6-
‹#›
A
A
’
B
B
’
C
C’


1
2
3
4
5
6
 
 
 
 


 
 








Q:
 
how does switch know A’ reachable via interface 4, B’ reachable via interface 5?
A:
  
each switch has a 
switch table
,
 
each entry:
(MAC address of host, interface to reach host, time stamp)
looks like a routing table!
Q:
 
how are entries created, maintained in switch table? 
something like a routing protocol?

Switch: self-learning
Link Layer: 6-
‹#›
A
A
’
B
B
’
C
C’


1
2
3
4
5
6
 
 
 
 


 
 








switch
 
learns
 
which hosts can be reached through which interfaces

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

Switch: frame filtering/forwarding
Link Layer: 6-
‹#›
when  frame received at switch:
1. 
record incoming link, MAC address of sending host
2. index switch table using MAC destination address
3. if
 
entry found
 for destination
  
then {
     
if
 
destination on segment from which frame arrived
       
then
 drop frame
           
else
 
forward frame
 on interface indicated by entry
     
  
}
   
      
else
 
flood  /* forward
 on all interfaces except arriving interface */

A
A
’
B
B
’
C
C’


1
2
3
4
5
6
 
 
 
 


 
 








Self-learning, forwarding: example
Link Layer: 6-
‹#›

A A’
Source: A
Dest: A’

MAC addr   interface    TTL
switch table 
(initially empty)
A
1
60

A A’

A A’

A A’

A A’

A A’

A’ A
A’
4
60
frame destination, A’, location unknown:
flood
destination A location known:
                selectively send 
on just one link

Interconnecting switches
Link Layer: 6-
‹#›
self-learning switches can be connected together:
Q:
 
sending from A to G - how does S
1
 know to forward frame destined to G via S
4
 and S
3
?
A:
 
self learning! (works exactly the same as in single-switch case!)
A
B
S
1
C



D
E
F
S
2
S
4
S
3
H
I
G

Self-learning multi-switch example
Link Layer: 6-
‹#›
Suppose C sends frame to I, I responds to C
Q:
 
show switch tables and packet forwarding in S
1
, S
2
, S
3
, S
4
 
A
B
S
1
C



D
E
F
S
2
S
4
S
3
H
I
G

Small institutional network
Link Layer: 6-
‹#›

to external
network
router
IP subnet
mail server
web server

Switches vs. routers
Link Layer: 6-
‹#›



application
transport
network
link
physical

network
link
physical

link
physical
switch

datagram

application
transport
network
link
physical


frame


frame

frame

datagram



6-
‹#›






                   
              




both are store-and-forward: 
routers
: 
network-layer devices (examine network-layer headers)
switches: 
link-layer devices (examine link-layer headers)

both have forwarding tables:
routers: 
compute tables
 using routing algorithms, IP addresses
switches: 
learn forwarding table
 using flooding, learning, MAC addresses

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

Virtual LANs (VLANs): motivation
Link Layer: 6-
‹#›




































































                   
              

















Computer 
Science

EE














Q: 
what happens as LAN sizes scale, users change point of attachment?
single broadcast domain:
scaling: 
all layer-2 broadcast traffic (ARP, DHCP, unknown MAC) must cross entire LAN 
efficiency, security, privacy issues

Virtual LANs (VLANs): motivation
Link Layer: 6-
‹#›
administrative issues:
CS user moves office to EE - 
physically
 attached to EE switch, but wants to remain
 logically 
attached to CS switch





































































                   
              



















Computer 
Science

EE


















single broadcast domain:
scaling: 
all layer-2 broadcast traffic (ARP, DHCP, unknown MAC) must cross entire LAN 
efficiency, security, privacy, efficiency issues
Q: 
what happens as LAN sizes scale, users change point of attachment?

1
8
2
7





9
16
10
15



Port-based VLANs
Link Layer: 6-
‹#›
switch(es) supporting VLAN capabilities can be configured to define multiple 
virtual 
LANS over single physical LAN infrastructure.

Virtual Local Area Network (VLAN)





port-based VLAN: 
switch ports grouped (by switch management software) so that 
single
 
physical switch ……

…
EE (VLAN ports 1-8)
CS (VLAN ports 9-15)
…

















… operates as 
multiple 
virtual switches



1
8
2
7








EE (VLAN ports 1-8)
…





9
16
10
15



…
CS (VLAN ports 9-15)

1
8
2
7





9
16
10
15



Port-based VLANs
Link Layer: 6-
‹#›





…
EE (VLAN ports 1-8)
CS (VLAN ports 9-15)
…






traffic isolation: 
frames to/from ports 1-8 can 
only
 reach ports 1-8
can also define VLAN based on MAC addresses of endpoints, rather than switch port
dynamic membership
:
 ports can be dynamically assigned among VLANs
forwarding between VLANS: 
done via routing (just as with separate switches)
in practice vendors sell combined switches plus routers

1
8
2
7






9
16
10
15



VLANS spanning multiple switches
Link Layer: 6-
‹#›





…
EE (VLAN ports 1-8)
CS (VLAN ports 9-15)
…








5
8
2
7



…









16
1


6
3
4

Ports 2,3,5 belong to EE VLAN
Ports 4,6,7,8 belong to CS VLAN
trunk port: 
carries frames between VLANS defined over multiple physical switches
frames forwarded within VLAN between switches can’t be vanilla 802.1 frames (must carry VLAN ID info)
802.1q protocol adds/removed additional header fields for frames forwarded between trunk ports

802.1Q VLAN frame format
Link Layer: 6-
‹#›
802.1 Ethernet frame

dest.
address
source
address
data (payload)
CRC
preamble
type
2-byte Tag Protocol Identifier
                        (value: 81-00) 
Tag Control Information 
(12 bit VLAN ID field, 3 bit priority field like IP TOS)
 
Recomputed 
CRC
 
802.1Q frame

dest.
address
source
address
data (payload)
CRC
preamble
type

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

Synthesis: a day in the life of a web request
Link Layer: 6-
‹#›
our journey down the protocol stack is now complete!
application, transport, network, link
putting-it-all-together: synthesis!
goal:
 
identify, review, understand protocols (at all layers) involved in seemingly simple scenario: requesting www page
scenario:
 
student attaches laptop to campus network, requests/receives www.google.com

A day in the life: scenario
Link Layer: 6-
‹#›


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


requests web page: 
www.google.com


scenario
:
Sounds 
simple!

A day in the life: connecting to the Internet
Link Layer: 6-
‹#›





























                   
              




router has 
DHCP server
arriving mobile:
DHCP client
connecting laptop 
needs to 
get its own IP
 address, addr of 
first-hop router
, addr of 
DNS server
: use 
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
DHCP request 
encapsulated
 
in 
UDP
, encapsulated in 
IP
, encapsulated in 
802.3 
Ethernet

Ethernet frame 
broadcast
 (dest: FFFFFFFFFFFF) on LAN, received at router running 
DHCP 
server
Ethernet 
demuxed
 to IP demuxed, UDP demuxed to DHCP

A day in the life: connecting to the Internet
Link Layer: 6-
‹#›





























                   
              




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




























DHCP server formulates 
DHCP ACK
 
containing client’s 
IP address
, IP address of 
first-hop
 router for client, name & IP address of 
DNS server


DHCP



DHCP





DHCP









DHCP








DHCP



DHCP





DHCP









DHCP

DHCP
encapsulation at DHCP server, frame forwarded (
switch learning
) through LAN, demultiplexing at client

Client now has IP address, knows name & addr of DNS 
server, IP address of its first-hop router
DHCP client receives DHCP ACK reply

A day in the life… ARP  
(before DNS, before HTTP)
Link Layer: 6-
‹#›





























                   
              




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




























before sending 
HTTP
 
request, need IP address of www.google.com:  
DNS

DNS

DNS



DNS





DNS query created, encapsulated in UDP, encapsulated in IP, encapsulated in Eth.  To send frame to router, need MAC address of router interface: 
ARP

ARP query 
broadcast, received by router, which replies with 
ARP reply 
giving MAC address of router interface
client now knows MAC address of first hop router, so can now send frame containing DNS query 




ARP query

ARP




ARP reply

A day in the life… using DNS
Link Layer: 6-
‹#›





























                   
              






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







IP datagram containing DNS query forwarded via LAN switch from client to 1
st
 hop router
IP datagram forwarded from campus network into Comcast network, routed (tables created by 
RIP, OSPF, IS-IS 
and/or 
BGP
 routing protocols) to DNS server
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
Link Layer: 6-
‹#›










                   
              

































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

to send HTTP request, client first opens 
TCP socket
 to web server
TCP 
SYN segment 
(step 1 in TCP 3-way handshake)
 inter-domain routed to web server
TCP 
connection established!







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
web server responds with 
TCP SYNACK 
(step 2 in TCP 3-way handshake)

A day in the life… HTTP request/reply 
Link Layer: 6-
‹#›










                   
              

































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

HTTP request 
sent into TCP socket
IP datagram containing HTTP request routed to www.google.com
IP datagram containing HTTP reply routed back to client
web server responds with 
HTTP reply 
(containing web page)

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






web page 
finally (!!!) 
displayed

Chapter 6: Summary
Link Layer: 6-
‹#›
principles behind data link layer services:
error detection, correction
sharing a broadcast channel: multiple access
link layer addressing
instantiation, implementation of various link layer technologies
Ethernet
switched LANS, VLANs

synthesis: a day in the life of a web request

HTTP, FTP, SSH
TCP, UDP
IP
Ethernet, BT
Udvalgte vigtige netværksprotokoller:
DCHP (UDP)
Få IP
ARP (UDP)
Find Mac
DNS (UDP)
Oversæt domæne til IP

Link Layer: 6-
‹#›

Additional Chapter 6 slides
Network Layer: 5-
‹#›
