
import React from "react";

export const CircularProgress = () => {
  return (
    <div className="w-full h-full relative animate-spin">
      <svg
        className="w-full h-full"
        viewBox="0 0 50 50"
      >
        <circle
          className="stroke-primary/30"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
        />
        <circle
          className="stroke-primary animate-progress"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="125.6"
          strokeDashoffset="75"
        />
      </svg>
    </div>
  );
};
