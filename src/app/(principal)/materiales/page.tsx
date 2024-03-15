import { getClientData } from "@/app/api/data";
import { CreateButton } from "@/app/components/common/CreateButton";
import Search from "@/app/components/common/Search";
import TitleComponent from "@/app/components/common/TitleComponent";
import { FilterDropdown } from "@/app/components/filter/FilterDropdown";
import Modal from "@/app/components/modal/Modal";
import ModalAddMaterial from "@/app/components/modal/ModalAddMaterial";
import TableMaterial from "@/app/components/tables/materialTable/TableMaterial";
import BaseTableCard from "@/app/components/tables/table/BaseTableCard";

import Link from "next/link";

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

export default async function Materiales({ searchParams }: SearchParamProps) {
  const clientData = await getClientData();

  const show = searchParams?.show;
  return (
    <div className="pr-5 pb-5">
      <div>
        <TitleComponent titleName={"Materiales"} />
      </div>
      <div className="flex justify-between items-center pb-7">
        <div>
          <Search color="#FFFFFF" />
        </div>
        <div className="flex gap-4">
          <div>
            <FilterDropdown />
            {/* TODO: CHANGE TO DATE DROPDOWN */}
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
          <TableMaterial />
        </BaseTableCard>
        {/* </CustomScrollbar> */}
      </div>
    </div>
  );
}
