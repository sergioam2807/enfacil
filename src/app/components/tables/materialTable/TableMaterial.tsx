import React from "react";
import TableHead from "../../common/TableHead";
import TableCell from "../../common/TableCell";
import OptionMenuMaterialsButton from "../../buttons/OptionMenuMaterialsButton";

interface Material {
  id: string;
  material: string;
  Activity: string;
  amount: number;
  mesoureU: string;
  priceU: number;
  totalPrice: number;
}

interface materialProps {
  materialData: Material[];
}

const TableMaterial = () => {
  const materialData: Material[] = [
    {
      id: "1",
      material: "Material 1",
      Activity: "Actividad 1",
      amount: 10,
      mesoureU: "kg",
      priceU: 100,
      totalPrice: 1000,
    },
    {
      id: "2",
      material: "Material 2",
      Activity: "Actividad 2",
      amount: 20,
      mesoureU: "kg",
      priceU: 200,
      totalPrice: 4000,
    },
    {
      id: "3",
      material: "Material 3",
      Activity: "Actividad 3",
      amount: 30,
      mesoureU: "kg",
      priceU: 300,
      totalPrice: 9000,
    },
    // Agrega más objetos de material según sea necesario
  ];
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
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {materialData?.map((row: Material) => (
          <tr
            key={row?.id}
            className="text-[#797979] font-medium text-sm border-t border-[#EAEAEA]"
          >
            <td className="text-left pb-8 pt-5 pl-10">{row.material ?? "-"}</td>

            <TableCell>{row.Activity ?? "-"}</TableCell>
            <TableCell>{row.amount ?? "-"}</TableCell>
            <TableCell>{row.mesoureU ?? "-"}</TableCell>
            <TableCell>{row.priceU ?? "-"}</TableCell>
            <TableCell>{row.totalPrice ?? "-"}</TableCell>
            <td className="text-left text-base">
              <OptionMenuMaterialsButton />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableMaterial;
