# E22 62581 Lektion20.pptx

Source: PowerPoint,
https://drive.google.com/file/d/17frVcwMC7Tg6VjZPq-MXQpYb8-M-04yV
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

Chapter 8 outline
What is network security?
Principles of cryptography
Message integrity, authentication
Securing e-mail
Securing TCP connections: TLS
Network layer security: IPsec
Security in wireless and mobile networks
Operational security: firewalls and IDS
Security: 8- 
‹#›

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

Friends and enemies: Alice, Bob, Trudy
Security: 8- 
‹#›
well-known in network security world
Bob, Alice (lovers!) want to communicate “securely”
Trudy (intruder) may intercept, delete, add messages

secure
sender

secure
receiver
channel
data, control messages


data
data
Alice
Bob
Trudy

Friends and enemies: Alice, Bob, Trudy
Who might Bob and Alice be?
… well, 
real-life
 Bobs and Alices!
Web browser/server for electronic transactions (e.g., on-line purchases)
on-line banking client/server
DNS servers
BGP routers exchanging routing table updates
other examples?

There are bad guys (and girls) out there!
Q:
  
What can a “bad guy” do?
A:
  
A lot! (recall section 1.6)
eavesdrop: 
intercept messages
actively 
insert
 messages into connection
impersonation: 
can fake (spoof) source address in packet (or any field in packet)
hijacking: 
“take over” ongoing connection by removing sender or receiver, inserting himself in place
denial of service: 
prevent service from being used by others (e.g.,  by overloading resources)

Chapter 8 outline
What is network security?
Principles of cryptography
Message integrity, authentication
Securing e-mail
Securing TCP connections: TLS
Network layer security: IPsec
Security in wireless and mobile networks
Operational security: firewalls and IDS
Security: 8- 
‹#›

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

Breaking an encryption scheme
cipher-text only attack: 
Trudy has ciphertext she can analyze
two approaches:
brute force
: 
search through all keys 
statistical analysis
known-plaintext attack: 
Trudy has plaintext corresponding to ciphertext
e.g., 
in monoalphabetic cipher, Trudy determines pairings for a,l,i,c,e,b,o,
chosen-plaintext attack: 
Trudy can get ciphertext for chosen plaintext

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

Simple encryption scheme
substitution cipher: 
substituting one thing for another
monoalphabetic cipher: substitute one letter for another
plaintext:  abcdefghijklmnopqrstuvwxyz
ciphertext:  mnbvcxzasdfghjklpoiuytrewq
Plaintext: bob. i love you. alice
ciphertext: nkn. s gktc wky. mgsbc
e.g.:
Encryption key: 
mapping from set of 26 letters
                     to set of 26 letters
Security: 8- 
‹#›

A more sophisticated encryption approach
Security: 8- 
‹#›
n substitution ciphers, M
1
,M
2
,…,M
n
cycling pattern:
e.g., n=4: M
1
,M
3
,M
4
,M
3
,M
2
;   M
1
,M
3
,M
4
,M
3
,M
2
;
 ..
for each new plaintext symbol, use subsequent substitution pattern in cyclic pattern
dog: d from M
1
, o from M
3
, g from M
4

Encryption key: 
n substitution ciphers, and cyclic pattern
key need not be just n-bit pattern

Symmetric key crypto: DES
Security: 8- 
‹#›
DES: Data Encryption Standard
US encryption standard [NIST 1993]
56-bit symmetric key, 64-bit plaintext input
block cipher with cipher block chaining
how secure is DES?
DES Challenge: 56-bit-key-encrypted phrase  decrypted (brute force) in less than a day
no known good analytic attack
making DES more secure:
3DES: encrypt 3 times with 3 different keys

AES: Advanced Encryption Standard
Security: 8- 
‹#›
symmetric-key NIST standard, replaced DES (Nov 2001)
processes data in 128 bit blocks
128, 192, or 256 bit keys
brute force decryption (try each key) taking 1 sec on DES, takes 149 trillion years for AES

Public Key Cryptography
Security: 8- 
‹#›
symmetric key crypto:
requires sender, receiver know shared secret key
Q: how to agree on key in first place (particularly if never “met”)?



public key crypto

radically 
different approach [Diffie-Hellman76, RSA78]
sender, receiver do 
not
 share secret key
public
 
encryption key 
 
known to
 
all
private
 decryption key known only to receiver

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

Public key encryption algorithms
Security: 8- 
‹#›
requirements:
RSA: 
Rivest, Shamir, Adelson algorithm

1
need K  ( ) and K  ( ) such that
B
B
.
.
+
-
K  (K   (m))  =  m 
B
B
-
+
given public key K  , it should be impossible to compute private key K  
B
B

2
+
-

Prerequisite: modular arithmetic
Security: 8- 
‹#›
x mod n = remainder of x when divide by n
facts:
[(a mod n) + (b mod n)] mod n = (a+b) mod n
[(a mod n) - (b mod n)] mod n = (a-b) mod n
[(a mod n) * (b mod n)] mod n = (a*b) mod n
thus
    
(a mod n)
d
 mod n = a
d
 mod n
example: x=14, n=10, d=2:
    (x mod n)
d
 mod n = 4
2
 mod 10 = 6
    x
d
 = 14
2
 = 196   x
d
 mod 10  = 6

RSA: getting ready
Security: 8- 
‹#›
message: just a bit pattern
bit pattern can be uniquely represented by an integer number 
thus, encrypting a message is equivalent to encrypting a number
example:
m= 10010001. This message is uniquely represented by the decimal number 145. 
to encrypt m, we encrypt the corresponding number, which gives a new number (the ciphertext).

RSA: Creating public/private key pair
Security: 8- 
‹#›
1.
 choose two large prime numbers 
p, q.
  (e.g., 1024 bits each)
2.
 compute 
n 
= pq,  z = (p-1)(q-1
)
3.
 choose 
e
 (
with
 e<n)
 that has no common factors  with z (
e, z
 are “relatively prime”).
4.
 choose 
d
 such that 
ed-1
 is  exactly divisible by 
z
.  (in other words: 
ed
 mod 
z  = 1 
).
5.
 
public
 key is 
(
n,e
).
  
private
 key is 
(
n,d
).
K
 
B
+
K
 
B
-

RSA: encryption, decryption
Security: 8- 
‹#›
0.
  given (
n,e
) and (
n,d
) as computed above
1.
 to encrypt message 
m (<n)
, compute
c = m   
mod
  n
e


2.
 to decrypt received bit pattern, 
c
, compute
m = c   
mod
  n
d
m  =  (m   
mod
  n)
e
 
mod
  n
d
magic happens!


c

RSA example:
Security: 8- 
‹#›
Bob chooses 
p=5, q=7
.  Then 
n=35, z=24
.
e=5
  (so 
e, z
  relatively prime).
d=29
 (so 
ed-1
 exactly divisible by z).
 
bit pattern
m
m
e
c = m  mod  n
e
0000l000
12
24832
17
encrypt:
encrypting 8-bit messages.




c
m = c  mod  n
d
17
481968572106750915091411825223071697
12
c
d
decrypt:

Why does RSA work?
Security: 8- 
‹#›
must show that c
d
 mod n = m,  where c = m
e
 mod n
fact: for any x and y: x
y
 mod n = x
(y mod z)
 mod n
where n= pq and z = (p-1)(q-1)
thus, 
 c
d
 mod n = (m
e
 mod n)
d
 mod n
                  = m
ed
 mod n 
                  = m
(ed mod z)
 mod n
                  = m
1
 mod n
                  = m

RSA: another important property
Security: 8- 
‹#›
The following property will be 
very
 
useful later:
K  
(
K  (m)
)
  =  m 
B
B
-
+
K  
(
K  (m)
)
  
B
B
+
-
=
use public key first, followed by private key 
use private key first, followed by public key 


result is the same!

Security: 8- 
‹#›

follows directly from modular arithmetic:

(m
e
 mod n)
d
 mod n = m
ed
 mod n
                             = m
de
 mod n
                             = (m
d
 mod n)
e
 mod n 

Why
?
K  
(
K  (m)
)
  =  m 
B
B
-
+
K  
(
K  (m)
)
  
B
B
+
-
=

Why is RSA secure?
Security: 8- 
‹#›
suppose you know Bob’s public key (n,e). How hard is it to determine d?
essentially need to find factors of n without knowing the two factors p and q 
fact: factoring a big number is hard

RSA in practice: session keys
Security: 8- 
‹#›
exponentiation in RSA is computationally intensive
DES is at least 100 times faster than RSA
use public key crypto to establish secure connection, then establish second key – symmetric session key – for encrypting data
session key, K
S
Bob and Alice use RSA to exchange a symmetric session key K
S
once both have K
S
, they use symmetric key cryptography

Chapter 8 outline
What is network security?
Principles of cryptography
Authentication
, message integrity
Securing e-mail
Securing TCP connections: TLS
Network layer security: IPsec
Security in wireless and mobile networks
Operational security: firewalls and IDS
Security: 8- 
‹#›

Authentication
Security: 8- 
‹#›
Goal: 
Bob wants Alice to “prove” her identity to him
Protocol ap1.0:  
Alice says “I am Alice”
failure scenario??
“I am Alice”

Authentication
Security: 8- 
‹#›
Goal: 
Bob wants Alice to “prove” her identity to him
Protocol ap1.0:  
Alice says “I am Alice”
in a network, Bob can not “see” Alice, so Trudy simply declares herself to be Alice
“I am Alice”

Authentication: another try
Security: 8- 
‹#›
Goal: 
Bob wants Alice to “prove” her identity to him
Protocol ap2.0: 
Alice says “I am Alice” in an IP packet containing her source IP address 

“I am Alice”
Alice’s 
IP address
failure scenario??

Authentication: another try
Security: 8- 
‹#›
Goal: 
Bob wants Alice to “prove” her identity to him
Protocol ap2.0: 
Alice says “I am Alice” in an IP packet containing her source IP address 

“I am Alice”
Alice’s 
IP address
Trudy can create
a packet “spoofing”
Alice’s address

Authentication: a third try
Security: 8- 
‹#›
Goal: 
Bob wants Alice to “prove” her identity to him
Protocol ap3.0: 
Alice says “I am Alice” Alice says “I am Alice” and sends her secret password to “prove” it.



“I am Alice”
Alice’s 
IP addr
Alice’s 
password
failure scenario??

Alice’s 
IP addr
OK

Authentication: a third try
Security: 8- 
‹#›
Goal: 
Bob wants Alice to “prove” her identity to him
Protocol ap3.0: 
Alice says “I am Alice” Alice says “I am Alice” and sends her secret password to “prove” it.



“I am Alice”
Alice’s 
IP addr
Alice’s 
password

Alice’s 
IP addr
OK

“I am Alice”
Alice’s 
IP addr
Alice’s 
password
playback attack: 
Trudy records Alice’s packet
and later
plays it back to Bob

Authentication: a modified third try
Security: 8- 
‹#›
Goal: 
Bob wants Alice to “prove” her identity to him
Protocol ap3.0: 
Alice says “I am Alice” Alice says “I am Alice” and sends her encrypted secret password to “prove” it.



“I am Alice”
Alice’s 
IP addr
encrypted
password
failure scenario??

Alice’s 
IP addr
OK

Authentication: a modified third try
Security: 8- 
‹#›
Goal: 
Bob wants Alice to “prove” her identity to him
Protocol ap3.0: 
Alice says “I am Alice” Alice says “I am Alice” and sends her encrypted secret password to “prove” it.



“I am Alice”
Alice’s 
IP addr
encrypted
password

Alice’s 
IP addr
OK

“I am Alice”
Alice’s 
IP addr
encrypted 
password
playback attack still works: 
Trudy records Alice’s packet
and later plays it back to Bob

Authentication: a fourth try
Security: 8- 
‹#›
Goal: 
avoid playback attack
protocol ap4.0: 
to prove Alice “live”, Bob sends Alice nonce, R 
Alice must return R, encrypted with shared secret key
nonce: 
number (R) used only 
once-in-a-lifetime
Failures, drawbacks?
“I am Alice”
R
K    (R)
A-B
Bob know Alice is live, and only Alice knows key to encrypt nonce, so it must be Alice!

Authentication: ap5.0
Security: 8- 
‹#›
ap4.0 requires shared symmetric key  - can we authenticate using public key techniques?
ap5.0: 
use nonce, public key cryptography
“I am Alice”
R
K   (R)
A
-
Send me your public key
K   (R)
A
+
Bob computes
and knows only Alice could have the private key, that encrypted R such that
(K  (R)) = R
A
-
K  
A
+
(K  (R)) = R
A
-
K  
A
+

Authentication: ap5.0 – there’s still a flaw!
Security: 8- 
‹#›
man (or woman) in the middle attack: 
Trudy poses as Alice (to Bob) and as Bob (to Alice)
I am Alice
I am Alice
Send me your public key
Send me your public key
T
m = K  (K   (m))
+
T
-
Trudy recovers m:
sends m to Alice encrypted with Alice’s public key

T
K   (R)
-

R

T
K  
+


T
K  
+
(K   (R)) =  R,
T
-
Bob computes
authenticating
Trudy as Alice

R

A
K   (R)
-

K  
+
A

K   (m)
+
T
Bob sends a personal message, m to Alice

A
K  (m)
+
A
m = K  (K   (m))
+
A
-
Trudy recovers Bob’s m:
and she and Bob meet a week later in person and discuss m, not knowing Trudy knows m
?
Where are mistakes made here?

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

Digital signatures 
Security: 8- 
‹#›
cryptographic technique analogous to hand-written signatures:
sender (Bob) digitally signs document: he is document owner/creator. 
verifiable, nonforgeable:
 
recipient (Alice) can prove to someone that Bob, and no one else (including Alice), must have signed document 
simple digital signature for message m:
Bob signs m by encrypting with his private key K
B
, creating “signed” message, K
B
-
(m)

Bob’s message, m

Public key
encryption
algorithm
Bob’s private
key 
K 
B
-
m,K 
B
-
 (m)
Dear Alice
Oh, how I have missed you. I think of you all the time! …(blah blah blah)
Bob
Dear Alice
Oh, how I have missed you. I think of you all the time! …(blah blah blah)
Bob
K 
B
-
 (m)

Digital signatures 
Security: 8- 
‹#›
-
Alice thus verifies that:
Bob signed m
no one else signed m
Bob signed m and not m’
non-repudiation:
Alice can take m, and signature K
B
(m) to court and prove that Bob signed m

-
suppose Alice receives msg m, with signature: m, K
B
(m)
Alice verifies m signed by Bob by applying Bob’s public key K
B
 to K
B
(m) then checks K
B
(K
B
(m) ) = m.
If K
B
(K
B
(m) ) = m, whoever signed m must have used Bob’s private key
-
-
-
+
+
+

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

Internet checksum: poor crypto hash function
Security: 8- 
‹#›
Internet checksum has some properties of hash function:
produces fixed length digest (16-bit sum) of message
is many-to-one
but given message with given hash value, it is easy to find another message with same hash value: 
I O U 1
0 0 . 9
9 B O B
49 4F 55 31
30 30 2E 39
39 42 D2 42
message
ASCII format
B2 C1 D2 AC
I O U 
9
0 0 . 
1
9 B O B
49 4F 55 
39
30 30 2E 
31
39 42 D2 42
message
ASCII format
B2 C1 D2 AC
different messages
but identical checksums
!

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

Hash function algorithms
Security: 8- 
‹#›
MD5 hash function widely used (RFC 1321) 
computes 128-bit message digest in 4-step process. 
arbitrary 128-bit string x, appears difficult to construct msg m whose MD5 hash is equal to x
SHA-1 is also used
US standard [
NIST, FIPS PUB 180-1]
160-bit message digest

Authentication: ap5.0 – let’s fix it!!
Security: 8- 
‹#›
Recall the problem: 
Trudy poses as Alice (to Bob) and as Bob (to Alice)
I am Alice
I am Alice
Send me your public key
Send me your public key
T
m = K  (K   (m))
+
T
-
Trudy recovers m:
sends m to Alice encrypted with Alice’s public key

T
K   (R)
-

R

T
K  
+


T
K  
+
(K   (R)) =  R,
T
-
Bob computes
authenticating
Trudy as Alice

R

A
K   (R)
-

K  
+
A

K   (m)
+
T
Bob sends a personal message, m to Alice

A
K  (m)
+
A
m = K  (K   (m))
+
A
-
Trudy recovers Bob’s m:
and she and Bob meet a week later in person and discuss m, not knowing Trudy knows m
?
Where are mistakes made here?

Need for certified public keys
Security: 8- 
‹#›
motivation: Trudy plays pizza prank on Bob

Trudy creates e-mail order: 
Dear Pizza Store, Please deliver to me four pepperoni pizzas. Thank you, Bob
Trudy signs order with her private key
Trudy sends order to Pizza Store
Trudy sends to Pizza Store her public key, but says it’s Bob’s public key
Pizza Store verifies signature; then delivers four pepperoni pizzas to Bob
Bob doesn’t even like pepperoni

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

Public key Certification Authorities (CA)
Security: 8- 
‹#›
Bob’s 
public
key 
K 
B
+
K 
B
+
when Alice wants Bob’s public key
:
gets Bob’s certificate (Bob or elsewhere) 
apply CA’s public key to Bob’s certificate, get Bob’s public key
CA’s 
public
key
 
K 
CA
+

digital
signature
(decrypt)

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

Resumé
Symmetrisk kryptering: Én fælles hemmelig nøgle
Asymmetisk kryptering - Én offentlig og én privat nøgle
Sikker overførsel (kryptér med offentlig nøgle)
Digital signatur (Kryptér med privat nøgle)
Krypter Digest (Hash) for at spare nøgle+CPU
Kræver at man stoler på privat nøgle - gennem CA
Hashing - 'Envejs kodning'
MAC (Message Authentication Code) - Hash af message og secret
Kræver fælles hemmelig nøgle
Validering af 	integritet
	
Security: 8- 
‹#›
