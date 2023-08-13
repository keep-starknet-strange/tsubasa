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
        "inline-flex flex-col items-center justify-center rounded p-1 pt-2 font-new-airport font-medium shadow",
        {
          "bg-mint-green": bonus,
          "bg-cherry-red": hurt,
          "text-black": bonus || !pending,
          "text-white": (pending || hurt) && !bonus,
          "bg-pine-green": team === "blue" && pending && !bonus && !hurt,
          "bg-turquoise": team === "blue" && !pending && !bonus && !hurt,
          "bg-mustard-seed": team === "yellow" && pending && !bonus && !hurt,
          "bg-sunny-yellow": team === "yellow" && !pending && !bonus && !hurt,
          "bg-cocoa": team === "red" && pending && !bonus && !hurt,
          "bg-peach-pink": team === "red" && !pending && !bonus && !hurt,
        }
      )}
    >
      <div
        className={classNames("font-extrabold", {
          "opacity-50": pending && !bonus && !hurt,
        })}
      >
        {value}
      </div>
      <div
        className={classNames({ "opacity-25": !hurt, "opacity-50": pending })}
      >
        {type === "dribble" && <DribbleIcon />}
        {type === "stamina" && <StaminaIcon />}
      </div>
    </div>
  );
};

export default CardAttribute;
