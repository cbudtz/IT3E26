const upper = document.getElementById("oevre");
const button = document.getElementById("vurder");
const result = document.getElementById("resultat");

const classes = ["fejl", "lav", "ok", "hoj"];

button.addEventListener("click", () => {
  //fjern vores styling klasser, hvis de fines på input feltet
  //.classList er DOM elementets klasser
  classes.forEach((name) => upper.classList.remove(name));
  //Tekst output
  const raw = upper.value.trim();
  if (raw === "") {
    result.innerText = "Udfyld feltet Øvre";
    upper.classList.add("fejl");
    return;
  }

  const value = Number(raw);
  if (value < 90) {
    result.innerText = "Lav";
    upper.classList.add("lav");
  } else if (value <= 139) {
    result.innerText = "OK";
    upper.classList.add("ok");
  } else {
    result.innerText = "Høj";
    upper.classList.add("hoj");
  }
});
