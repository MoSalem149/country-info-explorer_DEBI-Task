export async function fetchCountries() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,languages,currencies");
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();

    const filteredData = data.filter(
      (country) => country.name.common !== "Israel"
    );

    return filteredData;
  } catch (error) {
    document.getElementById("countries-container").innerHTML =
      "<p>Failed to load country data.</p>";
    console.error("Error fetching country data:", error);
  }
}
