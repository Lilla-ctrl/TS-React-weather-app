import convertTemperature from "./utils/convertTemperature";

export default function WeatherTemperature(props) {
  function showCelsius(event) {
    event.preventDefault();
    props.setUnit("celsius");
  }

  function showFahrenheit(event) {
    event.preventDefault();
    props.setUnit("fahrenheit");
  }

  return (
    <div className="WeatherTemperature">
      <span className="temperature">
        {props.celsius !== undefined
          ? Math.round(convertTemperature(props.celsius, props.unit))
          : "-"}
      </span>
      <span className="unit">
        <a
          className={props.unit === "celsius" ? "" : "clickable"}
          href="/"
          onClick={showCelsius}
        >
          °C
        </a>{" "}
        |{" "}
        <a
          className={props.unit === "fahrenheit" ? "" : "clickable"}
          href="/"
          onClick={showFahrenheit}
        >
          °F
        </a>
      </span>
    </div>
  );
}
