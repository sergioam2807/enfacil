"use client";
import React, { useState } from "react";
import TitleComponent from "../common/TitleComponent";
import { Client } from "@/types/types";
import { postQuoteData } from "@/app/api/data";
import { useClientQuoteStore } from "@/store/store";
import InputComponent from "../input/InputComponent";

interface Props {
  onClose: () => void;
  clientData: Client[];
}
const ModalCreateQuote = ({ onClose, clientData }: Props) => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [quoteName, setQuoteName] = useState<string>("");
  const { setClientId, setTitle, setQuoteId, setClientName } =
    useClientQuoteStore();

  const handleClientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const client = clientData.find(
      (client) => String(client.id) === event.target.value
    );

    setSelectedClient(client || null);
  };

  const handleQuoteNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuoteName(event.target.value);
  };

  const handleSave = async () => {
    if (selectedClient) {
      localStorage.setItem("selectedClientId", String(selectedClient.id));
      localStorage.setItem("selectedClientName", quoteName);

      if (typeof selectedClient.id === "number") {
        setClientId(selectedClient.id);
        setTitle(quoteName);
        setClientName(selectedClient.name);
      }

      // const token = localStorage.getItem("token");
      // if (token) {
      //   const quote = {
      //     clientId: selectedClient.id,
      //     title: quoteName,
      //   };

      //   try {
      //     const response = await postQuoteData(token, quote);
      //     console.log(response.data);
      //     setQuoteId(response.data);
      //   } catch (error) {
      //     console.log(error);
      //   }
      // }
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="border w-96 shadow-lg rounded-2xl bg-white  flex flex-col">
        <div className="py-10 px-5 max-w-full ">
          <TitleComponent
            titleName={
              "Para crear una cotización, primero selecciona un cliente:"
            }
          />
          <div className="flex justify-center px-3 rounded-lg bg-[#EFF4FC] py-8 gap-2 flex-col">
            <p className="text-custom-blue text-lg font-bold">Selecciona</p>
            <select
              onChange={handleClientChange}
              className="px-4 py-2 border rounded-md text-gray-700 bg-white shadow"
            >
              <option value="" disabled selected>
                Selecciona un cliente
              </option>
              {clientData.map((client, index) => (
                <option key={index} value={client.id as string}>
                  {client.name}
                </option>
              ))}
            </select>
            <InputComponent
              nameVizualization="Nombre Cotizacion"
              name="quoteName"
              placeholder="Ej: Cotizacion 1"
              onChange={handleQuoteNameChange}
              value={quoteName}
            />
          </div>
        </div>
        <div className="flex pb-3 px-3 justify-between">
          <button
            onClick={onClose}
            style={{ borderColor: "#0E436B", color: "#0E436B" }}
            className="py-3 px-8 rounded-lg text-custom-blue text-sm font-semibold shadow-sm shadow-custom-blue border-custom-blue focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Cerrar
          </button>
          <button
            onClick={handleSave}
            style={{ borderColor: "#0E436B" }}
            className="py-3 px-8 rounded-lg text-white bg-custom-blue text-sm font-semibold shadow-sm shadow-custom-blue border-custom-blue focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCreateQuote;
