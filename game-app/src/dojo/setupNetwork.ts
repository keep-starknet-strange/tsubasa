import { defineContractComponents } from "./contractComponents";
import { world } from "./world";
import { RPCProvider } from "@dojoengine/core";
import type { Query } from "@dojoengine/core";
import type { Account, num } from "starknet";
// import { GraphQLClient } from 'graphql-request';
// import { getSdk } from '../generated/graphql';

export const WORLD_ADDRESS = process.env.NEXT_PUBLIC_WORLD_ADDRESS!

export type SetupNetworkResult = Awaited<ReturnType<typeof setupNetwork>>;

export function setupNetwork() {

    // const client = new GraphQLClient('http://localhost:8080');

    // const graphSdk = getSdk(client);

    const contractComponents = defineContractComponents(world);

    const provider = new RPCProvider(WORLD_ADDRESS, process.env.NEXT_PUBLIC_NODE_URL);

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