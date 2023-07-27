// Card.js
import React from "react";
import { useDrag } from "react-dnd";

const Card = ({ name, attack, defense, picture }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "player",
    item: { name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}!`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div
      ref={drag}
      style={{ opacity }}
      className="bg-white rounded-lg shadow-md p-4 m-2 w-64"
    >
      <div className="flex justify-center items-center">
        <img
          src={picture}
          alt={name}
          className="w-64 h-64 object-cover rounded-full"
        />
      </div>
      <div className="text-center mt-4">
        <p className="text-lg font-bold">{name}</p>
        <p>Attack: {attack}</p>
        <p>Defense: {defense}</p>
      </div>
    </div>
  );
};

export default Card;
