import { getMaterialsData } from "@/app/api/getUser";
import { CreateButton } from "@/app/components/common/CreateButton";
import Search from "@/app/components/common/Search";
import TitleComponent from "@/app/components/common/TitleComponent";
import { FilterDropdown } from "@/app/components/filter/FilterDropdown";
import Modal from "@/app/components/modal/Modal";
import ModalAddMaterial from "@/app/components/modal/ModalAddMaterial";
import TableMaterial from "@/app/components/tables/materialTable/TableMaterial";
import BaseTableCard from "@/app/components/tables/table/BaseTableCard";
import { Material } from "@/types/types";

import Link from "next/link";
import { Suspense } from "react";

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

export default async function Materiales({ searchParams }: SearchParamProps) {
  const materialData = await getMaterialsData();

  const search = searchParams?.search || "";

  let filteredData;
  if (search) {
    filteredData = materialData.data.filter((user: Material) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  } else {
    filteredData = materialData;
  }

  const show = searchParams?.show;
  return (
    <div className="pr-5 pb-5">
      <div>
        <TitleComponent titleName={"Materiales"} />
      </div>
      <div className="flex justify-between items-center pb-7">
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <Search color="#FFFFFF" />
          </Suspense>
        </div>
        <div className="flex gap-4">
          <div>
            <FilterDropdown />
          </div>
          <div>
            <Link href="/materiales?show=true">
              <CreateButton
                title="Añadir Material"
                iconSize={14}
                bgcolor="#0E436B"
              />
            </Link>
            {show && <ModalAddMaterial />}
          </div>
        </div>
      </div>
      <div className={`h-[600px] overflow-y-auto`}>
        <BaseTableCard>
          <TableMaterial materialData={filteredData} />
        </BaseTableCard>
      </div>
    </div>
  );
}
