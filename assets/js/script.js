// Global variables
var searchInput = document.getElementById('searchInput');
var searchBtn = document.getElementById('searchBtn');
var weatherDashboard = document.getElementById('weatherDashboard');
var searchedCity = document.getElementById('searchedCity');
var currentDate = document.getElementById('currentDate');
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
          unixDate = requestData.current.dt;
          convertedDate = moment.unix(unixDate).format('M/D/YYYY');
          var currentWeatherIconCode = requestData.current.weather[0].icon;
          var currentTempOutput = requestData.current.temp;
          var currentWindOutput = requestData.current.wind_speed;
          var currentHumidityOutput = requestData.current.humidity;
          var uvIndex = requestData.current.uvi;

          // Outputs all data variables to the HTML
          searchedCity.innerHTML = searchInput.value;
          currentDate.innerHTML = '(' + convertedDate + ')';
          currentIcon.setAttribute('src', 'http://openweathermap.org/img/w/' + currentWeatherIconCode + '.png')
          currentTemp.innerHTML = 'Temp: ' + currentTempOutput + '&#xb0; F';
          currentWind.innerHTML = 'Wind: ' + currentWindOutput + ' MPH';
          currentHumidity.innerHTML = 'Humidity: ' + currentHumidityOutput + '%';
          currentUV.innerHTML = uvIndex;

          // Sets class currentUV span element to a specific class depending on what UV index was returned from One Call API
          if (uvIndex < 3) {
            currentUV.setAttribute('class', 'lowUV');
          } else if (uvIndex >= 3  && uvIndex < 6) {
            currentUV.setAttribute('class', 'moderateUV');
          } else if (uvIndex >= 6  && uvIndex < 8) {
            currentUV.setAttribute('class', 'highUV');
          } else if (uvIndex >= 8  && uvIndex < 11) {
            currentUV.setAttribute('class', 'veryHighUV');
          } else {
            currentUV.setAttribute('class', 'extremeUV');
          }

          // For loop to retrieve specific data for the 5 day forecast
          for (var i = 1; i < 6; i++) {
            unixDate = requestData.daily[i].dt;
            convertedDate = moment.unix(unixDate).format('M/D/YYYY');
            var forecastWeatherIconCode = requestData.daily[i].weather[0].icon;
            var forecastTempOutput = requestData.daily[i].temp.day;
            var forecastWindOutput = requestData.daily[i].wind_speed;
            var forecastHumidityOutput = requestData.daily[i].humidity;

            forecastDate[i-1].innerHTML = convertedDate;
            forecastIcon[i-1].setAttribute('src', 'http://openweathermap.org/img/w/' + forecastWeatherIconCode + '.png');
            forecastTemp[i-1].innerHTML = 'Temp: ' + forecastTempOutput + '&#xb0; F';
            forecastWind[i-1].innerHTML = 'Wind: ' + forecastWindOutput + ' MPH';
            forecastHumidity[i-1].innerHTML = 'Humidity: ' + forecastHumidityOutput + '%';
          }
          weatherDashboard.style.visibility = 'visible';
        })

        .then(function () {
          var dashboardEl = weatherDashboard.innerHTML
          localStorage.setItem('searchInput', dashboardEl)
        })
    })
}

// Test Code for retrieving local storage and setting it to page
// function getApi() {
//   weatherDashboard.innerHTML = localStorage.getItem('searchInput')
//   weatherDashboard.style.visibility = 'visible';
// }
