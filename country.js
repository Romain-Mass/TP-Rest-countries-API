const countryName = new URLSearchParams(window.location.search).get("name");

const flag = document.querySelector(".country-details img");
const title = document.querySelector(".details-text-container h1");
const nativeName = document.querySelector(".native-name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".sub-region");
const capital = document.querySelector(".capital");
const topLevelDomain = document.querySelector(".top-level-domain");
const currencies = document.querySelector(".currencies");
const languages = document.querySelector(".languages");
const changerThemes = document.querySelector(".fa-regular");

changerThemes.addEventListener("click", (e) => {
	e.preventDefault();
	document.body.classList.toggle("dark");
});

async function getCountry() {
	const response = await fetch(
		`https://restcountries.com/v3.1/name/${countryName}`,
	);

	const data = await response.json();

	const country = data[0];

	flag.src = country.flags.png;

	title.textContent = country.name.common;

	nativeName.textContent = Object.values(
		country.name.nativeName || {},
	)[0]?.common;

	population.textContent = country.population.toLocaleString();

	region.textContent = country.region;

	subRegion.textContent = country.subregion;

	capital.textContent = country.capital ? country.capital[0] : "No capital";

	topLevelDomain.textContent = country.tld ? country.tld[0] : "";

	currencies.textContent = Object.values(country.currencies || {})
		.map((currency) => currency.name)
		.join(", ");

	languages.textContent = Object.values(country.languages || {}).join(", ");
}

getCountry();
