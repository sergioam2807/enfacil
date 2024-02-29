import Image from "next/image";
import Link from "next/link";

interface Props {
  path: string;
  icon: string;
  title: string;
}

export const SidebarItem = ({ path, icon, title }: Props) => {
  return (
    <Link href={path}>
      <div className="flex items-center py-2 px-4">
        <Image src={`/images/${icon}.png`} alt="logo" width={15} height={15} />
        <div className="flex flex-col pl-1">
          <span className="text-sm font-medium leading-6 text-white">
            {title}
          </span>
        </div>
      </div>
    </Link>
  );
};
