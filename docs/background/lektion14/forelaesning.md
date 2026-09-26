# E22 62581 Lektion 14.pptx

Source: PowerPoint,
https://drive.google.com/file/d/1ZBQubAvYxziF_GI4hAdxBI55_LIQI-kz
(exported as plain text; slide-break formatting from the original is lost, but
all text content is preserved).

---

Computer Networking: A Top-Down Approach 
8
th
 Edition, Global Edition  
Jim Kurose, Keith Ross
Copyright © 2022 Pearson Education Ltd
Chapter 4
Network Layer:
Data Plane
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

Network-layer
Netværkslaget:
Service: Forbindelse mellem Hosts 
Sender på Host/Router niveau
Transportlaget:
Service: Forbindelse mellem processer 
Sender pakker mellem Hosts





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
                   
              





Network Layer: 4-
‹#›

Two key network-layer functions
network-layer functions:
F
orwarding:
 Packets from input link to (appropriate) output link
Foregår lokalt i routeren
analogy: taking a trip
forwarding
:
 process of getting through single interchange

forwarding
routing
routing:
 process of planning trip from source to destination

R
outing:
 
D
etermine route from source to destination
R
outing algorithms
Foregår globalt 
Network Layer: 4-
‹#›

Network layer: data plane, control plane
Data plane:
Forwarding
local
, per-router function
determines how datagram arriving on router input port is forwarded to router output port

Control plane
Routing
network-wide
 logic
determines how datagram is routed among routers along end-end path from source host to destination host


1
2
3



0111
values in arriving 
packet header








two control-plane approaches:
traditional routing algorithms: 
implemented in routers
software-defined networking (SDN)
: implemented in (remote) servers

Network Layer: 4-
‹#›

Router architecture overview
high-level view of generic router architecture:

high-speed 
switching
fabric

routing 
processor












router input ports












router output ports
forwarding data plane  
(hardware) operates in nanosecond timeframe
routing, management
control plane 
(software)
operates in millisecond 
time frame

Network Layer: 4-
‹#›

Longest prefix matching

when looking for forwarding table entry for given destination address, use 
longest
 address prefix that matches destination address.
longest prefix match
Destination Address Range                        
11001000  00010111  00010
11001000  00010111  00011000
11001000  00010111  00011
otherwise  
           

Link interface
0
1
2
3
********
***
********
***
********
11001000  00010111  00011000  10101010 
examples
:
which interface?
which interface?
11001000  00010111  00010110  10100001 
Network Layer: 4-
‹#›

Weighted Fair Queuing (WFQ): 
generalized Round Robin
Scheduling policies: weighted fair queueing







classify 
arrivals
departures

link
R



w
1

w
2

w
3
w
i
Σ
j
w
j
minimum bandwidth guarantee (per-traffic-class)
each class, 
i, 
has weight, 
w
i
, 
and
 
gets weighted amount of service in each cycle:
Network Layer: 4-
‹#›

Network layer: “data plane” roadmap
Network layer: overview
data plane
control plane
What’s inside a router
input ports, switching, output ports
buffer management, scheduling
IP: the Internet Protocol
datagram format
addressing
network address translation
IPv6
Generalized Forwarding, SDN
match+action
OpenFlow: match+action in action
Middleboxes

Network Layer: 4-
‹#›

Network Layer: Internet

host, router network layer functions:

IP protocol
 datagram format
 addressing
 packet handling conventions

ICMP protocol
 error reporting
 router “signaling”
transport layer: TCP, UDP
link layer
physical layer
network
layer

forwarding
table

Path-selection  algorithms: 
implemented in 
routing protocols (OSPF, 
BGP
)
SDN controller

Network Layer: 4-
‹#›

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
upper layer protocol 
(e.g., TCP or UDP)
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
Network Layer: 4-
‹#›

IP address:
 
32-bit identifier associated with each host or router 
interface
 
interface:
 connection between host/router and physical link
router’s typically have multiple interfaces
host typically has one or two interfaces 
(e.g., wired Ethernet, wireless 802.11)

IP addressing: introduction



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
223.1.1.1 = 11011111 00000001 00000001 00000001




223
1
1
1







                   
              




dotted-decimal IP address notation:
Network Layer: 4-
‹#›

IP addressing: introduction



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








A: 
wired 
Ethernet interfaces connected by Ethernet switches
A: 
wireless WiFi interfaces connected by WiFi base station
                   
              
















Routere har IP-
adresser
Switches har ikke IP-
adresser
Mere når vi når link-laget
Network Layer: 4-
‹#›

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
device interfaces that can physically reach each other 
without passing through an intervening router
"Området mellem 2 IP'er"
                   
              




network consisting of 3 subnets
IP addresses have structure:
 
subnet part: 
devices in same subnet have common high order bits
host part: remaining
 low order bits 

Network Layer: 4-
‹#›

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
Recipe for defining subnets:
detach each interface from its host or router, creating “islands” of isolated networks
each isolated network is called a 
subnet








                   
              




subnet mask: /24
(high-order 24 bits: subnet part of IP address)
subnet
223.1.3.0/24
subnet 223.1.1.0/24
subnet 223.1.2.0/24
Network Layer: 4-
‹#›

Subnets
where are the subnets?
what are the /24 subnet addresses?





223.1.1.1

223.1.1.3
223.1.1.4

223.1.2.2

223.1.2.6

223.1.3.2
223.1.3.1

223.1.3.27
223.1.1.2
223.1.7.0
223.1.7.1
223.1.8.0
223.1.8.1
223.1.9.1
223.1.9.2



                   
              




                   
              




                   
              








223.1.2.1
subnet 223.1.1/24
subnet 223.1.7/24
subnet 223.1.3/24
subnet 223.1.2/24
subnet 223.1.9/24
subnet 223.1.8/24
Network Layer: 4-
‹#›

IP addressing: CIDR
CIDR:
 
C
lassless 
I
nter
D
omain 
R
outing 
(pronounced “cider”)
subnet portion of address of arbitrary length
address format: 
a.b.c.d/x
, where x is # bits in subnet portion of address

11001000  00010111  0001000
0  00000000
subnet
part
host
part
200.23.16.0/23
Network Layer: 4-
‹#›

IP addresses: how to get one?
That’s actually 
two
 questions:
Q: How does a 
host
 get IP address within its network (host part of address)?
Q: How does a 
network
 get IP address for itself (network part of address)
How does 
host
 
get IP address?
hard-coded
 by sysadmin in config file (e.g., /etc/rc.config in UNIX)
DHCP
:
 
D
ynamic 
H
ost 
C
onfiguration 
P
rotocol: dynamically get address from as server
“plug-and-play”
Network Layer: 4-
‹#›

DHCP: Dynamic Host Configuration Protocol
goal:
 host 
dynamically 
obtains IP
 address from network server when it “joins” network
can 
renew its lease
 on address in use
allows 
reuse
 of addresses (only hold address while connected/on)
support for mobile users who join/leave network 
DHCP overview:
host broadcasts 
DHCP discover
 msg [optional]
DHCP server responds with 
DHCP offer
 msg [optional]
host requests IP address: 
DHCP request
 
msg
DHCP server sends address: 
DHCP ack
 msg 
Network Layer: 4-
‹#›

DHCP client-server scenario



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







                   
              




DHCP server




























223.1.2.5



















arriving 
DHCP client
 needs 
address in this network

Typically, 
DHCP server
 will be  co-located 
in router
, serving all subnets to which router is attached
Network Layer: 4-
‹#›

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
The two steps above can be skipped “if a client remembers and wishes to reuse a previously allocated network address” 
[RFC 2131]
Network Layer: 4-
‹#›

DHCP: more than IP addresses
DHCP can return more than just allocated IP address on subnet:
address of 
first-hop router
 for client
name and IP address of 
DNS sever
network mask
 (indicating network versus host portion of address)

Network Layer: 4-
‹#›

DHCP: example
Connecting laptop will use DHCP to get IP address, address of first-hop router, address of DNS server.
router with DHCP 
server built into 
router
DHCP
 REQUEST message encapsulated in 
UDP
, encapsulated in IP, encapsulated in 
Ethernet
Ethernet frame 
broadcast
 (dest: 
FFFFFFFFFFFF
) on LAN, received at router running DHCP server
Ethernet demux’ed to IP demux’ed, UDP demux’ed to DHCP 
168.1.1.1























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




























Network Layer: 4-
‹#›

DHCP: example
DCP server formulates 
DHCP ACK
 containing 
client’s IP address
, IP address of 
first-hop router
 for client, name & IP address of 
DNS server

encapsulated DHCP server reply forwarded to client, demuxing up to DHCP at client



















router with DHCP 
server built into 
router

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
UDP
IP
Eth
Phy

DHCP



DHCP





DHCP









DHCP
client 
now knows its IP address, name and IP address of DNS server, IP address of its first-hop router





























Network Layer: 4-
‹#›

IP addresses: how to get one?
Q:
 how does 
network
 get subnet part of IP address?
A:
 gets allocated portion of its provider ISP’s address space
ISP's block          
11001000  00010111  0001
0000  00000000    200.23.16.0/20
 


ISP can then allocate out its address space in 8 blocks: 

Organization 0    
11001000  00010111  0001000
0  00000000    200.23.16.0/23 
Organization 1    
11001000  00010111  0001001
0  00000000    200.23.18.0/23 
Organization 2    
11001000  00010111  0001010
0  00000000    200.23.20.0/23 
   ...                                          …..                                   ….                ….
Organization 7    
11001000  00010111  0001111
0   00000000    200.23.30.0/23
 

Network Layer: 4-
‹#›

Hierarchical addressing: route aggregation


“Send me anything
with addresses 
beginning 
200.23.16.0/20”

200.23.16.0/23

200.23.18.0/23

200.23.30.0/23
Fly-By-Night-ISP

Organization 0
Organization 7
Internet
Organization 1

ISPs-R-Us

“Send me anything
with addresses 
beginning 
199.31.0.0/16”

200.23.20.0/23
Organization 2
.
.
.
.
.
.
hierarchical addressing allows efficient advertisement of routing  information:
Network Layer: 4-
‹#›

Hierarchical addressing
: more specific routes


“Send me anything
with addresses 
beginning 
200.23.16.0/20”

200.23.16.0/23

200.23.30.0/23
Fly-By-Night-ISP

Organization 0
Organization 7
Internet

200.23.18.0/23
Organization 1

ISPs-R-Us

“Send me anything
with addresses 
beginning 
199.31.0.0/16”

200.23.20.0/23
Organization 2
.
.
.
.
.
.
Organization 1 
moves from Fly-By-Night-ISP to ISPs-R-Us
ISPs-R-Us now advertises a more specific route to 
Organization 1

200.23.18.0/23
Organization 1
“or 
200.23.18.0/23
”
Network Layer: 4-
‹#›

Hierarchical addressing
: more specific routes


“Send me anything
with addresses 
beginning 
200.23.16.0/20”

200.23.16.0/23

200.23.30.0/23
Fly-By-Night-ISP

Organization 0
Organization 7
Internet

ISPs-R-Us

“Send me anything
with addresses 
beginning 
199.31.0.0/16”

200.23.20.0/23
Organization 2
.
.
.
.
.
.
Organization 1 
moves from Fly-By-Night-ISP to ISPs-R-Us
ISPs-R-Us now advertises a more specific route to 
Organization 1

200.23.18.0/23
Organization 1
“or 
200.23.18.0/23
”

Network Layer: 4-
‹#›

IP addressing: last words ...
Q:
 how does an ISP get block of addresses?
A:
 
ICANN
: 
I
nternet 
C
orporation for 
A
ssigned  
N
ames and 
N
umbers http://www.icann.org/
allocates IP addresses, through 
5 regional registries (RRs) 
(who may then allocate to local registries)
manages DNS root zone, including delegation of individual TLD (.com, .edu , …) management 

Q:
 are there enough 32-bit IP addresses?
ICANN allocated last chunk of IPv4 addresses to RRs in 2011
NAT (next) helps IPv4 address space exhaustion
IPv6 has 128-bit address space
"Who the hell knew how much address space we needed?"  Vint Cerf (reflecting on decision to make IPv4 address 32 bits long)
Network Layer: 4-
‹#›

Network layer: “data plane” roadmap
Network layer: overview
data plane
control plane
What’s inside a router
input ports, switching, output ports
buffer management, scheduling
IP: the Internet Protocol
datagram format
addressing
network address translation
IPv6
Generalized Forwarding, SDN
match+action
OpenFlow: match+action in action
Middleboxes

Network Layer: 4-
‹#›

10.0.0.1
10.0.0.2
10.0.0.3
10.0.0.4
local network (e.g., home network) 10.0.0/24




138.76.29.7
rest of
Internet
                   
              




NAT: network address translation
datagrams with source or destination in this network have 10.0.0/24 address for  source, destination (as usual)
all
 
datagrams 
leaving
 local network have 
same
 source NAT IP
 address: 138.76.29.7,  but 
different
 source port
 numbers
NAT:
 
all devices in local network share just 
one
 IPv4 address as far as outside world is concerned
Network Layer: 4-
‹#›

all devices in local network have 
32-bit addresses in a 
“private” IP address space
 (10/8, 172.16/12, 192.168/16 prefixes) that can only be used in local network
advantages:
just 
one
 IP address needed from provider ISP for 
all
 devices
can c
hange addresses of host
 in local network without notifying outside world
can change ISP without changing addresses
 of devices in local network
security: devices inside local net not directly addressable, visible by outside world

NAT: network address translation
Network Layer: 4-
‹#›

implementation:
 
NAT router
 must (transparently):
outgoing datagrams:
 replace
 (
source IP address, port #
) of every outgoing datagram to (
NAT IP address, new port #
)
remote clients/servers will respond using (NAT IP address, new port #) as destination address
remember (in 
NAT translation table
)
 
every (source IP address, port #)  to (NAT IP address, new port #) translation pair
incoming datagrams: replace
 (
NAT IP address, new port #
) in destination fields of every incoming datagram with corresponding (
source IP address, port #
) stored in NAT table
NAT: network address translation
Network Layer: 4-
‹#›

NAT: network address translation



S: 10.0.0.1, 3345
D: 128.119.40.186, 80




1
10.0.0.4
138.76.29.7
1:
 
host 10.0.0.1 sends datagram to 128.119.40.186, 80


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
2:
 
NAT router changes datagram source address from 10.0.0.1, 3345 to 138.76.29.7, 5001,
updates table

S: 128.119.40.186, 80 
D: 138.76.29.7, 5001




3
3:
 
reply arrives, destination address: 138.76.29.7, 5001
10.0.0.1
10.0.0.2
10.0.0.3



                   
              




Network Layer: 4-
‹#›
4
:
 
NAT Router changes 
, destination address: 
10.0.0.1, 3345

NAT has been controversial:
routers “should” only process up to layer 3 
address “shortage” should be solved by IPv6
violates end-to-end argument 
(port # manipulation by network-layer device)
NAT traversal: what if client wants to connect to server behind NAT?
but NAT is here to stay:
extensively used in home and institutional nets, 4G/5G cellular  nets
NAT: network address translation
Network Layer: 4-
‹#›

initial motivation:
 32-bit IPv4 address space would be completely allocated  
additional motivation:
speed processing/forwarding: 40-byte fixed length header
enable different network-layer treatment of “flows”

IPv6: motivation
Network Layer: 4-
‹#›

IPv6 datagram format

 payload (data)
destination address
(128 bits)
source address
(128 bits)
payload len
next hdr
hop limit
flow label
pri
ver
32 bits
priority:  
identify priority among datagrams in flow
flow label: 
identify datagrams in same "flow.” (concept of “flow” not well defined).
128-bit 
IPv6 addresses
What’s missing (compared with IPv4): 
no checksum (to speed processing at routers)
no fragmentation/reassembly
no options (available as upper-layer, next-header protocol at router)
Network Layer: 4-
‹#›

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
t
unneling: 
IPv6 datagram carried as 
payload
 in IPv4 datagram among IPv4 
routers (“packet within a packet”)
tunneling used extensively in other contexts (4G/5G)

Network Layer: 4-
‹#›

Tunneling and encapsulation
Ethernet connecting two IPv6 routers:

Ethernet connects two IPv6 routers
A
B
IPv6
IPv6
                   
              




                   
              




E
F
IPv6
IPv6
                   
              




                   
              




Link-layer frame



IPv6 datagram
















The usual: datagram as payload in link-layer frame

                   
              




                   
              




                   
              




                   
              




A
B
IPv6
IPv6/
v4
                   
              




                   
              




E
F
IPv6/
v4
IPv6
                   
              




                   
              




IPv4 network
IPv4 network connecting two IPv6 routers

Network Layer: 4-
‹#›

Tunneling and encapsulation
Ethernet connecting two IPv6 routers:

Ethernet connects two IPv6 routers
A
B
IPv6
IPv6
                   
              




                   
              




E
F
IPv6
IPv6
                   
              




                   
              




IPv4 tunnel connecting two IPv6 routers

IPv4 tunnel 
connecting IPv6 routers
A
B
IPv6
                   
              




                   
              




E
F
IPv6
                   
              




                   
              




Link-layer frame



IPv6 datagram
















The usual: datagram as payload in link-layer frame
IPv4 datagram



IPv6 datagram












tunneling: IPv6 datagram as payload in a IPv4 datagram





IPv6/
v4
IPv6/
v4
Network Layer: 4-
‹#›

B-to-C:
IPv6 inside
IPv4


Flow: X
Src: A
Dest: F


data
src:B
dest: E
Tunneling
physical view:
IPv4
IPv4
E
IPv6/
v4
IPv6
F
C
D
                   
              




A
B
IPv6
IPv6/
v4
                   
              




                   
              




                   
              




                   
              




                   
              





logical view:
IPv4 tunnel 
connecting IPv6 routers
A
B
IPv6
IPv6/
v4
                   
              




                   
              




E
F
IPv6/
v4
IPv6
                   
              




                   
              





flow: X
src: A
dest: F


data
A-to-B:
IPv6


Flow: X
Src: A
Dest: F


data
src:B
dest: E
B-to-C:
IPv6 inside
IPv4
E-to-F:
IPv6

flow: X
src: A
dest: F


data
B-to-C:
IPv6 inside
IPv4


Flow: X
Src: A
Dest: F


data
src:B
dest: E








Note source and destination addresses!

Network Layer: 4-
‹#›

Google
1
: ~ 30% of clients access services via IPv6
NIST: 1/3 of all US government domains are IPv6 capable
IPv6: adoption
1
 
https://www.google.com/intl/en/ipv6/statistics.html
Network Layer: 4-
‹#›

Google
1
: ~ 30% of clients access services via IPv6
NIST: 1/3 of all US government domains are IPv6 capable
Long (long!) time for deployment, use
25 years and counting!
think of application-level changes in last 25 years: WWW, social media, streaming media, gaming, telepresence, …
Why?
IPv6: adoption
1
 
https://www.google.com/intl/en/ipv6/statistics.html
Network Layer: 4-
‹#›

Network layer: “data plane” roadmap
Network layer: overview
data plane
control plane
Generalized Forwarding, SDN
Match+action
OpenFlow: match+action in action
Middleboxes

Network Layer: 4-
‹#›
What’s inside a router
input ports, switching, output ports
buffer management, scheduling
IP: the Internet Protocol
datagram format
addressing
network address translation
IPv6

The IP hourglass







IP
TCP 
UDP
HTTP
SMTP
QUIC
DASH
RTP
…





Ethernet
WiFi
Bluetooth
PPP
PDCP
…
copper   radio   fiber
Internet’s “thin waist”: 
one
 network layer protocol: IP 
must
 be implemented by every (billions) of Internet-connected devices
many
 protocols in physical, link, transport, and application layers

The end-end argument
some network functionality (e.g., reliable data transfer, congestion) can be implemented 
in network
, or at 
network edge
end-end implementation of reliable data transfer



application
transport
network
data link
physical



application
transport
network
data link
physical





                   
              




                   
              




                   
              




                   
              




                   
              




                   
              




                   
              
























































                   
              




                   
              







application
transport
network
data link
physical






















application
transport
network
data link
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
                   
              




                   
              




                   
              




                   
              






network
link
physical
                   
              




hop-by-hop (in-network) implementation of reliable data transfer

Chapter 4: done!
Network layer: overview
What’s inside a router
IP: the Internet Protocol
