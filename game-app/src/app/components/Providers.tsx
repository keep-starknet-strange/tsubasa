"use client";

import type { ReactNode } from "react";
import { InjectedConnector, StarknetConfig } from "@starknet-react/core";
import { CardModalProvider } from "./card/CardModalContext";

const starknetConnectors = [
  new InjectedConnector({ options: { id: "braavos" } }),
  new InjectedConnector({ options: { id: "argentX" } }),
];

interface ProviderProps {
  children: ReactNode;
}

export default function Providers({ children }: ProviderProps) {
  return (
    <StarknetConfig autoConnect connectors={starknetConnectors}>
      <CardModalProvider>{children}</CardModalProvider>
    </StarknetConfig>
  );
}
