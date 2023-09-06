import classNames from "classnames";
import CardAttribute from "./CardAttribute";
import type { CardColor, CardSize, CardState } from "./types";
import { stat } from "fs";

interface CardHeaderProps {
  color: CardColor;
  pending: boolean;
  size: CardSize;
  dribble: number;
  defense: number;
  currentDefense?: number;
  state: CardState;
}

const CardHeader = ({
  size,
  color,
  pending,
  dribble,
  defense,
  currentDefense,
  state,
}: CardHeaderProps) => {
  if (currentDefense! < defense) state = "hurt";
  return (
    <div className={classNames("flex w-full justify-between")}>
      <div className="z-10">
        <CardAttribute
          size={size}
          buffed={state === "buffed"}
          pending={pending}
          color={color}
          type="dribble"
          value={dribble}
        />
      </div>
      <div className="z-10">
        <CardAttribute
          size={size}
          buffed={state === "buffed"}
          hurt={state === "hurt"}
          pending={pending}
          color={color}
          type="defense"
          value={currentDefense ? currentDefense : defense}
        />
      </div>
    </div>
  );
};

export default CardHeader;
