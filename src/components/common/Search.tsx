"use client";
import Image from "next/image";
import React, { useState } from "react";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = () => {
    console.log("Buscando:", searchValue);
    // Aquí puedes realizar la búsqueda con el valor de 'searchValue'
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
        className="w-full px-3 py-2 pl-10 border rounded-md bg-[#EFF4FC] border-[#EFF4FC] focus:outline-none focus:border-[#edf0f5]"
      />
    </div>
  );
};

export default Search;
