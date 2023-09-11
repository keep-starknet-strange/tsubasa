"use client";

import { useState } from "react";

import PlayerCollection from "@/components/PlayerCollection";
import { testcards } from "@/helpers/testCards";
import { CardData, ExtendedCardProps } from "@/components/card/types";
import PlayerDeck from "@/components/PlayerDeck";

const CardsPage = () => {
  const [playerCollection, setPlayerCollection] =
    useState<ExtendedCardProps[]>(testcards);

  const [cardPositions, setCardPositions] = useState<
    Record<string, ExtendedCardProps>
  >({});

  const handleAddToDeck = (cardDetails: CardData) => {
    // Trouver le premier emplacement vide
    let slot: string = "";
    for (let i = 1; i <= 8; i++) {
      if (!cardPositions[`slot${i}`]) {
        slot = `slot${i}`;
        break;
      }
    }

    // Si un emplacement est trouvé, ajoutez la carte à cet emplacement
    if (slot) {
      setCardPositions((prev) => ({
        ...prev,
        [slot]: cardDetails as ExtendedCardProps,
      }));
    } else {
      console.log("Deck is full!");
    }
  };

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="mt-auto flex flex-wrap">
          <PlayerDeck numSlots={8} cardPositions={cardPositions} />
        </div>
        <div className="mt-auto">
          <PlayerCollection
            playerCollection={playerCollection}
            handleAddToDeckPage={handleAddToDeck}
          />
        </div>
      </div>
    </>
  );
};

export default CardsPage;
