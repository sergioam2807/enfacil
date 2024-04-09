"use client";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  color?: string;
}

const Search = ({ color = "#EFF4FC" }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    if (event.target.value) {
      params.set("search", event.target.value);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params}`);
  };

  return (
    <div className="min-w-96 relative">
      <div className="cursor-pointer">
        <Image
          src="/images/search.svg"
          alt="Search Icon"
          width={24}
          height={24}
          className="absolute top-1/2 left-3 transform -translate-y-1/2"
        />
      </div>
      <input
        type="text"
        placeholder="Buscar..."
        onChange={handleSearchChange}
        style={{ backgroundColor: `${color}`, borderColor: `${color}` }}
        className={`w-full px-3 py-2 pl-10 border rounded-md  focus:outline-none focus:border-[#EFF4FC]`}
      />
    </div>
  );
};

export default Search;
