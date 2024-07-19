'use client';
import React, { useEffect, useState } from 'react';
import TableHead from '../../common/TableHead';
import TableCell from '../../common/TableCell';
import ciclebutton from '../../../../../public/images/circlebutton.svg';
import Image from 'next/image';
import { getActivityTokenData, getMaterials } from '@/app/api/data';
import { useEnclosureAdded } from '@/store/store';

interface Enclosure {
  id: string;
  name: string;
  activitiesInEnclosure: string;
  activities: string;
  activityOne: number;
  activityTwo: string;
  activityTree: number;
}

interface cotizacionProps {
  cotizacionData: Enclosure[];
  setEnclosureAdded: any;
  id?: string;
}

const TableCotizacion = ({
  cotizacionData,
  setEnclosureAdded,
  enclosureAdded,
}: cotizacionProps) => {
  const [activitysData, setActivityData] = useState<any[]>([]);
  const { addEnclosure } = useEnclosureAdded();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');

      if (token) {
        getActivityTokenData(token).then((data) => {
          setActivityData(data?.data);
        });
      }
    }
  }, []);

  let transformedData = cotizacionData?.map((enclosure: Enclosure) => {
    let enclosureActivities = enclosure.activitiesInEnclosure
      ? enclosure.activitiesInEnclosure
          .split(',')
          .map((activity) => activity.trim())
      : [];

    return {
      id: enclosure.id,
      title: enclosure.name,
      activities: enclosureActivities.length,
      activityOne: enclosureActivities[0] ?? '-',
      activityTwo: enclosureActivities[1] ?? '-',
      activityThree: enclosureActivities[2] ?? '-',
      metricUnit:
        activitysData.find(
          (activity) => activity.name === enclosureActivities[0]
        )?.metricUnit ?? '-',
    };
  });

  const handleRowSelection = (row: cotizacionProps) => {
    setEnclosureAdded((prevEnclosures: any) => {
      const isAlreadyAdded = prevEnclosures.some(
        (existingEnclosure: any) => existingEnclosure.id === row.id
      );

      if (isAlreadyAdded) {
        return prevEnclosures.filter(
          (existingEnclosure: any) => existingEnclosure.id !== row.id
        );
      } else {
        const updatedRow = { ...row /* add any additional values here */ };
        return [...prevEnclosures, updatedRow];
      }
    });
  };

  return (
    <table className='w-full table-auto'>
      <thead>
        <tr className='text-[#0E436B] font-semibold text-sm'>
          <th className='text-left pb-8 pt-5 pl-10'>Recinto</th>
          <TableHead>Cantidad Actividades</TableHead>
          <TableHead>Actividad 1</TableHead>
          <TableHead>Actividad 2</TableHead>
          <TableHead>Actividad 3</TableHead>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {transformedData?.map((row: any) => {
          const isAdded = enclosureAdded.some(
            (existingEnclosure: any) => existingEnclosure.id === row.id
          );

          return (
            <tr
              key={row?.id}
              className='text-[#797979] font-medium text-sm border-t border-[#EAEAEA]'
            >
              <td className='text-left pb-8 pt-5 pl-10'>{row.title ?? '-'}</td>
              <TableCell>{row.activities ?? '-'}</TableCell>
              <TableCell>{row.activityOne ?? '-'}</TableCell>
              <TableCell>{row.activityTwo ?? '-'}</TableCell>
              <TableCell>{row.activityThree ?? '-'}</TableCell>
              <td className='text-left text-base'>
                <button onClick={() => handleRowSelection(row)}>
                  {!isAdded ? (
                    <Image
                      src={ciclebutton}
                      alt='edit'
                      width={23}
                      height={23}
                    />
                  ) : (
                    <div className='w-6 h-6 bg-red-500 rounded-full relative'>
                      <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='w-4 h-1 bg-white'></div>
                      </div>
                    </div>
                  )}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableCotizacion;
