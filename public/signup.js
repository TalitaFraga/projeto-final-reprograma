const SIGNUP_URL = "https://projeto-final-talita.herokuapp.com/signup";

const signupForm = document.getElementById("signup_form");
const signupButton = document.getElementById("input_signup_submit");

signupButton.addEventListener("click", (event) => {
  event.preventDefault();

  const body = {
    email: signupForm.email.value,
    password: signupForm.password.value,
  };

  fetch(SIGNUP_URL, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) alert("Erro no cadastro");
      return alert("Cadastro realizado com sucesso");
    })
    .catch(() => {
      alert("Erro no cadastro");
    });
});
