const CREATE_URL = "http://projeto-final-talita.herokuapp.com/bands";

const createForm = document.getElementById("create_form");
const createButton = document.getElementById("input_create_submit");

// show the correct header if user is logged in
if (!localStorage.getItem("token")) {
  window.location.assign("index.html");
}

createButton.addEventListener("click", (event) => {
  event.preventDefault();

  const body = {
    name: createForm.name.value,
    style: createForm.style.value,
    city: createForm.city.value,
    instagram: createForm.instagram.value,
    venue: createForm.venues.value
      .split(",")
      .map((venue) => venue.trim())
      .filter((el) => el),
  };

  if (!body.name || !body.city) {
    return alert("O nome e a cidade da banda são obrigatórios");
  }

  fetch(CREATE_URL, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then((response) => {
      if (!response.ok) alert("Erro no cadastro");
      return response.json();
    })
    .then((band) => {
      console.log({ band });
      alert("A banda " + band.name + " foi criada!");
      window.location.assign("index.html");
    })
    .catch((err) => {
      console.log(err);
      alert("Erro no cadastro");
    });
});
