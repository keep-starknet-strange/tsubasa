"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import CardModalContent from "./CardModalContent";
import Image from "next/image";

interface CardModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  addToDeck?: () => Promise<void>;
}

export default function CardModal(props: CardModalProps) {
  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-20"
        onClose={(value) => props.setOpen(value)}
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
          <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 flex text-black">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Panel className="h-full w-full transform overflow-auto p-10 transition-all">
              <div className="relative h-full w-full">
                <div className="absolute right-0 top-0">
                  <Image
                    className="cursor-pointer"
                    onClick={() => props.setOpen(false)}
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
                  stamina={2}
                  team="Cairo"
                  size="xl"
                  color="yellow"
                  addToDeck={props.addToDeck}
                />
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
