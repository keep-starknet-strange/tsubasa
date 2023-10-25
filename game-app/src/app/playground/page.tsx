"use client";

import { DndContext, pointerWithin } from "@dnd-kit/core";
import CardBench from "@/components/CardBench";
import ConnectButton from "@/components/buttons/ConnectButton";
import Gameboard from "@/components/gameboard/Gameboard";
import Scoreboard from "@/components/Scoreboard";
import { useEffect, useState } from "react";
import type { CardSize, ExtendedCardProps } from "@/components/card/types";
import type {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import EndTurnButton from "@/components/buttons/EndTurnButton";
import { testcards } from "@/helpers/testCards";
import JoinOrCreateModal from "@/components/JoinOrCreateModal";

export default function Home() {
  const [cardSize, setCardSize] = useState<CardSize>("xs");
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setCardSize("xs");
    } else {
      setCardSize("sm");
    }
  }, []);
  const [currentPickedCard, setCurrentPickedCard] = useState<string>("");
  const [currentHoveredPlaceholder, setCurrentHoveredPlaceholder] =
    useState<string>("");
  const [playersInBench, setPlayersInBench] =
    useState<ExtendedCardProps[]>(testcards);

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const handleCreateGame = () => {
    handleCloseModal();
  };
  const handleJoinGame = () => {
    handleCloseModal();
  };

  useEffect(() => {
    setPlayersInBench((prev) => {
      return prev.map((eachItem) => {
        return {
          ...eachItem,
          size: cardSize,
        };
      });
    });
  }, [cardSize]);

  // store map of players on gameboard
  const [cardPositions, setcardPositions] = useState<
    Record<string, ExtendedCardProps>
  >({});

  const onDragOver = (e: DragOverEvent) => {
    if (!e.over) {
      setCurrentHoveredPlaceholder("");
      return;
    }
    setCurrentHoveredPlaceholder(e.over.id.toString());
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

      // include in bench
      setPlayersInBench((prev) => {
        return [...prev, currentSelectedCard];
      });

      return;
    }

    // if player is placed on gameboard
    setcardPositions((prev) => {
      // check if any other player already present on position
      if (prev?.[currentDropContainer]) {
        return prev;
      }

      // else add new position with value in map
      return {
        ...prev,
        [currentDropContainer]: currentSelectedCard,
      };
    });

    // update player position and remove player from bench
    setPlayersInBench((prev) =>
      prev.filter((eachItem) => eachItem.id !== currentSelectedCard?.id)
    );
    setCurrentHoveredPlaceholder("");
  };

  const onDragStart = (e: DragStartEvent) => {
    setCurrentPickedCard(e?.active.id.toString());
  };
  return (
    <main className="flex h-screen flex-col items-center gap-4">
      <div className="z-10 flex w-full items-end justify-end md:fixed">
        <div className="p-2">
          <ConnectButton />
        </div>
      </div>
      <div className="flex h-full w-screen flex-1 flex-col">
        <DndContext
          collisionDetection={pointerWithin}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
          onDragStart={onDragStart}
        >
          <div className="my-auto h-full w-full flex-1 md:relative md:flex md:items-center md:justify-center ">
            <div className="z-10 m-2 mx-auto w-max md:absolute md:left-1/2 md:top-0 md:m-0 md:-translate-x-1/2">
              <Scoreboard />
            </div>
            <Gameboard
              currentPickedCard={currentPickedCard}
              cardPositions={cardPositions}
              currentHoveredPlaceholder={currentHoveredPlaceholder}
            />
            <div className="z-50 m-2 mx-auto flex justify-center md:absolute md:bottom-0 md:left-1/2 md:m-0 md:-translate-x-1/2">
              <CardBench playersInBench={playersInBench} />
            </div>
          </div>
          <EndTurnButton isWaiting={isWaiting} />
        </DndContext>
        <button onClick={handleOpenModal}>Créer ou rejoindre une partie</button>

        {/* La modale */}
        <JoinOrCreateModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onCreate={handleCreateGame}
          onJoin={handleJoinGame}
        />
      </div>
    </main>
  );
}
