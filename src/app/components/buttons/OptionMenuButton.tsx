"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import editwhite from "../../../../public/images/edit.svg";
import trash from "../../../../public/images/trash.svg";

const OptionMenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className=" inline-block text-left" ref={ref}>
      <div className="flex items-center">
        <button
          type="button"
          className="inline-flex justify-center w-fit rounded-md border border-[#FFFFFF]  bg-white text-sm font-medium   
          "
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="-mr-2 ml-2 h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30 30"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 6a2 2 0 100-4 2 2 0 000 4zm0 8a2 2 0 100-4 2 2 0 000 4zm0 8a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 px-4 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 min-w-[content]">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <a
              href="#"
              className="flex gap-3 mr-2 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-fit"
              role="menuitem"
            >
              <Image src={editwhite} alt="Editar" width={18} height={18} />
              Editar
            </a>
            <a
              href="#"
              className="flex gap-2 mr-2 items-center  py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              <Image src={trash} alt="Eliminar" width={15} height={15} />
              <span>Eliminar</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptionMenuButton;
