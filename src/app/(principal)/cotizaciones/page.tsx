'use client';

import TitleComponent from '@/app/components/common/TitleComponent';
import BaseTableCard from '@/app/components/tables/table/BaseTableCard';
import TableCotizacion from '@/app/components/tables/cotizacionTable/TableCotizacion';
import TableCotizacionActual from '@/app/components/tables/cotizacionTable/TableCotizacionActual';
import { Suspense, useEffect, useState } from 'react';
import {
  getActivityTokenData,
  getEnclosureData,
  insertQuoteEnclosureActivities,
  insertQuoteEnclosures,
  updateGeneralExpenses,
} from '@/app/api/data';
import { formatPrice } from '@/helpers/capitaliizeFirstLetter';
import { useRouter } from 'next/navigation';
// import { CreateButton } from "@/app/components/common/CreateButton";
import {
  useClientQuoteStore,
  useEnclosureAdded,
  useQuotePostData,
} from '@/store/store';
import { Enclosure } from './[id]/page';
import Search from '@/app/components/common/Search';
import { useFullQuoteData, useSelectedIdStore } from '@/store/quote-store';
import TableEditCotizacionActual from '@/app/components/tables/cotizacionTable/TableEditCotizacionActual';

export default function Cotizaciones() {
  const [enclosureData, setEnclosureData] = useState<any[]>([]);
  // const [enclosureAdded, setEnclosureAdded] = useState<any[]>([]);
  const { setCombinedData, combinedData, enclosureAdded, setEnclosureAdded } =
    useEnclosureAdded();
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
  const [generalExpensesInput, setGeneralExpensesInput] = useState(
    `$${quoteTotal.generalExpenses}`
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [allEnclosureData, setAllEnclosureData] = useState(enclosureData);
  const [filteredEnclosureData, setFilteredEnclosureData] =
    useState(enclosureData);
  const { title, quoteId, clientName, clientId } = useClientQuoteStore();
  const { enclosureQuotePost } = useQuotePostData();
  const { selectedId } = useSelectedIdStore();
  const { fullQuoteData } = useFullQuoteData();
  const [isLoading, setIsLoading] = useState(true);

  const route = useRouter();

  console.log('enclosureAdded', enclosureAdded);

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
          setIsLoading(false);
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

  useEffect(() => {
    if (!enclosureAdded) {
      return;
    }

    const combinedData = enclosureAdded?.map((enclosure: any) => {
      const totalsForEnclosure = totals.find(
        (total: any) => total.id === enclosure.id
      );
      return { ...enclosure, ...totalsForEnclosure };
    });

    setCombinedData(combinedData);
  }, [enclosureAdded, totals]);

  // const combinedData = enclosureAdded.map((enclosure: any) => {
  //   const totalsForEnclosure = totals.find(
  //     (total: any) => total.id === enclosure.id
  //   );
  //   return { ...enclosure, ...totalsForEnclosure };
  // });

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
      const quoteEnclosures = enclosureAdded.map((enclosure: Enclosure) => {
        return {
          EnclosureId: enclosure.id,
          quoteId: selectedId ? selectedId : quoteId,
        };
      });

      try {
        const quoteEnclosureResponse = await insertQuoteEnclosures(
          token,
          quoteEnclosures
        );

        const quoteEnclosureActivities = quoteEnclosureResponse.data
          .map((quoteEnclosureId: number, index: number) => {
            const correspondingEnclosure = enclosureQuotePost.find(
              (enclosure: any) => enclosure.id === enclosureAdded[index].id
            );

            if (!correspondingEnclosure) {
              console.error(
                `No corresponding enclosure found for index: ${index}`
              );
              return [];
            }

            const activities = ['activityOne', 'activityTwo', 'activityThree']
              .filter(
                (activityName) =>
                  (correspondingEnclosure as any)[activityName] !== '-'
              )
              .map((activityName) => {
                const activityNameInEnclosure = (correspondingEnclosure as any)[
                  activityName
                ];
                const activity = activityMapping[activityNameInEnclosure];

                if (!activity) {
                  console.error(
                    `Activity not found: ${activityNameInEnclosure}`
                  );
                  return null;
                }

                return {
                  activityId: activity.id,
                  quoteEnclosureId: quoteEnclosureId,
                  activityMPUnitPrice: activity.manPowerUnitPricing,
                  activityMaterialsUnitPrice: activity.materialsUnitPricing,
                  activityUnits: correspondingEnclosure.unityCount || 10,
                  activityMarginPercentage: correspondingEnclosure.margin || 20,
                  activityAdvancementPercentage: 10,
                };
              })
              .filter((activity) => activity !== null);

            return activities;
          })
          .flat();

        for (const activity of quoteEnclosureActivities) {
          await insertQuoteEnclosureActivities(token, activity);
        }
        //UPDATE QUOTE GENERAL EXPENSES
        // const quoteUpdateData = {
        //   clientId: clientId,
        //   id: quoteId,
        //   title: title,
        //   generalExpenses: quoteTotal.generalExpenses,
        // };

        // try {
        //   updateGeneralExpenses(token, quoteUpdateData);
        // } catch (error) {
        //   console.error(error);
        // }
      } catch (error) {
        console.error(error);
      } finally {
        route.push('/listado-cotizaciones');
      }
    }
  };

  const handleGeneralExpensesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value.replace('$', '');

    // If the input is empty, set it to 0
    if (value === '') {
      setGeneralExpensesInput('$0');
      setQuoteTotal((prevState) => ({
        ...prevState,
        generalExpenses: 0,
        finalTotal: prevState.materials + prevState.manPower,
      }));
      return;
    }

    // Ignore non-numeric input
    if (!/^[\d.]+$/.test(value)) {
      return;
    }

    setGeneralExpensesInput(`$${value}`);

    const numberValue = parseFloat(value);

    setQuoteTotal((prevState) => {
      const generalExpenses = isNaN(numberValue)
        ? prevState.generalExpenses
        : numberValue;
      const finalTotal =
        prevState.materials + prevState.manPower + generalExpenses;
      return {
        ...prevState,
        generalExpenses: generalExpenses,
        finalTotal: finalTotal,
      };
    });
  };

  const selectedQuote = fullQuoteData.find(
    (quote: any) => quote.id === selectedId
  );

  return (
    <div className='pr-5 pb-5'>
      <div>
        <div>
          <div className='flex justify-between items-center'>
            <TitleComponent titleName={'Cotización'} />
          </div>
        </div>
        <div className='text-[#0E436B] font-semibold text-xl mb-4'>
          {!selectedId ? title : selectedQuote?.title}
        </div>
        <div className='text-[#0E436B] font-semibold text-xl mb-4'>
          Cliente: {!selectedId ? clientName : selectedQuote?.client?.name}
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
        {!isLoading && (
          <BaseTableCard>
            <TableCotizacion
              cotizacionData={allEnclosureData}
              setEnclosureAdded={setEnclosureAdded}
              enclosureAdded={enclosureAdded}
            />
          </BaseTableCard>
        )}
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
          {!selectedId ? (
            <TableCotizacionActual
              cotizacionData={combinedData}
              onTotalChange={handleTotalChange}
            />
          ) : (
            <TableEditCotizacionActual
              cotizacionData={selectedQuote}
              onTotalChange={handleTotalChange}
              id={selectedId}
            />
          )}
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
          <div className='flex justify-between'>
            <span className='text-[#0E436B] font-semibold text-md '>
              Gastos generales
            </span>
            <input
              type='text'
              value={generalExpensesInput}
              onChange={handleGeneralExpensesChange}
              className='text-[#797979] font-semibold text-md text-right border border-gray-300 focus:border-gray-500'
            />
          </div>
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
