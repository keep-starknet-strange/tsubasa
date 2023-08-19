"use client";

import { useDroppable } from "@dnd-kit/core";
import { ReactNode } from "react";
import Card from "./card/Card";
import { ExtendedCardProps } from "../page";
import Draggable from "./dnd/Draggable";
import classNames from "classnames";
import { getCardSizeClassnames } from "./card/utils";

interface CardProps {
  id: string;
  position?: string;
  children?: ReactNode;
  playerPositions?: Record<string, ExtendedCardProps | null>;
  currentHoveredPlaceholder?: string;
}

/*
three conditions in which card placeholder is used
- placeholder on game field with position name
- placeholder on bench with no position name , only card
- placeholder with no position name , no card
*/

export default function PlayerPlaceholder(props: CardProps) {
  const { position, children, playerPositions, id, currentHoveredPlaceholder } =
    props;
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div
      className={classNames(
        {
          "border-white shadow-[0px_0px_10px_rgba(0,0,0)] shadow-white":
            currentHoveredPlaceholder === id,
        },
        "relative flex min-h-[76px] min-w-[52px] items-center justify-center rounded-lg border-[1px] border-solid border-transparent bg-[#80D794] p-4 transition-all duration-300 ease-in-out lg:min-h-[136px] lg:min-w-[100px]"
      )}
    >
      <div
        ref={setNodeRef}
        className={classNames(
          getCardSizeClassnames("sm"),
          "z-10 flex items-center justify-center rounded-lg bg-[#71CD87] px-2 py-5"
        )}
        // className=" min-h-[60px] min-w-[36px]  lg:min-h-[108px] lg:min-w-[72px]"
      >
        {playerPositions &&
        playerPositions?.[id as keyof typeof playerPositions] &&
        playerPositions[id]?.id ? (
          <Draggable id={playerPositions[id]?.id} data={playerPositions[id]}>
            <Card {...playerPositions[id]} />
          </Draggable>
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
