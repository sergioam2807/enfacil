'use client'
import { getProyectData } from "@/app/api/data";
import Search from "@/app/components/common/Search";
import TitleComponent from "@/app/components/common/TitleComponent";
import { FilterDropdown } from "@/app/components/filter/FilterDropdown";
import ProyectMainTable from "@/app/components/tables/proyectMainTable/ProyectMainTable";
import BaseTableCard from "@/app/components/tables/table/BaseTableCard";
import { Suspense, useEffect, useState } from "react";

export default function Proyectos() {
  const [proyectData, setProyectData] = useState([]);


  // getProyectData
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (token) {
        getProyectData(token).then((data) => {
          setProyectData(data?.data);
        });
      }
    }
  }, []);

  console.log(proyectData)

  return (
    <div className="pr-5 pb-5">
      <div>
        <TitleComponent titleName={"Ultimos proyectos"} />
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
            <FilterDropdown />
          </div>
        </div>
      </div>
      <div className={`h-[600px] overflow-y-auto`}>
        <BaseTableCard>
          <ProyectMainTable proyectData={proyectData}/>
        </BaseTableCard>
        {/* </CustomScrollbar> */}
      </div>
    </div>
  );
}
