"use client";
import React from "react";
import TitleComponent from "../common/TitleComponent";
import { formatPrice } from "@/helpers/capitaliizeFirstLetter";
import { useRouter } from "next/navigation";

interface ModalCotizacionProps {
  quoteFinalData: any;
  closeModal: () => void;
}
const ModalCotizacion = ({
  quoteFinalData,
  closeModal,
}: ModalCotizacionProps) => {
  const router = useRouter();

  const handleConvertToProject = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("selectedClientId");
      localStorage.removeItem("quoteData");
      localStorage.removeItem("selectedClientName");
    }
    closeModal();
    router.push("/cotizaciones");
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="p-8 border w-fit shadow-lg rounded-2xl bg-white">
        <div>
          <TitleComponent
            titleName={"¿Estás seguro de convertir la cotización, en proyecto?"}
          />
        </div>
        <div className="flex flex-col bg-[#EFF4FC] px-4 py-8 rounded-xl gap-2">
          <div>
            <span className="text-custom-blue font-medium">
              Cliente: {quoteFinalData?.clientName}
            </span>
          </div>
          <div>
            <span className="text-[#797979] font-medium ">Detalle</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#797979] font-medium ">
              Total Materiales
            </span>
            <span className="text-[#797979] font-medium ">
              {formatPrice(quoteFinalData?.totals?.materials ?? 0)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#797979] font-medium ">
              Total mano de obra
            </span>
            <span className="text-[#797979] font-medium ">
              {formatPrice(quoteFinalData?.totals?.manPower ?? 0)}
            </span>
          </div>
          {/* <div className="flex justify-between">
            <span className="text-[#797979] font-medium ">
              Gastos generales
            </span>
            <span className="text-[#797979] font-medium ">$0</span>
          </div> */}
          <div className="flex justify-between">
            <span className="text-[#797979] font-medium ">Total final</span>
            <span className="text-custom-blue font-medium ">
              {" "}
              {formatPrice(quoteFinalData?.totals?.finalTotal ?? 0)}
            </span>
          </div>
        </div>

        <div className="flex justify-end items-center gap-6 pt-5">
          <div className="flex justify-end mt-4">
            <button
              onClick={closeModal}
              className="py-3 px-3 rounded-lg text-white text-sm font-semibold shadow-sm bg-custom-red"
            >
              No, cancelar
            </button>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleConvertToProject}
              className="py-3 px-3 rounded-lg text-white text-sm font-semibold shadow-sm bg-[#1CB454]"
            >
              Sí, convertir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCotizacion;
