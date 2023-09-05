import type { CardColor, CardSize } from "./types";
import Card from "./Card";
import { DribbleIcon, StaminaIcon } from "../icons";
import GenericButton from "../buttons/GenericButton";

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
          <h1 className="mb-4 text-center text-2xl font-bold drop-shadow-md">
            {name}
          </h1>

          <div className="mt-2 flex justify-between text-sm leading-4">
            <div className="text-left font-normal opacity-75">Team</div>
            <div className=" text-right font-bold">{team}</div>
          </div>

          <div className="mt-2 flex justify-between text-sm leading-4">
            <div className="text-left font-normal opacity-75">Position</div>
            <div className="text-right font-bold">{position}</div>
          </div>

          <div className="mt-2 flex justify-between text-sm ">
            <div className="text-left  font-normal">
              <div className="flex items-center">
                <div className="h-5 w-5">
                  <DribbleIcon />
                </div>
                <div className="ml-1 leading-5 opacity-75">Dribble</div>
              </div>
            </div>
            <div className="text-right font-bold leading-4">{dribble}</div>
          </div>

          <div className="mt-2 flex justify-between text-sm leading-5">
            <div className="text-left font-normal">
              <div className="flex items-center">
                <div className="h-5 w-5">
                  <StaminaIcon />
                </div>
                <div className="ml-1 leading-5 opacity-75">Stamina</div>
              </div>
            </div>
            <div className="text-right font-bold leading-4">{stamina}</div>
          </div>

          <div className="mt-10 flex">
            {addToDeck && (
              <GenericButton
                customStyles="w-full"
                onClick={addToDeck}
                label="Add to Deck"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardModalContent;
