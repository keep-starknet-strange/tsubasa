import type { FC } from "react";
import classNames from "classnames";
import Image from "next/image";
import type { CardSize, TeamColor } from "./types";
import CardEnergy from "./CardEnergy";
import CardSticker from "./CardSticker";
import CardHover from "./CardHover";
import CardCaptain from "./CardCaptain";
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
      style={{
        backgroundImage: `url('/images/players/${player}.png')`,
      }}
      className={classNames(
        "relative z-0 min-h-[80px] min-w-[56px] border-2 border-white bg-cover bg-center bg-no-repeat shadow-md",
        {
          "h-[320px] min-h-[320px] w-[224px] min-w-[224px] rounded-lg":
            size === "xl",
          "h-[240px] min-h-[240px] w-[168px] min-w-[168px] rounded-lg":
            size === "lg",
          "h-[160px] min-h-[160px] w-[112px] min-w-[112px] rounded-lg":
            size === "md",
          "h-[120px] min-h-[120px] w-[84px] min-w-[84px] rounded":
            size === "sm",
          "h-[80px] min-h-[80px] w-[56px] min-w-[56px] rounded": size === "xs",

          "bg-cyan-700": team === "blue" && pending,
          "bg-yellow-700": team === "yellow" && pending,
          "bg-salmon-700": team === "red" && pending,
          "bg-cyan-500": team === "blue" && !pending,
          "bg-yellow-500": team === "yellow" && !pending,
          "bg-salmon-500": team === "red" && !pending,
        }
      )}
    >
      {captain && (
        <div
          className={classNames("absolute z-10 flex w-full justify-center", {
            "top-[-20px]": size === "xl",
            "top-[-16px]": size === "lg",
            "top-[-12px]": size === "md",
            "top-[-10px]": size === "sm",
            "top-[-9px]": size === "xs",
          })}
        >
          <CardCaptain pending={pending} size={size} team={team} />
        </div>
      )}

      {/* {player && (
        <Image
          className="absolute inset-0 z-0 rounded"
          fill={true}
          src={`/images/players/${player}.png`}
          alt="player"
        />
      )} */}

      {hover && <CardHover size={size} />}

      <div
        className={classNames("h-full", {
          "p-2.5": size === "xl",
          "p-2": size === "lg",
          "p-1.5": size === "md",
          "p-1": size === "sm",
          "p-0.5": size === "xs",
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

      <CardEnergy hideValue={hover} energy={energy} size={size} />
    </div>
  );
};

export default Card;
