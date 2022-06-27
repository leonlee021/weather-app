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
    document.body.style.backgroundImage = 'url("clear.jpg")';

    form.addEventListener("submit",function(e){
        e.preventDefault();
        chooseLocation(searchedLocation.value);
        return;
    })

    // unitSwitch.addEventListener("click", function(e){
    //     e.preventDefault();
    //     if (currentUnit == 'c'){
    //         currentUnit = 'f';
    //         chooseLocation(searchedLocation.value);
    //         return;
    //     }
    //     else{
    //         currentUnit = 'c';
    //         chooseLocation(searchedLocation.value);
    //         return;
    //     }
    // })

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
            if (unitSwitch.checked){
                temperature.textContent = Math.trunc((response.main.temp - 273.15) * 9/5 + 32) + "°F";
                feelsLike.textContent = "Feels Like " + Math.trunc(((response.main.feels_like - 273.15) * 9/5 + 32)) + "°F";
            }
            else{
                temperature.textContent = Math.trunc(response.main.temp - 273.15) + "°C";
                feelsLike.textContent = "Feels Like " + Math.trunc((response.main.feels_like - 273.15)) + "°C";
            }
            humidity.textContent = "Humidity: " + response.main.humidity;
            windSpeed.textContent = "Wind Speed: " + response.wind.speed;
            unitSwitch.addEventListener("change",()=>{
                if (unitSwitch.checked){
                    setTimeout(()=>{
                        temperature.textContent = Math.trunc((response.main.temp - 273.15) * 9/5 + 32) + "°F";
                        feelsLike.textContent = "Feels Like " + Math.trunc(((response.main.feels_like - 273.15) * 9/5 + 32)) + "°F";
                    }, 150);
                }else{
                    setTimeout(()=>{
                        temperature.textContent = Math.trunc(response.main.temp - 273.15) + "°C";
                        feelsLike.textContent = "Feels Like " + Math.trunc((response.main.feels_like - 273.15)) + "°C";
                    }, 150);
                }
            })
        })
        return;
    }


    return {};
})();




