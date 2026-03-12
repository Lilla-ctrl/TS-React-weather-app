import { useState, useEffect } from "react";
import WeatherForecastDay from "./WeatherForecastDay";
import type { Unit, ForecastDay } from "../types/weather";
import { fetchForecast } from "../utils/weatherUtils";

type WeatherForecastProps = {
  city: string;
  unit: Unit;
};

export default function WeatherForecast({ city, unit }: WeatherForecastProps) {
  const [loaded, setLoaded] = useState(false);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);

  useEffect(() => {
    setLoaded(false);
  }, [city]);

  useEffect(() => {
    if (!loaded) {
      fetchForecast(city)
        .then((dailyData) => {
          setForecast(dailyData);
          setLoaded(true);
        })
        .catch((err) => console.error("Forecast error", err));
    }
  }, [loaded, city]);

  if (!loaded) return null;

  return (
    <div className="WeatherForecast">
      <div className="row">
        {forecast.slice(0, 5).map((dailyForecast, index) => (
          <div className="col" key={index}>
            <WeatherForecastDay data={dailyForecast} unit={unit} />
          </div>
        ))}
      </div>
    </div>
  );
}
