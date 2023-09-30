var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=d6785378d43b5947bd65e1cc7f7f5175'

var searchBarForm =  document.getElementById('search-bar');
var searchTypeSelector = document.getElementById('search-type');
var searchInput = document.getElementById('search-input');
var currentCityEl = document.getElementById('current-city');
var currentTempEl = document.getElementById('current-temp');
var currentHumidityEl = document.getElementById('current-humidity');
var currentWindSpeedEl = document.getElementById('current-windspeed');

function handleSearch(event){
    event.preventDefault();
    var searchValue = searchInput.value;
    console.log(searchValue);
    if (searchValue) {
        let weatherUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchValue + '&limit=5&appid=d6785378d43b5947bd65e1cc7f7f5175';
        fetch(weatherUrl)
            .then(function(response){
                return response.json();
            })
            .then(function(data) {
                console.log(data);
                console.log(data[0].lat, data[0].lon);
                currentCityEl.textContent = data[0].name + ', ' + data[0].state + ', ' + data[0].country;
                let latLonUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + data[0].lat + '&lon=' + data[0].lon + '&appid=d6785378d43b5947bd65e1cc7f7f5175&units=imperial';
                fetch(latLonUrl)
                    .then(function(response){
                        return response.json();
                    })
                    .then(function(data){
                        console.log(data);
                        console.log(data.wind.speed);
                        console.log(data.main.temp);
                        console.log(data.main.humidity);
                        currentWindSpeedEl.textContent = data.wind.speed
                        currentTempEl.textContent = data.main.temp
                        currentHumidityEl = data.main.humidity
                    });
            });
        searchValue = '';
    } else {
        alert('Invalid search');
    } 
};



searchBarForm.addEventListener('submit', handleSearch);