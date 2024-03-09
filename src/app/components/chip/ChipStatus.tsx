import React from "react";

interface IRow {
  children: React.ReactNode;
  status: string;
}
const STATUS_ACTIVE = "Activo";

const ChipStatus = ({ children, status }: IRow) => {
  return (
    <span
      className={`inline-block py-1 px-2 rounded-full border  ${
        status === STATUS_ACTIVE
          ? " text-custom-green px-5 py-2 border-custom-green"
          : " text-custom-red px-5 py-2 border-custom-red"
      }`}
    >
      {children}
    </span>
  );
};

export default ChipStatus;
