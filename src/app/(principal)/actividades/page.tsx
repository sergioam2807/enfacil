import { getActivityData } from "@/app/api/getUser";
import { CreateButton } from "@/app/components/common/CreateButton";
import Search from "@/app/components/common/Search";
import TitleComponent from "@/app/components/common/TitleComponent";
import ModalCreateActivity from "@/app/components/modal/ModalCreateActivity";
import ActividadesTable from "@/app/components/tables/actividadesTable/ActividadesTable";
import BaseTableCard from "@/app/components/tables/table/BaseTableCard";
import Link from "next/link";

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

export default async function Actividades({ searchParams }: SearchParamProps) {
  const activityData = await getActivityData();
  const show = searchParams?.show;

  return (
    <div className="pr-5 pb-5">
      <div>
        <TitleComponent titleName={"Actividades"} />
      </div>
      <div className="flex justify-between items-center pb-7">
        <div>
          <Search color="#FFFFFF" />
        </div>
        <div className="flex gap-4">
          <div>
            <Link href="/actividades?show=true">
              <CreateButton
                title="Crear actividad"
                iconSize={14}
                bgcolor="#0E436B"
              />
            </Link>
            {show && <ModalCreateActivity />}
          </div>
        </div>
      </div>
      <div className={`h-[600px] overflow-y-auto`}>
        <BaseTableCard>
          <ActividadesTable activityData={activityData?.data} />
        </BaseTableCard>
      </div>
    </div>
  );
}
