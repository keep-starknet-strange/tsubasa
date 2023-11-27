import { defineContractComponents } from "./contractComponents";
import { world } from "./world";
import { RPCProvider } from "@dojoengine/core";
import type { Query } from "@dojoengine/core";
import type { Account, AllowArray, Call, num } from "starknet";
import manifest from "./manifest.json";

import { GraphQLClient } from "graphql-request";
import { getSdk } from "../generated/graphql";

export const WORLD_ADDRESS = process.env.NEXT_PUBLIC_WORLD_ADDRESS!;

export type SetupNetworkResult = Awaited<ReturnType<typeof setupNetwork>>;

export function setupNetwork() {
  const graphSdk = getSdk(
    new GraphQLClient(process.env.NEXT_PUBLIC_TORII || "")
  );

  const contractComponents = defineContractComponents(world);

  const provider = new RPCProvider(
    WORLD_ADDRESS,
    manifest,
    process.env.NEXT_PUBLIC_NODE_URL
  );

  return {
    contractComponents,
    provider,
    graphSdk,
    execute: async (
      signer: Account,
      contract: string,
      system: string,
      call_data: num.BigNumberish[]
    ) => {
      return provider.execute(signer, contract, system, call_data);
    },
    entity: async (component: string, query: Query) =>
      provider.entity(component, query),
    entities: async (component: string, partition: number) =>
      provider.entities(component, partition),
    world,
    // graphSdk
  };
}
