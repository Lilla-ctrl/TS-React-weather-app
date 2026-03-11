type WeatherIconProps = {
  icon: string;
  description: string;
};

export default function WeatherIcon({
  icon,
  description,
}: WeatherIconProps) {
  const imgsrc = `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${icon}.png`;

  return <img src={imgsrc} alt={description} />;
}
