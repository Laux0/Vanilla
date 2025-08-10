function searchAction(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let weatherCity = document.querySelector("#weather-city");
  weatherCity.innerHTML = searchInput.value;
}

let searchFormElement = document.querySelector("#search-city");
let searchButton = document.querySelector("#search-button");

searchFormElement.addEventListener("submit", searchAction);
