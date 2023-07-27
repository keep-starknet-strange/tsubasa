// Slot.js
import React from "react";
import { useDrop } from "react-dnd";

const Slot = ({ name, accept, onDrop }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: (item) => onDrop(item.name, name),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const backgroundColor = canDrop ? "bg-green-200" : "bg-gray-200";

  return (
    <div
      ref={drop}
      className={`${backgroundColor} h-80 rounded-lg shadow-md p-4 m-2 flex items-center justify-center`}
    >
      {isOver && "Release to drop"}
    </div>
  );
};

export default Slot;
