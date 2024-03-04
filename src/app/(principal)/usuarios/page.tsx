import { CreateButton } from "@/components/common/CreateButton";
import TitleComponent from "@/components/common/TitleComponent";
import { FilterDropdown } from "@/components/filter/FilterDropdown";

export default function Usuarios() {
  return (
    <div className="pr-5 pb-5">
      <div className="flex justify-between items-center">
        <div>
          <TitleComponent titleName={"Usuarios"} />
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
    </div>
  );
}
