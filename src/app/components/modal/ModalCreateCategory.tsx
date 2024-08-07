'use client';
import React, { useState } from 'react';
import TitleComponent from '../common/TitleComponent';
import InputComponent from '../input/InputComponent';
import ciclebutton from '../../../../public/images/circlebutton.svg';
import Image from 'next/image';
import {
  getCategory,
  postCategoryData,
  postSubCategoryData,
} from '@/app/api/data';

interface ModalCreateCategoryProps {
  onClose: () => void;
}
const ModalCreateCategory = ({ onClose }: ModalCreateCategoryProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [showSubcategory, setShowSubcategory] = useState(false);
  const [subcategoryName, setSubcategoryName] = useState('');
  const [subcategoryDescription, setSubcategoryDescription] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  const [categories, setCategories] = useState([]);

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
        setSelectedCategoryId(value);
        break;
      default:
        break;
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (showSubcategory) {
      const subcategoryData = {
        name: subcategoryName,
        description: subcategoryDescription,
        financialCategoryId: selectedCategoryId,
      };
      if (token) {
        try {
          const data = await postSubCategoryData(token, subcategoryData);
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error('No token found');
      }
    } else {
      const categoryData = {
        name: name,
        description: description,
        type: 'I',
      };
      if (token) {
        try {
          const data = await postCategoryData(token, categoryData);
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error('No token found');
      }
    }
  };

  const handleAddSubcategoryClick = async () => {
    setShowSubcategory(!showSubcategory);

    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await getCategory(token);
        if (response.success && Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          console.error('Data is not an array');
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('No token found');
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
            onClick={handleAddSubcategoryClick}
          >
            Agregar Subcategoria
            <Image src={ciclebutton} alt='edit' width={23} height={23} />
          </button>
        </div>
        {showSubcategory && (
          <div className='w-full px-5 py-4'>
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
                {categories.map((category: any) => (
                  <option key={category?.id} value={category?.id}>
                    {category?.name}
                  </option>
                ))}
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
