import { useState, useEffect } from "react";
import axios from "axios";
import type { AxiosResponse } from "axios";
import "./WeatherForecast.css";
import WeatherForecastDay from "./WeatherForecastDay";
import type { Unit, ForecastDay } from "../types/weather";

type WeatherForecastProps = {
  city: string;
  unit: Unit;
};

interface ForecastApiResponse {
  daily: ForecastDay[];
}

export default function WeatherForecast({ city, unit }: WeatherForecastProps) {
  const [loaded, setLoaded] = useState(false);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);

  useEffect(() => {
    setLoaded(false);
  }, [city]);

  function search() {
    const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;
    let cityName = city;
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${cityName}&key=${weatherApiKey}`;
    axios.get(apiUrl).then(handleForecastResponse);
  }

  function handleForecastResponse(
    response: AxiosResponse<ForecastApiResponse>,
  ) {
    setForecast(response.data.daily);
    setLoaded(true);
  }

  if (loaded) {
    return (
      <div className="WeatherForecast">
        <div className="row">
          {forecast.map(function (dailyForecast, index) {
            if (index < 5) {
              return (
                <div className="col" key={index}>
                  <WeatherForecastDay data={dailyForecast} unit={unit} />
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    );
  } else {
    search();
    return null;
  }
}
