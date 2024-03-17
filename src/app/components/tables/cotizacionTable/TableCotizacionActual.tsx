import React from "react";
import TableHead from "../../common/TableHead";
import TableCell from "../../common/TableCell";
import OptionMenuMaterialsButton from "../../buttons/OptionMenuMaterialsButton";

interface Cotizacion {
  id: string;
  recinto: string;
  actividad: string;
  workUnit: string;
  unityCount: string;
  countWorkHand: number;
  materialsUnit: number;
  workTotal: number;
  materialsTotal: number;
  margin: number;
  totalActivity: number;
}

interface cotizacionProps {
  materialData: Cotizacion[];
}

const TableCotizacionActual = () => {
  const cotizacionData: Cotizacion[] = [
    {
      id: "1",
      recinto: "Recinto 1",
      actividad: "Actividad 1",
      workUnit: "M2",
      unityCount: "5",
      countWorkHand: 20,
      materialsUnit: 30,
      workTotal: 40,
      materialsTotal: 50,
      margin: 60,
      totalActivity: 70,
    },
    {
      id: "2",
      recinto: "Recinto 2",
      actividad: "Actividad 2",
      workUnit: "M2",
      unityCount: "10",
      countWorkHand: 25,
      materialsUnit: 35,
      workTotal: 45,
      materialsTotal: 55,
      margin: 65,
      totalActivity: 75,
    },
    // Agrega más datos aquí si es necesario
  ];
  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="text-[#0E436B] font-semibold text-sm">
          <th className="text-left pb-8 pt-5 pl-10">Recinto</th>
          <TableHead>Actividad</TableHead>
          <TableHead>Unidad de trabajo</TableHead>
          <TableHead>Cantidad unidades</TableHead>
          <TableHead>P.mano de obra unitario</TableHead>
          <TableHead>P.materiales unitario</TableHead>
          <TableHead>Total mano de obra</TableHead>
          <TableHead>Total materiales</TableHead>
          <TableHead>Margen</TableHead>
          <TableHead>Total Actividad</TableHead>
        </tr>
      </thead>
      <tbody>
        {cotizacionData?.map((row: Cotizacion) => (
          <tr
            key={row?.id}
            className="text-[#797979] font-medium text-sm border-t border-[#EAEAEA]"
          >
            <td className="text-left pb-8 pt-7 pl-10">{row.recinto ?? "-"}</td>
            <TableCell>{row.actividad ?? "-"}</TableCell>
            <TableCell>{row.workUnit ?? "-"}</TableCell>
            <TableCell>{row.unityCount ?? "-"}</TableCell>
            <TableCell>${row.countWorkHand ?? "-"}</TableCell>
            <TableCell>${row.materialsUnit ?? "-"}</TableCell>
            <TableCell>${row.workTotal ?? "-"}</TableCell>
            <TableCell>${row.materialsTotal ?? "-"}</TableCell>
            <TableCell>{row.margin ?? "-"}%</TableCell>
            <TableCell>${row.totalActivity ?? "-"}</TableCell>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableCotizacionActual;
