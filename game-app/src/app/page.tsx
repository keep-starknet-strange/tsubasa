"use client";

import { DndContext, closestCenter } from "@dnd-kit/core";
import PlayerBench from "./components/CardBench";
import ConnectButton from "./components/ConnectButton";
import Gameboard from "./components/Gameboard/Gameboard";
import Scoreboard from "./components/Scoreboard";

export default function Home() {
  const onDragEnd = ({ over }) => {
    console.log({ over });
  };
  return (
    <main className="flex min-h-screen flex-col items-center gap-4">
      <div className="flex w-full items-end justify-end md:fixed">
        <div className="p-2">
          <ConnectButton />
        </div>
      </div>
      <div className="flex h-full w-screen flex-1 flex-col">
        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <div className="my-auto h-full w-full flex-1 md:relative md:flex md:items-center md:justify-center ">
            <div className="z-10 m-2 mx-auto w-max md:absolute md:left-1/2 md:top-0 md:m-0 md:-translate-x-1/2">
              <Scoreboard />
            </div>
            <Gameboard />
            <div className="z-10 m-2 mx-auto w-max md:absolute md:bottom-0 md:left-1/2 md:m-0 md:-translate-x-1/2">
              <PlayerBench />
            </div>
          </div>
        </DndContext>
      </div>
    </main>
  );
}
