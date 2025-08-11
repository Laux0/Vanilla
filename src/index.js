function updateCityTemperature(response) {
  let currentDayTemperature = document.querySelector("#temperature-value");
  let temperature = Math.round(response.data.temperature.current);
  let weatherCity = document.querySelector("#weather-city");
  let weatherDescription = document.querySelector("#weather-description");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let roundedWindSpeed = Math.round(response.data.wind.speed);
  let time = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);

  weatherCity.innerHTML = response.data.city;
  currentDayTemperature.innerHTML = `${temperature}`;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeed.innerHTML = `${roundedWindSpeed}km/h`;
  weatherDescription.innerHTML = response.data.condition.description;
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
  findCityTemperature(searchInput.value);
}

let searchFormElement = document.querySelector("#search-city");
searchFormElement.addEventListener("submit", searchAction);

findCityTemperature("Berlin");
