var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=d6785378d43b5947bd65e1cc7f7f5175'

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

var dayOneDayEl = document.getElementById('day1-dayOfWeek');
var dayOneDateEl = document.getElementById('day1-date');
var dayTwoDayEl = document.getElementById('day2-dayOfWeek');
var dayTwoDateEl = document.getElementById('day2-date');
var dayThreeDayEl = document.getElementById('day3-dayOfWeek');
var dayThreeDateEl = document.getElementById('day3-date');
var dayFourDayEl = document.getElementById('day4-dayOfWeek');
var dayFourDateEl = document.getElementById('day4-date');
var dayFiveDayEl = document.getElementById('day5-dayOfWeek');
var dayFiveDateEl = document.getElementById('day5-date');

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

                            dayOneDayEl.textContent = dayjs().add(1,'day').format('dddd');
                            dayOneDateEl.textContent = dayjs().add(1,'day').format('M/D/YYYY');
                            dayTwoDayEl.textContent = dayjs().add(2,'day').format('dddd');
                            dayTwoDateEl.textContent = dayjs().add(2,'day').format('M/D/YYYY');
                            dayThreeDayEl.textContent = dayjs().add(3,'day').format('dddd');
                            dayThreeDateEl.textContent = dayjs().add(3,'day').format('M/D/YYYY');
                            dayFourDayEl.textContent = dayjs().add(4,'day').format('dddd');
                            dayFourDateEl.textContent = dayjs().add(4,'day').format('M/D/YYYY');
                            dayFiveDayEl.textContent = dayjs().add(5,'day').format('dddd');
                            dayFiveDateEl.textContent = dayjs().add(5,'day').format('M/D/YYYY');
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

                            dayOneDayEl.textContent = dayjs().add(1,'day').format('dddd');
                            dayOneDateEl.textContent = dayjs().add(1,'day').format('M/D/YYYY');
                            dayTwoDayEl.textContent = dayjs().add(2,'day').format('dddd');
                            dayTwoDateEl.textContent = dayjs().add(2,'day').format('M/D/YYYY');
                            dayThreeDayEl.textContent = dayjs().add(3,'day').format('dddd');
                            dayThreeDateEl.textContent = dayjs().add(3,'day').format('M/D/YYYY');
                            dayFourDayEl.textContent = dayjs().add(4,'day').format('dddd');
                            dayFourDateEl.textContent = dayjs().add(4,'day').format('M/D/YYYY');
                            dayFiveDayEl.textContent = dayjs().add(5,'day').format('dddd');
                            dayFiveDateEl.textContent = dayjs().add(5,'day').format('M/D/YYYY');
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