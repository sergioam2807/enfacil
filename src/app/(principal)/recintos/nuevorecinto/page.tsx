'use client';
import {
  getActivityEnclosure,
  getActivityTokenData,
  postEnclosureData,
} from '@/app/api/data';
import { ActivityChip } from '@/app/components/chip/ChipSelected';
import { CreateButton } from '@/app/components/common/CreateButton';
import TitleComponent from '@/app/components/common/TitleComponent';
import InputComponent from '@/app/components/input/InputComponent';
import ActividadesEnclosureTable from '@/app/components/tables/actividadesTable/ActividadesEnclosureTable.';
import BaseTableCard from '@/app/components/tables/table/BaseTableCard';
import { capitalizeFirstLetter } from '@/helpers/capitaliizeFirstLetter';
import { useRouter } from 'next/navigation';
// import { useRouter } from "next/navigation";
import { useCallback, useState } from 'react';
import { useEffect } from 'react';

interface Enclosure {
  activitiesInEnclosure: string;
  name: string;
}

interface Activity {
  id: number;
  name: string;
  metricUnit: string;
  manPowerUnitPricing: string;
  materialsUnitPricing: string;
  materialsRecipeIds: string;
}

interface EnclosureData {
  data: Enclosure[];
}

const AñadirRecinto = () => {
  const [token, setToken] = useState<string | null>(null);
  const [activityData, setActivityData] = useState<Activity[]>([]);
  const [activitiesArray, setActivitiesArray] = useState<string[]>([]);
  const [enclosureData, setEnclosureData] = useState<EnclosureData | null>(
    null
  );
  const [selectedActivity, setSelectedActivity] = useState('');
  const [enclosure, setEnclosure] = useState({
    activitiesInEnclosure: '',
    name: '',
  });
  const navigation = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        const data = await getActivityTokenData(token);
        setActivityData(data.data);
      }
    };

    fetchData();
  }, [token]);

  const fetchActivitysData = useCallback(async () => {
    if (token) {
      const enclosureData = await getActivityEnclosure(token);
      setEnclosureData(enclosureData);

      if (
        enclosureData?.data &&
        enclosureData.data.length > 0 &&
        'activitiesInEnclosure' in enclosureData.data[0]
      ) {
        const activitiesArray =
          enclosureData.data[0].activitiesInEnclosure.split(', ');
        setActivitiesArray(activitiesArray);
      }
    }
  }, [token]);

  useEffect(() => {
    fetchActivitysData();
  }, [fetchActivitysData, token]);

  const handleActivityChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedActivity(event.target.value);
  };

  const handleAddActivity = () => {
    if (selectedActivity) {
      setEnclosure((prevForm) => {
        const newActivities = prevForm.activitiesInEnclosure
          ? prevForm.activitiesInEnclosure + ', ' + selectedActivity
          : selectedActivity;
        return {
          ...prevForm,
          activitiesInEnclosure: newActivities,
        };
      });
      setSelectedActivity('');
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnclosure((prevForm) => ({
      ...prevForm,
      name: event.target.value,
    }));
  };

  const handlePostEnclosure = async () => {
    if (token) {
      const response = await postEnclosureData(token, enclosure);
      fetchActivitysData();
      setEnclosure((prevForm) => ({
        ...prevForm,
        activitiesInEnclosure: '',
      }));
      console.log(response);
    }
    navigation.push('/recintos');
  };

  const handleRemoveActivity = (activityToRemove: string) => {
    setEnclosure((prevForm) => {
      const newActivities = prevForm.activitiesInEnclosure
        .split(', ')
        .filter((activity) => activity !== activityToRemove)
        .join(', ');
      return {
        ...prevForm,
        activitiesInEnclosure: newActivities,
      };
    });
  };

  return (
    <div className='pr-5 pb-5'>
      <div>
        <TitleComponent titleName={'Recintos'} />
      </div>
      <div className='flex justify-between items-center pb-5'>
        <div className='w-1/3'>
          <p className='text-[#0E436B] text-lg font-semibold'>
            Añade un recinto
          </p>
          <div>
            <InputComponent
              name='enclosure'
              value={enclosure.name}
              onChange={handleTitleChange}
              placeholder='Nombre Recinto'
            />
          </div>
        </div>
        <div className='w-1/3'>
          <p className='text-[#0E436B] text-lg font-semibold'>
            Selecciona una actividad
          </p>
          <div className='flex items-end gap-4'>
            <div className='mt-4 flex-grow'>
              <select
                name='activity'
                onChange={handleActivityChange}
                className='w-full mt-1 py-3 pl-2 text-sm font-medium border rounded-md focus:outline-none focus:border-[#EFF4FC]'
              >
                <option value=''>Selecciona una actividad</option>
                {activityData?.map((activity, index) => (
                  <option
                    key={index}
                    value={activity.name || ''}
                    className='w-full mt-1 py-3 pl-2 text-sm font-medium border rounded-md focus:outline-none focus:border-[#EFF4FC]'
                  >
                    {activity.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleAddActivity}
              className='py-2 px-4 mb-1 bg-custom-green text-white rounded-md'
            >
              +
            </button>
          </div>
        </div>
        <div className='flex gap-4'>
          <div>
            <CreateButton
              onclick={handlePostEnclosure}
              title='Finalizar'
              iconSize={14}
              bgcolor='#0E436B'
            />
          </div>
        </div>
      </div>

      <div className='mt-1'>
        {enclosure.activitiesInEnclosure.split(', ').map((activity, index) => {
          if (activity.trim() !== '') {
            return (
              <ActivityChip
                key={index}
                activity={activity}
                onRemove={handleRemoveActivity}
              />
            );
          }
          return null;
        })}
      </div>
      <div className={`h-[600px] overflow-y-auto`}>
        {enclosure
          ? (() => {
              let activitiesArray = enclosure.activitiesInEnclosure
                ? enclosure.activitiesInEnclosure
                    .split(',')
                    .map((activity) => activity.trim())
                : [];
              let filteredActivityData = activityData.filter(
                (activity: Activity) => activitiesArray.includes(activity.name)
              );

              return (
                <div>
                  <TitleComponent
                    titleName={capitalizeFirstLetter(enclosure.name)}
                  />
                  <BaseTableCard>
                    <ActividadesEnclosureTable
                      activityData={{ data: filteredActivityData }}
                    />
                  </BaseTableCard>
                </div>
              );
            })()
          : null}
      </div>
    </div>
  );
};

export default AñadirRecinto;
