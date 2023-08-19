"use client";

import PlayerPlaceholder from "./CardPlaceholder";
import Card from "./card/Card";
import type { ExtendedCardProps } from "./card/types";
import DraggableCard from "./dragAndDrop/DraggableCard";

const CARDS_ALLOWED_IN_DECK = 4;

interface Props {
  playersInBench: ExtendedCardProps[];
}

export default function CardBench(props: Props) {
  const { playersInBench } = props;
  return (
    <div className="flex w-11/12 items-start justify-center rounded-xl bg-[#80D794] p-2">
      {Array.from({ length: CARDS_ALLOWED_IN_DECK }, (_, index) => (
        <PlayerPlaceholder key={index} id={`bench-${index}`}>
          {playersInBench[index] ? (
            <DraggableCard
              id={playersInBench[index].id}
              data={playersInBench[index]}
            >
              <Card {...playersInBench[index]} />
            </DraggableCard>
          ) : null}
        </PlayerPlaceholder>
      ))}
    </div>
  );
}
