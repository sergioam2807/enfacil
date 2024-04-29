"use client";
import Link from "next/link";
import React, { useState } from "react";
import InputComponent from "../input/InputComponent";
import BasicButtonComponent from "../buttons/BasicButtonComponent";
import { useRouter } from "next/navigation";
import { createActivityData } from "@/app/api/data";

const ModalCreateActivity = () => {
  const router = useRouter();
  const [createActivity, setCreateActivity] = useState({
    name: "",
    metricUnit: "",
    manPowerUnitPricing: "",
    materialsUnitPricing: "",
    materialsRecipeIds: "",
  });
  const token = localStorage.getItem("token");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreateActivity({
      ...createActivity,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreateActivity = async () => {
    try {
      await createActivityData(createActivity, token || "");
      router.push("/actividades");
      router.refresh();
    } catch (error) {
      console.error("Failed to create activity", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="p-8 border w-fit shadow-lg rounded-2xl bg-white">
        <div className="text-center p-4">
          <div className="flex justify-start">
            <h3 className="text-xl font-semibold text-[#000E41]">
              Añadir Actividad
            </h3>
          </div>
          <div className="w-full">
            <InputComponent
              nameVizualization="Nombre"
              name="name"
              placeholder="Nombre"
              onChange={handleInputChange}
              value={createActivity?.name}
            />
          </div>

          <div>
            <InputComponent
              nameVizualization="Precio mano de obra unitario"
              name="manPowerUnitPricing"
              placeholder="$00.000"
              onChange={handleInputChange}
              value={createActivity?.manPowerUnitPricing}
            />
          </div>
          <div className="flex items-center justify-between gap-5">
            <div>
              <InputComponent
                nameVizualization="Precio material unitario"
                name="materialsUnitPricing"
                placeholder="$00.000"
                onChange={handleInputChange}
                value={createActivity?.materialsUnitPricing}
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-5">
            <div>
              <InputComponent
                nameVizualization="Unidad de medida"
                name="metricUnit"
                placeholder="Kg"
                onChange={handleInputChange}
                value={createActivity?.metricUnit}
              />
            </div>
          </div>
          <div className="flex justify-end items-center gap-6 pt-5">
            <div className="flex justify-end mt-4">
              <Link
                href="/actividades"
                style={{ borderColor: "#0E436B", color: "#0E436B" }}
                className="py-3 px-8 rounded-lg text-custom-blue text-sm font-semibold shadow-sm shadow-custom-blue border-custom-blue focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Close
              </Link>
            </div>
            <div className="flex justify-end mt-4">
              <BasicButtonComponent
                bgColor="#0E436B"
                borderColor="#0E436B"
                textColor="#FFFFFF"
                text="Añadir"
                onClick={handleCreateActivity}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCreateActivity;
