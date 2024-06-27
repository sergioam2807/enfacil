import React from "react";

interface IRow {
  status: string;
}


const ChipStatus = ({ status ='true' }: IRow) => {
  return (
    <span
      className={`inline-block py-1 px-2 rounded-full border  ${
        status 
          ? " text-custom-green px-5 py-2 border-custom-green"
          : " text-custom-red px-5 py-2 border-custom-red"
      }`}
    >
   {status ? "Activo" : "Inactivo"}
    </span>
  );
};

export default ChipStatus;
