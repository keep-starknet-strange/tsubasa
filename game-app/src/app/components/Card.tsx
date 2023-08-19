"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  data: {
    id: string;
    name: string;
    position: string;
  };
}

export default function Card(props: Props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.data.id,
    data: props.data,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };
  return (
    <div
      className="z-50"
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
    >
      <div className="h-12 w-12 bg-black">{props.data.name}</div>
    </div>
  );
}
