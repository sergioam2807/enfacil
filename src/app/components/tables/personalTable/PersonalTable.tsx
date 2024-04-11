import React from "react";
import userIcon from "../../../../../public/images/user.svg";
import Image from "next/image";
import ActionButtons from "../actionTable/ActionButtons";
import TableHead from "../../common/TableHead";
import TableCell from "../../common/TableCell";
import ChipStatus from "../../chip/ChipStatus";
import Link from "next/link";

interface Personal {
  id: string;
  name: string;
  cargo: string;
  specialty: string;
  fIngreso: string;
  state: string;
  phone: string;
  email: string;
}

interface userProps {
  personalData?: Personal[];
}

interface personalDataProps {
  name: string;
  superAdmin: boolean;
  fIngreso: string | null;
  estado: string | null;
  email: string;
  phone: string;
  id: number;
}

const PersonalTable = ({ personalData }: userProps) => {
  const dummyData: Personal[] = [
    {
      id: "1",
      name: "John Doe",
      cargo: "Developer",
      specialty: "Frontend",
      fIngreso: "2022-01-01",
      state: "Active",
      phone: "123-456-7890",
      email: "john.doe@example.com",
    },
    {
      id: "2",
      name: "Jane Smith",
      cargo: "Designer",
      specialty: "UI/UX",
      fIngreso: "2022-02-01",
      state: "Inactive",
      phone: "098-765-4321",
      email: "jane.smith@example.com",
    },
    // Add more data as needed
  ];
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
        {dummyData.map((row: Personal) => (
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
            <TableCell clickable={true}>
              <Link href={`/personal/${row.id}`}>{row.name ?? "-"}</Link>
            </TableCell>
            <TableCell>No data</TableCell>
            <TableCell>{row.specialty ?? "-"}</TableCell>
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
              <ActionButtons
                id={row.id}
                byIdURL={"/PersonnelApi/GetPersonnel"}
                deleteURL={"/PersonnelApi/DeletePersonnel"}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PersonalTable;
