import axios from "axios";
import type { APIResponse, Coordinates } from "../types/weather";

export async function fetchTimezone(coordinates: Coordinates):Promise<string> {
    const { latitude, longitude } = coordinates;
    const timezoneApiKey = import.meta.env.VITE_TIMEZONE_API_KEY;

    try {
      const res = await fetch(
        `https://api.timezonedb.com/v2.1/get-time-zone?key=${timezoneApiKey}&format=json&by=position&lat=${latitude}&lng=${longitude}`,
      );
      const data = await res.json();
      return data.zoneName || "UTC";
    } catch (err) {
      console.error("Timezone fetch error:", err);
      return "UTC";
    }
  }

  export async function fetchWeatherByCity(city: string): Promise<APIResponse> {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    const response = await axios.get<APIResponse>(url);
    return response.data;
  }

  export async function fetchWeatherByCoordinates(lat: number, lon: number): Promise<APIResponse> {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const url = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  
    const response = await axios.get<APIResponse>(url);
    return response.data;
  }
