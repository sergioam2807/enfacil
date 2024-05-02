import {
  getActivityData,
  getEnclosure,
  getQuoteEnclosureActivities,
} from "@/app/api/getUser";
import { CreateButton } from "@/app/components/common/CreateButton";
import Search from "@/app/components/common/Search";
import TitleComponent from "@/app/components/common/TitleComponent";
import TableRecinto from "@/app/components/tables/recintosTable/TableRecintos";
import BaseTableCard from "@/app/components/tables/table/BaseTableCard";
import Link from "next/link";
import { Suspense } from "react";

interface Enclosure {
  id: number;
  activitiesInEnclosure: string;
  title: string;
}

interface Activity {
  id: number;
  quoteEnclosureId: number;
  activityUnits: number;
  activityMPUnitPrice: number;
  activityMaterialsUnitPrice: number;
  name?: string;
}

export default async function Recintos() {
  const enclosureActivityData = await getQuoteEnclosureActivities();
  const enclosureData = await getEnclosure();
  const activityData = await getActivityData();

  console.log(activityData?.data);

  const enclosureMap: Record<number, Enclosure> = {};
  enclosureData?.data?.forEach((enclosure: Enclosure) => {
    enclosureMap[enclosure.id] = enclosure;
  });

  let combinedData = enclosureData?.data?.map((enclosure: Enclosure) => {
    let enclosureActivities = enclosure.activitiesInEnclosure.split(",");

    let activityMPUnitPrice = 0;
    let activityMaterialsUnitPrice = 0;

    enclosureActivities.forEach((enclosureActivity) => {
      let activity = activityData?.data?.find(
        (activity: Activity) => activity.name === enclosureActivity.trim()
      );
      if (activity) {
        activityMPUnitPrice += activity.manPowerUnitPricing;
        activityMaterialsUnitPrice += activity.materialsUnitPricing;
      }
    });

    return {
      title: enclosure.title,
      activitiesInEnclosure: enclosureActivities,
      activityUnits: enclosureActivities.length,
      activityMPUnitPrice,
      activityMaterialsUnitPrice,
    };
  });

  return (
    <div className="pr-5 pb-5">
      <div>
        <TitleComponent titleName={"Recintos"} />
      </div>
      <div className="flex justify-between items-center pb-7">
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <Search color="#FFFFFF" />
          </Suspense>
        </div>
        <div className="flex gap-4">
          <div>
            <Link href="/recintos/nuevorecinto">
              <CreateButton
                title="Crear recinto"
                iconSize={14}
                bgcolor="#0E436B"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className={`h-[600px] overflow-y-auto`}>
        <BaseTableCard>
          <TableRecinto recintoData={combinedData} />
        </BaseTableCard>
      </div>
    </div>
  );
}
