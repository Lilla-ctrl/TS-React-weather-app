import type { WeatherData } from "../types/weather";

type WeatherConditionsProps = {
  data: Extract<WeatherData, { ready: true }>;
};

export default function WeatherConditions({ data }: WeatherConditionsProps) {
  return (
    <div>
      <div>Humidity: {data.humidity}%</div>
      <div>Wind: {Math.round(data.wind)} m/s</div>
      <div>Description: {data.description}</div>
      <div>Real feel:</div>
    </div>
  );
}
