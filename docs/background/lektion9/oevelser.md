# E22 62581 Øvelser - Lektion09

Source: Google Docs,
https://docs.google.com/document/d/1zz1v58sfBznygELU-FR5hy1QDf3-sel9mz13svcPoLw

---

Øvelser - Lektion 09
1 Tilstandsdiagrammer
1.1 Ræven, gåsen og kornet
Kig på den klassiske gåde: https://www.mathfair.com/the-fox-the-goose-and-the-grain.html 
  
Hvordan kan problemet modelleres med et tilstandsdiagram? Kan du løse gåden med diagrammet? Hvor mange løsninger er der?
1.2 UDP pakker
Hvilke tilstande gennemgår en UDP pakke på vej fra afsender til Modtager? Husk at tage højde for måder at pakken kan gå tabt/blive smidt væk. Tegn et diagram. 
1.3 EHR Systemer
Modeller oprettelsen af en patient-aftale med et tilstandsdiagram. Det skal afspejles at man skal være logget ind for at oprette aftalen. Er der flere tilstande i login-proceduren? 
Hvordan kan man løse at flere kan forsøge at booke den samme tid? Hvad gør man i biografer? Er det en fornuftig løsning her?
2 Lagdeling i applikationer
Hvilke lag kan I identificere i jeres applikation? I den nuværende udgave - Er det en tynd eller tyk klient? Hvilke lag regner i med at indføre?


3 Javascript Primer - 
Lidt om JS datastrukturer - Numbers, Strings, Arrays, Objects
Start et 'Empty Project' og opret en index.html med vedlagte kode:
<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <title>Script</title>
</head>
<script>
   function doCalc(){
       const a = document.getElementById("input1").value;
       const b = document.getElementById("input2").value;
       document.getElementById("result").innerText = a+b;
   }
</script>
<body>
<input type="number" id="input1">
<input type="number" id="input2">
<div>Resultat</div>
<div id="result"></div>
<button onclick="doCalc()">Beregn</button>
</body>
</html>
	

NB: Hints til sidst, hvis du løber sur i øvelserne
1. Hvad sker der når man klikker på Beregn Knappen? Hvad går galt? Hvad er løsningen?
   1. Kig evt. her: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/number 
2. Fix fejlen!
  
3. Ændr koden så de to tal i stedet bliver lagt i en liste der bliver udskrevet
  
4. Tilføj en global variabel der indeholder en liste. Fjern den ene input boks og ændr koden så knappen i stedet tilføjer nye elementer på listen.
  
5. Tilføj en knap der fjerner det første element på listen og opdaterer siden (i eksemplet er først tilføjet 1,2,3,4)
  
6. Ændr knappen, så den fjerner det sidste element
  

   7. Ændr knappen så den fjerner det midterste element (hvis der er et lige antal i listen - fjerner du begge kandidater)
  

   8. Ændr knapperne, så man kan tilføje tal og udskrive summen af elementerne i listen.
  

   9. Ændr koden, så der er to input felter og Knappen i stedet opretter et "patient" objekt med værdierne {name:<<input>>,cpr:<<input>>}
  

   10. Ændr koden så objektet havner på en liste
  
   11. (evt. - svær) Tilføj en knap og et input-felt, der gør det muligt at udsøge en patient efter cpr nummer fra listen.
  
   12. Hvis du har ekstra tid kan du evt. tilføje et adresse objekt til patient-objektet


________________


Hints: 
      1. Hvad sker der hvis man prøver at lægge strings sammen?
      2. Number(tal)
      3. list = [], push(tal)
      4. push()
      5. shift()
      6. pop()
      7. odd = list.length%2 , splice(position, antal)
      8. for loop eller (sværere) .reduce()
      9. obj = {} , JSON.stringify(obj)
      10. list.push(obj)
      11. for loop… 


Se i øvrigt løsninger:
https://github.com/cbudtz/IT3E22/blob/master/src/main/webapp/jstraining.html
