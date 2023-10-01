var searchBarForm =  document.getElementById('search-bar');
var searchTypeSelector = document.getElementById('search-type');
var searchInput = document.getElementById('search-input');
var searchBtn = document.getElementById('search-btn');
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

var dateElements = [
    'null',
    document.getElementById('day1-date'),
    document.getElementById('day2-date'),
    document.getElementById('day3-date'),
    document.getElementById('day4-date'),
    document.getElementById('day5-date')
];
var dayOfWeekElements = [
    'null',
    document.getElementById('day1-dayOfWeek'),
    document.getElementById('day2-dayOfWeek'),
    document.getElementById('day3-dayOfWeek'),
    document.getElementById('day4-dayOfWeek'),
    document.getElementById('day5-dayOfWeek')
];
var humidityElements = [
    document.getElementById('day1-humidity'),
    document.getElementById('day2-humidity'),
    document.getElementById('day3-humidity'),
    document.getElementById('day4-humidity'),
    document.getElementById('day5-humidity') 
];
var weatherDescElements = [
    document.getElementById('day1-weather-desc'),
    document.getElementById('day2-weather-desc'),
    document.getElementById('day3-weather-desc'),
    document.getElementById('day4-weather-desc'),
    document.getElementById('day5-weather-desc')
];
var tempElements = [
    document.getElementById('day1-temp'),
    document.getElementById('day2-temp'),
    document.getElementById('day3-temp'),
    document.getElementById('day4-temp'),
    document.getElementById('day5-temp')
];
var windElements = [
    document.getElementById('day1-wind'),
    document.getElementById('day2-wind'),
    document.getElementById('day3-wind'),
    document.getElementById('day4-wind'),
    document.getElementById('day5-wind')
]


function handleSearch(event){
    event.preventDefault();
    var searchValue = searchInput.value;
    console.log(searchValue);
    //checks if searching by City or Zip:
    if (searchTypeSelector.value === 'City'){
        //if searching by City, follwing code executes:
        if (searchValue) {
            showFiveDayForecast();
            if (!heroSection.classList.contains('hidden')){
            heroSection.classList.add('hidden');
            };
            if (currentWeatherSectionEl.classList.contains('hidden')){
                currentWeatherSectionEl.classList.remove('hidden');
            };
            //follwing URL returns latitude and longitude by city name:
            let weatherUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchValue + '&limit=5&appid=d6785378d43b5947bd65e1cc7f7f5175';
            fetch(weatherUrl)
                .then(function(response){
                    return response.json();
                })
                .then(function(data) {
                    console.log(data);
                    currentCityEl.textContent = data[0].name + ', ' + data[0].state + ', ' + data[0].country;
                    //Following URL takes latitude and longitude and gets an array with weather data:
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
                            for(var i = 0; i < 5; i++){
                                weatherDescElements[i].innerHTML = ' <img src="https://openweathermap.org/img/wn/' + data.list[i].weather[0].icon + '@2x.png" /> ' + data.list[i].weather[0].description
                            };
                            for(var i = 0; i < 5; i++){
                                tempElements[i].textContent = data.list[i].main.temp
                            };
                            for(var i = 0; i < 5; i++){
                                humidityElements[i].textContent = data.list[i].main.humidity
                            };
                            for(var i = 0; i < 5; i++){
                                windElements[i].textContent = data.list[i].wind.speed
                            };
                            for(var i = 1; i < 6; i++){
                                dayOfWeekElements[i].textContent = dayjs().add(i,'day').format('dddd')
                            };
                            for(var i = 1; i < 6; i++){
                                dateElements[i].textContent = dayjs().add(i,'day').format('M/D/YYYY')
                            };
                        });
                });
        } else {
            alert('Invalid search');
        } 
    } else { //if searching for zip, following code executes: 
        if (searchValue) {
            showFiveDayForecast();
            if (!heroSection.classList.contains('hidden')){
            heroSection.classList.add('hidden');
            };
            if (currentWeatherSectionEl.classList.contains('hidden')){
                currentWeatherSectionEl.classList.remove('hidden');
            };
            //follwing URL returns latitude and longitude by zip:
            let weatherUrl = 'http://api.openweathermap.org/geo/1.0/zip?zip=' + searchValue + '&appid=d6785378d43b5947bd65e1cc7f7f5175';
            fetch(weatherUrl)
                .then(function(response){
                    return response.json();
                })
                .then(function(data) {
                    console.log(data);
                    currentCityEl.textContent = data.name + ', ' + data.country;
                    //Following URL takes latitude and longitude and gets an array with weather data:
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
                            for(var i = 0; i < 5; i++){
                                weatherDescElements[i].innerHTML = ' <img src="https://openweathermap.org/img/wn/' + data.list[i].weather[0].icon + '@2x.png" /> ' + data.list[i].weather[0].description
                            };
                            for(var i = 0; i < 5; i++){
                                tempElements[i].textContent = data.list[i].main.temp
                            };
                            for(var i = 0; i < 5; i++){
                                humidityElements[i].textContent = data.list[i].main.humidity
                            };
                            for(var i = 0; i < 5; i++){
                                windElements[i].textContent = data.list[i].wind.speed
                            };
                            for(var i = 1; i < 6; i++){
                                dayOfWeekElements[i].textContent = dayjs().add(i,'day').format('dddd')
                            };
                            for(var i = 1; i < 6; i++){
                                dateElements[i].textContent = dayjs().add(i,'day').format('M/D/YYYY')
                            };
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
searchBtn.addEventListener('click', function(){
    window.scrollTo(0, 0);
});
headerLogoBtn.addEventListener('click', function(){
    location.reload();
    window.scrollTo(0, 0);
});