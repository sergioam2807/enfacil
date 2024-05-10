"use client";
import Search from "@/app/components/common/Search";
import TitleComponent from "@/app/components/common/TitleComponent";
import { FilterDropdown } from "@/app/components/filter/FilterDropdown";
import ModalCreateFinance from "@/app/components/modal/ModalCreateFinance";
import SkeletonTable from "@/app/components/skeleton/SkeletonTable";
import FinanceTable from "@/app/components/tables/finanzas/FinanceTable";
import BaseTableCard from "@/app/components/tables/table/BaseTableCard";
import { Suspense, useState } from "react";

export default function Finanzas() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="pr-5 pb-5">
      <TitleComponent titleName={"Ultimos Movimientos"} />
      <div className="flex justify-between items-center pb-7">
        <div>
          <Suspense fallback={<SkeletonTable />}>
            <Search color="#FFFFFF" />
          </Suspense>
        </div>
      </div>
      <div className="pb-7">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <div>
              <FilterDropdown />
            </div>
            <div>
              <FilterDropdown />
            </div>
          </div>
          <div className="flex mr-4 items-center">
            <button
              onClick={openModal}
              className="text-custom-blue rounded-md border-2 border-custom-blue bg-white px-5 py-3"
            >
              Ingresar Movimiento
            </button>
          </div>
        </div>
        {modalOpen && (
          <ModalCreateFinance
            // quoteFinalData={quoteFinalData}
            onClose={closeModal}
          />
        )}
      </div>
      {/* <CustomScrollbar> */}
      <div className={`h-[500px] overflow-y-auto overflow-x-hidden`}>
        <BaseTableCard>
          <FinanceTable />
        </BaseTableCard>
        {/* </CustomScrollbar> */}
      </div>
    </div>
  );
}
