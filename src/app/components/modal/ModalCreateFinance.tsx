'use client';
import React, { useEffect, useState } from 'react';
import TitleComponent from '../common/TitleComponent';
import Image from 'next/image';
import ingresos from '../../../../public/images/ingresos.svg';
import check from '../../../../public/images/bluecheck.svg';
import nonchecked from '../../../../public/images/nonchecked.svg';
import ModalCreateFinanceIngresos from './ModalCreateFinanceIngresos';
import ModalCreateGastos from './ModalCreateGastos';
import { getCategory } from '@/app/api/data';

interface ModalCreaFinanceProps {
  onClose: () => void;
}

const ModalCreateFinance = ({ onClose }: ModalCreaFinanceProps) => {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [showIngresosModal, setShowIngresosModal] = useState(false);
  const [showGastosModal, setShowGastosModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  // const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const handleButtonSelectedClick = (
    buttonName: string,
    categoryId: number
  ) => {
    setSelectedButton(buttonName);
    setSelectedCategoryId(categoryId);
  };

  const handleSave = async () => {
    setShowIngresosModal(true);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const data = await getCategory(token);
          setCategories(data.data);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error('No token found');
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center'>
      <div className='border w-96 shadow-lg rounded-2xl bg-white  flex flex-col'>
        <div className='py-10 px-5 max-w-full '>
          <TitleComponent
            titleName={
              'Primero selecciona que tipo de movimiento deseas ingresar.'
            }
          />
          <div className='flex flex-col gap-3'>
            {categories.map((category: any) => (
              <button
                key={category.id}
                onClick={() =>
                  handleButtonSelectedClick(category.name, category.id)
                }
                className={`flex ${
                  selectedButton === category.name
                    ? ' bg-[#EFF4FC] border-custom-blue border-2'
                    : 'none'
                } border-2 text-custom-blue text-lg font-bold items-center justify-between px-3 rounded-lg  py-8 gap-2`}
              >
                <div className='flex items-center gap-2'>
                  <Image
                    src={ingresos}
                    alt={category.name}
                    width={42}
                    height={42}
                  />
                  {category.name}
                </div>
                <div>
                  <Image
                    src={selectedButton === category.name ? check : nonchecked}
                    alt={category.name}
                    width={32}
                    height={32}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className='flex pb-3 px-3 justify-between'>
          <button
            onClick={onClose}
            style={{ borderColor: '#0E436B', color: '#0E436B' }}
            className='py-3 px-8 rounded-lg text-custom-blue text-sm font-semibold shadow-sm shadow-custom-blue border-custom-blue focus:outline-none focus:ring-2 focus:ring-gray-300'
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            style={{ borderColor: '#0E436B' }}
            className='py-3 px-8 rounded-lg text-white bg-custom-blue text-sm font-semibold shadow-sm shadow-custom-blue border-custom-blue focus:outline-none focus:ring-2 focus:ring-gray-300'
          >
            Aceptar
          </button>
          {/* Modales */}
          {showIngresosModal && (
            <ModalCreateFinanceIngresos
              onClose={() => setShowIngresosModal(false)}
              categoryId={selectedCategoryId}
              categoryName={selectedButton}
            />
          )}
          {showGastosModal && (
            <ModalCreateGastos onClose={() => setShowGastosModal(false)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalCreateFinance;
