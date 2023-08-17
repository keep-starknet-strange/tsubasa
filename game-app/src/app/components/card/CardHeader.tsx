import classNames from "classnames";
import CardAttribute from "./CardAttribute";
import type { FC } from "react";
import type { CardColor, CardSize } from "./types";

interface CardHeaderProps {
  color: CardColor;
  pending: boolean;
  size: CardSize;
  dribble: number;
  stamina: number;
}

const CardHeader: FC<CardHeaderProps> = ({
  size,
  color,
  pending,
  dribble,
  stamina,
}) => {
  return (
    <div className={classNames("flex w-full justify-between")}>
      <div className="z-10">
        <CardAttribute
          size={size}
          bonus={false}
          hurt={false}
          pending={pending}
          color={color}
          type="dribble"
          value={dribble}
        />
      </div>
      <div className="z-10">
        <CardAttribute
          size={size}
          bonus={false}
          hurt={true}
          pending={pending}
          color={color}
          type="stamina"
          value={stamina}
        />
      </div>
    </div>
  );
};

export default CardHeader;
