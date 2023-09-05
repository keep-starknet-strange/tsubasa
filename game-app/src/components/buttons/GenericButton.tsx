// GenericButton.tsx
import React, { useState, MouseEvent, TouchEvent } from "react";
import { isMobile } from "react-device-detect";

interface GenericButtonProps {
  label: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  customStyles?: string;
}

const GenericButton: React.FC<GenericButtonProps> = ({
  label,
  onClick,
  customStyles,
}) => {
  const [isTapped, setIsTapped] = useState(false);

  const handleTouchStart = (e: TouchEvent<HTMLButtonElement>) => {
    if (isMobile) {
      setIsTapped(true);
    }
  };

  const handleTouchEnd = (e: TouchEvent<HTMLButtonElement>) => {
    if (isMobile) {
      setIsTapped(false);
    }
  };

  const defaultStyles = `border border-green-600 md:rounded-full hover:bg-green-200 bg-neon p-3 px-6 font-bold text-greenBlack drop-shadow-lg`;

  return (
    <button
      className={`${defaultStyles} ${customStyles} ${
        isTapped && isMobile ? "bg-green-200" : ""
      }`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default GenericButton;
