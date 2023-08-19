"use client";

import { useDroppable, DragOverlay } from "@dnd-kit/core";
import { ReactNode } from "react";
import Card from "./Card";

interface CardProps {
  id: string;
  position?: string;
  children?: ReactNode;
  playerPositions?: object;
}

/*
three conditions in which card placeholder is used
- placeholder on game field with position name
- placeholder on bench with no position name , only card
- placeholder with no position name , no card
*/

export default function PlayerPlaceholder(props: CardProps) {
  const { position, children, playerPositions, id } = props;
  const { setNodeRef } = useDroppable({
    id: id,
  });
  return (
    <div className="relative flex min-h-[76px] min-w-[52px] items-center justify-center rounded-lg bg-[#80D794] p-2 lg:min-h-[136px] lg:min-w-[100px]">
      <div
        ref={setNodeRef}
        className="flex min-h-[60px] min-w-[36px] items-center justify-center rounded-lg bg-[#71CD87] px-2 py-5 lg:min-h-[108px] lg:min-w-[72px]"
      >
        {playerPositions?.[id as keyof typeof playerPositions] ? (
          <Card data={playerPositions[id as keyof typeof playerPositions]} />
        ) : null}
        {children ? children : null}
        {!playerPositions?.[id as keyof typeof playerPositions] && position ? (
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
