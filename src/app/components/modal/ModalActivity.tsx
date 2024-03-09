"use client";

import React from "react";
import ProyectModalTable from "../tables/proyectMainTable/ProyectModalTable";
import Link from "next/link";
import BaseTableCard from "../tables/table/BaseTableCard";

const ModalActivity = () => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="border w-96 shadow-lg rounded-2xl bg-white  flex flex-col">
        <div className="overflow-y-auto flex-grow h-[300px]">
          <BaseTableCard>
            <ProyectModalTable />
          </BaseTableCard>
        </div>
        <div className="flex justify-end pb-3 pr-3">
          <Link
            href="/proyectos/detalles"
            style={{ borderColor: "#0E436B", color: "#0E436B" }}
            className="py-3 px-8 rounded-lg text-custom-blue text-sm font-semibold shadow-sm shadow-custom-blue border-custom-blue focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Close
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ModalActivity;
