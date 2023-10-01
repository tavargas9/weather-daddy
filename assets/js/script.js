var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=d6785378d43b5947bd65e1cc7f7f5175'

var searchBarForm =  document.getElementById('search-bar');
var searchTypeSelector = document.getElementById('search-type');
var searchInput = document.getElementById('search-input');
var currentCityEl = document.getElementById('current-city');
var currentTempEl = document.getElementById('current-temp');
var currentHumidityEl = document.getElementById('current-humidity');
var currentWindSpeedEl = document.getElementById('current-windspeed');
var heroSection = document.getElementById('hero');
var currentWeatherDescEl = document.getElementById('current-weather-desc');
var headerLogoBtn = document.getElementById('header-logo');
var currentWeatherSectionEl = document.getElementById('current-weather-section');
var currentDateEl = document.getElementById('current-date');
var fiveDayForecastEl = document.getElementById('5-day-forecast-section');

var dayOneWeatherDescEl = document.getElementById('day1-weather-desc');
var dayTwoWeatherDescEl = document.getElementById('day2-weather-desc');
var dayThreeWeatherDescEl = document.getElementById('day3-weather-desc');
var dayFourWeatherDescEl = document.getElementById('day4-weather-desc');
var dayFiveWeatherDescEl = document.getElementById('day5-weather-desc');

var dayOneHumidityEl = document.getElementById('day1-humidity');
var dayOneWindEl = document.getElementById('day1-wind');
var dayOneTempEl = document.getElementById('day1-temp');

var dayTwoHumidityEl = document.getElementById('day2-humidity');
var dayTwoWindEl = document.getElementById('day2-wind');
var dayTwoTempEl = document.getElementById('day2-temp');

var dayThreeHumidityEl = document.getElementById('day3-humidity');
var dayThreeWindEl = document.getElementById('day3-wind');
var dayThreeTempEl = document.getElementById('day3-temp');

var dayFourHumidityEl = document.getElementById('day4-humidity');
var dayFourWindEl = document.getElementById('day4-wind');
var dayFourTempEl = document.getElementById('day4-temp');

var dayFiveHumidityEl = document.getElementById('day5-humidity');
var dayFiveWindEl = document.getElementById('day5-wind');
var dayFiveTempEl = document.getElementById('day5-temp');

function handleSearch(event){
    event.preventDefault();
    var searchValue = searchInput.value;
    console.log(searchValue);
    if (searchTypeSelector.value === 'City'){
        if (searchValue) {
            showFiveDayForecast();
            if (!heroSection.classList.contains('hidden')){
            heroSection.classList.add('hidden');
            };
            if (currentWeatherSectionEl.classList.contains('hidden')){
                currentWeatherSectionEl.classList.remove('hidden');
            };
            let weatherUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchValue + '&limit=5&appid=d6785378d43b5947bd65e1cc7f7f5175';
            fetch(weatherUrl)
                .then(function(response){
                    return response.json();
                })
                .then(function(data) {
                    console.log(data);
                    currentCityEl.textContent = data[0].name + ', ' + data[0].state + ', ' + data[0].country;
                    let latLonUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + data[0].lat + '&lon=' + data[0].lon + '&appid=d6785378d43b5947bd65e1cc7f7f5175&units=imperial';
                    fetch(latLonUrl)
                        .then(function(response){
                            return response.json();
                        })
                        .then(function(data){
                            console.log(data);
                            currentWindSpeedEl.textContent = data.wind.speed
                            currentTempEl.textContent = data.main.temp
                            currentHumidityEl.textContent = data.main.humidity
                            currentWeatherDescEl.innerHTML = ' <img src="https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png" /> ' + data.weather[0].description
                        });
                });
            fetch(weatherUrl)
                .then(function(response){
                    return response.json();
                })
                .then(function(data){
                    let fiveDayUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + data[0].lat + '&lon=' + data[0].lon + '&appid=d6785378d43b5947bd65e1cc7f7f5175&units=imperial'
                    fetch(fiveDayUrl)
                        .then(function(response){
                            return response.json();
                        })
                        .then(function(data){
                            console.log(data);
                            dayOneWeatherDescEl.innerHTML = ' <img src="https://openweathermap.org/img/wn/' + data.list[0].weather[0].icon + '@2x.png" /> ' + data.list[0].weather[0].description
                            dayTwoWeatherDescEl.innerHTML = ' <img src="https://openweathermap.org/img/wn/' + data.list[1].weather[0].icon + '@2x.png" /> ' + data.list[1].weather[0].description
                            dayThreeWeatherDescEl.innerHTML = ' <img src="https://openweathermap.org/img/wn/' + data.list[2].weather[0].icon + '@2x.png" /> ' + data.list[2].weather[0].description
                            dayFourWeatherDescEl.innerHTML = ' <img src="https://openweathermap.org/img/wn/' + data.list[3].weather[0].icon + '@2x.png" /> ' + data.list[3].weather[0].description
                            dayFiveWeatherDescEl.innerHTML = ' <img src="https://openweathermap.org/img/wn/' + data.list[4].weather[0].icon + '@2x.png" /> ' + data.list[4].weather[0].description

                            dayOneTempEl.textContent = data.list[0].main.temp
                            dayTwoTempEl.textContent = data.list[1].main.temp
                            dayThreeTempEl.textContent = data.list[2].main.temp
                            dayFourTempEl.textContent = data.list[3].main.temp
                            dayFiveTempEl.textContent = data.list[4].main.temp

                            dayOneHumidityEl.textContent = data.list[0].main.humidity
                            dayTwoHumidityEl.textContent = data.list[1].main.humidity
                            dayThreeHumidityEl.textContent = data.list[2].main.humidity
                            dayFourHumidityEl.textContent = data.list[3].main.humidity
                            dayFiveHumidityEl.textContent = data.list[4].main.humidity
                            
                            dayOneWindEl.textContent = data.list[0].wind.speed
                            dayTwoWindEl.textContent = data.list[1].wind.speed
                            dayThreeWindEl.textContent = data.list[2].wind.speed
                            dayFourWindEl.textContent = data.list[3].wind.speed
                            dayFiveWindEl.textContent = data.list[4].wind.speed
                        })
                });
        } else {
            alert('Invalid search');
        } 
    } else {
        if (searchValue) {
            showFiveDayForecast();
            if (!heroSection.classList.contains('hidden')){
            heroSection.classList.add('hidden');
            };
            if (currentWeatherSectionEl.classList.contains('hidden')){
                currentWeatherSectionEl.classList.remove('hidden');
            };
            let weatherUrl = 'http://api.openweathermap.org/geo/1.0/zip?zip=' + searchValue + '&appid=d6785378d43b5947bd65e1cc7f7f5175';
            fetch(weatherUrl)
                .then(function(response){
                    return response.json();
                })
                .then(function(data) {
                    console.log(data);
                    currentCityEl.textContent = data.name + ', ' + data.country;
                    let latLonUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + data.lat + '&lon=' + data.lon + '&appid=d6785378d43b5947bd65e1cc7f7f5175&units=imperial';
                    fetch(latLonUrl)
                        .then(function(response){
                            return response.json();
                        })
                        .then(function(data){
                            console.log(data);
                            currentWindSpeedEl.textContent = data.wind.speed
                            currentTempEl.textContent = data.main.temp
                            currentHumidityEl.textContent = data.main.humidity
                            currentWeatherDescEl.innerHTML = ' <img src="https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png" /> ' + data.weather[0].description
                        })
                });
            fetch(weatherUrl)
                .then(function(response){
                    return response.json();
                })
                .then(function(data){
                    let fiveDayUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + data.lat + '&lon=' + data.lon + '&appid=d6785378d43b5947bd65e1cc7f7f5175&units=imperial'
                    fetch(fiveDayUrl)
                        .then(function(response){
                            return response.json();
                        })
                        .then(function(data){
                            console.log(data);
                            dayOneWeatherDescEl.innerHTML = ' <img src="https://openweathermap.org/img/wn/' + data.list[0].weather[0].icon + '@2x.png" /> ' + data.list[0].weather[0].description
                            dayTwoWeatherDescEl.innerHTML = ' <img src="https://openweathermap.org/img/wn/' + data.list[1].weather[0].icon + '@2x.png" /> ' + data.list[1].weather[0].description
                            dayThreeWeatherDescEl.innerHTML = ' <img src="https://openweathermap.org/img/wn/' + data.list[2].weather[0].icon + '@2x.png" /> ' + data.list[2].weather[0].description
                            dayFourWeatherDescEl.innerHTML = ' <img src="https://openweathermap.org/img/wn/' + data.list[3].weather[0].icon + '@2x.png" /> ' + data.list[3].weather[0].description
                            dayFiveWeatherDescEl.innerHTML = ' <img src="https://openweathermap.org/img/wn/' + data.list[4].weather[0].icon + '@2x.png" /> ' + data.list[4].weather[0].description

                            dayOneTempEl.textContent = data.list[0].main.temp
                            dayTwoTempEl.textContent = data.list[1].main.temp
                            dayThreeTempEl.textContent = data.list[2].main.temp
                            dayFourTempEl.textContent = data.list[3].main.temp
                            dayFiveTempEl.textContent = data.list[4].main.temp

                            dayOneHumidityEl.textContent = data.list[0].main.humidity
                            dayTwoHumidityEl.textContent = data.list[1].main.humidity
                            dayThreeHumidityEl.textContent = data.list[2].main.humidity
                            dayFourHumidityEl.textContent = data.list[3].main.humidity
                            dayFiveHumidityEl.textContent = data.list[4].main.humidity
                            
                            dayOneWindEl.textContent = data.list[0].wind.speed
                            dayTwoWindEl.textContent = data.list[1].wind.speed
                            dayThreeWindEl.textContent = data.list[2].wind.speed
                            dayFourWindEl.textContent = data.list[3].wind.speed
                            dayFiveWindEl.textContent = data.list[4].wind.speed
                        })
                });
        } else {
            alert('please enter a valid zip code');
        } 
    }
    searchValue = '';
    currentDateEl.textContent = dayjs().format('M/DD/YYYY');
};


function showFiveDayForecast() {
    if (fiveDayForecastEl.classList.contains('hidden')){
        fiveDayForecastEl.classList.remove('hidden');
    };
}



searchBarForm.addEventListener('submit', handleSearch);
headerLogoBtn.addEventListener('click', function(){
    location.reload();
    window.scrollTo(0, 0);
});