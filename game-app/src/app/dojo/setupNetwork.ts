import { defineContractComponents } from "./contractComponents";
import { world } from "./world";
import { RPCProvider, Query } from "@dojoengine/core";
import { Account, num } from "starknet";
import { GraphQLClient } from 'graphql-request';
// import { getSdk } from '../generated/graphql';

export const WORLD_ADDRESS = "0x7423aa0538a747d0a1a97ff64cc66883721c3aee7e3e58edcc12b96e9e6f0a7"

export type SetupNetworkResult = Awaited<ReturnType<typeof setupNetwork>>;

export function setupNetwork() {

    const client = new GraphQLClient('http://localhost:8080');

    // const graphSdk = getSdk(client);

    const contractComponents = defineContractComponents(world);

    const provider = new RPCProvider(WORLD_ADDRESS);

    return {
        contractComponents,
        provider,
        execute: async (signer: Account, system: string, call_data: num.BigNumberish[]) => provider.execute(signer, system, call_data),
        entity: async (component: string, query: Query) => provider.entity(component, query),
        entities: async (component: string, partition: number) => provider.entities(component, partition),
        world,
        // graphSdk
    };
}