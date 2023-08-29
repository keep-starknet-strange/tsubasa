"use client";

import type { ReactNode } from "react";
import { InjectedConnector, StarknetConfig } from "@starknet-react/core";
import React from "react";
import { DojoProvider } from "../DojoContext";
import { setup } from "../dojo/setup";
import { CardModalProvider } from "./card/CardModalContext";

const starknetConnectors = [
  new InjectedConnector({ options: { id: "braavos" } }),
  new InjectedConnector({ options: { id: "argentX" } }),
];

interface ProviderProps {
  children: ReactNode;
}

export default function Providers({ children }: ProviderProps) {
  const setupResult = setup();

  return (
    <StarknetConfig autoConnect connectors={starknetConnectors}>
      <CardModalProvider>
        <DojoProvider value={setupResult}>{children}</DojoProvider>
      </CardModalProvider>
    </StarknetConfig>
  );
}
