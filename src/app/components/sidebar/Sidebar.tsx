'use client';
import Image from 'next/image';
import { SidebarItem } from './SidebarItem';
import { CreateButton } from '../common/CreateButton';
import { useState } from 'react';
import ModalCreateQuote from '../modal/ModalCreateQuote';
import { getClientResponseData } from '@/app/api/data';
import { Client } from '@/types/types';
import { useRouter } from 'next/navigation';
import inicio from '../../../../public/images/inicio.png';
import usuarios from '../../../../public/images/usuarios.png';
import personal from '../../../../public/images/personal.png';
import clientes from '../../../../public/images/clientes.png';
import proyectos from '../../../../public/images/proyectos.png';
import cotizaciones from '../../../../public/images/cotizaciones.png';
import materiales from '../../../../public/images/materiales.png';
import actividades from '../../../../public/images/actividades.png';
import recintos from '../../../../public/images/recintos.png';
import enfacil from '../../../../public/images/logo-en-facil.png';
import eic from '../../../../public/images/logo-eic.png';

const sidebarMenuItems = [
  {
    path: '/inicio',
    icon: inicio,
    title: 'Inicio',
  },
  {
    path: '/usuarios',
    icon: usuarios,
    title: 'Usuarios',
  },
  {
    path: '/personal',
    icon: personal,
    title: 'Personal',
  },
  {
    path: '/clientes',
    icon: clientes,
    title: 'Clientes',
  },
  {
    path: '/proyectos',
    icon: proyectos,
    title: 'Proyectos',
  },
  {
    path: '/listado-cotizaciones',
    icon: cotizaciones,
    title: 'Cotizaciones',
  },
  {
    path: '/finanzas',
    icon: cotizaciones,
    title: 'Finanzas',
  },
  {
    path: '/materiales',
    icon: materiales,
    title: 'Materiales',
  },
  {
    path: '/actividades',
    icon: actividades,
    title: 'Actividades',
  },
  {
    path: '/recintos',
    icon: recintos,
    title: 'Recintos',
  },
];

export const Sidebar = () => {
  const [show, setShow] = useState(false);
  const [clientData, setClientData] = useState<Client[]>([]);
  // const router = useRouter();

  const handleClick = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const response = await getClientResponseData(token);
        setClientData(response?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setShow(true);
        // router.push("/cotizaciones");
      }
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className='h-screen bg-[#0E436B] text-white flex-shrink-0 flex flex-col justify-start'>
      <div className='pl-4 pr-4 pt-3 pb-7 text-white flex justify-center'>
        <Image src={eic} alt='logo' width={120} height={97} priority />
      </div>
      <div className='pl-4'>
        {sidebarMenuItems.map((item) => (
          <SidebarItem key={item.path} {...item} />
        ))}
      </div>
      <div className='flex justify-center items-center h-1/2'>
        <CreateButton
          title='Crear cotización'
          bgcolor='#FF9D28'
          onclick={handleClick}
        />

        {show && (
          <ModalCreateQuote onClose={handleClose} clientData={clientData} />
        )}
      </div>
      <div className='mt-auto pl-4 pb-4'>
        <Image src={enfacil} alt='logo' width={73} height={52} priority />
      </div>
    </div>
  );
};
