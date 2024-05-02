"use client";

import React, { useEffect, useState } from "react";
import InputComponent from "../input/InputComponent";
import BasicButtonComponent from "../buttons/BasicButtonComponent";
import { editPersonnelData } from "@/app/api/data";
import { useRouter } from "next/navigation";
import { Personnel } from "@/types/types";

interface ModalEditPersonnelProps {
  handleCloseEdit: () => void;
  userData?: Personnel;
}

const ModalEditPersonnel = ({
  handleCloseEdit,
  userData,
}: ModalEditPersonnelProps) => {
  const router = useRouter();

  const [editPersonnel, setEditPersonnel] = useState<Personnel>(
    userData || {
      id: 0,
      name: "",
      specialty: "",
      pricePerWorkDay: 0,
      taxId: 0,
      phone: 0,
      email: "",
      created: "",
      state: "",
    }
  );

  const token = localStorage.getItem("token");

  useEffect(() => {
    setEditPersonnel(userData as Personnel);
  }, [userData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditPersonnel({
      ...editPersonnel,
      [event.target.name]: event.target.value,
    });
  };

  // const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setEditPersonnel({
  //     ...editUser,
  //     [event.target.name]: event.target.checked,
  //   });
  // };

  // const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setEditUser({
  //     ...editUser,
  //     [event.target.name]: event.target.value === "activo",
  //   });
  // };

  const handleEditPersonnel = async () => {
    try {
      await editPersonnelData(editPersonnel, token || "");
      router.push("/personal");
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
              Editar Personal
            </h3>
          </div>
          <div className="w-full">
            <InputComponent
              nameVizualization="Nombre"
              name="name"
              placeholder="Nombre de usuario"
              onChange={handleInputChange}
              value={editPersonnel?.name}
            />
          </div>
          <div className="w-full">
            <InputComponent
              nameVizualization="Rut"
              name="taxId"
              placeholder="Rut"
              onChange={handleInputChange}
              value={editPersonnel?.taxId?.toString() ?? "-"}
            />
          </div>
          <div className="flex items-center  gap-5">
            <div>
              <InputComponent
                nameVizualization="Cargo"
                name="specialty"
                placeholder="Cargo"
                onChange={handleInputChange}
                value={editPersonnel?.specialty}
              />
            </div>
            <div>
              <InputComponent
                nameVizualization="Valor por día"
                name="pricePerWorkDay"
                placeholder="Cargo"
                onChange={handleInputChange}
                value={editPersonnel?.pricePerWorkDay?.toString() ?? "-"}
              />
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div>
              <InputComponent
                nameVizualization="Teléfono"
                name="phone"
                placeholder="+569 87592653"
                onChange={handleInputChange}
                value={editPersonnel?.phone?.toString() ?? "-"}
              />
            </div>
            <div>
              <InputComponent
                nameVizualization="Correo"
                name="email"
                placeholder="joseretamal@gmail.com"
                onChange={handleInputChange}
                value={editPersonnel?.email}
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
                onClick={handleEditPersonnel}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEditPersonnel;
