"use client";
import Link from "next/link";
import React from "react";
import TitleComponent from "../common/TitleComponent";

const ModalCotizacion = () => {
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
              Cliente: Nombre cliente
            </span>
          </div>
          <div>
            <span className="text-[#797979] font-medium ">Detalle</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#797979] font-medium ">
              Total Materiales
            </span>
            <span className="text-[#797979] font-medium ">$0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#797979] font-medium ">
              Total mano de obra
            </span>
            <span className="text-[#797979] font-medium ">$0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#797979] font-medium ">
              Gastos generales
            </span>
            <span className="text-[#797979] font-medium ">$0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#797979] font-medium ">Total final</span>
            <span className="text-custom-blue font-medium ">$0</span>
          </div>
        </div>

        <div className="flex justify-end items-center gap-6 pt-5">
          <div className="flex justify-end mt-4">
            <Link
              href="/cotizaciones/detalle"
              className="py-3 px-3 rounded-lg text-white text-sm font-semibold shadow-sm bg-custom-red"
            >
              No, cancelar
            </Link>
          </div>
          <div className="flex justify-end mt-4">
            <Link
              href="/cotizaciones/detalle"
              className="py-3 px-3 rounded-lg text-white text-sm font-semibold shadow-sm bg-[#1CB454]"
            >
              Sí, convertir
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCotizacion;
