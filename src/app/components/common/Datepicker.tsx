import { useDateStore } from '@/store/store';
import React, { useState, useEffect } from 'react';

const MONTH_NAMES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];
const DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const Datepicker = () => {
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [datepickerValue, setDatepickerValue] = useState('');
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [no_of_days, setNo_of_days] = useState<number[]>([]);
  const [blankdays, setBlankdays] = useState<number[]>([]);
  const { setSelectedDate } = useDateStore();

  useEffect(() => {
    initDate();
    getNoOfDays();
  }, [month, year]);

  const initDate = () => {
    let today = new Date();
    setDatepickerValue(
      new Date(year, month, today.getDate()).toLocaleDateString('es-ES')
    );
  };

  const isToday = (date: any) => {
    const today = new Date();
    const d = new Date(year, month, date);

    return today.toDateString() === d.toDateString() ? true : false;
  };

  const getDateValue = (date: any) => {
    let selectedDate = new Date(year, month, date);
    setDatepickerValue(
      selectedDate.toLocaleDateString('es-US', {
        // weekday: "long",
        // day: "2-digit",
        // year: "2-digit",
        // month: "short",
      })
    );

    let formattedDate = selectedDate.toISOString();

    setSelectedDate(formattedDate);

    setShowDatepicker(false);
  };

  const getNoOfDays = () => {
    let daysInMonth = new Date(year, month + 1, 0).getDate();

    // find where to start calendar day of week
    let dayOfWeek = new Date(year, month).getDay();
    let blankdaysArray = [];
    for (var i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }

    let daysArray = [];
    for (var i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    setBlankdays(blankdaysArray);
    setNo_of_days(daysArray);
  };
  return (
    <div>
      <div className='container mx-auto  md:py-5'>
        <div className='flex justify-start'>
          <span className='text-sm text-[#000E41]'>Selecciona una fecha</span>

          <div className='relative'>
            <input type='hidden' name='date' />
            <input
              type='text'
              readOnly
              value={datepickerValue}
              onClick={() => setShowDatepicker(!showDatepicker)}
              className='w-full pl-4 pr-10  leading-none rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium'
              placeholder='Select date'
            />

            {showDatepicker && (
              <div
                className='bg-white mt-12 rounded-lg shadow p-4 absolute top-0 left-0'
                style={{ width: '17rem' }}
              >
                <div className='flex justify-between items-center mb-2'>
                  <div>
                    <span className='text-lg font-bold text-gray-800'>
                      {MONTH_NAMES[month]}
                    </span>
                    <span className='ml-1 text-lg text-gray-600 font-normal'>
                      {year}
                    </span>
                  </div>
                  <div>
                    <button
                      type='button'
                      className={`transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full ${
                        month == 0 && 'cursor-not-allowed opacity-25'
                      }`}
                      disabled={month == 0}
                      onClick={() => {
                        setMonth(month - 1);
                        getNoOfDays();
                      }}
                    >
                      {'<'}
                    </button>
                    <button
                      type='button'
                      className={`transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full ${
                        month == 11 && 'cursor-not-allowed opacity-25'
                      }`}
                      disabled={month == 11}
                      onClick={() => {
                        setMonth(month + 1);
                        getNoOfDays();
                      }}
                    >
                      {'>'}
                    </button>
                  </div>
                </div>

                <div className='flex flex-wrap mb-3 -mx-1'>
                  {DAYS.map((day, index) => (
                    <div
                      key={index}
                      style={{ width: '14.26%' }}
                      className='px-1'
                    >
                      <div className='text-gray-800 font-medium text-center text-xs'>
                        {day}
                      </div>
                    </div>
                  ))}
                </div>

                <div className='flex flex-wrap -mx-1'>
                  {blankdays.map((blankday, index) => (
                    <div
                      key={index}
                      style={{ width: '14.28%' }}
                      className='text-center border p-1 border-transparent text-sm'
                    ></div>
                  ))}
                  {no_of_days.map((date, dateIndex) => (
                    <div
                      key={dateIndex}
                      style={{ width: '14.28%' }}
                      className='px-1 mb-1'
                    >
                      <div
                        onClick={() => getDateValue(date)}
                        className={`cursor-pointer text-center text-sm leading-none rounded-full leading-loose transition ease-in-out duration-100 ${
                          isToday(date)
                            ? 'bg-blue-500 text-white'
                            : 'text-gray-700 hover:bg-blue-200'
                        }`}
                      >
                        {date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Datepicker;
