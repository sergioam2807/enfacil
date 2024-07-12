import React from 'react';
import TableHead from '../../common/TableHead';
import TableCell from '../../common/TableCell';
import ChipStatus from '../../chip/ChipStatus';
import trash from '../../../../../public/images/trash.svg';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/helpers/capitaliizeFirstLetter';

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  taxId: string;
  address: string;
  created: string;
}
interface Proyect {
  id: number;
  name: string;
  client: Client;
  startDate: string;
  finishDate: string;
  vigency: string;
  advance: string;
  created: string;
  updated: string;
}

interface proyectProps {
  proyectData: Proyect[];
  handleDelete: (id: number | null) => void;
}

const ProyectMainTable = ({ proyectData, handleDelete }: proyectProps) => {
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
            <TableCell>{row.client?.name ?? '-'}</TableCell>
            <TableCell>{formatDate(row.created) ?? '-'}</TableCell>
            <TableCell>{formatDate(row.updated) ?? '-'}</TableCell>
            <TableCell>
              <ChipStatus status={row.vigency} />
            </TableCell>
            <TableCell>
              <span className='text-sm'>{(row.advance || 0) + '%'}</span>
            </TableCell>
            <td className='text-left text-base'>
              <TableCell>
                <button onClick={() => handleDelete(row.id)}>
                  {' '}
                  <Image src={trash} alt='Eliminar' width={15} height={15} />
                </button>
              </TableCell>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProyectMainTable;
