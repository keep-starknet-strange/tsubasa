import { create } from "zustand";

interface State {
  player1: string | undefined;
  player2: string | undefined;
  set_player1: (player1: string) => void;
  set_player2: (player2: string) => void;
}

export const useElementStore = create<State>((set) => ({
  ip: undefined,
  player1: undefined,
  player2: undefined,
  set_player1: (player1: string) => set({ player1 }),
  set_player2: (player2: string) => set({ player2 }),
}));
