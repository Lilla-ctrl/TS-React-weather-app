import convertTemperature from "../utils/convertTemperature";
import type { Dispatch, SetStateAction } from "react";
import type { Unit } from "../types/weather";

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
  function handleUnitChange(newUnit: Unit) {
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
        <button
          type="button"
          className={unit === "celsius" ? "" : "clickable"}
          onClick={() => handleUnitChange("celsius")}
        >
          °C
        </button>
        |
        <button
          className={unit === "fahrenheit" ? "" : "clickable"}
          onClick={() => handleUnitChange("fahrenheit")}
        >
          °F
        </button>
      </span>
    </div>
  );
}
