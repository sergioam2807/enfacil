interface SelectComponentProps {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}

export const SelectComponent: React.FC<SelectComponentProps> = ({
  name,
  value,
  onChange,
  options,
}) => (
  <div>
    <div className='flex justify-start'>
      <label htmlFor={name} className='text-sm text-[#000E41] mt-4'>
        Unidad de medida
      </label>
    </div>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className='w-full mt-1 py-3 pl-2 text-sm font-medium border rounded-md focus:outline-none focus:border-[#EFF4FC] text-custom-blue'
    >
      <option key='default' value='' disabled>
        Selecciona una opción
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);
