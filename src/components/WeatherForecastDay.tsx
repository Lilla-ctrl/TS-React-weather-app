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
    <div className="col">
      <div className="Forecast-day">{formatDay()}</div>
      <WeatherIcon
        icon={data.condition.icon}
        description={data.condition.description}
      />
      <div className="Forecast-temperature">
        <span className="Forecast-temperature-max">
          {Math.round(convertTemperature(data.temperature.maximum, unit))}°
        </span>
        <span className="Forecast-temperature-min">
          {Math.round(convertTemperature(data.temperature.minimum, unit))}°
        </span>
      </div>
    </div>
  );
}
