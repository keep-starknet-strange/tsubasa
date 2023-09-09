"use client";

import { useState } from "react";
import { useDojo } from "../DojoContext";

export default function Scoreboard() {
  const [scoreboardState, setScoreBoardState] = useState<
    "start" | "score" | "goal"
  >("start");

  const {
    setup: {
      systemCalls: { create_game },
    },
    account: { account },
  } = useDojo();

  const player_2_address = "0x0000000";

  return (
    <div className="rounded-b-xl bg-green-500 p-3 font-new-airport font-medium sm:p-8">
      <button
        className="leading-xl flex h-20 w-[10rem] items-center justify-center overflow-hidden rounded-lg bg-greenBlack px-3 py-2 text-xl text-green-200 shadow-md sm:w-[25rem] sm:max-w-none sm:px-6 sm:py-3"
        onClick={() => setScoreBoardState("goal")}
      >
        {scoreboardState === "score" ? (
          <div className="flex w-full items-center justify-between">
            <span className="hidden sm:block">ROUND 1</span>
            <span className="w-full text-[2.5rem] leading-[2.5rem] sm:w-auto sm:text-[3.5rem] sm:leading-[3.5rem]">
              00 - 00
            </span>
            <span className="hidden sm:block">00:60</span>
          </div>
        ) : (
          // TODO: Create a Typography component
          <span
            className="w-auto translate-x-[calc(100%+1.5rem)] animate-scoreboard whitespace-nowrap bg-gradient-to-r from-green-200 from-[17%] via-yellow-200 via-[48%] to-lightBlue to-[81%] bg-clip-text text-center text-[2.5rem] leading-[2.5rem] text-transparent sm:w-full sm:min-w-max sm:text-[3.5rem] sm:leading-[3.5rem]"
            onAnimationEnd={() => {
              setScoreBoardState("score");
            }}
          >
            {scoreboardState === "start" ? "GAME START" : "GOOOOOOAAALL"}
          </span>
        )}
      </button>
      <button
        onClick={() => void create_game({ account, player_2_address })}
        className="p-2 text-xl uppercase"
      >
        start game
      </button>
    </div>
  );
}
