import classNames from "classnames";
import CardAttribute from "./CardAttribute";
import type { FC } from "react";
import type { CardSize, CardAttributeTeam } from "./types";

interface CardHeaderProps {
  team: CardAttributeTeam;
  pending: boolean;
  size: CardSize;
  dribble: number;
  stamina: number;
}

const CardHeader: FC<CardHeaderProps> = ({
  size,
  team,
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
          team={team}
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
          team={team}
          type="stamina"
          value={stamina}
        />
      </div>
    </div>
  );
};

export default CardHeader;
