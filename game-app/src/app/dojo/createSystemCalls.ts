import { SetupNetworkResult } from "./setupNetwork";
// import { Account, InvokeTransactionReceiptResponse, shortString } from "starknet";
// import { EntityIndex, getComponentValue, setComponent } from "@latticexyz/recs";
// import { uuid } from "@latticexyz/utils";
import { ClientComponents } from "./createClientComponents";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
    { execute, contractComponents }: SetupNetworkResult,
    { Card, Game, Player }: ClientComponents
) {

    // // Add Systems here:
    // const spawn = async (signer: Account) => {

    // };

    return {
        // spawn
    };
}
