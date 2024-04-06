import { getPersonalData } from "@/app/api/data";
import { CreateButton } from "@/app/components/common/CreateButton";
import Search from "@/app/components/common/Search";
import TitleComponent from "@/app/components/common/TitleComponent";
import { FilterDropdown } from "@/app/components/filter/FilterDropdown";
import Modal from "@/app/components/modal/Modal";
import PersonalTable from "@/app/components/tables/personalTable/PersonalTable";
import BaseTableCard from "@/app/components/tables/table/BaseTableCard";

import Link from "next/link";

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
          <Search color="#FFFFFF" />
        </div>
        <div className="flex gap-4">
          <div>
            <FilterDropdown />
          </div>
          <div>
            <Link href="/usuarios?show=true">
              <CreateButton
                title="Añadir Personal"
                iconSize={14}
                bgcolor="#0E436B"
              />
            </Link>
            {show && <Modal />}
          </div>
        </div>
      </div>
      <div className={`h-[600px] overflow-y-auto`}>
        <BaseTableCard>
          <PersonalTable personalData={personalData.data} />
        </BaseTableCard>
        {/* </CustomScrollbar> */}
      </div>
    </div>
  );
}
