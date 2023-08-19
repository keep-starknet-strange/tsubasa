"use client";

import { useDraggable } from "@dnd-kit/core";
import PlayerPlaceholder from "./CardPlaceholder";
import Card from "./Card";

export default function PlayerBench() {
  return (
    <div className="flex items-start justify-center gap-2 rounded-xl bg-[#80D794] p-6">
      <PlayerPlaceholder>
        <Card />
      </PlayerPlaceholder>
      <PlayerPlaceholder />
      <PlayerPlaceholder />
      <PlayerPlaceholder />
    </div>
  );
}
