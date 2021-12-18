// Global variables
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
var unixDate;
var convertedDate;

// Search button for the city input
searchBtn.addEventListener('click', function (event) {
  event.preventDefault();
  getApi();
})

// Function to get the latitude and longitude of city searched
function getApi() {
  var geocodingUrl = 'http://www.mapquestapi.com/geocoding/v1/address?key=' + geocodingAPI + '&location=' + searchInput.value;

  // Fetches information from mapquest's api
  fetch(geocodingUrl)
    .then(function (geocodeResponse) {
      return geocodeResponse.json();
    })

    // Function using the retrieved latitude and longitude to retrieve weather data
    .then(function (geocodeData) {
      var latitude = geocodeData.results[0].locations[0].latLng.lat
      var longitude = geocodeData.results[0].locations[0].latLng.lng
      var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&units=imperial&appid=' + oneCallAPI;

      // Fetches information from the One Call API
      fetch(requestUrl)
        .then(function (requestResponse) {
          return requestResponse.json();
        })

        // Function that retrieves specific data for the current date as well as the next 5 days
        .then(function (requestData) {
          console.log(requestData)
          unixDate = requestData.current.dt
          convertedDate = moment.unix(unixDate).format('M/D/YYYY')
          var currentWeatherIconCode = requestData.current.weather[0].icon
          var currentWeatherIcon = 'http://openweathermap.org/img/w/' + currentWeatherIconCode + '.png';
          var currentTemp = requestData.current.temp
          var currentWind = requestData.current.wind_speed
          var currentHumidity = requestData.current.humidity
          var uvIndex = requestData.current.uvi

          console.log(unixDate)
          console.log(convertedDate)
          console.log(currentWeatherIconCode + ' currentWeather')
          console.log(currentWeatherIcon + ' currentWeather')
          console.log(currentTemp + ' currentWeather')
          console.log(currentWind + ' currentWeather')
          console.log(currentHumidity + ' currentWeather')
          console.log(uvIndex + ' currentWeather')

          // One Call API forecast gives the current date for the first forecast date if it is before 4PM, condition needed to get the correct forecast dates
          // Sets variable j for if it is before or after 4PM
          if (parseInt(moment().format("H")) < 16) {
            var j = 1;
          } else {
            var j = 0;
          };

          // Sets variable k for if it is before or after 4PM
          if (parseInt(moment().format("H")) < 16) {
            var k = 6;
          } else {
            var k = 5;
          };

          // For loop to retrieve specific data for the 5 day forecast
          for (var i = j; i < k; i++) {
            unixDate = requestData.daily[i].dt
            convertedDate = moment.unix(unixDate).format('M/D/YYYY')
            var forecastWeatherIconCode = requestData.daily[i].weather[0].icon
            var forecastWeatherIcon = 'http://openweathermap.org/img/w/' + forecastWeatherIconCode + '.png';
            var forecastTemp = requestData.daily[i].temp.day
            var forecastWind = requestData.daily[i].wind_speed
            var forecastHumidity = requestData.daily[i].humidity

            console.log(unixDate)
            console.log(convertedDate)
            console.log(forecastWeatherIconCode + ' forecast' + i)
            console.log(forecastWeatherIcon + ' forecast' + i)
            console.log(forecastTemp + ' forecast' + i)
            console.log(forecastWind + ' forecast' + i)
            console.log(forecastHumidity + ' forecast' + i)
          }
        })
    })
}
