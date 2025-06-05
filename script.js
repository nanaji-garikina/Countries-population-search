let resultOfCountries = document.getElementById("resultCountries");
let spinnerEle = document.getElementById("spinner");
let searchInput = document.getElementById("searchInput");

let countriesList = [];

function createCountryCard(country) {
  let countryCard = document.createElement("div");
  countryCard.classList.add("country-card", "col-12", "col-md-6", "col-lg-4");

  let flagImg = document.createElement("img");
  flagImg.src = country.flag;
  flagImg.alt = `${country.name} Flag`;
  flagImg.classList.add("country-flag");

  let infoDiv = document.createElement("div");
  infoDiv.classList.add("country-info");

  let nameEl = document.createElement("h5");
  nameEl.textContent = country.name;
  nameEl.classList.add("country-name");

  let populationEl = document.createElement("p");
  populationEl.textContent = `Population: ${country.population.toLocaleString()}`;
  populationEl.classList.add("country-population");

  infoDiv.appendChild(nameEl);
  infoDiv.appendChild(populationEl);

  countryCard.appendChild(flagImg);
  countryCard.appendChild(infoDiv);

  resultOfCountries.appendChild(countryCard);
}

function displayCountries(filter = "") {
  resultOfCountries.innerHTML = "";

  let filteredCountries = countriesList.filter(country =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  );

  filteredCountries.forEach(createCountryCard);
}

function fetchCountries() {
  spinnerEle.classList.remove("d-none");

  fetch("https://apis.ccbp.in/countries-data")
    .then(response => response.json())
    .then(data => {
      spinnerEle.classList.add("d-none");
      countriesList = data;
      displayCountries(); // show all initially
    })
    .catch(error => {
      spinnerEle.classList.add("d-none");
      resultOfCountries.innerHTML = `<p class="text-danger">Failed to load data.</p>`;
    });
}

searchInput.addEventListener("input", (event) => {
  displayCountries(event.target.value);
});

fetchCountries();
