# Versionskontrol

Source: Google Slides,
https://docs.google.com/presentation/d/1Ju60Bq7c_muAvg2EH_jhnDEtCh1yS5oIg4cfVgHmJxc
(exported as plain text; slide-break formatting from the original is lost, but
all text content is preserved).

---

Versionskontrol
Git og Egit for dummies
1 / 23

Linus Thorvalds
"I think the OpenBSD crowd is a bunch of masturbating monkeys"
"Software is like sex - it's better when it's free"
Linux
Git
Versionskontrol
Git og Egit for dummies
2
Farverig mand der er far til Linux
Uvenner med manden bag versionsstyringssystem - måtte lave sit eget.
Git

3

Overblik
Hvad er versionskontrol?
Hvilke typer findes der?
Hvilke programmer findes der?
Hvad kan de?
Hvordan bruger man dem?
Git-selvmord!
Typiske workflows
Hvordan redder man det?
4

Hvad er versionskontrol?
Styring og sporing af ændringer i dokumenter
Versionsnummerering
Branching og merging
Samarbejde
5

Repositories og Workspaces
Workspace
Din (lokale) arbejdskopi af koden
Repository
En samling af data, der beskriver ændringer i koden over tid.
6
Repository beskriver HVORDAN man er nået til den nuværende tilstand - også veje som man har kasseret.

Versionsnummerering
Pre-Alfa (Nightlies) Alfa og Beta
In house testing og Lukket test
Ofte nummeret med 0.*****
Releases
Release Candidate, Release to Manufacturing

7

Versionsnummerering
Android 4.1.2 Jelly bean (Api Level 17)
1. ciffer = Større ny version med ny funktionalitet
2. ciffer = Mindre ny version med begrænset ny funktionalitet
3. ciffer = Revisioner (fejlretning)
Branch nummerering

8

Pessimistisk vs optimistisk versionskontrol
Pessimistisk (lock)
Stilstand
Optimistisk (merge)
Konflikter

9

Typer af versionskontrol
Lokal (alle)
Central (svn, TFS)
Distribueret (git, mercurial)
10

Lokal versionering
Commit
Dit arbejde gemmes inkrementelt
Branch
Du kan arbejde videre med flere gode idéer
Merge
Du kan samle dine idéer
11

Lokal versionering demo med IntelliJ
Et hurtigt kig på hvordan man kan gøre
12

Lokal versionering
Compare (Diff)
Sammenlign filer med tidligere commits
Revert
Gå tilbage til en tidligere version
Reset (Hard)
Smid alting væk siden sidste commit (brug den ikke på remote!)
13

Øvelse 1 - Lokalt repo
https://goo.gl/syBMAA
Projekt
Lokalt repo
Commit
Revert
Evt. branch
Evt. merge
14

Central versionering (svn)
checkout - få en frisk kopi af repository
update - få de nyeste ændringer
add - tilføj din egen fil til repositoriet
commit - send dine ændringer til repositoriet
delete - slet fra repositoriet
15

Distribueret versionsstyring
clone - kopiér et repository
fetch - hent ændringer fra remote
merge/rebase - sammensæt branches
checkout - skift branch (forskelligt fra svn)
add - tilføj til versionskontrol
commit - tilføj ændring til repo
push - send ændringer til remote
16

Eksempel
Workflow 1: Først github - så projekt
Forhåbentlig live eksempel
Workflow 2: Først projekt - så github
Forhåbentlig også live...

17

Øvelse 2- Første Repo på github 
Lav et projekt
Lav en github konto: http://github.com 
Opret et repository på github 
Forbind dit projekt med github
Skriv noget kode!
Commit og push
Få naboen til at hente projektet fra github.
Skriv dit git navn i google doc:
https://goo.gl/i10Dw1
Pause

18

Branching - Demo
Skriv noget ny kode
Commit på en ny branch
Merge ind i master

19

Kollektivt git-selvmord!
Eksperiment
Alle committer forskellige filer.
Alle arbejder på den samme fil.
MERGE-conflict!
20

Blandede ulykker - og hvordan man redder dem
Merge conflict
Nogen har rodet med de filer du arbejdede med!
Brug eclipse's indbyggede merge tool - eller rediger i hånden.
Herefter add'es filen til index igen.
21

Blandede ulykker 2 - og hvordan man redder dem
Dirty worktree
Du har arbejdet på en fil - uden at have den under versionskontrol
En anden har arbejdet på filen under vcs
Enten - slet din lokale fil (backup din kode først)
Eller - Replace with Head revision
Pull og sikr dig at dit arbejde er under versionskontrol.
22

Blandede ulykker 3 - og hvordan man redder dem
Cannot commit/pull into a branch with state …...
Mange forskellige varianter (Merging_resolved f.eks.)
Backup hvad du er bange for at miste
Reset - HARD
23

Øvelse 3 - Samarbejde - Geometriberegneren
Samarbejde
Fork mit gitrepo på github:
https://github.com/cbudtz/shapeCalculator.git
Del repoet
Kod hver jeres klasse og merge projektet!
24

https://repos.gbar.dtu.dk/
Mulighed for private repos
25
