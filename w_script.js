let isCelsius = true;
const apiKey = "31439984319bed27ba24e0dde5b40f2d";

function toggleUnit() {
  isCelsius = !isCelsius;
  const city = document.getElementById("cityInput").value.trim();
  if (city) getWeather();
}

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerHTML = "Please enter a city name.";
    return;
  }

  const unit = isCelsius ? "metric" : "imperial";
  const unitSymbol = isCelsius ? "°C" : "°F";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.cod === 200) {
        const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        resultDiv.innerHTML = `
          <h2>${data.name}, ${data.sys.country}</h2>
          <img src="${iconUrl}" alt="weather icon">
          <p><strong>${data.weather[0].description}</strong></p>
          <p>🌡️ Temp: ${data.main.temp} ${unitSymbol}</p>
          <p>💧 Humidity: ${data.main.humidity}%</p>
          <p>🌬️ Wind: ${data.wind.speed} ${isCelsius ? 'm/s' : 'mph'}</p>
        `;
      } else {
        resultDiv.innerHTML = ` ${data.message}`;
      }
    })
    .catch(err => {
      resultDiv.innerHTML = " Error fetching data.";
      console.error(err);
    });
}
