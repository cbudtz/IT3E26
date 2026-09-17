const form = document.getElementById("login-form");
const brugernavn = document.getElementById("brugernavn");
const kode = document.getElementById("kode");
const fejl = document.getElementById("fejl");

form.addEventListener("submit", async (event) => {
	event.preventDefault();
	fejl.hidden = true;

	const res = await fetch("/api/login", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			cpr: brugernavn.value,
			password: kode.value
		})
	});

	if (res.ok) {
		window.location.href = "/velkommen.html";
		return;
	}

	fejl.hidden = false;
});
