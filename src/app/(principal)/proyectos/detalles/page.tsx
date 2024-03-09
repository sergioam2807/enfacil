import ButtonEditProfile from "@/app/components/buttons/ButtonEditProfile";
import ChipStatus from "@/app/components/chip/ChipStatus";
import BaseTableCard from "@/app/components/tables/table/BaseTableCard";
import Image from "next/image";
import user from "../../../../../public/images/user.svg";
import view from "../../../../../public/images/view.svg";

import React from "react";
import ProyectDetailsTable from "@/app/components/tables/proyectMainTable/ProyectDetailsTable";
import ModalActivity from "@/app/components/modal/ModalActivity";
import Link from "next/link";

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};
export default function ProyectDetails({ searchParams }: SearchParamProps) {
  const show = searchParams?.show;

  const proyectDetail = {
    state: "Activo",
    name: "Proyecto 1",
    taxID: "123456789",
    region: "Región 1",
  };

  const personalProfile = {
    phone: "123-456-7890",
    email: "email@example.com",
    data: [
      {
        id: 1,
        name: "Tarea 1",
        status: "Activo",
        // Agrega más campos según sea necesario
      },
      {
        id: 2,
        name: "Tarea 2",
        status: "Inactivo",
        // Agrega más campos según sea necesario
      },
      // Agrega más objetos de tarea según sea necesario
    ],
  };

  // ...

  return (
    <div>
      <div className="w-full mt-10 py-6 px-8 bg-white rounded-lg flex items-center">
        <div className="w-1/5 flex flex-col">
          <div>
            <Image src={user} width={83} height={83} alt="user-profile" />
          </div>
          <div>
            <ChipStatus status={proyectDetail.state ?? "Activo"}>
              {proyectDetail.state ?? "Activo"}
            </ChipStatus>
          </div>
        </div>
        <div className="w-2/5 flex flex-col">
          <span className="text-xl font-semibold text-custom-blue">
            {proyectDetail.name ?? "-"}
          </span>

          <div className="flex flex-col mt-2">
            <span className="text-base text-custon-gray">
              {proyectDetail.taxID ?? "-"}
            </span>
            <span className="text-base text-custon-gray">
              {proyectDetail.region ?? "-"}
            </span>
          </div>
        </div>
        <div className="w-1/2 flex justify-start items-start 2xl:w-1/5 flex-col">
          <div className="flex items-center">
            <span className="text-base text-custon-gray">
              Fecha Inicio : {personalProfile.phone ?? "-"}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-base text-custon-gray">
              Fecha Est. Término: {personalProfile.email ?? "-"}
            </span>
          </div>
        </div>
        <div className="w-1/5 flex flex-col gap-2 items-center">
          <div>
            <Link href="/proyectos/detalles?show=true">
              <ButtonEditProfile text="Actividades" icon={view} />
            </Link>
          </div>
          {show && <ModalActivity />}
        </div>
        <div className="w-1/5 flex flex-col gap-2 items-center"></div>
      </div>

      <div className="flex justify-end pt-8 pb-8"></div>

      <div className={`h-[600px] overflow-y-auto`}>
        <BaseTableCard>
          <ProyectDetailsTable proyectData={personalProfile.data} />
        </BaseTableCard>
      </div>
    </div>
  );
}
