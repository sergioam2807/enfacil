"use client";

import React, { useEffect, useState } from "react";
import InputComponent from "../input/InputComponent";
import BasicButtonComponent from "../buttons/BasicButtonComponent";
import { editClientData } from "@/app/api/data";
import { useRouter } from "next/navigation";
import { Client } from "@/types/types";
import { useInput } from "@/app/hooks/useEditInput";

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
      id: "",
      name: "",
      email: "",
      taxId: "",
      phone: null,
      address: "",
    }
  );

  const nameInput = useInput(editClient.name, (value) =>
    setEditClient({ ...editClient, name: value })
  );
  const taxIdInput = useInput(editClient.taxId?.toString() ?? "", (value) =>
    setEditClient({ ...editClient, taxId: value })
  );
  const phoneInput = useInput(editClient.phone?.toString() ?? "", (value) =>
    setEditClient({ ...editClient, phone: parseInt(value) })
  );
  const emailInput = useInput(editClient.email ?? "", (value) =>
    setEditClient({ ...editClient, email: value })
  );
  const addressInput = useInput(editClient.address ?? "", (value) =>
    setEditClient({ ...editClient, address: value })
  );

  const token = localStorage.getItem("token");

  useEffect(() => {
    setEditClient(userData as Client);
  }, [userData]);

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
              onChange={nameInput.onChange}
              onBlur={nameInput.onBlur}
              value={nameInput.value}
            />
          </div>

          <div className="flex items-center justify-between gap-5">
            <div>
              <InputComponent
                nameVizualization="Rut"
                name="taxId"
                placeholder="00.000.000-0"
                onChange={taxIdInput.onChange}
                onBlur={taxIdInput.onBlur}
                value={taxIdInput.value}
              />
            </div>

            <div>
              <InputComponent
                nameVizualization="Teléfono"
                name="phone"
                placeholder="+569 87592653"
                onChange={phoneInput.onChange}
                onBlur={phoneInput.onBlur}
                value={phoneInput.value}
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-5">
            <div>
              <InputComponent
                nameVizualization="Correo"
                name="email"
                placeholder="email@ejemplo.cl"
                onChange={emailInput.onChange}
                onBlur={emailInput.onBlur}
                value={emailInput.value}
              />
            </div>
            <div>
              <InputComponent
                nameVizualization="Dirección"
                name="address"
                placeholder="Dirección cliente"
                onChange={addressInput.onChange}
                onBlur={addressInput.onBlur}
                value={addressInput.value}
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
