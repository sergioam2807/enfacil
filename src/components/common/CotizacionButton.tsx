"use client";

import Image from "next/image";

interface Props {
  title: string;
}

export const CotizacionButton = ({ title }: Props) => {
  return (
    <button className="text-sm font-medium bg-[#FF9D28] rounded-md px-3 py-3 mx-4 flex items-center flex-grow">
      <Image
        src="/images/plus.png"
        alt="plus"
        width={24}
        height={24}
        className="mr-2"
      />
      {title}
    </button>
  );
};
