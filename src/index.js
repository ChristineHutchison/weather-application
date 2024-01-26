function refreshWeather(response) {
	let todayTemperatureElement = document.querySelector(
		"#todays-weather-temperature"
	);
	let temperature = Math.round(response.data.temperature.current);
	todayTemperatureElement.innerHTML = temperature;
}

function searchCity(city) {
	let apiKey = "bc4649524ebb028af8032a47bt4c53o0";
	let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
	axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
	event.preventDefault();
	let searchInput = document.querySelector("#search-form-input");
	let cityElement = document.querySelector("#weather-app-city");
	cityElement.innerHTML = searchInput.value;
	searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);