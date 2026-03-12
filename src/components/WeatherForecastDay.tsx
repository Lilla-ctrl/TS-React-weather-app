import WeatherIcon from "./WeatherIcon";
import convertTemperature from "../utils/convertTemperature";
import type { Unit, ForecastDay } from "../types/weather";

type WeatherForecastDayProps = {
  data: ForecastDay;
  unit: Unit;
};

export default function WeatherForecastDay({
  data,
  unit,
}: WeatherForecastDayProps) {
  function formatDay() {
    let date = new Date(data.time * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
  }

  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-sm font-bold text-primary">
        {formatDay()}
      </div>
      <WeatherIcon
        icon={data.condition.icon}
        description={data.condition.description}
        size="w-20 h-20"
      />
      <div className="flex gap-0.5 text-sm">
        <span className="text-primary font-bold">
          {Math.round(convertTemperature(data.temperature.maximum, unit))}°
        </span>
        <span className="text-primary">
          {Math.round(convertTemperature(data.temperature.minimum, unit))}°
        </span>
      </div>
    </div>
  );
}
