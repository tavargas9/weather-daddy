var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=d6785378d43b5947bd65e1cc7f7f5175'

fetch(requestUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    });