"use client";

import { useDraggable } from "@dnd-kit/core";
import PlayerPlaceholder from "./CardPlaceholder";
import { CSS } from "@dnd-kit/utilities";

export default function Card() {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "unique-id",
  });
  const style = {
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      <div className="h-12 w-12 bg-black">hey</div>
    </div>
  );
}
