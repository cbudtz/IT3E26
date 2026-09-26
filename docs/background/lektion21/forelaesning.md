# E22 62581 Lektion 21 - IT og Kommunikation

Source: Google Slides,
https://docs.google.com/presentation/d/1dcz2gtQdI3no_kaQ3PAki9w7YfOBIhpwgTlntyR1LKc
(exported as plain text; slide-break formatting from the original is lost, but
all text content is preserved).

---

IT og Kommunikation
Christian Budtz

Dagens program

Cyberattacks
Sammenhængende web-system

Cyberattacks
Denial-of-service (DoS) and distributed denial-of-service (DDoS) attacks
Man-in-the-middle (MitM) attack
Phishing and spear phishing attacks
Drive-by attack
Password attack
SQL injection attack
Cross-site scripting (XSS) attack
Eavesdropping attack
Birthday attack
Malware attack
Rainbow table attack

Denial-of-service (DoS) og Distributed DOS (DDoS) attack


Kræver mange computere eks. BotNet
Udvælg mål
Brug Hosts/bots til at sende trafik
Overbelast målet
Målet går ned eller bliver unreachable.
Skal løses på ISP niveau…
ISP'er blokerer trafik fra mistænkelige IP'er


Denial-of-service (DoS) distributed DOS (DDoS) attack


Eks: TCP SYN Flood
Send SYN
Lad Serveren vente
Server Connection Queue bliver fuld
Løsninger: 
Firewall der sorterer gentagne SYN fra
Increase Connection Queue
Decrease Time-out

Man in the middle
Opfang afsender besked.
Send modificeret besked til modtager (eks med egen nøgle/kontonummer etc).
Vent på svar 
Modificer svar til afsender

Man in the middle

Eks. Session Hijacking
A client connects to a server.
The attacker’s computer gains control of the clients session ID/token.
The attacker’s computer disconnects the client from the server.
The attacker’s computer replaces the client’s IP address with its own IP address and
spoofs the client’s sequence numbers.
The attacker’s computer continues dialog with the server and the server believes it is still communicating with the client.


Man in the middle

Eks. Session Hijacking
Løsninger:
Pas på Public Wifi
VPN
Undgå malware!


Man in the middle

Eks. Replay Attack
Løsninger:
Nonce


Phishing 

Social engineering!
Eks.: Mail fra troværdig kilde
Spoof Email adresse 
from: direktør@danskebank.dk
(ingen umiddelbar garanti for afsender)
Eks. Microsoft support!
Vi skal liiiige installere noget software for at diagnosticere din maskine...
Målrettet
Overfør penge
Overfør data
Download malware




Spear - Phishing 

Personligt mårettet
Kræver research 
Effektiv!



Phishing 

Løsninger
Ikke tekniske
Kritisk tænkning
Procedure for udlevering af data
Genopkald!
Teknisk
Email header analyse
Verifikation af afsender
DMARC: https://www.dk-hostmaster.dk/da/dmarc 
Separat DNS entry
Check Signatur (DKIM)
Check afsender IP (SPF)




Drive-by attack
Hacker finder sårbarhed på webserver
Lægger ondsindet kode op
Koden manipulerer besøgende
Sender videre til falsk side
Installerer malware
Udnytter hullet browser…


Drive-by attack
Løsninger
Opdater server
Opdater browser
Hold øje med url'en!


Password attack
Angriber forsøger at gætte password på side direkte
Brute-force: Alle kombinationer
Dictionary
Målrettet hyppige kombinationer
Angriber har hashes fra stjålet database
Rainbow table attack!

Password attack
Løsninger
Angriber forsøger at gætte password på side direkte
Forsinkelse pr login
Øget forsinkelse ved gentagne forsøg
Black-listing
Statistisk analyse
Gode passwords!
Angriber har hashes fra stjålet database
Rainbow table attack!
Salt!

Password attack - Hvad er et godt password?
Høj entropi ~ mange kombinationer
Mange tegn
Uforudsigelighed
Er i modsætning til 
Let at huske…

Dårlig løsning:Regler der gør det sværere at huske
Stort bogstav, specialtegn, tal
Hyppige skift
Januar21$
KatSommer1$
Bedre
Lange passwords med nemt huskbare og ulogisk sammensatte ord:
hestesvømmelangebadgris

Password attack - Hvad er et godt password?
Correct Horse Battery Staple | Generate Secure Memorable Passwords 

SQL Injection Attack
Hjemmeside med tekstinput sanerer ikke input
“SELECT * FROM users WHERE account = ''"  + userProvidedAccountNumber +  " ';"
Angriber skriver SQL i inputfelt
' or '1' = '1';
Hjemmeside henter data der ikke burde være tilgængelig
“SELECT * FROM users WHERE account = '' or '1' = '1' ;”


SQL Injection Attack



Cross-site scripting (XSS) attack
Angriber skriver javascript på et website
Eks. Facebook-opslag:" <script src="mydomain.com/evilscript.js></script> Blenderen er elendig!"
Andre besøgende eksekverer uforvarende js
Scriptet stjæler cookies
Normalt bundet tildomænet!
Angriber bruger cookieeks. til session hijack

Eavesdropping
Passiv
Eks. Aflytning af wifi-trafik
Aktiv
Udgiv dig for at være en anden

Birthday attack
Skift en signeret besked ud ved at finde en besked med samme hash
Eks. ved sårbarheder i Hash-algoritmen eller for kort hash


Malware
Macro - sårbarhed i installerede programmer - eks word, excel
File - Troværdige filer med ondsindet kode
Virus: Spreder sig ved aktiv bruger indblanding
Worm: Spreder sig af sig selv
Trojan: Gemt i rigtigt program.
Ransomware: Malware der krypterer data og sender nøglen til angriberen

Malware
Løsninger
Backups
TEST AF BACKUPS
backups kan også være inficeret med ransomware!
Begrænsninger (installation af software)
Separat administrator-konto
Politikker
Verificér kilde
Uddannelse!
Lær at genkende et angreb

Øvelser
Protokol Møde!
Bliv enige om XSD skema!
Bliv enige om Url'er for de forskellige grupper
Generér skema 
Generér Java klasser fra skema
Hint: https://github.com/cbudtz/XMLXperiments 
Hack en Side:
https://tryhackme.com/room/sqlilab 
Hack jeres egen side?
Arbejd på projektet...

Quiz
www.socrative.com
