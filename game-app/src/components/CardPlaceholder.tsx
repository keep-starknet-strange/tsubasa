"use client";

import { useDroppable } from "@dnd-kit/core";
import Card from "./card/Card";
import classNames from "classnames";
import { getCardSizeClassnames } from "./card/utils";
import DraggableCard from "@/components/dragAndDrop/DraggableCard";
import type { ReactNode } from "react";
import type { ExtendedCardProps } from "./card/types";

interface Props {
  id: string;
  position?: string;
  children?: ReactNode;
  playerPositions?: Record<string, ExtendedCardProps>;
  currentHoveredPlaceholder?: string;
}

/*
three conditions in which card placeholder is used
- 1) placeholder on bench with no position name , only card
- 2) placeholder with no position name , no card
- 3) placeholder on game field with position name when no card is on top
*/

export default function CardPlaceholder(props: Props) {
  const { position, children, playerPositions, id, currentHoveredPlaceholder } =
    props;
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div
      className={classNames(
        "relative z-50 flex min-h-[76px] min-w-[52px] items-center justify-center rounded-lg border-[1px] border-solid border-transparent bg-[#80D794] p-2 transition-all duration-300 ease-in-out lg:min-h-[136px] lg:min-w-[100px] lg:p-4",
        {
          "border-white shadow-[0px_0px_10px_rgba(0,0,0)] shadow-white":
            currentHoveredPlaceholder === id,
        }
      )}
    >
      <div
        ref={setNodeRef}
        className={classNames(
          getCardSizeClassnames("sm"),
          "flex items-center justify-center rounded-lg bg-[#71CD87] "
        )}
      >
        {/* 1) placeholder on bench with no position name , only card */}
        {playerPositions?.[id] ? (
          <DraggableCard
            id={playerPositions[id]?.id}
            data={playerPositions[id]}
          >
            <Card {...playerPositions[id]} />
          </DraggableCard>
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
