'use client';
import React, { useEffect, useState } from 'react';
import TableHead from '../../common/TableHead';
import TableCell from '../../common/TableCell';
import ciclebutton from '../../../../../public/images/circlebutton.svg';
import Image from 'next/image';
import { getActivityTokenData, getMaterials } from '@/app/api/data';

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
  onData: (data: any) => void;
}

const TableCotizacion = ({ cotizacionData, onData }: cotizacionProps) => {
  const [selectedRow, setSelectedRow] = useState<cotizacionProps[]>([]);
  const [activitysData, setActivityData] = useState<any[]>([]);

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

  useEffect(() => {
    onData(selectedRow);
  }, [selectedRow, onData]);

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
        {transformedData?.map((row: any) => (
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
              <button
                onClick={() => setSelectedRow((prevRows) => [...prevRows, row])}
              >
                <Image src={ciclebutton} alt='edit' width={23} height={23} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableCotizacion;
