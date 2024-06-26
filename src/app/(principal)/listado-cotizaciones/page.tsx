'use client';

import {
  deleteQuote,
  getClientResponseData,
  getFullQuoteData,
} from '@/app/api/data';

import { CreateButton } from '@/app/components/common/CreateButton';
import Search from '@/app/components/common/Search';
import TitleComponent from '@/app/components/common/TitleComponent';
import ModalCreateQuote from '@/app/components/modal/ModalCreateQuote';
import QuoteTable from '@/app/components/tables/quoteTable/QuoteTable';
import BaseTableCard from '@/app/components/tables/table/BaseTableCard';
import getGroupedInfo from '@/helpers/getEnclosure';
import { useQuoteInfoStore } from '@/store/store';
import { Client, Quote } from '@/types/types';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

export default function ListadoCotizaciones() {
  const [quoteData, setQuoteData] = useState<Quote[]>([]);
  const [show, setShow] = useState(false);
  const [clientData, setClientData] = useState<Client[]>([]);
  // const {quoteFinalData,setQuoteFinalData}=useQuoteDataStore();
  const { setEnclosuresInfo } = useQuoteInfoStore();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');

      if (token) {
        getFullQuoteData(token).then((data) => {
          setQuoteData(data?.data);
        });
      }
    }
  }, []);

  useEffect(() => {
    const enclosuresInfo = getGroupedInfo(quoteData as any);
    setEnclosuresInfo(enclosuresInfo as any);
  }, [quoteData, setEnclosuresInfo]);

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
      }
    }
  };

  const handleDelete = async (id: number | null) => {
    console.log('delete id', id);
    const token = localStorage.getItem('token');
    if (token) {
      try {
        if (id !== null) {
          await deleteQuote(token, id);

          getFullQuoteData(token).then((data) => {
            setQuoteData(data?.data);
          });
        } else {
          throw new Error('ID is null');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleClose = () => {
    setShow(false);
    router.push('/cotizaciones');
  };

  return (
    <div className='pr-5 pb-5'>
      <div>
        <TitleComponent titleName={'Últimas Cotizaciones'} />
      </div>
      <div className='flex justify-between items-center pb-7'>
        <Suspense fallback={<div>Loading...</div>}>
          <Search color='#FFFFFF' />
        </Suspense>
        <div className='flex gap-4'>
          <div>
            <CreateButton
              title='Crear Cotización'
              iconSize={14}
              bgcolor='#0E436B'
              onclick={handleClick}
            />

            {show && (
              <ModalCreateQuote onClose={handleClose} clientData={clientData} />
            )}
          </div>
        </div>
      </div>
      <div className={`h-[600px] overflow-y-auto`}>
        <BaseTableCard>
          <QuoteTable quoteData={quoteData} handleDelete={handleDelete} />
        </BaseTableCard>
      </div>
    </div>
  );
}
