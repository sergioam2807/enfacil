import Image from "next/image";
import React from "react";

interface Props {
  type: string;
  placeholder: string;
  icon: string;
  width: number;
  height: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputLogin = ({
  type,
  placeholder,
  icon,
  width,
  height,
  value,
  onChange,
}: Props) => {
  return (
    <div className="relative w-64">
      <input
        type={type}
        placeholder={placeholder}
        className="text text-custom-blue placeholder-custom-blue font-bold mb-4 p-2 pl-10 border rounded w-full h-12"
        value={value}
        onChange={onChange}
      />
      <div className="absolute left-3 top-1/3 transform -translate-y-1/3">
        <Image src={icon} alt="icon" width={width} height={height} />
      </div>
    </div>
  );
};

export default InputLogin;
