var searchInput = document.getElementById('searchInput');
var searchBtn = document.getElementById('searchBtn');
var searchedCity = document.getElementById('searchedCity');
var currentIcon = document.getElementById('currentIcon');
var currentTemp = document.getElementById('currentTemp');
var currentWind = document.getElementById('currentWind');
var currentHumidity = document.getElementById('currentHumidity');
var currentUV = document.getElementById('currentUV');
var forecastDate = document.getElementsByClassName('forecastDate');
var forecastIcon = document.getElementsByClassName('forecastIcon');
var forecastTemp = document.getElementsByClassName('forecastTemp');
var forecastWind = document.getElementsByClassName('forecastWind');
var forecastHumidity = document.getElementsByClassName('forecastHumidity');

searchBtn.addEventListener('click', function (event) {
  event.preventDefault();
})

function getApi() {
  var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall';

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
}
