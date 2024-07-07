import React, { ChangeEvent, FocusEvent } from 'react';

interface Props {
  name: string;
  nameVizualization?: string;
  placeholder: string;
  value: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  isPassword?: boolean;
  disabled?: boolean;
}

const InputComponent = ({
  name,
  nameVizualization,
  placeholder,
  value,
  onChange,
  onBlur,
  isPassword = false,
  disabled,
}: Props) => {
  return (
    <div className='flex flex-col mt-4'>
      <div className='flex justify-start'>
        <span className='text-sm text-[#000E41]'>{nameVizualization}</span>
      </div>
      <input
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className='w-full mt-1 py-3 pl-2 text-sm font-medium border rounded-md focus:outline-none focus:border-[#EFF4FC] text-custom-blue'
        type={isPassword ? 'password' : 'text'}
        disabled={disabled}
      />
    </div>
  );
};

export default InputComponent;
