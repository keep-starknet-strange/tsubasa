"use strict";

import { useDroppable } from "@dnd-kit/core";
import classNames from "classnames";
import { useState, useEffect, ReactNode } from "react";
import { getCardSizeClassnames } from "./card/utils";
import type { CardSize, CardState, ExtendedCardProps } from "./card/types";
import Card from "./card/Card";

interface Props {
  id: string;
  position?: string;
  children?: ReactNode;
  cardPositions?: Record<string, ExtendedCardProps>;
  currentHoveredPlaceholder?: string;
  currentPickedCard?: string;
}

export default function CardPlaceholder({
  position,
  children,
  cardPositions,
  id,
  currentHoveredPlaceholder,
  currentPickedCard,
}: Props) {
  const [pendingStatusMap, setPendingStatusMap] = useState<
    Record<string, CardState>
  >({});
  const { setNodeRef } = useDroppable({ id });
  const [cardSize, setCardSize] = useState<CardSize>("xs");

  useEffect(() => {
    setCardSize(window.innerWidth < 1024 ? "xs" : "sm");
  }, []);

  const isHovered = currentHoveredPlaceholder === id;
  const cardPosition = cardPositions?.[id];

  return (
    <div
      className={classNames(
        "relative flex min-h-[76px] min-w-[52px] items-center justify-center rounded-lg border-[1px] border-solid border-transparent bg-[#80D794] p-2 transition-all duration-300 ease-in-out",
        {
          "border-white shadow-[0px_0px_10px_rgba(0,0,0)] shadow-white":
            isHovered,
        }
      )}
    >
      <div
        ref={setNodeRef}
        className={classNames(
          getCardSizeClassnames(cardSize),
          "flex items-center justify-center rounded-lg bg-[#71CD87]"
        )}
      >
        {cardPosition && (
          <Card {...cardPosition} state={pendingStatusMap[cardPosition.id]} />
        )}
        {children}
        {!cardPosition && position && (
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#8ADD9D]">
            <p className="text-xs text-[#71CD87]">
              {position?.toUpperCase().charAt(0)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
