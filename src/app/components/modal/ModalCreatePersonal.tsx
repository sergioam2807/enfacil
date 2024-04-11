"use client";
import Link from "next/link";
import React, { useState } from "react";
import InputComponent from "../input/InputComponent";
import BasicButtonComponent from "../buttons/BasicButtonComponent";
import { useRouter } from "next/navigation";
import { createPersonalData } from "../../api/personal";

const ModalCreatePersonal = () => {
  const router = useRouter();
  const [createPesonnel, setCreatePersonnel] = useState({
    email: "front@gmail.com",
    name: "Testings front",
    specialty: "Developer",
    pricePerWorkDay: "20000",
    taxId: "145556661",
    phone: "934687234",
  });

  const token = localStorage.getItem("token");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreatePersonnel({
      ...createPesonnel,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreatePersonnel({
      ...createPesonnel,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCreatePersonnel({
      ...createPesonnel,
      [event.target.name]: event.target.value === "activo",
    });
  };

  const handleCreatePesonnel = async () => {
    try {
      await createPersonalData(createPesonnel, token || "");
      router.push("/personal");
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
              Crea nuevo personal
            </h3>
          </div>
          <div className="w-full">
            <InputComponent
              nameVizualization="Nombre de usuario"
              name="name"
              placeholder="Nombre de usuario"
              onChange={handleInputChange}
              value={createPesonnel.name}
            />
          </div>

          <div className="flex items-center justify-between gap-5">
            <div>
              <InputComponent
                nameVizualization="Rut"
                name="phone"
                placeholder="00.000.000-0"
                onChange={handleInputChange}
                value={createPesonnel.taxId.toString()}
              />
            </div>

            <div>
              <InputComponent
                nameVizualization="Teléfono"
                name="phone"
                placeholder="+569 87592653"
                onChange={handleInputChange}
                value={createPesonnel.phone.toString()}
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-5">
            <div>
              <InputComponent
                nameVizualization="Cargo"
                name="job"
                placeholder="Cargo"
                onChange={handleInputChange}
                value={createPesonnel.specialty}
              />
            </div>
            <div>
              <InputComponent
                nameVizualization="Valor día"
                name="job"
                placeholder="Cargo"
                onChange={handleInputChange}
                value={createPesonnel.pricePerWorkDay.toString()}
              />
            </div>
          </div>

          <div>
            <InputComponent
              nameVizualization="Correo"
              name="email"
              placeholder="joseretamal@gmail.com"
              onChange={handleInputChange}
              value={createPesonnel.email}
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
                bgColor="#0E436B"
                borderColor="#0E436B"
                textColor="#FFFFFF"
                text="Añadir"
                onClick={handleCreatePesonnel}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCreatePersonal;
