/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */

import type { CardAttributeType, CardColor, CardSize } from "./types";
import classNames from "classnames";
import DefenseIcon from "../icons/DefenseIcon";
import DribbleIcon from "../icons/DribbleIcon";

interface CardAttributeProps {
  value: string | number;
  type: CardAttributeType;
  color: CardColor;
  pending: boolean;
  size: CardSize;
  buffed?: boolean;
  hurt?: boolean;
}

const CardAttribute = (props: CardAttributeProps) => {
  const { value, type, color, pending, buffed, hurt, size } = props;

  return (
    <div
      className={classNames("shadow", {
        "bg-neon": buffed,
        "bg-red": hurt,
        "text-black": (buffed && !hurt) || !pending,
        "text-white": (pending && !buffed) || hurt,
        "bg-cyan-700": color === "blue" && pending && !buffed && !hurt,
        "bg-cyan-200": color === "blue" && !pending && !buffed && !hurt,
        "bg-yellow-700": color === "yellow" && pending && !buffed && !hurt,
        "bg-yellow-200": color === "yellow" && !pending && !buffed && !hurt,
        "bg-salmon-700": color === "red" && pending && !buffed && !hurt,
        "bg-salmon-200": color === "red" && !pending && !buffed && !hurt,

        "h-[60px] w-[32px] rounded py-1.5": size === "xl",
        "h-[47px] w-[26px] rounded py-[5px]": size === "lg",
        "h-[37px] w-[22px] rounded py-1": size === "md",
        "h-[29px] w-[18px] rounded-[3px] py-[3px]": size === "sm",
        "h-[24px] w-[14px] rounded-sm py-[3px]": size === "xs",
      })}
    >
      <div className="relative flex h-full w-full flex-col justify-start">
        <div
          className={classNames(
            "w-full text-center font-agrandir font-[767] leading-none",
            {
              "opacity-50": pending && !buffed && !hurt,
              "text-2xl": size === "xl",
              "text-xl": size === "lg",
              "text-base": size === "md",
              "text-xs": size === "sm",
              "text-xxs": size === "xs",
            }
          )}
        >
          {value}
        </div>

        <div
          className={classNames(
            "relative flex w-full justify-center leading-none",
            {
              "opacity-25": pending && !buffed,
              "opacity-50": !pending || hurt || buffed,
            }
          )}
        >
          <div
            className={classNames("absolute", {
              "top-[-2px] h-[24px] w-[24px]": size === "xl",
              "top-[-2px] h-[20px] w-[20px]": size === "lg",
              "top-[-2px] h-[16px] w-[16px]": size === "md",
              "top-[-1px] h-[12px] w-[12px]": size === "sm",
              "top-0 h-[8px] w-[8px]": size === "xs",
            })}
          >
            {type === "dribble" && <DribbleIcon />}
            {type === "defense" && <DefenseIcon />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardAttribute;
