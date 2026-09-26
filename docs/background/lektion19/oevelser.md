# E22 62581 Øvelser Lektion19

Source: Google Docs,
https://docs.google.com/document/d/1pVhL8G1tWGA7sDQZ2ylHXzvfIRLZPrREQgtefWWqSQY

---

Øvelser - Lektion 19
1 - Token-baseret login
Nu skal vi implementere Sikkerhed i vores web-applikation! Vi får brug for at kunne kontrollere et brugernavn og et kodeord, udstede en token og validere den igen.
1.1 - Generere en token
Vi skal kunne generere en token og validere den efterfølgende - Så vi laver en Utility-klasse til tokens.


1. Importér JJWT til at lave JSON-web tokens:
 <dependency>
      <groupId>io.jsonwebtoken</groupId>
      <artifactId>jjwt</artifactId>
      <version>0.7.0</version>
</dependency>
	

2. Skriv en JWT-Controller-klasse, der kan udstede JWT-tokens. Den bruger en hemmelig nøgle til at signere tokenen med - Vi skriver en løsning, der både kan have en fast nøgle og generere en selv. Klassen kan se ca sådan ud:
public class JWTHandler{

private static Key key;
private static final int TOKEN_EXPIRY = 2880; //2 days

        public static String generateJwtToken(User user){
                Calendar expiry = Calendar.getInstance();
                expiry.add(Calendar.MINUTE, TOKEN_EXPIRY);
                return Jwts.builder()
                                .setIssuer("GiraffeDeluxe")
                                .claim("user", user)
                                .signWith(SignatureAlgorithm.HS512, getKey())
                                .setExpiration(expiry.getTime())
                                .compact();
        }

        private static Key getKey(){
//Generate a secret key, if there is none specified in the environment - only use fixed key in development for debugging
                if (key==null) {
                        if (System.getenv("JWT_SECRET_KEY")!= null && System.getenv("JWT_SECRET_KEY") != "") {
                                String string = System.getenv("JWT_SECRET_KEY");
                                key = new SecretKeySpec(string.getBytes(), 0, string.length(), "HS512");
                        } else {
                                key = MacProvider.generateKey(SignatureAlgorithm.HS512);
                        }
                }
                return key;
        }
// Validering af token
public static User validate(String authentication) {
        String[] tokenArray = authentication.split(" ");
        String token = tokenArray[tokenArray.length - 1];
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(getKey())
                    .parseClaimsJws(token)
                    .getBody();
            ObjectMapper mapper = new ObjectMapper();
            User user = mapper.convertValue(claims.get("user"), User.class);
            System.out.println(user);
            return user;
        } catch (JwtException e){
            System.out.println(e.getClass() +":  "+ e.getMessage() );
            throw new NotAuthorizedException(e.getMessage());
        }
    }


}
	2.2 Token service
Nu skriver vi et endpoint til at uddele tokens
1. Skriv en Rest service, der kan uddele en token i bytte for et kodeord:

@Path("login")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class LoginService {

   @POST
   public String postLoginData(LoginData login) 
{
//TODO: Erstat med rigtig login-kode
       if (login!=null && "brian".equals(login.getUsername()) && "kodeord".equals(login.getPassword())){
           return JWTHandler.generateJwtToken(new User(login.getUsername(), "")); //Replace with your own User class
       }
       throw new WebApplicationException("forkert brugernavn/kodeord",401);
   }
}
	   2. NB: Du får brug for en data-klasse til login data:
public class LoginData {
   private String username;
   private String password;
}
        //Og en user-klasse


   3. Afprøv din service med www.reqbin.com - eller evt. Postman (lidt mere kompleks og  flere features):  
  
   4. Prøv at dekode din token på www.jwt.io 
  
   5. Skriv også en test-service, der kan validere din token:


    @POST
    @Path("tokentest")
   public User postToken(String token){
       User validate = JWTHandler.validate(token);
       return validate;
   }


      6. Test om din token kan valideres:


	

	

  

      7. Prøv også at kalde servicen, hvor du har ændret et bogstav i tokenen og kontrollér at valideringen fejler
      8. Skriv nu en login-funktion og en form i frontenden der kan
      1. Sende logindata til dit endpoint,
      2. Modtage token'en og gemme den i localstorage (browserens hukommelse)
det kan gøres med:
localStorage.setItem('token', token)
  
Hint: Koden kunne komme til at se ca. sådan her ud:

 
doLogin() {
       this.state=Loginstates.LOGGING_IN;
       fetch(baseUrl + "rest/login",{
           method:"POST",
           body:JSON.stringify(this.logindata),
           headers: {
               'Content-Type': 'application/json'
           }
       }).then(
           (response)=> {
               response.text().then(
               (token)=> {
                   console.log("Got Token: " + token)
                   localStorage.setItem("girafToken",token);
                  }

           )}
       ).catch(()=>alert("Uha - login fejlede" )
   }
	



         3. Skriv dit GET-kald fra tidligere lektioner om så det bruger token'en fra store'n til noget lig:
fetchGiraffes (){
       const token = tokenStore.token;
       this.loading = states.LOADING;
       fetch(baseUrl + "rest/giraffes", {
           headers: {
               Authorization: localStorage.getItem("token")
           }
       }).then(/*....*/)
	Fang requestet's header i backenden:
    @GET
    public List<Giraffe> getGiraffes(@HeaderParam("Authorization") String authHeader){
        System.out.println(authHeader);
        User user = JWTHandler.validate(authHeader);
        System.out.println("User accessing giraffes: " + user);
        return giraffes;
    }
	         9. Se hvad der bliver udskrevet hvis du henter giraffer med og uden login. (Her har jeg et bruger-objekt med et username og en githubToken- Den behøver i nok ikke)  
         10. Bemærk at  Kaldet afbrydes under valideringen med en exception, så der returneres ingen giraffer, hvis valideringen fejler.
         11. Tillykke - du har bygget dit første token-login. Du kan bruge localStorage til at holde styr på token'en og til at vise enten en login side eller den rigtige side - så får brugeren oplevelsen af at være logget ind/ud


Bonus: Med localstorage kan du persistere token mellem sessions.

2.3 Token filter (optional)
Med et filter i Jersey er det muligt at filtrere http-requests før de overhovedet rammer et endpoint. I stedet for at skrive JWTHandler.validate(token) på alle services, kan du istedet fange requests'ne og validere dem alle. Husk at login-services IKKE skal valideres..
            1. Prøv at lave valideringen ud fra nedenstående (du kan afbryde requestet med containerRequestContext.abortWith();)

@Provider
public class AuthFilter implements ContainerRequestFilter {

   @Override
   public void filter(ContainerRequestContext containerRequestContext) throws IOException {
       System.out.println(containerRequestContext.getUriInfo().getPath());
//Undgå at afvise folk der prøver at logge ind.
       if (!"login".equals(containerRequestContext.getUriInfo().getPath())) {
           System.out.println(containerRequestContext.getHeaderString("Authorization"));
           //Authorize the request! e.g. JWThandler.validate(token)
       }
   }
}
	2.4 Hashing af Passwords med BCrypt
Det er altid en dårlig idé at opbevare passwords i plaintext - og det er utroligt let at hashe et password. Brug rks. https://www.mindrot.org/projects/jBCrypt/ til at hashe og salte brians kodeord og test i stedet mod det hashede kodeord.
               1. Dependency:
<!-- https://mvnrepository.com/artifact/org.mindrot/jbcrypt -->
<dependency>
   <groupId>org.mindrot</groupId>
   <artifactId>jbcrypt</artifactId>
   <version>0.4</version>
</dependency>
               2. Kryptér kodeordet 
String hashed = BCrypt.hashpw(password, BCrypt.gensalt());
	                  3. Test kodeordet

if (BCrypt.checkpw(candidate, hashed))
        System.out.println("It matches");
else
        System.out.println("It does not match");
	

3 Arbejd på jeres Minimale fungerende system
Husk at der er en aflevering lige om lidt. Når den er overstået er det på tide at implementere sikkerhed til sidste aflevering
