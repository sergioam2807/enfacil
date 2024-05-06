"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import TableHead from "../../common/TableHead";
import TableCell from "../../common/TableCell";
import { formatPrice } from "@/helpers/capitaliizeFirstLetter";

interface Cotizacion {
  id: string;
  title: string;
  activityOne: string;
  workUnit: string;
  unityCount: number;
  manPowerTotal: number;
  materialsTotal: number;
  manPowerTotalxUnitsCount: number;
  materialsTotalxUnitsCount: number;
  margin: number;
  totalActivity: number;
}

interface cotizacionProps {
  materialData: Cotizacion[];
  onTotalChange: (totals: {
    materials: number;
    manPower: number;
    generalExpenses: number;
    finalTotal: number;
  }) => void;
}

const TableCotizacionActual = ({ cotizacionData, onTotalChange }: any) => {
  const [enclosureAdded, setEnclosureAdded] = useState<Cotizacion[]>(
    cotizacionData || []
  );

  useEffect(() => {
    setEnclosureAdded((prevState) => {
      const newItems =
        cotizacionData?.filter(
          (dataItem: Cotizacion) =>
            !prevState.some(
              (prevStateItem: Cotizacion) => prevStateItem?.id === dataItem?.id
            )
        ) || [];
      return [...prevState, ...newItems];
    });
  }, [cotizacionData]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const newValue = Number(event.target.value);
    setEnclosureAdded((prevState) =>
      prevState.map((item) =>
        item?.id === id ? { ...item, unityCount: newValue } : item
      )
    );
  };

  const handleMarginChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const newValue = Number(event.target.value);
    setEnclosureAdded((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, margin: newValue } : item
      )
    );
  };

  const calculateTotals = (enclosureData: Cotizacion[]) => {
    const materialsTotal = enclosureData.reduce(
      (total, item) => total + item.materialsTotal * item.unityCount,
      0
    );
    const manPowerTotal = enclosureData.reduce(
      (total, item) => total + item.manPowerTotal * item.unityCount,
      0
    );
    const generalExpenses = materialsTotal + manPowerTotal;
    // const finalTotal = enclosureData.reduce(
    //   (total, item) =>
    //     total +
    //     (item.materialsTotal * item.unityCount +
    //       item.manPowerTotal * item.unityCount) *
    //       (1 + item.margin / 100),
    //   0
    // );
    const finalTotal = materialsTotal + manPowerTotal;

    return {
      materials: materialsTotal,
      manPower: manPowerTotal,
      generalExpenses,
      finalTotal,
    };
  };

  const totals = useMemo(
    () => calculateTotals(enclosureAdded),
    [enclosureAdded]
  );

  const prevTotalsRef = useRef(totals);

  useEffect(() => {
    if (JSON.stringify(prevTotalsRef.current) !== JSON.stringify(totals)) {
      onTotalChange(totals);
      prevTotalsRef.current = totals;
    }
  }, [totals, onTotalChange]);

  //save data quote
  const selectedClientId = localStorage.getItem("selectedClientId");
  const selectedClientName = localStorage.getItem("selectedClientName");

  const combinedData = {
    enclosures: enclosureAdded,
    totals: totals,
    clientId: selectedClientId,
    clientName: selectedClientName,
  };

  localStorage.setItem("quoteData", JSON.stringify(combinedData));

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
        {enclosureAdded?.map((row: Cotizacion) => (
          <tr
            key={row?.id}
            className="text-[#797979] font-medium text-sm border-t border-[#EAEAEA]"
          >
            <td className="text-left pb-8 pt-7 pl-10">{row.title ?? "-"}</td>
            <TableCell>{row.activityOne ?? "-"}</TableCell>
            <TableCell>{row.workUnit ?? "-"}</TableCell>
            <TableCell>
              <input
                type="text"
                value={row.unityCount || 0}
                onChange={(e) => handleInputChange(e, row.id)}
                className="border rounded w-1/2 py-2 px-3 text-grey-darker"
              />
            </TableCell>
            <TableCell>{formatPrice(row.manPowerTotal) ?? "-"}</TableCell>
            <TableCell>{formatPrice(row.materialsTotal) ?? "-"}</TableCell>
            <TableCell>
              {formatPrice(row.manPowerTotal * Number(row.unityCount)) || "-"}
            </TableCell>
            <TableCell>
              {formatPrice(row.materialsTotal * Number(row.unityCount)) || "-"}
            </TableCell>
            <TableCell>
              %
              <input
                type="text"
                value={row.margin | 0}
                onChange={(e) => handleMarginChange(e, row.id)}
                className="border rounded w-1/2 py-2 px-3 text-grey-darker"
              />
            </TableCell>
            <TableCell>
              {formatPrice(
                (row.manPowerTotal * Number(row.unityCount) +
                  row.materialsTotal * Number(row.unityCount)) *
                  (1 + row.margin / 100)
              ) || "-"}
            </TableCell>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableCotizacionActual;
