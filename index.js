
//Weather Page

const button = document.getElementById('submit-btn');

button.addEventListener("click",()=> {
  const city = document.getElementById("city-input").value.trim();

  if(city){
    getCoordinates(city);
  }
})


function getCoordinates(city) {
     fetch(`https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(city)}&format=json&limit=1`, {
        headers: {
            'User-Agent': 'WeatherApp/1.0 (you@example.com)'
          }
        })

        .then(response => response.json())
    
        .then((data) => {
            console.log(data)
            if(data.length > 0){
                const lat = data[0].lat;
                const lon = data[0].lon;
                getWeather(lat, lon, city);
            } else{
                document.getElementById("errorMessage").textContent = "City not Found!"
            }
        })

        .catch(error => {
            console.error(error);
            document.getElementById("errorMessage").textContent="Location not Found!"
        })

        
    }


    function getWeather(lat, lon, city){
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=fahrenheit&timezone=auto`
        fetch(url)
        .then(response => response.json())
        .then((data) => {
            const temp = data.current_weather?.temperature;
            const wind = data.current_weather?.windspeed;
            document.getElementById("weather-card").innerHTML = `
              <div class="found_city">
              <h2>Weather in ${city}</h2>
              <p>Temperature: ${temp}°F</p>
              <p>Wind Speed: ${wind} mph</p>
              </div>
            `;
        })

        .catch(error => {
            console.error(error);
        document.getElementById("errorMessage").textContent="Error fetching weather data."
        });

    }


    

  





     









 