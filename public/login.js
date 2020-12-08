const LOGIN_URL = "http://projeto-final-talita.herokuapp.com/login";

const loginForm = document.getElementById("login_form");
const loginButton = document.getElementById("input_login_submit");

loginButton.addEventListener("click", (event) => {
  event.preventDefault();

  const body = {
    email: loginForm.email.value,
    password: loginForm.password.value,
  };

  fetch(LOGIN_URL, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) alert("Erro no login");
      return response.text();
    })
    .then((token) => {
      localStorage.setItem('token', token)
      window.location.assign("index.html");
    })
    .catch((err) => {
      console.log(err);
      alert("Erro no login");
    });
});
