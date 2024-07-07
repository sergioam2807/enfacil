'use client';

import TitleComponent from '@/app/components/common/TitleComponent';
import BaseTableCard from '@/app/components/tables/table/BaseTableCard';
import TableCotizacion from '@/app/components/tables/cotizacionTable/TableCotizacion';
import TableCotizacionActual from '@/app/components/tables/cotizacionTable/TableCotizacionActual';
import { Suspense, useEffect, useState } from 'react';
import {
  getActivityTokenData,
  getEnclosureData,
  postQuoteEnclosure,
  postQuoteEnclosuresMultipleActivities,
  postQuoteWhitEnclosureData,
} from '@/app/api/data';
import { formatPrice } from '@/helpers/capitaliizeFirstLetter';
import { useRouter } from 'next/navigation';
// import { CreateButton } from "@/app/components/common/CreateButton";
import { useClientQuoteStore, useQuotePostData } from '@/store/store';
import { Enclosure } from './[id]/page';
import Search from '@/app/components/common/Search';
import { act } from 'react-dom/test-utils';

export default function Cotizaciones() {
  const [enclosureData, setEnclosureData] = useState<any[]>([]);
  const [enclosureAdded, setEnclosureAdded] = useState<any[]>([]);
  const [activityData, setActivityData] = useState<any[]>([]);
  const [totals, setTotals] = useState<
    { manPowerTotal: number; materialsTotal: number }[]
  >([]);
  const [quoteTotal, setQuoteTotal] = useState({
    materials: 0,
    manPower: 0,
    generalExpenses: 0,
    finalTotal: 0,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [allEnclosureData, setAllEnclosureData] = useState(enclosureData);
  const [filteredEnclosureData, setFilteredEnclosureData] =
    useState(enclosureData);
  const { clientId, title, quoteId, clientName } = useClientQuoteStore();
  const { enclosureQuotePost } = useQuotePostData();

  const route = useRouter();

  console.log('activityData', activityData);

  const handleData = (data: any) => {
    setEnclosureAdded(data);
  };

  const handleSearchChange = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const handleTotalChange = (totalsQuote: {
    materials: number;
    manPower: number;
    generalExpenses: number;
    finalTotal: number;
  }) => {
    setQuoteTotal(totalsQuote);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');

      if (token) {
        getEnclosureData(token).then((data) => {
          setEnclosureData(data?.data);
          setAllEnclosureData(data?.data);
          setFilteredEnclosureData(data?.data);
        });

        const fetchData = async () => {
          const data = await getActivityTokenData(token);
          setActivityData(data.data);
        };

        fetchData();
      }
    }
  }, []);

  useEffect(() => {
    //Seach data into enclosureData
    const results = allEnclosureData.filter((enclosure) =>
      enclosure.name.toLowerCase().includes(searchTerm)
    );

    setFilteredEnclosureData(results);
  }, [searchTerm]);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const clientName =
  //       localStorage.getItem("selectedClientName") || "Nombre del cliente";
  //     console.log("clientName", clientName);
  //     setClientName(clientName);
  //   }
  // }, []);

  // useEffect(() => {
  //   const handleStorageChange = (e: StorageEvent) => {
  //     if (e.key === "selectedClientName") {
  //       setClientName(e.newValue || "Nombre del cliente");
  //     }
  //   };

  //   window.addEventListener("storage", handleStorageChange);

  //   return () => {
  //     window.removeEventListener("storage", handleStorageChange);
  //   };
  // }, []);

  useEffect(() => {
    const newEnclosureData = enclosureData?.map((enclosure: any) => {
      let manPowerTotal = 0;
      let materialsTotal = 0;

      const activityNames = enclosure?.activitiesInEnclosure?.split(', ');

      activityNames?.forEach((name: string) => {
        const activity = activityData.find(
          (activity) => activity.name.trim() === name.trim()
        );
        if (activity) {
          manPowerTotal += activity.manPowerUnitPricing;
          materialsTotal += activity.materialsUnitPricing;
        }
      });

      return { ...enclosure, manPowerTotal, materialsTotal };
    });

    setTotals(newEnclosureData);
  }, [activityData]);

  const combinedData = enclosureAdded.map((enclosure: any) => {
    const totalsForEnclosure = totals.find(
      (total: any) => total.id === enclosure.id
    );
    return { ...enclosure, ...totalsForEnclosure };
  });

  //TODO: Refactor this

  // useEffect(() => {
  //   const handleUnload = () => {
  //     localStorage.removeItem("quoteData");
  //   };

  //   window.addEventListener("beforeunload", handleUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleUnload);
  //   };
  // }, []);

  const activityMapping = activityData.reduce((map, activity) => {
    map[activity.name] = activity;
    return map;
  }, {});

  const handleFinishQuote = async () => {
    const token = localStorage.getItem('token');
    const quoteDataItem = localStorage.getItem('quoteData');

    if (!quoteDataItem) {
      console.error('quoteData not found in localStorage');
      return;
    }

    const quoteData = JSON.parse(quoteDataItem);
    if (token && quoteData) {
      const storedData = JSON.parse(localStorage.getItem('quoteData') || '{}');
      const quoteWithEnclosure = {
        quote: {
          title: title,
          clientId: clientId,
        },
        quoteEnclosures: enclosureAdded.map((enclosure: Enclosure) => {
          // Find the corresponding enclosure from the enclosureQuotePost data
          const correspondingEnclosure = enclosureQuotePost.find(
            (data: any) => data.id === enclosure.id
          );
          // Map the activities of the enclosure
          const activities = ['activityOne', 'activityTwo', 'activityThree']
            .filter((activityName) => (enclosure as any)[activityName] !== '-')
            .map((activityName) => {
              const activity =
                activityMapping[(enclosure as any)[activityName]];

              return {
                quoteEnclosureId: 0,
                activityId: activity.id,
                activityMPUnitPrice: activity.manPowerUnitPricing,
                activityMaterialsUnitPrice: activity.materialsUnitPricing,
                activityUnits: correspondingEnclosure?.unityCount,
                activityMarginPercentage: correspondingEnclosure?.margin,
                activityAdvancementPercentage: 10,
              };
            });

          return {
            quoteId: quoteId,
            enclosureID: enclosure.id,
            quoteEnclosureActivities: activities,
          };
        }),
      };
      try {
        const data = await postQuoteWhitEnclosureData(
          token,
          quoteWithEnclosure
        );
        console.log(data);
      } catch (error) {
        console.error(error);
      } finally {
        route.push('/listado-cotizaciones');
      }
    }
  };

  console.log('filteredEnclosureData', filteredEnclosureData);

  return (
    <div className='pr-5 pb-5'>
      <div>
        <div>
          <div className='flex justify-between items-center'>
            <TitleComponent titleName={'Cotización'} />
          </div>
        </div>
        <div className='text-[#0E436B] font-semibold text-xl mb-4'>{title}</div>
        <div className='text-[#0E436B] font-semibold text-xl mb-4'>
          Cliente: {clientName}
        </div>
        <div className='bg-white mb-7  w-2/3'>
          <Suspense fallback={<span>Cargando...</span>}>
            <Search
              placeholder='Buscar Recinto'
              color='white'
              onSearchChange={handleSearchChange}
            />
          </Suspense>
        </div>
      </div>
      <div className={`h-[300px] overflow-y-auto`}>
        <BaseTableCard>
          <TableCotizacion
            cotizacionData={filteredEnclosureData}
            onData={handleData}
          />
        </BaseTableCard>
      </div>

      <div className='flex justify-between items-center'>
        <TitleComponent titleName={'Cotización actual'} />
        {/* <div className="flex text-[#797979] bg-white px-4 py-2 font-semibold items-center text-md gap-2">
          <input type="checkbox" className="border-[#49454F]" />
          Aplicar a todos
        </div> */}
      </div>
      <div className={`h-[300px] overflow-y-auto`}>
        <BaseTableCard>
          <TableCotizacionActual
            cotizacionData={combinedData}
            onTotalChange={handleTotalChange}
          />
        </BaseTableCard>
      </div>
      <div>
        <div className='flex flex-col bg-[#FFFFFF]  mt-8 rounded-lg w-full h-fit py-8 px-6 gap-4'>
          <div>
            <span className='text-[#0E436B] font-semibold text-xl '>
              Resumen
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-[#0E436B] font-semibold text-md '>
              Total materiales
            </span>
            <span className='text-[#797979] font-semibold text-md '>
              {formatPrice(quoteTotal.materials)}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-[#0E436B] font-semibold text-md '>
              Total mano de obra
            </span>
            <span className='text-[#797979] font-semibold text-md '>
              {formatPrice(quoteTotal.manPower)}
            </span>
          </div>
          {/*<div className="flex justify-between">
            <span className="text-[#0E436B] font-semibold text-md ">
              Gastos generales
            </span>
            <span className="text-[#797979] font-semibold text-md ">
              {formatPrice(quoteTotal.generalExpenses)}
            </span>
  </div>*/}
          <div className='flex justify-between'>
            <span className='text-[#0E436B] font-semibold text-md '>
              Total Final
            </span>
            <span className='text-[#797979] font-semibold text-md '>
              {formatPrice(quoteTotal.finalTotal)}
            </span>
          </div>
        </div>
        <div className='w-full flex justify-end py-6'>
          <button
            onClick={handleFinishQuote}
            className='bg-custom-blue p-3 flex rounded-md text-white h-fit'
          >
            Finalizar cotización
          </button>
        </div>
      </div>
    </div>
  );
}
