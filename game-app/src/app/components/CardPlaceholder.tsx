"use client";

import { useDroppable } from "@dnd-kit/core";
import { ReactNode, useEffect } from "react";

interface CardProps {
  position?: string;
  isDropable?: boolean;
  children?: ReactNode;
}

export default function PlayerPlaceholder(props: CardProps) {
  const { position, children } = props;
  const { setNodeRef, isOver, over } = useDroppable({
    id: position,
  });

  return (
    // TODO: Extract colors to the Tailwind theme once properly defined
    <div className="relative flex min-h-[76px] min-w-[52px] items-center justify-center rounded-lg bg-[#80D794] p-2 lg:min-h-[136px] lg:min-w-[100px]">
      <div className="flex min-h-[60px] min-w-[36px] items-center justify-center rounded-lg bg-[#71CD87] px-2 py-5 lg:min-h-[108px] lg:min-w-[72px]">
        {position ? (
          <div
            ref={setNodeRef}
            className="flex h-5 w-5 items-center justify-center rounded-full bg-[#8ADD9D]"
          >
            <p className="text-xs text-[#71CD87]">
              {position?.toUpperCase().charAt(0)}
            </p>
          </div>
        ) : null}
      </div>
      {children}
    </div>
  );
}
