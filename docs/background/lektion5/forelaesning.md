# E22 62581 Forelæsning - Lektion05

Source: Google Slides,
https://docs.google.com/presentation/d/1RCkjFwi2T8Ax95k9hrwZuZ0WPGwjsSWVHfY5RX3ZO3g
(exported as plain text; slide-break formatting from the original is lost, but
all text content is preserved).

---

Lektion 05
Serveradministration. Linux og Bash. Web-servere (Tomcat)


Agenda	
Systemdrift
Hardware
Virtual machines
OS: Linux
Webservere: Tomcat
(Backup, Monitoring … Access Control)

Virtualisering
Virtuel Hardware
Hardwaredeling
CPU, Ram og IO-devices
Forskellige gæste-operativ systemer (guest-OS)
Isolering
Hvis guest-os går ned, kører host-os videre
Cloud
OS-virtualisering (Containerization)
NB: Få en kopi af Ubuntu fra min USB-nøgle

Virtualisering
Hypervisor kører på Computeren
Udstiller 'virtuel hardware' til containers
Bro til rigtig hardware
Operativ-system og software installeres i containere


Virtuelle maskiner
Live migration
Kan flyttes mellem hypervisorer på forskellige maskiner - måske endda uden nedetid
Load balancing, disaster recovery, server vedligehold...
VM image
Præinstallerede/konfigurerede (kørende) maskiner
Snapshots

Containerization
Virtualisering uden hypervisor
'Sandboxing'
Nativ performance
Eget filsystem
Eget 'namespace'
Docker, Linux Containers...


Webminal
Virtualiseret OS i browseren
Giver mulighed for at eksperimentere uden risiko

VirtualBox
Hypervisor vi kan installere på egen computer
Giver mulighed for at køre og eksperimentere med Linux uden risiko for resten af computeren

Installation af Ubuntu
Hvorfor Linux/Ubuntu
Gratis licens
600$ for windows server
⅔ af Servere på nettet (Stor usikkerhed)
100% af alle supercomputere
Bash findes også på Windows

Ubuntu server vs desktop
Desktop
GUI
Kontorprogrammer
Server
Headless
Serverpakker

Lidt on Ubuntu
Linux OS
Betjenes oftest med BASH - shell
Ofte brugt til servere
Har indbygget pakke manager - apt
Kan bruges til at installere software

Tid til at eksperimentere lidt med Virtualbox
Øvelser i 45?? min
Download og installer VirtualBox
Installer Ubuntu
Hold Pause når installationen kører!
Tager ca. 15 min


Linux Shell - Bash
Nyttige kommandoer
sudo - brug administrator rettigheder
pwd - aktuel sti
cd - skift bibliotek
ls - list filer
ls -a - alle filer
ls -l udvidet information (blandt andet om ejerskab)
ls -R (recursive - se alle under biblioteker)
mkdir "navn" - opret bibliotek med "navn"
rmdir "navn" - fjern mappe
touch - opret en fil

Nyttige linux kommandoer - filer
cp "fra" "til" - kopier fra "fra" til "til"
mv - flyt eller omdøb fil.
rm - fjern fil
rm -r (fjern også rekursivt)
file - information om fil
stat - information om bla ejerskab
cat "filnavn" - vis fil
head "filnavn" - vis starten af en fil
tail "filnavn" - vis slutningen af en fil
find "hvor" -name "navn - finder i alle undermapper

Standard filsystem-opbygning
Kun én root 
Windows har flere drev

Standard filsystem-opbygning

Nyttige linux kommandoer - brugere/rettigheder
su - switch user
Hver bruger har en egen home folder hvor de har rettigheder
sudo - brug superbruger
sudo -s bliv superbruger
drwxrwxrwx - directory-ejer-gruppe-alle
chmod - ændr rettigheder
u=rwx, g=rwx, a=rwx
chown "bruger" - skift ejer

Øvelser Pt 2

Snapshots og kloner
SnapShot er statiske kopier af en maskine på et specifikt tidspunkt
Kloner er kørende kopier af en maskine.

Forskellige typer af netværk
NAT 
Port på Host viderestilles til VM
Bridged
Egen IP
Virtuelt netværkskort
Størst frihed

Web-Servere
Rene HTML -servere
Deler bare oldschool html-filer ud
apache/nginx og mange flere
Dynamiske webservere
Tomcat: kan afvikle Java
Java-webcontainers

Tomcat webserver
Gratis og open source
Reference implementering af Java Web-server
Kan afvikle vores WebApplikation
Apache: HTML-sider
Tomcat-container: Vores dynamiske Java-kode
