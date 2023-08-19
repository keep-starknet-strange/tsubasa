"use client";

import PlayerPlaceholder from "./CardPlaceholder";
import Card from "./Card";

export default function PlayerBench() {
  return (
    <div className="flex items-start justify-center gap-2 rounded-xl bg-[#80D794] p-6">
      <PlayerPlaceholder position="bench-1">
        <Card
          playerName="Ayush"
          data={{ name: "ayush", position: "Goalkeeper" }}
        />
      </PlayerPlaceholder>
      <PlayerPlaceholder position="bench-2">
        <Card
          playerName="Lucas"
          data={{ name: "Lucas", position: "Forward" }}
        />
      </PlayerPlaceholder>
      <PlayerPlaceholder position="bench-3">
        <Card
          playerName="Yohan"
          data={{ name: "Yohan", position: "Midfielder" }}
        />
      </PlayerPlaceholder>
      <PlayerPlaceholder position="bench-4">
        <Card
          playerName="Click"
          data={{ name: "Click", position: "Defender" }}
        />
      </PlayerPlaceholder>
    </div>
  );
}
