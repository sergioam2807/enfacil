import React from "react";
import TableHead from "../../common/TableHead";
import TableCell from "../../common/TableCell";

interface Proyect {
  id: string;
  activity: string;
  progress: string;
  manager: string;
}
const ProyectModalTable = () => {
  const proyectData: Proyect[] = [
    {
      id: "1",
      activity: "Actividad 1",
      progress: "50",
      manager: "Encargado 1",
    },
    {
      id: "2",
      activity: "Actividad 2",
      progress: "30",
      manager: "Encargado 2",
    },
    {
      id: "3",
      activity: "Actividad 3",
      progress: "80",
      manager: "Encargado 3",
    },
    {
      id: "3",
      activity: "Actividad 3",
      progress: "80",
      manager: "Encargado 3",
    },
    {
      id: "3",
      activity: "Actividad 3",
      progress: "80",
      manager: "Encargado 3",
    },
    {
      id: "3",
      activity: "Actividad 3",
      progress: "80",
      manager: "Encargado 3",
    },

    // Agrega más objetos de proyecto según sea necesario
  ];

  // ...
  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="text-[#0E436B] font-semibold text-sm">
          <th className="text-left pb-8 pt-5 pl-10">Actividad</th>
          <TableHead>Avance</TableHead>
          <TableHead>Encargado</TableHead>

          <th></th>
        </tr>
      </thead>
      <tbody>
        {proyectData?.map((row: Proyect) => (
          <tr
            key={row?.id}
            className="text-[#797979] font-medium text-sm border-t border-[#EAEAEA]"
          >
            <td className="text-left pb-8 pt-5 pl-10">{row.activity ?? "-"}</td>

            <TableCell>
              <span className="text-sm">
                {typeof row.progress === "number"
                  ? `${row.progress}%`
                  : `${row.progress}%`}
              </span>
            </TableCell>

            <TableCell>{row.manager ?? "-"}</TableCell>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProyectModalTable;
