"use client";
import type { ReactNode, FC } from "react";
import type { CardData } from "./types";
import React, { createContext, useState, useContext } from "react";

interface ModalContextType {
  isOpen: boolean;
  show: (data: CardData) => void;
  hide: () => void;
}

const CardModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

const CardModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [selectedCard, setSelectedCard] = useState<CardData>();

  return (
    <CardModalContext.Provider
      value={{
        isOpen: !!selectedCard,
        show: (data) => setSelectedCard(data),
        hide: () => setSelectedCard(undefined),
      }}
    >
      {children}
    </CardModalContext.Provider>
  );
};

const useCardModal = (): ModalContextType => {
  const context = useContext(CardModalContext);
  if (!context) {
    throw new Error("useModalContext must be used with ModalProvider");
  }
  return context;
};

export { CardModalProvider, useCardModal };
