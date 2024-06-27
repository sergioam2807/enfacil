'use client';
import ChipStatus from '@/app/components/chip/ChipStatus';
import BaseTableCard from '@/app/components/tables/table/BaseTableCard';
import Image from 'next/image';
import user from '../../../../../public/images/user.svg';
import view from '../../../../../public/images/view.svg';
import React, { useEffect, useState } from 'react';
import ProyectDetailsTable from '@/app/components/tables/proyectMainTable/ProyectDetailsTable';
import Breadcrumbs from '@/app/components/common/Breadcrumbs';
import ShowEnclosures from '@/app/components/modal/ShowEnclosures';
import { Recinto } from '@/app/components/tables/recintosTable/TableRecintos';
import { getProyectById } from '@/app/api/data';

export default function ProyectDetails({ params }: { params: { id: string } }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedRecinto, setSelectedRecinto] = React.useState<Recinto | null>(
    null
  );
  const [proyectData, setProyectData] = useState(null);

  console.log('params.id', params.id);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (selectedRecinto) {
      handleOpenModal();
    }
  }, [selectedRecinto]);

  const proyectDetail = {
    state: 'Activo',
    name: 'Proyecto 1',
    taxID: '123456789',
    region: 'Región 1',
  };

  const personalProfile = {
    phone: '123-456-7890',
    email: 'email@example.com',
    data: [
      // {
      //   id: 1,
      //   place: 'Place 1',
      //   activity: 'Tarea 1',
      //   progress: '50',
      // },
      // {
      //   id: 2,
      //   place: 'Place 2',
      //   activity: 'Tarea 2',
      //   progress: '30',
      // },
      // Add more project objects as needed
    ],
  };

  // ...

  useEffect(() => {
    const token = localStorage.getItem('token') || undefined;
    getProyectById(params.id, token)
      .then((data) => setProyectData(data))
      .catch((error) => console.error(error));
  }, []);

  console.log(proyectData ? proyectData : 'No data');

  return (
    <div>
      <Breadcrumbs nameMapping={{ [params.id]: `Detalle proyecto` }} />
      <div className='w-full mt-10 py-6 px-8 bg-white rounded-lg flex items-center'>
        <div className='w-1/5 flex flex-col'>
          <div>
            <Image src={user} width={83} height={83} alt='user-profile' />
          </div>
          <div>
            <ChipStatus status={proyectDetail.state} />
          </div>
        </div>
        <div className='w-2/5 flex flex-col'>
          <span className='text-xl font-semibold text-custom-blue'>
            {proyectDetail.name ?? '-'}
          </span>

          <div className='flex flex-col mt-2'>
            <span className='text-base text-custon-gray'>
              {proyectDetail.taxID ?? '-'}
            </span>
            <span className='text-base text-custon-gray'>
              {proyectDetail.region ?? '-'}
            </span>
          </div>
        </div>
        <div className='w-1/2 flex justify-start items-start 2xl:w-1/5 flex-col'>
          <div className='flex items-center'>
            <span className='text-base text-custon-gray'>
              Fecha Inicio : {personalProfile.phone ?? '-'}
            </span>
          </div>
          <div className='flex items-center'>
            <span className='text-base text-custon-gray'>
              Fecha Est. Término: {personalProfile.email ?? '-'}
            </span>
          </div>
        </div>
        <div className='w-1/5 flex flex-col gap-2 items-center'>
          <div>
            <button
              onClick={handleOpenModal}
              className=' rounded-lg py-2 px-8 bg-[#0051CC] flex justify-around items-center'
            >
              <Image
                src={view}
                width={25}
                height={20}
                alt='edit'
                color='white'
              />
              <span className='text-white text-sm font-semibold pl-2'>
                Actividad
              </span>
            </button>
          </div>
          {showModal && (
            <ShowEnclosures
              data={[
                {
                  actividad: 'Actividad 1', // Reemplazar con actividad
                  avance: '50%', // reemplzar con advance
                  encargado: 'Encargado 1', // Reemplazar con encargado
                  totalActividad: 1000,
                },
              ]}
              onClose={handleCloseModal}
            />
          )}
        </div>
        <div className='w-1/5 flex flex-col gap-2 items-center'></div>
      </div>

      <div className='flex justify-end pt-8 pb-8'></div>

      <div className={`h-[600px] overflow-y-auto`}>
        <BaseTableCard>
          <ProyectDetailsTable proyectData={personalProfile.data} />
        </BaseTableCard>
      </div>
    </div>
  );
}
