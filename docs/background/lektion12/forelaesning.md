# E22 62581 Lektion12.pptx

Source: PowerPoint,
https://drive.google.com/file/d/1wjn_XYFQl9WtWdB77U4BKSLn23BNlP6Q
(exported as plain text; slide-break formatting from the original is lost, but
all text content is preserved).

---

Computer Networking: A Top-Down Approach 
8
th
 Edition, Global Edition  
Jim Kurose, Keith Ross
Copyright © 2022 Pearson Education Ltd
Chapter 3
Transport Layer
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
Transport Layer: 3-
‹#›

Chapter 3: roadmap
Transport-layer services
Multiplexing and demultiplexing
Connectionless transport: UDP
Principles of reliable data transfer 
Connection-oriented transport: TCP
Principles of congestion control
TCP congestion control
Evolution of transport-layer functionality

Transport Layer: 3-
‹#›

Congestion:
informally: “too many sources sending too much data too fast for 
network
 to handle”
manifestations:
long delays (queueing in router buffers)
packet loss (buffer overflow at routers)


different from flow control!
Principles of congestion control
congestion control: 
too many senders, sending too fast
flow control: 
one sender too fast for one receiver
a top-10 problem!

Transport Layer: 3-
‹#›

Causes/costs of congestion: scenario 1 


Simplest scenario:

maximum per-connection throughput: R/2
Host A
Host B
throughput:
 
λ
out
large delays as arrival rate 
λ
in
 
approaches capacity

























































Q: 
What happens as arrival rate 
λ
in
 
approaches R/2? 

original data: 
λ
in
 
R
two flows
one router, infinite buffers 
input, output link capacity: R

infinite
 shared output link buffers








R
no retransmissions needed


R/2
delay
λ
in


R/2

R/2
R/2
λ
out
λ
in
throughput: 

Transport Layer: 3-
‹#›

Causes/costs of congestion: scenario 2
one router, 
finite
 buffers 








                   
              






Host A
Host B

























































λ
in
 
: original data


λ
'
in
:
 
original data, 
plus
 retransmitted data
finite
 shared output link buffers





sender retransmits lost, timed-out packet
application-layer input = application-layer output:
 λ
in 
= 
λ
out
transport-layer input includes 
retransmissions 
:
 λ
’
in 
   
λ
in



λ
out
R
R
Transport Layer: 3-
‹#›

Host A
Host B

























































λ
in
 
: original data


λ
'
in
:
 
original data, 
plus
 retransmitted data
finite
 shared output link buffers




Causes/costs of congestion: scenario 2




copy
free buffer space!
Idealization: 
perfect knowledge
sender sends only when router buffers available 


λ
out
R
R
R/2
λ
in

R/2
λ
out
throughput: 

Transport Layer: 3-
‹#›

Host A
Host B

























































λ
in
 
: original data


λ
'
in
:
 
original data, 
plus
 retransmitted data
finite
 shared output link buffers




R
R
Causes/costs of congestion: scenario 2


copy
no buffer space!
Idealization: 
some 
perfect knowledge
packets can be lost (dropped at router) due  to full buffers
sender knows when packet has been dropped: only resends if packet 
known
 to be lost
Transport Layer: 3-
‹#›

Host A
Host B

























































λ
in
 
: original data


λ
'
in
:
 
original data, 
plus
 retransmitted data
finite
 shared output link buffers




R
R
Causes/costs of congestion: scenario 2

free buffer space!

Idealization: 
some 
perfect knowledge
packets can be lost (dropped at router) due  to full buffers
sender knows when packet has been dropped: only resends if packet 
known
 to be lost
when sending at R/2, some packets are needed retransmissions

λ
in

R/2
λ
out
throughput: 

R/2




“wasted” capacity due to retransmissions
Transport Layer: 3-
‹#›

Host A
Host B

























































λ
in
 
: original data


λ
'
in
:
 
original data, 
plus
 retransmitted data
finite
 shared output link buffers




R
R
Causes/costs of congestion: scenario 2





copy

timeout
Realistic scenario: 
un-needed
 
duplicates
packets can be lost, dropped at router due  to full buffers – requiring retransmissions
but sender times can time out prematurely, sending 
two
 
copies, 
both
 of which are delivered

free buffer space!
when sending at R/2, some packets are retransmissions, including needed and 
un-needed
 duplicates, that are delivered!
“wasted” capacity due to un-needed retransmissions


λ
in

R/2
λ
out
throughput: 

R/2


Transport Layer: 3-
‹#›

Causes/costs of congestion: scenario 2
“costs” of congestion:
 
more work (retransmission) for given receiver throughput
unneeded retransmissions: link carries multiple copies of a packet
decreasing maximum achievable throughput

Realistic scenario: 
un-needed
 
duplicates
packets can be lost, dropped at router due  to full buffers – requiring retransmissions
but sender times can time out prematurely, sending 
two
 
copies, 
both
 of which are delivered

when sending at R/2, some packets are retransmissions, including needed and 
un-needed
 duplicates, that are delivered!
“wasted” capacity due to un-needed retransmissions


λ
in

R/2
λ
out
throughput: 

R/2


Transport Layer: 3-
‹#›

Causes/costs of congestion: scenario 3
four 
senders
multi-hop
 paths
timeout/retransmit

Q:
 
what happens as 
λ
in
 
and
 
λ
in
’
 
increase ?
A:
 
as red  
λ
in
’
 
increases, all arriving blue pkts at upper queue are dropped, blue throughput 
→
 
0
                   
              




                   
              




                   
              




finite shared output link buffers
Host A
λ
out
                   
              




Host B
Host C
Host D

λ
in
 
: 
original data

λ
'
in
:
 
original data, 
plus
 retransmitted data

































































































































Transport Layer: 3-
‹#›

Causes/costs of congestion: scenario 3

another “cost” of congestion: 
when packet dropped, any upstream transmission capacity and buffering used for that packet was wasted!

















R/2
R/2
λ
out
λ
in
’
Transport Layer: 3-
‹#›

Causes/costs of congestion: insights

upstream transmission capacity / buffering wasted for packets lost downstream
delay increases as capacity approached 
un-needed duplicates further decreases effective throughput
loss/retransmission decreases effective throughput
throughput can never exceed capacity 
Transport Layer: 3-
‹#›

End-end congestion control:
no explicit feedback from network
congestion 
inferred
 from observed loss, delay
Approaches towards congestion control








                   
              




                   
              




                   
              




                   
              




                   
              




                   
              







data
data

ACKs
ACKs





























approach taken by TCP
Transport Layer: 3-
‹#›

TCP ECN, ATM, DECbit protocols
Approaches towards congestion control








                   
              




                   
              




                   
              




                   
              




                   
              




                   
              










































data
data

ACKs
ACKs
explicit congestion info
Network-assisted congestion control:
routers provide 
direct
 feedback to sending/receiving hosts with flows passing through congested router
may indicate congestion level or explicitly set sending rate
Transport Layer: 3-
‹#›

Chapter 3: roadmap
Transport-layer services
Multiplexing and demultiplexing
Connectionless transport: UDP
Principles of reliable data transfer 
Connection-oriented transport: TCP
Principles of congestion control
TCP congestion control
Evolution of transport-layer functionality

Transport Layer: 3-
‹#›

TCP congestion control: AIMD
approach: 
senders can
 
increase sending rate until packet loss (congestion) occurs, then decrease sending rate on loss event
AIMD
 sawtooth
behavior: 
probing
for bandwidth

TCP sender  Sending rate
time

increase sending rate 
by 
1 maximum segment size every RTT until loss detected
A
dditive 
I
ncrease

cut sending rate in half at each loss event

M
ultiplicative 
D
ecrease
Transport Layer: 3-
‹#›

TCP AIMD: more
Multiplicative decrease 
detail:  sending rate is 
Cut in half on loss detected by triple duplicate ACK (TCP Reno)
Cut to 1 MSS (maximum segment size) when loss detected by timeout (TCP Tahoe)


Why
 
A
I
M
D
?
 
 
AIMD – a distributed, asynchronous algorithm – has been shown to:
optimize congested flow rates network wide!
have desirable stability properties


Transport Layer: 3-
‹#›

TCP congestion control: details

TCP sender limits transmission:
cwnd 
is dynamically adjusted in response to observed network congestion (implementing TCP congestion control)

LastByteSent- LastByteAcked
<
cwnd


last byte
ACKed
last byte sent





































cwnd
sender sequence number space 

available but not used
TCP sending behavior:
roughly:
 send 
cwnd
 bytes, wait RTT for ACKS, then send more bytes

TCP rate
~
~
cwnd
RTT
bytes/sec
sent, but not-yet ACKed 
(“in-flight”)
Transport Layer: 3-
‹#›

TCP slow start 
when connection begins, increase rate exponentially until first loss event:
initially 
cwnd
 = 1 MSS
double 
cwnd
 every RTT
done by incrementing 
cwnd
 for every ACK received
Host A
one segment
Host B
RTT

time
two segments
four segments





























summary: 
initial rate is slow, but ramps up exponentially fast
Transport Layer: 3-
‹#›

TCP: from slow start to congestion avoidance
Q: 
when should the exponential increase switch to linear? 
A: 
when 
cwnd
 gets to 1/2 of its value before timeout.
Implementation:
variable 
ssthresh
 
on loss event, 
ssthresh
 is set to 1/2 of 
cwnd
 
just before loss event
* Check out the online interactive exercises for more examples: h
ttp://gaia.cs.umass.edu/kurose_ross/interactive/



X
Transport Layer: 3-
‹#›

Summary: TCP congestion control
timeout
ssthresh = cwnd/2
cwnd = 1 MSS
dupACKcount = 0
retransmit missing segment
 
Λ
cwnd > ssthresh

congestion
avoidance 

cwnd = cwnd + MSS    (MSS/cwnd)
dupACKcount = 0
transmit new segment(s), as allowed

new ACK
.

dupACKcount++

duplicate ACK


 

fast
recovery 


cwnd = cwnd + MSS
transmit new segment(s), as allowed

duplicate ACK
ssthresh= cwnd/2
cwnd = ssthresh + 3
retransmit missing segment

dupACKcount == 3
timeout
ssthresh = cwnd/2
cwnd = 1 
dupACKcount = 0
retransmit missing segment
 


ssthresh= cwnd/2
cwnd = ssthresh + 3
retransmit missing segment

dupACKcount == 3


cwnd = ssthresh
dupACKcount = 0


New ACK

slow 
start
timeout
ssthresh = cwnd/2 
cwnd = 1 MSS
dupACKcount = 0
retransmit missing segment
 
cwnd = cwnd+MSS
dupACKcount = 0
transmit new segment(s), as allowed

new ACK


dupACKcount++

duplicate ACK

Λ
cwnd = 1 MSS
ssthresh = 64 KB
dupACKcount = 0

New
ACK!

New
ACK!

New
ACK!
Transport Layer: 3-
‹#›

TCP CUBIC
Is there a better way than AIMD to “probe” for usable bandwidth?


W
max
W
max
/2

classic TCP
TCP CUBIC - higher throughput in this example
Insight/intuition: 
W
max
: sending rate at which congestion loss was detected
congestion state of bottleneck link probably (?) hasn’t changed much






after cutting rate/window in half on loss, initially ramp to to W
max
 
faster
, but then approach W
max 
more 
slowly

Transport Layer: 3-
‹#›

TCP fairness
Fairness goal:
 if
 K 
TCP sessions share same bottleneck link of bandwidth 
R
, each should have average rate of 
R/K



TCP connection 1
bottleneck
router
capacity R



TCP connection 2


Transport Layer: 3-
‹#›

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
A: 
Yes, under idealized assumptions:
same RTT
fixed number of sessions only in congestion avoidance 


Is
 TCP fair?

Transport Layer: 3-
‹#›

Fairness: must all network apps be “fair”?
Fairness and UDP
multimedia apps often do not use TCP
do not want rate throttled by congestion control
instead use UDP:
send audio/video at constant rate, tolerate packet loss
there is no “Internet police” policing use of congestion control

Fairness, parallel TCP connections
application can open 
multiple
 parallel connections between two hosts
web browsers do this , e.g., link of rate R with 9 existing connections:
new app asks for 1 TCP, gets rate R/10
new app asks for 11 TCPs, gets R/2 


Transport Layer: 3-
‹#›

Chapter 3: summary
Transport Layer: 3-
‹#›
principles behind transport layer services:
multiplexing, demultiplexing
reliable data transfer
flow control
congestion control
instantiation, implementation in the Internet
UDP
TCP
Up next:
leaving the network “edge” 
(application, transport layers)
into the network “core”
two network-layer chapters
:
data plane
control plane

Network layer
Transport Layer: 3-
‹#›

Network layer: our goals
forwarding versus routing
how a router works
addressing
generalized forwarding
Internet architecture

instantiation, implementation in the Internet
IP protocol
NAT, middleboxes
Transport Layer: 3-
‹#›

Network layer: “data plane” roadmap
Network layer: overview
data plane
control plane
Generalized Forwarding, SDN
Match+action
OpenFlow: match+action in action
Middleboxes

Transport Layer: 3-
‹#›
What’s inside a router
input ports, switching, output ports
buffer management, scheduling
IP: the Internet Protocol
datagram format
addressing
network address translation
IPv6

Network-layer  services and protocols
transport segment from sending to receiving host 
sender: 
encapsulates segments into datagrams/
packets
, passes to link layer
receiver: 
delivers segments to transport layer protocol
network layer protocols in 
every Internet device
: hosts, routers
routers
:
examines header fields in all IP datagrams passing through it
moves datagrams from input ports to output ports to transfer datagrams along end-end path





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
                   
              





Transport Layer: 3-
‹#›

Two key network-layer functions
network-layer functions:
forwarding:
 move packets from a router’s input link to appropriate router output link

analogy: taking a trip
forwarding
:
 process of getting through single interchange

forwarding
routing
routing:
 process of planning trip from source to destination

routing:
 determine route taken by packets from source to destination
routing algorithms

Transport Layer: 3-
‹#›

Network layer: data plane, control plane
Data plane:
local
, per-router function
determines how datagram arriving on router input port is forwarded to router output port

Control plane
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

Transport Layer: 3-
‹#›

Per-router control plane
Individual routing algorithm components 
in each and every router 
interact in the control plane































































































Routing
Algorithm




data
plane
control
plane




1
2


0111








values in arriving 
packet header
3
Transport Layer: 3-
‹#›

Software-Defined Networking (SDN) control plane
Remote controller computes, installs forwarding tables in routers




























































data
plane
control
plane











































































































Remote Controller


CA


CA


CA


CA


CA
1
2


0111








3
values in arriving 
packet header
Transport Layer: 3-
‹#›

Network service model
example services for 
individual
 datagrams
:
guaranteed delivery
guaranteed delivery with less than 40 msec delay

example services for a 
flow
 of datagrams:
in-order datagram delivery
guaranteed minimum bandwidth to flow
restrictions on changes in inter-packet spacing

Q:
 What 
service model
 for “channel” transporting datagrams from sender to receiver?
Transport Layer: 3-
‹#›

Network-layer service model
Network
Architecture

Internet

ATM

ATM

Internet

Internet
Service
Model

best effort

Constant Bit Rate

Available Bit Rate

Intserv Guaranteed
(RFC 1633
)
Diffserv  
(RFC 2475
) 
Bandwidth

none

Constant rate

Guaranteed min

yes

possible
Loss

no

yes

no

yes

possibly
Order

no

yes

yes

yes

possibly
Timing

no

yes

no

yes

no

No
 guarantees on
: 
successful
 
datagram delivery to destination
timing or order of delivery
bandwidth available to end-end flow

Internet  “best effort” service model
Quality of Service (QoS) Guarantees ?
Transport Layer: 3-
‹#›

Network-layer service model
Network
Architecture

Internet

ATM

ATM

Internet

Internet
Service
Model

best effort

Constant Bit Rate

Available Bit Rate

Intserv Guaranteed
(RFC 1633
)
Diffserv  
(RFC 2475
) 
Bandwidth

none

Constant rate

Guaranteed min

yes

possible
Loss

no

yes

no

yes

possibly
Order

no

yes

yes

yes

possibly
Timing

no

yes

no

yes

no
Quality of Service (QoS) Guarantees ?
Transport Layer: 3-
‹#›

Reflections on best-effort  service:
simplicity of mechanism 
has allowed Internet to be widely deployed adopted
sufficient 
provisioning of bandwidth
 allows performance of real-time applications (e.g., interactive voice, video) to be “good enough” for “most of the time”
replicated, application-layer distributed services 
(datacenters, content distribution networks) connecting close to clients’ networks, allow services to be provided from multiple locations
congestion control of “elastic” services helps

It’s hard to argue with success of best-effort service model 
Transport Layer: 3-
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
Match+action
OpenFlow: match+action in action
Middleboxes

Transport Layer: 3-
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

Transport Layer: 3-
‹#›

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


decentralized switching
:
 
using header field values, lookup output port using forwarding table in input port memory 
(“match plus action”)
goal: complete input port processing at ‘line speed’
input port queuing: 
if datagrams arrive faster than forwarding rate into switch fabric
Transport Layer: 3-
‹#›

Input port functions

line
termination

lookup,
forwarding


queueing
decentralized switching
:
 
using header field values, lookup output port using forwarding table in input port memory 
(“match plus action”)
destination-based forwarding: 
forward based only on destination IP address (traditional)
generalized forwarding: 
forward based on any set of header field values
physical layer:
bit-level reception
switch
fabric

link 
layer 
protocol
(receive)

link layer:
e.g., Ethernet
(chapter 6)
Transport Layer: 3-
‹#›

Q:
 but what happens if ranges don’t divide up so nicely? 

Destination-based forwarding
3
Transport Layer: 3-
‹#›

Longest prefix matching

when looking for forwarding table entry for given destination address, use 
longest
 address prefix that matches destination address.
longest prefix match
Destination Address Range                        
11001000  00010111  00010
11001000  00010111  00011
***
11001000  00010111  00011000
o
therwise  
           
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
examples
:
which interface?
which interface?
11001000  00010111  00010110  10100001 
Transport Layer: 3-
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
11001000  00010111  00011000  10101010 
examples
:
which interface?
which interface?
********
***
********
***
********
11001000  00010111  00010110  10100001 






match!
Transport Layer: 3-
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
11001000  00010111  00011000  10101010 
examples
:
which interface?
which interface?
********
***
********
***
********
11001000  00010111  00010110  10100001 






match!
Transport Layer: 3-
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
11001000  00010111  00011000  10101010 
examples
:
which interface?
which interface?
********
***
********
***
********
11001000  00010111  00010110  10100001 






match!
Transport Layer: 3-
‹#›

we’ll see
 why 
longest prefix matching is used shortly, when we study addressing
longest prefix matching: often performed using ternary content addressable memories (TCAMs)
content addressable: 
present address to TCAM: retrieve address in one clock cycle, regardless of table size
Cisco Catalyst:  ~1M routing table entries in TCAM

Longest prefix matching
Transport Layer: 3-
‹#›

transfer packet from input link to appropriate output link

Switching fabrics

high-speed 
switching
fabric
N input ports




N output ports




. . . 
. . . 








switching rate: 
rate at which packets can be transfer from inputs to outputs
often measured as multiple of input/output line rate
N inputs: switching rate N times line rate desirable
R
R
R
R
(rate: NR, ideally)
Transport Layer: 3-
‹#›

Switching fabrics
























bus

























memory
memory



































interconnection
network

three major types of switching fabrics:
transfer packet from input link to appropriate output link

switching rate: 
rate at which packets can be transfer from inputs to outputs
often measured as multiple of input/output line rate
N inputs: switching rate N times line rate desirable
Transport Layer: 3-
‹#›

first generation routers:
traditional computers with switching under direct control of CPU
packet copied to system’s memory
speed limited by memory bandwidth (2 bus crossings per datagram)
Switching via memory

input
 
port
(e.g.,
Ethernet)
memory


output
 
port
(e.g.,
Ethernet)
system bus


Transport Layer: 3-
‹#›

datagram from input port memory to output port memory via a shared bus
bus contention:
  switching speed limited by bus bandwidth
Switching via a bus

























Transport Layer: 3-
‹#›

scaling, using multiple switching “planes” in parallel: 
speedup, scaleup via parallelism
Switching via interconnection network









fabric plane 0
. . .
. . .

fabric plane 1
. . .
. . .

fabric plane 2
. . .
. . .

fabric plane 3
. . .
. . .

fabric plane 4
. . .
. . .

fabric plane 5
. . .
. . .

fabric plane 6
. . .
. . .

fabric plane 7
. . .
. . .




























Cisco CRS router:
basic unit: 8 switching planes
each plane: 3-stage interconnection network
up to 100’s Tbps switching capacity
Transport Layer: 3-
‹#›

If switch fabric slower than input ports combined -> queueing may occur at input queues 
queueing delay and loss due to input buffer overflow!

Input port queuing
output port contention: only one red datagram can be transferred. lower red packet is 
blocked













switch
fabric







one packet time later: green packet experiences HOL blocking
switch
fabric







Head-of-the-Line (HOL) blocking:
 queued datagram at front of queue prevents others in queue from moving forward

Transport Layer: 3-
‹#›

Output port queuing
Buffering
 required when datagrams arrive from fabric faster than link transmission rate. 
Drop policy: 
which datagrams to drop if no free buffers?
Scheduling discipline
 chooses among queued datagrams for transmission
Datagrams can be lost due to congestion, lack of buffers

Priority scheduling – who gets best performance, network neutrality


line
termination

link 
layer 
protocol
(send)
switch
fabric
(
rate: 
NR)

datagram
buffer


queueing

R
Transport Layer: 3-
‹#›

Output port queuing




















at 
t,
 packets more
from input to output
one packet time later
switch
fabric
switch
fabric









buffering when arrival rate via switch exceeds output line speed
queueing (delay) and loss due to output port buffer overflow!
Transport Layer: 3-
‹#›

RFC 3439 rule of thumb: average buffering equal to “typical” RTT (say 250 msec) times link capacity C
e.g., C = 10 Gbps link: 2.5 Gbit buffer
How much buffering?
but
 too 
much buffering can increase delays (particularly in home routers)
long RTTs: poor performance for realtime apps, sluggish TCP response 
recall delay-based congestion control: “keep bottleneck link just full enough (busy) but no fuller”
RTT  C
.
N

more recent recommendation: with 
N
 flows, buffering equal to 

Transport Layer: 3-
‹#›

Buffer Management
buffer management: 
drop: 
which packet to add, drop when buffers are full
tail drop: 
drop arriving packet
priority: 
drop/remove on priority basis

line
termination

link 
layer 
protocol
(send)
switch
fabric

datagram
buffer



queueing 
scheduling

marking: 
which packets to mark to signal congestion (ECN, RED)

R



queue
(waiting area)
packet
arrivals
packet
departures
link
 (server)
Abstraction
: queue
R
Transport Layer: 3-
‹#›

packet scheduling: 
deciding which packet to send next on link
first come, first served
priority
round robin
weighted fair queueing
Packet Scheduling: FCFS
FCFS: 
packets transmitted in order of arrival to output port
also known as: First-in-first-out (FIFO) 
real world examples?




queue
(waiting area)
packet
arrivals
packet
departures
link
 (server)
Abstraction
: queue
R
Transport Layer: 3-
‹#›

Priority scheduling: 
arriving traffic classified, queued by class
any header fields can be used for classification
Scheduling policies: priority






high priority queue
low priority queue
arrivals
classify
departures
link
 


1


3


2


4


5
arrivals
departures
packet in service
send packet from highest priority queue that has buffered packets
FCFS within priority class

1

3

4

2

5

1

3

2

4

5
Transport Layer: 3-
‹#›

Round Robin (RR) scheduling:
arriving traffic classified, queued by class
any header fields can be used for classification
Scheduling policies: round robin







classify 
arrivals
departures

link
R


server cyclically, repeatedly  scans class queues, sending one complete packet from each class (if available) in turn

Transport Layer: 3-
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
Transport Layer: 3-
‹#›

Sidebar: Network Neutrality
What is network neutrality?
technical: 
how an ISP should share/allocation its resources
packet scheduling, buffer management are the 
mechanisms
social, economic  
principles 
protecting free speech
encouraging innovation, competition
enforced
 
legal
 
rules and policies
Different countries have different “takes” on network neutrality
Transport Layer: 3-
‹#›

Sidebar: Network Neutrality
2015 US FCC 
Order on Protecting and Promoting an Open Internet: 
three “clear, bright line” rules:
no blocking 
… “shall not block lawful content, applications, services, or non-harmful devices, subject to reasonable network management.”
no throttling  
… “shall not impair or degrade lawful Internet traffic on the basis of Internet content, application, or service, or use of a non-harmful device, subject to reasonable network management.”
no paid prioritization. 
… “shall not engage in paid prioritization”

Transport Layer: 3-
‹#›
