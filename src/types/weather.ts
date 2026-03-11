export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface APIResponse {
  temperature: {
    current: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  city: string;
  condition: {
    description: string;
    icon: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
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
  condition: {
    description: string;
    icon: string;
  };
  temperature: {
    maximum: number;
    minimum: number;
  };
}

export type Forecast = ForecastDay[];

export type Unit = "celsius" | "fahrenheit";
