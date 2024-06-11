"use client";
import React from "react";
import TableHead from "../../common/TableHead";
import TableCell from "../../common/TableCell";
import { formatPrice } from "@/helpers/capitaliizeFirstLetter";
import { Enclosure } from "@/app/(principal)/cotizaciones/[id]/page";

const TableCotizacionDetalle = ({ quoteFinalData }: any) => {
  console.log("quoteFinalData desde la tabla", quoteFinalData);

  return (
    <table className="w-full table-auto ">
      <thead>
        <tr className="text-[#0E436B] font-semibold text-sm">
          <th className="text-left pb-8 pt-5 pl-10">Recinto</th>
          <TableHead>Actividad Principal</TableHead>
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
        {quoteFinalData?.map((row: Enclosure) => (
          <tr
            key={row?.id}
            className="text-[#797979] font-medium text-sm border-t border-[#EAEAEA]"
          >
            <td className="text-left pb-8 pt-7 pl-10">{row?.title ?? "-"}</td>
            <TableCell>{row?.activityOne ?? "-"}</TableCell>
            <TableCell>{row?.workUnit ?? "-"}</TableCell>
            <TableCell>{row?.unityCount ?? "-"}</TableCell>
            <TableCell>{formatPrice(row?.manPowerTotal) ?? "-"}</TableCell>
            <TableCell>{formatPrice(row.materialsTotal) ?? "-"}</TableCell>
            <TableCell>
              {formatPrice(row?.manPowerTotal * Number(row?.unityCount)) || "-"}
            </TableCell>
            <TableCell>
              {formatPrice(row?.materialsTotal * Number(row?.unityCount)) ||
                "-"}
            </TableCell>
            <TableCell>%{row?.margin ?? "-"}</TableCell>
            <TableCell>
              {formatPrice(
                (row?.manPowerTotal * Number(row?.unityCount) +
                  row?.materialsTotal * Number(row?.unityCount)) *
                  (1 + row?.margin / 100)
              ) || "-"}
            </TableCell>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableCotizacionDetalle;
