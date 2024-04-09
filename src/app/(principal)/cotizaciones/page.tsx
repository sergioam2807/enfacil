import Search from "@/app/components/common/Search";
import TitleComponent from "@/app/components/common/TitleComponent";
import Image from "next/image";
import Link from "next/link";
import pencil from "@/../public/images/pencilIcon.svg";
import download from "@/../public/images/dowload.svg";
import BaseTableCard from "@/app/components/tables/table/BaseTableCard";
import TableCotizacion from "@/app/components/tables/cotizacionTable/TableCotizacion";
import TableCotizacionActual from "@/app/components/tables/cotizacionTable/TableCotizacionActual";
import ModalCotizacion from "@/app/components/modal/ModalCotizacion";
import { Suspense } from "react";

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};
export default function Cotizaciones({ searchParams }: SearchParamProps) {
  const show = searchParams?.show;

  return (
    <div className="pr-5 pb-5">
      <div>
        <TitleComponent titleName={"Cotización"} />
        <div className="text-[#0E436B] font-semibold text-xl mb-7">
          Cliente: Cliente Name
        </div>
      </div>
      <div className="flex justify-between items-center pb-7">
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <Search color="#FFFFFF" />
          </Suspense>
        </div>
        <div className="flex gap-4">
          {/* <div>
            <Link
              href="/cotizaciones?show=true"
              className={`text-sm font-medium bg-[#868686] text-[#FFFFFF]  rounded-md px-3 py-3 mx-4 flex items-center flex-grow`}
            >
              <Image
                src={pencil}
                alt="edit"
                width={23}
                height={23}
                className="mr-2"
              />
              Convertir a proyectos
            </Link>
            {show && <ModalCotizacion />}
          </div> */}
        </div>
      </div>
      <div className={`h-[300px] overflow-y-auto`}>
        <BaseTableCard>
          <TableCotizacion />
        </BaseTableCard>
      </div>

      <div className="flex justify-between items-center">
        <TitleComponent titleName={"Cotización actual"} />
        <div className="flex text-[#797979] bg-white px-4 py-2 font-semibold items-center text-md gap-2">
          <input type="checkbox" className="border-[#49454F]" />
          Aplicar a todos
        </div>
      </div>
      <div className={`h-[300px] overflow-y-auto`}>
        <BaseTableCard>
          <TableCotizacionActual />
        </BaseTableCard>
      </div>
      <div>
        <div className="flex flex-col bg-[#FFFFFF] rounded-lg w-full h-fit py-8 px-6 gap-4">
          <div>
            <span className="text-[#0E436B] font-semibold text-xl ">
              Resumen
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#0E436B] font-semibold text-md ">
              Total materiales
            </span>
            <span className="text-[#797979] font-semibold text-md ">$0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#0E436B] font-semibold text-md ">
              Total mano de obra
            </span>
            <span className="text-[#797979] font-semibold text-md ">$0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#0E436B] font-semibold text-md ">
              Gastos generales
            </span>
            <span className="text-[#797979] font-semibold text-md ">$0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#0E436B] font-semibold text-md ">
              Total Final
            </span>
            <span className="text-[#797979] font-semibold text-md ">$0</span>
          </div>
        </div>
        <div className="w-full flex justify-end py-6">
          <button className="bg-custom-blue p-3 flex rounded-md text-white h-fit">
            Finalizar cotización
          </button>
        </div>
      </div>
    </div>
  );
}
