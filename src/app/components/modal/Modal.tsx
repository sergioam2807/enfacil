"use client";
import Link from "next/link";
import React, { useState } from "react";
import InputComponent from "../input/InputComponent";
import BasicButtonComponent from "../buttons/BasicButtonComponent";
import { createUserData } from "@/app/api/data";
import { useRouter } from "next/navigation";

const Modal = () => {
  const router = useRouter();
  const [createUser, setCreateUser] = useState({
    name: "",
    created: "2024-04-06T15:51:34.094Z",
    superAdmin: false,
    vigency: false,
    phone: "",
    email: "",
    job: "",
    password: "",
  });

  const token = localStorage.getItem("token");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreateUser({
      ...createUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreateUser({
      ...createUser,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCreateUser({
      ...createUser,
      [event.target.name]: event.target.value === "activo",
    });
  };

  const handleCreateUser = async () => {
    try {
      await createUserData(createUser, token || "");
      router.push("/usuarios");
      router.refresh();
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
              Crea un nuevo usuario
            </h3>
          </div>
          <div className="w-full">
            <InputComponent
              nameVizualization="Nombre de usuario"
              name="name"
              placeholder="Nombre de usuario"
              onChange={handleInputChange}
              value={createUser.name}
            />
          </div>
          <div className="flex items-center justify-between gap-5">
            {/* <div>
              <InputComponent name="Fecha ingreso" placeholder="Fecha" />
            </div> */}
            <div>
              <InputComponent
                nameVizualization="Cargo"
                name="job"
                placeholder="Cargo"
                onChange={handleInputChange}
                value={createUser.job}
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-5">
            <div>
              <div>
                <div className="flex justify-start">
                  <span className="text-sm text-[#000E41]">
                    Tipo de Usuario
                  </span>
                </div>
                <input
                  type="checkbox"
                  name="superAdmin"
                  checked={createUser.superAdmin}
                  onChange={handleCheckboxChange}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-start">
                <span className="text-sm text-[#000E41]">Estado</span>
              </div>
              <select
                name="vigency"
                value={createUser.vigency ? "activo" : "inactivo"}
                onChange={handleSelectChange}
              >
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-between gap-5">
            <div>
              <InputComponent
                nameVizualization="Teléfono"
                name="phone"
                placeholder="+569 87592653"
                onChange={handleInputChange}
                value={createUser.phone.toString()}
              />
            </div>
            <div>
              <InputComponent
                nameVizualization="Correo"
                name="email"
                placeholder="joseretamal@gmail.com"
                onChange={handleInputChange}
                value={createUser.email}
              />
            </div>
          </div>
          <div>
            <InputComponent
              nameVizualization="Contraseña"
              name="password"
              placeholder="Contraseña"
              onChange={handleInputChange}
              value={createUser.password}
            />
          </div>
          <div className="flex justify-end items-center gap-6 pt-5">
            <div className="flex justify-end mt-4">
              <Link
                href="/usuarios"
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
                onClick={handleCreateUser}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
