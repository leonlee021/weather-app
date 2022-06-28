const flow = (() => {
    const searchedLocation = document.getElementById('location');
    const form = document.querySelector('form');
    const locationHeading = document.getElementById('location-heading');
    const weatherDescription = document.getElementById('weather-description');
    const temperature = document.getElementById('temperature');
    const feelsLike = document.getElementById('feels-like');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');
    const unitSwitch = document.querySelector('[switch]');

    // let currentUnit = 'c';

    chooseLocation('Seoul');

    form.addEventListener("submit",function(e){
        e.preventDefault();
        chooseLocation(searchedLocation.value);
        return;
    })

    function timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        if (min < 10){
            min = "0" + min;
        }
        if (hour > 12){
            var time = date + ' ' + month + ' ' + year + ' ' + (hour - 12) + ':' + min + ' PM';
        }
        else{
            var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ' AM';
        }
        return time;
      }

    function chooseLocation(locationString){
        let newLink = 'https://api.openweathermap.org/data/2.5/weather?q=' + String(locationString) + '&APPID=f5e7fe8879505a14d5c08da2de2f74c8';
        fetchData(newLink);
    }
    
    function fetchData(link){
        fetch(link, {mode: 'cors'})
        .then(function(response){
            return response.json();
        })
        .then(function(response){
            console.log(response);
            locationHeading.textContent = response.name + ", " + response.sys.country;
            weatherDescription.textContent = response.weather[0].description;
            if (unitSwitch.checked){
                temperature.textContent = Math.trunc((response.main.temp - 273.15) * 9/5 + 32) + "°F";
                feelsLike.textContent = "Feels Like: " + Math.trunc(((response.main.feels_like - 273.15) * 9/5 + 32)) + "°F";
            }
            else{
                temperature.textContent = Math.trunc(response.main.temp - 273.15) + "°C";
                feelsLike.textContent = "Feels Like: " + Math.trunc((response.main.feels_like - 273.15)) + "°C";
            }
            humidity.textContent = "Humidity: " + response.main.humidity + "%";
            windSpeed.textContent = timeConverter(response.dt - 32400 + response.timezone);
            unitSwitch.addEventListener("change",()=>{
            if (unitSwitch.checked){
                setTimeout(()=>{
                    temperature.textContent = Math.trunc((response.main.temp - 273.15) * 9/5 + 32) + "°F";
                    feelsLike.textContent = "Feels Like: " + Math.trunc(((response.main.feels_like - 273.15) * 9/5 + 32)) + "°F";
                }, 150);
            }else{
                setTimeout(()=>{
                    temperature.textContent = Math.trunc(response.main.temp - 273.15) + "°C";
                    feelsLike.textContent = "Feels Like: " + Math.trunc((response.main.feels_like - 273.15)) + "°C";
                }, 150);
            }
            })
            if (response.weather[0].main == 'Rain'){
                document.body.style.backgroundImage = 'url("images/rain.jpeg")';
                if (response.weather[0].description == 'light rain' || response.weather[0].description == 'moderate rain'){
                    document.body.style.backgroundImage = 'url("images/light-rain.jpeg")';
                }
            }
            else if (response.weather[0].main == 'Fog' || response.weather[0].main == 'Mist' || response.weather[0].main == 'Haze' || 
            response.weather[0].main == 'Dust' || response.weather[0].main == 'Smoke' || response.weather[0].main == 'Sand' || 
            response.weather[0].main == 'Ash' || response.weather[0].main == 'Squall' || response.weather[0].main == 'Tornado'){
                document.body.style.backgroundImage = 'url("images/atmosphere.jpeg")';
            }
            else if (response.weather[0].main == 'Clear'){
                document.body.style.backgroundImage = 'url("images/clear.jpeg")';
            }
            else if (response.weather[0].main == 'Drizzle'){
                document.body.style.backgroundImage = 'url("images/light-rain.jpeg")';
            }
            else if (response.weather[0].main == 'Snow'){
                document.body.style.backgroundImage = 'url("images/snow.jpeg")';
            }
            else if (response.weather[0].main == 'Thunderstorm'){
                document.body.style.backgroundImage = 'url("images/thunderstorm.jpg")';
            }
            else if (response.weather[0].main == 'Clouds'){
                document.body.style.backgroundImage = 'url("images/cloud.jpeg")';
                if (response.weather[0].description == 'overcast clouds'){
                    document.body.style.backgroundImage = 'url("images/overcast-clouds.jpeg")';
                }
                if (response.weather[0].description == 'few clouds'){
                    document.body.style.backgroundImage = 'url("images/light-clouds.jpeg")';
                }
            }
        })
        return;
    }


    return {};
})();




