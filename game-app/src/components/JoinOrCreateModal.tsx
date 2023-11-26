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
      systemCalls: { create_game, join_game, create_card, place_card },
    },
    account: { account },
  } = useDojo();
  if (!isOpen) return null;

  const handleJoinClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Join");
    await join_game({ account, player_1_address: address });
    onJoin(address);
    await create_card({
      account,
      player_address: address,
      cost: Number(BigInt(1)),
      token_id: BigInt(1),
      defense: Number(BigInt(1)),
      dribble: Number(BigInt(1)),
      role: Number(BigInt(1)),
      is_captain: true,
    });
    await place_card(account, 1, 2, 1);
    //create cards
    onClose();
  };

  const handleCreateClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Create");
    await create_game({ account, player_2_address: address });
    onCreate(address);
    await create_card({
      account,
      player_address: address,
      cost: Number(BigInt(1)),
      token_id: BigInt(1),
      defense: Number(BigInt(1)),
      dribble: Number(BigInt(1)),
      role: Number(BigInt(1)),
      is_captain: true,
    });
    await place_card(account, 1, 2, 1);
    // create cards
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
