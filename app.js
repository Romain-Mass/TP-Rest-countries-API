const $countries = document.querySelector(".countries-container");
const $SearchCountries = document.querySelector(".search-container");

document.addEventListener("DOMContentLoaded", async () => {
	Countries();
});

async function Countries() {
	const response = await fetch(
		"https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital",
	);

	const data = await response.json();

	console.log(data);

	data.sort((a, b) => a.name.common.localeCompare(b.name.common));

	data.forEach((country) => {
		createCountries(country);
	});
}

function createCountries(country) {
	const div = document.createElement("div");

	div.innerHTML = `
		<img src="${country.flags.png}" alt="Country Flag ${country.name.common}">
        <div class="card-text">
		    <h2>${country.name.common}</h2>
		    <p>Population: ${country.population}</p>
		    <p>Region: ${country.region}</p>
		    <p>Capital: ${country.capital ? country.capital[0] : "No capital"}</p>
        </div>
	`;

	div.classList.add("country-card");

	$countries.appendChild(div);

	return div;
}

$SearchCountries.addEventListener("sumbit", () => {});
