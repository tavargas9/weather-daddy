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


function handleSearch(){
    // event.preventDefault();
    var searchValue = searchInput.value;
    //checks if searching by City or Zip:
    if (searchTypeSelector.value === 'City'){
        //if searching by City, follwing function executes:
        getCityForecast(searchValue);
    } else { 
        //if searching for zip, following code executes:  
        getZipForecast(searchValue);
    };
    searchValue = '';
    currentDateEl.textContent = dayjs().format('M/D/YYYY');
};


function showFiveDayForecast() {
    if (fiveDayForecastEl.classList.contains('hidden')){
        fiveDayForecastEl.classList.remove('hidden');
    };
}

function hideHeroSection() {
    if (!heroSection.classList.contains('hidden')){
        heroSection.classList.add('hidden');
        };
}

function showWeatherSection() {
    if (currentWeatherSectionEl.classList.contains('hidden')){
        currentWeatherSectionEl.classList.remove('hidden');
    };
}

function getCityForecast(input) {
    if (input) {
        //follwing URL returns latitude and longitude by city name:
        let weatherUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + input + '&limit=5&appid=d6785378d43b5947bd65e1cc7f7f5175';
        fetch(weatherUrl)
            .then(function(response){
                if (response.ok) {
                return response.json();
                } else {
                    alert('Error: ' + response.status);
                }
            })
            .then(function(data) {
                if (data.length !== 0) {
                    displayCurrentCityForecast(data);
                    showFiveDayForecast();
                    hideHeroSection();
                    showWeatherSection();
                } else {
                    alert('Please enter a valid location');
                    return;
                };
                
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
                        display5DayForecast(data);
                    });
            });
    } else {
        alert('Please enter a location');
    };
};

function getZipForecast(input) {
    if (input) {
        //follwing URL returns latitude and longitude by zip:
        let weatherUrl = 'https://api.openweathermap.org/geo/1.0/zip?zip=' + input + '&appid=d6785378d43b5947bd65e1cc7f7f5175';
        fetch(weatherUrl)
            .then(function(response){
                if (response.ok) {
                return response.json();
                } else {
                    alert('No location found. Please enter a vaild zip code.')
                    return;
                }
            })
            .then(function(data) {
                displayCurrentZipForecast(data);
                showFiveDayForecast();
                hideHeroSection();
                showWeatherSection();
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
                        display5DayForecast(data);
                    })
            });
    } else {
        alert('please enter a valid zip code');
    }
}

function display5DayForecast (forecast) {
    for(var i = 0; i < 5; i++){
        weatherDescElements[i].innerHTML = ' <img src="https://openweathermap.org/img/wn/' + forecast.list[i].weather[0].icon + '@2x.png" /> ' + forecast.list[i].weather[0].description
    };
    for(var i = 0; i < 5; i++){
        tempElements[i].textContent = forecast.list[i].main.temp
    };
    for(var i = 0; i < 5; i++){
        humidityElements[i].textContent = forecast.list[i].main.humidity
    };
    for(var i = 0; i < 5; i++){
        windElements[i].textContent = forecast.list[i].wind.speed
    };
    for(var i = 1; i < 6; i++){
        dayOfWeekElements[i].textContent = dayjs().add(i,'day').format('dddd')
    };
    for(var i = 1; i < 6; i++){
        dateElements[i].textContent = dayjs().add(i,'day').format('M/D/YYYY')
    };
};

function displayCurrentCityForecast(forecast) {
    currentCityEl.textContent = forecast[0].name + ', ' + forecast[0].state + ', ' + forecast[0].country;
    //Following URL takes latitude and longitude and gets an array with weather data:
    let latLonUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + forecast[0].lat + '&lon=' + forecast[0].lon + '&appid=d6785378d43b5947bd65e1cc7f7f5175&units=imperial';
    fetch(latLonUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(forecast){
            currentWindSpeedEl.textContent = forecast.wind.speed
            currentTempEl.textContent = forecast.main.temp
            currentHumidityEl.textContent = forecast.main.humidity
            currentWeatherDescEl.innerHTML = ' <img src="https://openweathermap.org/img/wn/' + forecast.weather[0].icon + '@2x.png" /> ' + forecast.weather[0].description
        });
};

function displayCurrentZipForecast(forecast) {
    currentCityEl.textContent = forecast.name + ', ' + forecast.country;
    //Following URL takes latitude and longitude and gets an array with weather data:
    let latLonUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + forecast.lat + '&lon=' + forecast.lon + '&appid=d6785378d43b5947bd65e1cc7f7f5175&units=imperial';
    fetch(latLonUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(forecast){
            currentWindSpeedEl.textContent = forecast.wind.speed
            currentTempEl.textContent = forecast.main.temp
            currentHumidityEl.textContent = forecast.main.humidity
            currentWeatherDescEl.innerHTML = ' <img src="https://openweathermap.org/img/wn/' + forecast.weather[0].icon + '@2x.png" /> ' + forecast.weather[0].description
        })
}

function getRandomLatitude() {
    // Generate a random number between -9000 and 9000
    const randomNumber = Math.floor(Math.random() * 18001) - 9000;
    // Set the random number to have two decimal places
    const scaledNumber = randomNumber / 100;
    return scaledNumber;
};

function getRandomLongitude() {
    // Generate a random number between -18000 and 18000
    const randomNumber = Math.floor(Math.random() * 36001) - 18000;
    // Set the random number to have two decimal places
    const scaledNumber = randomNumber / 100;
    return scaledNumber;
};
  
function showRandomForecast (randomLat, randomLon) {
    var randomLat = getRandomLatitude();
    var randomLon = getRandomLongitude();

    let latLonUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + randomLat + '&lon=' + randomLon + '&appid=d6785378d43b5947bd65e1cc7f7f5175&units=imperial';
    fetch(latLonUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        displayRandomForecast(data);
    })

    let fiveDayUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + randomLat + '&lon=' + randomLon + '&appid=d6785378d43b5947bd65e1cc7f7f5175&units=imperial'
    fetch(fiveDayUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        display5DayForecast(data);
    });
};

function displayRandomForecast(forecast) {
    //checks whether randomLat and randomLon is in a named location and runs functions until it is true.
    if (!forecast.name){
        getRandomLatitude();
        getRandomLongitude();
        var randomLa = getRandomLatitude();
        var randomLo = getRandomLongitude();
        showRandomForecast(randomLa, randomLo);
    } else {
        hideHeroSection();
        showWeatherSection();
        showFiveDayForecast();
        currentCityEl.textContent = forecast.name + ', ' + forecast.sys.country
        currentWindSpeedEl.textContent = forecast.wind.speed
        currentTempEl.textContent = forecast.main.temp
        currentHumidityEl.textContent = forecast.main.humidity
        currentWeatherDescEl.innerHTML = ' <img src="https://openweathermap.org/img/wn/' + forecast.weather[0].icon + '@2x.png" /> ' + forecast.weather[0].description
        currentDateEl.textContent = dayjs().format('M/D/YYYY');
    };
};

var randomForecastBtn = document.getElementById('random-forecast-btn');

randomForecastBtn.addEventListener('click', showRandomForecast);


searchBarForm.addEventListener('submit', function(event){
    event.preventDefault();
    handleSearch();
    pushHistory();
});
searchBtn.addEventListener('click', function(){
    window.scrollTo(0, 0);
});
headerLogoBtn.addEventListener('click', function(){
    location.reload();
    window.scrollTo(0, 0);
});


var searchHistorySection = document.getElementById('previous-searches-section');
var searchHistoryList = document.getElementById('previous-searches-list');
var searchHistory = [];

function renderHistory() {
    searchHistoryList.innerHTML = '';
    for (var i = 0; i < searchHistory.length; i++) {
        var historyItem = searchHistory[i];
        var li = document.createElement('li');
        li.innerHTML = '<li class="w-full px-4 py-2 border-b border-gray-200 cursor-pointer">' + historyItem + '</li>';
        searchHistoryList.appendChild(li);
    };
};

// This function is being called below and will run when the page loads.
function init() {
    // Get stored history from localStorage
    var storedHistory = JSON.parse(localStorage.getItem("searchHistory"));
  
    // If history is retrieved from localStorage, update the searchHistory array to it
    if (storedHistory !== null) {
      searchHistory = storedHistory;
    }

    renderHistory();
};

function storeHistory() {
    // Stringify and set key in localStorage to todos array
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
};

function pushHistory() {
    var searchText = searchInput.value.trim();
    if (searchText === '') {
        return;
    }
    searchHistory.push(searchText);
    searchInput.value = '';
    storeHistory();
    renderHistory();
    showHistory();
};

function showHistory() {
    if (searchHistorySection.classList.contains('hidden')) {
        searchHistorySection.classList.remove('hidden');
    };
};

searchHistoryList.addEventListener('click', function(event){
    var element = event.target;

    if (element.matches('li') === true) {
        var searchForThis = element.textContent;
        console.log(searchForThis);
            //checks if searching by City or Zip:
        if (!isNaN(searchForThis)){
            //if searching by City, follwing function executes:
            getZipForecast(searchForThis);
        } else { 
            //if searching for zip, following code executes:  
            getCityForecast(searchForThis);
        };
        currentDateEl.textContent = dayjs().format('M/D/YYYY');
        window.scrollTo(0, 0);
    };
})

var viewHistoryBtn = document.getElementById('view-history-btn');

viewHistoryBtn.addEventListener('click', function(event) {
    event.preventDefault();
    hideHeroSection();
    showHistory();
});

var clearHistoryBtn = document.getElementById('clear-history-btn');

clearHistoryBtn.addEventListener('click', function(){
    localStorage.clear();
    location.reload();
});



init();