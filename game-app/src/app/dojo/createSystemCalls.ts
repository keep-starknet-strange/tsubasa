import { SetupNetworkResult } from "./setupNetwork";
import { Account, InvokeTransactionReceiptResponse, shortString } from "starknet";
import { EntityIndex, getComponentValue, setComponent } from "@latticexyz/recs";
import { uuid } from "@latticexyz/utils";
import { ClientComponents } from "./createClientComponents";
import { updatePositionWithDirection } from "../utils";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
    { execute, contractComponents }: SetupNetworkResult,
    { Card, Game, Player }: ClientComponents
) {
    const spawn = async (signer: Account) => {

    };

    return {
        spawn
    };
}
