import React from "react";
import TableHead from "../../common/TableHead";
import TableCell from "../../common/TableCell";
import OptionMenuMaterialsButton from "../../buttons/OptionMenuMaterialsButton";
import { formatDate, formatPrice } from "@/helpers/capitaliizeFirstLetter";
import { Activity, Quote } from "@/types/types";

interface quoteProps {
  quoteData: { data: Quote[] } | Quote[];
}

export type MappedQuote = {
  id: number | null;
  projectName: string;
  clientName: string;
  quote_date: string | undefined;
  totalManPowerUnitPricing: number | string;
  totalMaterialsPricing: number | string;
  finalPrice: number | string;
};

const QuoteTable = ({ quoteData }: quoteProps) => {
  if (!quoteData || (Array.isArray(quoteData) && quoteData.length === 0)) {
    return (
      <div className="w-full text-center py-10">
        <p className="text-xl text-custom-blue">No hay datos disponibles</p>
      </div>
    );
  }

  const data = Array.isArray(quoteData) ? quoteData : quoteData?.data || [];

  console.log("data whit totals", data);

  const mappedData = data.map((item) => ({
    id: item.id,
    projectName: item.title,
    clientName: item.client?.name,
    quote_date: item.client?.created,
    totalManPowerUnitPricing: item.totalMPUnitPrice,
    totalMaterialsPricing: item.totalMaterialsUnitPrice,
    finalPrice: item.totalMargin,
  }));

  console.log("mappedData", mappedData);

  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="text-[#0E436B] font-semibold text-sm">
          <th className="text-left text-base pl-10 py-2">Proyecto</th>
          <th className="text-left text-base pl-10 py-2">Cliente</th>
          <TableHead>F.cotización</TableHead>
          <TableHead>Total mano de obra</TableHead>
          <TableHead>Total materiales</TableHead>
          <TableHead>Total final</TableHead>
        </tr>
      </thead>
      <tbody>
        {mappedData.map((row: MappedQuote) => (
          <tr
            key={row.id}
            className="text-[#797979] font-medium text-sm border-t border-[#EAEAEA]"
          >
            <td className="text-left text-base pl-10 py-2">
              {row.projectName ?? "-"}
            </td>
            <td className="text-left text-base pl-10 py-2">
              {row.clientName ?? "-"}
            </td>
            <TableCell>{formatDate(row.quote_date ?? "") ?? "-"}</TableCell>

            <TableCell>
              {formatPrice(Number(row.totalManPowerUnitPricing)) ?? "-"}
            </TableCell>
            <TableCell>
              {formatPrice(Number(row.totalMaterialsPricing)) ?? "-"}
            </TableCell>
            <TableCell>{formatPrice(Number(row.finalPrice)) ?? "-"}</TableCell>
            <td className="text-left text-base">
              {/* <OptionMenuMaterialsButton
                id={row.id?.toString() ?? ""}
                byIdURL={"/ActivityApi/GetActivities"}
                deleteURL={"/ActivityApi/DeleteActivity"}
                type="actividades"
              /> */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default QuoteTable;
