"use client";
import Link from "next/link";
import React, { useState } from "react";
import InputComponent from "../input/InputComponent";
import BasicButtonComponent from "../buttons/BasicButtonComponent";
import { useRouter } from "next/navigation";
import { cleanTaxId, formatTaxId } from "@/helpers/capitaliizeFirstLetter";

interface Props {
  onClose: () => void;
}

const ModalCreateFinanceIngresos = ({ onClose }: Props) => {
  const router = useRouter();
  // const [createPesonnel, setCreatePersonnel] = useState<CreatePersonnelData>({
  //   email: "",
  //   name: "",
  //   specialty: "",
  //   pricePerWorkDay: null,
  //   taxId: null,
  //   phone: null,
  // });

  const token = localStorage.getItem("token");

  const handleInputChange = () => {
    console.log("click");
  };

  const handleCreatePesonnel = async () => {
    // try {
    //   await createPersonalData(createPesonnel, token || "");
    //   router.push("/personal");
    //   router.refresh();
    // } catch (error) {
    //   console.error("Failed to create personnel", error);
    // }
  };

  // const allFieldsFilled = () => {
  //   for (let key in createPesonnel) {
  //     if (!createPesonnel[key as keyof CreatePersonnelData]) {
  //       return false;
  //     }
  //   }
  //   return true;
  // };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="p-8 border w-fit shadow-lg rounded-2xl bg-white">
        <div className="text-center p-4">
          <div className="flex justify-start">
            <h3 className="text-xl font-semibold text-[#000E41]">
              Añade los ingresos
            </h3>
          </div>
          <div className="w-full">
            <InputComponent
              nameVizualization="Cliente"
              name="name"
              placeholder="Cliente"
              onChange={handleInputChange}
              value={"Cliente"}
            />
          </div>

          <div className="flex items-center justify-between gap-5">
            <div>
              <InputComponent
                nameVizualization="Proyecto"
                name="projec"
                onChange={handleInputChange}
                placeholder="Proyecto"
                value="test"
              />
            </div>

            <div>
              <InputComponent
                nameVizualization="Fecha"
                name="date"
                placeholder="25/03/2024"
                onChange={handleInputChange}
                value={""}
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-5">
            <div>
              <InputComponent
                nameVizualization="Banco"
                name="bank"
                placeholder="Banco"
                onChange={handleInputChange}
                value={""}
              />
            </div>
            <div>
              <InputComponent
                nameVizualization="Monto"
                name="pricePerWorkDay"
                placeholder="$00.000"
                onChange={handleInputChange}
                value={""}
              />
            </div>
          </div>

          <div>
            <InputComponent
              nameVizualization="Descripción"
              name="description"
              placeholder="Descripción"
              onChange={handleInputChange}
              value={""}
            />
          </div>

          <div className="flex justify-end items-center gap-6 pt-5">
            <div className="flex justify-end mt-4">
              <button
                onClick={onClose}
                style={{ borderColor: "#0E436B", color: "#0E436B" }}
                className="py-3 px-8 rounded-lg text-custom-blue text-sm font-semibold shadow-sm shadow-custom-blue border-custom-blue focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Cerrar
              </button>
            </div>
            <div className="flex justify-end mt-4">
              <BasicButtonComponent
                bgColor={"#0E436B"}
                borderColor={"#0E436B"}
                textColor="#FFFFFF"
                text="Añadir"
                onClick={handleCreatePesonnel}
                // disabled={!allFieldsFilled()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCreateFinanceIngresos;
