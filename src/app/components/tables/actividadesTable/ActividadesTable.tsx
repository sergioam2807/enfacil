import React from 'react';
import TableHead from '../../common/TableHead';
import TableCell from '../../common/TableCell';
import OptionMenuMaterialsButton from '../../buttons/OptionMenuMaterialsButton';
import { formatPrice } from '@/helpers/capitaliizeFirstLetter';
import { Activity } from '@/types/types';

interface activityProps {
  activityData: { data: Activity[] } | Activity[];
}

const ActividadesTable = ({ activityData }: activityProps) => {
  if (
    !activityData ||
    (Array.isArray(activityData) && activityData.length === 0)
  ) {
    return (
      <div className='w-full text-center py-10'>
        <p className='text-xl text-custom-blue'>No hay datos disponibles</p>
      </div>
    );
  }

  const data = Array.isArray(activityData)
    ? activityData
    : activityData?.data || [];

  return (
    <table className='w-full table-auto'>
      <thead>
        <tr className='text-[#0E436B] font-semibold text-sm'>
          <th className='text-left text-base pl-10 py-2'>Actividad</th>
          <TableHead>Precio Mano obra Unitario</TableHead>
          <TableHead>Precio Material Unitario</TableHead>
          <TableHead>Unidad de medida</TableHead>
        </tr>
      </thead>
      <tbody>
        {data.map((row: Activity) => (
          <tr
            key={row.id}
            className='text-[#797979] font-medium text-sm border-t border-[#EAEAEA]'
          >
            <td className='text-left text-base pl-10 py-2'>
              {row.name ?? '-'}
            </td>

            <TableCell>
              {formatPrice(Number(row.manPowerUnitPricing)) ?? '-'}
            </TableCell>
            <TableCell>
              {formatPrice(Number(row.materialsUnitPricing)) ?? '-'}
            </TableCell>
            <TableCell>{row.metricUnit ?? '-'}</TableCell>
            <td className='text-left text-base'>
              <OptionMenuMaterialsButton
                id={row.id?.toString() ?? ''}
                byIdURL={'/api/ActivityApi/GetActivities'}
                deleteURL={'/api/ActivityApi/DeleteActivity'}
                type='actividades'
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ActividadesTable;
