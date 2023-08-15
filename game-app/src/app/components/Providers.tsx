"use client";

import { InjectedConnector, StarknetConfig } from "@starknet-react/core";
import React from "react";
import { DojoProvider } from "../DojoContext";
import { setup } from "../dojo/setup";

const starknetConnectors = [
  new InjectedConnector({ options: { id: "braavos" } }),
  new InjectedConnector({ options: { id: "argentX" } }),
];

interface ProviderProps {
  children: React.ReactNode;
}

export default async function Providers({ children }: ProviderProps) {

  const setupResult = await setup();

  return (
    <DojoProvider value={setupResult}>
      <StarknetConfig autoConnect connectors={starknetConnectors}>
        {children}
      </StarknetConfig>
    </DojoProvider>
  );
}
