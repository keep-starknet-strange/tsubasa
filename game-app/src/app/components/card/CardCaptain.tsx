import CaptainIcon from "../icons/CaptainIcon";
import type { FC } from "react";
import type { CardSize, TeamColor } from "./types";
import classNames from "classnames";

interface CardCaptainProps {
  team: TeamColor;
  size: CardSize;
  pending: boolean;
}

const CardCaptain: FC<CardCaptainProps> = ({ team, pending, size }) => {
  return (
    <div
      className={classNames("absolute z-10 flex w-full justify-center", {
        "top-[-20px]": size === "xl",
        "top-[-16px]": size === "lg",
        "top-[-12px]": size === "md",
        "top-[-10px]": size === "sm",
        "top-[-9px]": size === "xs",
      })}
    >
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
        <div
          className={classNames({
            "h-[24px] w-[24px]": size === "xl",
            "h-[20px] w-[20px]": size === "lg",
            "h-[16px] w-[16px]": size === "md",
            "h-[12px] w-[12px]": size === "sm" || size === "xs",
            "opacity-50": pending,
          })}
        >
          <CaptainIcon />
        </div>
      </div>
    </div>
  );
};

export default CardCaptain;
