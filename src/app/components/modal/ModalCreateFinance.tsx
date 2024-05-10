"use client";
import React, { useState } from "react";
import TitleComponent from "../common/TitleComponent";
import Image from "next/image";
import ingresos from "../../../../public/images/ingresos.svg";
import check from "../../../../public/images/bluecheck.svg";
import nonchecked from "../../../../public/images/nonchecked.svg";
// import { Client } from "@/types/types";
// import { postQuoteData } from "@/app/api/data";

interface ModalCreaFinanceProps {
  onClose: () => void;
}

const ModalCreateFinance = ({ onClose }: ModalCreaFinanceProps) => {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  // const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const INGRESOS = "ingresos";
  const GASTOS = "gastos";

  const handleButtonSelectedClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

  const handleSave = async () => {
    // if (selectedClient) {
    //   localStorage.setItem("selectedClientId", String(selectedClient.id));
    //   localStorage.setItem("selectedClientName", selectedClient.name);
    //   const token = localStorage.getItem("token");
    //   if (token) {
    //     const quote = {
    //       clientId: selectedClient.id,
    //       title: selectedClient.name,
    //     };
    //     try {
    //       const response = await postQuoteData(token, quote);
    //       console.log(response);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    // }
    // onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="border w-96 shadow-lg rounded-2xl bg-white  flex flex-col">
        <div className="py-10 px-5 max-w-full ">
          <TitleComponent
            titleName={
              "Primero selecciona que tipo de movimiento deseas ingresar."
            }
          />
          <div className="flex flex-col gap-3">
            <button
              onClick={() => handleButtonSelectedClick("ingresos")}
              className={`flex ${
                selectedButton === INGRESOS
                  ? " bg-[#EFF4FC] border-custom-blue border-2"
                  : "none"
              } border-2 text-custom-blue text-lg font-bold items-center justify-between px-3 rounded-lg  py-8 gap-2`}
            >
              <div className="flex items-center gap-2">
                <Image src={ingresos} alt="ingresos" width={42} height={42} />
                Ingresos
              </div>
              <div>
                <Image
                  src={selectedButton === INGRESOS ? check : nonchecked}
                  alt="ingresos"
                  width={32}
                  height={32}
                />
              </div>
            </button>
            <button
              onClick={() => handleButtonSelectedClick("gastos")}
              className={`flex ${
                selectedButton === GASTOS
                  ? " bg-[#EFF4FC] border-custom-blue border-2"
                  : "none"
              } border-2 text-custom-blue text-lg font-bold items-center justify-between px-3 rounded-lg  py-8 gap-2`}
            >
              <div className="flex items-center gap-2">
                <Image src={ingresos} alt="gastos" width={42} height={42} />
                Gastos
              </div>
              <div>
                <Image
                  src={selectedButton === GASTOS ? check : nonchecked}
                  alt="ingresos"
                  width={32}
                  height={32}
                />
              </div>
            </button>
          </div>
        </div>
        <div className="flex pb-3 px-3 justify-between">
          <button
            onClick={onClose}
            style={{ borderColor: "#0E436B", color: "#0E436B" }}
            className="py-3 px-8 rounded-lg text-custom-blue text-sm font-semibold shadow-sm shadow-custom-blue border-custom-blue focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            style={{ borderColor: "#0E436B" }}
            className="py-3 px-8 rounded-lg text-white bg-custom-blue text-sm font-semibold shadow-sm shadow-custom-blue border-custom-blue focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCreateFinance;
