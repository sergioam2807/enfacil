import React from "react";
import userIcon from "../../../../../public/images/user.svg";
import Image from "next/image";
// import ActionButtons from "../actionTable/ActionButtons";
import TableHead from "../../common/TableHead";
import TableCell from "../../common/TableCell";
import ChipStatus from "../../chip/ChipStatus";
import Link from "next/link";
import ActionButtons from "../actionTable/ActionButtons";

interface Client {
  id: string;
  name: string;
  address: string;
  taxId: string;
  fcreacion: string;
  state: string;
  phone: string;
  email: string;
}

interface clientProps {
  clientData: { data: Client[] } | Client[];
}

const ClientTable = ({ clientData }: clientProps) => {
  if (!clientData || (Array.isArray(clientData) && clientData.length === 0)) {
    return (
      <div className="w-full text-center py-10">
        <p className="text-xl text-custom-blue">No hay datos disponibles</p>
      </div>
    );
  }

  const data = Array.isArray(clientData) ? clientData : clientData?.data || [];

  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="text-[#0E436B] font-semibold text-sm">
          <th className="text-left pb-8 pt-5"></th>
          <TableHead>Cliente</TableHead>
          <TableHead>Rut</TableHead>
          <TableHead>F.Creación</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Contacto</TableHead>
          <TableHead>Acciones</TableHead>
        </tr>
      </thead>
      <tbody>
        {data.map((row: Client) => (
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
            <TableCell clickable>
              <div>
                <Link href={`/clientes/${row.id}`}>
                  <div>{row.name ?? "-"}</div>
                  <div>{row.address ?? "-"}</div>
                </Link>
              </div>
            </TableCell>
            <TableCell>{row.taxId}</TableCell>
            <TableCell>{row.fcreacion ?? "-"}</TableCell>
            <TableCell>
              <ChipStatus status={row.state ?? "Activo"}>
                {row.state ?? "Activo"}
              </ChipStatus>
            </TableCell>
            {/* <TableCell>{row.specialty ?? "-"}</TableCell> */}
            <TableCell>
              <div>
                <div>{row.email}</div>
                <div>{row.phone}</div>
              </div>
            </TableCell>
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

export default ClientTable;
