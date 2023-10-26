// components/JoinOrCreateModal.tsx

import React, { useState } from "react";
import GenericButton from "./buttons/GenericButton";
import { useDojo } from "@/DojoContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (address: string) => void;
  onJoin: (address: string) => void;
}

const JoinOrCreateModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onCreate,
  onJoin,
}) => {
  const [address, setAddress] = useState("");
  const {
    setup: {
      systemCalls: { create_game, join_game },
    },
    account: { account },
  } = useDojo();
  if (!isOpen) return null;

  const handleJoinClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Join");
    onJoin(address);
    onClose();
  };

  const handleCreateClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Create");
    create_game({ account, player_2_address: address });
    onCreate(address);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center font-new-airport">
      <div className=" rounded-lg bg-green-300 p-4 shadow-md">
        <button onClick={onClose} className="bg-green-300 font-medium">
          Close
        </button>
        <h2 className="rounded-2xl bg-green-700 p-3 text-xl font-medium uppercase ">
          Create or Join a Game
        </h2>

        <div className="m-3 flex items-center justify-center rounded-2xl bg-green-700 p-3">
          {/* Flexbox for centering */}
          <label className="text-xl font-medium uppercase">Address:</label>
          <input
            className="ml-2 p-1 text-xl uppercase text-black" // Added margin on the left for spacing
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter the address"
          />
        </div>

        <div className="mt-3 flex justify-around">
          {/* Flexbox for centering */}
          <GenericButton label={"CREATE"} onClick={handleCreateClick} />

          <GenericButton label={"JOIN"} onClick={handleJoinClick} />
        </div>
      </div>
    </div>
  );
};

export default JoinOrCreateModal;
