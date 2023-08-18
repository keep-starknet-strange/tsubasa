"use client";

import PlayerPlaceholder from "./CardPlaceholder";

export default function PlayerBench() {
  return (
    <div className="flex items-start justify-center gap-2 rounded-xl bg-[#80D794] p-6">
      <PlayerPlaceholder />
      <PlayerPlaceholder />
      <PlayerPlaceholder />
      <PlayerPlaceholder />
    </div>
  );
}
