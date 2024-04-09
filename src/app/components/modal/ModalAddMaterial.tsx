"use client";
import Link from "next/link";
import React, { useState } from "react";
import InputComponent from "../input/InputComponent";
import BasicButtonComponent from "../buttons/BasicButtonComponent";

const ModalAddMaterial = () => {
  const [createUser, setCreateUser] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreateUser({
      ...createUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreateUser = async () => {
    console.log("createMterial");
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="p-8 border w-fit shadow-lg rounded-2xl bg-white">
        <div className="text-center p-4">
          <div className="flex justify-start">
            <h3 className="text-xl font-semibold text-[#000E41]">
              Añadir material
            </h3>
          </div>
          <div className="w-full">
            <InputComponent
              name="name"
              placeholder="Nombre de usuario"
              onChange={handleInputChange}
              value={createUser.name}
            />
          </div>
          <div className="flex items-center justify-between gap-5">
            <div>
              {/* <InputComponent name="Fecha ingreso" placeholder="Fecha" /> */}
            </div>
            <div>
              {/* <InputComponent name="Cargo" placeholder="Cargo" /> */}
            </div>
          </div>
          <div className="flex items-center justify-between gap-5">
            <div>
              {/* <InputComponent
                name="Tipo de usuario"
                placeholder="Introduce un proveedor"
              /> */}
            </div>
            <div>
              <InputComponent
                name="password"
                placeholder="Password"
                onChange={handleInputChange}
                value={createUser.password}
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-5">
            <div>
              <InputComponent
                name="phone"
                placeholder="+569 87592653"
                onChange={handleInputChange}
                value={createUser.phone}
              />
            </div>
            <div>
              <InputComponent
                name="email"
                placeholder="joseretamal@gmail.com"
                onChange={handleInputChange}
                value={createUser.email}
              />
            </div>
          </div>
          <div className="flex justify-end items-center gap-6 pt-5">
            <div className="flex justify-end mt-4">
              <Link
                href="/materiales"
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

export default ModalAddMaterial;
