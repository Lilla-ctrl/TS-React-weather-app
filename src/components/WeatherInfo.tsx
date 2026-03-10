import FormattedDate from "./FormattedDate";
import WeatherTemperature from "./WeatherTemperature";
import WeatherIcon from "./WeatherIcon";

export default function WeatherInfo({data, unit, setUnit}) {
  return (
    <div>
      <h1 className="text-center text-sm-start">{data.city}</h1>
      <ul className="text-center text-sm-start">
        <li>
          <FormattedDate timezone={data.timezone} />
        </li>
        <li className="text-capitalize">{data.description}</li>
      </ul>

      <div className="row mt-3">
        <div className="col-12 col-sm-6 d-flex flex-column flex-sm-row align-items-center justify-content-center justify-content-sm-start mb-3 mb-sm-0">
          <div className="d-flex">
            <div>
              <WeatherIcon
                icon={data.icon}
                description={data.description}
                /* className="me-sm-3 mb-2 mb-sm-0" */
              />
            </div>

            <WeatherTemperature
              celsius={data.temperature}
              unit={unit}
              setUnit={setUnit}
            />
          </div>
        </div>
        <div className="col-12 col-sm-6 text-center text-sm-start">
          <ul>
            <li>Humidity: {data.humidity}%</li>
            <li>Wind: {Math.round(data.wind)} m/s</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
