"use client";

import React, { useEffect, useState } from "react";
import InputComponent from "../input/InputComponent";
import BasicButtonComponent from "../buttons/BasicButtonComponent";
import { editMaterialData } from "@/app/api/data";
import { useRouter } from "next/navigation";
import { Material } from "@/types/types";
import { SelectComponent } from "../common/SelectComponent";
import { measurementUnits } from "@/constants/measurementunits";

interface ModalEditMaterialProps {
  handleCloseEdit: () => void;
  materialData?: Material;
}

const ModalEditMaterial = ({
  handleCloseEdit,
  materialData,
}: ModalEditMaterialProps) => {
  const router = useRouter();

  const [editMaterial, setEditMaterial] = useState<Material>(
    materialData || {
      name: "",
      metricUnit: "",
      unitsPerSinglePurchase: "",
      pricingPerSinglePurchase: "",
      providerName: "",
    }
  );

  const token = localStorage.getItem("token");

  useEffect(() => {
    setEditMaterial(materialData as Material);
  }, [materialData]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setEditMaterial({
      ...editMaterial,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditClient = async () => {
    try {
      await editMaterialData(editMaterial, token || "");
      router.push("/materiales");
      router.refresh();
      handleCloseEdit();
    } catch (error) {
      console.error("Failed to create user", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="p-8 border w-fit shadow-lg rounded-2xl bg-white">
        <div className="text-center p-4">
          <div className="flex justify-start">
            <h3 className="text-xl font-semibold text-[#000E41]">
              Editar Material
            </h3>
          </div>
          <div className="w-full">
            <InputComponent
              nameVizualization="Nombre"
              name="name"
              placeholder="Nombre"
              onChange={handleInputChange}
              value={editMaterial?.name ?? ""}
            />
          </div>

          <div>
            <SelectComponent
              name="metricUnit"
              value={editMaterial?.metricUnit}
              onChange={handleInputChange}
              options={measurementUnits}
            />
          </div>
          <div className="flex items-center justify-between gap-5">
            <div>
              <InputComponent
                nameVizualization="Cantidad"
                name="unitsPerSinglePurchase"
                placeholder="0"
                onChange={handleInputChange}
                value={editMaterial?.unitsPerSinglePurchase ?? ""}
              />
            </div>
            <div>
              <InputComponent
                nameVizualization="Precio unidad"
                name="pricingPerSinglePurchase"
                placeholder="$0"
                onChange={handleInputChange}
                value={editMaterial?.pricingPerSinglePurchase ?? ""}
              />
            </div>
          </div>
          <div>
            <InputComponent
              nameVizualization="Proveedor"
              name="providerName"
              placeholder="Ej: Sodimac"
              onChange={handleInputChange}
              value={editMaterial?.providerName ?? ""}
            />
          </div>

          <div className="flex justify-end items-center gap-6 pt-5">
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCloseEdit}
                style={{ borderColor: "#0E436B", color: "#0E436B" }}
                className="py-3 px-8 rounded-lg text-custom-blue text-sm font-semibold shadow-sm shadow-custom-blue border-custom-blue focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Close
              </button>
            </div>
            <div className="flex justify-end mt-4">
              <BasicButtonComponent
                bgColor="#0E436B"
                borderColor="#0E436B"
                textColor="#FFFFFF"
                text="Editar"
                onClick={handleEditClient}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEditMaterial;
