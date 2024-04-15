"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { capitalizeFirstLetter } from "@/helpers/capitaliizeFirstLetter";

interface BreadcrumbsProps {
  nameMapping?: { [key: string]: string };
}
const Breadcrumbs = ({ nameMapping = {} }: BreadcrumbsProps) => {
  const pathname = usePathname();
  const pathnames = pathname.split("/").filter((path) => path);
  return (
    <div>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        const displayValue = nameMapping[value] || capitalizeFirstLetter(value);

        return last ? (
          <span key={to} className="text-custom-blue font-bold">
            {displayValue}
          </span>
        ) : (
          <Link className="font-medium" href={to} key={to}>
            {displayValue}
            {" > "}
          </Link>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
