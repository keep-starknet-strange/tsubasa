import classNames from "classnames";
import { FC } from "react";
import StaminaIcon from "../icons/StaminaIcon";
import DribbleIcon from "../icons/DribbleIcon";

type CardAttributeType = "dribble" | "stamina";

interface CardAttributeProps {
  value: string | number;
  type: CardAttributeType;
  team: CardAttributeTeam;
  pending: boolean;
  bonus: boolean;
  hurt: boolean;
}

type CardAttributeTeam = "red" | "blue" | "yellow";

const CardAttribute: FC<CardAttributeProps> = (props) => {
  const { value, type, team, pending, bonus, hurt } = props;

  return (
    <div
      className={classNames(
        "inline-flex flex-col items-center justify-center rounded px-1 pb-1 pt-3 shadow",
        {
          "bg-neon": bonus,
          "bg-red": hurt,
          "text-black": bonus || !pending,
          "text-white": (pending || hurt) && !bonus,
          "bg-cyan-700": team === "blue" && pending && !bonus && !hurt,
          "bg-cyan-200": team === "blue" && !pending && !bonus && !hurt,
          "bg-yellow-700": team === "yellow" && pending && !bonus && !hurt,
          "bg-yellow-200": team === "yellow" && !pending && !bonus && !hurt,
          "bg-salmon-700": team === "red" && pending && !bonus && !hurt,
          "bg-salmon-200": team === "red" && !pending && !bonus && !hurt,
        }
      )}
    >
      <div
        className={classNames("font-agrandir text-2xl font-bold leading-4", {
          "opacity-50": pending && !bonus && !hurt,
        })}
      >
        {value}
      </div>
      <div
        className={classNames({
          "opacity-25": pending,
          "opacity-50": !pending,
        })}
      >
        {type === "dribble" && <DribbleIcon />}
        {type === "stamina" && <StaminaIcon />}
      </div>
    </div>
  );
};

export default CardAttribute;
