function updateCityTemperature() {
  let currentDayTemperature = document.querySelector("#temperature-value");
}

function findCityTemperature(city) {
  let keyApi = "83bco8b8afca3aft80c7a9a59f08542a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${keyApi}&units=metric`;
  axios.get(apiUrl).then(updateCityTemperature);
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
