"use client";

import { ExtendedCardProps } from "../page";
import PlayerPlaceholder from "./CardPlaceholder";
import Card from "./card/Card";
import Draggable from "./dnd/Draggable";

const CARDS_ALLOWED_IN_DECK = 4;

interface Props {
  playersInBench: ExtendedCardProps[];
}

export default function PlayerBench(props: Props) {
  const { playersInBench } = props;
  return (
    <div className="flex w-11/12 items-start justify-center rounded-xl bg-[#80D794] p-2">
      {Array.from({ length: CARDS_ALLOWED_IN_DECK }, (_, index) => (
        <PlayerPlaceholder key={index} id={`bench-${index}`}>
          {playersInBench[index] ? (
            <Draggable
              id={playersInBench[index].id}
              data={playersInBench[index]}
            >
              <Card {...playersInBench[index]} />
            </Draggable>
          ) : null}
        </PlayerPlaceholder>
      ))}
    </div>
  );
}
