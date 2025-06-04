document.getElementById("get-location-btn").addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto`;

          fetch(url)
            .then(response => {
              if (!response.ok) 
                throw new Error("Weather data error");
              return response.json();
            })
            .then(data => {
              const weather = data.current_weather;
              document.getElementById("weather-output").innerHTML = `
                <h3>Current Weather at Your Location</h3>
                <p> Temperature: ${weather.temperature} °F</p>
                <p> Wind Speed: ${weather.windspeed} mph</p>
                
              `;
            })
            .catch(error => {
              document.getElementById("weather-output").textContent = "Failed to fetch weather data.";
              console.error(error);
            });
        },
        (error) => {
          document.getElementById("weather-output").textContent = "Location access denied or unavailable.";
        }
      );
    } else {
      document.getElementById("weather-output").textContent = "Geolocation is not supported in this browser.";
    }
  });