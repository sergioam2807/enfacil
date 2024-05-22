"use client";
import Link from "next/link";
import React, { useState } from "react";
import InputComponent from "../input/InputComponent";
import BasicButtonComponent from "../buttons/BasicButtonComponent";
import { useRouter } from "next/navigation";
import { createPersonalData } from "@/app/api/data";
import { Personnel } from "@/types/types";
import {
  cleanTaxId,
  formatRUT,
  formatTaxId,
} from "@/helpers/capitaliizeFirstLetter";

export type CreatePersonnelData = {
  email: string;
  name: string;
  specialty: string;
  pricePerWorkDay: number | null;
  taxId: string | null;
  phone: number | null;
};

const ModalCreatePersonal = () => {
  const router = useRouter();
  const [createPesonnel, setCreatePersonnel] = useState<CreatePersonnelData>({
    email: "",
    name: "",
    specialty: "",
    pricePerWorkDay: null,
    taxId: null,
    phone: null,
  });

  const token = localStorage.getItem("token");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "taxId") {
      setCreatePersonnel((prevState) => ({
        ...prevState,
        [name]: formatRUT(value),
      }));
    } else {
      setCreatePersonnel((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleCreatePesonnel = async () => {
    try {
      const personnelData = {
        ...createPesonnel,
        taxId: createPesonnel.taxId
          ? Number(createPesonnel.taxId.replace(/\D/g, ""))
          : null,
      };
      await createPersonalData(personnelData, token || "");
      router.push("/personal");
      router.refresh();
    } catch (error) {
      console.error("Failed to create personnel", error);
    }
  };

  const allFieldsFilled = () => {
    for (let key in createPesonnel) {
      if (!createPesonnel[key as keyof CreatePersonnelData]) {
        return false;
      }
    }
    return true;
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="p-8 border w-fit shadow-lg rounded-2xl bg-white">
        <div className="text-center p-4">
          <div className="flex justify-start">
            <h3 className="text-xl font-semibold text-[#000E41]">
              Crear personal
            </h3>
          </div>
          <div className="w-full">
            <InputComponent
              nameVizualization="Nombre de usuario"
              name="name"
              placeholder="Nombre de usuario"
              onChange={handleInputChange}
              value={createPesonnel?.name}
            />
          </div>

          <div className="flex items-center justify-between gap-5">
            <div>
              <InputComponent
                nameVizualization="Rut"
                name="taxId"
                placeholder="00.000.000-0"
                onChange={(e) => {
                  e.target.value = cleanTaxId(e.target.value);
                  handleInputChange(e);
                }}
                value={formatTaxId(createPesonnel?.taxId?.toString() ?? "")}
              />
            </div>

            <div>
              <InputComponent
                nameVizualization="Teléfono"
                name="phone"
                placeholder="+569 87592653"
                onChange={handleInputChange}
                value={createPesonnel?.phone?.toString() ?? ""}
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-5">
            <div>
              <InputComponent
                nameVizualization="Cargo"
                name="specialty"
                placeholder="Cargo"
                onChange={handleInputChange}
                value={createPesonnel?.specialty}
              />
            </div>
            <div>
              <InputComponent
                nameVizualization="Valor día"
                name="pricePerWorkDay"
                placeholder="$00.000"
                onChange={handleInputChange}
                value={createPesonnel?.pricePerWorkDay?.toString() ?? ""}
              />
            </div>
          </div>

          <div>
            <InputComponent
              nameVizualization="Correo"
              name="email"
              placeholder="joseretamal@gmail.com"
              onChange={handleInputChange}
              value={createPesonnel?.email}
            />
          </div>

          <div className="flex justify-end items-center gap-6 pt-5">
            <div className="flex justify-end mt-4">
              <Link
                href="/personal"
                style={{ borderColor: "#0E436B", color: "#0E436B" }}
                className="py-3 px-8 rounded-lg text-custom-blue text-sm font-semibold shadow-sm shadow-custom-blue border-custom-blue focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Close
              </Link>
            </div>
            <div className="flex justify-end mt-4">
              <BasicButtonComponent
                bgColor={allFieldsFilled() ? "#0E436B" : "#BDBDBD"}
                borderColor={allFieldsFilled() ? "#0E436B" : "#BDBDBD"}
                textColor="#FFFFFF"
                text="Añadir"
                onClick={handleCreatePesonnel}
                disabled={!allFieldsFilled()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCreatePersonal;
