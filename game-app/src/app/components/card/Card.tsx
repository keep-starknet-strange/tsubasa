import type { FC } from "react";
import classNames from "classnames";
import Image from "next/image";
import type { CardSize, TeamColor } from "./types";
import CardEnergy from "./CardEnergy";
import CardSticker from "./CardSticker";
import CardHover from "./CardHover";
import CardCaptainIcon from "./CardCaptainIcon";
import CardHeader from "./CardHeader";

interface CardProps {
  team: TeamColor;
  player?: string;
  hover: boolean;
  captain: boolean;
  size: CardSize;
  pending: boolean;
  dribble: number;
  stamina: number;
  energy: number;
}

const Card: FC<CardProps> = (props) => {
  const {
    team,
    player,
    hover,
    captain,
    size,
    pending,
    dribble,
    stamina,
    energy,
  } = props;
  return (
    <div
      className={classNames(
        "relative z-0 min-h-[80px] min-w-[56px] rounded-lg border-4 border-white shadow-md",
        {
          "h-[320px] min-h-[320px] w-[224px] min-w-[224px]": size === "xl",
          "h-[240px] min-h-[240px] w-[168px] min-w-[168px]": size === "lg",
          "h-[160px] min-h-[160px] w-[112px] min-w-[112px]": size === "md",
          "h-[120px] min-h-[120px] w-[84px] min-w-[84px]": size === "sm",
          "h-[80px] min-h-[80px] w-[56px] min-w-[56px]": size === "xs",

          "bg-cyan-700": team === "blue" && pending,
          "bg-yellow-700": team === "yellow" && pending,
          "bg-salmon-700": team === "red" && pending,
          "bg-cyan-500": team === "blue" && !pending,
          "bg-yellow-500": team === "yellow" && !pending,
          "bg-salmon-500": team === "red" && !pending,
        }
      )}
    >
      {captain && <CardCaptainIcon pending={pending} size={size} team={team} />}
      <CardEnergy hideValue={hover} energy={energy} size={size} />

      {player && (
        <Image
          className="absolute inset-0 z-0 rounded-lg"
          fill={true}
          src={`/images/players/${player}.png`}
          alt="player"
        />
      )}

      {hover && <CardHover size={size} />}

      <div
        className={classNames("h-full p-1", {
          "h-full p-2": size === "xl",
        })}
      >
        <div className="relative h-full w-full">
          <CardHeader
            dribble={dribble}
            pending={pending}
            size={size}
            stamina={stamina}
            team={team}
          />
          {size === "xl" && !hover && <CardSticker />}
        </div>
      </div>
    </div>
  );
};

export default Card;
