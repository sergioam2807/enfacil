"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import editwhite from "../../../../public/images/edit.svg";
import trash from "../../../../public/images/trash.svg";
import view from "../../../../public/images/viewgray.svg";
import { useRouter } from "next/navigation";
import ModalEditMaterial from "../modal/ModalEditMaterial";
import ModalEditActivity from "../modal/ModalEditActivity";
import { Activity, Material } from "@/types/types";

interface Props {
  id: number | string;
  deleteURL: string;
  byIdURL: string;
  type: string;
  details?: boolean;
}

const initialUserState: Activity | Material | null = null;

const OptionMenuMaterialsButton = ({
  id,
  deleteURL,
  byIdURL,
  type,
  details,
}: Props) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
  const [editData, setEditData] = useState<Activity | Material | null>(
    initialUserState
  );
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
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

  const fetchData = async () => {
    const token = localStorage.getItem("token");

    const url = id
      ? `${process.env.NEXT_PUBLIC_BASE_URL}${byIdURL}?id=${id}`
      : `${process.env.NEXT_PUBLIC_BASE_URL}${byIdURL}`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const resData = await res.json();

    if (resData.data && typeof resData.data === "object") {
      setIsUserDataLoaded(true);
      setEditData(resData?.data);
    } else {
      console.error("User data is not an object", resData.data);
    }
  };

  function handleEdit() {
    fetchData();
    setShowEditModal(true);
  }

  function handleCloseEdit() {
    setShowEditModal(false);
  }

  async function handleDelete(id: string) {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}${deleteURL}?id=${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to delete user");
    }

    const data = await res.json();
    console.log("Deleted successfully", data);
    router.refresh();
  }

  const renderModal = () => {
    switch (type) {
      case "materiales":
        return (
          <ModalEditMaterial
            handleCloseEdit={handleCloseEdit}
            materialData={editData as Material}
          />
        );
      case "actividades":
        return (
          <ModalEditActivity
            handleCloseEdit={handleCloseEdit}
            activityData={editData as Activity}
          />
        );
      default:
        return null;
    }
  };
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
            {details && (
              <a
                href="#"
                className="flex gap-2 mr-2 items-center  py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                <Image src={view} alt="Eliminar" width={15} height={15} />
                <span>Detalles</span>
              </a>
            )}

            <button
              onClick={handleEdit}
              className="flex gap-3 mr-2 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-fit"
              role="menuitem"
            >
              <Image src={editwhite} alt="Editar" width={18} height={18} />
              Editar
            </button>
            {showEditModal && isUserDataLoaded && renderModal()}
            <button
              onClick={() => handleDelete(id.toString())}
              className="flex gap-2 mr-2 items-center  py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              <Image src={trash} alt="Eliminar" width={15} height={15} />
              <span>Eliminar</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptionMenuMaterialsButton;
