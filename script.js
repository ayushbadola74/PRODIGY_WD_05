// Your OpenWeather API key
const apiKey = "4c2b50089058485c5d739f8c95092a8a";

// Select elements
const input = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const cityTitle = document.getElementById("cityTitle");
const tempEl = document.getElementById("temp");
const tempMeta = document.getElementById("temp_meta");
const humidityEl = document.getElementById("humidity");
const humidityMeta = document.getElementById("humidity_meta");
const windSpeedEl = document.getElementById("wind_speed");
const windMeta = document.getElementById("wind_meta");
const errorEl = document.getElementById("error");

// Helper to convert wind speed
const toKmHr = (ms) => (ms * 3.6).toFixed(2);

// Fetch weather function
async function fetchWeather(city) {
  try {
    // Show loading message
    errorEl.textContent = "⏳ Fetching weather...";

    // API endpoint
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Fetch data
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found ❌");
    }

    const data = await response.json();

    // Clear error
    errorEl.textContent = "";

    // Update UI
    cityTitle.textContent = `${data.name}, ${data.sys.country}`;
    tempEl.textContent = `${data.main.temp}°C`;
    tempMeta.textContent = `Feels like: ${data.main.feels_like}°C`;
    humidityEl.textContent = `${data.main.humidity}%`;
    humidityMeta.textContent = `Pressure: ${data.main.pressure} hPa`;
    windSpeedEl.textContent = `${toKmHr(data.wind.speed)} km/h`;
    windMeta.textContent = `Direction: ${data.wind.deg}°`;

  } catch (error) {
    errorEl.textContent = error.message;
    clearWeather();
  }
}

// Clear weather info if error
function clearWeather() {
  cityTitle.textContent = "";
  tempEl.textContent = "";
  tempMeta.textContent = "";
  humidityEl.textContent = "";
  humidityMeta.textContent = "";
  windSpeedEl.textContent = "";
  windMeta.textContent = "";
}

// Event listener for button
searchBtn.addEventListener("click", () => {
  const city = input.value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    errorEl.textContent = "⚠ Please enter a city name!";
    clearWeather();
  }
});

// ✅ Load default city on startup
window.addEventListener("load", () => {
  fetchWeather("Delhi"); // You can change default city
});
