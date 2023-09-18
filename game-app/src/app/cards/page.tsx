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
    if (cardDetails.captain) {
      slot = "slot1";
    } else {
      for (let i = 2; i <= 8; i++) {
        if (!cardPositions[`slot${i}`]) {
          slot = `slot${i}`;
          break;
        }
      }
    }

    if (slot) {
      if (cardPositions[slot]) {
        const oldCard = cardPositions[slot];
        setPlayerCollection((prev) => [...prev, oldCard]);
      }
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
        <div className="flex w-full justify-between md:mt-14 md:w-5/6 md:text-lg">
          <div
            className={`${
              countCardsInDeck() < 8 ? "text-dojoRed" : "text-greenBlack"
            } rounded-full border border-green-600 p-3 text-center font-bold drop-shadow-lg md:px-6`}
          >
            <div className="flex">
              {countCardsInDeck() < 8 && <MdWarning className="mt-1 md:mx-2" />}
              {countCardsInDeck()}/8{" "}
            </div>
          </div>

          <GenericButton
            onClick={() => {
              console.log("login");
            }}
            label="Play"
            customStyles="rounded-bl-3xl"
          />
        </div>
        <div className="mt-auto flex w-full flex-wrap md:m-auto md:w-5/6">
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
