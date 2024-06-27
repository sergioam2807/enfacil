import React from 'react';
import TableHead from '../../common/TableHead';
import TableCell from '../../common/TableCell';
import { formatDate, formatPrice } from '@/helpers/capitaliizeFirstLetter';
import { Quote } from '@/types/types';
import Link from 'next/link';
import { useQuoteStore } from '@/store/store';
import Image from 'next/image';
import trash from '../../../../../public/images/trash.svg';

interface quoteProps {
  quoteData: { data: Quote[] } | Quote[];
  handleDelete: (id: number | null) => void;
}

export type MappedQuote = {
  id: number | null;
  projectName: string;
  clientName: string;
  quote_date: string | undefined;
  totalManPowerUnitPricing: number | string;
  totalMaterialsPricing: number | string;
  finalPrice: number | string;
};

const QuoteTable = ({ quoteData, handleDelete }: quoteProps) => {
  const { setQuote } = useQuoteStore();

  if (!quoteData || (Array.isArray(quoteData) && quoteData.length === 0)) {
    return (
      <div className='w-full text-center py-10'>
        <p className='text-xl text-custom-blue'>No hay datos disponibles</p>
      </div>
    );
  }

  const data = Array.isArray(quoteData) ? quoteData : quoteData?.data || [];

  const mappedData = data.map((item) => ({
    id: item?.id,
    projectName: item.title,
    clientName: item.client?.name,
    quote_date: item.client?.created,
    totalManPowerUnitPricing: item?.totalMPUnitPrice,
    totalMaterialsPricing: item?.totalMaterialsUnitPrice,
    finalPrice: item?.totalMargin,
  }));

  return (
    <table className='w-full table-auto'>
      <thead>
        <tr className='text-[#0E436B] font-semibold text-sm'>
          <th className='text-left text-base pl-10 py-2'>Proyecto</th>
          <th className='text-left text-base pl-10 py-2'>Cliente</th>
          <TableHead>F.cotización</TableHead>
          <TableHead>Total mano de obra</TableHead>
          <TableHead>Total materiales</TableHead>
          <TableHead>Total final</TableHead>
          <TableHead> </TableHead>
        </tr>
      </thead>
      <tbody>
        {mappedData.map((row: MappedQuote) => (
          <tr
            key={row?.id}
            className='text-[#797979] font-medium text-sm border-t border-[#EAEAEA]'
          >
            <TableCell clickable={true}>
              <Link
                href={`/cotizaciones/${row?.id}`}
                className='text-left text-base pl-10 py-2'
                onClick={() =>
                  setQuote({
                    id: row?.id?.toString() ?? '',
                    projectName: row?.projectName,
                    quote_date: formatDate(row?.quote_date ?? ''),
                    totalManPowerUnitPricing: Number(
                      row?.totalManPowerUnitPricing
                    ),
                    totalMaterialsPricing: Number(row?.totalMaterialsPricing),
                    finalPrice: Number(row?.finalPrice),
                  })
                }
              >
                {row?.projectName ?? '-'}
              </Link>
            </TableCell>
            <td className='text-left text-base pl-10 py-2'>
              {row?.clientName ?? '-'}
            </td>
            <TableCell>{formatDate(row?.quote_date ?? '') ?? '-'}</TableCell>

            <TableCell>
              {formatPrice(Number(row?.totalManPowerUnitPricing)) ?? '-'}
            </TableCell>
            <TableCell>
              {formatPrice(Number(row?.totalMaterialsPricing)) ?? '-'}
            </TableCell>
            <TableCell>{formatPrice(Number(row?.finalPrice)) ?? '-'}</TableCell>
            <TableCell>
              <button onClick={() => handleDelete(row.id)}>
                {' '}
                <Image src={trash} alt='Eliminar' width={15} height={15} />
              </button>
            </TableCell>
            <td className='text-left text-base'></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default QuoteTable;
