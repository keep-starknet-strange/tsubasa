"use client";

import PlayerPlaceholder from "./CardPlaceholder";
import Card from "./Card";

interface Props {
  playersInBench: { data: { id: string; name: string; position: string } }[];
}

const CARDS_ALLOWED_IN_DECK = 4;

export default function PlayerBench(props: Props) {
  const { playersInBench } = props;
  return (
    <div className="flex w-11/12 items-start justify-center rounded-xl bg-[#80D794] p-6">
      {[...Array(CARDS_ALLOWED_IN_DECK)].map((_, index) => (
        <PlayerPlaceholder key={index} id={`bench-${index}`}>
          {playersInBench[index] ? <Card data={playersInBench[index]} /> : null}
        </PlayerPlaceholder>
      ))}
    </div>
  );
}
