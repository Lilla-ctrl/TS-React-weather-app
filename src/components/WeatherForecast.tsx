import WeatherForecastDay from "./WeatherForecastDay";
import type { Unit, ForecastDay } from "../types/weather";

type WeatherForecastProps = {
  data: ForecastDay[];
  unit: Unit;
};

export default function WeatherForecast({ data, unit }: WeatherForecastProps) {
  if (!data || data.length === 0) return null;

  return (
    <div className="bg-secondary mx-2 p-2 rounded-xl grid grid-cols-5 gap-2">
      {data.slice(1, 6).map((day, index) => (
        <div key={index}>
          <WeatherForecastDay data={day} unit={unit} />
        </div>
      ))}
    </div>
  );
}
