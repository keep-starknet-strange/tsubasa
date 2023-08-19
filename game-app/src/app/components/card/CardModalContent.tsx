import classNames from "classnames";
import Card from "./Card";
import { CardSize } from "./types";
import { getCardSizeClassnames } from "./utils";
import { DribbleIcon, StaminaIcon } from "../icons";

interface CardModalContentProps {
  team: string;
  position: string;
  dribble: number;
  stamina: number;
  name: string;
  size: CardSize;
}

const cardSize = "xl";

const CardModalContent = ({
  team,
  position,
  dribble,
  stamina,
  name,
}: CardModalContentProps) => {
  return (
    <div className="flex  flex-col items-center justify-center text-white">
      <Card
        captain={false}
        color="blue"
        dribble={3}
        energy={2}
        kind="card"
        size={cardSize}
        stamina={1}
        hover={false}
        player="1"
      />

      <div className={"mt-10 w-[224px]"}>
        <h1 className="text-center text-2xl font-bold leading-7">{name}</h1>

        <div className="flex">
          <div className="flex-1 text-left">Team</div>
          <div className="flex-1 text-right font-bold">{team}</div>
        </div>

        <div className="flex">
          <div className="flex-1 text-left">Position</div>
          <div className="flex-1 text-right font-bold">{position}</div>
        </div>

        <div className="flex">
          <div className="flex-1 text-left">
            <div className="flex items-center">
              <div className="h-5 w-5">
                <DribbleIcon />
              </div>
              <div className="ml-1">Dribble</div>
            </div>
          </div>
          <div className="flex-1 text-right font-bold">{dribble}</div>
        </div>

        <div className="flex">
          <div className="flex-1 text-left">
            <div className="flex items-center">
              <div className="h-5 w-5">
                <StaminaIcon />
              </div>
              <div className="ml-1">Stamina</div>
            </div>
          </div>
          <div className="flex-1 text-right font-bold">{stamina}</div>
        </div>
      </div>
    </div>
  );
};

export default CardModalContent;
