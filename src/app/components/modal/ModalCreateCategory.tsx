'use client';
import React, { useState } from 'react';
import TitleComponent from '../common/TitleComponent';
import InputComponent from '../input/InputComponent';
import ciclebutton from '../../../../public/images/circlebutton.svg';
import Image from 'next/image';

interface ModalCreateCategoryProps {
  onClose: () => void;
}
const ModalCreateCategory = ({ onClose }: ModalCreateCategoryProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [showSubcategory, setShowSubcategory] = useState(false);
  const [subcategoryName, setSubcategoryName] = useState('');
  const [subcategoryDescription, setSubcategoryDescription] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'subcategoryName':
        setSubcategoryName(value);
        break;
      case 'subcategoryDescription':
        setSubcategoryDescription(value);
        break;
      default:
        break;
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'category':
        break;
      default:
        break;
    }
  };

  const handleSave = () => {
    if (showSubcategory) {
      console.log('subcategoria');
      // Aquí puedes manejar el envío de una subcategoría
      // Por ejemplo, puedes llamar a un endpoint de API para crear una subcategoría
    } else {
      console.log('categoria');
      // Aquí puedes manejar el envío de una categoría
      // Por ejemplo, puedes llamar a un endpoint de API para crear una categoría
    }
  };

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center'>
      <div className='border w-96 shadow-lg rounded-2xl bg-white  flex flex-col'>
        <div className=' px-5'>
          <TitleComponent titleName={'Ingresa una nueva Categoria'} />
        </div>
        <div className='w-full px-5 py-4'>
          <InputComponent
            nameVizualization='Nombre de la categoría'
            name='name'
            placeholder='Nombre de la categoría'
            onChange={handleInputChange}
            value={name}
            disabled={showSubcategory}
          />
          <InputComponent
            nameVizualization='Descripción de la categoría'
            name='description'
            placeholder='Descripción de la categoría'
            onChange={handleInputChange}
            value={description}
            disabled={showSubcategory}
          />
        </div>

        <div className='flex justify-end px-5'>
          <button
            className='flex items-center gap-2 text-custom-blue rounded-md border-2 border-custom-blue bg-white px-3 py-2'
            onClick={() => setShowSubcategory(!showSubcategory)}
          >
            Agregar Subcategoria
            <Image src={ciclebutton} alt='edit' width={23} height={23} />
          </button>
        </div>
        {showSubcategory && (
          <div className='w-full px-5 py-4'>
            {/* TODO ADD DROPDOWN WHIT CATEGORIES */}
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='category'
              >
                Categoría
              </label>
              <select
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='category'
                name='category'
                onChange={handleSelectChange}
              >
                <option value=''>Selecciona una categoría</option>
                <option value='categoria1'>Categoria 1</option>
                <option value='categoria2'>Categoria 2</option>
                <option value='categoria3'>Categoria 3</option>
                {/* Agrega más opciones de categorías aquí */}
              </select>
            </div>
            {/* Subcategory inputs */}
            <InputComponent
              nameVizualization='Nombre de la subcategoría'
              name='subcategoryName'
              placeholder='Nombre de la subcategoría'
              onChange={handleInputChange}
              value={subcategoryName}
            />
            <InputComponent
              nameVizualization='Descripción de la subcategoría'
              name='subcategoryDescription'
              placeholder='Descripción de la subcategoría'
              onChange={handleInputChange}
              value={subcategoryDescription}
            />
          </div>
        )}

        <div className='flex py-5 px-3 justify-between'>
          <button
            onClick={onClose}
            className='text-custom-blue rounded-md border-2 border-custom-blue bg-white px-5 py-3'
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className='text-white bg-custom-blue rounded-md px-5 py-3'
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCreateCategory;
