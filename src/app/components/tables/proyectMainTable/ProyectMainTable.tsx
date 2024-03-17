import React from "react";
import TableHead from "../../common/TableHead";
import TableCell from "../../common/TableCell";
import ChipStatus from "../../chip/ChipStatus";

import OptionMenuButton from "../../buttons/OptionMenuButton";

interface Proyect {
  id: string;
  proyect: string;
  client: string;
  startDate: string;
  finishDate: string;
  state: string;
  advance: string;
}

interface proyectProps {
  proyectData: Proyect[];
}

const ProyectMainTable = () => {
  const proyectData: Proyect[] = [
    {
      id: "1",
      proyect: "Proyecto 1",
      client: "Cliente 1",
      startDate: "2022-01-01",
      finishDate: "2022-12-31",
      state: "Activo",
      advance: "50",
    },
  ];
  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="text-[#0E436B] font-semibold text-sm">
          <th className="text-left pb-8 pt-5 pl-10">Proyecto</th>
          <TableHead>Cliente</TableHead>
          <TableHead>F.contractual inicio</TableHead>
          <TableHead>F.contractual término</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Acciones</TableHead>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {proyectData?.map((row: Proyect) => (
          <tr
            key={row?.id}
            className="text-[#797979] font-medium text-sm border-t border-[#EAEAEA]"
          >
            <td className="text-left pb-8 pt-5 pl-10">Proyecto</td>

            <TableCell>{row.proyect ?? "-"}</TableCell>
            <TableCell>{row.client ?? "-"}</TableCell>
            <TableCell>{row.startDate ?? "-"}</TableCell>
            <TableCell>{row.finishDate ?? "-"}</TableCell>
            <TableCell>
              <ChipStatus status={row.state ?? "Activo"}>
                {row.state ?? "Activo"}
              </ChipStatus>
            </TableCell>
            <TableCell>
              <span className="text-sm">
                {typeof row.advance === "number"
                  ? `${row.advance}%`
                  : `${row.advance}%`}
              </span>
            </TableCell>
            <td className="text-left text-base">
              <OptionMenuButton />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProyectMainTable;
