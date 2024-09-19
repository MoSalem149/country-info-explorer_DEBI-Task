export function displayCountries(countries) {
  const container = document.getElementById("countries-container");
  container.innerHTML = "";
  countries.forEach((country) => {
    const card = document.createElement("div");
    card.className = "country-card";
    card.innerHTML = `
      <div class="country-card-header">
        <img src="${country.flags.svg}" alt="Flag of ${
      country.name.common
    }" class="country-flag">
        <h3>${country.name.common}</h3>
      </div>
      <div class="country-card-body">
    <p><i class="fas fa-city"></i> <strong>Capital:</strong> ${
      country.capital
    }</p>
    <p><i class="fas fa-globe"></i> <strong>Region:</strong> ${
      country.region
    }</p>
    <p><i class="fas fa-users"></i> <strong>Population:</strong> ${country.population.toLocaleString()}</p>
    <p><i class="fas fa-language"></i> <strong>Languages:</strong> ${Object.values(
      country.languages
    ).join(", ")}</p>
    <p><i class="fas fa-money-bill-wave"></i> <strong>Currencies:</strong> ${Object.values(
      country.currencies
    )
      .map((c) => c.name)
      .join(", ")}</p>
</div>
    `;
    card.addEventListener("click", () => {
      window.location.href = `details.html?country=${country.name.common}`;
    });
    container.appendChild(card);
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
