function updateCityTemperature(response) {
  let currentDayTemperature = document.querySelector("#temperature-value");
  let temperature = Math.round(response.data.temperature.current);
  currentDayTemperature.innerHTML = `${temperature}`;
}

function findCityTemperature(city) {
  let keyApi = "83bco8b8afca3aft80c7a9a59f08542a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${keyApi}&units=metric`;
  axios.get(apiUrl).then(updateCityTemperature);
  console.log(apiUrl);
}

function searchAction(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let weatherCity = document.querySelector("#weather-city");
  weatherCity.innerHTML = searchInput.value;
  findCityTemperature(searchInput.value);
}

let searchFormElement = document.querySelector("#search-city");
let searchButton = document.querySelector("#search-button");

searchFormElement.addEventListener("submit", searchAction);
