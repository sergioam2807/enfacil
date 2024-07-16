import { Quote } from '@/types/types';
import { create } from 'zustand';

interface SelectedIdStore {
  selectedId: number | null;
  setSelectedId: (selectedId: number | null) => void;
}

interface FullQuoteData {
  fullQuoteData: Quote[];
  setFullQuoteData: (fullQuoteData: Quote[]) => void;
}

export const useSelectedIdStore = create<SelectedIdStore>((set) => ({
  selectedId: null,
  setSelectedId: (selectedId: number | null) => set({ selectedId }),
}));

export const useFullQuoteData = create<FullQuoteData>((set) => ({
  fullQuoteData: [],
  setFullQuoteData: (fullQuoteData: Quote[]) => set({ fullQuoteData }),
}));
