async function loadCountryDetails() {
  try {
    const params = new URLSearchParams(window.location.search);
    const countryName = params.get("country");
    
    // Fetch full country data without field restrictions
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=true`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    const country = data[0];

    if (country) {
      displayCountryDetails(country);
    } else {
      document.getElementById("country-details-container").innerHTML =
        "<p>Country not found.</p>";
    }
  } catch (error) {
    console.error("Error loading country details:", error);
    document.getElementById("country-details-container").innerHTML =
      "<p>Failed to load country data.</p>";
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
          country.capital ? country.capital[0] : "N/A"
        }</p>
        <p><strong><i class="fas fa-globe"></i> Region:</strong> ${
          country.region || "N/A"
        }</p>
        <p><strong><i class="fas fa-users"></i> Population:</strong> ${
          country.population ? country.population.toLocaleString() : "N/A"
        }</p>
        <p><strong><i class="fas fa-language"></i> Languages:</strong> ${
          country.languages ? Object.values(country.languages).join(", ") : "N/A"
        }</p>
        <p><strong><i class="fas fa-money-bill-wave"></i> Currencies:</strong> ${
          country.currencies 
            ? Object.values(country.currencies).map((c) => c.name).join(", ")
            : "N/A"
        }</p>
        <p><strong><i class="fas fa-map-marked-alt"></i> Subregion:</strong> ${
          country.subregion || "N/A"
        }</p>
        <p><strong><i class="fas fa-clock"></i> Timezones:</strong> ${
          country.timezones ? country.timezones.join(", ") : "N/A"
        }</p>
        <p><strong><i class="fas fa-map"></i> Borders:</strong> ${
          country.borders ? country.borders.join(", ") : "None"
        }</p>
        <p><strong><i class="fas fa-ruler-combined"></i> Area:</strong> ${
          country.area ? country.area.toLocaleString() + " km²" : "N/A"
        }</p>
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
