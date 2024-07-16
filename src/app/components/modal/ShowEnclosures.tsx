'use client';
import React from 'react';
import { formatPrice } from '@/helpers/capitaliizeFirstLetter';

type EnclosureData = {
  actividad: string;
  avance: string;
  encargado: string;
  totalActividad: number;
  totalUnits?: number;
};

type ShowEnclosuresProps = {
  data: EnclosureData[];
  onClose: () => void;
  hasEncargado?: boolean;
};
const ShowEnclosures: React.FC<ShowEnclosuresProps> = ({
  onClose,
  data,
  hasEncargado,
}) => {
  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center'>
      <div className='p-8 border w-fit shadow-lg rounded-2xl bg-white'>
        <table className='w-full table-auto'>
          <thead>
            <tr className='text-[#0E436B] font-semibold text-sm'>
              <th className='text-left pb-8 pt-5 pr-4'>Actividad</th>
              <th className='text-left pb-8 pt-5 pr-4'>Avance</th>
              {!hasEncargado && (
                <th className='text-left pb-8 pt-5 pr-4'>Total Actividad</th>
              )}
              {hasEncargado && (
                <>
                  <th className='text-left pb-8 pt-5 pr-4'>Encargado</th>
                  <th className='text-left pb-8 pt-5 pr-4'>Unidades Totales</th>
                  <th className='text-left pb-10 pt-8 pr-4'>Enviar</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row: any) => (
              <tr
                key={row.id}
                className='text-[#797979] font-medium text-sm border-t border-[#EAEAEA]'
              >
                <td className='text-left text-base py-2 pr-4'>
                  {row.actividad ?? '-'}
                </td>

                <td className='pr-4'>
                  {row.avance !== null && row.avance !== undefined
                    ? `${row.avance}%`
                    : '-'}
                </td>
                {!hasEncargado && (
                  <td className='pr-4 text-center'>
                    {formatPrice(row.totalActividad) ?? '-'}
                  </td>
                )}
                {hasEncargado && (
                  <>
                    <td className='pr-4'>{row.encargado ?? '-'}</td>
                    <td className='text-center'>
                      <input
                        type='text'
                        className='text-[#797979] font-semibold text-md text-right border border-gray-300 focus:border-gray-500 w-1/3'
                        defaultValue={row.totalUnits}
                      />
                    </td>
                    <td className='pr-4'>
                      <button
                        onClick={() => {
                          console.log('click');
                        }}
                        className='bg-custom-blue p-3 flex rounded-md text-white h-fit my-2'
                      >
                        Enviar
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div className='flex pt-4 px-3 justify-end'>
          <button
            onClick={onClose}
            style={{ borderColor: '#0E436B', color: '#0E436B' }}
            className='py-3 px-8 rounded-lg text-custom-blue text-sm font-semibold shadow-sm shadow-custom-blue border-custom-blue focus:outline-none focus:ring-2 focus:ring-gray-300'
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowEnclosures;
