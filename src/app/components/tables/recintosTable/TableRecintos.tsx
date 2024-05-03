"use client";
import React from "react";
import { useRouter } from "next/navigation";
import TableHead from "../../common/TableHead";
import TableCell from "../../common/TableCell";
import {
  capitalizeFirstLetter,
  formatPrice,
} from "@/helpers/capitaliizeFirstLetter";
import { deleteEnclosureData } from "@/app/api/data";
import Image from "next/image";
import trash from "../../../../../public/images/trash.svg";

interface Recinto {
  id: string;
  title: string;
  activityMPUnitPrice: number;
  pricingPerSinglePurchase: number;
  activityMaterialsUnitPrice: number;
  activityUnits: number;
  activitiesInEnclosure: Array<string>;
}

type recintoProps = {
  recintoData: { data: Recinto[] | Recinto[] };
};

const TableRecinto = ({ recintoData: recintoData }: recintoProps) => {
  const router = useRouter();
  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        await deleteEnclosureData(token, id);
      } catch (error) {
        console.error(error);
      }
    }
    router.refresh();
  };

  if (
    !recintoData ||
    (Array.isArray(recintoData) && recintoData.length === 0)
  ) {
    return (
      <div className="w-full text-center py-10">
        <p className="text-xl text-custom-blue">No hay datos disponibles</p>
      </div>
    );
  }

  const data = Array.isArray(recintoData)
    ? recintoData
    : recintoData?.data || [];

  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="text-[#0E436B] font-semibold text-sm">
          <th className="text-left pb-8 pt-5 pl-10">Recinto</th>
          <TableHead>Cantidad Actividades</TableHead>
          <TableHead>Actividad 1</TableHead>
          <TableHead>Actividad 2</TableHead>
          <TableHead>Actividad 3</TableHead>
          <TableHead>P.mano obra unitario</TableHead>
          <TableHead>P.materiales unitario </TableHead>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((row: Recinto, index) => (
          <tr
            key={row?.id ? row.id + index : index}
            className="text-[#797979] font-medium text-sm border-t border-[#EAEAEA]"
          >
            <td className="text-left pb-8 pt-5 pl-10">
              {capitalizeFirstLetter(row.title) ?? "-"}
            </td>

            <TableCell>{row.activityUnits ?? "-"}</TableCell>
            <TableCell>{row.activitiesInEnclosure[0] ?? "-"}</TableCell>
            <TableCell>{row.activitiesInEnclosure[1] ?? "-"}</TableCell>
            <TableCell>{row.activitiesInEnclosure[2] ?? "-"}</TableCell>
            <TableCell>{formatPrice(row.activityMPUnitPrice) ?? "-"}</TableCell>
            <TableCell>
              {formatPrice(row.activityMaterialsUnitPrice) ?? "-"}
            </TableCell>
            <td className="text-left text-base">
              <button onClick={() => handleDelete(row.id)}>
                <Image src={trash} alt="Delete Icon" width={20} height={20} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableRecinto;
