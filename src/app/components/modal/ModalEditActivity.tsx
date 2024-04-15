"use client";

import React, { useEffect, useState } from "react";
import InputComponent from "../input/InputComponent";
import BasicButtonComponent from "../buttons/BasicButtonComponent";
import { useRouter } from "next/navigation";
import { editActivityData } from "@/app/api/data";
import { Activity } from "@/types/types";

interface ModalEditActivityProps {
  handleCloseEdit: () => void;
  activityData?: Activity;
}

const ModalEditActivity = ({
  handleCloseEdit,
  activityData,
}: ModalEditActivityProps) => {
  const router = useRouter();

  const [editActivity, setEditActivity] = useState<Activity>(
    activityData || {
      id: null,
      name: "",
      metricUnit: "0",
      manPowerUnitPricing: "",
      materialsUnitPricing: "",
      materialsRecipeIds: "0",
    }
  );

  const token = localStorage.getItem("token");

  useEffect(() => {
    setEditActivity(activityData as Activity);
  }, [activityData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditActivity({
      ...editActivity,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditClient = async () => {
    try {
      await editActivityData(editActivity, token || "");
      router.push("/actividades");
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
              Editar Actividad
            </h3>
          </div>
          <div className="w-full">
            <InputComponent
              nameVizualization="Actividad"
              name="name"
              placeholder="Nombre"
              onChange={handleInputChange}
              value={editActivity?.name ?? ""}
            />
          </div>

          <div>
            <InputComponent
              nameVizualization="Precio mano de obra unitario"
              name="manPowerUnitPricing"
              placeholder="$00.000"
              onChange={handleInputChange}
              value={editActivity?.manPowerUnitPricing ?? ""}
            />
          </div>
          <div className="flex items-center justify-between gap-5">
            <div>
              <InputComponent
                nameVizualization="Precio material unitario"
                name="materialsUnitPricing"
                placeholder="$00.000"
                onChange={handleInputChange}
                value={editActivity?.materialsUnitPricing ?? ""}
              />
            </div>
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

export default ModalEditActivity;
