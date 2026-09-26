# E22 62581 Kopi af Lektion21

Source: Google Docs,
https://docs.google.com/document/d/1iWXsglevhuG9tOjCBOxKIdce4CkZajahFAW6OTjP9SE

---

Øvelser - Lektion 21
1 - Fælles protokol for udveksling af patientdata
1.1 Internt i gruppen 30 min 10.15-10.45
Gennemgå hvilke data I vil kunne gemme og udveklse med andre grupper. Noter en data-struktur for den/de objekter i forventer at kunne udveksle. Skriv gerne et xsd skema.
1.2 Fælles møde 30 min - 10.45-11.15
Hver gruppe sender en repræsentant til protokolmødet. I skal beslutte hvilke data der udveksles mellem de forskellige grupper og hvordan strukturen skal være. Definér et xsd-skema og opret et dokument med URL'er til hver gruppes services. Det er temmeligt besværligt at skrive et xsd-skema - Så I kan definere Java-klasserne og evt. generere skemaet: https://technology.amis.nl/software-development/java/using-the-javaxxmlbind-annotations-to-convert-java-objects-to-xml-and-xsd/ 


De dependencies I skal bruge er: 
    <dependency>
            <groupId>jakarta.xml.bind</groupId>
            <artifactId>jakarta.xml.bind-api</artifactId>
            <version>3.0.1</version>
        </dependency>
        <dependency>
            <groupId>com.sun.xml.bind</groupId>
            <artifactId>jaxb-impl</artifactId>
            <version>3.0.1</version>
        </dependency>
        <dependency>
            <groupId>xerces</groupId>
            <artifactId>xercesImpl</artifactId>
            <version>2.12.1</version>
        </dependency>


Her er en reference (giraf) implementation: https://github.com/cbudtz/XMLXperiments 


Skemaet kan bruges til at generere klassen/klasserne, men det er også fint, hvis i bare sender klasserne rundt. Der findes et par online generatorer der kan konvertere et xsd til Java klasser - eks: 
http://pojo.sodhanalibrary.com/pojoFromXSD.html og 


Referat fra Protokolmøde: 
https://docs.google.com/document/d/16KcykYxhUOI0SSSPwi8nnPyoO36z2J_TWVWop8TGHvw/edit?usp=sharing 


2 Hack time!
Afprøv jeres SQL-injection skillz på tryHackme: 
1. Opret først en profil:
https://tryhackme.com/
2. Afprøv så SQL injection attacks på 
https://tryhackme.com/room/sqlilab 
3. Du skal først logge ind
4. Så Joine 
5. og så starte en Virtuel Maskine du kan hacke:
  
6.  Når din virtuelle maskine kører ser det sådan her ud:
  
7. Din VM er til højre: En ubuntu maskine på et lukket netværk. Tutorial'en er til venstre. Du kan åbne en firefox browser i maskinen og evt. køre den i fuld skærm
8. Åbn en browser i VM'en og tilgå IP'en for den maskine du skal hacke:
  
9. Nu er det bare om at afprøve de forskellige SQL-injection attacks


2 Hack jeres eget system!
Har jeres system en sårbarhed for SQL injection attack? 
Hvorfor, hvorfor ikke? Kan du hacke den eller demonstrere at det ikke virker?
3 Arbejd på jeres Minimale fungerende system - med sikkerhed
Husk at der er en endelig aflevering om lidt. Når den er overstået er det på tide at implementere sikkerhed til sidste aflevering. 




Som en særlig service kan I få en MySQL database her - Så slipper i for at sætte jeres egen database op på jeres server: 
https://diplomportal.caprover.diplomportal.dk 
   1. Login som du plejer
   2. Vælg profil og opret din personlige database.
