type WeatherIconProps = {
  icon: string;
  description: string;
  size?: string;
};

export default function WeatherIcon({
  icon,
  description,
  size,
}: WeatherIconProps) {
  const iconMapping: Record<string, string> = {
    "clear-sky-day": "clear-day.svg",
    "clear-sky-night": "clear-night.svg",
    "few-clouds-day": "partly-cloudy-day.svg",
    "few-clouds-night": "partly-cloudy-night.svg",
    "broken-clouds-day": "partly-cloudy-day.svg",
    "broken-clouds-night": "partly-cloudy-night.svg",
    "scattered-clouds-day": "cloudy.svg",
    "scattered-clouds-night": "cloudy.svg",
    "rain-day": "rain.svg",
    "rain-night": "rain.svg",
    "thunderstorm-day": "thunderstorm.svg",
    "thunderstorm-night": "thunderstorm.svg",
    "snow-day": "snow.svg",
    "snow-night": "snow.svg",
    "wind-day": "wind.svg",
    "wind-night": "wind.svg",
  };

  const fileName = iconMapping[icon] || "not-avaliable.svg"

  const src = `/icons/${fileName}`;

  return (
    <img
      src={src}
      alt={description}
      className={`${size} object-contain`}
    />
  );
}
