// Select the necessary elements
const form = document.querySelector("form");
const input = document.querySelector("#cityName");
const weatherDiv = document.querySelector("#weather");

// Event listener for the form submission
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the form from refreshing the page

  const query = input.value; // Get the value of the input field
  const apiKey = "8120e07ede826efd7a89377bb532cd71";
  const unit = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;

  // Fetch the weather data from the API
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Extract the necessary data from the API response
      const temp = data.main.temp;
      const weatherDescription = data.weather[0].description;
      const icon = data.weather[0].icon;
      const imageURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      const cityName = data.name;
      const feelsLike = data.main.feels_like;
      const humidity = data.main.humidity;
      const pressure = data.main.pressure;
      const windSpeed = data.wind.speed;
      const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

      // Update the UI with the weather data
      weatherDiv.innerHTML = `
        <img src="${imageURL}" alt="weather icon" class="icon">
        <p class="city-name">${cityName} (${weatherDescription})</p>
        <p class="temperature">${temp}<span class="degree">°C</span></p>
        <p class="detail">Feels like: ${feelsLike}°C</p>
        <p class="detail">Humidity: ${humidity}%</p>
        <p class="detail">Pressure: ${pressure}hPa</p>
        <p class="detail">Wind Speed: ${windSpeed}km/h</p>
        <p class="detail">Sunrise: ${sunrise}</p>
        <p class="detail">Sunset: ${sunset}</p>
      `;
    })
    .catch((error) => {
      console.log(error);
      weatherDiv.innerHTML = "<p>Something went wrong. Please try again later.</p>";
    });
});
