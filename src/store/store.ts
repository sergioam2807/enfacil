import { create } from "zustand";

interface Store {
  clientId: number;
  title: string;
  setClientId: (id: number) => void;
  setTitle: (title: string) => void;
}

export const useClientQuoteStore = create<Store>((set) => ({
  clientId: 0,
  title: "",
  setTitle: (title: string) => set({ title }),
  setClientId: (clientId: number) => set({ clientId }),
}));
