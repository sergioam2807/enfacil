import Image from "next/image";
import { CotizacionButton } from "../common/CotizacionButton";
import { SidebarItem } from "./SidebarItem";

const sidebarMenuItems = [
  {
    path: "/inicio",
    icon: "inicio",
    title: "Inicio",
  },
  {
    path: "/usuarios",
    icon: "usuarios",
    title: "Usuarios",
  },
  {
    path: "/personal",
    icon: "personal",
    title: "Personal",
  },
  {
    path: "/clientes",
    icon: "clientes",
    title: "Clientes",
  },
  {
    path: "/proyectos",
    icon: "proyectos",
    title: "Proyectos",
  },
  {
    path: "/cotizaciones",
    icon: "cotizaciones",
    title: "Cotizaciones",
  },
  {
    path: "/materiales",
    icon: "materiales",
    title: "Materiales",
  },
  {
    path: "/actividades",
    icon: "actividades",
    title: "Actividades",
  },
];

export const Sidebar = () => {
  return (
    <div className="h-screen bg-[#0E436B] text-white flex-shrink-0 flex flex-col justify-start">
      <div className="pl-4 pr-4 pt-3 pb-7 text-white flex justify-center">
        <Image
          src="/images/logo-eic.png"
          alt="logo"
          width={120}
          height={97}
          priority
        />
      </div>
      <div className="pl-4">
        {sidebarMenuItems.map((item, index) => (
          <SidebarItem key={item.path} {...item} />
        ))}
      </div>
      <div className="flex justify-center items-center h-1/2">
        <CotizacionButton title="Crear cotización" />
      </div>
      <div className="mt-auto pl-4 pb-4">
        {" "}
        <Image
          src="/images/logo-en-facil.png"
          alt="logo"
          width={73}
          height={52}
          priority
        />
      </div>
    </div>
  );
};
