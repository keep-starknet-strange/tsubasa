import { useDojo } from "@/DojoContext";
import { useElementStore } from "@/utils/store";
import { useEffect, useState, useMemo } from "react";
import { useComponentValue, useEntityQuery } from "@dojoengine/react";
import { Has } from "@latticexyz/recs";
import * as starknet from "@scure/starknet";

export const useComponentStates = () => {
  const {
    setup: {
      components: { Game, Card },
    },
    account: { account },
  } = useDojo();

  // const player1game = useEntityQuery(Has(Game));
  // const player2game = useEntityQuery(Has(Game, { player2: account.address }));

  const { player1, player2 } = useElementStore((state) => state);
  // useComponentValue(Player, player1);
  // Compute the entityId only when player1 or player2 changes
  const entityId = useMemo(() => {
    if (player1 && player2) {
      return starknet.pedersen(player1, player2);
    }
    return null;
  }, [player1, player2]);
  useEffect(() => {
    // console.log("player1gameCHANGED", player1game);
    // console.log("player2gameCHANGED", player2game);
    console.log("gameCHANGED", game);
  }, [player1, player2]);
  // Fetch game data whenever entityId changes
  const game = useComponentValue(Game, entityId);

  useEffect(() => {
    console.log("gameCHANGED", game);
  }, [game]);

  useEffect(() => {
    console.log("PLAYER CHANGED", player1, player2);
    if (player1 && player2) {
      // If you need to do something with the entityId, do it here
    }
  }, [player1, player2, entityId]); // entityId added to the dependencies array

  return {
    game: {
      game_id: entityId,
      player1,
      player2,
    },
    // ... et n'importe quel autre état ou fonction que vous souhaitez exposer
  };
};
