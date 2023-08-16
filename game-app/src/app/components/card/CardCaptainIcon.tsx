import CaptainIcon from "../icons/CaptainIcon";
import type { FC } from "react";
import type { CardSize, TeamColor } from "./types";

interface CardCaptainIconProps {
  team: TeamColor;
  size: CardSize;
  pending: boolean;
}

const CardCaptainIcon: FC<CardCaptainIconProps> = ({ team, pending, size }) => {
  return (
    <div className="absolute top-[-20px] z-10 flex w-full justify-center">
      <CaptainIcon team={team} pending={pending} size={size} />
    </div>
  );
};

export default CardCaptainIcon;
