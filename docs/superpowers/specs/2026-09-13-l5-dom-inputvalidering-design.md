# L5 DOM-inputvalidering — design

## Formål

Tilføj et ultrakort, interaktivt eksempel til Lektion 5, som underviseren kan
åbne fra slides og bruge til at vise DOM-manipulation.

## Brugerflade

Eksemplet består af:

- et nummerfelt med labelen **Øvre**
- et nummerfelt med labelen **Nedre**
- knappen **Vurder måling**
- en kort resultattekst

Kun feltet **Øvre** valideres. Feltet **Nedre** er med i formularen, men
JavaScript læser eller ændrer det ikke.

## Adfærd

Når brugeren klikker på knappen:

- tomt felt giver fejltekst og fejlklasse
- en værdi under 90 giver teksten `Lav` og en blå klasse
- en værdi fra 90 til og med 139 giver teksten `OK` og en grøn klasse
- en værdi på 140 eller derover giver teksten `Høj` og en rød klasse

JavaScript fjerner først tidligere resultatklasser og tilføjer derefter præcis
én ny klasse på feltet **Øvre**.

## Filer og integration

- `lektion5/dom-blodtryk.html` — formular og resultattekst
- `lektion5/dom-blodtryk.css` — enkel styling og fire resultatklasser
- `lektion5/dom-blodtryk.js` — klik-event og validering
- `lektion5/forelaesning.md` — én kort live-demo-slide med link til HTML-filen

Filerne holdes separate, så eksemplet understøtter læringsmålet om at koble en
JavaScript-fil til HTML.

## Begreber som demonstreres

- `document.getElementById`
- `addEventListener`
- `.value`
- `Number(...)`
- `if / else if / else`
- `innerText`
- `classList.remove` og `classList.add`

## Afgrænsning

Ingen `fetch`, arrays, objekter, formular-submit, lagring eller validering af
feltet **Nedre**.

## Verifikation

Åbn HTML-filen i en browser og kontroller tomt input samt værdierne 89, 90,
139 og 140. Kontroller også, at kun én resultatklasse er aktiv ad gangen.
