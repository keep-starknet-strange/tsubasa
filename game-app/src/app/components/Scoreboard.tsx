"use client";

import { useState } from "react";

export default function Scoreboard() {
  const [scoreboardType, setScoreBoardTypes] = useState(0);

  return (
    // TODO: Extract colors to the Tailwind theme once properly defined
    <div className="rounded-b-xl bg-green-500 p-6 font-new-airport font-medium sm:p-8">
      <button
        className="leading-xl flex h-20 w-[10rem] items-center justify-center overflow-hidden rounded-lg bg-greenBlack px-3 py-2 text-xl text-green-200 shadow-md sm:w-[25rem] sm:max-w-none sm:px-6 sm:py-3"
        onClick={() => setScoreBoardTypes(1)}
      >
        {scoreboardType === 0 ? (
          <div className="flex w-full items-center justify-between">
            <span className="hidden sm:block">ROUND 1</span>
            <span className="w-full text-[2.5rem] leading-[2.5rem] sm:w-auto sm:text-[3.5rem] sm:leading-[3.5rem]">
              02 - 01
            </span>
            <span className="hidden sm:block">00:60</span>
          </div>
        ) : (
          // TODO: Create a Typography component
          <span
            className="w-auto animate-scoreboard bg-gradient-to-r from-green-200 from-[17%] via-yellow-200 via-[48%] to-lightBlue to-[81%] bg-clip-text text-center text-[2.5rem] leading-[2.5rem] text-transparent sm:text-[3.5rem] sm:leading-[3.5rem]"
            onAnimationEnd={() => setScoreBoardTypes(0)}
          >
            GOOOOOOAAALL
          </span>
        )}
      </button>
    </div>
  );
}
