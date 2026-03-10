import { useEffect, useState } from "react";

export default function FormattedDate({ timezone }: { timezone: string }) {
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    if (!timezone) return;

    const updateTime = () => {
      const now = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: timezone,
      }).format(new Date());

      setLocalTime(now);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 60000);
    return () => clearInterval(intervalId);
  }, [timezone]);

  return <div>{localTime}</div>;
}
