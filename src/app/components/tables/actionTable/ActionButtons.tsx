"use client";
import Image from "next/image";
import React, { useState } from "react";
import edit from "../../../../../public/images/edit.svg";
import trash from "../../../../../public/images/trash.svg";
import { useRouter } from "next/navigation";
import ModalEditUser, { User } from "../../modal/ModalEditUser";
import ModalEditPersonnel from "../../modal/ModalEditPersonal";
import ModalEditClient from "../../modal/ModalEditClient";

interface ActionButtonsProps {
  id: number | string;
  deleteURL: string;
  byIdURL: string;
  hasIdentifier?: boolean;
  type: string;
}

interface ModalEditUserProps {
  handleCloseEdit: () => void;
  userData?: User;
}

const initialUserState: User | null = null;
const ActionButtons = ({
  id,
  deleteURL,
  byIdURL,
  hasIdentifier,
  type,
}: ActionButtonsProps) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(initialUserState);
  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
  const router = useRouter();

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

  function handleEdit() {
    fetchUserData();
    setShowEditModal(true);
  }

  function handleCloseEdit() {
    setShowEditModal(false);
  }

  async function handleDelete(id: string) {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}${deleteURL}?id=${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to delete user");
    }

    const data = await res.json();
    console.log("Deleted successfully", data);
    router.refresh();
  }

  const renderModal = () => {
    switch (type) {
      case "usuarios":
        return (
          <ModalEditUser
            handleCloseEdit={handleCloseEdit}
            userId={typeof id === "string" ? Number(id) : id}
            userData={editUser as ModalEditUserProps["userData"]}
          />
        );
      case "personal":
        return (
          <ModalEditPersonnel
            handleCloseEdit={handleCloseEdit}
            userData={editUser as ModalEditUserProps["personnelData"]}
          />
        );
      case "clientes":
        return (
          <ModalEditClient
            handleCloseEdit={handleCloseEdit}
            userData={editUser as ModalEditUserProps["clientesData"]}
          />
        );
      case "materiales":
        return (
          <ModalEditMateriales
            handleCloseEdit={handleCloseEdit}
            userData={editUser as ModalEditUserProps["materialesData"]}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center gap-8">
      <button onClick={handleEdit}>
        <Image src={edit} alt="Edit Icon" width={20} height={20} />
      </button>
      {showEditModal && isUserDataLoaded && renderModal()}
      <button onClick={() => handleDelete(id.toString())}>
        <Image src={trash} alt="Delete Icon" width={20} height={20} />
      </button>
    </div>
  );
};

export default ActionButtons;
