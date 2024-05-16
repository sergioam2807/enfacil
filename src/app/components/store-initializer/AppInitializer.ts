"use client";

import { useEffect } from "react";
import { useClientQuoteStore } from "../../../store/store";

interface InitialData {
  clientId: number;
  title: string;
}

interface AppInitializerProps {
  initialData: InitialData;
  children: React.ReactNode;
}
const AppInitializer = ({ initialData, children }: AppInitializerProps) => {
  const setClientId = useClientQuoteStore(
    (state: { setClientId: (id: number) => void }) => state.setClientId
  );
  const setTitle = useClientQuoteStore(
    (state: { setTitle: (title: string) => void }) => state.setTitle
  );

  useEffect(() => {
    if (initialData) {
      setClientId(initialData.clientId);
      setTitle(initialData.title);
    }
  }, [initialData, setClientId, setTitle]);

  return children;
};

export default AppInitializer;
