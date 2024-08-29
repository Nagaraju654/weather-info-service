const fetch = require("node-fetch");
const readlineSync = require("readline-sync");

const MY_API_KEY = "c6465c23d07551db5312cfd635f78c59";
const city = readlineSync.question("Enter the city name: ");

const BASE_URL = "http://api.weatherstack.com/current";
const options = {
  method: "GET",
};

async function getWeather(city) {
  try {
    const response = await fetch(`${BASE_URL}?access_key=${MY_API_KEY}&query=${city}`, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      console.error("Error:", data.error.info);
      return;
    }

    const { temperature, weather_descriptions, humidity, wind_speed } =
      data.current;
    console.log(`Weather in ${city}:`);
    console.log(`Temperature: ${temperature}°C`);
    console.log(`Description: ${weather_descriptions.join(", ")}`);
    console.log(`Humidity: ${humidity}%`);
    console.log(`Wind Speed: ${wind_speed} km/h`);
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
  }
}

if (!city) {
  console.log("City name is required.");
  process.exit(1);
}

getWeather(city);
