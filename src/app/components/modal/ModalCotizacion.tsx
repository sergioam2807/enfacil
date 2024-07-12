'use client';
import React, { useEffect, useState } from 'react';
import TitleComponent from '../common/TitleComponent';
import { formatPrice } from '@/helpers/capitaliizeFirstLetter';
import { useRouter } from 'next/navigation';
import InputComponent from '../input/InputComponent';
import { getClientResponseData, postProjectData } from '@/app/api/data';

interface ModalCotizacionProps {
  quoteFinalData: any;
  closeModal: () => void;
}
const ModalCotizacion = ({
  quoteFinalData,
  closeModal,
}: ModalCotizacionProps) => {
  const router = useRouter();
  const [projectName, setProjectName] = useState('');
  const [clientId, setClientId] = useState('');
  const [clientData, setClientData] = useState<{ id: number; name: string }[]>(
    []
  );

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = event.target.value;
    const name = event.target.name;

    if (name === 'projectName') {
      setProjectName(value);
    } else if (name === 'clientId') {
      setClientId(value);
    }
  };

  const handleConvertToProject = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found in local storage');
    }

    console.log('clientId', clientId);
    const projectData = {
      quoteId: quoteFinalData?.id,
      name: projectName,
      clientId: Number(clientId),
    };

    console.log('projectData', projectData);
    try {
      const data = await postProjectData(token, projectData);
      console.log(data);

      if (typeof window !== 'undefined') {
        localStorage.removeItem('selectedClientId');
        localStorage.removeItem('quoteData');
        localStorage.removeItem('selectedClientName');
      }
      closeModal();
      router.push('/proyectos');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const response = await getClientResponseData(token);
          setClientData(response?.data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center'>
      <div className='p-8 border w-fit shadow-lg rounded-2xl bg-white'>
        <div>
          <TitleComponent
            titleName={'¿Estás seguro de convertir la cotización, en proyecto?'}
          />
        </div>
        <div className='flex flex-col bg-[#EFF4FC] px-4 py-8 rounded-xl gap-2'>
          <div>
            <span className='text-custom-blue font-medium'>
              Cliente: {quoteFinalData?.title}
            </span>
          </div>
          <div>
            <span className='text-[#797979] font-medium '>Detalle</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-[#797979] font-medium '>
              Total Materiales
            </span>
            <span className='text-[#797979] font-medium '>
              {formatPrice(quoteFinalData?.totalMaterialsUnitPrice ?? 0)}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-[#797979] font-medium '>
              Total mano de obra
            </span>
            <span className='text-[#797979] font-medium '>
              {formatPrice(quoteFinalData?.totalMPUnitPrice ?? 0)}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-[#797979] font-medium '>
              Gastos generales
            </span>
            <span className='text-[#797979] font-medium '>$0</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-[#797979] font-medium '>Total final</span>
            <span className='text-custom-blue font-medium '>
              {' '}
              {formatPrice(quoteFinalData?.totalMargin ?? 0)}
            </span>
          </div>
        </div>
        <InputComponent
          nameVizualization='Nombre del Proyecto'
          name='projectName'
          placeholder='Nombre del proyecto'
          onChange={handleInputChange}
          value={projectName}
        />
        <select
          name='clientId'
          onChange={handleInputChange}
          className='px-4 py-2 border rounded-md text-gray-700 bg-white shadow'
        >
          <option value='' disabled selected>
            Selecciona un cliente
          </option>
          {clientData &&
            clientData.map((client, index) => (
              <option key={index} value={client.id}>
                {client.name}
              </option>
            ))}
        </select>
        <div className='flex justify-end items-center gap-6 pt-5'>
          <div className='flex justify-end mt-4'>
            <button
              onClick={closeModal}
              className='py-3 px-3 rounded-lg text-white text-sm font-semibold shadow-sm bg-custom-red'
            >
              No, cancelar
            </button>
          </div>
          <div className='flex justify-end mt-4'>
            <button
              onClick={handleConvertToProject}
              className={`py-3 px-3 rounded-lg text-white text-sm font-semibold shadow-sm ${
                projectName.length < 3 ? 'bg-gray-400' : 'bg-[#1CB454]'
              }`}
              disabled={projectName.length < 3}
            >
              Sí, convertir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCotizacion;
