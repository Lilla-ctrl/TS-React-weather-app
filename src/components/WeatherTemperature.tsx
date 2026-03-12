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
    <div className="flex items-start gap-1">
      {/* Temperature number */}
      <span className="text-6xl font-light text-primary-text">
        {celsius !== undefined
          ? Math.round(convertTemperature(celsius, unit))
          : "-"}
      </span>

      {/* Unit selector */}
      <div className="flex items-center text-lg mt-2 text-primary-text-dim">
        <button
          type="button"
          className={
            unit === "celsius"
              ? "text-primary-text cursor-default"
              : "text-secondary-text hover:text-white hover:cursor-pointer transition-colors"
          }
          onClick={() => handleUnitChange("celsius")}
        >
          °C
        </button>

        <span className="mx-1 opacity-30">|</span>

        <button
          className={
            unit === "fahrenheit"
              ? "text-primary-text cursor-default"
              : "text-secondary-text hover:text-white hover:cursor-pointer transition-colors"
          }
          onClick={() => handleUnitChange("fahrenheit")}
        >
          °F
        </button>
      </div>
    </div>
  );
}
