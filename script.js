// ✅ API KEYS
const OPENWEATHER_KEY = "28c9c07e4563d1e1083997dec3ef8816";
const WEATHERAPI_KEY = "64b0c23ba84b4bf8b05232742251407";
const WEATHERBIT_KEY = "34e905674eb44cb39fb35299810213ab";

// ✅ DOM ELEMENTS
const searchBtn = document.getElementById("search_btn");
const searchInput = document.getElementById("search_city");

const locationElement = document.getElementById("location");
const currentTempElement = document.getElementById("current_temp");
const humidityElement = document.getElementById("humidity");
const windspeedElement = document.getElementById("windspeed");
const realfeelElement = document.getElementById("realfeel");
const aqiElement = document.getElementById("aqi");
const weatherIcon = document.getElementById("weather_png");
const maxTempElement = document.getElementById("max_temp");
const minTempElement = document.getElementById("min_temp");
const timeElement = document.getElementById("time");
const dateElement = document.getElementById("date");
const uvElement = document.getElementById("uv");
const pressureElement = document.getElementById("Pressure");
const visibilityElement = document.getElementById("visibility");
const sunriseSunsetTime = document.getElementById("sunrise_sunset_time");
const suggestionElement = document.getElementById("suggestion");

let currentCity = "London";

// ✅ Background Change Based on Day/Night
function updateBackground(isDay) {
  const bg = document.getElementById("background_scene");
  bg.style.backgroundImage = isDay
    ? 'url("assets/day_scene.png")'
    : 'url("assets/night_scene.png")';
}

// ✅ Suggestion Logic (example: 20 different lines, customize freely)
function generateSuggestion(condition, temp) {
  const t = condition.toLowerCase();

  const suggestionBank = {
    rain: [
      "Don't forget your umbrella, it's rainy! ☔",
      "Rainy day vibes! Watch a movie. 🎬",
      "Grab a warm drink, it's wet outside. ☕",
      "Perfect time for pakoras and chai! 🌧️",
      "Stay dry and drive safe! 🚗💦",
      "Take your raincoat along today! 🧥"
    ],
    cloud: [
      "A bit cloudy, great time for a walk. 🌥️",
      "Good nap time. 😴",
      "Low sunshine, peaceful vibes. 🧘",
      "Take it slow, it's cloudy and calm. ⛅",
      "Maybe a book and tea kind of day. 📚",
      "Some sun might still peek through! ☁️"
    ],
    sunny: [
      "It's sunny outside, perfect for outings! ☀️",
      "Put on your shades, sunshine is out! 🕶️",
      "A good day for a picnic! 🧺",
      "Don't forget sunscreen! 🧴",
      "Sunshine = serotonin! 😄",
      "Take a walk, soak the sun. 🌞"
    ],
    clear: [
      "Clear skies above. 🚀",
      "Perfect stargazing night. 🌌",
      "Nothing but blue sky! 🌤️",
      "Nice and calm weather. 😌",
      "Peaceful atmosphere today. ☁️",
      "Time for outdoor fun! ⚽"
    ],
    snow: [
      "Snowfall ahead! Time for snow fun. ☃️",
      "Wrap up warm, it’s snowing. 🧣",
      "Careful on slippery paths. 🧊",
      "Perfect time for a snowball fight! ❄️",
      "Build a snowman! ☃️",
      "Snowy scenes outside – magical! ✨"
    ],
    fog: [
      "Drive safe, it's foggy. 🌫️",
      "Hard to see? That’s fog for you! 👀",
      "Low visibility – take care. 🛑",
      "Fog brings mystery to the day. 🕵️",
      "Don’t rush, the fog slows everyone. 🐢",
      "Enjoy the cool misty air. 🌁"
    ],
    storm: [
      "Thunderstorm alert! Stay indoors. ⛈️",
      "Power may fluctuate, keep devices charged. 🔋",
      "Avoid open areas. ⚡",
      "Stay cozy inside. 🏠",
      "Secure outdoor things. 💨",
      "Watch nature’s power – from a distance! 🌩️"
    ],
    mist: [
      "Misty morning, stay cozy! 😌",
      "Feel the calm in the air. 🌫️",
      "Perfect mood for introspection. 💭",
      "Mists are mysterious. 🌁",
      "Early dew, dreamy views. 🌄",
      "Like walking through a cloud! ☁️"
    ],
    wind: [
      "It's windy, hold your hat! 💨",
      "Flying leaves and wild hair! 🍂",
      "A windy day is a dramatic day. 🎭",
      "Great kite weather! 🪁",
      "Brace yourself, the breeze is strong. 🌬️",
      "Tuck in loose items outside. 🔧"
    ],
    drizzle: [
      "Light drizzle outside. 🌦️",
      "Might not need an umbrella, but don’t risk it. ☂️",
      "Drizzle and dreams. 💤",
      "Soft rain = soft mood. 💙",
      "Perfect for a cozy hoodie. 🧥",
      "Raindrops are dancing. 💃"
    ],
    haze: [
      "Hazy skies, take precautions. 🌫️",
      "Limit outdoor exercise today. 🚷",
      "Dust in the air, wear a mask. 😷",
      "Air might feel heavy. 💭",
      "Indoor day maybe? 🏠",
      "Visibility reduced, be alert. 🛑"
    ],
    dust: [
      "Dusty outside, wear a mask! 🌪️",
      "Stay indoors if allergic. 🤧",
      "Avoid outdoor runs. 🏃‍♂️",
      "Dry wind ahead. 🌬️",
      "Close your windows! 🚪",
      "Eye protection helps today. 🕶️"
    ],
    overcast: [
      "Overcast day, stay chill. ☁️",
      "Sky’s moody, you stay happy! 😊",
      "Feels like a Netflix day. 📺",
      "Not too bright, not too dark. 🎨",
      "Soft skies overhead. 🌫️",
      "Comfy lighting for photos! 📸"
    ],
    smoke: [
      "Smoky air quality. Be cautious. 🚬",
      "Try to stay indoors. 🏠",
      "Avoid heavy breathing outdoors. 😤",
      "Bad air day. 😷",
      "Check AQI if you're going out. 📱",
      "Smoky conditions, skip the jog. 🏃"
    ],
    ice: [
      "Icy roads ahead, walk carefully. 🧊",
      "Slippery paths, take care. ⚠️",
      "Not a flip-flop day! 👟",
      "Avoid sudden braking if driving. 🚗",
      "Ice = elegance and danger. ❄️",
      "Look down and step steady. 👣"
    ],
    hot: [
      "It's really hot! Stay hydrated. 🔥",
      "Chug that water! 💧",
      "Use sunscreen generously. 🧴",
      "Limit outdoor time. ☀️",
      "Avoid peak heat hours. ⏰",
      "Too hot to handle! 😅"
    ],
    cold: [
      "It's freezing! Wear something warm. ❄️",
      "Time for layers. 🧥🧣",
      "Cold hands, warm heart. ❤️",
      "Breathe out and see fog! 😮‍💨",
      "Use a moisturizer. 🧴",
      "Stay bundled up. 🧤"
    ],
    perfect: [
      "Perfect weather to go out! 🌤️",
      "Enjoy the day, it's just right! 😎",
      "Great day for outdoor fun. 🏃",
      "Balance in the air today. ☯️",
      "Lovely mood, lovely weather. 🎶",
      "Chances are, you’ll smile more today! 😊"
    ]
  };

  // Logic based on condition keywords
  if (t.includes("rain")) return getRandom(suggestionBank.rain);
  if (t.includes("cloud")) return getRandom(suggestionBank.cloud);
  if (t.includes("sunny")) return getRandom(suggestionBank.sunny);
  if (t.includes("clear")) return getRandom(suggestionBank.clear);
  if (t.includes("snow")) return getRandom(suggestionBank.snow);
  if (t.includes("fog")) return getRandom(suggestionBank.fog);
  if (t.includes("storm")) return getRandom(suggestionBank.storm);
  if (t.includes("mist")) return getRandom(suggestionBank.mist);
  if (t.includes("wind")) return getRandom(suggestionBank.wind);
  if (t.includes("drizzle")) return getRandom(suggestionBank.drizzle);
  if (t.includes("haze")) return getRandom(suggestionBank.haze);
  if (t.includes("dust")) return getRandom(suggestionBank.dust);
  if (t.includes("overcast")) return getRandom(suggestionBank.overcast);
  if (t.includes("smoke")) return getRandom(suggestionBank.smoke);
  if (t.includes("ice")) return getRandom(suggestionBank.ice);
  if (temp < 5) return getRandom(suggestionBank.cold);
  if (temp > 35) return getRandom(suggestionBank.hot);
  if (temp >= 20 && temp <= 30) return getRandom(suggestionBank.perfect);

  return "Stay comfortable, whatever the weather! 🍃";
}

// 🔁 Helper function to pick random suggestion
function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}


// ✅ Get Icon Based on Weather Text + Day/Night
function getCustomIcon(conditionText, isDay) {
  const t = conditionText.toLowerCase();
  if (t.includes("heavy rain") || t.includes("torrential")) return "assets/HeavyRainfall.png";
  if (isDay === 1) {
    if (t.includes("sunny") && t.includes("cloud")) return "assets/sunnyCloudy.png";
    if (t.includes("rain")) return "assets/sunnyCloudyRainy.png";
    if (t.includes("sunny") || t.includes("clear")) return "assets/Sunny.png";
  } else {
    if (t.includes("clear")) return "assets/ClearNight.png";
    if (t.includes("cloud")) return "assets/cloudyNight.png";
    if (t.includes("rain")) return "assets/NightWithRain.png";
  }
  return "assets/sunnyCloudy.png";
}

// ✅ Helper: Convert 12h AM/PM to Date Object
function parse12h(timeStr) {
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);
  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;
  return { hours, minutes };
}

function getFullDate(localDateStr, timeStr) {
  const datePart = localDateStr.split(" ")[0];
  const { hours, minutes } = parse12h(timeStr);
  const d = new Date(datePart);
  d.setHours(hours);
  d.setMinutes(minutes);
  return d;
}

// ✅ 1. OpenWeather → Current Weather
async function fetchCurrentWeather(city) {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPENWEATHER_KEY}`);
  if (!res.ok) throw new Error("City not found");
  return res.json();
}

function updateCurrentWeather(data) {
  locationElement.textContent = data.name;
  currentTempElement.textContent = `${Math.round(data.main.temp)}°`;
  humidityElement.textContent = `${data.main.humidity}%`;
  windspeedElement.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
  realfeelElement.textContent = `${Math.round(data.main.feels_like)}°`;
  pressureElement.textContent = `${data.main.pressure} hPa`;
  visibilityElement.textContent = `${Math.floor(data.visibility / 1000)} km`;
}

// ✅ 2. WeatherAPI → AQI, UV, Icon, Timezone
async function fetchWeatherAPI(city) {
  const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${WEATHERAPI_KEY}&q=${city}&days=1&aqi=yes`);
  if (!res.ok) throw new Error("WeatherAPI failed");
  return res.json();
}

function updateExtraInfo(data) {
  const forecast = data.forecast.forecastday[0];
  const localTime = new Date(data.location.localtime);

  // Time + Date
  const hour = localTime.getHours().toString().padStart(2, "0");
  const minute = localTime.getMinutes().toString().padStart(2, "0");
  timeElement.textContent = `${hour}:${minute}`;
  dateElement.textContent = `${localTime.getDate()} ${localTime.toLocaleString("default", { month: "short" })}`;

  // AQI + UV + Sunrise/Sunset
  aqiElement.textContent = Math.round(data.current.air_quality.pm2_5);
  uvElement.textContent = data.current.uv;
  sunriseSunsetTime.textContent = `${forecast.astro.sunrise} / ${forecast.astro.sunset}`;

  // ☀ Background Logic
  const now = new Date(data.location.localtime);
  const sunrise = getFullDate(data.location.localtime, forecast.astro.sunrise);
  const sunset = getFullDate(data.location.localtime, forecast.astro.sunset);
  const isDay = now >= sunrise && now < sunset ? 1 : 0;

  updateBackground(isDay);

  // Weather Icon
  const condition = data.current.condition.text;
  weatherIcon.src = getCustomIcon(condition, isDay);
  weatherIcon.alt = condition;

  // Smart Suggestion
  const temp = data.current.temp_c;
  suggestionElement.textContent = generateSuggestion(condition, temp);
}

// ✅ 3. Weatherbit → 6 Day + Hourly Forecast
async function fetchWeatherbit(city) {
  const res = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&days=7&key=${WEATHERBIT_KEY}`);
  if (!res.ok) throw new Error("Weatherbit failed");
  return res.json();
}

async function fetchHourlyWeatherbit(city) {
  const res = await fetch(`https://api.weatherbit.io/v2.0/forecast/hourly?city=${city}&hours=9&key=${WEATHERBIT_KEY}`);
  if (!res.ok) throw new Error("Hourly weatherbit failed");
  return res.json();
}

function updateDailyForecast(data) {
  for (let i = 1; i <= 6; i++) {
    const day = data.data[i];
    const name = new Date(day.valid_date).toLocaleDateString("en-US", { weekday: "short" });
    document.getElementById(`day${i}`).textContent = name;
    document.getElementById(`day${i}_temp`).textContent = `${Math.round(day.temp)}°`;
    document.getElementById(`day${i}_weather_png`).src = getCustomIcon(day.weather.description, 1);
  }
  maxTempElement.textContent = `${Math.round(data.data[0].max_temp)}°`;
  minTempElement.textContent = `${Math.round(data.data[0].min_temp)}°`;
}

function updateHourlyForecast(data) {
  for (let i = 0; i < 9; i++) {
    const hourData = data.data[i];
    const hour = new Date(hourData.timestamp_local).getHours();
    document.getElementById(`Hour${i + 1}_temp`).textContent = `${Math.round(hourData.temp)}°`;
    document.getElementById(`Hour${i + 1}_time`).textContent = `${hour.toString().padStart(2, "0")}:00`;
    document.getElementById(`Hour${i + 1}_weather_png`).src = getCustomIcon(hourData.weather.description, hour >= 6 && hour <= 18 ? 1 : 0);
  }
}

// 🔄 UPDATE ALL
async function updateAllWeather(city) {
  try {
    locationElement.textContent = "Loading...";
    currentTempElement.textContent = "--°";

    const [owm, wapi, wbDaily, wbHourly] = await Promise.all([
      fetchCurrentWeather(city),
      fetchWeatherAPI(city),
      fetchWeatherbit(city),
      fetchHourlyWeatherbit(city),
    ]);

    updateCurrentWeather(owm);
    updateExtraInfo(wapi);
    updateDailyForecast(wbDaily);
    updateHourlyForecast(wbHourly);

    localStorage.setItem("lastCity", city);
  } catch (err) {
    alert("Error: " + err.message);
  }
}

// 🔍 EVENT LISTENERS
searchBtn.addEventListener("click", () => {
  const city = searchInput.value.trim();
  if (city) updateAllWeather(city);
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && searchInput.value.trim()) {
    updateAllWeather(searchInput.value.trim());
  }
});

window.addEventListener("load", () => {
  const lastCity = localStorage.getItem("lastCity") || "London";
  searchInput.value = lastCity;
  updateAllWeather(lastCity);
});
