import { fetchCountries } from "./api.js";
import { displayCountries, filterCountries, renderPagination } from "./ui.js";

let countries = [];
let currentPage = 1;
const itemsPerPage = 20;

async function init() {
  try {
    countries = await fetchCountries();
    displayCountries(paginate(countries, currentPage));
    renderPagination(countries.length, itemsPerPage, paginateAndDisplay);
  } catch (error) {
    document.getElementById("countries-container").innerHTML =
      "<p>Failed to load country data.</p>";
  }
}

function paginate(countries, page) {
  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;
  return countries.slice(start, end);
}

function paginateAndDisplay(page) {
  currentPage = page;
  displayCountries(paginate(countries, currentPage));
}

document.getElementById("search").addEventListener("input", (e) => {
  const filteredCountries = filterCountries(countries, e.target.value);

  if (filteredCountries.length > 0) {
    displayCountries(paginate(filteredCountries, 1));
    renderPagination(
      filteredCountries.length,
      itemsPerPage,
      paginateAndDisplay
    );
    document.getElementById("no-results").style.display = "none";
    document.getElementById("pagination").style.display = "block";
  } else {
    document.getElementById("countries-container").innerHTML = "";
    document.getElementById("no-results").style.display = "block";
    document.getElementById("pagination").style.display = "none";
  }
});

document.getElementById("sort").addEventListener("change", (e) => {
  countries = sortCountries(countries, e.target.value);
  displayCountries(paginate(countries, currentPage));
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

function sortCountries(countries, criterion) {
  return countries.sort((a, b) => {
    if (criterion === "population") {
      return b.population - a.population;
    } else if (criterion === "name") {
      return a.name.common.localeCompare(b.name.common);
    } else if (criterion === "region") {
      return a.region.localeCompare(b.region);
    }
  });
}

init();
