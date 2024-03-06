import React from "react";

interface Props {
  name: string;
  placeholder: string;
}

const InputComponent = ({ name, placeholder }: Props) => {
  return (
    <div className="flex flex-col mt-4">
      <div className="flex justify-start">
        <span className="text-sm text-[#000E41]">{name}</span>
      </div>

      <input
        placeholder={placeholder}
        className="className={`w-full mt-1 py-3 pl-2 text-sm font-medium border rounded-md focus:outline-none focus:border-[#EFF4FC]`"
      />
    </div>
  );
};

export default InputComponent;
