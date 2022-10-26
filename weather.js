// const add = document.getElementById("add");
// const remove = document.getElementById("remove");
// const count = document.getElementById("count");

// add.addEventListener("click", () => {
//   count.innerHTML = Number(count.innerHTML) + 1;
// });

// remove.addEventListener("click", () => {
//   console.log(count.innerHTML);
//   if (count.innerHTML == 1) {
//     count.innerHTML = `<span class="zero">${
//       Number(count.innerHTML) - 1
//     }</span>`;
//     return;
//   }

//   count.innerHTML = Number(count.innerHTML) - 1;
// });
///////////////////////

const getLocBtn = document.getElementById("getLocBtn");
const weatherContainer = document.getElementById("weatherContainer");

const onSuccess = async (evt) => {
  console.log("It worked!", evt.coords.latitude, evt.coords.longitude);
  const { latitude, longitude } = evt.coords;

  const result = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=e6d679f1c4e26029b176b0ebfc933bd8`
  );
  console.log(result);
  result.data.list.forEach((element) => {
    addForcast(element);
  });
};
const addForcast = (element) => {
  let html = `<div>Temp: ${Math.round(element.main.temp - 273.15)} c</div>`;
  html += `<div>${new Date(element.dt * 1000).toLocaleString()}</div>`;
  html += `<img src="http://openweathermap.org/img/w/${element.weather[0].icon}.png" alt="${element.weather[0].description}" >`;
  weatherContainer.insertAdjacentHTML(
    "beforeend",
    `<div class="forcast">${html}<div/>`
  );
};

const onError = (err) => {
  console.log("It failed!", err);
};

const options = { enableHighAccuracy: true, setTimeout: 5000, maximumAge: 0 };

getLocBtn.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
});
