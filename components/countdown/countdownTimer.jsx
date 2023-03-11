import React from "react";
import { useCountdown } from "../../hooks/useCountdown";

import ExpiredNotice from "./expiredNotice";
import ShowCounter from "./showCounter";

export default function CountdownTimer({ targetDate }) {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  }
  return (
    <ShowCounter
      days={days}
      hours={hours}
      minutes={minutes}
      seconds={seconds}
    />
  );
}
