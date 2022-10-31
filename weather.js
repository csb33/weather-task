// import { options } from "./config";

const options = {
  enableHighAccuracy: true,
  setTimeout: 5000,
  maximumAge: 0,
};

const getLocBtn = document.getElementById("getLocBtn");
const weatherContainer = document.getElementById("weatherContainer");
const location = document.getElementById("location");

//////MODALS
var rainModal = document.getElementById("rainModal"); // gets modal
var windModal = document.getElementById("windModal"); // gets modal
var rainAndWindModal = document.getElementById("rainAndWindModal"); // gets modal
var btn = document.getElementById("weatherContainer"); //opens modal
var closeModal = document.getElementsByClassName("close"); //closes modal

let result; //result in the upper scope

//functions
const getWeather = async (latitude, longitude) => {
  weatherContainer.innerHTML = "";
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=e6d679f1c4e26029b176b0ebfc933bd8`;
  result = await axios.get(url);
  console.log(result);
  result.data.list.forEach((element, index) => {
    addForcast(element, index);
  });
};

const onSuccess = async (evt) => {
  console.log("It worked!", evt.coords.latitude, evt.coords.longitude);
  const { latitude, longitude } = evt.coords;
  getWeather(latitude, longitude);
};

const addForcast = (element, index) => {
  let html = `<div class="weatherInfo">${Math.round(
    element.main.temp - 273.15
  )} \xB0c</div>`;
  html += `<div class="weatherInfo">${new Date(
    element.dt * 1000
  ).toLocaleString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  })}</div>`;
  html += `<img class="weatherInfo" src="http://openweathermap.org/img/w/${element.weather[0].icon}.png" alt="${element.weather[0].description}" >`;
  html += `<div class="weatherInfo">Wind Speed (m/s):${element.wind.speed}</div>`;
  weatherContainer.insertAdjacentHTML(
    "beforeend",
    `<div id="${index}" class="forcast">${html}<div/>`
  );
};

const onError = (err) => {
  console.log("It failed!", err);
};

const getLongLat = async (location) => {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=e6d679f1c4e26029b176b0ebfc933bd8`;
  const result = await axios.get(url);
  console.log(result.data[0]);
  const { lat: latitude, lon: longitude } = result.data[0];
  getWeather(latitude, longitude);
};

//modals
weatherContainer.addEventListener("click", (e) => {
  const weather = result.data.list[Number(e.target.id)];
  const weatherWind = result.data.list[Number(e.target.id)];
  console.log(weather.weather[0].description);
  console.log(weatherWind.wind.speed);
  if (
    weather.weather[0].description.includes("rain") &&
    weatherWind.wind.speed > 6
  ) {
    rainAndWindModal.style.display = "block";
  } else if (weather.weather[0].description.includes("rain")) {
    rainModal.style.display = "block";
  } else if (weatherWind.wind.speed > 6) {
    windModal.style.display = "block";
  }
});

////closing modals

// closeModal.addEventListener("click", () => {
//   rainAndWindModal.style.display = "none";
// });
// closeModal.addEventListener("click", () => {
//   rainModal.style.display = "none";
// });
// closeModal.addEventListener("click", () => {
//   windModal.style.display = "none";
// });

// closeModal.onclick = function (evt) {
//   if (evt.target == rainAndWindModal) {
//     rainAndWindModal.style.display = "none";
//   } else if (evt.target == rainModal) {
//     rainModal.style.display = "none";
//   } else if (evt.target == windModal) {
//     windModal.style.display = "none";
//   }
// };

window.onclick = function (event) {
  if (event.target == rainAndWindModal) {
    rainAndWindModal.style.display = "none";
  } else if (event.target == rainModal) {
    rainModal.style.display = "none";
  } else if (event.target == windModal) {
    windModal.style.display = "none";
  }
};

//listeners
location.addEventListener("input", (e) => {
  getLongLat(e.target.value);
});

getLocBtn.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
});
