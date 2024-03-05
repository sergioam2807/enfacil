"use client";
import Image from "next/image";
import React from "react";
import edit from "../../../public/images/edit.svg";
import trash from "../../../public/images/trash.svg";

interface ActionButtonsProps {
  id: string | number;
}
const ActionButtons = ({ id }: ActionButtonsProps) => {
  // CONECTAR CON LA API
  function handleEdit(id: string | number) {
    console.log(`Editando el id: ${id}`);
  }

  function handleDelete(id: string | number) {
    console.log(`Eliminando el id: ${id}`);
  }
  return (
    <div className="flex items-center gap-8">
      <button onClick={() => handleEdit(id)}>
        <Image src={edit} alt="Edit Icon" width={20} height={20} />
      </button>
      <button onClick={() => handleDelete(id)}>
        <Image src={trash} alt="Delete Icon" width={20} height={20} />
      </button>
    </div>
  );
};

export default ActionButtons;
