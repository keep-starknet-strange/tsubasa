import React, { ReactNode } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { CardProps } from "@/components/card/types";

interface Props {
  id: string;
  children?: ReactNode;
  data: CardProps;
}
export default function Draggable(props: Props) {
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
