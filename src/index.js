function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function showForecast(response) {
  let forecast = document.querySelector("#forecast");
  let forecastHtml = "";

  response.data.daily.slice(1, 5).forEach(function (day, index) {
    if (index < 4) {
      forecastHtml =
        forecastHtml +
        `<div class="forecast-day">
            <div class="forecast-weekday">${formatForecastDay(day.time)}</div>
            <div><img class="forecast-emoji" src="${
              day.condition.icon_url
            }" /></div>
            <div class="forecast-temperatures">
              <div class="forecast-variation">
                <strong>${Math.round(day.temperature.maximum)}°</strong>
              </div>
              <div class="forecast-variation">${Math.round(
                day.temperature.minimum
              )}°</div>
            </div>
          </div>`;
    }
  });
  forecast.innerHTML = forecastHtml;
}

function findCityForecast(city) {
  let keyApi = "83bco8b8afca3aft80c7a9a59f08542a";
  let apiForecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${keyApi}&units=metric`;
  axios.get(apiForecastUrl).then(showForecast);
  console.log(apiForecastUrl);
}

function updateCityTemperature(response) {
  let currentDayTemperature = document.querySelector("#temperature-value");
  let temperature = Math.round(response.data.temperature.current);
  let weatherCity = document.querySelector("#weather-city");
  let weatherDescription = document.querySelector("#weather-description");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let roundedWindSpeed = Math.round(response.data.wind.speed);
  let date = new Date(response.data.time * 1000);
  let time = document.querySelector("#time");
  let hours = `${date.getHours()}`;
  let minutes = `${date.getMinutes()}`;

  let weekDay = document.querySelector("#weekDay");
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];
  let emoji = document.querySelector("#emoji");

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let currentTime = `${hours}:${minutes}`;

  time.innerHTML = `${currentTime}`;
  weekDay.innerHTML = `${currentDay}`;
  weatherCity.innerHTML = response.data.city;
  currentDayTemperature.innerHTML = `${temperature}`;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeed.innerHTML = `${roundedWindSpeed}km/h`;
  weatherDescription.innerHTML = response.data.condition.description;
  emoji.innerHTML = `<img
    src="${response.data.condition.icon_url}"
    class="temperature-emoji"
    id="temperature-emoji"
  />`;

  console.log(date.getHours);
  findCityForecast(response.data.city);
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
