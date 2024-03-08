import React from "react";

import userIcon from "../../../../public/images/user.svg";

import Image from "next/image";
import ActionButtons from "./ActionButtons";
import TableHead from "@/components/common/TableHead";
import TableCell from "@/components/common/TableCell";
import ChipStatus from "@/components/chip/ChipStatus";

interface User {
  id: string;
  name: string;
  cargo: string;
  superAdmin: string;
  fIngreso: string;
  state: string;
  phone: string;
  email: string;
}

interface userProps {
  usersData: User[];
}

interface userDataProps {
  name: string;
  superAdmin: boolean;
  fIngreso: string | null;
  estado: string | null;
  email: string;
  phone: string;
  id: number;
}

const ActionTableComponent = ({ usersData }: userProps) => {
  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="text-[#0E436B] font-semibold text-sm">
          <th className="text-left pb-8 pt-5"></th>
          <TableHead>Nombre</TableHead>
          <TableHead>Cargo</TableHead>
          <TableHead>Tipo Usuario</TableHead>
          <TableHead>F.ingreso</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Contacto</TableHead>
          <TableHead>Acciones</TableHead>
        </tr>
      </thead>
      <tbody>
        {usersData.map((row: User) => (
          <tr
            key={row.id}
            className="text-[#797979] font-medium text-sm border-t border-[#EAEAEA]"
          >
            <td className="text-left text-base pl-10 py-2">
              <div>
                <Image
                  src={userIcon}
                  alt="Search Icon"
                  width={54}
                  height={54}
                />
              </div>
            </td>
            <TableCell>{row.name ?? "-"}</TableCell>
            <TableCell>No data</TableCell>
            <TableCell>
              {row.superAdmin ? "Administrador" : "Usuario"}
            </TableCell>
            <TableCell>{row.fIngreso ?? "-"}</TableCell>
            <TableCell>
              <ChipStatus status={row.state ?? "Activo"}>
                {row.state ?? "Activo"}
              </ChipStatus>
            </TableCell>
            <TableCell>
              <div>
                <div>{row.email}</div>
                <div>{row.phone}</div>
              </div>
            </TableCell>
            <td className="text-left text-base">
              <ActionButtons id={row.id} path="usuarios" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ActionTableComponent;
