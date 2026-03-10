import WeatherIcon from "./WeatherIcon";
import convertTemperature from "./utils/convertTemperature";

export default function WeatherForecastDay(props) {

  function formatDay() {
    let date = new Date(props.data.time * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
  }

  return (
    <div className="col">
      <div className="Forecast-day">{formatDay()}</div>{" "}
      <WeatherIcon
        code={props.data.condition.icon}
        alt={props.data.condition.description}
        size={36}
      />{" "}
      <div className="Forecast-temperature">
        <span className="Forecast-temperature-max">
          {Math.round(convertTemperature(props.data.temperature.maximum, props.unit))}°
        </span>{" "}
        <span className="Forecast-temperature-min">
          {Math.round(convertTemperature(props.data.temperature.minimum, props.unit))}°
        </span>
      </div>
    </div>
  );
}
