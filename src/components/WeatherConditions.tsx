import type { WeatherData, Unit } from "../types/weather";
import convertTemperature from "../utils/convertTemperature";

type WeatherConditionsProps = {
  data: Extract<WeatherData, { ready: true }>;
  unit: Unit;
};

export default function WeatherConditions({
  data,
  unit,
}: WeatherConditionsProps) {
  return (
    <div className="bg-secondary m-2 p-2 rounded-xl">
      <h2 className="text-2xl mb-2 px-2 text-primary font-medium leading-tight">
        Conditions
      </h2>
      <div className="grid grid-cols-2 gap-2 px-4 items-center">
        <div>
          <div className="text-md text-primary">Real feel</div>
          <div className="text-2xl font-bold text-primary">
            {Math.round(convertTemperature(data.realFeel, unit))}°
          </div>
        </div>

        <div className="mb-2">
          <div className="text-md text-primary">Wind</div>
          <div className="text-2xl font-bold text-primary">
            {Math.round(data.wind)} m/s
          </div>
        </div>

        <div className="mb-2">
          <div className="text-md text-primary">Description</div>
          <div className="text-2xl font-bold text-primary">
            {data.description}
          </div>
        </div>

        <div className="mb-2">
          <div className="text-md text-primary">Humidity</div>
          <div className="text-2xl font-bold text-primary">
            {data.humidity}%
          </div>
        </div>
      </div>
    </div>
  );
}
