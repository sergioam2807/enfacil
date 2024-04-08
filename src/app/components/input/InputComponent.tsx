import React, { ChangeEvent } from "react";

interface Props {
  name: string;
  nameVizualization: string;
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputComponent = ({
  name,
  nameVizualization,
  placeholder,
  value,
  onChange,
}: Props) => {
  return (
    <div className="flex flex-col mt-4">
      <div className="flex justify-start">
        <span className="text-sm text-[#000E41]">{nameVizualization}</span>
      </div>
      <input
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full mt-1 py-3 pl-2 text-sm font-medium border rounded-md focus:outline-none focus:border-[#EFF4FC]"
      />
    </div>
  );
};

export default InputComponent;
