import type { FC } from "react";
import CardAttribute from "./CardAttribute";
import classNames from "classnames";
import Image from "next/image";
import CaptainIcon from "../icons/CaptainIcon";
import type { CardSize, TeamColor } from "./types";
import CardEnergy from "./CardEnergy";

interface CardProps {
  team: TeamColor;
  player: string;
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
      className={`relative z-0 min-h-[80px] min-w-[56px] rounded-lg border-4 border-white bg-white shadow-md h-card-${size} w-card-${size}`}
    >
      {captain && (
        <div className="absolute top-[-20px] z-10 flex w-full justify-center">
          <CaptainIcon team={team} pending={pending} size={size} />
        </div>
      )}

      <CardEnergy hideValue={hover} energy={energy} size={size} />

      <div className="p-1">
        {hover && (
          <div
            className=" absolute inset-x-0 bottom-0 z-10 flex h-1/2 items-end justify-center"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(255,255,255,1) 56%)",
            }}
          >
            <div
              className={classNames(
                "font-erica-one font-normal text-yellow-300",
                {
                  "mb-5 text-6xl": size === "xl",
                  "mb-4 text-5xl": size === "lg",
                  "mb-3 text-3xl": size === "md",
                  "mb-2 text-xl": size === "sm",
                  "text-lg": size === "xs",
                }
              )}
            >
              MID
            </div>
          </div>
        )}

        <div
          className={classNames("flex w-full justify-between overflow-hidden")}
        >
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
              hurt={false}
              pending={pending}
              team={team}
              type="stamina"
              value={stamina}
            />
          </div>
        </div>

        <Image
          className=" absolute inset-0 z-0 rounded-lg"
          fill={true}
          src={`/images/players/${player}.png`}
          alt="player"
        />
      </div>
    </div>
  );
};

export default Card;
