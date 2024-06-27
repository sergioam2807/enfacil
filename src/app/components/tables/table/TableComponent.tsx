import React from 'react';

import AdvanceBar from './AdvanceBar';
import ChipStatus from '@/app/components/chip/ChipStatus';

const TableHead = ({ children }: { children: React.ReactNode }) => (
  <th className='w-1/5 text-left pl-12 pb-8 pt-5'>{children}</th>
);
const TableCell = ({ children }: { children: React.ReactNode }) => (
  <td className='w-1/5 p-4 pl-12 text-base'>{children}</td>
);

const TableComponent = () => {
  const data = [
    {
      proyecto: [
        {
          id: '1',
          proyectName: 'Hacienda Atacama',
          region: 'Antofagasta',
          codigo: '40950775',
        },
      ],
      cliente: 'Christofer',
      avance: 100,
      estado: 'Activo',
    },
    {
      proyecto: [
        {
          id: '2',
          proyectName: 'Solares Norte',
          region: 'Iquique',
          codigo: '40950775',
        },
      ],
      cliente: 'Dimas',
      avance: '50',
      estado: 'Activo',
    },
    {
      proyecto: [
        {
          id: '1',
          proyectName: 'Brisas del Norte',
          region: 'Antofagasta',
          codigo: '40950775',
        },
      ],
      cliente: 'Fernando',
      avance: '50',
      estado: 'Activo',
    },
    {
      proyecto: [
        {
          id: '1',
          proyectName: 'Brisas del Norte',
          region: 'Antofagasta',
          codigo: '40950775',
        },
      ],
      cliente: 'Catalán',
      avance: 50,
      estado: 'Activo',
    },
    {
      proyecto: [
        {
          id: '1',
          proyectName: 'Brisas del Norte',
          region: 'Antofagasta',
          codigo: '40950775',
        },
      ],
      cliente: 'Catalán',
      avance: '35',
      estado: 'Activo',
    },
    {
      proyecto: [
        {
          id: '1',
          proyectName: 'Brisas del Norte',
          region: 'Antofagasta',
          codigo: '40950775',
        },
      ],
      cliente: 'Catalán',
      avance: '50',
      estado: 'Activo',
    },
    {
      proyecto: [
        {
          id: '1',
          proyectName: 'Brisas del Norte',
          region: 'Antofagasta',
          codigo: '40950775',
        },
      ],
      cliente: 'Catalán',
      avance: '30',
      estado: 'Inactivo',
    },
    // puedes agregar más objetos de datos aquí
  ];

  return (
    <table
      className='w-full table-auto'
      //   style={{ width: "1500px" }}
    >
      <thead className='p-56'>
        <tr className='text-[#0E436B] font-semibold text-sm'>
          <TableHead>Proyecto</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Avance</TableHead>
          <TableHead>Estado</TableHead>
          <th className='w-1/8 text-leftright p-4'></th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr
            key={index}
            className='text-[#797979] font-medium text-sm border-t border-[#EAEAEA]'
          >
            <TableCell>
              {row.proyecto.map((proyecto) => (
                <div key={proyecto.id}>
                  <div>{proyecto.proyectName}</div>
                  <div>{proyecto.region}</div>
                  <div>{proyecto.codigo}</div>
                </div>
              ))}
            </TableCell>
            <TableCell>{row.cliente}</TableCell>
            <TableCell>
              <AdvanceBar avance={row.avance} />
            </TableCell>
            <TableCell>
              <ChipStatus status={row.estado} />
            </TableCell>
            <td className='w-2/4 p-4'>
              <button className='px-4 py-2 text-[#097AFF] underline font-normal rounded'>
                Ver Detalles
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
