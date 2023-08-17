import type { FC } from "react";
import type { CardAttributeTeam, CardAttributeType, CardSize } from "./types";
import classNames from "classnames";
import StaminaIcon from "../icons/StaminaIcon";
import DribbleIcon from "../icons/DribbleIcon";

interface CardAttributeProps {
  value: string | number;
  type: CardAttributeType;
  team: CardAttributeTeam;
  pending: boolean;
  bonus: boolean;
  hurt: boolean;
  size: CardSize;
}

const CardAttribute: FC<CardAttributeProps> = (props) => {
  const { value, type, team, pending, bonus, hurt, size } = props;

  return (
    <div
      className={classNames("p-1 shadow", {
        "bg-neon": bonus,
        "bg-red": hurt,
        "text-black": (bonus && !hurt) || !pending,
        "text-white": (pending && !bonus) || hurt,
        "bg-cyan-700": team === "blue" && pending && !bonus && !hurt,
        "bg-cyan-200": team === "blue" && !pending && !bonus && !hurt,
        "bg-yellow-700": team === "yellow" && pending && !bonus && !hurt,
        "bg-yellow-200": team === "yellow" && !pending && !bonus && !hurt,
        "bg-salmon-700": team === "red" && pending && !bonus && !hurt,
        "bg-salmon-200": team === "red" && !pending && !bonus && !hurt,

        "h-[60px] w-[32px] rounded": size === "xl",
        "h-[47px] w-[26px] rounded": size === "lg",
        "h-[37px] w-[22px] rounded": size === "md",
        "h-[29px] w-[18px] rounded-[3px]": size === "sm",
        "h-[24px] w-[14px] rounded-sm": size === "xs",
      })}
    >
      <div className="flex flex-col items-center">
        <div
          className={classNames("font-agrandir font-[767] leading-none", {
            "opacity-50": pending && !bonus && !hurt,
            "text-2xl": size === "xl",
            "text-xl": size === "lg",
            "text-base leading-[14px]": size === "md",
            "text-sm leading-[12px]": size === "sm",
            "text-xs leading-[10px]": size === "xs",
          })}
        >
          {value}
        </div>
        <div
          className={classNames({
            "opacity-25": pending && !bonus,
            "opacity-50": !pending || hurt || bonus,

            "h-[60px] w-[24px]": size === "xl",
            "h-[47px] w-[20px]": size === "lg",
            "h-[37px] w-[16px]": size === "md",
            "h-[29px] w-[12px]": size === "sm",
            "h-[24px] w-[8px]": size === "xs",
          })}
        >
          {type === "dribble" && <DribbleIcon />}
          {type === "stamina" && <StaminaIcon />}
        </div>
      </div>
    </div>
  );
};

export default CardAttribute;
