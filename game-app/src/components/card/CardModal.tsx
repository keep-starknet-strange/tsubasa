"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import CardModalContent from "./CardModalContent";
import Image from "next/image";
import { useCardModal } from "./CardModalContext";
import { ExtendedCardProps } from "./types";

interface CardModalProps {
  onAddToDeck: (cardDetails: ExtendedCardProps) => void;
  cardData: ExtendedCardProps;
}

export default function CardModal({ onAddToDeck, cardData }: CardModalProps) {
  const { isOpen, hide } = useCardModal();
  const [starSelected, setStarSelected] = useState(false);

  const toggleStar = () => {
    setStarSelected(!starSelected);
  };

  const addToDeck = () => {
    const updatedCardData = {
      ...cardData,
      captain: starSelected,
    };
    onAddToDeck(updatedCardData);
    hide();
  };

  return (
    <Dialog as="div" className="relative z-50" open={isOpen} onClose={() => {}}>
      <div className="fixed inset-0 bg-black bg-opacity-80 transition-opacity" />
      <div className="fixed inset-0 flex text-black">
        <Dialog.Panel className="h-full w-full transform overflow-auto p-10 transition-all">
          <div className="relative h-full w-full">
            <div className="absolute right-0 top-0">
              <Image
                className="cursor-pointer"
                onClick={hide}
                src="/images/icons/close.svg"
                width={32}
                height={32}
                alt="close"
              />
            </div>
            <CardModalContent
              dribble={1}
              name="Lau Xu"
              position="Forward"
              defense={2}
              team="Cairo"
              size="xl"
              color="yellow"
              addToDeckArgument={addToDeck}
              starSelected={starSelected}
              toggleStar={toggleStar}
            />
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
