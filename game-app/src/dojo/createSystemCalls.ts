import type { SetupNetworkResult } from "./setupNetwork";
// import { Account, InvokeTransactionReceiptResponse, shortString } from "starknet";
// import { uuid } from "@latticexyz/utils";
import { getEvents, setComponentsFromEvents } from "@dojoengine/utils";
import type { ClientComponents } from "./createClientComponents";
import type { Account, Call } from "starknet";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

enum EntryPoints {
  CREATE_GAME = "create_game_system",
  JOIN_GAME = "join_game_system",
  CREATE_CARD = "create_card_system",
  ATTACK = "attack_system",
  END_TURN = "end_turn_system",
  PLACE_CARD = "place_card_system",
}

interface SystemCall {
  account: Account;
}

interface CreateGame extends SystemCall {
  player_2_address: string;
}

interface JoinGame extends SystemCall {
  player_1_address: string;
}

export function createSystemCalls(
  { execute, contractComponents }: SetupNetworkResult,
  { Game }: ClientComponents
) {
  // Add Systems here:
  const create_game = async ({ account, player_2_address }: CreateGame) => {
    try {
      const tx = await execute(account, "create_game_system", "create_game", [
        process.env.NEXT_PUBLIC_WORLD_ADDRESS || "",
        player_2_address,
      ]);
      const receipt = await account.waitForTransaction(tx.transaction_hash, {
        retryInterval: 100,
      });
      setComponentsFromEvents(contractComponents, getEvents(receipt));
    } catch (e) {
      console.log(e);
    }

    return;
  };

  const join_game = async ({ account, player_1_address }: JoinGame) => {
    try {
      const tx = await execute(account, "join_game_system", "join_game", [
        process.env.NEXT_PUBLIC_WORLD_ADDRESS || "",
        player_1_address,
      ]);
      const receipt = await account.waitForTransaction(tx.transaction_hash, {
        retryInterval: 100,
      });
      console.log(receipt);
      setComponentsFromEvents(contractComponents, getEvents(receipt));
    } catch (e) {
      console.log(e);
    }
    return;
  };

  // const create_card = async ({ }) => { };

  // const attack = async () => { }

  // const end_turn = async () => { }

  // const place_card = async () => { }

  return {
    create_game,
    join_game,
  };
}
