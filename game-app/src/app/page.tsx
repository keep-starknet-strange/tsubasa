"use client";

import { DndContext, DragEndEvent, pointerWithin } from "@dnd-kit/core";
import PlayerBench from "./components/CardBench";
import ConnectButton from "./components/ConnectButton";
import Gameboard from "./components/gameboard/Gameboard";
import Scoreboard from "./components/Scoreboard";
import { useEffect, useState } from "react";

export default function Home() {
  // store number of players in bench
  const [playersInBench, setPlayersInBench] = useState([
    {
      id: "Ayush",
      name: "Ayush",
      position: "Goalkeeper",
    },
    {
      id: "Lucas",
      name: "Lucas",
      position: "Forward",
    },
    {
      id: "Yohan",
      name: "Yohan",
      position: "Midfielder",
    },
    {
      id: "Click",
      name: "Click",
      position: "Defender",
    },
  ]);

  // store map of players on gameboard
  const [playerPositions, setPlayerPositions] = useState({});
  const onDragEnd = (e: DragEndEvent) => {
    // return if no valid droppable position
    if (!e.over) return;

    // if player is placed on bench
    if (e.over.id.toString().includes("bench")) {
      //check if already included in bench
      let isPlayerPresent = false;
      playersInBench.map((eachPlayer) => {
        if (eachPlayer.id === e?.active?.data?.current?.id) {
          isPlayerPresent = true;
        }
      });
      if (isPlayerPresent) return;
      setPlayersInBench((prev) => [...prev, e.active.data.current]);
      setPlayerPositions((prev) => {
        // reset the old position and update the value of new position
        let prevPosition;
        Object.keys(prev).forEach((eachItem) => {
          if (
            prev?.[eachItem as keyof typeof playerPositions]?.id ===
            e?.active?.data?.current?.id
          ) {
            prevPosition = eachItem;
          }
        });

        return {
          ...prev,
          [prevPosition as keyof typeof playerPositions]: null,
        };
      });
      return;
    }

    // if player is not placed on bench
    let isValidPosition = false;
    setPlayerPositions((prev) => {
      // check if any other player already present on position
      if (prev?.[e?.over?.id as keyof typeof playerPositions]) {
        return prev;
      }
      isValidPosition = true;

      // reset the old position and update the value of new position
      let prevPosition;
      Object.keys(prev).forEach((eachItem) => {
        if (
          prev?.[eachItem as keyof typeof playerPositions]?.id ===
          e?.active?.data?.current?.id
        ) {
          prevPosition = eachItem;
        }
      });

      // if card was previously on some other position then reset that position value
      if (prevPosition) {
        return {
          ...prev,
          [`${e?.over?.id}`]: e.active.data.current,
          [prevPosition as keyof typeof playerPositions]: null,
        };
      }
      // else add new position with value in map
      else {
        return {
          ...prev,
          [`${e?.over?.id}`]: e.active.data.current,
        };
      }
    });

    if (isValidPosition) {
      setPlayersInBench((prev) =>
        prev.filter((eachItem) => eachItem.id !== e?.active?.data?.current?.id)
      );
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-4">
      <div className="flex w-full items-end justify-end md:fixed">
        <div className="p-2">
          <ConnectButton />
        </div>
      </div>
      <div className="flex h-full w-screen flex-1 flex-col">
        <DndContext collisionDetection={pointerWithin} onDragEnd={onDragEnd}>
          <div className="my-auto h-full w-full flex-1 md:relative md:flex md:items-center md:justify-center ">
            <div className="z-10 m-2 mx-auto w-max md:absolute md:left-1/2 md:top-0 md:m-0 md:-translate-x-1/2">
              <Scoreboard />
            </div>
            <Gameboard playerPositions={playerPositions} />
            <div className="z-10 m-2 mx-auto w-max md:absolute md:bottom-0 md:left-1/2 md:m-0 md:-translate-x-1/2">
              <PlayerBench playersInBench={playersInBench} />
            </div>
          </div>
        </DndContext>
      </div>
    </main>
  );
}
