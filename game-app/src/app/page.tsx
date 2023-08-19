"use client";

import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  pointerWithin,
} from "@dnd-kit/core";
import PlayerBench from "./components/CardBench";
import ConnectButton from "./components/ConnectButton";
import Gameboard from "./components/gameboard/Gameboard";
import Scoreboard from "./components/Scoreboard";
import { useEffect, useState } from "react";
import useWindowDimensions from "./hooks/useWindowDimensions";
import { CardProps, CardSize } from "./components/card/types";

export interface ExtendedCardProps extends CardProps {
  id: string;
}

export default function Home() {
  // store number of players in bench
  const { width, height } = useWindowDimensions();
  const [cardSize, setCardSize] = useState<CardSize>("sm");
  const [currentHoveredPlaceholder, setCurrentHoveredPlaceholder] =
    useState<string>("");
  const [playersInBench, setPlayersInBench] = useState<ExtendedCardProps[]>([
    {
      id: "player-1",
      kind: "card",
      player: "1",
      captain: true,
      dribble: 1,
      energy: 1,
      size: cardSize,
      stamina: 7,
      color: "yellow",
      hover: false,
    },
    {
      id: "player-2",
      kind: "card",
      player: "1",
      captain: true,
      dribble: 1,
      energy: 1,
      size: cardSize,
      stamina: 7,
      color: "yellow",
      hover: false,
    },
    {
      id: "player-3",
      kind: "card",
      player: "1",
      captain: true,
      dribble: 1,
      energy: 1,
      size: cardSize,
      stamina: 7,
      color: "yellow",
      hover: false,
    },
    {
      id: "player-4",
      kind: "card",
      player: "1",
      captain: true,
      dribble: 1,
      energy: 1,
      size: cardSize,
      stamina: 7,
      color: "yellow",
      hover: false,
    },
  ]);

  // store map of players on gameboard
  const [playerPositions, setPlayerPositions] = useState<
    Record<string, ExtendedCardProps | null>
  >({});

  const onDragOver = (e: DragOverEvent) => {
    setCurrentHoveredPlaceholder(e.over?.id);
  };

  // handle drag interactions
  const onDragEnd = (e: DragEndEvent) => {
    // return if no valid droppable position

    if (!e.over) return;

    const currentSelectedCard = e?.active?.data?.current as ExtendedCardProps;
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

    // if player is placed on gameboard

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
      setCurrentHoveredPlaceholder("");
    }
  };

  // TODO: fix card size
  useEffect(() => {
    if (width < 1024 && cardSize !== "sm") {
      setCardSize("sm");
    } else if (width >= 1024 && cardSize !== "md") {
      setCardSize("md");
    }
  }, [width]);

  return (
    <main className="flex min-h-screen flex-col items-center gap-4">
      <div className="flex w-full items-end justify-end md:fixed">
        <div className="p-2">
          <ConnectButton />
        </div>
      </div>
      <div className="flex h-full w-screen flex-1 flex-col">
        <DndContext
          collisionDetection={pointerWithin}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
        >
          <div className="my-auto h-full w-full flex-1 md:relative md:flex md:items-center md:justify-center ">
            <div className="z-10 m-2 mx-auto w-max md:absolute md:left-1/2 md:top-0 md:m-0 md:-translate-x-1/2">
              <Scoreboard />
            </div>
            <Gameboard
              playerPositions={playerPositions}
              currentHoveredPlaceholder={currentHoveredPlaceholder}
            />
            <div className="z-50 m-2 mx-auto w-max md:absolute md:bottom-0 md:left-1/2 md:m-0 md:-translate-x-1/2">
              <PlayerBench playersInBench={playersInBench} />
            </div>
          </div>
        </DndContext>
      </div>
    </main>
  );
}
