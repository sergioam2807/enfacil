'use client';
import React from 'react';
import TableHead from '../../common/TableHead';
import TableCell from '../../common/TableCell';
import { formatPrice } from '@/helpers/capitaliizeFirstLetter';
import { Enclosure } from '@/app/(principal)/cotizaciones/[id]/page';

const TableCotizacionDetalle = ({ quoteFinalData }: any) => {
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
        </tr>
      </thead>
      <tbody>
        {quoteFinalData?.map((row: Enclosure) => (
          <tr
            key={row?.id}
            className='text-[#797979] font-medium text-sm border-t border-[#EAEAEA]'
          >
            <td className='text-left pb-8 pt-7 pl-10'>
              {row?.enclosure ?? '-'}
            </td>
            <TableCell>{row?.activity ?? '-'}</TableCell>
            <TableCell>{row?.metricUnit ?? '-'}</TableCell>
            <TableCell>{row?.units ?? '-'}</TableCell>
            <TableCell>
              {formatPrice(row?.manPowerUnitPrice ?? 0) ?? '-'}
            </TableCell>
            <TableCell>
              {formatPrice(row?.materialsUnitPrice ?? 0) ?? '-'}
            </TableCell>
            <TableCell>{formatPrice(row?.totalManPower) || '-'}</TableCell>
            <TableCell>{formatPrice(row?.totalMaterials) || '-'}</TableCell>
            <TableCell>%{row?.margin ?? '-'}</TableCell>
            <TableCell>{formatPrice(row?.totalActivity) || '-'}</TableCell>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableCotizacionDetalle;
