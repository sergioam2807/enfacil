import Image from "next/image";
import close from "../../../../public/images/close.svg";
import React from "react";

const ButtonInactiveProfile = () => {
  return (
    <button className="rounded-lg py-2 px-3 bg-[#FF4D4D] flex justify-start items-center">
      <Image src={close} width={25} height={20} alt="edit" color="white" />
      <span className="text-white text-sm font-semibold pl-2">
        Deshabilitar
      </span>
    </button>
  );
};

export default ButtonInactiveProfile;
