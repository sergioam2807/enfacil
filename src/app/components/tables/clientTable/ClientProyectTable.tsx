import React from "react";
import TableHead from "../../common/TableHead";
import TableCell from "../../common/TableCell";
import ChipStatus from "../../chip/ChipStatus";
import AdvanceBar from "../table/AdvanceBar";

interface Proyect {
  id: string;
  proyect: string;
  type: string;
  fIngreso: string;
  fTermino: string;
  state: string;
  advance: string;
}

interface proyectProps {
  proyectData: Proyect[];
}

const ClientProyectTable = async ({ proyectData }: proyectProps) => {
  // const proyectData = await getProyectsData();

  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="text-[#0E436B] font-semibold text-sm">
          <th className="text-left pb-8 pt-5 pl-10">Proyecto</th>
          <TableHead>Tipo</TableHead>
          <TableHead>F.inicio Proyecto</TableHead>
          <TableHead>F.término Proyecto</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Avance</TableHead>
          <th className="w-1/8 text-leftright p-4"></th>
        </tr>
      </thead>
      <tbody>
        {proyectData?.map((row: Proyect) => (
          <tr
            key={row?.id}
            className="text-[#797979] font-medium text-sm border-t border-[#EAEAEA]"
          >
            <td className="text-left text-base pl-10 py-2">
              {row.proyect ?? "-"}
            </td>
            <TableCell>{row.type ?? "-"}</TableCell>
            <TableCell>{row.fIngreso ?? "-"}</TableCell>
            <TableCell>{row.fTermino ?? "-"}</TableCell>
            <TableCell>
              <ChipStatus status={row.state ?? "Activo"}>
                {row.state ?? "Activo"}
              </ChipStatus>
            </TableCell>
            <TableCell>
              <AdvanceBar avance={row.advance} />
            </TableCell>
            <td className="w-1/6 p-4">
              <button className="px-4 py-2 text-[#097AFF] underline font-normal rounded">
                Ver Detalles
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClientProyectTable;
