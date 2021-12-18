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

  fetch(geocodingUrl)
    .then(function (geocodeResponse) {
      return geocodeResponse.json();
    })
    .then(function (geocodeData) {
      var latitude = geocodeData.results[0].locations[0].latLng.lat
      var longitude = geocodeData.results[0].locations[0].latLng.lng
      var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&units=imperial&appid=' + oneCallAPI;

      fetch(requestUrl)
        .then(function (requestResponse) {
          return requestResponse.json();
        })
        .then(function (requestData) {
          console.log(requestData)
          var currentWeatherIconCode = requestData.current.weather[0].icon
          var currentWeatherIcon = 'http://openweathermap.org/img/w/' + currentWeatherIconCode + '.png';
          var currentTemp = requestData.current.temp
          var currentWind = requestData.current.wind_speed
          var currentHumidity = requestData.current.humidity
          var uvIndex = requestData.current.uvi

          console.log(currentWeatherIconCode)
          console.log(currentWeatherIcon)
          console.log(currentTemp)
          console.log(currentWind)
          console.log(currentHumidity)
          console.log(uvIndex)
        })
    })
}
