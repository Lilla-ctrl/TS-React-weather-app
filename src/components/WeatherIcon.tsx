export default function WeatherIcon(props) {
  const imgsrc = `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${props.code}.png`;

  return <img src={imgsrc} alt="Weather icon" />;
}
