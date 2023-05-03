const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
});

app.post("/index.html", function (req, res) {
    const query = req.body.cityName;
    const apiKey = "8120e07ede826efd7a89377bb532cd71";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function (response) {
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            const cityName = weatherData.name;
            const feelsLike = weatherData.main.feels_like;
            const humidity = weatherData.main.humidity;
            const pressure = weatherData.main.pressure;
            const windSpeed = weatherData.wind.speed;
            const sunrise = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });
            const sunset = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });

            const html = `
                <!DOCTYPE html>
                <html lang='en'>
                <head>
                    <meta charset='UTF-8'>
                    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                    <title>Weather App</title>
                    <style>
                    body {
                        background: linear-gradient(to bottom, #1b2835, #33def8);
                        font-family: cursive;
                        color: #fff;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                      }
                      
                      table {
                        border-collapse: collapse;
                        width: 100%;
                        margin-bottom: 20px;
                      }
                      
                      th, td {
                        text-align: left;
                        padding: 8px;
                      }
                      
                      th {
                        background-color: #4CAF50;
                        color: white;
                      }
                      
                      .temperature {
                        font-weight: bold;
                        font-size: 40px;
                        display: block;
                        margin: 0 auto;
                      }
                      
                      .icon {
                        height: 100px;
                        width: 100px;
                        display: block;
                        margin: 0 auto;
                        border-radius: 75%;
                        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                        background-color: rgba(0, 0, 0, 0.2);
                      }                                           
                      
                      .city-name {
                        font-size: 50px;
                        font-weight: bold;
                        text-transform: capitalize;
                      }
                      
                      .details  {
                        font-weight: bold;
                        font-style: italic;
                        font-size: 30px;
                      }   
                      
                      footer {
                        position: relative;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        text-align: center;
                        padding: 20px;
                        background-color: rgba(0, 0, 0, 0.3);
                        color: #fff;
                        font-size: 15px;
                    }
                    </style>
                </head>
                <body>
                <img src='${imageURL}' alt='weather icon' class='icon'>
                <p class='city-name'>${cityName} --->( ${weatherDescription} )</p>
                <p class='temperature'>${temp}<span class='degree'>°C</span></p>     
                <p class='detail'>Feels like: ${feelsLike}°C</p>
                <p class='detail'>Humidity: ${humidity}%</p>
                <p class='detail'>Pressure: ${pressure}hPa</p>
                <p class='detail'>Wind Speed: ${windSpeed}km/h</p>
                <p class='detail'>Sunrise: ${sunrise}</p>
                <p class='detail'>Sunset: ${sunset}</p>
                <br>
                <footer>
                Made with Love &#169; Danish Shaikh 2023
                </footer>
                </body>
                </html>
            `;
            res.send(html);
        })
    })
})
