import React from "react";
import TableHead from "../../common/TableHead";
import TableCell from "../../common/TableCell";
import OptionMenuMaterialsButton from "../../buttons/OptionMenuMaterialsButton";
import {
  capitalizeFirstLetter,
  formatPrice,
} from "@/helpers/capitaliizeFirstLetter";

interface Material {
  id: string;
  name: string;
  Activity: string;
  pricingPerSinglePurchase: number;
  metricUnit: string;
  unitsPerSinglePurchase: number;
  providerName: string;
}

interface materialProps {
  materialData: Material[];
}

const TableMaterial = ({ materialData }: materialProps) => {
  if (!materialData || materialData.length === 0) {
    return (
      <div className="w-full text-center py-10">
        <p className="text-xl text-custom-blue">No hay datos disponibles</p>
      </div>
    );
  }
  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="text-[#0E436B] font-semibold text-sm">
          <th className="text-left pb-8 pt-5 pl-10">Material</th>
          <TableHead>Actividad</TableHead>
          <TableHead>Cantidad</TableHead>
          <TableHead>U.Medida</TableHead>
          <TableHead>Precio U.Neto</TableHead>
          <TableHead>Precio Total Neto</TableHead>
          <TableHead>Proveedor</TableHead>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {materialData?.map((row: Material) => (
          <tr
            key={row?.id}
            className="text-[#797979] font-medium text-sm border-t border-[#EAEAEA]"
          >
            <td className="text-left pb-8 pt-5 pl-10">
              {capitalizeFirstLetter(row.name) ?? "-"}
            </td>

            <TableCell>{row.Activity ?? "-"}</TableCell>
            <TableCell>{row.unitsPerSinglePurchase ?? "-"}</TableCell>
            <TableCell>{row.metricUnit ?? "-"}</TableCell>
            <TableCell>
              {formatPrice(Number(row.pricingPerSinglePurchase)) ?? "-"}
            </TableCell>
            <TableCell>
              {formatPrice(
                Number(
                  row.pricingPerSinglePurchase * row.unitsPerSinglePurchase
                )
              ) ?? "-"}
            </TableCell>
            <TableCell>
              {capitalizeFirstLetter(row.providerName) ?? "-"}
            </TableCell>
            <td className="text-left text-base">
              <OptionMenuMaterialsButton
                id={row.id}
                byIdURL={"/MaterialApi/GetMaterials"}
                deleteURL={"/MaterialApi/DeleteMaterial"}
                type={"materiales"}
                details
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableMaterial;
