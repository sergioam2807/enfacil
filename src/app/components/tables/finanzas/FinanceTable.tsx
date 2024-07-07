import React, { useEffect, useState } from 'react';
import TableHead from '../../common/TableHead';
import TableCell from '../../common/TableCell';
import ActionButtons from '../actionTable/ActionButtons';
import { formatDate, formatPrice } from '@/helpers/capitaliizeFirstLetter';
import { getProyectData } from '@/app/api/data';
import { useReloadMovements } from '@/store/store';

interface FinanceTableProps {
  financialMovements: any[];
}

const FinanceTable = ({ financialMovements }: FinanceTableProps) => {
  const [projects, setProjects] = useState<any>([]);
  const { updateFinancialMovements } = useReloadMovements();

  useEffect(() => {
    const fetchFinancialMovements = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      const data = await getProyectData(token);
      setProjects(data?.data);
    };

    fetchFinancialMovements();
  }, [updateFinancialMovements]);

  return (
    <table className='w-full table-auto ml-6'>
      <thead>
        <tr className='text-[#0E436B] font-semibold text-sm'>
          <TableHead>Cliente</TableHead>
          <TableHead>Proyecto</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Banco</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Descripcion</TableHead>
          <TableHead>Monto</TableHead>
        </tr>
      </thead>
      <tbody>
        {financialMovements.map((row) => {
          const project = projects.find(
            (project: any) => project.id === row.referenceId
          );
          return (
            <tr
              key={row.id}
              className='text-[#797979] font-medium text-sm border-t border-[#EAEAEA]'
            >
              <TableCell>{row.name ?? '-'}</TableCell>
              <TableCell>
                {project ? project.name : 'Proyecto no encontrado'}
              </TableCell>
              <TableCell>{row.date ?? '-'}</TableCell>
              <TableCell>{row.bank ?? '-'}</TableCell>
              <TableCell>{row.type ?? '-'}</TableCell>
              <TableCell>{row.description ?? '-'}</TableCell>
              <TableCell>
                <span
                  className={
                    row.amout < 0 ? 'text-custom-red' : 'text-custom-green'
                  }
                >
                  {formatPrice(row.amout) ?? '-'}
                </span>
              </TableCell>
              <td className='text-left text-base'>
                <ActionButtons
                  id={row.id}
                  byIdURL={'/FinancialMovementsApi/GetFinancialMovements'}
                  deleteURL={'/FinancialMovementsApi/DeleteFinancialMovements'}
                  type='financialMovements'
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default FinanceTable;
