import type { SetupNetworkResult } from "./setupNetwork";
// import { Account, InvokeTransactionReceiptResponse, shortString } from "starknet";
// import { EntityIndex, getComponentValue, setComponent } from "@latticexyz/recs";
// import { uuid } from "@latticexyz/utils";
import type { ClientComponents } from "./createClientComponents";
import { Account } from "starknet";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

enum EntryPoints {
  CREATE_GAME = "create_game_system",
  CREATE_CARD = "create_card_system",
  ATTACK = "attack_system",
  END_TURN = "end_turn_system",
  PLACE_CARD = "place_card_system",
}

enum Roles {
  Goalkeeper = 0,
  Defender = 1,
  Midfielder = 2,
  Attacker = 3,
}

interface SystemCall {
  account: Account;
}

interface CreateGame extends SystemCall {
  player_2_address: string;
}

interface CreateCard extends SystemCall {
  token_id: string;
  dribble: number;
  defense: number;
  cost: number;
  role: Roles;
  is_captain: boolean;
}

interface EndTurn extends SystemCall {
  game_id: string;
}

interface PlaceCard extends SystemCall {
  game_id: string;
  card_id: Array<string>;
  position: Roles;
}

export function createSystemCalls(
  { execute }: SetupNetworkResult,
  {}: ClientComponents
) {
  // Add Systems here:
  const create_game = async ({ account, player_2_address }: CreateGame) => {
    try {
      const tx = await execute(account, EntryPoints.CREATE_GAME, [
        player_2_address,
      ]);
      const receipt = await account.waitForTransaction(tx.transaction_hash, {
        retryInterval: 100,
      });

      console.log(receipt);
    } catch (e) {
      console.log(e);
    }

    return;
  };

  const create_card = async ({
    account,
    token_id,
    dribble,
    defense,
    cost,
    role,
    is_captain,
  }: CreateCard) => {
    try {
      const tx = await execute(account, EntryPoints.CREATE_CARD, [
        token_id,
        dribble,
        defense,
        cost,
        role,
        is_captain ? 1 : 0,
      ]);
      const receipt = await account.waitForTransaction(tx.transaction_hash, {
        retryInterval: 100,
      });

      console.log(receipt);
    } catch (e) {
      console.log(e);
    }

    return;
  };

  // const attack = async () => { }

  const end_turn = async ({ account, game_id }: EndTurn) => {
    try {
      const tx = await execute(account, EntryPoints.END_TURN, [game_id]);
      const receipt = await account.waitForTransaction(tx.transaction_hash, {
        retryInterval: 100,
      });

      console.log(receipt);
    } catch (e) {
      console.log(e);
    }

    return;
  };

  const place_card = async ({ account, card_id, position }: PlaceCard) => {
    try {
      const tx = await execute(account, EntryPoints.END_TURN, [
        ...card_id,
        position,
      ]);
      const receipt = await account.waitForTransaction(tx.transaction_hash, {
        retryInterval: 100,
      });

      console.log(receipt);
    } catch (e) {
      console.log(e);
    }

    return;
  };

  return {
    create_game,
    create_card,
    end_turn,
    place_card,
  };
}
