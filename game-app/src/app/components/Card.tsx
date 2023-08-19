"use client";

import { useDraggable } from "@dnd-kit/core";
import PlayerPlaceholder from "./CardPlaceholder";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  playerName: string;
  data: object;
}

export default function Card(props: Props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.playerName,
    data: props.data,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      <div className="h-12 w-12 bg-black">{props.playerName}</div>
    </div>
  );
}
