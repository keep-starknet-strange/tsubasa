"use client";

import { useAccount, useConnectors } from "@starknet-react/core";
import { useMemo } from "react";

export default function ConnectButton() {
  const { address } = useAccount();
  const { connectors, connect, disconnect } = useConnectors();

  const shortenedAddress = useMemo(() => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [address]);

  return address ? (
    <button
      className="rounded-md bg-[#7CD18F] px-5 py-2.5 text-[#A9F4BA]"
      onClick={disconnect}
    >
      {shortenedAddress}
    </button>
  ) : (
    <div className="flex items-center gap-4">
      <span>Choose a wallet:</span>
      <div className="flex gap-2">
        {connectors.map((connector) => {
          return (
            <button
              key={connector.id}
              onClick={() => connect(connector)}
              className="rounded-md bg-[#7CD18F] px-5 py-2.5 text-[#A9F4BA]"
            >
              {connector.id}
            </button>
          );
        })}
      </div>
    </div>
  );
}
