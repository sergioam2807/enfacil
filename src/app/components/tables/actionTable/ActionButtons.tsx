"use client";
import Image from "next/image";
import React, { useState } from "react";
import edit from "../../../../../public/images/edit.svg";
import trash from "../../../../../public/images/trash.svg";
import Link from "next/link";
import { deleteUserData, getUserByIdData } from "@/app/api/data";
import { useRouter } from "next/navigation";
import ModalEditUser, { User } from "../../modal/ModalEditUser";

interface ActionButtonsProps {
  id: number | string;
}

interface ModalEditUserProps {
  handleCloseEdit: () => void;
  userData?: User;
}

const initialUserState: User | null = null;
const ActionButtons = ({ id }: ActionButtonsProps) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(initialUserState);
  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
  const router = useRouter();

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");

    try {
      const userData = await getUserByIdData(id.toString(), token || "");
      if (userData.data && typeof userData.data === "object") {
        setEditUser(userData.data);
        setIsUserDataLoaded(true);
      } else {
        console.error("User data is not an object", userData.data);
      }
    } catch (error) {
      console.error("Failed to fetch user data", error);
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
    try {
      const data = await deleteUserData(id.toString(), token || "");
      console.log("Deleted successfully", data);
      router.refresh();
    } catch (error) {
      console.error("Failed to delete", error);
    }
  }

  return (
    <div className="flex items-center gap-8">
      <button onClick={handleEdit}>
        <Image src={edit} alt="Edit Icon" width={20} height={20} />
      </button>
      {showEditModal && isUserDataLoaded && (
        <ModalEditUser
          handleCloseEdit={handleCloseEdit}
          userData={editUser as ModalEditUserProps["userData"]}
        />
      )}
      <button onClick={() => handleDelete(id.toString())}>
        <Image src={trash} alt="Delete Icon" width={20} height={20} />
      </button>
    </div>
  );
};

export default ActionButtons;
