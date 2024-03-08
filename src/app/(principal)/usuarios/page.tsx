import { getUserData } from "@/api/data";
import { CreateButton } from "@/components/common/CreateButton";
import Search from "@/components/common/Search";
import TitleComponent from "@/components/common/TitleComponent";
import { FilterDropdown } from "@/components/filter/FilterDropdown";
import Modal from "@/components/modal/Modal";
import ActionTableComponent from "@/components/tables/actionTable/ActionTable";
import BaseTableCard from "@/components/tables/table/BaseTableCard";
import Link from "next/link";

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

export default async function Usuarios({ searchParams }: SearchParamProps) {
  const userData = await getUserData();

  const show = searchParams?.show;
  return (
    <div className="pr-5 pb-5">
      <div>
        <TitleComponent titleName={"Usuarios"} />
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
        <BaseTableCard>
          <ActionTableComponent usersData={userData.data} />
        </BaseTableCard>
        {/* </CustomScrollbar> */}
      </div>
    </div>
  );
}
