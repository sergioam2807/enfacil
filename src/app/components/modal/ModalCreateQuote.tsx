"use client";
import React from "react";
import TitleComponent from "../common/TitleComponent";
import { Client } from "@/types/types";

interface Props {
  onClose: () => void;
  clientData: Client[];
}
const ModalCreateQuote = ({ onClose, clientData }: Props) => {
  console.log("modal client data", clientData);

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
            <select className="px-4 py-2 border rounded-md text-gray-700 bg-white shadow">
              {clientData.map((client, index) => (
                <option key={index} value={client.id as string}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex pb-3 px-3 justify-between">
          <button
            onClick={onClose}
            style={{ borderColor: "#0E436B", color: "#0E436B" }}
            className="py-3 px-8 rounded-lg text-custom-blue text-sm font-semibold shadow-sm shadow-custom-blue border-custom-blue focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Close
          </button>
          <button
            onClick={onClose}
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
