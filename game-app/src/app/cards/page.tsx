"use client";

import { useState } from "react";
import { MdWarning } from "react-icons/md";

import PlayerCollection from "@/components/PlayerCollection";
import { testcards } from "@/helpers/testCards";
import { CardData, ExtendedCardProps } from "@/components/card/types";
import PlayerDeck from "@/components/PlayerDeck";
import GenericButton from "@/components/buttons/GenericButton";

const CardsPage = () => {
  const [playerCollection, setPlayerCollection] =
    useState<ExtendedCardProps[]>(testcards);

  const countCardsInDeck = () => {
    console.log(Object.keys(cardPositions).length);
    return Object.keys(cardPositions).length;
  };

  const [cardPositions, setCardPositions] = useState<
    Record<string, ExtendedCardProps>
  >({});

  const handleAddToDeck = (cardDetails: ExtendedCardProps) => {
    const updatedCollection = playerCollection.filter(
      (card) => card.id !== cardDetails.id
    );
    setPlayerCollection(updatedCollection);

    let slot = "";
    for (let i = 1; i <= 8; i++) {
      if (!cardPositions[`slot${i}`]) {
        slot = `slot${i}`;
        break;
      }
    }

    if (slot) {
      setCardPositions((prev) => ({
        ...prev,
        [slot]: cardDetails,
      }));
    } else {
      console.log("Deck is full!");
    }
  };

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="mt-14 flex w-5/6 justify-between text-lg">
          <div
            className={`${
              countCardsInDeck() < 8 ? "text-dojoRed" : "text-greenBlack"
            } border border-green-600 p-3 px-6 text-center font-bold drop-shadow-lg md:rounded-full`}
          >
            <div className="flex">
              {countCardsInDeck() < 8 && <MdWarning className="mx-2 mt-1" />}
              {countCardsInDeck()}/8{" "}
            </div>
          </div>

          <GenericButton
            onClick={() => {
              console.log("login");
            }}
            label="Play"
            customStyles="rounded-br-3xl"
          />
        </div>
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
