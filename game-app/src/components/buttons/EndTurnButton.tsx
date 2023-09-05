"use client";

import React from "react";
import GenericButton from "./GenericButton";

interface EndTurnProps {
  isWaiting?: boolean;
}

const EndTurnButton: React.FC<EndTurnProps> = ({ isWaiting = false }) => {
  const customStyles = `fixed bottom-0 right-0 z-50 rounded-tl-3xl md:bottom-5 md:right-5`;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("end turn");
  };

  return (
    <GenericButton
      label={isWaiting ? "WAITING ..." : "END TURN"}
      onClick={handleClick}
      customStyles={customStyles}
    />
  );
};

export default EndTurnButton;
