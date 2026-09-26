# E22 62581 Lektion 15.pptx

Source: PowerPoint,
https://drive.google.com/file/d/1aTBsnU4PAY83B-odKZLZoARdp75z1OWl
(exported as plain text; slide-break formatting from the original is lost, but
all text content is preserved).

---

Computer Networking: A Top-Down Approach 
8
th
 Edition, Global Edition  
Jim Kurose, Keith Ross
Copyright © 2022 Pearson Education Ltd
Chapter 5
Network Layer:
Control Plane
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

Feedback på Delaflevering 1
Generelt:
Bedre kvalitet end SW studerende
Use case beskrivelse
Tekst beskrivelse af en use case
Use case diagram
Oversigt over systemets use cases
IKKE forløb
Navngives [Udsagnsord] [Navneord] på bydeform
Køb Briller
Ændr Aftale
(
Overtag verdensherredømmet
)
Skal have passende scope
Kvalitet i sig selv
Overskueligt
Network Layer: 5-
‹#›

Network layer control plane: our goals
understand principles behind network control plane:
traditional routing algorithms
(
SDN controllers)
(
network management, configuration)

instantiation, implementation in the Internet:
OSPF, BGP
(
OpenFlow, ODL and ONOS controllers)
(
Internet Control Message Protocol: ICMP)
(
SNMP, YANG/NETCONF)
Network Layer: 5-
‹#›

Network layer: “control plane” roadmap


introduction
routing protocols
link state
distance vector
intra-ISP routing: OSPF
routing among ISPs: BGP

Network Layer: 5-
‹#›

Two approaches to structuring network control plane:
per-router
 control (traditional)
logically 
centralized control
 (software defined networking)
Network-layer functions
Network Layer: 5-
‹#›
forwarding: 
move packets from router’s 
input to
 appropriate 
router output
data plane


control
 
plane


routing: 
determine route
 taken by packets from source to destination

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
Network Layer: 5-
‹#›

Software-Defined Networking (SDN) control plane
Remote controller
 computes, installs forwarding tables in routers




























































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
Network Layer: 5-
‹#›

Network layer: “control plane” roadmap
network management, configuration 
SNMP
NETCONF/YANG

introduction
routing protocols
link state
distance vector
intra-ISP routing: OSPF
routing among ISPs: BGP
SDN control plane
Internet Control Message Protocol 

Network Layer: 5-
‹#›

Routing
 protocol goal: 
determine 
good routes
,
through network of routers
route/path
: 
routers packets traverse 
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
                   
              





Network Layer: 5-
‹#›

Graph abstraction: link costs
Network Layer: 5-
‹#›






























u

y

x

w

v

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
graph: 
G = (N,E)

c
a,b
: 
cost of 
direct
 link connecting 
a
 and 
b
             
e.g., c
w,z 
= 5, 
c
u,z 
= ∞
cost 
defined by network operator
1
?
i
nversely related to bandwidth
inversely related to congestion
N (
nodes)
: 
set of routers = { 
u, v, w, x, y, z 
}
E (edges): 
set of links =
{
 
(
u,v), (u,x), (v,x), (v,w), (x,w), (x,y), (w,y), (w,z), (y,z
) 
}

Routing algorithm classification
Network Layer: 5-
‹#›
global or decentralized information?

global: 
all routers have 
complete
 
topology, link cost info
“link state” 
algorithms

decentralized: 
iterative process of computation, exchange of info with 
neighbors
routers initially only know link costs to attached neighbors
“distance vector” 
algorithms
How fast do routes change?


dynamic
: 
routes change more quickly
periodic updates or in response to link cost changes

static: 
routes change slowly over time

Network layer: “control plane” roadmap
network management, configuration 
SNMP
NETCONF/YANG

introduction
routing protocols
link state
distance vector
intra-ISP routing: OSPF
routing among ISPs: BGP
SDN control plane
Internet Control Message Protocol 

Network Layer: 5-
‹#›

Dijkstra’s link-state routing algorithm
Network Layer: 5-
‹#›
centralized: 
all 
link costs known
by 
link state broadcast 
all nodes have same info
computes 
least cost
 paths from one node (“source”) to all other nodes
gives 
forwarding table
 for that node
iterative: 
after 
k
 iterations, know least cost path to 
k 
destinations
c
x,y
:
 
direct
 link cost from node 
x
 to 
y
;  = ∞ if not direct neighbors
D(v):
 current
 estimate of cost of least-cost-path from source to destination 
v
p(v):
 
predecessor node along path from source to 
v
N':
 
set of nodes whose least-cost-path 
definitively
 known


notation

Dijkstra’s link-state routing algorithm
Network Layer: 5-
‹#›
1  
Initialization:
 
2   
 N' 
= {
u
}                               
/* compute least cost path from u to all other nodes */
3    for all nodes 
v
 
4      if 
v
 adjacent to 
u
            
/* 
u 
initially
 
knows direct-path-cost only to  direct neighbors    */
5          then 
D(v) = c
u,v      
             
/* but may not be 
minimum
 cost!                                                    */
6      else 
D(v) 
= ∞ 
7 

8   
Loop 
9     
10    
11
12
13
14
15  
until all nodes in N'
 

find 
w
 not in 
N' 
such that 
D(w) 
is a minimum 
add 
w
 to 
N' 
update 
D(v) 
for all
 v 
adjacent to 
w
 and not in 
N' 
: 
     D(v) = 
min
 
( 
D(v),  D(w) + c
w,v  
)
 
/* new least-path-cost to 
v 
is either old least-cost-path to
 v 
or known 
least-cost-path to 
w
 plus direct-cost from 
w
 to 
v
 */

Dijkstra’s algorithm: an example
Network Layer: 5-
‹#›
Step
0
1
2
3
4
5
N'
D(v),p(v)
D(x),p(x)
D(y),p(y)
D(z),p(z)






























u

y

x

w

v

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
4,y
D(w),p(w)
D(w),p(w)
5,u
4,x
3,y
3,y
4,y
3,y
5,u
∞
∞
1,u
2,u
∞
2,x
4,x
2,u
4,y
3,y
2,u
uxyvwz
uxyvw
uxyv
uxy
ux
u
v
w
x
y
z















find 
a
 not in 
N' 
such that 
D(a) 
is a minimum 
add 
a
 to 
N' 
update 
D(b) 
for all 
b
 adjacent to 
a
 and not in 
N' 
: 
     D(b) = 
min
 ( D(b), D(a) + c
a,b 
) 
Initialization (step 0): For all a: if 
a
 adjacent to then 
D(a) = c
u,a

Dijkstra’s algorithm: an example
Network Layer: 5-
‹#›






























u

y

x

w

v

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
D(w),p(w)
5,u
4,x
3,y
3,y
























u

y

x

w

v

z
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
route from 
u
 to
 v 
directly
route from u to all other destinations via 
x

Dijkstra’s algorithm: another example
Network Layer: 5-
‹#›




w
3
4




v




x




u
5
3

7
4





y
8




z
2
7


9
Step

N'
D(
v
),
p(v)
0
1
2
3
4
5
D(
w
),
p(w)
D(
x
),
p(x)
D(
y
),
p(y)
D(
z
),
p(z)
u
∞ 
∞ 
7,u
3,u
5,u
uw
∞ 
11
,w
 
6,w

5,u
14
,x 
11,
w 
6,w




uwx

uwxv
14
,x 
10,
v 

uwxvy
12
,y 

notes:
construct least-cost-path tree by tracing predecessor nodes
ties can exist (can be broken arbitrarily)
uwxvyz
v
w
x
y
z

Dijkstra’s algorithm: discussion
Network Layer: 5-
‹#›
algorithm complexity:
 
n
 nodes
each of 
n
 iteration: need to check all nodes, 
w
, not in 
N
n
(
n
+1)/2 comparisons: O(
n
2
) complexity (Worst case: 
n
2
 tid)
more efficient implementations possible: O(
n
log
n
) (Worst case)
message complexity:
 
each router must 
broadcast
 its link state information to other 
n
 routers 
efficient (and interesting!) broadcast algorithms: O(
n
) link crossings to disseminate a broadcast message from one source
each router’s message crosses O(
n
) links: overall message complexity: 
O(
n
2
)

Dijkstra’s algorithm: oscillations possible
Network Layer: 5-
‹#›
when  link costs depend on traffic volume, 
route oscillations 
possible






a




d




c




b
1



1+e
e
0
e
1
1


0
0
initially






a




d




c




b





given these costs,
find new routing….
resulting in new costs


2+e
0
0
0
1+e
1






a




d




c




b





given these costs,
find new routing….
resulting in new costs

0
2+e
1+e
1
0
0






a




d




c




b





given these costs,
find new routing….
resulting in new costs

2+e
0
0
0
1+e
1
sample scenario:
routing to destination a, traffic entering at d, c, e with rates 1, e (<1), 1
link costs are directional, and volume-dependent

e
1
1
e
1
1
e
1
1

Network layer: “control plane” roadmap
network management, configuration 
SNMP
NETCONF/YANG

introduction
routing protocols
link state
distance vector
intra-ISP routing: OSPF
routing among ISPs: BGP
SDN control plane
Internet Control Message Protocol 

Network Layer: 5-
‹#›

Based on 
Bellman-Ford
 (BF) equation (dynamic programming):

Distance vector algorithm 
Network Layer: 5-
‹#›
Let 
D
x
(y): 
cost of least-cost path from 
x
 to 
y
.
Then:
   
D
x
(y) = 
min
v
 { c
x,v 
+ D
v
(y) }
   


Bellman-Ford equation
min
 taken over all neighbors
 v 
of 
x
v
’s estimated least-cost-path cost to 
y
direct cost of link from
 x 
to 
v

Bellman-Ford Example
Network Layer: 5-
‹#›





















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
Suppose that 
u
’s neighboring node
s, x,v,w, 
know that for destination
 z
:
D
u
(z) 
= min { 
c
u,v 
+ D
v
(z),
                    c
u,x 
+ D
x
(z),
                    c
u,w 
+ D
w
(z) 
}
Bellman-Ford equation says:



D
v
(z) 
= 5




v


D
w
(z) = 
3




w


D
x
(z)
 = 3




x
= min {2 + 5,
           1 + 3,
           5 + 3}  = 4
node achieving minimum (x) is next hop on estimated least-cost path to destination (z)

Distance vector algorithm 
Network Layer: 5-
‹#›
key idea: 
from time-to-time, 
each node sends own distance vector estimate to neighbors
estimate 
D
x
(y) converge to the actual least cost 
d
x
(y)
 
(
under minor, natural conditions)
D
x
(y) ← min
v
{c
x,v 
+ D
v
(y)}  
for each node 
y
 ∊ 
N
when 
x
 receives new DV estimate from any neighbor
updates its own DV using B-F equation:

Distance vector algorithm:  
Network Layer: 5-
‹#›
iterative, asynchronous:
 
each local iteration caused by: 
local link cost change 
DV update message from neighbor

wait
 
for (change in local link cost or msg from neighbor)



each node:
distributed, self-stopping: 
each node notifies neighbors 
only
 when its DV changes
neighbors then notify their neighbors – 
only if necessary
no notification received, no actions taken!

recompute
 DV estimates using DV received from neighbor


if DV to any destination has changed, 
notify
 neighbors

DV in a: 
D
a
(a)=0
D
a
(b) = 8
D
a
(c) = ∞
D
a
(d) = 1
D
a
(e) = ∞
D
a
(f) = ∞
D
a
(g) = ∞
D
a
(h) = ∞
D
a
(i) = ∞

Distance vector: example
Network Layer: 5-
‹#›






g




h




i
1
1
1
1
1
1
1
1
1
8
1
t=0


All nodes have distance estimates to nearest neighbors (only)
A few asymmetries:
missing link
larger cost
















d




e




f




a




b




c










All nodes send their local distance vector to their neighbors

Distance vector example: iteration
Network Layer: 5-
‹#›
All nodes:
receive distance vectors from neighbors
compute their new local  distance vector
send their new local distance vector to neighbors
t=1








g




h




i
1
1
1
1
1
1
1
1
1
8
1
















d




e




f




a




b




c

Distance vector example: iteration
Network Layer: 5-
‹#›






g




h




i
1
1
1
1
1
1
1
1
1
8
1




d




e




f




a




b




c
All nodes:
receive distance vectors from neighbors
compute their new local  distance vector
send their new local distance vector to neighbors
t=1



compute

compute

compute

compute

compute

compute

compute

compute

compute

Distance vector example: 
iteration
Network Layer: 5-
‹#›






g




h




i
1
1
1
1
1
1
1
1
1
8
1
















d




e




f




a




b




c










All nodes:
receive distance vectors from neighbors
compute their new local  distance vector
send their new local distance vector to neighbors
t=1

Distance vector example: iteration
Network Layer: 5-
‹#›






g




h




i
1
1
1
1
1
1
1
1
1
8
1
















d




e




f




a




b




c










All nodes:
receive distance vectors from neighbors
compute their new local  distance vector
send their new local distance vector to neighbors
t=2

Distance vector example: iteration
Network Layer: 5-
‹#›






g




h




i
1
1
1
1
1
1
1
8
1
2
1




d




e




f




a




b




c
All nodes:
receive distance vectors from neighbors
compute their new local  distance vector
send their new local distance vector to neighbors
t=2



compute

compute

compute

compute

compute

compute

compute

compute

compute

Distance vector example: 
iteration
Network Layer: 5-
‹#›






g




h




i
1
1
1
1
1
1
1
1
1
8
1
















d




e




f




a




b




c










All nodes:
receive distance vectors from neighbors
compute their new local  distance vector
send their new local distance vector to neighbors
t=2

Distance vector example: 
iteration
Network Layer: 5-
‹#›
…. and so on

Let’s next take a look at the iterative 
computations
 at nodes

DV in a: 
D
a
(a)=0
D
a
(b) = 8
D
a
(c) = ∞
D
a
(d) = 1
D
a
(e) = ∞
D
a
(f) = ∞
D
a
(g) = ∞
D
a
(h) = ∞
D
a
(i) = ∞

Distance vector example: computation
Network Layer: 5-
‹#›






g




h




i
1
1
1
1
1
1
1
1
1
8
1
t=1






DV in b:

D
b
(f) = ∞
D
b
(g) = ∞
D
b
(h) = ∞
D
b
(i) = ∞
D
b
(a) = 8
D
b
(c) = 1
D
b
(d) = ∞
D
b
(e) = 1
b receives DVs from a, c, e







a




b




c




d




e




f



DV in c:
D
c
(a) = ∞
D
c
(b) = 1
D
c
(c) = 0
D
c
(d) = ∞
D
c
(e) = ∞
D
c
(f) = ∞
D
c
(g) = ∞
D
c
(h) = ∞
D
c
(i) = ∞




DV in e:
D
e
(a) = ∞
D
e
(b) = 1
D
e
(c) = ∞
D
e
(d) = 1
D
e
(e) = 0
D
e
(f) = 1
D
e
(g) = ∞
D
e
(h) = 1
D
e
(i) = ∞

Distance vector example: computation




DV in a: 
D
a
(a)=0
D
a
(b) = 8
D
a
(c) = ∞
D
a
(d) = 1
D
a
(e) = ∞
D
a
(f) = ∞
D
a
(g) = ∞
D
a
(h) = ∞
D
a
(i) = ∞




DV in b:

D
b
(f) = ∞
D
b
(g) = ∞
D
b
(h) = ∞
D
b
(i) = ∞
D
b
(a) = 8
D
b
(c) = 1
D
b
(d) = ∞
D
b
(e) = 1



DV in c:
D
c
(a) = ∞
D
c
(b) = 1
D
c
(c) = 0
D
c
(d) = ∞
D
c
(e) = ∞
D
c
(f) = ∞
D
c
(g) = ∞
D
c
(h) = ∞
D
c
(i) = ∞



DV in e:
D
e
(a) = ∞
D
e
(b) = 1
D
e
(c) = ∞
D
e
(d) = 1
D
e
(e) = 0
D
e
(f) = 1
D
e
(g) = ∞
D
e
(h) = 1
D
e
(i) = ∞

Network Layer: 5-
‹#›






g




h




i
1
1
1
1
1
1
1
1
1
8
1
t=1


b receives DVs from a, c, e, computes:






a




b




c




d




e




f



DV in b:

D
b
(f) =2
D
b
(g) = ∞
D
b
(h) = 2
D
b
(i) = ∞
D
b
(a) = 8
D
b
(c) = 1
D
b
(d) = 2
D
b
(e) = 1




e






compute
b
D
b
(a) = min{c
b,a
+D
a
(a), c
b,c 
+D
c
(a), c
b,e
+D
e
(a)}  = min{8,∞,∞} = 8 
D
b
(c) = min{c
b,a
+D
a
(c), c
b,c 
+D
c
(c), c
 b,e 
+D
e
(c)}  = min{∞,1,∞} = 1 
D
b
(d) = min{c
b,a
+D
a
(d), c
b,c 
+D
c
(d), c
 b,e 
+D
e
(d)}  = min{9,2,∞} = 2 
D
b
(f) = min{c
b,a
+D
a
(f), c
b,c 
+D
c
(f), c
 b,e 
+D
e
(f)}  = min{∞,∞,2} = 2 
D
b
(i) = min{c
b,a
+D
a
(i), c
b,c 
+D
c
(i), c
 b,e
+D
e
(i)}  = min{∞,
 
∞, ∞} = ∞ 
D
b
(h) = min{c
b,a
+D
a
(h), c
b,c 
+D
c
(h), c
 b,e
+D
e
(h)}  = min{∞,
 
∞, 2} = 2 
D
b
(e) = min{c
b,a
+D
a
(e), c
b,c 
+D
c
(e), c
 b,e 
+D
e
(e)}  = min{∞,∞,1} = 1 
D
b
(g) = min{c
b,a
+D
a
(g), c
b,c 
+D
c
(g), c
 b,e
+D
e
(g)}  = min{∞,
 
∞, ∞} = ∞

DV in a: 
D
a
(a)=0
D
a
(b) = 8
D
a
(c) = ∞
D
a
(d) = 1
D
a
(e) = ∞
D
a
(f) = ∞
D
a
(g) = ∞
D
a
(h) = ∞
D
a
(i) = ∞

Distance vector example: computation
Network Layer: 5-
‹#›






g




h




i
1
1
1
1
1
1
1
1
1
8
1
t=1






DV in b:

D
b
(f) = ∞
D
b
(g) = ∞
D
b
(h) = ∞
D
b
(i) = ∞
D
b
(a) = 8
D
b
(c) = 1
D
b
(d) = ∞
D
b
(e) = 1
c receives DVs from b







a




b




c




d




e




f



DV in c:
D
c
(a) = ∞
D
c
(b) = 1
D
c
(c) = 0
D
c
(d) = ∞
D
c
(e) = ∞
D
c
(f) = ∞
D
c
(g) = ∞
D
c
(h) = ∞
D
c
(i) = ∞




DV in e:
D
e
(a) = ∞
D
e
(b) = 1
D
e
(c) = ∞
D
e
(d) = 1
D
e
(e) = 0
D
e
(f) = 1
D
e
(g) = ∞
D
e
(h) = 1
D
e
(i) = ∞

Distance vector example: computation
Network Layer: 5-
‹#›






g




h




i
1
1
8
1
t=1






DV in b:

D
b
(f) = ∞
D
b
(g) = ∞
D
b
(h) = ∞
D
b
(i) = ∞
D
b
(a) = 8
D
b
(c) = 1
D
b
(d) = ∞
D
b
(e) = 1
c receives DVs from b computes:




a




b




c




d




e




f



DV in c:
D
c
(a) = ∞
D
c
(b) = 1
D
c
(c) = 0
D
c
(d) = ∞
D
c
(e) = ∞
D
c
(f) = ∞
D
c
(g) = ∞
D
c
(h) = ∞
D
c
(i) = ∞




D
c
(a) = min{c
c,b
+D
b
(a}} = 1 + 8 = 9 
D
c
(b) = min{c
c,b
+D
b
(b)} = 1 + 0 = 1
D
c
(d) = min{c
c,b
+D
b
(d)} = 1+ ∞ = ∞ 
D
c
(e) = min{c
c,b
+D
b
(e)} = 1 + 1 = 2
D
c
(f) = min{c
c,b
+D
b
(f)} = 1+ ∞ = ∞ 
D
c
(g) = min{c
c,b
+D
b
(g)} = 1+ ∞ = ∞ 
D
c
(i) = min{c
c,b
+D
b
(i)} = 1+ ∞ = ∞ 
D
c
(h) = min{c
bc,b
+D
b
(h)} = 1+ ∞ = ∞ 



DV in c:
D
c
(a) = 9
D
c
(b) = 1
D
c
(c) = 0
D
c
(d) = 2
D
c
(e) = ∞
D
c
(f) = ∞
D
c
(g) = ∞
D
c
(h) = ∞
D
c
(i) = ∞



compute
* Check out the online interactive exercises for more examples: h
ttp://gaia.cs.umass.edu/kurose_ross/interactive/

Distance vector example: computation
Network Layer: 5-
‹#›


1
1
1
1
1
1
1
1
1
8
1
t=1






DV in b:

D
b
(f) = ∞
D
b
(g) = ∞
D
b
(h) = ∞
D
b
(i) = ∞
D
b
(a) = 8
D
b
(c) = 1
D
b
(d) = ∞
D
b
(e) = 1
e receives DVs from b, d, f, h




a




b




c




DV in f:
D
c
(a) = ∞
D
c
(b) = ∞
D
c
(c) = ∞
D
c
(d) = ∞
D
c
(e) = 1
D
c
(f) = 0
D
c
(g) = ∞
D
c
(h) = ∞
D
c
(i) = 1



DV in e:
D
e
(a) = ∞
D
e
(b) = 1
D
e
(c) = ∞
D
e
(d) = 1
D
e
(e) = 0
D
e
(f) = 1
D
e
(g) = ∞
D
e
(h) = 1
D
e
(i) = ∞



DV in h:
D
c
(a) = ∞
D
c
(b) = ∞
D
c
(c) = ∞
D
c
(d) = ∞
D
c
(e) = 1
D
c
(f) = ∞
D
c
(g) = 1
D
c
(h) = 0
D
c
(i) = 1



DV in d:
D
c
(a) = 1
D
c
(b) = ∞
D
c
(c) = ∞
D
c
(d) = 0
D
c
(e) = 1
D
c
(f) = ∞ D
c
(g) = 1
D
c
(h) = ∞
D
c
(i) = ∞






d




e




f





g




h




i
Q: what is new DV computed in e at 
t=1
?





compute

Distance vector: state information diffusion
t=0


c’s state at t=0 is at c only






g




h




i
1
1
1
1
1
1
1
1
1
8
1
















d




e




f




a




b




c










c’s state at t=0 has propagated to b, and may influence distance vector computations up to 
1 
hop away, i.e., at b
t=1


c’s state at t=0 may now influence distance vector computations up to 
2 
hops away, i.e., at b and now at a, e as well
t=2


c’s state at t=0 may influence distance vector computations up to 
3
 hops away, i.e., at b,a,e and now at c,f,h as well
t=3


c’s state at t=0 may influence distance vector computations up to 
4
 hops away, i.e., at b,a,e, c, f, h and now at g,i as well
t=4


Iterative communication, computation steps diffuses information through network: 
          
t=1 
          
t=2 
          
t=3 
          
t=4

Distance vector: link cost changes
Network Layer: 5-
‹#›
“good news 
travels fast”
t
0 
: 
y
 detects link-cost change, updates its DV, informs its neighbors.

t
1 
: 
z
 receives update from 
y
, updates its table, computes new least cost to 
x
 , sends its neighbors its DV.

t
2 
: 
y
 receives 
z
’s update, updates its distance table.  
y’
s least costs do 
not
 change, so 
y
 does 
not
 send a message to 
z
. 

link cost changes:
node detects local link cost change 
updates routing info, recalculates local DV
if DV changes, notify neighbors
 








x




z
1
4
50




y
1

Distance vector: link cost changes
Network Layer: 5-
‹#›
link cost changes:
node detects local link cost change 
“bad news travels slow” 
– count-to-infinity problem:








x




z
1
4
50




y
6
0
y 
sees direct link to 
x
 has new cost 60, but z has said it has a path at cost of 5. So 
y
 computes “my new cost to x will be 6, via z); notifies 
z
 of new cost of 6 to 
x.
z 
learns that path to 
x
 via
 y 
has new cost 6, so 
z
  computes “my new cost to 
x
 will be 7 via y), notifies 
y
 of new cost of 7 to 
x.
y 
learns that path to 
x
 via 
z 
has new cost 7, so 
y
  computes “my new cost to 
x
 will be 8 via y), notifies 
z
 of new cost of 8 to 
x.
z 
learns that path to 
x
 via
 y 
has new cost 8, so 
z
  computes “my new cost to 
x
 will be 9 via y), notifies 
y
 of new cost of 9 to 
x.
…
see text for solutions.  
Distributed algorithms are tricky!

Comparison of LS and DV algorithms
Network Layer: 5-
‹#›
message complexity
LS: 
n
 
routers, O(
n
2
) messages sent  
DV: 
exchange between neighbors; convergence time varies
speed of convergence
LS: 
O(
n
2
) algorithm, O(
n
2
) messages
may have oscillations
DV: 
convergence time varies
may have routing loops
count-to-infinity problem
robustness: 
what happens if router malfunctions, or is compromised?
LS: 
router can advertise incorrect 
link
 cost
each router computes only its 
own
 table
DV:
DV router can advertise incorrect 
path
 cost (“I have a 
really
 low cost path to everywhere”): black-holing
each router’s table used by others: error propagate thru network

Network layer: “control plane” roadmap
network management, configuration 
SNMP
NETCONF/YANG

introduction
routing protocols
intra-ISP routing: OSPF
routing among ISPs: BGP
SDN control plane
Internet Control Message Protocol 

Network Layer: 5-
‹#›

our routing study thus far - idealized 
all routers identical
network “flat”
… not true in practice

Making routing scalable
Network Layer: 5-
‹#›
scale: 
billions of destinations:
can’t store all destinations in routing tables!
routing table exchange would swamp links!
 


administrative autonomy:
Internet: a network of networks
each network admin may want to control routing in its own network

aggregate routers into regions 
= 
“autonomous systems”
 (AS) (a.k.a. “
domains
”)
Internet approach to scalable routing
Network Layer: 5-
‹#›
intra-AS (aka “intra-domain”): 
routing among 
within same AS (“network”)
all routers in AS must run same intra-domain protocol
routers in different AS can run different intra-domain routing protocols
gateway router: 
at “edge” of its own AS, has link(s) to router(s) in other AS’es


inter-AS (aka “inter-domain”): 
routing 
among
 AS’es
gateways perform inter-domain routing (as well as intra-domain routing)

Interconnected ASes
Network Layer: 5-
‹#›







3b




1d




3a




1c











2a
AS3
AS1
AS2




1a




2c




2b




1b




3c

intra-AS
routing



intra-AS
routing



intra-AS
routing





inter-AS routing














forwarding
table
forwarding table  configured by intra- and inter-AS routing algorithms

Intra-AS
Routing 



Inter-AS
Routing 


intra-AS routing determine entries for destinations within AS
inter-AS & intra-AS determine entries for external destinations

Inter-AS routing:  a role in intradomain forwarding
Network Layer: 5-
‹#›







3b




1d




3a




1c











2a
AS3
AS1
AS2




1a




2c




2b




1b




3c

other
networks

other
networks
suppose router in AS
1
 receives datagram destined outside of AS
1
:

AS1 inter-domain routing must:
learn which destinations reachable through AS2, which through AS3
propagate this reachability info to all routers in AS1




router should forward packet to gateway router in AS1, but which one?

Inter-AS routing:  routing within an AS
Network Layer: 5-
‹#›
most common intra-AS routing protocols:
(
RIP: Routing Information Protocol)
DV ba
sed
no longer widely used
(
EIGRP: Enhanced Interior Gateway Routing Protocol)
DV based
 
OSPF: Open Shortest Path First  
[RFC 2328]
link-state
 routing

OSPF (Open Shortest Path First) routing
Network Layer: 5-
‹#›
o
pen
classic link-state (global)
each router floods OSPF link-state advertisements 
to all other routers in entire AS 
(directly over IP rather than using TCP/UDP) 
multiple link costs metrics possible
bandwidth, delay
Dijkstra’s algorithm to compute forwarding table
each router has full topology
security: 
all OSPF messages authenticated (to prevent malicious intrusion)

Hierarchical OSPF
Network Layer: 5-
‹#›
two-level hierarchy: 
local area, backbone.
link-state advertisements flooded only in area, or backbone
each node has detailed area topology; only knows direction to reach other destinations

area border routers: 
“summarize” distances  to destinations in own area, advertise in backbone




area 1
area 2
area 3
backbone
internal
routers
                   
              




                   
              




                   
              




                   
              




                   
              




                   
              




                   
              




                   
              




                   
              




                   
              




                   
              




                   
              




                   
              




                   
              




                   
              




backbone router: 
runs OSPF limited to backbone
boundary router: 
connects to other ASes
local routers: 
flood LS in area only
compute routing within area
forward packets to outside via area border router

Network layer: “control plane” roadmap
network management, configuration 
SNMP
NETCONF/YANG

introduction
routing protocols
intra-ISP routing: OSPF
routing among ISPs: BGP
SDN control plane
Internet Control Message Protocol 

Network Layer: 5-
‹#›

BGP (Border Gateway Protocol):
 
De facto standard
"G
lue that holds the Internet together"
Distance Vector!
S
ubnet advertise 
existence
destinations it can reach to rest of Internet
“I am here, here is who I can reach, and how”
BGP provides each AS a means to:
eBGP:
 obtain subnet reachability information from neighboring ASes
iBGP:
 propagate reachability information to all AS-internal routers.
determine “good” routes to other networks based on reachability information and 
policy

Internet inter-AS routing: BGP
Network Layer: 5-
‹#›

eBGP, iBGP connections
Network Layer: 5-
‹#›
eBGP connectivity
logical iBGP connectivity









1b








1d








1c








1a









2b








2d








2c








2a









3b








3d








3c








3a
AS 2
AS 3
AS 1








1c



∂
∂
gateway routers run both eBGP and iBGP protocols

BGP basics
Network Layer: 5-
‹#›
when AS3 gateway 3a advertises 
path 
AS3,X 
to AS2 gateway 2c:
AS3 
promises
 to AS2 it will forward datagrams towards X

BGP session:
 
t
wo BGP routers (“peers”) exchange BGP messages over semi-permanent TCP connection:
advertising 
paths
 
to different destination network prefixes (BGP  is a “path vector” protocol)









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

BGP advertisement:
AS3, X

Path attributes and BGP routes
Network Layer: 5-
‹#›
BGP advertised route:  
prefix
 + attributes 
prefix: destination being advertised
two important attributes:
AS-PATH: 
list of ASes through which prefix advertisement has passed
NEXT-HO
P: 
indicates specific internal-AS router to next-hop AS
policy-based routing:
gateway receiving route advertisement 
import policy 
→ 
accept/decline path (e.g., never route through AS Y).
AS policy 
→ 
whether to 
advertise
 
path to 
other 
AS
es

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
BGP path advertisement
Network Layer: 5-
‹#›
based on AS2 policy, AS2 router 2c accepts path AS3,X, propagates (via iBGP) to all AS2 routers

AS2,AS3,X 

AS2 router 2c receives path advertisement 
AS3,X 
(via eBGP) from AS3 router 3a
based on AS2 policy,  AS2 router 2a advertises (via eBGP)  path 
AS2, AS3, X  
 to AS1 router 1c


AS3, X

BGP path advertisement 
(more
)
Network Layer: 5-
‹#›
AS2,AS3,X 

AS1 gateway router 1c learns path 
AS2,AS3,X 
from 2a

gateway router may learn about 
multiple
 paths to destination:

AS3,X
AS1 gateway router 1c learns path 
AS3,X 
from 3a

based on 
policy, 
AS1 gateway router 1c chooses path 
AS3,X 
and advertises path within AS1 via iBGP


AS3, X









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
AS3,X
AS3,X
AS3,X

BGP messages
Network Layer: 5-
‹#›
BGP messages exchanged between peers over TCP connection
BGP messages:
OPEN: 
opens TCP connection to remote BGP peer and authenticates sending BGP peer
UPDATE: 
advertises new path (or withdraws old)
KEEPALIVE
: keeps connection alive in absence of UPDATES; also ACKs OPEN request
NOTIFICATION
: reports errors in previous msg; also used to close connection

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
BGP path advertisement
Network Layer: 5-
‹#›
AS2,AS3,X 


AS3,X

AS3, X
recall: 1a, 1b, 1d learn via iBGP from 1c: “path to X goes through 1c”
at 1d: OSPF intra-domain routing: to get to 1c, use  interface 1
1
2
1
2














dest
interface
…
…
…
…
local link interfaces
at 1a, 1d
at 1d: to get to X, use  interface 1
1c
1
X
1
AS3,X
AS3,X
AS3,X

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
BGP path advertisement
Network Layer: 5-
‹#›
recall: 1a, 1b, 1d learn via iBGP from 1c: “path to X goes through 1c”
at 1d: OSPF intra-domain routing: to get to 1c, use  interface 1
1
2
at 1d: to get to X, use  interface 1














dest
interface
…
…
…
…
1c
2
X
2
at 1a: OSPF intra-domain routing: to get to 1c, use  interface 2
at 1a: to get to X, use  interface 2

Why different Intra-, Inter-AS routing ?
 
Network Layer: 5-
‹#›
policy:
 
inter-AS: 
admin wants control over how its traffic routed, who routes through its network 
intra-AS: 
single admin, so policy less of an issue
scale:
hierarchical routing saves table size, reduced update traffic
performance: 
intra-AS: can focus on performance
inter-AS: policy dominates over performance

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
Network Layer: 5-
‹#›
2d learns (via iBGP) it can route to X via 2a or 2c
hot potato routing: 
choose local gateway that has least 
intra-domain
 cost (e.g., 2d chooses 2a, even though more AS hops to 
X
): don’t worry about inter-domain cost!

AS3,X 
AS1,AS3,X 

OSPF link weights
201
112
263

BGP: achieving policy via advertisements
Network Layer: 5-
‹#›


B

legend
:
 

customer 
network:
 

provider
 
network
 



A advertises path Aw to B and to C
B 
chooses not to advertise 
BAw to C!  
B gets no “revenue” for routing CBAw, since none of  C, A, w are B’s customers
C does 
not
 learn about CBAw path
C will route CAw (not using B) to get to w
ISP only wants to route traffic to/from its customer networks 
(does not want to carry transit traffic between other ISPs – a typical “real world” policy)

w
 

A

y

C
 

x
A,w

A,w

BGP: achieving policy via advertisements 
(more)
Network Layer: 5-
‹#›


B

ISP only wants to route traffic to/from its customer networks 
(does not want to carry transit traffic between other ISPs – a typical “real world” policy)

w
 

A

y

C
 

x
A,B,C are 
provider networks
x,w,y are 
customer
 (of provider networks)
x is
 
dual-homed: 
attached to two networks
policy to enforce: 
x does not want to route from B to C via x 
.. so x will not advertise to B a route to C


legend
:
 

customer 
network:
 

provider
 
network

router may learn about more than one route to destination AS, selects route based on:
local preference value attribute: policy decision
shortest AS-PATH 
closest NEXT-HOP router: hot potato routing
additional criteria 

BGP route selection
Network Layer: 5-
‹#›

Network layer: “control plane” roadmap
network management, configuration 
SNMP
NETCONF/YANG

introduction
routing protocols
intra-ISP routing: OSPF
routing among ISPs: BGP
SDN control plane
Internet Control Message Protocol 

Network Layer: 5-
‹#›

Internet network layer: historically implemented via distributed, per-router control approach
:
monolithic
 router contains switching hardware, runs proprietary implementation of Internet standard protocols (IP, RIP, IS-IS, OSPF, BGP) in proprietary router OS (e.g., Cisco IOS)
different “middleboxes” for different network layer functions: firewalls, load balancers, NAT boxes, ..
~2005: renewed interest in rethinking network control plane

Software defined networking (SDN)
Network Layer: 5-
‹#›

Per-router control plane
Individual routing algorithm components 
in each and every router 
interact in the control plane to computer forwarding tables































































































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
Network Layer: 4-
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
Network Layer: 4-
‹#›

Software defined networking (SDN)
Network Layer: 5-
‹#›
Data-plane switches:
fast, simple, commodity switches implementing generalized data-plane forwarding (Section 4.4) in hardware
flow (forwarding)
 
table computed, installed under controller supervision
API for table-based switch control (e.g., OpenFlow)
defines what is controllable, what is not
protocol for communicating with controller (e.g., OpenFlow)

data
plane
control
plane


































































SDN Controller
(network operating system)
…

routing

access 
control

load
balance
southbound API
northbound API
SDN-controlled switches
network-control applications

Network layer:  
Summary
Network Layer: 5-
‹#›
we’ve learned a lot!
approaches to network control plane
per-router control (traditional)
logically centralized control (software defined networking)
traditional routing algorithms
implementation in Internet: OSPF , BGP
next stop:  link layer!

Distance vector: another example
Network Layer: 5-
‹#›
x   y   z
x
y
z
0  2   7
∞
∞
∞
∞
∞
∞
from
cost to
from
from
x   y   z
x
y
z
0
x   y   z
x
y
z
∞
∞
∞
∞
∞
cost to
x   y   z
x
y
z
∞
∞
∞
7
1
0
cost to
∞
2   0   1
∞ ∞  ∞
2   0   1
7   1   0
time








x




z
1
2
7




y
D
x
()




D
x
(y) = min{c
x,y 
+ D
y
(y), c
x,z
+ D
z
(y)} 
             = min{2+0 , 7+1} = 2
D
x
(z) = 
min{
c
x,y
+ D
y
(z), c
x,z
+ D
z
(z)
} 
= min{2+1 , 7+0} = 3
3
2 
D
y
()
D
z
()
cost to
from

Distance vector: another example
Network Layer: 5-
‹#›
x   y   z
x
y
z
0  2   7
∞
∞
∞
∞
∞
∞
cost to
from
from
x   y   z
x
y
z
∞
∞
∞
∞
∞
cost to
x   y   z
x
y
z
∞
∞
∞
7
1
0
cost to
∞
2   0   1
∞ ∞  ∞








x




z
1
2
7




y
D
x
()



D
y
()
D
z
()
from
x   y   z
x
y
z
0  2   3
from
cost to
x   y   z
x
y
z
0  2   7
from
cost to
x   y   z
x
y
z
0  2   3
from
cost to
x   y   z
x
y
z
0  2   3
from
cost to
x   y   z
x
y
z
0  2   7
from
cost to
2  0   1
7   1   0
2  0   1
3  1   0
2   0   1
3  1   0
2  0   1
3  1   0
2  0   1
3  1   0

from
x   y   z
x
y
z
0
2   0   1
7   1   0

3
2 
cost to
time
