import FormattedDate from "./FormattedDate";
import WeatherTemperature from "./WeatherTemperature";
import WeatherIcon from "./WeatherIcon";

export default function WeatherInfo(props) {
  return (
    <div>
      <h1 className="text-center text-sm-start">{props.data.city}</h1>
      <ul className="text-center text-sm-start">
        <li>
          <FormattedDate timezone={props.data.timezone} />
        </li>
        <li className="text-capitalize">{props.data.description}</li>
      </ul>

      <div className="row mt-3">
        <div className="col-12 col-sm-6 d-flex flex-column flex-sm-row align-items-center justify-content-center justify-content-sm-start mb-3 mb-sm-0">
          <div className="d-flex">
            <div>
              <WeatherIcon
                code={props.data.icon}
                alt={props.data.description}
                className="me-sm-3 mb-2 mb-sm-0"
              />
            </div>

            <WeatherTemperature
              celsius={props.data.temperature}
              unit={props.unit}
              setUnit={props.setUnit}
            />
          </div>
        </div>
        <div className="col-12 col-sm-6 text-center text-sm-start">
          <ul>
            <li>Humidity: {props.data.humidity}%</li>
            <li>Wind: {Math.round(props.data.wind)} m/s</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
