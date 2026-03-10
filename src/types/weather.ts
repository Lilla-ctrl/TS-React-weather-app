export interface Coordinates {
  lat: number;
  lon: number;
}

export interface WeatherData {
  ready: boolean;
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
  time: number;
  icon: string;
  description: string;
  temperature: number;
  minTemp: number;
}

export type Forecast = ForecastDay[];

export type Unit = "Celsius" | "Fahrenheit";
