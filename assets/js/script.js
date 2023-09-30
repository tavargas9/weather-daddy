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

function handleSearch(event){
    event.preventDefault();
    var searchValue = searchInput.value;
    console.log(searchValue);
    if (searchTypeSelector.value === 'City'){
        if (searchValue) {
            if (!heroSection.classList.contains('hidden')){
            heroSection.classList.add('hidden');
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
        } else {
            alert('Invalid search');
        } 
    } else {
        if (searchValue) {
            if (!heroSection.classList.contains('hidden')){
            heroSection.classList.add('hidden');
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
                        });
                });
        } else {
            alert('please enter a valid zip code');
        } 
    }
    searchValue = '';
};



searchBarForm.addEventListener('submit', handleSearch);
headerLogoBtn.addEventListener('click', function(){
    location.reload();
    window.scrollTo(0, 0);
});