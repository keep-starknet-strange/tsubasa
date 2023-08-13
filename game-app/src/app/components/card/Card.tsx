import type { FC } from "react";
import CardAttribute from "./CardAttribute";
import classNames from "classnames";
import Image from "next/image";

interface CardProps {
  team: "red" | "blue" | "yellow";
  player: string;
  hover: boolean;
}

const Card: FC<CardProps> = ({ team, player, hover }) => {
  return (
    <div
      className={classNames(
        "relative z-0 h-[320px] w-[224px] rounded border-4 border-white bg-white p-3 shadow-md"
      )}
    >
      {hover && (
        <div
          className=" absolute inset-x-0 bottom-0 z-10 flex h-1/2 items-end justify-center"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(255,255,255,1) 56%)",
          }}
        >
          <div className="mb-5 font-erica-one text-7xl font-normal text-[#FDC601]">
            MID
          </div>
        </div>
      )}

      <div className="absolute inset-0">
        <Image
          className="rounded"
          fill={true}
          src={`/images/players/${player}.png`}
          alt="player"
        />
      </div>
      <div className="flex justify-between">
        <div className="z-10">
          <CardAttribute
            bonus={false}
            hurt={false}
            pending={false}
            team={team}
            type="dribble"
            value={3}
          />
        </div>
        <div className="z-10">
          <CardAttribute
            bonus={false}
            hurt={true}
            pending={false}
            team={team}
            type="stamina"
            value={10}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
