import { useCallback, useState, useEffect, useRef } from "react";
import Loading from "./Loading";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";
import WeatherSearch from "./WeatherSearch";
import WeatherConditions from "./WeatherConditions";
import type { AxiosResponse } from "axios";
import type {
  WeatherData,
  Unit,
  APIResponse,
  ForecastDay,
} from "../types/weather";
import {
  fetchWeatherByCity,
  fetchTimezone,
  fetchWeatherByCoordinates,
  fetchForecast,
} from "../utils/weatherUtils";
import toast from "react-hot-toast";

type Position = {
  coords: {
    latitude: number;
    longitude: number;
  };
};

export default function Weather() {
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState<
    WeatherData | { ready: false }
  >({ ready: false });
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [city, setCity] = useState<string>("");
  const [timezoneCache, setTimezoneCache] = useState<Record<string, string>>(
    {},
  );
  const [unit, setUnit] = useState<Unit>("celsius");
  const [weatherSource, setWeatherSource] = useState<"city" | "location">(
    "location",
  );

  const cacheRef = useRef(timezoneCache);
  useEffect(() => {
    cacheRef.current = timezoneCache;
  }, [timezoneCache])

  const handleResponse = useCallback(
    async function handleResponse(response: AxiosResponse<APIResponse>) {
      const coordinates = response.data.coordinates;
      const cityName = response.data.city;

      let zoneName: string;

      if (cacheRef.current[cityName]) {
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
        realFeel: response.data.temperature.feels_like,
        timezone: zoneName,
      });
      setLoading(false);
    },
    [],
  );

  async function search() {
    if (!city) return;

    try {
      setErrorMessage(null);
      const [weatherData, forecastData] = await Promise.all([
        fetchWeatherByCity(city),
        fetchForecast(city),
      ]);

      if (!weatherData || !weatherData.coordinates) {
        throw new Error("City not found");
      }

      setForecast(forecastData);
      await handleResponse({ data: weatherData } as AxiosResponse<APIResponse>);
    } catch (err: any) {
      if (err.response?.status === 404 || err.message === "City not found") {
        toast.error("We couldn't find that city. Please try again!");
      } else {
        toast.error("Something went wrong with the weather service.");
      }
    }
  }

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setWeatherSource("city");
    search();
  }

  function handleLocation(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setWeatherSource("location");
    navigator.geolocation.getCurrentPosition(searchLocation);
  }

  const searchLocation = useCallback(
    async (position: Position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      try {
        setLoading(true);
        const weatherData = await fetchWeatherByCoordinates(lat, lon);

        await Promise.all([
          fetchForecast(weatherData.city).then(data => setForecast(data)),
          handleResponse({ data: weatherData } as AxiosResponse<APIResponse>)
        ]);        
      } catch (err) {
        setWeatherData({ ready: false });
        setLoading(false);
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

  return (
    <div>
      <WeatherSearch
        handleSubmit={handleSubmit}
        handleLocation={handleLocation}
        handleCityChange={handleCityChange}
      />

      {loading ? (
        <Loading />
      ) : weatherData.ready ? (
        <>
          <WeatherInfo data={weatherData} unit={unit} setUnit={setUnit} />
          <WeatherForecast data={forecast} unit={unit} />
          <WeatherConditions data={weatherData} unit={unit} />
        </>
      ) : errorMessage ? (
        <div className="text-center p-8">
          <p className="text-red-500 mb-4">{errorMessage}</p>
          <button
            onClick={() => window.location.reload()}
            className="underline"
          >
            Try again
          </button>
        </div>
      ) : null}
    </div>
  );
}
