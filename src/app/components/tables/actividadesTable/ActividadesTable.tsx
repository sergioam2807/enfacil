import React from "react";
import TableHead from "../../common/TableHead";
import TableCell from "../../common/TableCell";
import OptionMenuButton from "../../buttons/OptionMenuButton";

interface Activity {
  id: string;
  activity: string;
  workPrice: string;
  materialPrice: string;
}

interface activityProps {
  activityData: Activity[];
}

const ActividadesTable = () => {
  const activityData: Activity[] = [
    {
      id: "1",
      activity: "Actividad 1",
      workPrice: "100",
      materialPrice: "200",
    },
    {
      id: "2",
      activity: "Actividad 2",
      workPrice: "300",
      materialPrice: "400",
    },
    {
      id: "3",
      activity: "Actividad 3",
      workPrice: "500",
      materialPrice: "600",
    },
  ];

  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="text-[#0E436B] font-semibold text-sm">
          <th className="text-left text-base pl-10 py-2">Actividad</th>
          <TableHead>Precio Mano obra Unitario</TableHead>
          <TableHead>Precio Material Unitario</TableHead>
        </tr>
      </thead>
      <tbody>
        {activityData.map((row: Activity) => (
          <tr
            key={row.id}
            className="text-[#797979] font-medium text-sm border-t border-[#EAEAEA]"
          >
            <td className="text-left text-base pl-10 py-2">
              {row.activity ?? "-"}
            </td>

            <TableCell>{row.workPrice ?? "-"}</TableCell>
            <TableCell>{row.materialPrice ?? "-"}</TableCell>
            <td className="text-left text-base">
              <OptionMenuButton />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ActividadesTable;
