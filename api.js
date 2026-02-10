export async function fetchCountries() {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,languages,currencies"
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    return data.filter(
      (country) => country.name.common !== "Israel"
    );
  } catch (error) {
    console.error("Error fetching country data:", error);

    const container = document.getElementById("countries-container");
    if (container) {
      container.innerHTML = "<p>Failed to load country data.</p>";
    }

    return [];
  }
}
