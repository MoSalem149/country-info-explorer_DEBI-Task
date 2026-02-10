export async function fetchCountries() {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,languages,currencies,subregion,timezones,borders"
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const filteredData = data.filter(
      (country) => country.name.common !== "Israel"
    );

    return filteredData;
  } catch (error) {
    console.error("Error fetching country data:", error);
    throw error;
  }
}
