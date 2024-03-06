import Image from "next/image";
import React from "react";
import editwhite from "../../../public/images/editwhite.svg";

const ButtonEditProfile = () => {
  return (
    <button className="rounded-lg py-2 px-8 bg-[#0051CC] flex justify-start items-center">
      <Image src={editwhite} width={25} height={20} alt="edit" color="white" />
      <span className="text-white text-sm font-semibold pl-2">Editar</span>
    </button>
  );
};

export default ButtonEditProfile;
