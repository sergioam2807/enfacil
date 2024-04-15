import { CreateButton } from "@/app/components/common/CreateButton";
import Search from "@/app/components/common/Search";
import TitleComponent from "@/app/components/common/TitleComponent";
import { FilterDropdown } from "@/app/components/filter/FilterDropdown";
import Modal from "@/app/components/modal/Modal";
import ActionTableComponent from "@/app/components/tables/actionTable/ActionTable";
import BaseTableCard from "@/app/components/tables/table/BaseTableCard";
import Link from "next/link";
import { Suspense } from "react";
import SkeletonTable from "@/app/components/skeleton/SkeletonTable";

import { getUserData } from "@/app/api/getUser";
import { User } from "@/types/types";

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

export default async function Usuarios({ searchParams }: SearchParamProps) {
  const usersData = await getUserData();

  const show = searchParams?.show;
  const search = searchParams?.search || "";

  let filteredData;
  if (search) {
    filteredData = usersData.data.filter((user: User) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  } else {
    filteredData = usersData;
  }

  return (
    <div className="pr-5 pb-5">
      <div>
        <TitleComponent titleName={"Usuarios"} />
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
            <Link href="/usuarios?show=true">
              <CreateButton
                title="Crear Usuario"
                iconSize={14}
                bgcolor="#0E436B"
              />
            </Link>
            {show && <Modal />}
          </div>
        </div>
      </div>
      <div className={`h-[600px] overflow-y-auto`}>
        <Suspense fallback={<SkeletonTable />}>
          <BaseTableCard>
            <ActionTableComponent searchData={filteredData} />
          </BaseTableCard>
        </Suspense>

        {/* </CustomScrollbar> */}
      </div>
    </div>
  );
}
