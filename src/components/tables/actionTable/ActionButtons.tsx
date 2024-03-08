"use client";
import Image from "next/image";
import React from "react";
import edit from "../../../../public/images/edit.svg";
import trash from "../../../../public/images/trash.svg";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { deletePersonalData, deleteUserData } from "@/api/data";
interface ActionButtonsProps {
  id: string | number;
  path: string;
}
const ActionButtons = ({ id, path }: ActionButtonsProps) => {
  const router = useRouter();

  // CONECTAR CON LA API
  // function handleEdit(id: string | number) {
  //   console.log(`Editando el id: ${id}`);
  //   router.push(`/${url}/id`);
  // }

  // Preguntar por el metodo delete  /UserApi/DeleteUser  Configuración de CORS: Asegúrate de que tu servidor está configurado para permitir solicitudes CORS desde el dominio de tu aplicación. Esto incluye permitir el método OPTIONS para la ruta /UserApi/DeleteUser.
  // Permisos del método DELETE: Asegúrate de que tu servidor permite el método DELETE para la ruta /UserApi/DeleteUser. El error 405 indica que este método no está permitido.

  async function handleDelete(id: string) {
    try {
      const data = await deletePersonalData(id);
      console.log("Deleted successfully", data);
    } catch (error) {
      console.error("Failed to delete", error);
    }
  }

  return (
    <div className="flex items-center gap-8">
      {id}
      <Link href={`/${path}/${id}`}>
        <Image src={edit} alt="Edit Icon" width={20} height={20} />
      </Link>

      <button onClick={() => handleDelete(id)}>
        <Image src={trash} alt="Delete Icon" width={20} height={20} />
      </button>
    </div>
  );
};

export default ActionButtons;
