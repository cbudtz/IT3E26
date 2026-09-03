# Forelæsning - Lektion03 HTML 2
__Kommenteret af CHBU__ - Indføjet #NYT hvor der ændringer - Dette til basis for nyt kursus
Source: Google Slides,
https://docs.google.com/presentation/d/1iUc9YSxTgLuTqSxLaZoPEnKnPANIOyp4KziKM-BwQ8Q
(exported as plain text; slide-break formatting from the original is lost, but
all text content is preserved).

---

Lektion 03
HTML 2 og CSS
#NYT: HTML II (`<form>`) + CSS. Ikke semantisk HTML. freeCodeCamp-spor: HTML Fundamentals, spring resten af HTML-kapitlet over, Cafe Menu som *forberedelse* (til 28, stretch 55). Ikke det gamle Basic CSS/Applied Visual Design.

Læringsmål
udvikle konfigurerbare, lagdelte applikationer der anvender filer og kommunikerer over et netværk.
#NYT: Det er 62581-målet. Dagens 62580-mål: fagtermer; brugergrænseflader; accessibility (UCD-målet, grundlæggende); HTML/CSS som værktøj til D1-mockup. Lagdelte applikationer hører til L11.

Dagens program
Skal vi tage en hurtig quiz om netværk? www.socrative.com
#NYT: Ikke netværk og ikke Socrative. Brug `lektion3/quiz-lektion3.json` (CSS-selectors, box model, position, enheder).
Gruppedannelse
Nogle mangler - Kommer de overhovedet?
Endelige grupper efter pausen
#NYT: UD — gruppedannelse og projektvalg er L2. Git-samarbejde (branches/PR) kun hvis L1-surveyen viste svagt Git; ellers drop det, CSS skal have pladsen.
HTML
Definerer sidens indhold og (træ-)struktur.
CSS (Cascading stylesheet)
Definerer indholdets udseende (styling) og position
#NYT: Bliv her et øjeblik (samme pointe som L1). HTML/CSS er deklarative — det har de mødt som SQL. VS Code + DevTools, ikke IntelliJ.

Eksempel - Uden og med CSS
Hvilke ting har ændret sig?
Font, Afrundede hjørner, Bredde, Centrering, Kant, Skygge, farver, placering
#NYT: God åbner. Brug deres login-side fra L1 (ikke killinger). Vis samme HTML med/uden stylesheet.

Deklarative vs. Imperative- & OO-sprog


Deklarative
Beskriver udseende
Eks. HTML, CSS, SQL, XML
(Klassediagram)
Imperative
Beskriver opførsel
Eks. Pascal, C, JavaScript, Java ....
(Sekvensdiagrammer)
Nogle er objektorienterede
kobler data og opførsel sammen
Java, C++, C#, Javascript (både -og)
#NYT: Behold kontrasten HTML/CSS vs JS. Java udgår som kursussprog (D1) — de kender Python + C# fra 62420/62450. Klassediagram/sekvensdiagram: UML reteaches ikke på web-sporet; drop diagram-henvisningerne.

#NYT: Semantisk HTML UD — ikke nødvendigt som L3-emne. Cat Photo App har allerede `main`/`section`/`footer`. FCC-modulet Semantic HTML springes over. HTML Fundamentals nævner `div` vs `section` og `id`/`class` — det er CSS-broen, ikke et semantik-spor. Accessibility-modulet på FCC springes også over; `label`+`alt` er nok.


HTML fortsat
Sidst:
<h1>, <p>,<div>,<span>, <!-- --> , <img src="", alt="">, <a href="" >,
Nyt:
Lister: <ul>, <ol type="{1,a,A,I,i}">, <li>
Input: <input type="{text, number, password,...}" name="" required placeholder="">
Forms: <form action="{url}" method="{get,post}">
Button: <button type="{submit, reset, button}"> (<input type="submit"
#NYT: Lister er L1 (Cat Photo App) — flyt til "Sidst". Nyt i L3: `<form>`, `<input>`, `<label>`, `<button>` — i *jeres* gennemgang, ikke FCC Forms and Tables. `action`/`method` kun som "her vil browseren sende hen" — HTTP hører til L9/L11; D1 har ingen backend.

Inputs
<input type="{text, number, password,...}" name="" required placeholder="">
Som regel en del af en <form>
name - angiver parameterens navn!
type - inputtets type
felt (text, password, number, email)
radio (kun én)
checkbox (flere mulige)
file
date, date-time, color, url, range, search (Mange nye og spændende
Constraints
required
hidden
read-only
size, maxlength, min, max
multiple, pattern
https://www.w3schools.com/html/html_form_attributes.asp
#NYT: Behold text/password/email + required — det er login/D1. Radio/checkbox/file/date: vis, men dvæl ikke. `label for="..."` som klikbart felt. w3schools ud. `name` er først vigtigt når noget POST'er; til mockup er `id`+`label` nok.

Samlet struktur
<!DOCTYPE html><html lang="en">	<head>  		<meta charset="UTF-8">	  	<title>IT3 Lektion 1 - a</title>	</head>	<body>		<div>Killinger!</div>		<a href="https://hiddendoor.org/kitten-coloring-page-en-van-kitties-pages/">		 	<img src="https://www.publicdomainpictures.net/pictures/90000/velka/kitties.jpg" height="100px">		</a>		<form action="somepage.html">  			<input type="text" id="knap" name="username" required>			<button type="submit">Send</button>			<button type="reset">reset</button>		</form>	</body></html>
#NYT: Udskift killinger med deres projekts formular. `lang="da"`. `label` på input. `action="#"` eller udelad — D1 submitter ikke.

CSS - Cascading stylesheets
Definerer HTML-elementernes udseende og placering
Kan placeres på 3 niveauer
 Element specifikt
style attributten : <h1 style="color:blue;margin-left:30px;">
Indlejret i html-dokumentet
<head>	<style>body {background-color: blue;}</style></head>
I separat .css - fil (oftest den bedste løsning)
<link rel="stylesheet" type="text/css" href="mystyle.css">
#NYT: Behold de tre niveauer. Peg på separat fil som standard (D1-mockup). Det har de allerede fra Cafe Menu-forberedelsen (trin 15–17). Opsamling, ikke førstegangsgennemgang.


Syntaks
styles refererer til elementer
Indbyggede klasser "":- eks. table, body
id'er "#" : #submitbutton
Egne klasser "." : .container
Pseudo-klassser ":": button:hover
Pseudo-elementer "::" : p::first-line
Kan kombineres ( , > , +
p a {color: red;}
selector { attribut: værdi; }
#NYT: Element, class, id er dagens kerne (matcher quizzen). `:hover` som smagsprøve. Combinators og `::` kun hvis tid — FCC Pseudo-classes and Elements er et helt modul.

Lad os prøve det
I IntelliJ
Direkte i browseren
padding
margin
position:relative, absolute, fixed
border-radius
#NYT: IntelliJ → VS Code + DevTools (som L1). Live-ændring i Elements/Styles slår det fast bedre end et IDE-CSS-vindue.


Nogle interessante attributter
Placering
position
float / clear
padding
margin
Udseende
color: red, #b73e3e, rgba(183 62 62 / 20%)
font, font-size, font-family
<link href="https://fonts.googleapis.com/css?family=Lobster" rel="stylesheet" type="text/css">
height, width, max-width, max-height
border-radius
border-???
background-color
#NYT: Box model (margin/padding/border) + farve/font/radius er nok. Google Fonts: valgfrit. float: se nedenfor.

Position
position
fixed
relativt til viewport
relative
relativt til normalt flow
absolute
relativt til omgivende element
static (default)
ingen positionering
sticky
forlader ikke viewport (godt til topmenu) (skifter mellem relative og fixed)
(kræver top:0)
#NYT: Behold — quizzen spørger om `position: fixed`. FCC CSS → Positioning (workshop Cat Painting) hvis de skal øve. `sticky` som "fint at kende".

float /clear
float
styrer hvor elementet lægger sig i sit omgivende element
float: left;
clear
Må elementer lægge sig ved siden af?
clear: left;
#NYT: UD som layout-teknik. Float er legacy; moderne layout er Flexbox (FCC CSS → Flexbox). L3 har ikke tid til Flexbox som hovedspor — nævn det, øv det ikke. Side-om-side: `display: flex` i én sætning, eller vent.


Padding
Ekstra afstand INDEN i elementet

Margin
Ekstra afstand UDEN for elementet
kan være negativ!
auto: ens på alle sider
Centrerer!
margin-top, right, bottom, left
#NYT: Behold box model. Tegn kassen (content → padding → border → margin). Matcher quiz q1.


Interessante regler
Egen klasse over indbygget
.min-klasse vs body (min-klasse vinder)
ID over egen klasse
#specialknap vs .min-klasse (#specialknap vinder)
Specificity
p a {color:red;} vs a {color:blue} (p a vinder)
Præcedens:
class="class1 class2" - class2 vinder!
!important
When all other fails!
#NYT: Specificity er kerne (FCC Basic CSS: specificity/cascade/inheritance). `!important`: vis som nødbremse, ikke som metode. Quizzen har `#` vs `.`.

Enheder
Absolutte
px
Relative
em (fontstørrelse relateret)
rem (rodfont-størrelse ??!?!)
% (af omgivende element)
#NYT: `rem` er standard nu (ikke "??!?!"). `px` til borders. Nævn `vh`/`vw` — de er i quizzen. FCC CSS → Absolute and Relative Units. Drop `fr` (Grid, senere).

CSS gone wild
CSS media query
@media (max-width: 350px) { a {color:blue;} }
CSS transform
CSS animation @keyframes wave {      10% {        transform: rotate(110deg);      }https://www.freecodecamp.org/learn/responsive-web-design/basic-css/use-a-media-query-to-change-a-variable
#NYT: Det gamle FCC-link er legacy. Media queries = FCC Responsive Design — for meget til L3; én slide "sider skal kunne bruges på telefon" + henvis til forberedelse. Transform/animation: UD (FCC CSS Animations er sent i sporet; a11y: `prefers-reduced-motion` hører ikke hjemme her).

QUIZ
www.socrative.com
#NYT: Site-quizzen `quiz-lektion3.json`.

Pause

grupper
1
Subhaan
Luqman
Zain
Mariam Pardo
Mariam Abachri
2
Vibeke
Asbjørn
Alaa
Rahma
Mikael B
3
Maryam Haji
Mariam Abdul
Andreas
Amalie
4
Eva
Ulrikke
Juliane
Simone
5
Parker
Marcus
Jacob Egon
Niels-Christian
Aidan
Azad?
#NYT: UD — E22-holdet. Ingen gruppeliste, ingen VM-oprettelse (øvelsesarket). D1 er frontend-mockup uden server; hosting er L19 (D5).

#NYT Forberedelse (ca. 1 time, efter Cat Photo App). Spring Recipe Page, Semantic HTML, Forms and Tables og Accessibility over.
- HTML → Basic HTML → *HTML Fundamentals* (uden lecture om `<script>` — det er L5)
- CSS → Basic CSS → lecture What is CSS + workshop **Cafe Menu til trin 28**
- Hvis I har tid: Cafe Menu til trin 55 (padding / box model)
#NYT Øvelser i *timen*: ikke Cafe Menu (det er lavet hjemme). IntelliJ UD. Gennemgå `<form>` her. Style *deres* projekts formular i VS Code (D10: valgfri health-tech-cases, ikke fælles journalsystem) — samme freestyle-mønster som L1's login-side, nu med CSS. Padding på slides til dem der stoppede ved 28.
