import moment from "moment-timezone";
import { useEffect, useState } from "react";

export default function FormattedDate(props) {
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    if (!props.timezone) return;

    const updateTime = () => {
      const now = moment().tz(props.timezone).format("dddd HH:mm");
      setLocalTime(now);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 60000);
    return () => clearInterval(intervalId);
  }, [props.timezone]);

  return <div>{localTime}</div>;
}
