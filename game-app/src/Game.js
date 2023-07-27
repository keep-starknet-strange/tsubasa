// Game.js
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Card from "./Card";
import Slot from "./Slot";

const Game = () => {
  const players = [
    { name: "Kojiro", attack: 80, defense: 90, picture: "/players/kojiro.png" },
    { name: "Ryo", attack: 85, defense: 75, picture: "/players/ryo.png" },
    { name: "Genzo", attack: 70, defense: 95, picture: "/players/genzo.png" },
    { name: "Jun", attack: 90, defense: 80, picture: "/players/jun.png" },
    { name: "Stefan", attack: 88, defense: 82, picture: "/players/stefan.png" },
  ];

  const handleDrop = (cardName, slotName) => {
    alert(`You dropped ${cardName} into ${slotName}!`);
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex">
        <div className="w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-4">Players</h2>
          <div className="grid grid-cols-2 gap-4">
            {players.map((player, index) => (
              <Card key={index} {...player} />
            ))}
          </div>
        </div>
        <div className="w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-4">Slots</h2>
          <div className="grid grid-cols-3 gap-4">
            <Slot name="slot1" accept="player" onDrop={handleDrop} />
            <Slot name="slot2" accept="player" onDrop={handleDrop} />
            <Slot name="slot3" accept="player" onDrop={handleDrop} />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Game;
