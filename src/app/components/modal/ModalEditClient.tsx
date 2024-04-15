"use client";

import React, { useEffect, useState } from "react";
import InputComponent from "../input/InputComponent";
import BasicButtonComponent from "../buttons/BasicButtonComponent";
import { editClientData } from "@/app/api/data";
import { useRouter } from "next/navigation";
import { Client } from "@/types/types";

interface ModalEditClientProps {
  handleCloseEdit: () => void;
  userData?: Client;
}

const ModalEditClient = ({
  handleCloseEdit,
  userData,
}: ModalEditClientProps) => {
  const router = useRouter();

  const [editClient, setEditClient] = useState<Client>(
    userData || {
      name: "",
      email: "",
      taxId: null,
      phone: null,
      adress: "",
    }
  );

  const token = localStorage.getItem("token");

  useEffect(() => {
    setEditClient(userData as Client);
  }, [userData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditClient({
      ...editClient,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditClient = async () => {
    try {
      await editClientData(editClient, token || "");
      router.push("/clientes");
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
              Editar Cliente
            </h3>
          </div>
          <div className="w-full">
            <InputComponent
              nameVizualization="Nombre cliente"
              name="name"
              placeholder="Nombre de cliente"
              onChange={handleInputChange}
              value={editClient?.name ?? ""}
            />
          </div>

          <div className="flex items-center justify-between gap-5">
            <div>
              <InputComponent
                nameVizualization="Rut"
                name="taxId"
                placeholder="00.000.000-0"
                onChange={handleInputChange}
                value={editClient?.taxId?.toString() ?? ""}
              />
            </div>

            <div>
              <InputComponent
                nameVizualization="Teléfono"
                name="phone"
                placeholder="+569 87592653"
                onChange={handleInputChange}
                value={editClient?.phone?.toString() ?? ""}
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-5">
            <div>
              <InputComponent
                nameVizualization="Correo"
                name="email"
                placeholder="email@ejemplo.cl"
                onChange={handleInputChange}
                value={editClient?.email}
              />
            </div>
            <div>
              <InputComponent
                nameVizualization="Dirección"
                name="adress"
                placeholder="Dirección cliente"
                onChange={handleInputChange}
                value={editClient?.adress ?? ""}
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

export default ModalEditClient;
