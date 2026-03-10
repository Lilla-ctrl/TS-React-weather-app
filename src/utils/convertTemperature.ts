export default function convertTemperature(temperature, unit) {
  if (unit === "celsius") {
    return temperature;
  } else {
    return (temperature * 9) / 5 + 32;
  }
}