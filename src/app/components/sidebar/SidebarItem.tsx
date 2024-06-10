"use client";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  path: string;
  icon: StaticImageData;
  title: string;
}

export const SidebarItem = ({ path, icon, title }: Props) => {
  const isSelected = usePathname() === path;
  return (
    <Link href={path}>
      <div
        className={`flex items-center py-2 px-4 bg-opacity-50  ${
          isSelected
            ? "shadow-white bg-[#C6CDE4] bg-opacity-40 rounded-lg w-40"
            : ""
        }`}
      >
        <Image src={icon} alt="logo" width={15} height={15} />
        <div className="flex flex-col pl-1">
          <span className="text-sm font-medium leading-6 text-white">
            {title}
          </span>
        </div>
      </div>
    </Link>
  );
};
