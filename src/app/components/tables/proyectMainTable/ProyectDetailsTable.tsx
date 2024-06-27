import React from 'react';
import TableHead from '../../common/TableHead';
import TableCell from '../../common/TableCell';
import AdvanceBar from '../table/AdvanceBar';

interface Proyect {
  id: number;
  place: string;
  activity: string;
  progress: string;
}

interface ProyectDetailsTableProps {
  proyectData: Proyect[];
}
const ProyectDetailsTable: React.FC<ProyectDetailsTableProps> = ({
  proyectData,
}) => {
  const proyectData1: Proyect[] = [
    {
      id: 1,
      place: 'Recinto 1',
      activity: 'Actividad 1',
      progress: '50',
    },
    {
      id: 2,
      place: 'Recinto 2',
      activity: 'Actividad 2',
      progress: '30',
    },
    {
      id: 3,
      place: 'Recinto 3',
      activity: 'Actividad 3',
      progress: '80',
    },
    // Agrega más objetos de proyecto según sea necesario
  ];

  if (!proyectData || proyectData.length === 0) {
    return (
      <div className='w-full text-center py-10'>
        <p className='text-xl text-custom-blue'>No hay datos disponibles</p>
      </div>
    );
  }

  return (
    <table className='w-full table-auto'>
      <thead>
        <tr className='text-[#0E436B] font-semibold text-sm'>
          <th className='text-left pb-8 pt-5 pl-10'>Recinto</th>
          <TableHead>Actividad</TableHead>
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
            <td className='text-left pb-8 pt-5 pl-10'>{row.place ?? '-'}</td>
            <TableCell>{row.activity ?? '-'}</TableCell>
            <TableCell>
              <AdvanceBar avance={row.progress} />
            </TableCell>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProyectDetailsTable;
