import React from "react";
import CardPlaceholder from "./CardPlaceholder";
import { ExtendedCardProps } from "./card/types";

type PlayerDeckProps = {
  numSlots: number;
  cardPositions: Record<string, ExtendedCardProps>;
};

const PlayerDeck: React.FC<PlayerDeckProps> = ({ numSlots }) => {
  const placeholders = Array.from({ length: numSlots }, (_, i) => (
    <CardPlaceholder key={i} id={`slot${i + 1}`} />
  ));

  return <div className="flex flex-wrap">{placeholders}</div>;
};

export default PlayerDeck;
