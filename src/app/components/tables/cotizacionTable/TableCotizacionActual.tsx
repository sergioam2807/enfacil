'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import TableHead from '../../common/TableHead';
import TableCell from '../../common/TableCell';
import { formatPrice } from '@/helpers/capitaliizeFirstLetter';
import { useEnclosureAdded, useQuotePostData } from '@/store/store';

export interface Cotizacion {
  id: string;
  title: string;
  activityOne: string;
  metricUnit: string;
  unityCount: number;
  manPowerTotal: number;
  materialsTotal: number;
  manPowerTotalxUnitsCount: number;
  materialsTotalxUnitsCount: number;
  margin: number;
  totalActivity: number;
}

const TableCotizacionActual = ({ onTotalChange }: any) => {
  const { combinedData } = useEnclosureAdded();
  const [enclosureAdded, setEnclosureAdded] = useState<Cotizacion[]>(
    combinedData || []
  );
  const { setEnclosureQuotePost } = useQuotePostData();

  console.log('combinedData', combinedData);

  useEffect(() => {
    const newItems =
      combinedData?.filter(
        (dataItem: Cotizacion) =>
          !enclosureAdded.some(
            (prevStateItem: Cotizacion) => prevStateItem?.id === dataItem?.id
          )
      ) || [];

    const deletedItems =
      enclosureAdded?.filter(
        (prevStateItem: Cotizacion) =>
          !combinedData.some(
            (dataItem: Cotizacion) => dataItem?.id === prevStateItem?.id
          )
      ) || [];

    if (newItems.length > 0 || deletedItems.length > 0) {
      const updatedState = [...enclosureAdded, ...newItems].filter(
        (item: Cotizacion) =>
          !deletedItems.some((deletedItem) => deletedItem.id === item.id)
      );
      setEnclosureQuotePost(updatedState);
      setEnclosureAdded(updatedState);
    }
  }, [combinedData]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const newValue = Number(event.target.value);
    setEnclosureAdded((prevState) => {
      const updatedState = prevState.map((item) =>
        item?.id === id ? { ...item, unityCount: newValue } : item
      );
      setEnclosureQuotePost(updatedState);
      return updatedState;
    });
  };

  useEffect(() => {
    setEnclosureQuotePost(enclosureAdded);
  }, [enclosureAdded]);

  const handleMarginChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const newValue = Number(event.target.value);
    setEnclosureAdded((prevState) => {
      const updatedState = prevState.map((item) =>
        item.id === id ? { ...item, margin: newValue } : item
      );
      setEnclosureQuotePost(updatedState);
      return updatedState;
    });
  };

  const calculateTotals = (enclosureData: Cotizacion[]) => {
    const materialsTotal = enclosureData.reduce(
      (total, item) =>
        total + item.materialsTotal * item.unityCount * (1 + item.margin / 100),
      0
    );
    const manPowerTotal = enclosureData.reduce(
      (total, item) =>
        total + item.manPowerTotal * item.unityCount * (1 + item.margin / 100),
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
  let selectedClientId;
  let selectedClientName;

  if (typeof window !== 'undefined') {
    selectedClientId = localStorage.getItem('selectedClientId');
    selectedClientName = localStorage.getItem('selectedClientName');

    const combinedData = {
      enclosures: enclosureAdded,
      totals: totals,
      clientId: selectedClientId,
      clientName: selectedClientName,
    };

    localStorage.setItem('quoteData', JSON.stringify(combinedData));
  }

  // const handleDelete = (id: string) => {
  //   deleteEnclosure(id);
  // };

  return (
    <table className='w-full table-auto '>
      <thead>
        <tr className='text-[#0E436B] font-semibold text-sm'>
          <th className='text-left pb-8 pt-5 pl-10'>Recinto</th>
          <TableHead>Actividad Principal</TableHead>
          <TableHead>Unidad de trabajo</TableHead>
          <TableHead>Cantidad unidades</TableHead>
          <TableHead>P.mano de obra unitario</TableHead>
          <TableHead>P.materiales unitario</TableHead>
          <TableHead>Total mano de obra</TableHead>
          <TableHead>Total materiales</TableHead>
          <TableHead>Margen</TableHead>
          <TableHead>Total Actividad</TableHead>
          {/* <th className='text-left pb-8 pt-5 pl-10'></th> */}
        </tr>
      </thead>
      <tbody>
        {enclosureAdded?.map((row: Cotizacion) => (
          <tr
            key={row?.id}
            className='text-[#797979] font-medium text-sm border-t border-[#EAEAEA]'
          >
            <td className='text-left pb-8 pt-7 pl-10'>{row.title ?? '-'}</td>
            <TableCell>{row.activityOne ?? '-'}</TableCell>
            <TableCell>{row.metricUnit ?? '-'}</TableCell>
            <TableCell>
              <input
                type='text'
                value={row.unityCount || 0}
                onChange={(e) => handleInputChange(e, row.id)}
                className='border rounded w-1/2 py-2 px-3 text-grey-darker'
              />
            </TableCell>
            <TableCell>{formatPrice(row.manPowerTotal) ?? '-'}</TableCell>
            <TableCell>{formatPrice(row.materialsTotal) ?? '-'}</TableCell>
            <TableCell>
              {formatPrice(row.manPowerTotal * Number(row.unityCount)) || '-'}
            </TableCell>
            <TableCell>
              {formatPrice(row.materialsTotal * Number(row.unityCount)) || '-'}
            </TableCell>
            <TableCell>
              <div className='flex items-center'>
                <input
                  type='text'
                  value={row.margin | 0}
                  onChange={(e) => handleMarginChange(e, row.id)}
                  className='border rounded w-16 py-2 px-3 text-grey-darker'
                />
                <span className='ml-2'>%</span>
              </div>
            </TableCell>
            <TableCell>
              {formatPrice(
                (row.manPowerTotal * Number(row.unityCount) +
                  row.materialsTotal * Number(row.unityCount)) *
                  (1 + row.margin / 100)
              ) || '-'}
            </TableCell>
            {/* <TableCell>
              <button onClick={() => handleDelete(row.id)}>Eliminar</button>
            </TableCell> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableCotizacionActual;
