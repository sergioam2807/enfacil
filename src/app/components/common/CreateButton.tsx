"use client";

import Image from "next/image";

interface Props {
  title: string;
  bgcolor?: string;
  iconSize?: number;
}

export const CreateButton = ({
  title,
  bgcolor = "#FF9D28",
  iconSize = 24,
}: Props) => {
  return (
    <button
      style={{ backgroundColor: bgcolor }}
      className={`text-sm font-medium text-[#FFFFFF]  rounded-md px-3 py-3 mx-4 flex items-center flex-grow`}
    >
      <Image
        src="/images/plus.png"
        alt="plus"
        width={`${iconSize}`}
        height={`${iconSize}`}
        className="mr-2"
      />
      {title}
    </button>
  );
};
