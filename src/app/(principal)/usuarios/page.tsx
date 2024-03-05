import ActionTableComponent from "@/components/actionTable/ActionTable";
import { CreateButton } from "@/components/common/CreateButton";
import Search from "@/components/common/Search";
import TitleComponent from "@/components/common/TitleComponent";
import { FilterDropdown } from "@/components/filter/FilterDropdown";
import BaseTableCard from "@/components/table/BaseTableCard";

export default function Usuarios() {
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
            <CreateButton
              title="Crear Usuario"
              iconSize={14}
              bgcolor="#0E436B"
            />
          </div>
        </div>
      </div>
      <div className={`h-[600px] overflow-y-auto`}>
        <BaseTableCard>
          <ActionTableComponent />
        </BaseTableCard>
        {/* </CustomScrollbar> */}
      </div>
    </div>
  );
}
