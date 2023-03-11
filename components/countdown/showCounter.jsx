import React from "react";

import DateTimeDisplay from "./dateTimeDisplay";

export default function ShowCounter({ days, hours, minutes, seconds }) {
  return (
    <div className="p2">
      <div
        className="flex items-center justify-center font-bold text-lg 
                        leading-7 py-2 px-4 border border-gray-300 rounded-md 
                        text-black hover:bg-gray-200"
      >
        <DateTimeDisplay value={days} type={"Days"} isDanger={days <= 3} />
        <p>:</p>
        <DateTimeDisplay value={hours} type={"Hours"} isDanger={days <= 3} />
        <p>:</p>
        <DateTimeDisplay value={minutes} type={"Mins"} isDanger={days <= 3} />
        <p>:</p>
        <DateTimeDisplay
          value={seconds}
          type={"Seconds"}
          isDanger={days <= 3}
        />
      </div>
    </div>
  );
}
