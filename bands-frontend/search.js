const BASE_SEARCH_URL = "http://projeto-final-talita.herokuapp.com/bands";

const searchForm = document.getElementById("search_form");
const searchButton = document.getElementById("input_search_submit");
const resultsTable = document.getElementById("search_results_table");

const linksDiv = document.getElementById("login_signup_links");
const logoutButton = document.getElementById("logout_button");

const dataFields = ["name", "city", "style", "venue", "instagram", "twitter"];

// show the correct header if user is logged in
if (localStorage.getItem("token")) {
  linksDiv.style.display = "none";
} else {
  logoutButton.style.display = "none";
}

// handles logout
logoutButton.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.reload();
});

// handles search click
searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  clearTableBody();
  const formData = new FormData(searchForm);
  const search = [];

  for (let [key, value] of formData.entries()) {
    if (value) search.push([key, value]);
  }

  const urlSearchParams = new URLSearchParams();
  search.forEach(([key, value]) => urlSearchParams.set(key, value));
  const url = urlSearchParams.toString()
    ? `${BASE_SEARCH_URL}?${urlSearchParams.toString()}`
    : BASE_SEARCH_URL;
  // const url = BASE_SEARCH_URL;

  fetch(url)
    .then((response) => response.json())
    .then((bands) => {
      bands.map((artist, index) => {
        let row = resultsTable.insertRow(index);
        dataFields.forEach((field, cellIndex) => {
          let cell = row.insertCell(cellIndex);
          cell.innerHTML = artist[field];
        });
      });
    });
});

function clearTableBody() {
  var resultsTableBody = resultsTable.getElementsByTagName("tbody")[0];
  if (resultsTableBody) resultsTableBody.innerHTML = "";
}
