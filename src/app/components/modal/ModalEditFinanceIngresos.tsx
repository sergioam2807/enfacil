'use client';

import React, { useEffect, useState } from 'react';
import InputComponent from '../input/InputComponent';
import BasicButtonComponent from '../buttons/BasicButtonComponent';
import {
  getClientResponseData,
  getProyectData,
  getSubCategory,
  postFinalMovementstData,
} from '@/app/api/data';
import { useReloadMovements } from '@/store/store';
// import { cleanTaxId, formatTaxId } from '@/helpers/capitaliizeFirstLetter';

interface Props {
  handleCloseEdit: () => void;
  categoryName: string | null;
  materialData: any;
}

export interface EditFinanceData {
  client: string;
  project: string;
  // date: string;
  bank: string;
  amount: string;
  description: string;
  name: string | null;
  // category: string | null;
  subCategory: string;
}

const ModalEditFinanceIngresos = ({
  handleCloseEdit,
  categoryName,
  materialData,
}: Props) => {
  const [clients, setClients] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [projects, setProjects] = useState([]);
  const [createFinance, setCreateFinance] = useState<EditFinanceData>({
    client: '',
    project: '',
    // date: '',
    bank: '',
    amount: '',
    description: '',
    // category: categoryName,
    name: categoryName,
    subCategory: '',
  });
  const { updateFinancialMovements, setUpdateFinancialMovements } =
    useReloadMovements();

  useEffect(() => {
    setCreateFinance({
      client: materialData?.client?.id,
      project: materialData?.project?.id,
      bank: materialData.bank,
      amount: materialData.amount,
      description: materialData.description,
      name: materialData.name,
      subCategory: materialData?.subCategory?.id,
    });
  }, [materialData]);

  useEffect(() => {
    const fetchClients = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const data = await getClientResponseData(token);
          setClients(data.data);
          if (materialData && materialData.client) {
            setCreateFinance((prevState) => ({
              ...prevState,
              client: data.data.find(
                (client: any) => client.id === materialData.client.id
              ).id,
            }));
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error('No token found');
      }
    };

    fetchClients();
  }, [materialData]);

  useEffect(() => {
    const fetchSubCategories = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const data = await getSubCategory(token);
          setSubCategories(data.data);
          if (materialData && materialData.subCategory) {
            setCreateFinance((prevState) => ({
              ...prevState,
              subCategory: materialData.subCategory.id,
            }));
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error('No token found');
      }
    };

    fetchSubCategories();
  }, [materialData]);

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const data = await getProyectData(token);
          setProjects(data.data);
          if (materialData && materialData.project) {
            setCreateFinance((prevState) => ({
              ...prevState,
              project: materialData.project.id,
            }));
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error('No token found');
      }
    };

    fetchProjects();
  }, [materialData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreateFinance({
      ...createFinance,
      [event.target.name]: event.target.value,
    });
  };

  const handleClientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCreateFinance({
      ...createFinance,
      client: event.target.value,
    });
  };

  const handleSubCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCreateFinance({
      ...createFinance,
      subCategory: event.target.value,
    });
  };

  const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCreateFinance({
      ...createFinance,
      project: event.target.value,
    });
  };

  const handleAddClick = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const createFinanceData = {
        name: createFinance.client,
        description: createFinance.description,
        amount: createFinance.amount,
        bank: createFinance.bank,
        type: createFinance.name,
        financialSubCategoryId: createFinance.subCategory,
        referenceId: createFinance.project,
      };

      try {
        const data = await postFinalMovementstData(token, createFinanceData);
        console.log(data);
        setUpdateFinancialMovements(!updateFinancialMovements);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('No token found');
    }
  };

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center'>
      <div className='p-8 border w-fit shadow-lg rounded-2xl bg-white'>
        <div className='text-center p-4'>
          <div className='flex justify-start'>
            <h3 className='text-xl font-semibold text-[#000E41]'>
              Editar {categoryName}
            </h3>
          </div>
          <div className='w-full'>
            <div className='my-4'>
              <div className='flex justify-start'>
                <span className='text-sm text-[#000E41] mb-2'>Cliente</span>
              </div>
              <select
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='client'
                name='client'
                value={createFinance.client}
                onChange={handleClientChange}
              >
                <option value=''>Selecciona un Cliente</option>
                {clients.map((client: any) => (
                  <option key={client?.id} value={client?.id}>
                    {client?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className='w-full'>
            <div className='my-4'>
              <div className='flex justify-start'>
                <span className='text-sm text-[#000E41] mb-2'>
                  Subcategoria
                </span>
              </div>
              <select
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='client'
                name='client'
                value={createFinance.subCategory}
                onChange={handleSubCategoryChange}
              >
                <option value=''>Selecciona una subcategoria</option>
                {subCategories.map((subcategory: any) => (
                  <option key={subcategory?.id} value={subcategory?.id}>
                    {subcategory?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className='flex items-center justify-between gap-5'>
            <div className='w-full'>
              <div className=''>
                <div className='flex justify-start'>
                  <span className='text-sm text-[#000E41] mb-2'>Proyecto</span>
                </div>
                <select
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='client'
                  name='client'
                  onChange={handleProjectChange}
                  value={createFinance.project}
                >
                  <option value=''>Selecciona un Proyecto</option>
                  {projects?.map((project: any) => (
                    <option key={project?.id} value={project?.id}>
                      {project?.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* <div>
              <InputComponent
                nameVizualization='Fecha'
                name='date'
                placeholder='25/03/2024'
                onChange={handleInputChange}
                value={createFinance.date}
              />
            </div> */}
          </div>
          <div className='flex items-center justify-between gap-5'>
            <div>
              <InputComponent
                nameVizualization='Banco'
                name='bank'
                placeholder='Banco'
                onChange={handleInputChange}
                value={createFinance.bank}
              />
            </div>
            <div>
              <InputComponent
                nameVizualization='Monto'
                name='amount'
                placeholder='$00.000'
                onChange={handleInputChange}
                value={createFinance.amount}
              />
            </div>
          </div>

          <div>
            <InputComponent
              nameVizualization='Descripción'
              name='description'
              placeholder='Descripción'
              onChange={handleInputChange}
              value={createFinance.description}
            />
          </div>

          <div className='flex justify-end items-center gap-6 pt-5'>
            <div className='flex justify-end mt-4'>
              <button
                onClick={handleCloseEdit}
                style={{ borderColor: '#0E436B', color: '#0E436B' }}
                className='py-3 px-8 rounded-lg text-custom-blue text-sm font-semibold shadow-sm shadow-custom-blue border-custom-blue focus:outline-none focus:ring-2 focus:ring-gray-300'
              >
                Cerrar
              </button>
            </div>
            <div className='flex justify-end mt-4'>
              <BasicButtonComponent
                bgColor={'#0E436B'}
                borderColor={'#0E436B'}
                textColor='#FFFFFF'
                text='Editar'
                onClick={handleAddClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEditFinanceIngresos;
