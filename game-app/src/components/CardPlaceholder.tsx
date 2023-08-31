"use client";

import { useDroppable } from "@dnd-kit/core";
import Card from "./card/Card";
import classNames from "classnames";
import { getCardSizeClassnames } from "./card/utils";
import { useState, type ReactNode, useEffect } from "react";
import type { CardSize, CardState, ExtendedCardProps } from "./card/types";

interface Props {
  id: string;
  position?: string;
  children?: ReactNode;
  playerPositions?: Record<string, ExtendedCardProps>;
  currentHoveredPlaceholder?: string;
  currentPickedCard?: string;
}

/*
three conditions in which card placeholder is used
- 1) placeholder on bench with no position name , only card
- 2) placeholder with no position name , no card
- 3) placeholder on game field with position name when no card is on top
*/

export default function CardPlaceholder(props: Props) {
  const {
    position,
    children,
    playerPositions,
    id,
    currentHoveredPlaceholder,
    currentPickedCard,
  } = props;
  const { setNodeRef } = useDroppable({
    id: id,
  });
  const [cardSize, setCardSize] = useState<CardSize>("xs");
  const [currentCardState, setCurrentCardState] =
    useState<CardState>("standard");

  useEffect(() => {
    if (playerPositions?.[id]?.id === currentPickedCard) {
      setCurrentCardState("pending");
      setTimeout(() => {
        setCurrentCardState("standard");
      }, 1500);
    } else {
      setCurrentCardState("standard");
    }
  }, [playerPositions]);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setCardSize("xs");
    } else {
      setCardSize("sm");
    }
  }, []);

  return (
    <div
      className={classNames(
        "relative z-50 flex min-h-[76px] min-w-[52px] items-center justify-center rounded-lg border-[1px] border-solid border-transparent bg-[#80D794] p-2 transition-all duration-300 ease-in-out ",
        {
          "border-white shadow-[0px_0px_10px_rgba(0,0,0)] shadow-white":
            currentHoveredPlaceholder === id,
        }
      )}
    >
      <div
        ref={setNodeRef}
        className={classNames(
          getCardSizeClassnames(cardSize),
          "flex items-center justify-center rounded-lg bg-[#71CD87] "
        )}
      >
        {/* 1) placeholder on bench with no position name , only card */}
        {playerPositions?.[id] ? (
          <Card {...playerPositions[id]} state={currentCardState} />
        ) : null}

        {/* 2) placeholder with no position name , no card */}
        {children ? children : null}

        {/* 3) placeholder on game field with position name when no card is on top */}
        {!playerPositions?.[id] && position ? (
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#8ADD9D]">
            <p className="text-xs text-[#71CD87]">
              {position?.toUpperCase().charAt(0)}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
