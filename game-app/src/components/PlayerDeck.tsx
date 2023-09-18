import React from "react";
import CardPlaceholder from "./CardPlaceholder";
import { ExtendedCardProps } from "./card/types";

type PlayerDeckProps = {
  numSlots: number;
  cardPositions: Record<string, ExtendedCardProps>;
};

const PlayerDeck: React.FC<PlayerDeckProps> = (props: PlayerDeckProps) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const placeholders = Array.from({ length: props.numSlots }, (_, i) => {
    const position = i === 0 ? "★" : `${i}`;
    return (
      <div key={i} className="m-auto h-28 w-20 flex-grow md:h-32 md:w-24">
        <CardPlaceholder
          key={i}
          id={`slot${i + 1}`}
          position={position}
          cardPositions={props.cardPositions}
        />
      </div>
    );
  });

  if (isMobile && props.numSlots === 8) {
    const placeholdersRow1 = placeholders.slice(0, 4);
    const placeholdersRow2 = placeholders.slice(4, 8);
    return (
      <div className="flex w-full flex-col">
        <div className="my-4 flex w-full justify-center">
          {placeholdersRow1}
        </div>
        <div className="my-4 flex w-full justify-center">
          {placeholdersRow2}
        </div>
      </div>
    );
  }

  return <div className="m-auto flex flex-wrap">{placeholders}</div>;
};

export default PlayerDeck;
