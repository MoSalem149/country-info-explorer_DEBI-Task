import { fetchCountries } from "./api.js";

async function loadCountryDetails() {
  const params = new URLSearchParams(window.location.search);
  const countryName = params.get("country");
  const countries = await fetchCountries();
  const country = countries.find((c) => c.name.common === countryName);

  if (country) {
    displayCountryDetails(country);
  } else {
    document.getElementById("country-details-container").innerHTML =
      "<p>Country not found.</p>";
  }
}

function displayCountryDetails(country) {
  const container = document.getElementById("country-details-container");
  container.innerHTML = `
      <div class="country-details-card">
  <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
  <div class="country-details-content">
    <h2>${country.name.common}</h2>
    <p><strong><i class="fas fa-city"></i> Capital:</strong> ${
      country.capital
    }</p>
    <p><strong><i class="fas fa-globe"></i> Region:</strong> ${
      country.region
    }</p>
    <p><strong><i class="fas fa-users"></i> Population:</strong> ${country.population.toLocaleString()}</p>
    <p><strong><i class="fas fa-language"></i> Languages:</strong> ${Object.values(
      country.languages
    ).join(", ")}</p>
    <p><strong><i class="fas fa-money-bill-wave"></i> Currencies:</strong> ${Object.values(
      country.currencies
    )
      .map((c) => c.name)
      .join(", ")}</p>
    <p><strong><i class="fas fa-map-marked-alt"></i> Subregion:</strong> ${
      country.subregion
    }</p>
    <p><strong><i class="fas fa-clock"></i> Timezones:</strong> ${country.timezones.join(
      ", "
    )}</p>
    <p><strong><i class="fas fa-map"></i> Borders:</strong> ${
      country.borders ? country.borders.join(", ") : "None"
    }</p>
    <p><strong><i class="fas fa-ruler-combined"></i> Area:</strong> ${country.area.toLocaleString()} km²</p>
  </div>
</div>
  `;
}

document.getElementById("back-button").addEventListener("click", () => {
  window.location.href = "index.html";
});

document.getElementById("theme-toggle").addEventListener("click", () => {
  const body = document.body;
  const themeIcon = document.getElementById("theme-icon");

  body.dataset.theme = body.dataset.theme === "dark" ? "light" : "dark";

  if (body.dataset.theme === "dark") {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  } else {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  }
});

loadCountryDetails();
