import { useCallback, useState, useEffect } from "react";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";
import axios from "axios";
import type { AxiosResponse } from "axios";
import type {
  WeatherData,
  Unit,
  Coordinates,
  APIResponse,
} from "../types/weather";
import "../style/Weather.css";

type Position = {
  coords: {
    latitude: number;
    longitude: number;
  };
};

export default function Weather() {
  const [weatherData, setWeatherData] = useState<
    WeatherData | { ready: false }
  >({ ready: false });
  const [city, setCity] = useState<string>("");
  const [timezoneCache, setTimezoneCache] = useState<Record<string, string>>(
    {},
  );
  const [unit, setUnit] = useState<Unit>("celsius");
  const [weatherSource, setWeatherSource] = useState<"city" | "location">(
    "location",
  );

  async function fetchTimezone(coordinates: Coordinates) {
    const { latitude, longitude } = coordinates;
    const timezoneApiKey = import.meta.env.VITE_TIMEZONE_API_KEY;

    try {
      const res = await fetch(
        `https://api.timezonedb.com/v2.1/get-time-zone?key=${timezoneApiKey}&format=json&by=position&lat=${latitude}&lng=${longitude}`,
      );
      const data = await res.json();
      return data.zoneName || "UTC";
    } catch (err) {
      console.error("Timezone fetch error:", err);
      return "UTC";
    }
  }

  const handleResponse = useCallback(
    async function handleResponse(response: AxiosResponse<APIResponse>) {
      const coordinates = response.data.coordinates;
      const cityName = response.data.city;

      let zoneName: string;

      if (timezoneCache[cityName]) {
        zoneName = timezoneCache[cityName];
      } else {
        zoneName = await fetchTimezone(coordinates);

        setTimezoneCache((prev) => ({
          ...prev,
          [cityName]: zoneName,
        }));
      }

      setWeatherData({
        ready: true,
        temperature: response.data.temperature.current,
        wind: response.data.wind.speed,
        humidity: response.data.temperature.humidity,
        city: cityName,
        description: response.data.condition.description,
        icon: response.data.condition.icon,
        coordinates,
        timezone: zoneName,
      });
    },
    [timezoneCache],
  );

  function search() {
    if (!city) return;
    const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${weatherApiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setWeatherSource("city");
    search();
  }

  function handleLocation(event: React.MouseEvent<HTMLInputElement>) {
    event.preventDefault();
    setWeatherSource("location");
    navigator.geolocation.getCurrentPosition(searchLocation);
  }

  const searchLocation = useCallback(
    (position: Position) => {
      console.log(position);
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;
      let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${weatherApiKey}&units=metric`;

      axios
        .get(apiUrl)
        .then(handleResponse)
        .catch((error) => {
          setWeatherData({ ready: false });
          alert("Too many attempts - please try again in a moment.");
          console.error("API error:", error);
        });
    },
    [handleResponse],
  );

  useEffect(() => {
    if (weatherSource === "location") {
      navigator.geolocation.getCurrentPosition(searchLocation);
    }
  }, [searchLocation, weatherSource]);

  function handleCityChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCity(event.target.value);
  }

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <form onSubmit={handleSubmit} className="mt-3">
          {/* Search input row */}
          <div className="row g-2">
            <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-start">
              <input
                type="search"
                placeholder="Enter a city!"
                className="form-control"
                autoFocus
                onChange={handleCityChange}
              />
            </div>
          </div>

          {/* Buttons row */}
          <div>
            <div className="row mt-3">
              <div className="col-6 col-md-3 mb-2 mb-md-0">
                <input
                  type="submit"
                  value="Search"
                  className="btn btn-secondary w-100"
                />
              </div>
              <div className="col-6 col-md-3">
                <input
                  type="button"
                  value="Location"
                  className="btn btn-secondary w-100"
                  onClick={handleLocation}
                />
              </div>
            </div>
          </div>
        </form>
        <WeatherInfo data={weatherData} unit={unit} setUnit={setUnit} />
        <WeatherForecast city={weatherData.city} unit={unit} />
      </div>
    );
  } else {
    return "One moment, getting your forecast 🌤️";
  }
}
