import type { CardColor, CardSize } from "./types";
import Card from "./Card";
import { DribbleIcon, DefenseIcon } from "../icons";
import GenericButton from "../buttons/GenericButton";

interface CardModalContentProps {
  team: string;
  position: string;
  dribble: number;
  defense: number;
  name: string;
  size: CardSize;
  color: CardColor;
  addToDeckArgument: () => void;
  toggleStar: () => void;
  starSelected: boolean;
}

const cardSize = "xl";

const CardModalContent = ({
  team,
  position,
  dribble,
  defense,
  name,
  color,
  addToDeckArgument,
  toggleStar,
  starSelected,
}: CardModalContentProps) => {
  const addToDeck = () => {
    addToDeckArgument();
  };
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
          defense={1}
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
                  <DefenseIcon />
                </div>
                <div className="ml-1 leading-5 opacity-75">defense</div>
              </div>
            </div>
            <div className="text-right font-bold leading-4">{defense}</div>
          </div>

          <div className="mt-10 flex">
            {addToDeck && (
              <div className="flex">
                <GenericButton
                  customStyles="w-full mr-2"
                  onClick={addToDeck}
                  label="Add to Deck"
                />
                <button
                  onClick={toggleStar}
                  className={`star-button ${
                    starSelected
                      ? "border-yellow-500 text-yellow-500"
                      : "text-gray-400 border-gray-400"
                  } mt-1 flex h-11 w-14  items-center justify-center rounded-full border-2 border-grey bg-transparent text-xl transition-colors duration-300 focus:outline-none`}
                >
                  ★
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardModalContent;
