"use client";

import { useState } from "react";
import { isMobile } from "react-device-detect";

interface EndTurnProps {
  isWaiting: boolean;
}

export default function EndTurnButton({ isWaiting = false }: EndTurnProps) {
  const [isTapped, setIsTapped] = useState(false);
  console.log(isMobile);
  const handleTouchStart = () => {
    if (isMobile) {
      setIsTapped(true);
    }
  };

  const handleTouchEnd = () => {
    if (isMobile) {
      setIsTapped(false);
    }
  };

  return (
    <button
      className={`absolute bottom-0 right-0 z-50 rounded-tl-3xl border border-green-600 bg-neon p-3 px-6 font-bold text-greenBlack drop-shadow-lg hover:bg-green-200 md:bottom-5 md:right-5 md:rounded-full
      ${isTapped && isMobile ? "bg-green-200" : ""} 
      hover:bg-green-200`}
      onTouchStart={() => {
        handleTouchStart;
      }}
      onTouchEnd={() => {
        handleTouchEnd;
      }}
      onClick={() => {
        console.log("end turn");
      }}
    >
      {isWaiting ? "WAITING ..." : "END TURN"}
    </button>
  );
}
