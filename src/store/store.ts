import { create } from "zustand";

interface Store {
  clientId: number;
  title: string;
  quoteId: number;
  setClientId: (id: number) => void;
  setTitle: (title: string) => void;
  setQuoteId: (quoteId: number) => void;
}

export const useClientQuoteStore = create<Store>((set) => ({
  clientId: 0,
  title: "",
  quoteId: 0,
  setTitle: (title: string) => set({ title }),
  setClientId: (clientId: number) => set({ clientId }),
  setQuoteId: (quoteId: number) => set({ quoteId }),
}));
