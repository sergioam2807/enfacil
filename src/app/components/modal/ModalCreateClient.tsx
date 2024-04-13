"use client";
import Link from "next/link";
import React, { useState } from "react";
import InputComponent from "../input/InputComponent";
import BasicButtonComponent from "../buttons/BasicButtonComponent";
import { useRouter } from "next/navigation";
import { createClientData } from "@/app/api/data";

type Client = {
  name: string;
  email: string;
  taxId: number | null;
  phone: number | null;
  adress: string;
};

const ModalCreateClient = () => {
  const router = useRouter();
  const [createClient, setCreateClient] = useState<Client>({
    name: "",
    email: "",
    taxId: null,
    phone: null,
    adress: "",
  });

  const token = localStorage.getItem("token");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreateClient({
      ...createClient,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreateClient = async () => {
    try {
      await createClientData(createClient, token || "");
      router.push("/clientes");
      router.refresh();
    } catch (error) {
      console.error("Failed to create personnel", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="p-8 border w-fit shadow-lg rounded-2xl bg-white">
        <div className="text-center p-4">
          <div className="flex justify-start">
            <h3 className="text-xl font-semibold text-[#000E41]">
              Crear Cliente
            </h3>
          </div>
          <div className="w-full">
            <InputComponent
              nameVizualization="Nombre cliente"
              name="name"
              placeholder="Nombre de cliente"
              onChange={handleInputChange}
              value={createClient?.name ?? ""}
            />
          </div>

          <div className="flex items-center justify-between gap-5">
            <div>
              <InputComponent
                nameVizualization="Rut"
                name="taxId"
                placeholder="00.000.000-0"
                onChange={handleInputChange}
                value={createClient?.taxId?.toString() ?? ""}
              />
            </div>

            <div>
              <InputComponent
                nameVizualization="Teléfono"
                name="phone"
                placeholder="+569 87592653"
                onChange={handleInputChange}
                value={createClient?.phone?.toString() ?? ""}
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
                value={createClient?.email}
              />
            </div>
            <div>
              <InputComponent
                nameVizualization="Dirección"
                name="adress"
                placeholder="Dirección cliente"
                onChange={handleInputChange}
                value={createClient?.adress ?? ""}
              />
            </div>
          </div>

          <div className="flex justify-end items-center gap-6 pt-5">
            <div className="flex justify-end mt-4">
              <Link
                href="/clientes"
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
                onClick={handleCreateClient}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCreateClient;
