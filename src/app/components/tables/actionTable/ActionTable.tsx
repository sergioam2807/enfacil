import React from 'react';
import userIcon from '../../../../../public/images/user.svg';
import Image from 'next/image';
import ActionButtons from './ActionButtons';
import TableHead from '@/app/components/common/TableHead';
import TableCell from '@/app/components/common/TableCell';
import ChipStatus from '@/app/components/chip/ChipStatus';

import Link from 'next/link';
import { formatDate } from '@/helpers/capitaliizeFirstLetter';

interface User {
  id: string;
  name: string;
  job: string;
  superAdmin: string;
  created: string;
  state: string;
  phone: string;
  email: string;
}

interface userProps {
  usersData: User[];
}

interface userDataProps {
  name: string;
  superAdmin: boolean;
  fIngreso: string | null;
  estado: string | null;
  job: string;
  email: string;
  phone: string;
  id: number;
}

const ActionTableComponent = async ({ searchData }: any) => {
  if (!searchData || searchData.length === 0) {
    return (
      <div className='w-full text-center py-10'>
        <p className='text-xl text-custom-blue'>No hay datos disponibles</p>
      </div>
    );
  }
  const data = Array.isArray(searchData) ? searchData : searchData?.data || [];

  return (
    <table className='w-full table-auto'>
      <thead>
        <tr className='text-[#0E436B] font-semibold text-sm'>
          <th className='text-left pb-8 pt-5'></th>
          <TableHead>Nombre</TableHead>
          <TableHead>Cargo</TableHead>
          <TableHead>Tipo Usuario</TableHead>
          <TableHead>F.ingreso</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Contacto</TableHead>
          <TableHead>Acciones</TableHead>
        </tr>
      </thead>
      <tbody>
        {data.map((row: User) => (
          <tr
            key={row.id}
            className='text-[#797979] font-medium text-sm border-t border-[#EAEAEA]'
          >
            <td className='text-left text-base pl-10 py-2'>
              <div>
                <Image
                  src={userIcon}
                  alt='Search Icon'
                  width={54}
                  height={54}
                />
              </div>
            </td>
            <TableCell clickable>
              <Link href={`/usuarios/${row.id}`}>{row.name ?? '-'}</Link>
            </TableCell>
            <TableCell>{row.job ?? '-'}</TableCell>
            <TableCell>
              {row.superAdmin ? 'Administrador' : 'Usuario'}
            </TableCell>
            <TableCell>{formatDate(row.created) ?? '-'}</TableCell>
            <TableCell>
              <ChipStatus status={row.state} />
            </TableCell>
            <TableCell>
              <div>
                <div>{row.email}</div>
                <div>{row.phone}</div>
              </div>
            </TableCell>
            <td className='text-left text-base'>
              <ActionButtons
                id={row.id}
                byIdURL={'/api/UserApi/GetUsers'}
                deleteURL={'/api/UserApi/DeleteUser'}
                type='usuarios'
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ActionTableComponent;
