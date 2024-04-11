import { getPersonalData } from "@/app/api/getUser";
import { CreateButton } from "@/app/components/common/CreateButton";
import Search from "@/app/components/common/Search";
import TitleComponent from "@/app/components/common/TitleComponent";
import { FilterDropdown } from "@/app/components/filter/FilterDropdown";
import ModalCreatePersonal from "@/app/components/modal/ModalCreatePersonal";
import SkeletonTable from "@/app/components/skeleton/SkeletonTable";
import PersonalTable from "@/app/components/tables/personalTable/PersonalTable";
import BaseTableCard from "@/app/components/tables/table/BaseTableCard";

import Link from "next/link";
import { Suspense } from "react";

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

export default async function Personal({ searchParams }: SearchParamProps) {
  const personalData = await getPersonalData();

  const show = searchParams?.show;
  return (
    <div className="pr-5 pb-5">
      <div>
        <TitleComponent titleName={"Personal"} />
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
            <Link href="/personal?show=true">
              <CreateButton
                title="Añadir Personal"
                iconSize={14}
                bgcolor="#0E436B"
              />
            </Link>
            {show && <ModalCreatePersonal />}
          </div>
        </div>
      </div>
      <div className={`h-[600px] overflow-y-auto`}>
        <Suspense fallback={<SkeletonTable />}>
          <BaseTableCard>
            <PersonalTable personalData={personalData.data} />
          </BaseTableCard>
        </Suspense>
      </div>
    </div>
  );
}
