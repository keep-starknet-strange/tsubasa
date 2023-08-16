import classNames from "classnames";
import type { CardSize } from "./types";
import type { FC } from "react";

interface CardHoverProps {
  size: CardSize;
}

const CardHover: FC<CardHoverProps> = ({ size }) => {
  return (
    <div
      className="absolute inset-x-0 bottom-0 z-10 flex h-1/2 items-end justify-center"
      style={{
        background:
          "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(255,255,255,1) 56%)",
      }}
    >
      <div
        className={classNames("font-erica-one font-normal text-yellow-300", {
          "mb-5 text-6xl": size === "xl",
          "mb-4 text-5xl": size === "lg",
          "mb-3 text-3xl": size === "md",
          "mb-2 text-xl": size === "sm",
          "text-lg": size === "xs",
        })}
      >
        MID
      </div>
    </div>
  );
};

export default CardHover;
