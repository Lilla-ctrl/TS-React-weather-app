import FormattedDate from "./FormattedDate";
import WeatherTemperature from "./WeatherTemperature";
import WeatherIcon from "./WeatherIcon";
import type { Dispatch, SetStateAction } from "react";
import type { Unit, WeatherData } from "../types/weather";

type WeatherInfoProps = {
  data: Extract<WeatherData, { ready: true }>;
  unit: Unit;
  setUnit: Dispatch<SetStateAction<Unit>>;
};

export default function WeatherInfo({ data, unit, setUnit }: WeatherInfoProps) {
  return (
    <div className="grid grid-flow-col grid-rows-2 gap-4 py-4 px-10 justify-evenly items-center">
      <div className="col-span-2">
        <div>
          <h1 className="text-4xl text-primary-text">{data.city}</h1>
        </div>
        <div className="text-md text-primary-text/50">
          <FormattedDate timezone={data.timezone || "UTC"} />
        </div>
      </div>
      <div className="col-span-2">
        <WeatherTemperature
          celsius={data.temperature}
          unit={unit}
          setUnit={setUnit}
        />
      </div>
      <div className="row-span-2">
        <WeatherIcon size="w-48 h-48" icon={data.icon} description={data.description} />
      </div>
    </div>
  );
}
