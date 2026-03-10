export interface Coordinates {
  lat: number;
  lon: number;
}

export interface WeatherData {
  temperature: number;
  wind: number;
  humidity: number;
  city: string;
  description: string;
  icon: string;
  coordinates: Coordinates;
  timezone?: string;
}

export interface ForecastDay {
  icon: string;
  description: string;
  maxTemp: number;
  minTemp: number;
}

export type Forecast = ForecastDay[];

export type Unit = "Celsius" | "Fahrenheit";
