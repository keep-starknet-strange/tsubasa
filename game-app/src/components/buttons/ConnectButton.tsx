"use client";

import { useAccount, useConnectors } from "@starknet-react/core";
import { useMemo } from "react";
import GenericButton from "./GenericButton";

export default function ConnectButton() {
  const { address } = useAccount();
  const { connectors, connect, disconnect } = useConnectors();

  const shortenedAddress = useMemo(() => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [address]);

  return address ? (
    <GenericButton label={shortenedAddress} onClick={() => disconnect()} />
  ) : (
    <div className="flex items-center gap-4">
      <span>Choose a wallet:</span>
      <div className="flex gap-2">
        {connectors.map((connector) => {
          return (
            <GenericButton
              key={connector.id}
              label={connector.id}
              onClick={() => connect(connector)}
            />
          );
        })}
      </div>
    </div>
  );
}
