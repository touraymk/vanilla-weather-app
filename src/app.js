
function displayCurrentWeather(response) {
  console.log(response);
  
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

let apiKey = "dc34aa4b26o1f14aa51aea20t25d63c3";
let unit = "metric";



document.querySelector("#search-form").addEventListener("submit", searchCity);

searchCity("Bridgetown");