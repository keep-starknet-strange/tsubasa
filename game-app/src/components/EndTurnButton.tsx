"use client";

import { useState } from "react";

interface EndTurnProps {
  isWaiting: boolean;
}

export default function EndTurnButton({ isWaiting = false }: EndTurnProps) {
  const [isTapped, setIsTapped] = useState(false);

  return (
    <button
      className={`flex flex-row items-center rounded-full border border-green-600 p-3 px-6 font-bold text-greenBlack drop-shadow-lg ${
        isTapped ? "bg-green-200" : "bg-neon"
      } absolute bottom-0 md:relative md:hover:bg-green-200`}
      onTouchStart={() => setIsTapped(true)}
      onTouchEnd={() => setIsTapped(false)}
      onClick={() => {
        // end turn logic
      }}
    >
      {isWaiting ? "WAITING ..." : "END TURN"}
    </button>
  );
}
