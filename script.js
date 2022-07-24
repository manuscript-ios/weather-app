function todayDate(date) {
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    let currentDate = date.getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[currentDate];
  
    return `${day} ${hours}:${minutes}`;
  }
  
  let dateElement = document.querySelector("#date");
  let currentTime = new Date();
  dateElement.innerHTML = todayDate(currentTime);
  
  function showWeather(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(
      response.data.main.temp
    );
  
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed
    );
    document.querySelector("#description").innerHTML =
      response.data.weather[0].main;
  }
  
  function searchCity(city) {
    let apiKey = "b5fce4d1cc3e96719f8da9048fa0388c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
  }
  
  function selectCity(event) {
    event.preventDefault();
    let city = document.querySelector("#searchCity").value;
    searchCity(city);
  }
  
  function searchLocation(position) {
    let apiKey = "b5fce4d1cc3e96719f8da9048fa0388c";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showWeather);
  }
  
  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", selectCity);
  
  let currentLocationButton = document.querySelector("#current-location-button");
  currentLocationButton.addEventListener("click", getCurrentLocation);
  
  searchCity("New York");
  