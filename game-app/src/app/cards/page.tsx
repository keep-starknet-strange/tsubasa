"use client";

import { useState } from "react";

import PlayerCollection from "@/components/PlayerCollection";
import { testcards } from "@/helpers/testCards";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  pointerWithin,
} from "@dnd-kit/core";
import { ExtendedCardProps } from "@/components/card/types";
import PlayerDeck from "@/components/PlayerDeck";

const CardsPage = () => {
  const [playerCollection, setPlayerCollection] =
    useState<ExtendedCardProps[]>(testcards);

  const [cardPositions, setCardPositions] = useState<
    Record<string, ExtendedCardProps>
  >({});
  const [currentPickedCard, setCurrentPickedCard] = useState<string>("");
  const [currentHoveredPlaceholder, setCurrentHoveredPlaceholder] =
    useState<string>("");

  const onDragStart = (e: DragStartEvent) => {
    setCurrentPickedCard(e?.active.id.toString());
  };

  const onDragEnd = (e: DragEndEvent) => {
    // return if no valid droppable position
    if (!e.over) return;
    const currentSelectedCard = e?.active?.data?.current as ExtendedCardProps;
    const currentDropContainer = e?.over?.id;
    // if player is placed on bench
    console.log("DROPContainer");
    console.log(currentDropContainer);
    if (currentDropContainer.toString().includes("bench")) {
      //TODO METTRE DECK PLUTOT QUE BENCH
      //check if already part of bench
      let isPlayerPresent = false;
      playerCollection.map((eachPlayer) => {
        if (eachPlayer.id === currentSelectedCard?.id) {
          isPlayerPresent = true;
        }
      });
      if (isPlayerPresent) return;
      // include in bench
      setPlayerCollection((prev) => {
        return [...prev, currentSelectedCard];
      });
      return;
    }
    // if player is placed on gameboard
    setCardPositions((prev) => {
      // check if any other player already present on position
      if (prev?.[currentDropContainer as any]) {
        return prev;
      }
      console.log({ prev });
      console.log("ADD NEW POSITION");
      // else add new position with value in map
      return {
        ...prev,
        [currentDropContainer]: currentSelectedCard,
      };
    });
    // update player position and remove player from bench
    setPlayerCollection((prev) =>
      prev.filter((eachItem) => eachItem.id !== currentSelectedCard?.id)
    );
    setCurrentHoveredPlaceholder("");
  };

  const onDragOver = (e: DragOverEvent) => {
    if (!e.over) {
      setCurrentHoveredPlaceholder("");
      return;
    }
    setCurrentHoveredPlaceholder(e.over.id.toString());
  };
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center">
        <DndContext
          collisionDetection={pointerWithin}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
          onDragStart={onDragStart}
        >
          <div className="mt-auto flex flex-wrap">
            <PlayerDeck
              numSlots={8}
              cardPositions={cardPositions}
              currentHoveredPlaceholder="currenthoveredplaceholder"
              currentPickedCard="currentpickedcard"
            />
          </div>
          <div className="mt-auto">
            <PlayerCollection playerCollection={playerCollection} />
          </div>
        </DndContext>
      </div>
    </>
  );
};

export default CardsPage;
