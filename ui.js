export function displayCountries(countries) {
  const container = document.getElementById("countries-container");
  container.innerHTML = "";

  countries.forEach((country) => {
    const languages = country.languages
      ? Object.values(country.languages).join(", ")
      : "N/A";

    const currencies = country.currencies
      ? Object.values(country.currencies)
          .map((c) => c.name)
          .join(", ")
      : "N/A";

    container.innerHTML += `
      <div class="country-card">
        <img src="${country.flags?.svg}" alt="Flag of ${country.name.common}">
        <h3>${country.name.common}</h3>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Languages:</strong> ${languages}</p>
        <p><strong>Currencies:</strong> ${currencies}</p>
      </div>
    `;
  });
}

export function filterCountries(countries, query) {
  return countries.filter((country) =>
    country.name.common.toLowerCase().includes(query.toLowerCase())
  );
}

export function renderPagination(totalItems, itemsPerPage, onPageChange) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i;
    pageButton.addEventListener("click", () => onPageChange(i));
    pagination.appendChild(pageButton);
  }
}
