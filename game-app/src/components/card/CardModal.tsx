"use client";

import { Fragment } from "react";
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

  const addToDeck = () => {
    onAddToDeck(cardData);
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={(value) => {
          if (!value) {
            hide();
          }
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-80 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 flex text-black">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          >
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
                />
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
