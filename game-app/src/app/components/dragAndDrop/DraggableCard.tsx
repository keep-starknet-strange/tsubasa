import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { ExtendedCardProps } from "@/app/page";
import type { ReactNode } from "react";

interface Props {
  id: string;
  children?: ReactNode;
  data: ExtendedCardProps;
}
export default function DraggableCard(props: Props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    data: props.data,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };
  return (
    <div
      className="z-90"
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
    >
      {props.children}
    </div>
  );
}
