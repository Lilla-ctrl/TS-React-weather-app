import { convertTemperature } from "../utils/convertTemperature";
import type { Dispatch, SetStateAction } from "react";
import type { Unit } from "../types/weather";
import type { MouseEvent } from "react";

interface WeatherTemperatureProps {
  celsius: number;
  unit: Unit;
  setUnit: Dispatch<SetStateAction<Unit>>;
}

export default function WeatherTemperature({
  celsius,
  unit,
  setUnit,
}: WeatherTemperatureProps) {
  function handleUnitChange(
    event: MouseEvent<HTMLAnchorElement>,
    newUnit: Unit,
  ) {
    event.preventDefault();
    setUnit(newUnit);
  }

  return (
    <div className="WeatherTemperature">
      <span className="temperature">
        {celsius !== undefined
          ? Math.round(convertTemperature(celsius, unit))
          : "-"}
      </span>
      <span className="unit">
        <a
          className={unit === "celsius" ? "" : "clickable"}
          href="/"
          onClick={(e) => handleUnitChange(e, "celsius")}
        >
          °C
        </a>{" "}
        |{" "}
        <a
          className={unit === "fahrenheit" ? "" : "clickable"}
          href="/"
          onClick={(e) => handleUnitChange(e, "fahrenheit")}
        >
          °F
        </a>
      </span>
    </div>
  );
}
