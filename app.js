const $countries = document.querySelector(".countries-container");
const filterRegion = document.querySelector(".filter-by-region");
const searchInput = document.querySelector("input");
const changerThemes = document.querySelector(".theme-changer");

let allCountries = [];

async function Countries() {
	const response = await fetch(
		"https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital",
	);

	const data = await response.json();

	data.sort((a, b) => a.name.common.localeCompare(b.name.common));

	allCountries = data;

	displayCountries(allCountries);
}

function displayCountries(countries) {
	$countries.innerHTML = "";

	countries.forEach((country) => {
		createCountries(country);
	});
}

function createCountries(country) {
	const div = document.createElement("div");

	div.classList.add("country-card");

	div.innerHTML = `
		<img src="${country.flags.png}" alt="${country.name.common}">
		<h2>${country.name.common}</h2>
		<p>Population: ${country.population}</p>
		<p>Region: ${country.region}</p>
		<p>Capital: ${country.capital ? country.capital[0] : "No capital"}</p>
	`;

	div.addEventListener("click", () => {
		window.location.href = `country.html?name=${country.name.common}`;
	});

	$countries.appendChild(div);
}

filterRegion.addEventListener("change", (e) => {
	const selectedRegion = e.target.value;

	if (selectedRegion === "All") {
		displayCountries(allCountries);
		return;
	}

	const filteredCountries = allCountries.filter(
		(country) => country.region === selectedRegion,
	);

	displayCountries(filteredCountries);
});

searchInput.addEventListener("input", (e) => {
	const search = e.target.value.toLowerCase();

	const filteredCountries = allCountries.filter((country) =>
		country.name.common.toLowerCase().includes(search),
	);

	displayCountries(filteredCountries);
});

changerThemes.addEventListener("click", () => {
	document.body.classList.toggle("dark");
});

Countries();
