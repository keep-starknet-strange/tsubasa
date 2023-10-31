import { useDojo } from "@/DojoContext";
import { useElementStore } from "@/utils/store";
import { useEffect, useState } from "react";
import { useComponentValue } from "@dojoengine/react";
import { EntityIndex } from "@latticexyz/recs";
import * as starknet from "@scure/starknet";

export const useComponentStates = () => {
  const {
    setup: {
      components: { Game, Card },
    },
  } = useDojo();

  console.log("ENTER COMPONENT STATE?");
  let game: any = null;
  // en fait, l'id de la game est determiné des le debut, il ne changera jamais. je n'ai donc pas besoin de le calculer,mais juste de le deduire.
  // il faudra aussi gérer le cas ou une personne lance l'app et va simplement créer une partie, cela créera une nouvelle game_id.
  const { player1, player2 } = useElementStore((state) => state);
  if (player1 && player2) {
    // la game existe
    const entityId = starknet.pedersen(player1, player2);
    console.log("ENTITYID", entityId);
    game = useComponentValue(Game, entityId);
  }
  useEffect(() => {
    console.log("gameCHANGED", game);
  }, [game]);

  useEffect(() => {
    console.log("PLAYER CHANGED", player1, player2);
    if (player1 && player2) {
      // todo : stocker le pedersen, c'est le gameId
      starknet.pedersen(player1, player2);
    }
  }, [player1, player2]);

  return {
    game: {
      game_id: starknet.pedersen(player1 || "", player2 || ""),
      player1,
      player2,
    },
    // ... et n'importe quel autre état ou fonction que vous souhaitez exposer
  };
};

// struct Game {
//     /// Game id, computed as follows pedersen_hash(player1_address, player2_address)
//     #[key]
//     game_id: felt252,
//     /// player 1 address.
//     player1: ContractAddress,
//     /// player 2 address.
//     player2: ContractAddress,
//     /// Rounds won by the player 1.
//     player1_score: u8,
//     /// Rounds won by the player 2.
//     player2_score: u8,
//     /// Current turn of the round.
//     turn: u128,
//     /// Winner of the game. As long as it is `Pending` it means that the game is playing.
//     outcome: Outcome,
// }
