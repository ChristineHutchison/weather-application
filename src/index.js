function refreshWeather(response) {
	let todayTemperatureElement = document.querySelector(
		"#todays-weather-temperature"
	);
	let temperature = Math.round(response.data.temperature.current);
	let cityElement = document.querySelector("#weather-app-city");
	let descriptionElement = document.querySelector("#description");
	let humidityElement = document.querySelector("#humidity");
	let windspeedElement = document.querySelector("#wind-speed");
	let timeElement = document.querySelector("#time");
	let date = new Date(response.data.time * 1000);
	let iconTodayElement = document.querySelector("#todays-weather-icon");

	iconTodayElement.innerHTML = `<img src="${response.data.condition.icon_url}" id="todays-weather-icon"/>`;
	cityElement.innerHTML = response.data.city;
	todayTemperatureElement.innerHTML = temperature;
	descriptionElement.innerHTML = response.data.condition.description;
	humidityElement.innerHTML = response.data.temperature.humidity;
	windspeedElement.innerHTML = response.data.wind.speed;
	timeElement.innerHTML = formatDate(date);

	getForecast(response.data.city);
}

function formatDate(date) {
	let minutes = date.getMinutes();
	let hours = date.getHours();
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let day = days[date.getDay()];

	if (minutes < 10) {
		minutes = `0${minutes}`;
	}

	return `${day} ${hours}:${minutes}`;
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

function formatDay(timestamp) {
	let date = new Date(timestamp * 1000);
	let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	return days[date.getDay()];
}

function getForecast(city) {
	let apiKey = "bc4649524ebb028af8032a47bt4c53o0";
	let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
	axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
	console.log(response.data);

	let forecastHtml = "";

	response.data.daily.forEach(function (day, index) {
		if (index < 6) {
			forecastHtml =
				forecastHtml +
				`
			<div class="weather-forecast-day">
						<div class="weather-forecast-date">${formatDay(day.time)}</div>
						<div >
						<img src="${day.condition.icon_url}" class="weather-forecast-icon"/></div>
						<div class="weather-forecast-temperatures">
							<span class="weather-forecast-temperature-max">${Math.round(
								day.temperature.maximum
							)}</span>
							<span class="weather-forecast-temperature-min">${Math.round(
								day.temperature.minimum
							)}</span>
						</div>
					</div>
				`;
		}
	});

	let forecastElement = document.querySelector("#forecast");
	forecastElement.innerHTML = forecastHtml;
}

searchCity("London");
