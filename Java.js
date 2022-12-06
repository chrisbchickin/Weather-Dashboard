var APIKey = "203ae079c0deb3ae76efe4c30d420bc1";
var city;
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
var cityInputEl = document.querySelector('#city');
var userFormEl = document.querySelector('#user-form');
var conditonsEl = document.querySelector('.city-conditions');
var forecastEl = document.querySelector('.forecast');
var cityHistory = document.querySelector('.city-list');
var storedCity = localStorage.getItem("city");
//starts functions on submit event
var formSubmitHandler = function(event) {
    conditonsEl.innerHTML = '';
    forecastEl.innerHTML = '';
    event.preventDefault();
    
    var city = cityInputEl.value.trim();
    
    if (city) {
        getCityInfo(city);
        getLatLon(city);
        createButton(city);
    } 
    cityInputEl.value = '';
}
//calls api and creates weather conditions elements
var getCityInfo = function(city) {

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    fetch(queryURL) 
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                var cityName = document.createElement('div');
                var cityWind = document.createElement('div');
                var cityHumidity = document.createElement('div');
                var cityTemp = document.createElement('div');
                var cityIcon = document.createElement('img');
                var iconUrl = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png"; 

                cityName.textContent = data.name;
                cityIcon.setAttribute('src', iconUrl)
                cityTemp.textContent = "Temperature: " + Math.floor(data.main.temp / 10);
                cityHumidity.textContent = "Humidity: " + data.main.humidity;
                cityWind.textContent = "Wind Speed: " + data.wind.speed;

                conditonsEl.appendChild(cityName);
                conditonsEl.appendChild(cityIcon);
                conditonsEl.appendChild(cityTemp);
                conditonsEl.appendChild(cityHumidity);
                conditonsEl.appendChild(cityWind);
            });
        }

    })
}
//retrieves lattitude and longitude from api
var getLatLon = function(city) {

var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=" + APIKey;

    fetch(queryURL)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                long = data[0].lon;
                lati = data[0].lat;
                getForcast(long, lati);
            })
        }
    })
}
//creates 5 day forecast
var getForcast = function(lon, lat) {
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey

    fetch(queryURL)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data.list);
                for (i = 0; i < data.list.length; i++) {
                    var forecastItem = data.list[i].dt_txt;
                    if (forecastItem.includes("15:00:00")) {
                        var date = document.createElement('div');
                        var icon = document.createElement('img');
                        var temp = document.createElement('div');
                        var wind = document.createElement('div');
                        var humidity = document.createElement('div');

                        date.textContent = data.list[i].dt_txt;
                        temp.textContent = "Temp: " + Math.floor(data.list[i].main.temp / 10);
                        wind.textContent = "Wind speed: " + data.list[i].wind.speed;
                        humidity.textContent = "Humidity: " + data.list[i].main.humidity;
                        forecastIcon = "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png";
                        icon.setAttribute('src', forecastIcon);
                        icon.setAttribute('class', 'small')
                        
                        forecastEl.appendChild(icon);
                        forecastEl.appendChild(date);
                        forecastEl.appendChild(temp);
                        forecastEl.appendChild(wind);
                        forecastEl.appendChild(humidity);

                    }

                }
            })
        }
    })
}
//creates buttons
var createButton = function (city) {
    var cityButton = document.createElement('button');
    cityButton.textContent = city;
    cityButton.setAttribute('class', 'city-button');
    cityHistory.appendChild(cityButton);
    localStorage.setItem("city", city);
    var cityHistoryEl = document.querySelector('.city-button');
}
//to be continued :P
var renderLastCity = function (event) {
    event.preventDefault();
    conditonsEl.innerHTML = '';
    forecastEl.innerHTML = '';
    var city = localStorage.getItem("city")
    getCityInfo(city);
    getLatLon(city);
}






userFormEl.addEventListener('submit', formSubmitHandler);

