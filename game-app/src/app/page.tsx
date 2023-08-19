"use client";

import { DndContext, DragEndEvent, pointerWithin } from "@dnd-kit/core";
import PlayerBench from "./components/CardBench";
import ConnectButton from "./components/ConnectButton";
import Gameboard from "./components/Gameboard/Gameboard";
import Scoreboard from "./components/Scoreboard";
import { useEffect, useState } from "react";

interface CardProps {
  id: string;
  name: string;
  position: string;
}

export default function Home() {
  // store number of players in bench
  const [playersInBench, setPlayersInBench] = useState<CardProps[]>([
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
  const [playerPositions, setPlayerPositions] = useState<
    Record<string, CardProps | null>
  >({});

  // handle drag interactions
  const onDragEnd = (e: DragEndEvent) => {
    // return if no valid droppable position
    if (!e.over) return;

    const currentSelectedCard = e?.active?.data?.current as CardProps;
    const currentDropContainer = e?.over?.id;

    // if player is placed on bench
    if (currentDropContainer.toString().includes("bench")) {
      //check if already part of bench
      let isPlayerPresent = false;
      playersInBench.map((eachPlayer) => {
        if (eachPlayer.id === currentSelectedCard?.id) {
          isPlayerPresent = true;
        }
      });
      if (isPlayerPresent) return;

      //check if player is part of gamefield
      let prevPosition = "";
      Object.keys(playerPositions).forEach((eachItem) => {
        if (playerPositions?.[eachItem]?.id === currentSelectedCard?.id) {
          prevPosition = eachItem;
        }
      });

      // unset the gamefield position if already present
      if (prevPosition.length > 0) {
        setPlayerPositions((prev) => {
          // reset the old position and update the value of new position
          return {
            ...prev,
            [prevPosition]: null,
          };
        });
      }

      // include in bench
      setPlayersInBench((prev) => {
        return [...prev, currentSelectedCard];
      });

      return;
    }

    // if player is not placed on bench

    // flag to check if valid position chosen by user
    let isValidPosition = false;
    setPlayerPositions((prev) => {
      // check if any other player already present on position
      if (prev?.[currentDropContainer]) {
        return prev;
      }

      // valid position check passes since user has not placed card on pre-occupied position
      isValidPosition = true;

      // check if the card was ocupying a position on the gamefield previously
      let prevPosition;
      Object.keys(prev).forEach((eachItem) => {
        if (prev?.[eachItem]?.id === currentSelectedCard?.id) {
          prevPosition = eachItem;
        }
      });

      // if card was previously on some other position then reset that position value and update with new position
      if (prevPosition) {
        return {
          ...prev,
          [currentDropContainer]: currentSelectedCard,
          [prevPosition]: null,
        };
      }

      // else add new position with value in map
      return {
        ...prev,
        [currentDropContainer]: currentSelectedCard,
      };
    });

    // if valid drop container then remove player from bench
    if (isValidPosition) {
      setPlayersInBench((prev) =>
        prev.filter((eachItem) => eachItem.id !== currentSelectedCard?.id)
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
