import type { JSX } from "react";

type WeatherIconProps = {
  icon: string;
  description: string;
};

export default function WeatherIcon({
  icon,
  description,
}: WeatherIconProps): JSX.Element {
  const imgsrc = `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${icon}.png`;

  return <img src={imgsrc} alt={description} />;
}
