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
      <div className="bg-secondary mx-2 p-2 rounded-xl grid grid-cols-5 gap-2">
        {forecast.slice(0, 5).map((dailyForecast, index) => (
          <div key={index}>
            <WeatherForecastDay data={dailyForecast} unit={unit} />
          </div>
        ))}
      </div>
  );
}
