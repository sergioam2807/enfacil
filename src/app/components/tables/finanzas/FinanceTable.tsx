import React from "react";
import userIcon from "../../../../../public/images/user.svg";
import Image from "next/image";
import TableHead from "../../common/TableHead";
import TableCell from "../../common/TableCell";
import ChipStatus from "../../chip/ChipStatus";
import Link from "next/link";
import ActionButtons from "../actionTable/ActionButtons";
import { formatDate, formatTaxId } from "@/helpers/capitaliizeFirstLetter";

const FinanceTable = () => {
  const dummyData = [
    {
      id: 1,
      cliente: "Cliente 1",
      proyecto: "Proyecto 1",
      fecha: new Date(),
      banco: "Banco 1",
      tipo: "Tipo 1",
      descripcion: "Descripción 1",
      monto: 1000,
    },
    {
      id: 2,
      cliente: "Cliente 2",
      proyecto: "Proyecto 2",
      fecha: new Date(),
      banco: "Banco 2",
      tipo: "Tipo 2",
      descripcion: "Descripción 2",
      monto: 2000,
    },
    // Agrega más objetos aquí para más filas en la tabla
  ];

  return (
    <table className="w-full table-auto ml-6">
      <thead>
        <tr className="text-[#0E436B] font-semibold text-sm">
          <TableHead>Cliente</TableHead>
          <TableHead>Proyecto</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Banco</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Descripcion</TableHead>
          <TableHead>Monto</TableHead>
        </tr>
      </thead>
      <tbody>
        {dummyData.map((row) => (
          <tr
            key={row.id}
            className="text-[#797979] font-medium text-sm border-t border-[#EAEAEA]"
          >
            <TableCell>{row.cliente}</TableCell>
            <TableCell>{row.proyecto}</TableCell>
            <TableCell>{row.banco}</TableCell>
            <TableCell>{row.banco}</TableCell>
            <TableCell>{row.tipo}</TableCell>
            <TableCell>{row.descripcion}</TableCell>
            <TableCell>{row.monto}</TableCell>
            <td className="text-left text-base">
              <ActionButtons
                id={row.id}
                byIdURL={"/ClientApi/GetClients"}
                deleteURL={"/ClientApi/DeleteClient"}
                type="clientes"
                hasIdentifier
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FinanceTable;
