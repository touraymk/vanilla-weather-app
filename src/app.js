function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  };
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  };
  
  let days = [
    "Sunday", 
    "Monday", 
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday", 
    "Saturday"
  ];
  
  let  day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}


function displayCurrentWeather(response) {
  console.log(response);
  let icon = document.querySelector("#icon");

  celsusTemperature = response.data.temperature.current;
  city = response.data.city;

  document.querySelector("#city").innerHTML = city;
  document.querySelector("#country").innerHTML = response.data.country;
  document.querySelector("#current-time").innerHTML = formatDate(response.data.time * 1000);
  document.querySelector("#temperature").innerHTML = Math.round(celsusTemperature);
  document.querySelector("#description").innerHTML = response.data.condition.description;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#humidity").innerHTML = response.data.temperature.humidity;
  document.querySelector("#feel-temperature").innerHTML = Math.round(response.data.temperature.feels_like);
  icon.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
  icon.setAttribute("alt", response.data.condition.description);

}

function searchCity(city) {
  let apiKey = "dc34aa4b26o1f14aa51aea20t25d63c3";  
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayCurrentWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  searchCity(cityInputElement.value);
}

function ShowPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "dc34aa4b26o1f14aa51aea20t25d63c3";
  let apiCoordsUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=${unit}`
  console.log(apiCoordsUrl);
  axios.get(apiCoordsUrl).then(displayCurrentWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(ShowPosition);
}

function convertToMetricUnit(event) {
  event.preventDefault();
  celsiusButton.classList.add("active");
  fahrenheitButton.classList.remove("active");
  temperatureSign = "C";
  unit = "metric";

  searchCity(city);
}

function convertToImperialUnit(event) {
  event.preventDefault();
  fahrenheitButton.classList.add("active");
  celsiusButton.classList.remove("active");
  temperatureSign = "F";
  unit = "imperial";

  searchCity(city);
}


let apiKey = "dc34aa4b26o1f14aa51aea20t25d63c3";
let unit = "metric";
let celsusTemperature = null;
let city = null;
let temperatureSign = "C";
let fahrenheitButton = document.querySelector("#fahrenheit-link");
let celsiusButton = document.querySelector("#celsius-link");

celsiusButton.classList.add("active");
celsiusButton.addEventListener("click", convertToMetricUnit),
fahrenheitButton.addEventListener("click", convertToImperialUnit);

document.querySelector("#search-form").addEventListener("submit", handleSubmit);
document.querySelector("#current-location-button").addEventListener("click", getCurrentLocation);


searchCity("Bridgetown");