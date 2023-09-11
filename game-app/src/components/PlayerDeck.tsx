import React from "react";
import CardPlaceholder from "./CardPlaceholder";
import { ExtendedCardProps } from "./card/types";

type PlayerDeckProps = {
  numSlots: number;
  cardPositions: Record<string, ExtendedCardProps>;
};

const PlayerDeck: React.FC<PlayerDeckProps> = (props: PlayerDeckProps) => {
  const placeholders = Array.from({ length: props.numSlots }, (_, i) => {
    return (
      <CardPlaceholder
        key={i}
        id={`slot${i + 1}`}
        position={`${i + 1}`}
        cardPositions={props.cardPositions}
      />
    );
  });

  return <div className="flex flex-wrap">{placeholders}</div>;
};

export default PlayerDeck;