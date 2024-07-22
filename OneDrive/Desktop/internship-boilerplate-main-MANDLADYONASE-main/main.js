import "./style.css";
import "./Components/Footer.js";
import { fetchData } from "./utils/Helper.js"; // importing fetchData from helpers module

const alitude = "-33.9258";
const longitude = "18.4232";

const baseURL = `https://api.open-meteo.com/v1/forecast?latitude=${alitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,sunrise,sunset&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;

async function fetchCapeTownWeather() {
  try {
    const data = await fetchData(baseURL);
    console.log(data);
    // Current weather data
    const { temperature_2m, wind_speed_10m } = data.current;

    // Hourly weather data
    const hourlyTemperature = data.hourly.temperature_2m.slice(0, 5);
    const hourlyHumidity = data.hourly.relative_humidity_2m.slice(0, 5);
    const hourlyWindSpeed = data.hourly.wind_speed_10m.slice(0, 5);

    // Daily forecast data
    const dailyForecasts = data.daily;
    const days = dailyForecasts.time.slice(0, 7);
    const maxTemps = dailyForecasts.temperature_2m_max.slice(0, 7);
    const minTemps = dailyForecasts.temperature_2m_min.slice(0, 7);
    const precipitations = dailyForecasts.precipitation_sum.slice(0, 7);
    const sunrises = dailyForecasts.sunrise.slice(0, 7);
    const sunsets = dailyForecasts.sunset.slice(0, 7);

    // Display weather data
    const DisplayWeather = () => {
      content.innerHTML = /*html*/ `
        <div class="dashboard grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <!-- Current Weather Section -->
          <div class="current-weather bg-[ rgba(255, 255, 255, 0.5] p-4 rounded shadow-md">
            <h1 class="text-4xl font-bold mb-4">Cape Town</h1>
            <p class="text-2xl font-bold mb-4">Current Temperature: ${temperature_2m}°C</p>
            <p class="text-2xl font-bold mb-4">Current Wind Speed: ${wind_speed_10m}km/h</p>
          </div>

          <!-- Hourly Weather Section -->


<div class="hourly-weather bg-glass p-4 rounded shadow-md flex flex-col md:flex-row gap-4 lg:flex-row">
  <h2 class="text-3xl text-slate-500 font-bold mb-4">Hourly Weather</h2>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[ rgba(255, 255, 255, 0.5] p-4 rounded shadow-md w-full md:flex-col">
    <div class="hourly-item bg-[ rgba(255, 255, 255, 0.5]">
      <h3 class="text-xl text-slate-900 font-bold mb-2">Temperature</h3>
      <p>${hourlyTemperature.join(", ")}°C</p>
    </div>
    <div class="hourly-item">
      <h3 class="text-xl text-slate-900 font-bold mb-2">Humidity</h3>
      <p>${hourlyHumidity.join(", ")}%</p>
    </div>
    <div class="hourly-item">
      <h3 class="text-xl text-slate-500 font-bold mb-2">Wind Speed</h3>
      <p>${hourlyWindSpeed.join(", ")}km/h</p>
    </div>
  </div>
</div>
          <!-- 7-Day Forecast Section -->
          <div class="daily-forecast bg-[ rgba(255, 255, 255, 0.5] p-4 rounded shadow-md">
            <h2 class="text-3xl font-bold mb-4 text-slate-900">7-Day Forecast</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              ${days
                .map(
                  (day, index) => `
                <div class="daily-item bg-gray-100 p-4 rounded shadow-sm">
                  <h3 class="text-xl font-bold mb-2">${new Date(
                    day
                  ).toLocaleDateString()}</h3>
                  <p class="mb-2">Max Temp: ${maxTemps[index]}°C</p>
                  <p class="mb-2">Min Temp: ${minTemps[index]}°C</p>
                  <p class="mb-2">Precipitation: ${precipitations[index]}mm</p>
                  <p class="mb-2">Sunrise: ${new Date(
                    sunrises[index]
                  ).toLocaleTimeString()}</p>
                  <p class="mb-2">Sunset: ${new Date(
                    sunsets[index]
                  ).toLocaleTimeString()}</p>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        </div>
      `;
    };

    DisplayWeather();
  } catch (error) {
    console.error("Error fetching weather data:", error);
    content.innerHTML =
      "<p>Sorry, there was an error fetching the weather data.</p>";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  fetchCapeTownWeather();
});
