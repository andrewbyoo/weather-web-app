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
var geocodingAPI = 'JIAm99s7cv9HGwGfe0zIAg3ZEQBLSobn'
var oneCallAPI = 'ef5e2549b8aa888c5f64f0c4c89090d6';

searchBtn.addEventListener('click', function (event) {
  event.preventDefault();
  getApi();
})

function getApi() {
  var geocodingUrl = 'http://www.mapquestapi.com/geocoding/v1/address?key=' + geocodingAPI + '&location=' + searchInput.value;
  // var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?q=' +  + '&appid=' + oneCallAPI;
console.log(geocodingUrl)
  // fetch(requestUrl)
  //   .then(function (response) {
  //     return response.json();
  //   })
}
