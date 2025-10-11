import "./styles.css";

import cleardayIcon from "../src/assets/icons/clear-day.png";
import clearnightIcon from "../src/assets/icons/clear-night.png";
import cloudyIcon from "../src/assets/icons/cloudy.png";
import fogIcon from "../src/assets/icons/fog.png";
import hailIcon from "../src/assets/icons/hail.png";
import partycloudydayIcon from "../src/assets/icons/partly-cloudy-day.png";
import partycloudynightIcon from "../src/assets/icons/partly-cloudy-night.png";
import rainIcon from "../src/assets/icons/rain.png";
import sleetIcon from "../src/assets/icons/sleet.png";
import snowIcon from "../src/assets/icons/snow.png";
import thunderstormIcon from "../src/assets/icons/thunderstorm.png";
import tornadoIcon from "../src/assets/icons/tornado.png";
import windIcon from "../src/assets/icons/wind.png";
import logoBlack from "../src/assets/logo/logo-black.png";
import logoWhite from "../src/assets/logo/logo-white.png";

//HTML STRUCTURE
document.body.innerHTML = `
<div id="app">
<img id="logo" src=${logoWhite} alt="logo"/>
<h1 id="title">Welcome to Mood - a simple weather app</h1>
<form  id="form">
    <input type="text" id="input-location" name="input-location" required />
    <button type="button" id="location-button" alter="Get your current location"></button>
</form>
<input type="submit" id ="submit-button" value="Search Location"/>
<div id="container"></div>
</div>
`;
//Getting Current Location Button
const locationButton = document.querySelector("#location-button");
const form = document.getElementById("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const WEATHER_API_KEY = `BVURY5MXKSTGG9XUA7UWYP239`;
  let inputLocation = document.getElementById("input-location").value;
  getWeatherSearch(inputLocation.toLowerCase(), WEATHER_API_KEY);
});

// WEATHER
async function getWeatherSearch(inputLocation, API_KEY) {
  try {
    ///================
    // fetching data
    ///================
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${inputLocation}?unitGroup=us&key=${API_KEY}&contentType=json`
    );
    const conditionData = await response.json();
    const fetchRespone = {
      currentAddress: conditionData.address,
      currentTemp: conditionData.currentConditions.temp,
      currentConditions: conditionData.currentConditions.conditions,
      currentFeelslike: conditionData.currentConditions.feelslike,
      currentPrecip: conditionData.currentConditions.precip,
      currentHumidity: conditionData.currentConditions.humidity,
      currentIcon: conditionData.currentConditions.icon,
      currentUvindex: conditionData.currentConditions.uvindex,
    };
    let currentAddress = fetchRespone.currentAddress;
    let currentTemp = fetchRespone.currentTemp;
    let currentConditions = fetchRespone.currentConditions;
    let currentFeelslike = fetchRespone.currentFeelslike;
    let currentPrecip = fetchRespone.currentPrecip;
    let currentHumidity = fetchRespone.currentHumidity;
    let currentIcon = fetchRespone.currentIcon;
    let currentUvindex = fetchRespone.currentUvindex;
    ///================

    ///================
    // demo sample for Testing and Debugging
    ///================

    // const demoSample = {
    //   currentAddress: "Fairfax",
    //   currentTemp: 75,
    //   currentConditions: "Clear",
    //   currentFeelslike: 78,
    //   currentPrecip: 20,
    //   currentHumidity: 89.8,
    //   currentIcon: "party-cloudy-day",
    //   currentUvindex: 5,
    // };
    // let currentAddress = demoSample.currentAddress;
    // let currentTemp = demoSample.currentTemp;
    // let currentConditions = demoSample.currentConditions;
    // let currentFeelslike = demoSample.currentFeelslike;
    // let currentPrecip = demoSample.currentPrecip;
    // let currentHumidity = demoSample.currentHumidity;
    // let currentIcon = demoSample.currentIcon;
    // let currentUvindex = demoSample.currentUvindex;

    ///================

    //WEATHER DOM
    const container = document.querySelector("#container");
    container.innerHTML = ``;
    const address = document.createElement("h1");
    const conditions = document.createElement("div");
    conditions.innerHTML = `
		<img id="currIcon" alter="weather icon"/>
    <h1 id="currTemp"></h1>
    <p id="currConditions"></p>
    <p id="currFeelslike"></p>
		<p id="currPrecip"></p>
		<p id="currHumidity"></p>
		<p id="currUvindex">
    `;

    address.textContent = currentAddress.toUpperCase();
    conditions.querySelector("#currTemp").textContent = `${currentTemp}°`;
    conditions.querySelector(
      "#currConditions"
    ).textContent = `${currentConditions}`;
    conditions.querySelector(
      "#currFeelslike"
    ).textContent = `Feelslike: ${currentFeelslike}`;
    conditions.querySelector(
      "#currPrecip"
    ).textContent = `Precipitation: ${currentPrecip}`;
    conditions.querySelector(
      "#currHumidity"
    ).textContent = `Humidity: ${currentHumidity}`;
    // conditions.querySelector("#currIcon").textContent = `${currentIcon}`;
    conditions.querySelector(
      "#currUvindex"
    ).textContent = `UV Index: ${currentUvindex}`;

    container.append(address, conditions);
    document.body.appendChild(app);
    app.appendChild(container);

    //Weather Dynamic background and Icon load
    console.log(currentIcon);
    generateBackground(currentIcon);
    loadIcon(currentIcon);
  } catch (error) {
    console.error("Fail to fetch weather data:", error);
  }
}

const app = document.querySelector("#app");

const coditionList = new Set([
  "clear-day",
  "clear-night",
  "cloudy",
  "fog",
  "hail",
  "partly-cloudy-day",
  "partly-cloudy-night",
  "rain",
  "sleet",
  "snow",
  "thunderstorm",
  "tornado",
  "wind",
]);

locationButton.addEventListener("click", () => {
  // console.log("get location");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      console.log(`lat: ${pos.lat}`);
      console.log(`lat: ${pos.lng}`);
      const WEATHER_API_KEY = `BVURY5MXKSTGG9XUA7UWYP239`;
      getWeatherCurrent(pos.lat, pos.lng, WEATHER_API_KEY);
    });
  } else {
    //Browser not support Geolocation
    console.log("Browser doesn't support Geolocation!");
  }
});

async function getWeatherCurrent(latitude, longitude, API_KEY) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude}%2C${longitude}?unitGroup=us&key=${API_KEY}&contentType=json`
    );
    const conditionData = await response.json();
    const fetchRespone = {
      currentAddress: conditionData.address,
      currentTemp: conditionData.currentConditions.temp,
      currentConditions: conditionData.currentConditions.conditions,
      currentFeelslike: conditionData.currentConditions.feelslike,
      currentPrecip: conditionData.currentConditions.precip,
      currentHumidity: conditionData.currentConditions.humidity,
      currentIcon: conditionData.currentConditions.icon,
      currentUvindex: conditionData.currentConditions.uvindex,
    };
    let currentTemp = fetchRespone.currentTemp;
    let currentConditions = fetchRespone.currentConditions;
    let currentFeelslike = fetchRespone.currentFeelslike;
    let currentPrecip = fetchRespone.currentPrecip;
    let currentHumidity = fetchRespone.currentHumidity;
    let currentIcon = fetchRespone.currentIcon;
    let currentUvindex = fetchRespone.currentUvindex;

    //GET CITY NAME USING GOOGLE API
    const GOOGLE_API_KEY = `AIzaSyAgXBa8jVijJNl7eV8W8CUXBnneP_6xvi0`;
    let cityName = await getCityName(latitude, longitude, GOOGLE_API_KEY);
    if (!cityName) {
      console.log("Cannot fetch city name.");
    }
    console.log(cityName);

    //WEATHER DOM
    const container = document.querySelector("#container");
    container.innerHTML = ``;
    const address = document.createElement("h1");
    const conditions = document.createElement("div");
    conditions.innerHTML = `
		<img id="currIcon" alter="weather icon"/>
    <h1 id="currTemp"></h1>
    <p id="currConditions"></p>
    <p id="currFeelslike"></p>
		<p id="currPrecip"></p>
		<p id="currHumidity"></p>
		<p id="currUvindex">
    `;
    address.textContent = cityName.toUpperCase();
    conditions.querySelector("#currTemp").textContent = `${currentTemp}°`;
    conditions.querySelector(
      "#currConditions"
    ).textContent = `${currentConditions}`;
    conditions.querySelector(
      "#currFeelslike"
    ).textContent = `Feelslike: ${currentFeelslike}`;
    conditions.querySelector(
      "#currPrecip"
    ).textContent = `Precipitation: ${currentPrecip}`;
    conditions.querySelector(
      "#currHumidity"
    ).textContent = `Humidity: ${currentHumidity}`;
    // conditions.querySelector("#currIcon").textContent = `${currentIcon}`;
    conditions.querySelector(
      "#currUvindex"
    ).textContent = `UV Index: ${currentUvindex}`;

    container.append(address, conditions);
    app.appendChild(container);
    document.body.appendChild(app);

    //Weather Dynamic background and Icon load
    console.log(currentIcon);
    generateBackground(currentIcon);
    loadIcon(currentIcon);
  } catch (error) {
    console.error("Fail to fetch weather data:", error);
  }
}

//GOOGLE API CALL TO GET CURRENT CITY NAME
async function getCityName(latitude, longitude, GOOGLE_API_KEY) {
  let cityName = "";
  try {
    const response = await fetch(`
      https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`);
    const cityData = await response.json();
    cityName = cityData.results[0].address_components[3].long_name;
  } catch (error) {
    console.error("Fail to fetch city name:", error);
  }
  return cityName;
}
window.onload = function () {
  getWeatherSearch("Fairfax", `BVURY5MXKSTGG9XUA7UWYP239`);
};

function generateBackground(condition) {
  const classCondtion = condition.toLowerCase().replace(/ /g, "-");
  console.log(classCondtion);
  const app = document.querySelector("#app");
  app.className = ""; // Reset any existing classes
  if (coditionList.has(classCondtion)) {
    console.log("Class found in the list: " + classCondtion);
    app.classList.add(classCondtion);
  } else {
    app.classList.add("clear-day"); // Default class if condition not found
  }
  console.log(app.className);
}
function loadIcon(condition) {
  const iconCondition = condition.toLowerCase().replace(/ /g, "-");
  const currIcon = document.querySelector("#currIcon");
  if (coditionList.has(iconCondition)) {
    console.log("Icon found in the list: " + iconCondition);
    switch (iconCondition) {
      case "clear-day":
        currIcon.src = cleardayIcon;
        break;
      case "clear-night":
        currIcon.src = clearnightIcon;
        break;
      case "cloudy":
        currIcon.src = cloudyIcon;
        break;
      case "fog":
        currIcon.src = fogIcon;
        break;
      case "hail":
        currIcon.src = hailIcon;
        break;
      case "partly-cloudy-day":
        currIcon.src = partycloudydayIcon;
        break;
      case "partly-cloudy-night":
        currIcon.src = partycloudynightIcon;
        break;

      case "rain":
        currIcon.src = rainIcon;
        break;
      case "sleet":
        currIcon.src = sleetIcon;
        break;
      case "snow":
        currIcon.src = snowIcon;
        break;
      case "thunderstorm":
        currIcon.src = thunderstormIcon;
        break;
      case "tornado":
        currIcon.src = tornadoIcon;
        break;
      case "wind":
        currIcon.src = windIcon;
        break;
      default:
        currIcon.src = cleardayIcon; // Default icon if condition not found
        break;
    }
  }
}
