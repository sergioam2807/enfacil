"use client";
import Image from "next/image";
import React, { useState } from "react";
import editwhite from "../../../../public/images/editwhite.svg";
import ModalEditClient from "../modal/ModalEditClient";
import ModalEditPersonnel from "../modal/ModalEditPersonal";
import ModalEditUser from "../modal/ModalEditUser";
import { Client, Personnel, User } from "@/types/types";

interface Props {
  id?: number | string;
  text?: string;
  byIdURL?: string;
  hasIdentifier?: boolean;
  icon?: any;
  type?: "user" | "client" | "personnel";
}

const initialUserState: User | Personnel | Client | null = null;
const ButtonEditProfile = ({
  id,
  byIdURL,
  hasIdentifier,
  text = "Editar",
  icon = editwhite,
  type,
}: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState<User | Personnel | Client | null>(
    initialUserState
  );
  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
  const fetchUserData = async () => {
    const token = localStorage.getItem("token");

    const url = hasIdentifier
      ? `${process.env.NEXT_PUBLIC_BASE_URL}${byIdURL}?identifier=id&value=${id}`
      : `${process.env.NEXT_PUBLIC_BASE_URL}${byIdURL}?id=${id}`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const userData = await res.json();

    if (userData.data && typeof userData.data === "object") {
      setEditUser(userData.data);
      setIsUserDataLoaded(true);
    } else {
      console.error("User data is not an object", userData.data);
    }
  };
  const handleClick = () => {
    fetchUserData();
    setShowModal(true);
  };

  const handleCloseEdit = () => {
    setShowModal(false);
  };

  const renderModal = () => {
    switch (type) {
      case "user":
        return (
          <ModalEditUser
            handleCloseEdit={handleCloseEdit}
            userId={typeof id === "string" ? Number(id) : id ?? null}
            userData={editUser as User}
          />
        );
      case "personnel":
        return (
          <ModalEditPersonnel
            handleCloseEdit={handleCloseEdit}
            userData={editUser as Personnel}
          />
        );
      case "client":
        return (
          <ModalEditClient
            handleCloseEdit={handleCloseEdit}
            userData={editUser as Client}
          />
        );

      default:
        return null;
    }
  };

  return (
    <button
      onClick={handleClick}
      className=" rounded-lg py-2 px-8 bg-[#0051CC] flex justify-around items-center"
    >
      <Image src={icon} width={25} height={20} alt="edit" color="white" />
      <span className="text-white text-sm font-semibold pl-2">{text}</span>
      {showModal && isUserDataLoaded && renderModal()}
    </button>
  );
};

export default ButtonEditProfile;
