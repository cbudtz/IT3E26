# E22 62581 Øvelser - Lektion05

Source: Google Docs,
https://docs.google.com/document/d/1VyA78P78pUPxdFdBSE3y57hXQgUpeNsVrDVQarlzm94

---

Øvelser - Lektion 05


1 Virtuel maskine med Virtualbox
2 Installer en webserver på din virtuellemaskine
3 Gruppe arbejde: DTU cloud
3.1 Installer Tomcat
3.2 Kør en webapplikation på serveren
4 Arbejd videre på projektet
1 Virtuel maskine med Virtualbox
På tide med noget Linux.
1. Sørg for at have minimum 20 GB ledig på din disk!
2. Følg guiden fra:https://www.wikihow.com/Install-Ubuntu-on-VirtualBox 
   1. Lav en virtualbox med min 2 GB ram og 15 GB harddisk
   2. Få Ubuntu fra min USB nøgle eller Download Ubuntu ISO filen (Virtuel DVD) fra: https://releases.ubuntu.com/focal/ 
NB: Vi bruger ubuntu 20.04 grundet en bug i ubuntu 22.04, der gør det temmeligt besværligt at installere på en virtualbox
   3. Download og installér Virtualbox fra https://www.virtualbox.org/wiki/Downloads
      1. Vælg Windows eller OSX(Mac) udgave
  
      2. Bare installer med standard instillingerne…
   4. Q&A: 
Husk at vælge dansk tastatur til Ubuntu…
VDI er fint som harddisk type. 
Dynamisk størrelse er fint. 
Vælg 15 GB. 
Når du skal vælge disk image ser menuen lidt anderledes ud - vælg Tilføj 
  
Installationsbilledet er også lidt anderledes:
  
Der kan godt komme et par fejlmeddelelser undervejs - det betyder formentlig ikke noget:
  
Du kan tage en minimal installation - vi skal ikke bruge alt
Erase Disk sletter ikke alt på din computer! - Kun den virtuelle disk
Skip bare Connect online accounts, Livepatch og alt det andet pjat…
Det tager temmelig lang tid - tag en pause, mens det installerer
  


      3. Kig lidt rundt i Ubuntus grafiske grænseflade




2 Installer en webserver på din virtuelle maskine
2.1 Installer Tomcat
Så er det tid til en web server!


         1. Åbn en terminal - tryk i nederste venstre hjørne og søg efter terminal:

         2. Opdatér repositories med
sudo apt update
  


            3. Installér Java - 
sudo apt install openjdk-17-jdk
               1. Hvis du får fejlen:
  
Er Ubuntu stadig igang med at opdatere - vent op til 2 min.
                  4. Check at Java blev korrekt installeret:
java -version
  
                  5. Download nu tomcat med wget kommandoen: 
wget -c https://dlcdn.apache.org/tomcat/tomcat-10/v10.0.23/bin/apache-tomcat-10.0.23.tar.gz
                  6. Check evt at du har fået flien med:
ls -l
  

                     7. Opret en mappe til tomcat:
sudo mkdir /opt/tomcat
                     8. Udpak Tomcat til /opt/tomcat biblioteket med tar kommandoen:
sudo tar xf apache-tomcat-10.0.23.tar.gz -C /opt/tomcat
                     9. Gå til tomcat mappen med
cd /opt/tomcat/
                     10. check evt. at du har en apache-tomcat-mappe med ls:
  
                     11. Skift til tomcat-mappen:
cd apache-tomcat-10.0.23/
                     12. gå til bin mappen - du er nødt til at bruge superbrugeren med sudo:
sudo su
cd bin
                     13. start nu tomcat med 
./startup.sh
                     14. 
                     15. Test at Tomcat kører på http://localhost:8080 ved at åbne en browser I Ubuntu!
    
                     16. Hvis du stopper din server/slukker den virtuelle maskine stopper tomcat også - så du er nødt til at starte den igen


2.2 Kør en webapplikation på serveren
                        1. Skift til tomcats web-app bibliotek:
cd /opt/tomcat/apache-tomcat-10.0.23/webapps
                        2. lav en ny mappe med mkdir:
mkdir hello
                        3. skift til biblioteket med 
cd hello
  
                        4. lav en index.html fil med
nano index.html
Og kom en hej -besked i filen:
  
                        5. Afslut med ctrl+X og vælg "Save"
                        6. Se om det virkede i browseren:
  
                        7. Hvad sker der hvis du tilgår http://localhost:8080  på din værts-computer?
                           1. Hvorfor?
                           8. Prøv at redigere netværksindstillingerne i VirtualBox
  
                           9. Vælg avanceret -> Port viderestillling:  
                           10. Opret en regel hvor værtsport 8080 viderestiller til gæsteport 8080 
  
                           11. Prøv nu http://localhost:8080 på host - computeren
                           12. Du har nu viderestillet trafik til port 8080 på din egen computer til den virtuelle computer.


3 Gruppe-arbejde: DTU cloud 
Nu skal vi prøve de samme på DTU's servere. 
3.1 Forbind til DTU serveren


                              1. Følg instruktionerne fra formen i udfyldte i sidste uge.:


3. Generér et sæt ssh-nøgler (commandline på mac/linux med 'ssh-keygen' - på windows med eks. puttyGen). Hvis du er i tvivl - så google det.
                              * På mac: åbn en terminal og skriv ssh-keygen. Kald eks. dine nøgle dtukey:
  
                              * På pc - hvis du har installeret git har du også git-bash som er identisk med shell'en på linux/mac:
  
                                 1. Start git bash - og gør som for mac


6. Login via: https://cloud-t1.eitlab.diplom.dtu.dk/ 
7. Tryk på dit brugernavn - > vælg settings -> Update SSH Key
8. Indsæt din offentlige ssh-nøgle i "Public SSH Key" som ren tekst. Den starter typisk med 'ssh-rsa' el lign og herefter en masse tilsyneladende tilfældige tegn - muligvis efterfulgt af noget tekst der identificerer nøglen.
Du kan se din offentlige nøgle med:
 cat dtukey.pub
9. Gem ændringerne ved at trykke på 'Update SSH Key'.
10. Opret en VM ved at gå til enten Dashboard eller VM og trykke på det grønne '+'. 
11. Vælg Standard student-templaten. Du skal ændre på Disk og sætte den til 10GB. Hvis du løber tør for plads  kan det også øges senere ved at stoppe VM'en, resize og starte den igen (disken bliver ikke slettet). Tryk på Create. Det tager typisk op til et minut at starte VM'en.
12. Nu kan du forbinde til din VM med dit yndlings ssh program og din private nøgle. Bemærk! Vi anvender port 22022 i stedet for standarden (port 22). Port 22022 er den eneste port der er åben i firewall'en som standard.
13. Husk at vi bruger nøglepar og ikke password, så du skal angive din private key, når du logger på (i Putty sætter man nøglen under Connection->SHH->Auth-> Private keyfile for authentication. 
                                 2. For at forbinde fra mac eller linux kan man bruge kommandoen:
ssh -i dtukey -p 22022  {ditbrugernavn}@{ipadresse til din server}
Du bliver formentlig spurgt om du vil stole på den offentlige nøgle - svar yes/ja
  
 … Dtu  anvender en noget bedaget ubuntu 16.04 - vi skal op på en version 20.04

3.2 Opdater Ubuntu og Installer Tomcat
                                    1. Kør 
do-release-upgrade
to gange! - Første gang opdateres til 18.04 - anden gang til 20.04- Det tager desværre nemt 15 min at opgradere….
                                       1. NB: Undervejs bliver du spurgt om du vil beholde den eksisterende konfiguration - Det er vigtigt at du siger ja - ellers kan du ikke få forbindelse til serveren bagefter…
                                       2. Installér tomcat på samme måde som på den virtuelle server: Gentag 2.1 på dtu-serveren
3.3 Kør en webapplikation på serveren
Gentag 2.2 på serveren
3.4 Åbn firewallen
DTu's servere er pr. default lukket for trafik på alle porte - undtagen port 22022
                                       1. Åben for  port 8080:
sudo ufw allow 8080 
                                       2. Prøv nu at se om der er noget på:
http://{jeres.ip.adresse}:8080 
        
4 Arbejd videre på projektet
Hvis der er tid i overskud!
