const body = document.querySelector('body');
const city = document.querySelector('.city');
const time = document.querySelector('.time');
const search = document.querySelector('.search-city');
const currentWeather = document.querySelector('.weather');
const conditions = document.querySelector('.conditions');
const currentTime = new Date();

function formatingTime(number){
  if(number < 10){
    return '0' + number;
  } else {
    return number;
  }
}

const hour = formatingTime(currentTime.getHours());
const minutes = formatingTime(currentTime.getMinutes());

city.innerText = ('Porto, Portugal');
// time.innerText = (`${hour} : ${minutes}`);

function changeBackground(hour){
  if(hour >= 6 && hour < 18){
    body.style["background-image"] = "url(img/morning.jpg)";
  } else if (hour >= 18 && hour < 23){
    body.style["background-image"] = "url(img/evening.jpg)";
  } else if (hour < 6 || hour === 23){
    body.style["background-image"] = "url(img/night.jpg)";
  }
}

changeBackground(hour);

async function getWeather(location, number){

  const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=ZCCWHN54JPDKRGBLEYH2EDJPG&contentType=json` , {mode: 'cors'});
  const weatherData = await response.json();
  const displayWeather = weatherData.days[number];
  dailyWeather(displayWeather);
}

const dailyWeather = (data) => {
  currentWeather.innerText = `${data.temp}°`;
  conditions.innerText = data.conditions ;
}

getWeather('porto', 0);

search.addEventListener('keydown', (event) =>{
  if(event.key === "Enter"){
    getWeather(search.value, 0);
    city.innerText = search.value;
  }
})

// getWeather().then((dailyWeather) => {
//   console.log(dailyWeather.days)
// });