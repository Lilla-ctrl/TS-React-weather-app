import type { Unit } from "../types/weather";

export default function convertTemperature(celsius: number, unit: Unit): number {
  if (unit === "fahrenheit") {
    return (celsius * 9) / 5 + 32;
  }
  return celsius;
}
