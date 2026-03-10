import { useState } from "react";

function Location() {
  const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${weatherApiKey}&units=metric`;

  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);

  function handleLocationClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
  }

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation({ latitude, longitude });

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setWeather(data);
      })
      .catch((error) => console.log(error));
  }

  function error() {
    console.log("Unable to retrieve your location");
  }

  return (
    <div>
      {!location ? (
        <button onClick={handleLocationClick}>Get Location</button>
      ) : null}
      {location && !weather ? <p>Waiting for location...</p> : null}
      {weather ? (
        <div>
          <p>Location: {weather.name}</p>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      ) : null}
    </div>
  );
}

export default Location;
