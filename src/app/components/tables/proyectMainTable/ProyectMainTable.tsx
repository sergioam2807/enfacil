import React from 'react';
import TableHead from '../../common/TableHead';
import TableCell from '../../common/TableCell';
import ChipStatus from '../../chip/ChipStatus';

import OptionMenuButton from '../../buttons/OptionMenuButton';
import Link from 'next/link';

interface Proyect {
  id: string;
  name: string;
  client: string;
  startDate: string;
  finishDate: string;
  vigency: string;
  advance: string;
}

interface proyectProps {
  proyectData: Proyect[];
}

const ProyectMainTable = ({ proyectData }: proyectProps) => {
  console.log(proyectData);
  return (
    <table className='w-full table-auto'>
      <thead>
        <tr className='text-[#0E436B] font-semibold text-sm'>
          <th className='text-left pb-8 pt-5 pl-10'>Proyecto</th>
          <TableHead>Cliente</TableHead>
          <TableHead>F.contractual inicio</TableHead>
          <TableHead>F.contractual término</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Avance</TableHead>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {proyectData?.map((row: Proyect) => (
          <tr
            key={row?.id}
            className='text-[#797979] font-medium text-sm border-t border-[#EAEAEA]'
          >
            <TableCell clickable>
              <Link className='ml-10' href={`/proyectos/${row?.id}`}>
                {row.name ?? '-'}
              </Link>
            </TableCell>
            <TableCell>{row.client ?? '-'}</TableCell>
            <TableCell>{row.startDate ?? '-'}</TableCell>
            <TableCell>{row.finishDate ?? '-'}</TableCell>
            <TableCell>
              <ChipStatus status={row.vigency} />
            </TableCell>
            <TableCell>
              <span className='text-sm'>
                {typeof row.advance === 'number'
                  ? `${row.advance}%`
                  : `${row.advance}%`}
              </span>
            </TableCell>
            <td className='text-left text-base'>
              <OptionMenuButton />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProyectMainTable;
