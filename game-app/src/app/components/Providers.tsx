"use client";

import { InjectedConnector, StarknetConfig } from "@starknet-react/core";
import React from "react";

const starknetConnectors = [
  new InjectedConnector({ options: { id: "braavos" } }),
  new InjectedConnector({ options: { id: "argentX" } }),
];

interface ProviderProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProviderProps) {
  return (
    <StarknetConfig autoConnect connectors={starknetConnectors}>
      {children}
    </StarknetConfig>
  );
}
