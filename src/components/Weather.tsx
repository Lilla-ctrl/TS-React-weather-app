import { useCallback, useState, useEffect } from "react";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";
import type { AxiosResponse } from "axios";
import type { WeatherData, Unit, APIResponse } from "../types/weather";
import "../style/Weather.css";
import {
  fetchWeatherByCity,
  fetchTimezone,
  fetchWeatherByCoordinates,
} from "../utils/weatherUtils";

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

  async function search() {
    if (!city) return;

    try {
      const data = await fetchWeatherByCity(city);
      handleResponse({ data } as AxiosResponse<APIResponse>);
    } catch (err) {
      console.error("Search failed", err);
    }
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
    async (position: Position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      try {
        const data = await fetchWeatherByCoordinates(lat, lon);
        handleResponse({ data } as AxiosResponse<APIResponse>);
      } catch (err) {
        setWeatherData({ ready: false });
        alert("Too many attempts - please try again in a moment.");
        console.error("API error:", err);
      }
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
