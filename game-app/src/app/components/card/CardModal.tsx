"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import CardModalContent from "./CardModalContent";

export default function CardModal() {
  const [open, setOpen] = useState(true);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={() => {}}>
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
              <div className="relative">
                <div className="absolute right-0 top-0">
                  <button
                    type="button"
                    className="focus:ring-indigo-500 rounded-md px-4 text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                    onClick={() => setOpen(false)}
                  >
                    Close
                    {/* <XMarkIcon className="h-6 w-6" aria-hidden="true" /> */}
                  </button>
                </div>
                <CardModalContent
                  dribble={1}
                  name="Lau Xu"
                  position="Forward"
                  stamina={2}
                  team="Cairo"
                />
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
