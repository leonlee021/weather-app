const flow = (() => {
    const searchedLocation = document.getElementById('location');
    const form = document.querySelector('form');
    const locationHeading = document.getElementById('location-heading');
    const weatherDescription = document.getElementById('weather-description');
    const temperature = document.getElementById('temperature');
    const feelsLike = document.getElementById('feels-like');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');

    chooseLocation('Seoul');

    form.addEventListener("submit",function(e){
        e.preventDefault();
        chooseLocation(searchedLocation.value);
        return;
    })

    function chooseLocation(locationString){
        let newLink = 'http://api.openweathermap.org/data/2.5/weather?q=' + String(locationString) + '&APPID=f5e7fe8879505a14d5c08da2de2f74c8';
        fetchData(newLink);
    }
    
    function fetchData(link){
        fetch(link, {mode: 'cors'})
        .then(function(response){
            return response.json();
        })
        .then(function(response){
            console.log(response);
            locationHeading.textContent = response.name;
            weatherDescription.textContent = response.weather[0].description;
            temperature.textContent = response.main.temp;
            feelsLike.textContent = "Feels Like " + response.main.feels_like;
            humidity.textContent = "Humidity: " + response.main.humidity;
            windSpeed.textContent = "Wind Speed: " + response.wind.speed;
        })
        return;
    }

    return {};
})();




