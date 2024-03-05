import React from "react";
import ChipStatus from "../chip/ChipStatus";
import userIcon from "../../../public/images/user.svg";

import Image from "next/image";
import ActionButtons from "./ActionButtons";
const TableHead = ({ children }: { children: React.ReactNode }) => (
  <th className="text-left pb-8 pt-5">{children}</th>
);
const TableCell = ({ children }: { children: React.ReactNode }) => (
  <td className="text-left text-base">
    {Array.isArray(children) && typeof children[0] === "object"
      ? children.map(
          (contact: { telefono: string; email: string }, i: number) => (
            <div key={i}>
              <div>{contact.telefono}</div>
              <div>{contact.email}</div>
            </div>
          )
        )
      : children}
  </td>
);

const ActionTableComponent = () => {
  const data = [
    {
      id: "1",
      nombre: "Jose Retamal",
      cargo: "Analista",
      tipoDeUsuario: "Super Administrador",
      fIngreso: "05 Feb 2023",
      estado: "Activo",
      contacto: [
        { telefono: "+56 9 835158574", email: "jose@EICingenieria.cl" },
      ],
    },
    ...Array(19)
      .fill(null)
      .map((_, index) => ({
        id: index + 1,
        nombre: "Dummy User",
        cargo: "Analista",
        tipoDeUsuario: "Super Admintrador",
        fIngreso: "05 Feb 2023",
        estado: "Activo",
        contacto: [
          { telefono: "+56 9 123456789", email: "dummy@EICingenieria.cl" },
        ],
      })),
  ];

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
        {data.map((row, index) => (
          <tr
            key={index}
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
            <TableCell>{row.nombre}</TableCell>
            <TableCell>{row.cargo}</TableCell>
            <TableCell>{row.tipoDeUsuario}</TableCell>
            <TableCell>{row.fIngreso}</TableCell>
            <TableCell>
              <ChipStatus status={row.estado}>{row.estado}</ChipStatus>
            </TableCell>
            <TableCell>{row.contacto}</TableCell>
            <td className="text-left text-base">
              <ActionButtons id={row.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ActionTableComponent;
