import { Cotizacion } from "@/app/components/tables/cotizacionTable/TableCotizacionActual";
import { create } from "zustand";

interface Store {
  clientId: number;
  title: string;
  clientName: string;
  quoteId: number;
  setClientId: (id: number) => void;
  setTitle: (title: string) => void;
  setQuoteId: (quoteId: number) => void;
  setClientName: (clientName: string) => void;
}

type QuoteStore = {
  quote: {
    id: string;
    projectName: string;
    quote_date: string;
    totalManPowerUnitPricing: number;
    totalMaterialsPricing: number;
    finalPrice: number;
  };
  setQuote: (quote: QuoteStore["quote"]) => void;
};

export interface QuotePostDataState {
  enclosureQuotePost: Cotizacion[];
  setEnclosureQuotePost: (enclosureAdded: Cotizacion[]) => void;
}

export const useClientQuoteStore = create<Store>((set) => ({
  clientId: 0,
  title: "",
  clientName: "",
  quoteId: 0,
  setTitle: (title: string) => set({ title }),
  setClientName: (clientName: string) => set({ clientName }),
  setClientId: (clientId: number) => set({ clientId }),
  setQuoteId: (quoteId: number) => set({ quoteId }),
}));

export const useQuoteStore = create<QuoteStore>((set) => ({
  quote: {
    id: "",
    projectName: "",
    quote_date: "",
    totalManPowerUnitPricing: 0,
    totalMaterialsPricing: 0,
    finalPrice: 0,
  },
  setQuote: (quote) => set({ quote }),
}));

export const useQuotePostData = create<QuotePostDataState>((set) => ({
  enclosureQuotePost: [],
  setEnclosureQuotePost: (enclosureQuotePost) => set({ enclosureQuotePost }),
}));
