import Image from "next/image";
import React from "react";
import editwhite from "../../../../public/images/editwhite.svg";

interface Props {
  text?: string;
  icon?: any;
}

const ButtonEditProfile = ({ text = "Editar", icon = editwhite }: Props) => {
  return (
    <button className=" rounded-lg py-2 px-8 bg-[#0051CC] flex justify-around items-center">
      <Image src={icon} width={25} height={20} alt="edit" color="white" />
      <span className="text-white text-sm font-semibold pl-2">{text}</span>
    </button>
  );
};

export default ButtonEditProfile;
