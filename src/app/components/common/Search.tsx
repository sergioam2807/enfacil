"use client";
import Image from "next/image";
import React, { useState } from "react";

interface Props {
  color?: string;
}

const Search = ({ color = "#EFF4FC" }) => {
  const [searchValue, setSearchValue] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = () => {
    console.log("Buscando:", searchValue);
  };

  return (
    <div className="min-w-96 relative">
      <div onClick={handleSearchClick} className="cursor-pointer">
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
