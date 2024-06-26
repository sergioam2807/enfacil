import BaseSmallCard from "@/app/components/common/BaseSmallCard";
import SemiDonutChart from "@/app/components/common/SemiDonutChart";
import TitleComponent from "@/app/components/common/TitleComponent";
import BaseTableCard from "@/app/components/tables/table/BaseTableCard";
import TableComponent from "@/app/components/tables/table/TableComponent";
import positive from "../../../../public/images/arrow-positive.svg";
import negative from "../../../../public/images/arrow-negative.svg";

import Image from "next/image";

export default function Inicio() {
  return (
    <div className="pr-5 pb-5">
      <div className="flex justify-between gap-20">
        <BaseSmallCard>
          <div className="flex flex-col gap-2 xl:text-sm xl:flex ">
            <div>
              <span className="font-semibold uppercase text-[#0E436B] ">
                Ingreso total del mes
              </span>
            </div>
            <div className="flex justify-center">
              <span className="font-semibold text-2xl uppercase text-[#0E436B]">
                $ 14.456.567
              </span>
            </div>
            <div className="flex justify-center items-center gap-1">
              <div>
                <Image src={positive} alt="Search Icon" width={8} height={10} />
              </div>
              <div>
                <span className="text-[#149D52] font-semibold">2.1%</span>
              </div>
              <div>
                <span className="text-[#737B8B]">vs mes pasado</span>
              </div>
            </div>
          </div>
        </BaseSmallCard>
        <BaseSmallCard>
          <div className="flex flex-col gap-2 xl:text-sm xl:flex ">
            <div>
              <span className="font-semibold uppercase text-[#0E436B]">
                Egreso total del mes
              </span>
            </div>
            <div className="flex justify-center">
              <span className="font-semibold text-2xl uppercase text-[#0E436B]">
                $ 12.245.678
              </span>
            </div>
            <div className="flex justify-center items-center gap-1">
              <div>
                <Image src={negative} alt="Search Icon" width={8} height={10} />
              </div>
              <div>
                <span className="text-[#FF4D4D] font-semibold">5.1%</span>
              </div>
              <div>
                <span className="text-[#737B8B]">vs mes pasado</span>
              </div>
            </div>
          </div>
        </BaseSmallCard>
        <BaseSmallCard>
          <div className="flex flex-col gap-2 xl:text-sm xl:text-center ">
            <span className="font-semibold text-[#0E436B] uppercase">
              Utilidad estimada del mes
            </span>
            <div>
              <SemiDonutChart />
            </div>
          </div>
        </BaseSmallCard>
      </div>
      <TitleComponent titleName={"Proyectos totales en gestión"} />
      {/* <CustomScrollbar> */}
      <div className={`h-[500px] overflow-y-auto`}>
        <BaseTableCard>
          <TableComponent />
        </BaseTableCard>
        {/* </CustomScrollbar> */}
      </div>
    </div>
  );
}
