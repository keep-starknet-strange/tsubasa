import classNames from "classnames";
import CardAttribute from "./CardAttribute";
import type { CardColor, CardSize, CardState } from "./types";

interface CardHeaderProps {
  color: CardColor;
  pending: boolean;
  size: CardSize;
  dribble: number;
  stamina: number;
  state: CardState;
}

const CardHeader = ({
  size,
  color,
  pending,
  dribble,
  stamina,
  state,
}: CardHeaderProps) => {
  return (
    <div className={classNames("flex w-full justify-between")}>
      <div className="z-10">
        <CardAttribute
          size={size}
          buffed={state === "buffed"}
          hurt={state === "hurt"}
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
          type="stamina"
          value={stamina}
        />
      </div>
    </div>
  );
};

export default CardHeader;
