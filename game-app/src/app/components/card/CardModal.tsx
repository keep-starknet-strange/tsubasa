"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

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
            <Dialog.Panel className="bg' h-full w-full transform overflow-auto text-left shadow-xl transition-all sm:my-8 sm:p-6">
              <div className="absolute right-0 top-0 hidden bg-red pr-4 pt-4 sm:block">
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-500 focus:ring-indigo-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  {/* <XMarkIcon className="h-6 w-6" aria-hidden="true" /> */}
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="bg-red-100 mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10">
                  {/* <ExclamationTriangleIcon
                      className="text-red-600 h-6 w-6"
                      aria-hidden="true"
                    /> */}
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-gray-900 text-base font-semibold leading-6"
                  >
                    Deactivate account
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-gray-500 text-sm">
                      Are you sure you want to deactivate your account? All of
                      your data will be permanently removed from our servers
                      forever. This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="bg-red-600 hover:bg-red-500 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm sm:ml-3 sm:w-auto"
                  onClick={() => setOpen(false)}
                >
                  Deactivate
                </button>
                <button
                  type="button"
                  className="text-gray-900 ring-gray-300 hover:bg-gray-50 mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset sm:mt-0 sm:w-auto"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
