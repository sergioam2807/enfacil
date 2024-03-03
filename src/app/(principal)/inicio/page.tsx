import BaseSmallCard from "@/components/common/BaseSmallCard";
import SemiDonutChart from "@/components/common/SemiDonutChart";
import BaseTableCard from "@/components/table/BaseTableCard";
import TableComponent from "@/components/table/TableComponent";
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
                <Image
                  src="/images/arrow-positive.svg"
                  alt="Search Icon"
                  width={8}
                  height={10}
                />
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
                <Image
                  src="/images/arrow-negative.svg"
                  alt="Search Icon"
                  width={8}
                  height={10}
                />
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
      <div className="text-[#0E436B] font-semibold text-xl mt-5 mb-7">
        Proyectos totales en gestión
      </div>
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
