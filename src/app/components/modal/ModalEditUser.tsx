"use client";

import React, { useEffect, useState } from "react";
import InputComponent from "../input/InputComponent";
import BasicButtonComponent from "../buttons/BasicButtonComponent";
import { editUserData } from "@/app/api/data";
import { useRouter } from "next/navigation";

type User = {
  id: number | null;
  name: string;
  phone: number | null;
  email: string;
  password: string;
};

interface ModalEditUserProps {
  handleCloseEdit: () => void;
  userId: number | null;
  userData?: User;
}

const ModalEditUser = ({
  handleCloseEdit,
  userId,
  userData,
}: ModalEditUserProps) => {
  const router = useRouter();
  const [editUser, setEditUser] = useState<User>(
    userData || {
      id: null,
      name: "",
      phone: null,
      email: "",
      password: "",
    }
  );
  const token = localStorage.getItem("token");

  useEffect(() => {
    setEditUser(userData as User);
  }, [userData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditUser({
      ...editUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditUser({
      ...editUser,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEditUser({
      ...editUser,
      [event.target.name]: event.target.value === "activo",
    });
  };

  const handleEditUser = async () => {
    try {
      if (userId && editUser) {
        const updateUser = {
          id: editUser.id,
          name: editUser.name,
          email: editUser.email,
          phone: editUser.phone,
          password: editUser.password,
        };
        await editUserData(userId.toString(), updateUser, token || "");
      } else {
        console.error("editUser or id is undefined");
      }
      router.push("/usuarios");
      router.refresh();
      handleCloseEdit();
    } catch (error) {
      console.error("Failed to edit user", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="p-8 border w-fit shadow-lg rounded-2xl bg-white">
        <div className="text-center p-4">
          <div className="flex justify-start">
            <h3 className="text-xl font-semibold text-[#000E41]">
              Editar usuario
            </h3>
          </div>
          <div className="w-full">
            <InputComponent
              nameVizualization="Nombre de usuario"
              name="name"
              placeholder="Nombre de usuario"
              onChange={handleInputChange}
              value={editUser?.name}
            />
          </div>
          <div className="flex items-center  gap-5">
            {/* <div>
              <InputComponent name="Fecha ingreso" placeholder="Fecha" />
            </div> */}
            {/* <div className="flex-col justify-start">
              <div className="flex justify-start">
                <span className="text-sm text-[#000E41]">Tipo de Usuario</span>
              </div>
              <div className="mt-4">
                <div className="flex gap-3">
                  <span className="text-sm  text-[#000E41]">Administrador</span>

                  <input
                    type="checkbox"
                    name="superAdmin"
                    checked={editUser?.superAdmin ?? false}
                    onChange={handleCheckboxChange}
                  />
                </div>
              </div>
            </div> */}
          </div>

          <div className="flex items-center gap-5">
            <div>
              <InputComponent
                nameVizualization="Teléfono"
                name="phone"
                placeholder="+569 87592653"
                onChange={handleInputChange}
                value={editUser?.phone?.toString() ?? ""}
              />
            </div>
            {/* <div className="flex flex-col mt-4">
              <div className="flex justify-start">
                <span className="text-sm text-[#000E41]">Estado</span>
              </div>

              <select
                name="vigency"
                value={editUser?.vigency ? "activo" : "inactivo"}
                onChange={handleSelectChange}
                className="w-full mt-1 py-3 pl-2 text-sm font-medium border rounded-md focus:outline-none focus:border-[#EFF4FC]"
              >
                <option
                  value="activo"
                  style={{ fontSize: "14px", padding: "12px 8px" }}
                >
                  Activo
                </option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div> */}
          </div>
          <div>
            <InputComponent
              nameVizualization="Correo"
              name="email"
              placeholder="joseretamal@gmail.com"
              onChange={handleInputChange}
              value={editUser?.email}
            />
          </div>
          <div>
            <InputComponent
              nameVizualization="Contraseña"
              name="password"
              placeholder="Contraseña"
              onChange={handleInputChange}
              value={editUser?.password}
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
                onClick={handleEditUser}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEditUser;
