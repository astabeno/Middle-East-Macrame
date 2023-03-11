import React from "react";

export default function DateTimeDisplay({ value, type, isDanger }) {
  let twStyles;
  if (!isDanger) {
    twStyles = "countdown ml-2 flex flex-col items-center";
  } else {
    twStyles = "countdown ml-2 flex flex-col items-center text-red-600";
  }

  return (
    <div className={twStyles}>
      <p className="m-0">{value}</p>
      <span className="uppercase text-xs leading-non">{type}</span>
    </div>
  );
}
