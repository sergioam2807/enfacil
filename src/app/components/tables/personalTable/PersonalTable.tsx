import React from "react";
import userIcon from "../../../../../public/images/user.svg";
import Image from "next/image";
import ActionButtons from "../actionTable/ActionButtons";
import TableHead from "../../common/TableHead";
import TableCell from "../../common/TableCell";
import ChipStatus from "../../chip/ChipStatus";
import Link from "next/link";
import { Personnel } from "@/types/types";
import { formatDate } from "@/helpers/capitaliizeFirstLetter";

type userProps = {
  personalData: { data: Personnel[] } | Personnel[];
};

const PersonalTable = ({ personalData }: userProps) => {
  if (
    !personalData ||
    (Array.isArray(personalData) && personalData.length === 0)
  ) {
    return (
      <div className="w-full text-center py-10">
        <p className="text-xl text-custom-blue">No hay datos disponibles</p>
      </div>
    );
  }

  const data = Array.isArray(personalData)
    ? personalData
    : personalData?.data || [];

  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="text-[#0E436B] font-semibold text-sm">
          <th className="text-left pb-8 pt-5"></th>
          <TableHead>Nombre</TableHead>
          <TableHead>Proyecto asignado</TableHead>
          <TableHead>Cargo</TableHead>
          <TableHead>F.ingreso</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Contacto</TableHead>
          <TableHead>Acciones</TableHead>
        </tr>
      </thead>
      <tbody>
        {data?.map((row: Personnel) => (
          <tr
            key={row?.id}
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
            <TableCell clickable={true}>
              <Link href={`/personal/${row?.id}`}>{row?.name ?? "-"}</Link>
            </TableCell>
            <TableCell>No data</TableCell>
            <TableCell>{row?.specialty ?? "-"}</TableCell>
            <TableCell>{formatDate(row?.created) ?? "-"}</TableCell>
            <TableCell>
              <ChipStatus status={row?.state ?? "Activo"}>
                {row?.state ?? "Activo"}
              </ChipStatus>
            </TableCell>
            <TableCell>
              <div>
                <div>{row?.email}</div>
                <div>{row?.phone}</div>
              </div>
            </TableCell>
            <td className="text-left text-base">
              <ActionButtons
                id={row?.id}
                byIdURL={"/PersonnelApi/GetPersonnel"}
                deleteURL={"/PersonnelApi/DeletePersonnel"}
                type="personal"
                hasIdentifier
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PersonalTable;
