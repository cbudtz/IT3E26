# Øvelse 1

Source: Google Docs,
https://docs.google.com/document/d/1HB7uP6tVNarioVFK5ocE5_Eh7-_lQKnpXn_gd0ZeHIs

---

Øvelse 1 - Lokal versionering


Opdater Egit klienten
Sæt dit eclipse perspective op
Tid til første Repository




Opdater Egit klienten
Egit klienten, der følger med eclipse, har en del beklagelige bugs - blandt andet at man ikke kan se filer i history viewet. Det bliver lidt bedre, hvis man opdaterer til nyeste egit klient. 
1) I Eclipse finder du :->Help->Eclipse Marketplace...

2) Søg efter egit
 


________________


3) Tryk på Installed og opdater til nyeste version



Sæt dit eclipse perspective op
1) Tilføj git knapper. Højreklik på dit foretrukne perspectiev



________________


2) Vælg customize

3) Vælg action set availability

4) Kryds af i 'Git' og tryk OK.

5) Tilføj git vinduer. Window->Show View->Other

6) Marker både Git Repositories og History og tryk OK.




________________
Tid til første Repository
1) Lav et nyt java projekt

2) Højre klik på projektet



________________


3) Vælg Team-> Share Project

4) Vælg Create..



________________


5) Giv dit repo et godt navn - NB! Læg det ikke i git rod mappen!

6) Kigger du nu i dit Git Repositories vindue, vil du se dit nye Repo:



7) Nu er det tid til at tilføje en klasse til Repoet. Opret en klasse, marker den og tryk på det Grønne plus:Add to index

Nu er klassen under versionskontrol!
________________
8) Tid til at committe den til Repoet!

9) Skriv en meningsfyldt beskrivelse (der skal være en beskrivelse) og commit din klasse. NB! Commit and push bruges kun når dit lokale repository er forbundet til et remote repository


________________


Nu er dit projekt committet til dit lokale repo!
10) Rediger din fil et par gange og commit resultatet. Prøv derefter at højreklikke på klassen og vælge Show in->History

11) Med lidt held kan du nu se din historie i højre hjørne:

Dobbelt klikker du på et af commits'ne kan du se ændringerne siden sidste commit (Nogen gange virker det ikke (egit bug), så må man højreklikke og trykke compare).
Højreklikker du på et commits'ne får du en menu, der tillader at du manipulerer med commitsne. Eksperimentér med create branch, revert, cherry pick, merge og rebase.
Kan du ikke se branches - så tryk på branch ikonet i History vinduet:



Alt efter hvordan det går kan du få et træ der ser ud som det her:

og hvis du forsøger at merge får du måske en masse røde firkanter!:

Det er en merge Conflict - mere om den senere!
