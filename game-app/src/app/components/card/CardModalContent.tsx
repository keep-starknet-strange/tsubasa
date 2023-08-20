import classNames from "classnames";
import Card from "./Card";
import { CardColor, CardSize } from "./types";
import { getCardSizeClassnames } from "./utils";
import { DribbleIcon, StaminaIcon } from "../icons";
import Image from "next/image";
import Button from "../Button";

interface CardModalContentProps {
  team: string;
  position: string;
  dribble: number;
  stamina: number;
  name: string;
  size: CardSize;
  color: CardColor;
  addToDeck?: () => Promise<void>;
}

const cardSize = "xl";

const CardModalContent = ({
  team,
  position,
  dribble,
  stamina,
  name,
  color,
  addToDeck,
}: CardModalContentProps) => {
  return (
    <div className=" flex h-full w-full items-center justify-center text-white">
      <div>
        <Card
          captain={false}
          color={color}
          dribble={3}
          energy={2}
          kind="card"
          size={cardSize}
          stamina={1}
          hover={false}
          player="1"
        />

        <div className={"mt-20 w-[224px]"}>
          <h1 className="mb-6 text-center text-2xl font-bold drop-shadow-md">
            {name}
          </h1>

          <div className="flex justify-between">
            <div className="text-left">Team</div>
            <div className=" text-right font-bold">{team}</div>
          </div>

          <div className="flex justify-between">
            <div className="text-left">Position</div>
            <div className="text-right font-bold">{position}</div>
          </div>

          <div className="flex justify-between">
            <div className="text-left">
              <div className="flex items-center">
                <div className="h-5 w-5">
                  <DribbleIcon />
                </div>
                <div className="ml-1">Dribble</div>
              </div>
            </div>
            <div className="text-right font-bold">{dribble}</div>
          </div>

          <div className="flex justify-between">
            <div className="text-left">
              <div className="flex items-center">
                <div className="h-5 w-5">
                  <StaminaIcon />
                </div>
                <div className="ml-1">Stamina</div>
              </div>
            </div>
            <div className="text-right font-bold">{stamina}</div>
          </div>

          <div className="mt-10 flex">
            {addToDeck && (
              <Button className="w-full" onClick={addToDeck} variant="primary">
                Add to deck
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardModalContent;
