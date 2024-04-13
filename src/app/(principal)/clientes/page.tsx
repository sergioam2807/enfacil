import { getClientData } from "@/app/api/getUser";
import { CreateButton } from "@/app/components/common/CreateButton";
import Search from "@/app/components/common/Search";
import TitleComponent from "@/app/components/common/TitleComponent";
import { FilterDropdown } from "@/app/components/filter/FilterDropdown";
import ModalCreateClient from "@/app/components/modal/ModalCreateClient";
import SkeletonTable from "@/app/components/skeleton/SkeletonTable";
import ClientTable from "@/app/components/tables/clientTable/ClientTable";
import BaseTableCard from "@/app/components/tables/table/BaseTableCard";

import Link from "next/link";
import { Suspense } from "react";

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

export default async function Clientes({ searchParams }: SearchParamProps) {
  const clientData = await getClientData();

  const show = searchParams?.show;
  return (
    <div className="pr-5 pb-5">
      <div>
        <TitleComponent titleName={"Clientes"} />
      </div>
      <div className="flex justify-between items-center pb-7">
        <div>
          <Suspense fallback={<SkeletonTable />}>
            <Search color="#FFFFFF" />
          </Suspense>
        </div>
        <div className="flex gap-4">
          <div>
            <FilterDropdown />
          </div>
          <div>
            <Link href="/clientes?show=true">
              <CreateButton
                title="Crear nuevo cliente"
                iconSize={14}
                bgcolor="#0E436B"
              />
            </Link>
            {show && <ModalCreateClient />}
          </div>
        </div>
      </div>
      <div className={`h-[600px] overflow-y-auto`}>
        <Suspense fallback={<SkeletonTable />}>
          <BaseTableCard>
            <ClientTable clientData={clientData.data} />
          </BaseTableCard>
        </Suspense>
      </div>
    </div>
  );
}
