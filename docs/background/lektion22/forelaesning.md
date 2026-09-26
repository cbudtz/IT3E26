# E22 62581 Lektion22.pptx

Source: PowerPoint,
https://drive.google.com/file/d/1eKfCJMPKjeOAylUuqB5fy4BV7l7M6VLV
(exported as plain text; slide-break formatting from the original is lost, but
all text content is preserved).

---

Computer Networking: A Top-Down Approach 
8
th
 edition, Global Edition 
Jim Kurose, Keith Ross
Copyright © 2022 Pearson Education Ltd
Chapter 8
Security
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

Security: overview
Security: 8- 
‹#›
Chapter goals: 
understand principles of network security:
 
cryptography and its 
many
 uses beyond “confidentiality”
authentication
message integrity
security in practice:
firewalls and intrusion detection systems
security in application, transport, network, link layers

What is network security?
Security: 8- 
‹#›
confidentiality: 
only sender, intended receiver should “understand” message contents
sender encrypts message
receiver decrypts message
authentication: 
sender, receiver want to confirm identity of each other 
message integrity: 
sender, receiver want to ensure message not altered (in transit, or afterwards) without detection
access and availability
: 
services must be accessible and available to users

The language of cryptography
m:
 
plaintext message
K
A
(m): 
ciphertext, encrypted with key K
A
m = K
B
(K
A
(m))

plaintext
plaintext
ciphertext
K
A

encryption
algorithm

decryption 
algorithm


Alice’s 
encryption
key
Bob’s 
decryption
key
K
B
Security: 8- 
‹#›

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
symmetric key crypto
: Bob and Alice share same (symmetric) key: K
e.g., 
key is knowing substitution pattern in mono alphabetic substitution cipher
Q:
 
how do Bob and Alice agree on key value?
Security: 8- 
‹#›

Public Key Cryptography
Security: 8- 
‹#›
m = K  
(
K  (m)
)
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
Bob
’
s 
public
 key 
Bob’s 
private
 key 
K 
B
-
Wow
 - public key cryptography revolutionized 2000-year-old (previously only symmetric key) cryptography!
similar ideas emerged at roughly same time, independently in US and UK (classified)

Message digests
Security: 8- 
‹#›
Hash function properties:
many-to-1
produces fixed-size msg digest (fingerprint)
given message digest 
x
, computationally infeasible to find 
m
 such that 
x = H(m)


large 
message
m

H: Hash
Function
H(m)
computationally expensive to public-key-encrypt long messages 
goal: 
fixed-length, easy- to-compute digital “fingerprint”
apply hash function H to 
m
, get fixed size message digest, 
H(m)

Digital signature = signed message digest
Security: 8- 
‹#›

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
K
B
(H(m))
-
encrypted 
message digest

K
B
(H(m))
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

Public key Certification Authorities (CA)
Security: 8- 
‹#›
certification authority (CA): 
binds public key to particular entity, E
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

Chapter 8 outline
What is network security?
Principles of cryptography
Authentication, 
message integrity
Securing e-mail
Securing TCP connections: TLS
Network layer security: IPsec
Security in wireless and mobile networks
Operational security: firewalls and IDS
Security: 8- 
‹#›

Secure e-mail: confidentiality 
Security: 8- 
‹#›
 Alice wants to send 
confidential
 e-mail, m, to Bob.


K
S
( )
.

K
B
( )
.
+
K
S
(m )
K
B
(K
S
 )
+


m
K
S
K
S
K
B
+
Internet


K
S
( )
.


K
B
( )
.
-
K
B
-
K
S
m
K
S
(m )
K
B
(K
S
 )
+
Alice:
generates random 
symmetric
 private key, K
S
encrypts message with K
S  
(for efficiency)
also encrypts K
S
 with Bob’s public key
sends both K
S
(m) and K
+
B
(K
S
) to Bob

+

-

Secure e-mail: confidentiality 
(more) 
Security: 8- 
‹#›
 Alice wants to send 
confidential
 e-mail, m, to Bob.


K
S
( )
.

K
B
( )
.
+
K
S
(m )
K
B
(K
S
 )
+


m
K
S
K
S
K
B
+
Internet


K
S
( )
.


K
B
( )
.
-
K
B
-
K
S
m
K
S
(m )
K
B
(K
S
 )
+

+

-
Bob:
uses his private key to decrypt and recover K
S
uses K
S
 to decrypt K
S
(m) to recover m

Secure e-mail: 
integrity, authentication
Security: 8- 
‹#›
 Alice wants to send m to Bob, with 
message integrity
, 
authentication


H( )
.

K
A
( )
.
-
H(m )
K
A
(H(m))
-


m
K
A
-



m

K
A
( )
.
+
K
A
+
K
A
(H(m))
-
m

H( )
.



H(m )
compare
Internet

+

-
Alice digitally signs hash of her message with her private key, providing integrity and authentication 
sends both message (in the clear) and digital signature

Secure e-mail: 
integrity, authentication
Security: 8- 
‹#›
 Alice sends m to Bob, with 
confidentiality,
 
message integrity
, 
authentication


H( )
.

K
A
( )
.
-
K
A
(H(m))
-


m
K
A
-
m
Internet

+

K
S
( )
.

K
B
( )
.
+
K
S
(m )
K
B
(K
S
 )
+


K
S
K
B
+
K
S

+
message integrity
, 
authentication
confidentiality
Alice uses three keys: 
her private key, Bob’s public key, new symmetric key
What are Bob’s complementary actions?

Chapter 8 outline
What is network security?
Principles of cryptography
Authentication, 
message integrity
Securing e-mail
Securing TCP connections: TLS
Network layer security: IPsec
Security in wireless and mobile networks
Operational security: firewalls and IDS
Security: 8- 
‹#›

Transport-layer security (TLS)
Security: 8- 
‹#›
widely deployed security protocol above the transport layer
supported by almost all browsers, web servers: https (port 443)
provides:
confidentiality: 
via 
symmetric encryption
integrity: 
via 
cryptographic hashing
authentication: 
via 
public key cryptography


all techniques we have studied!
history: 
early research, implementation: 
secure network programming, secure sockets
secure socket layer (SSL) deprecated 
[2015]
TLS 
1.3
: RFC 8846 [2018]

Transport-layer security: what’s needed?
Security: 8- 
‹#›
handshake: 
Alice, Bob use their certificates, private keys to authenticate each other, exchange or create shared secret
key derivation
:
 Alice, Bob use shared secret to derive set of keys
data transfer: 
stream data transfer: data as a series of records
not just one-time transactions
connection closure: 
special messages to securely close connection
let’s 
build
 a toy TLS protocol, 
t-tls, 
to see what’s needed!
we’ve seen the “pieces” already:

client request
server reply
t-tls hello
public key certificate
K
A
+
(MS) = EMS
TCP SYN
SYNACK
ACK
t-tls: initial handshake
t-tls handshake phase:
Bob establishes TCP connection with Alice
Bob verifies that Alice is really Alice
Bob sends Alice a master secret key (MS), used to generate all other keys for TLS session
potential issues:
3 RTT before client can start receiving data (including TCP handshake)

Security: 8- 
‹#›

t-tls: cryptographic keys
Security: 8- 
‹#›
considered bad to use same key for more than one cryptographic function
different keys for message authentication code (MAC) and encryption
four keys:
K
c
 : encryption key for data sent from client to server
M
c
 : MAC key for data sent from client to server
K
s
 : encryption key for data sent from server to client
M
s
 : MAC key for data sent from server to client
keys derived from key derivation function (KDF)
takes master secret and (possibly) some additional random data to create new keys

t-tls: encrypting data
Security: 8- 
‹#›

recall: TCP provides data 
byte
 
stream
 abstraction
Q: 
can we encrypt data in-stream as written into TCP socket?
A: 
where would MAC go? If at end, no message integrity until all data received and connection closed!
solution: 
break stream in series of “records”
each client-to-server record carries a MAC, created using M
c
receiver can act on each record as it arrives

data
MAC
length
t-tls record encrypted using symmetric key, K
c, 
passed to TCP:
K
c
(
)

t-tls: encrypting data 
(more)
Security: 8- 
‹#›

possible attacks on data stream?
re-ordering: 
man-in middle intercepts TCP segments and reorders (manipulating sequence #s in unencrypted TCP header)
replay
solutions:
use TLS sequence numbers (data, TLS-seq-# incorporated into MAC)
use nonce

t-tls: connection close
Security: 8- 
‹#›


data
MAC
length
type

K
c
(
)
truncation attack: 
attacker forges TCP connection close segment
one or both sides thinks there is less data than there actually is 
solution: 
record types, with one type for closure
type 0 for data; type 1 for close
MAC now computed using data, type, sequence #

Transport-layer security (TLS)
Security: 8- 
‹#›

IP

TCP

TLS

HTTP/2

IP

UDP

QUIC

HTTP/2 
(slimmed)
Network
Transport
Application
HTTP/2 over TCP

HTTP/3
HTTP/2 over QUIC 
(which incorporates TLS)
over UDP

IP

TCP

HTTP
 1.0
HTTP/2 over TCP

TLS provides an API that 
any
 application can use
an HTTP view of TLS:

“cipher suite”: algorithms that can be used for key generation, encryption, MAC, digital signature
TLS: 1.3 
(2018)
:
 more limited cipher suite choice than TLS 1.2 
(2008)
only 5 choices, rather than 37 choices
requires
 Diffie-Hellman (DH) for key exchange, rather than DH or RSA
combined encryption and authentication algorithm (“authenticated encryption”) for data rather than serial encryption, authentication
4 based on AES
HMAC uses SHA (256 or 284) cryptographic hash function
TLS: 1.3 cipher suite
Security: 8- 
‹#›

TLS 1.3 handshake: 1 RTT
Security: 8- 
‹#›
































client hello:
supported cipher suites
DH key agreement protocol, parameters

1


server hello:
selected cipher suite
DH key agreement protocol, parameters

2

3
client 
server 
client TLS hello msg: 
guesses 
key agreement protocol, parameters
indicates cipher suites it supports

1
server TLS hello msg chooses 
key agreement protocol, parameters
cipher suite
server-signed certificate

2
client:
checks server certificate
generates key
can now make application request (e.g.., HTTPS GET)

3

TLS 1.3 handshake: 0 RTT
Security: 8- 
‹#›
































client hello:
supported cipher suites
DH key agreement protocol, parameters
application data


server hello:
selected cipher suite
DH key agreement protocol, parameters
application data (reply)
client 
server 
initial hello message contains encrypted application data!
“resuming” earlier connection between client and server 
application data encrypted using “resumption master secret” from earlier connection
vulnerable to replay attacks!
maybe OK for get HTTP GET or client requests not modifying server state

Chapter 8 outline
What is network security?
Principles of cryptography
Authentication, 
message integrity
Securing e-mail
Securing TCP connections: TLS
Network layer security: IPsec
Security in wireless and mobile networks
Operational security: firewalls and IDS
Security: 8- 
‹#›

provides datagram-level encryption, authentication, integrity
for both user traffic and control traffic (e.g., BGP, DNS messages)
two “modes”:

IP Sec
Security: 8- 
‹#›
transport mode: 
only
 
 datagram 
payload
 is encrypted, authenticated
tunnel mode: 
entire datagram is encrypted, authenticated
encrypted datagram encapsulated in new datagram with new IP header, tunneled to destination

                   
              





                   
              










                   
              





                   
              







payload




payload





payload

Two IPsec protocols
Security: 8- 
‹#›
Authentication Header (AH) protocol 
[RFC 4302]
provides source authentication & data integrity but 
not 
confidentiality
Encapsulation Security Protocol (ESP) 
[RFC 4303]
provides source authentication, data integrity, 
and confidentiality
more widely used than AH

SA
             
             
Security associations (SAs) 
Security: 8- 
‹#›
before sending data, 
security association (SA) 
established from sending to receiving entity  (directional)
ending, receiving entitles maintain 
state information
 about SA
recall: TCP endpoints also maintain state info
IP is connectionless; IPsec is connection-oriented!

                   
              





                   
              









193.68.2.23
200.168.1.100
R1 stores for SA:
32-bit identifier: 
Security Parameter Index (SPI)
origin SA interface 
(200.168.1.100)
destination SA interface 
(193.68.2.23)
type of encryption used
encryption key
type of integrity check used 
authentication key

IPsec datagram
Security: 8- 
‹#›
new IP
header
ESP
header
original
IP hdr
Original IP
datagram payload
ESP
trailer
ESP
auth
padding
pad
length
next
header
SPI
Seq
#
encrypted
authenticated
ESP trailer: padding for block ciphers
ESP header: 
SPI, so receiving entity knows what to do
sequence number, to thwart replay attacks
MAC in ESP auth field created with shared secret key
tunnel mode
ESP

ESP tunnel mode: actions
Security: 8- 
‹#›

                   
              





                   
              









at R1:
appends ESP trailer to original datagram (which includes original header fields!)
encrypts result using algorithm & key specified by SA
appends ESP header to front of this encrypted quantity
creates authentication MAC using algorithm and key specified in SA
appends MAC forming 
payload
creates new IP header, new IP header fields, addresses to tunnel endpoint


payload





payload

R1

IPsec sequence numbers
Security: 8- 
‹#›
for new SA, sender initializes seq. # to 0
each time datagram is sent on SA:
sender increments seq # counter
places value in seq # field
goal:
prevent attacker from sniffing and replaying a packet
receipt of duplicate, authenticated IP packets may disrupt service
method: 
destination checks for duplicates
doesn’t keep track of 
all 
received packets; instead uses a window

Security Policy Database (SPD)
Security: 8- 
‹#›
policy: for given datagram, sender needs to know if it should use IP sec
policy stored in 
security policy database (SPD)
needs to know which SA to use
may use: source and destination IP address; protocol number
Security Assoc. Database (SAD)

endpoint holds SA state in 
security association database (SAD)
when sending IPsec datagram, R1 accesses SAD to determine how to process datagram
when IPsec datagram arrives to R2, R2 examines SPI in IPsec datagram, indexes SAD with SPI, processing
datagram accordingly.



SPD: “what” to do
SAD: “how” to do it 
IPsec security databases

Security: 8- 
‹#›
Summary: IPsec services
Trudy sits somewhere between R1, R2. she doesn’t know the keys
will Trudy be able to see original contents of datagram? How about source, dest IP address, transport protocol, application port?
flip bits without detection?
masquerade as R1 using R1’s IP address?
replay a datagram?

Security: 8- 
‹#›
IKE: Internet Key Exchange 
previous examples: 
manual establishment of IPsec SAs in IPsec endpoints:
Example SA:
SPI: 12345
Source IP: 200.168.1.100
Dest IP: 193.68.2.23 
Protocol: ESP
Encryption algorithm: 3DES-cbc
HMAC algorithm: MD5
Encryption key: 0x7aeaca…
HMAC key:0xc0291f…
manual keying is impractical for VPN with 100s of endpoints 
instead use 
IPsec IKE (Internet Key Exchange
)

Security: 8- 
‹#›
IKE: PSK and PKI
authentication (prove who you are) with either
pre-shared secret (PSK) or 
with PKI (pubic/private keys and certificates).
PSK: both sides start with secret
run IKE to authenticate each other and to generate IPsec SAs (one in each direction), including encryption, authentication keys
PKI: both sides start with public/private key pair, certificate
run IKE to authenticate each other, obtain IPsec SAs (one in each direction).
similar with handshake in SSL.

Security: 8- 
‹#›
IKE phases
IKE has two phases
phase 1: 
establish bi-directional IKE SA
note: IKE SA different from IPsec SA
aka ISAKMP security association
phase 2: 
ISAKMP is used to securely negotiate IPsec pair of SAs
phase 1 has two modes: aggressive mode and main mode
aggressive mode uses fewer messages
main mode provides identity protection and is more flexible

Security: 8- 
‹#›
IPsec summary
IKE message exchange for algorithms, secret keys, SPI numbers
either AH or ESP protocol  (or both)
AH provides integrity, source authentication
ESP protocol (with AH) additionally provides encryption
IPsec peers can be two end systems, two routers/firewalls, or a router/firewall and 
an end system

Chapter 8 outline
What is network security?
Principles of cryptography
Authentication, 
message integrity
Securing e-mail
Securing TCP connections: TLS
Network layer security: IPsec
Security in wireless and mobile networks
802.11 (WiFi)
4G/5G 
Operational security: firewalls and IDS
Security: 8- 
‹#›

Security: 8- 
‹#›
802.11: authentication, encryption
Arriving mobile must:
associate with access point: (establish) communication over wireless link
authenticate to network

AP
AS
Authentication Server





























wired network
mobile

Security: 8- 
‹#›
802.11: authentication, encryption

AP
AS
Authentication Server





























wired network

1
discovery of security capabilities:
AP advertises its presence, forms of authentication and encryption provided
device requests specific forms authentication, encryption desired
although device, AP already exchanging messages, device not yet authenticated, does not have encryption keys

1
mobile
discovery of security capabilities

Security: 8- 
‹#›
802.11: authentication, encryption

AP
AS
Authentication Server
mobile





























wired network

1
mutual authentication and shared symmetric key derivation:
AS, mobile already have shared common secret (e.g., password) 
AS, mobile use shared secret, nonces (prevent relay attacks), cryptographic hashing (ensure message integrity) to authenticating each other
AS, mobile derive symmetric session key
discovery of security capabilities



2

2
mutual authentication, key derivation

Initial shared secret
Security: 8- 
‹#›
802.11: WPA3 handshake
AS generates 
Nonce
AS
, sends to mobile
mobile receives 
Nonce
AS  
generates 
Nonce
M 
generates symmetric shared session key 
K
M-AP
 
using 
Nonce
AS
, Nonce
M
, 
and initial shared secret
sends 
Nonce
M
, 
and
 
HMAC-signed value using Nonce
AS 
and initial shared secret
AS derives symmetric shared session key 
K
M-AP
 

a
Nonce
AS

b
Nonce
M
, HMAC(f(K
AS-M
,
Nonce
AS
)
) 
derive session key K
M-AP
 using  initial-shared-secret, 
Nonce
AS
, 
Nonce
M




























Initial shared secret

a

b

c
derive session key K
M-AP
 using  initial shared secret , 
Nonce
AS
, 
Nonce
M

c
AS 
Authentication Server
mobile

Security: 8- 
‹#›
802.11: authentication, encryption

AP
AS
Authentication Server
mobile





























wired network

1
discovery of security capabilities



2
mutual authentication, key derivation

3

3
Shared symmetric key distribution
shared symmetric session key distribution (e.g., for AES encryption)
same key derived at mobile, AS
AS informs AP of the shared symmetric session

Security: 8- 
‹#›
802.11: authentication, encryption

AP
AS
Authentication Server
mobile





























wired network

1
discovery of security capabilities



2

4
mutual authentication, key derivation

3
shared symmetric key distribution
encrypted communication between mobile and remote host via AP
same key derived at mobile, AS
AS informs AP of the shared symmetric session

4
encrypted communication over WiFi

Security: 8- 
‹#›
802.11: authentication, encryption

AP
AS
Authentication Server
mobile





























wired network



EAP TLS
EAP 
EAP over LAN (EAPoL) 
IEEE 802.11 
RADIUS
UDP/IP
Extensible Authentication Protocol (EAP) 
[RFC 3748] 
defines end-to-end request/response protocol between mobile device, AS

Chapter 8 outline
What is network security?
Principles of cryptography
Authentication, 
message integrity
Securing e-mail
Securing TCP connections: TLS
Network layer security: IPsec
Security in wireless and mobile networks
802.11 (WiFi)
4G/5G 
Operational security: firewalls and IDS
Security: 8- 
‹#›

Security: 8- 
‹#›

K-Net gæsteforelæsning!
Emil fra K-Net!
2021-10-26_K-Net_Brief-Introduction.pdf
  
Security: 8- 
‹#›

Security: 8- 
‹#›
Authentication, encryption in 4G LTE

Visited network
mobile

Base station (BS)






                   
              
















Mobility Management Entity (
MME
)

Home network
Home Subscriber Service (
HSS
)

arriving mobile must:
associate with BS: (establish) communication over 4G wireless link
authenticate 
itself to network, and authenticate network
notable differences from WiFi
mobile’s SIMcard provides global identity, contains shared keys
services in visited network depend on (paid) service subscription in home network

Security: 8- 
‹#›
Authentication, encryption in 4G LTE
mobile, BS use derived session key K
BS-M
 to encrypt communications over 4G link
MME in visited network + HHS in home network, together play role of WiFi AS
ultimate authenticator is HSS
trust and business relationship between visited and home networks

Base station (BS)


Visited network
mobile
Mobility Management Entity (
MME
)

Home network
Home Subscriber Service (
HSS
)

K
HSS-M
K
BS-M
K
HSS-M

Security: 8- 
‹#›
Authentication, encryption in 4G LTE

a
attach
attach
AUTH_REQ (IMSI, VN info)

Base station (BS)


Visited network
mobile
Mobility Management Entity (
MME
)

Home network
Home Subscriber Service (
HSS
)

K
HSS-M
K
BS-M
K
HSS-M






                   
              
















authentication request to home network HSS
mobile sends attach message (containing its IMSI, visited network info) relayed from BS to visited MME to home HHS
IMSI identifies mobile’s home network


a

Security: 8- 
‹#›
Authentication, encryption in 4G LTE
HSS use shared-in-advance secret key, K
HSS-M
, to derive authentication token, 
auth_token
, and expected authentication response token, 
xres
HSS
auth_token 
contains info encrypted by HSS using K
HSS-M
 , allowing mobile to know that whoever computed 
auth_token 
knows shared-in-advance secret
mobile has authenticated network
visited HSS keeps 
xres
HSS 
for later use

b

b
AUTH_RESP (auth token,xres
HSS
,keys)
            auth token
           auth token

a
attach
attach
AUTH_REQ (IMSI, VN info)

Base station (BS)


Visited network
mobile
Mobility Management Entity (
MME
)

Home network
Home Subscriber Service (
HSS
)

K
HSS-M
K
BS-M
K
HSS-M

Security: 8- 
‹#›
Authentication, encryption in 4G LTE
authentication response from mobile:
mobile computes 
res
M
 using its secret key to make same cryptographic calculation that HSS made to compute 
xres
HSS
  and sends 
res
M
 to MME

c

b
AUTH_RESP (auth token,xres
HSS
,keys)
            auth token
           auth token

a
attach
attach
AUTH_REQ (IMSI, VN info)

Base station (BS)


Visited network
mobile
Mobility Management Entity (
MME
)

Home network
Home Subscriber Service (
HSS
)

K
HSS-M
K
BS-M
K
HSS-M






                   
              
















res
M

c

Security: 8- 
‹#›
Authentication, encryption in 4G LTE
mobile is authenticated by network:
MMS compares mobile-computed value of 
res
M
 
with the HSS-computed value of 
xres
HSS
 . If they match, mobile is authenticated ! (why?)
MMS informs BS that mobile is authenticated, generates keys for BS

d

b
AUTH_RESP (auth token,xres
HSS
,keys)
            auth token
           auth token

a
attach
attach
AUTH_REQ (IMSI, VN info)

Base station (BS)


Visited network
mobile
Mobility Management Entity (
MME
)

Home network
Home Subscriber Service (
HSS
)

K
HSS-M
K
BS-M
K
HSS-M






                   
              
















res
M

c

d
OK, keys
OK

Security: 8- 
‹#›
Authentication, encryption in 4G LTE

b
AUTH_RESP (auth token,xres
HSS
,keys)
            auth token
           auth token

a
attach
attach
AUTH_REQ (IMSI, VN info)

Base station (BS)


Visited network
mobile
Mobility Management Entity (
MME
)

Home network
Home Subscriber Service (
HSS
)

K
HSS-M
K
BS-M
K
HSS-M






                   
              
















res
M

c

d
OK, keys
OK

e
key derivation

e
mobile, BS determine keys for encrypting data, control frames over 4G wireless channel
AES can be used

4G
: MME in visited network makes authentication decision
5G: 
home network provides authentication decision
visited MME plays “middleman” role but can still reject

Security: 8- 
‹#›
Authentication, encryption: from 4G to 5G
4G: 
uses shared-in-advance keys
5G: 
keys not shared in advance for IoT
4G: 
device IMSI transmitted in cleartext to BS
5G: 
public key crypto used to encrypt IMSI

Chapter 8 outline
What is network security?
Principles of cryptography
Authentication, 
message integrity
Securing e-mail
Securing TCP connections: TLS
Network layer security: IPsec
Security in wireless and mobile networks
Operational security: firewalls and IDS
Security: 8- 
‹#›

Security: 8- 
‹#›
Firewalls


isolates organization’s internal network from larger Internet, allowing some packets to pass, blocking others


 

 















































































































 
 

 
 




administered
network
public
Internet
firewall
trusted “good guys” 
untrusted “bad guys” 

firewall

Security: 8- 
‹#›
Firewalls: why
prevent denial of service attacks:
SYN flooding: attacker establishes many bogus TCP connections, no resources left for “real” connections
prevent illegal modification/access of internal data
e.g., attacker replaces CIA’s homepage with something else
allow only authorized access to inside network
 set of authenticated users/hosts
three types of firewalls:
stateless packet filters
stateful packet filters
application gateways

Security: 8- 
‹#›
Stateless packet filtering

 








































                   
              










































Should arriving packet be allowed in? Departing packet let out?








internal network connected to Internet via router 
firewall
filters 
packet-by-packet
, 
decision to forward/drop packet based on
:
source IP address, destination IP address
TCP/UDP source, destination port numbers
ICMP message type
TCP SYN, ACK bits

Security: 8- 
‹#›
Stateless packet filtering: example

 








































                   
              










































Should arriving packet be allowed in? Departing packet let out?








example 1: 
block incoming and outgoing datagrams with IP protocol field = 17 and with either source or dest port = 23
result: 
all incoming, outgoing UDP flows and telnet connections are blocked
example 2: 
block inbound TCP segments with ACK=0
result: 
prevents external clients from making TCP connections with internal clients, but allows internal clients to connect to outside

Security: 8- 
‹#›
Stateless packet filtering: more examples
Policy
Firewall Setting
no outside Web access 
drop all outgoing packets to any IP address, port 80
no incoming TCP connections, except those for institution’s public Web server only.
drop all incoming TCP SYN packets to any IP except 130.207.244.203, port 80
prevent Web-radios from eating up the available bandwidth.
drop all incoming UDP packets - except DNS and router broadcasts.
prevent your network from being used for a smurf DoS attack.
drop all ICMP packets going to a “broadcast” address (e.g. 130.207.255.255)
prevent your network from being tracerouted
drop all outgoing ICMP TTL expired traffic

Security: 8- 
‹#›
Access Control Lists
action
source
address
dest
address
protocol
source
port
dest
port
flag
bit
allow
222.22/16
outside of
222.22/16
TCP
> 1023
80
any

allow

outside of
222.22/16
222.22/16

TCP
80
> 1023
ACK
allow
222.22/16
outside of
222.22/16
UDP
> 1023
53
---
allow

outside of
222.22/16
222.22/16

UDP
53
> 1023
----
deny
all
all
all
all
all
all
ACL:
 
table of rules, applied top to bottom to incoming packets: (action, condition) pairs: looks like OpenFlow forwarding (Ch. 4)!

Security: 8- 
‹#›
Stateful packet filtering
stateless packet filter
: 
heavy handed tool
admits packets that “make no sense,” e.g., dest port = 80, ACK bit set, even though no TCP connection established:
action
source
address
dest
address
protocol
source
port
dest
port
flag
bit
allow

outside of
222.22/16
222.22/16

TCP
80
> 1023
ACK
stateful packet filter:
 
track status of every TCP connection
track connection setup (SYN), teardown (FIN): determine whether incoming, outgoing packets “makes sense”
timeout inactive connections at firewall: no longer admit packets

Security: 8- 
‹#›
Stateful packet filtering
action
source
address
dest
address
proto
source
port
dest
port
flag
bit
check connection
allow
222.22/16
outside of
222.22/16
TCP
> 1023
80
any


allow

outside of
222.22/16
222.22/16

TCP
80
> 1023
ACK
x

allow
222.22/16
outside of
222.22/16
UDP
> 1023
53
---

allow

outside of
222.22/16
222.22/16

UDP
53
> 1023
----
x

deny
all
all
all
all
all
all


ACL augmented to indicate need to check connection state table before admitting packet

Security: 8- 
‹#›
Application gateways
filter packets on application data as well as on IP/TCP/UDP fields.
example: 
allow select internal users to telnet outside
1. 
require all telnet users to telnet through gateway.
2. 
for authorized users, gateway sets up telnet connection to dest host
 gateway relays data between 2 connections
3. 
router filter blocks all telnet connections not originating from gateway
application
gateway

 

































host-to-gateway
telnet session

router and filter
gateway-to-remote 
host telnet session

Security: 8- 
‹#›
Limitations of firewalls, gateways
IP spoofing: 
router can’t know if data “really” comes from claimed source
if multiple apps need special treatment, each has own app. gateway
client software must know how to contact gateway
e.g., must set IP address of proxy in Web browser
filters often use all or nothing policy for UDP
tradeoff:  
degree of communication with outside world, level of security
many highly protected sites still suffer from attacks

Security: 8- 
‹#›
Intrusion detection systems
packet filtering:
operates on TCP/IP headers only
no correlation check among sessions 
IDS: intrusion detection system
deep packet inspection: 
look at packet contents (e.g., check character strings in packet against database of known virus, attack strings)
examine correlation
 among multiple packets
port scanning
network mapping
DoS attack

Security: 8- 
‹#›
Intrusion detection systems

Web
server
FTP
server
DNS
server
Internet
demilitarized 
zone
firewall

IDS 
sensors
multiple IDSs: different types of checking at different locations
 

































internal
network

Security: 8- 
‹#›
Network Security (summary)
basic techniques…...
cryptography (symmetric and public key)
message integrity
end-point authentication
…. used in many different security scenarios
secure email
secure transport (TLS)
IP sec
802.11, 4G/5G
operational security: firewalls and IDS
