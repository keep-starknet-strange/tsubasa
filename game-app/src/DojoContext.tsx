import { createContext, ReactNode, useContext, useMemo } from "react";
import { SetupResult } from "./dojo/setup";
import { Account, RpcProvider } from "starknet";
import { useBurner } from "@dojoengine/create-burner";

type Context = {
  setup: SetupResult;
  account: {
    create: () => void;
    list: () => any[];
    get: (id: string) => Account;
    select: (id: string) => void;
    account: Account;
    masterAccount: Account;
    isDeploying: boolean;
    clear: () => void;
  };
};

const DojoContext = createContext<Context | null>(null);

type Props = {
  children: ReactNode;
  value: SetupResult;
};

export const DojoProvider = ({ children, value }: Props) => {
  const currentValue = useContext(DojoContext);

  if (currentValue) throw new Error("DojoProvider can only be used once");

  const provider = useMemo(
    () =>
      new RpcProvider({
        nodeUrl: process.env.NEXT_PUBLIC_NODE_URL!,
      }),
    [process.env.NEXT_PUBLIC_NODE_URL]
  );

  const masterAddress = process.env.NEXT_PUBLIC_MASTER_ADDRESS!;
  const privateKey = process.env.NEXT_PUBLIC_MASTER_PRIVATE_KEY!;

  const masterAccount = useMemo(
    () => new Account(provider, masterAddress, privateKey),
    [provider, masterAddress, privateKey]
  );

  const { create, list, get, account, select, isDeploying, clear } = useBurner({
    masterAccount: masterAccount,
    accountClassHash: process.env.NEXT_PUBLIC_ACCOUNT_CLASS_HASH!,
  });

  const selectedAccount = useMemo(() => {
    return account || masterAccount;
  }, [account, masterAccount]);

  const contextValue: Context = {
    setup: value,
    account: {
      create,
      list,
      get,
      select,
      account: selectedAccount,
      masterAccount,
      isDeploying,
      clear,
    },
  };

  return (
    <DojoContext.Provider value={contextValue}>{children}</DojoContext.Provider>
  );
};

export const useDojo = () => {
  const value = useContext(DojoContext);
  if (!value) throw new Error("Must be used within a DojoProvider");
  return value;
};
