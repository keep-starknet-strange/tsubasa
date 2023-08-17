import CaptainIcon from "../icons/CaptainIcon";
import type { FC } from "react";
import type { CardSize, TeamColor } from "./types";
import classNames from "classnames";

interface CardCaptainProps {
  team: TeamColor
  size: CardSize;
  pending: boolean;
}

const STAR_ICON_SIZES: Record<CardSize, number> = {
  xl: 24,
  lg: 20,
  md: 16,
  sm: 12,
  xs: 12,
};

const CardCaptain: FC<CardCaptainProps> = ({ team, pending, size }) => {
  return (
    <div
      className={classNames(
        "flex items-center justify-center rounded-full shadow",
        {
          "text-black": !pending,
          "text-white": pending,
          "bg-cyan-700": team === "blue" && pending,
          "bg-cyan-200": team === "blue" && !pending,
          "bg-yellow-700": team === "yellow" && pending,
          "bg-yellow-200": team === "yellow" && !pending,
          "bg-salmon-700": team === "red" && pending,
          "bg-salmon-200": team === "red" && !pending,

          "h-[40px] w-[40px]": size === "xl",
          "h-[32px] w-[32px]": size === "lg",
          "h-[24px] w-[24px]": size === "md",
          "h-[20px] w-[20px]": size === "sm",
          "h-[16px] w-[16px]": size === "xs",
        }
      )}
    >
      <CaptainIcon size={STAR_ICON_SIZES[size]} />
    </div>
  );
};

export default CardCaptain;
