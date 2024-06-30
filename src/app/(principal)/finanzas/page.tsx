'use client';
import { getFinancialMovements } from '@/app/api/data';
import Search from '@/app/components/common/Search';
import TitleComponent from '@/app/components/common/TitleComponent';
import ModalCreateCategory from '@/app/components/modal/ModalCreateCategory';
// import { FilterDropdown } from '@/app/components/filter/FilterDropdown';
import ModalCreateFinance from '@/app/components/modal/ModalCreateFinance';
import SkeletonTable from '@/app/components/skeleton/SkeletonTable';
import FinanceTable from '@/app/components/tables/finanzas/FinanceTable';
import BaseTableCard from '@/app/components/tables/table/BaseTableCard';
import { useReloadMovements } from '@/store/store';
import { Suspense, useEffect, useState } from 'react';

export default function Finanzas() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCategoryOpen, setModalCategoryOpen] = useState(false);
  const [financialMovements, setFinancialMovements] = useState([]);
  const { updateFinancialMovements } = useReloadMovements();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openCategoryModal = () => {
    setModalCategoryOpen(true);
  };

  const closeCategoryModal = () => {
    setModalCategoryOpen(false);
  };

  useEffect(() => {
    const fetchFinancialMovements = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      const data = await getFinancialMovements(token);
      setFinancialMovements(data?.data);
    };

    fetchFinancialMovements();
  }, [updateFinancialMovements]);

  return (
    <div className='pr-5 pb-5'>
      <TitleComponent titleName={'Ultimos Movimientos'} />
      <div className='flex justify-between items-center pb-7'>
        <div>
          <Suspense fallback={<SkeletonTable />}>
            <Search color='#FFFFFF' />
          </Suspense>
        </div>
      </div>
      <div className='pb-7'>
        <div className='flex justify-between'>
          <div className='flex gap-4'>
            {/* <div>
              <FilterDropdown />
            </div>
            <div>
              <FilterDropdown />
            </div> */}
          </div>
          <div className='flex mr-4 items-center gap-3'>
            <button
              onClick={openModal}
              className='text-custom-blue rounded-md border-2 border-custom-blue bg-white px-5 py-3'
            >
              Ingresar Movimiento
            </button>
            <button
              onClick={openCategoryModal}
              className='text-white rounded-md border-2 border-custom-blue bg-custom-blue px-5 py-3'
            >
              + Categorías
            </button>
          </div>
        </div>
        {modalOpen && (
          <ModalCreateFinance
            // quoteFinalData={quoteFinalData}
            onClose={closeModal}
          />
        )}
        {modalCategoryOpen && (
          <ModalCreateCategory onClose={closeCategoryModal} />
        )}
      </div>
      {/* <CustomScrollbar> */}
      <div className={`h-[500px] overflow-y-auto overflow-x-hidden`}>
        <BaseTableCard>
          <FinanceTable financialMovements={financialMovements} />
        </BaseTableCard>
        {/* </CustomScrollbar> */}
      </div>
    </div>
  );
}
