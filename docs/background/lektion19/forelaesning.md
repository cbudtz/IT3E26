# E22 62581 Lektion 19 - IT og Kommunikation

Source: Google Slides,
https://docs.google.com/presentation/d/1Md_ojibppFf6H10h2p4EUVpjgMiM3VuQTN5OCa3Rqzo
(exported as plain text; slide-break formatting from the original is lost, but
all text content is preserved).

---

IT og Kommunikation
Christian Budtz

Dagens program

Exception handling og HTTP Status Codes
Tokenbaseret sikkerhed - JSON Web Tokens
Hashing og Salting
Access Control
OAuth2 - Authentication flow
Hashing af Passwords
Midtvejsevaluering

Rest og Http-status codes
Hvad er http status codes?

Rest og Http-status codes
Del af HTTP - protokollen
Med i originale beskrivelse af REST - protokollen
rfc7231 
Eks: 200 OK , 204 No Content, 404 Not found
Bruges til at signalere til klienten ~ Exceptions
HTTP/1.1 404 Not FoundDate: Sun, 18 Oct 2012 10:36:20 GMTServer: Apache/2.2.14 (Win32)Content-Length: 230Connection: ClosedContent-Type: text/html; charset=iso-8859-1


Exception handling og HTTP Error codes
Alle Exceptions skal håndteres - eller propageres
Ingen catch uden throw eller fornuftig håndtering
Bør logges
DatabaseExceptions →  BusinessExceptions → HTTP error codes


Exception handling og HTTP Error codes
Jersey
WebApplicationException
Mappes til error codes
@Path("items/{itemid}/")public Item getItem(@PathParam("itemid") String itemid) {  Item i = getItems().get(itemid);  if (i == null) {    throw new WebapplicationException("Ingen items!", 404);  }  return i;}


Fornuftige Statuskoder
Success
200: OK - "Alt gik godt"
201: Created - "Ressourcen blev oprettet" 
Redirection
304: Not modified - "ingenting er ændret"
Client side - fejl
400: Bad request - "Du kludrede i requestet"
401: Unauthorized - "Du er ikke logget ind (eller din adgang til systemet er lukket)"
403: Forbidden - "Du har ikke rettigheder til denne handling"
404: Not found - "Ressourcen findes ikke"
409: Conflict - "Flere forskellige forsøgte at opdatere den samme ressource"
410: Gone - "Ressourcen findes ikke længere"
Server side fejl:
500: Internal Server error - "Et eller andet gik galt på serveren"
(501: Not implemented)

Tokenbaseret sikkerhed


Brugeren gives et token, som verificerer ham.
Giver mulighed for stateless server - 
Serveren ved ikke, at brugeren har 'logget ind'.
Serveren validerer kun på et token's ægthed.



Tokenbaseret sikkerhed med JWT



JSON Web Token (jwt)
3 delt signeret token
Header - hashing algoritme
Payload - med claims
Signature - hashet med secret på serveren
Base64 kodet
Tegnsæt-sikker kodning - IKKE kryptering
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ

{"alg":"HS256","typ":"JWT"}.{"sub":"1234567890","name":"John Doe","admin":true}.L@36pDLpGN4X{

Jersey - svar med JWT (JSON Web Token)
	private static Key key = MacProvider.generateKey(SignatureAlgorithm.HS512);

	@POST
	public String getLogin(UserPass userPass){
		if (validate(userPass)) {
			return Jwts.builder()
					.setIssuer("DiplomIt")
					.claim("user", new User(userPass))
.setExpiration(expiry.getTime())
					.signWith(SignatureAlgorithm.HS512, key)
					.compact();
		} else {
			throw new WebApplicationException(Status.FORBIDDEN);
		}
	}



Jersey - Validér JWT (JSON Web Token)
public static Jws<Claims> validateToken(String tokenString) {
Claims claims = null;
try{
 		claims =
Jwts.parser().setSigningKey(key)
.parseClaimsJws(tokenString).getBody();
} catch (ExpiredJwtException | UnsupportedJwtException |
 MalformedJwtException | SignatureException
				| IllegalArgumentException e) {
			// Do something with those exceptions!		
		}
		return claims;			
	}

SignatureException: Nogen har pillet ved tokenen! Man kan ikke stole på indholdet.
ExpiredJwtException - Token er udløbet. 

Fetch- Send token med i headeren
	var authHeader = "Bearer " + localStorage.getItem("jwt");
	 fetch(baseUrl + "rest/giraffes", {
            headers: {
                Authorization: authHeader
            }
        }).then(...)

Authorization: Bearer er standard for token baseret login.

Jersey Filter
Fanger requests på vejen til endpointet og præ-behandler dem...
@Provider @Priority(1000) //For at CORS filter bliver kørt førstpublic class AuthFilter implements ContainerRequestFilter {    @Override    public void filter(ContainerRequestContext context) throws IOException {        System.out.println(context.getUriInfo().getPath());        System.out.println(context.getHeaderString("Authorization"));	context..setProperty("user",new User(dataFromToken)); //Get from header	if (c.getHeaderString("Authorization==null){		context.abortWith(Response.status(UNAUTHORIZED).build());        }}


Hashing
Hashing - 'en-vejs kryptering' 
Det originale kodeord kan ikke genskabes fra Hash'et
Kodeordet checkes ved at hashe kandidat kodeordet og matche mod det gemte hash
Hashfunktionen skal helst tage nogle ms at gennemføre 
ellers er det for hurtigt at bryde kodeord med brute-force - 
Man udfører typisk den samme hashfunktion mange gange 
Potentielt modtagelig for Rainbow-table-attack
Rainbow-table - Tabel over Alle kombinationer af kodeord og hashes


Hashing og Salting
Hashing: Potentielt modtagelig for Rainbow-table-attack
Rainbow-table - Tabel over alle kombinationer af kodeord og hashes
Beskyttes ved at tilføje et 'salt'
Tilfældigt genereret string der tillægges.
Hvert kodeord har sit eget salt
BCrypt algoritmen er (2022) stadig en god standard.
Implementeret med JBcrypt
Argon2 er på vej ind

Hashing og Salting
JBCrypt.
BCrypt.hashpw(password, BCrypt.gensalt()); - Returnerer et saltet hash (med kendt salt)
BCrypt.checkpw(candidate, hashed);- Returnerer true, hvis kodeordet matcher
HUSK: Kodeord må aldrig opbevares i clear-text!!!!- Skal saltes og hashed med det samme og originalen glemmes!- Saltet Hash gemmes i db.

Access Control
Identification
Hvem du påstår du er 
Authentication
Validering af identitet
Something you know - Password, PIN
Something you have - Nøgle, Token
Something you are - Iris, Fingeraftryk
2FA - kombination af flere.
Authorization
Hvad du får adgang til!
Audit
Hvem gjorde hvad?

CAS - Central Authentication Service (Campusnet)
Browser tilgår jeres server
Server sender redirect med callback URL til Campusnet CAS
Brugeren logger ind på Campusnet 
Campusnet CAS bruger callback URL til at "re-redirecte" med en ticket/code
Server validerer ticket mod Campusnet CAS
Campusnet returnerer enten "yes <cnID>" eller "no"
Server redirecter fra callback url til front med token i queryparams
fronten trækker token ud af URL og gemmer den til følgende requests

Oauth2
Baseret på HTTP redirects
Redirect fra jeres server til 3. parts login/authentication
(Re)redirect tilbage til jeres server - med ticket/code
Brugeren godkender udstedelse af en access token
I får aldrig brugerens kodeord
Stateless - Serveren kender ikke login-status
Cookies:
Stateful - serveren holder styr på cookien's betydning
Besværligt med multidomain - da cookie er bundet til domain

Oauth2
4 Flows
Authorization Code
3rd-party apps
(Trusted apps) 
Den vi implementerer!
Resource Owner Password Credentials
Kun trusted apps (first party apps)
Implicit
På eget domæne
Client credentials
Maskine til maskine
Alle flows der involverer 3rd party, skal bruge Authorization Code

Authorization Code / Ticket
Man skal stole på Agenten/ Browseren
Kan inkludere refresh token

Oauth - Sekvensdiagram (FB eksempel)
Brugeren redirect'es til FB
Brugeren giver tilladelse til at FB giver data videre.
FB redirecter browseren tilbage til jer - incl en ticket/code
Jeres server veksler ticket/code for en access token.
Jeres server bruger token til at tilgå data fra FB
Det er muligt at definere scopeHvilke data jeres applikation må tilgå- Authorization!

Access Control: Authorization 
Typiske rettigheder (filsystem)
Read (R), Write (CUD), Execute
Flere forskellige varianter
DAC - Discretionary
MAC - Mandatory
RBAC - Role Based
ABAC - Attribute Based
(BGAC - Break Glass) - Relevant i sundhedssektoren
(RSBAC - Rule-Set Based)
(HBAC - Host Based)

DAC, RBAC, ABAC
DAC
Ejerskab
Ejeren tildeler andre brugere rettigheder
RBAC
Roller har rettigheder
Brugere får roller/tilmeldes grupper
Kan implementere arv mellem roller (kompliceret)
ABAC
Brugere har attributter
Kombination af attributter giver rettigheder.

Linux RBAC
Rettigheder på mappe/fil niveau
rettigheder (owner, group, all) .
Group fil
navn, password, ID, user list

Implementerings løsninger
Access Control Lists
Lister over rettigheder
Ressource -> Rolle -> Rettighed
giraffes - > girafpasser -> get, post
giraffes/341234 ->chbu -> get, put, delete (specifik ressource, specifik rolle)
Som Maps
{ giraffes: {girafpasser:{get,post}}, giraffes/341234:{chbu:{get,put,delete}}}
Som matrix
Implementeres med multikey-map eller map med konkatenering af rolle og ressource
girafpasser
chbu
giraffes
get, post
giraffes/341234
get, put, delete

REST, JWT og Access Control Lists
Fint match
Bygger på resources og actions

Jwt og Authorization
JWT	 Kan indeholde information om roller/rettigheder
{user: "brian", permissions: [{giraffes:{get,put,post}}
Bliver hurtigt en alt for stor token
(kræver ->rolle->ressource->rettighed)
{user:"brian", roles: ["admin","giraffehandler"]}

Quiz
www.socrative.com
