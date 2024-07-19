import { Enclosure } from '@/app/(principal)/cotizaciones/[id]/page';
import { Cotizacion } from '@/app/components/tables/cotizacionTable/TableCotizacionActual';
import { create } from 'zustand';

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
  setQuote: (quote: QuoteStore['quote']) => void;
};

type QuoteFinalData = {
  quoteFinalData: Enclosure[];
  setQuoteFinalData: (data: Enclosure[]) => void;
};

export interface QuotePostDataState {
  enclosureQuotePost: Cotizacion[];
  setEnclosureQuotePost: (enclosureAdded: Cotizacion[]) => void;
}

interface QuoteInfo {
  enclosuresInfo: QuoteInfo[];
  setEnclosuresInfo: (info: QuoteInfo[]) => void;
}

interface ReloadMovements {
  updateFinancialMovements: boolean;
  setUpdateFinancialMovements: (updateFinancialMovements: boolean) => void;
}

interface DateFinancial {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

interface EnclosureAdded {
  combinedData: any[];
  setCombinedData: (data: any[]) => void;
  deleteEnclosure: (id: string) => void;
}

export const useClientQuoteStore = create<Store>((set) => ({
  clientId: 0,
  title: '',
  clientName: '',
  quoteId: 0,
  setTitle: (title: string) => set({ title }),
  setClientName: (clientName: string) => set({ clientName }),
  setClientId: (clientId: number) => set({ clientId }),
  setQuoteId: (quoteId: number) => set({ quoteId }),
}));

export const useQuoteStore = create<QuoteStore>((set) => ({
  quote: {
    id: '',
    projectName: '',
    quote_date: '',
    totalManPowerUnitPricing: 0,
    totalMaterialsPricing: 0,
    finalPrice: 0,
  },
  setQuote: (quote) => set({ quote }),
}));

export const useQuotePostData = create<QuotePostDataState>((set) => ({
  enclosureQuotePost: [],
  setEnclosureQuotePost: (enclosureQuotePost) => set({ enclosureQuotePost }),
  deleteFromEnclosureQuotePost: (id: string) =>
    set((state) => ({
      enclosureQuotePost: state.enclosureQuotePost.filter(
        (item) => item.id !== id
      ),
    })),
}));

export const useQuoteDataStore = create<QuoteFinalData>((set) => ({
  quoteFinalData: [],
  setQuoteFinalData: (data) => set({ quoteFinalData: data }),
}));

export const useQuoteInfoStore = create<QuoteInfo>((set) => ({
  enclosuresInfo: [],
  setEnclosuresInfo: (info) => set({ enclosuresInfo: info }),
}));

export const useReloadMovements = create<ReloadMovements>((set) => ({
  updateFinancialMovements: false,
  setUpdateFinancialMovements: (updateFinancialMovements: boolean) =>
    set({ updateFinancialMovements }),
}));

export const useDateStore = create<DateFinancial>((set) => ({
  selectedDate: '',
  setSelectedDate: (date: string) => set({ selectedDate: date }),
}));

export const useEnclosureAdded = create<EnclosureAdded>((set, get) => ({
  combinedData: [],
  setCombinedData: (data) => {
    if (!Array.isArray(data)) {
      console.error('setCombinedData called with non-array value:', data);
      return;
    }
    set({ combinedData: data });
  },
  deleteEnclosure: (id: string) => {
    const { combinedData } = get();
    const updatedData = combinedData.filter((item: any) => item.id !== id);
    set({ combinedData: updatedData });
  },
}));
