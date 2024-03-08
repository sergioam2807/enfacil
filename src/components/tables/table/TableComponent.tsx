import React from "react";

import AdvanceBar from "./AdvanceBar";
import ChipStatus from "@/components/chip/ChipStatus";

const TableHead = ({ children }: { children: React.ReactNode }) => (
  <th className="w-1/5 text-left pl-12 pb-8 pt-5">{children}</th>
);
const TableCell = ({ children }: { children: React.ReactNode }) => (
  <td className="w-1/5 p-4 pl-12 text-base">
    {Array.isArray(children)
      ? children.map((item: any, index: number) => (
          <div key={index}>
            {Object.entries(item)
              .filter(([key]) => key !== "id")
              .map(([key, value]) => (
                <div key={key} className="font-normal line pb-1">
                  {String(value)}
                </div>
              ))}
          </div>
        ))
      : children}
  </td>
);

const TableComponent = () => {
  const data = [
    {
      proyecto: [
        {
          id: "1",
          proyectName: "Hacienda Atacama",
          region: "Antofagasta",
          codigo: "40950775",
        },
      ],
      cliente: "Christofer",
      avance: 100,
      estado: "Activo",
    },
    {
      proyecto: [
        {
          id: "2",
          proyectName: "Solares Norte",
          region: "Iquique",
          codigo: "40950775",
        },
      ],
      cliente: "Dimas",
      avance: "50",
      estado: "Activo",
    },
    {
      proyecto: [
        {
          id: "1",
          proyectName: "Brisas del Norte",
          region: "Antofagasta",
          codigo: "40950775",
        },
      ],
      cliente: "Fernando",
      avance: "50",
      estado: "Activo",
    },
    {
      proyecto: [
        {
          id: "1",
          proyectName: "Brisas del Norte",
          region: "Antofagasta",
          codigo: "40950775",
        },
      ],
      cliente: "Catalán",
      avance: 50,
      estado: "Activo",
    },
    {
      proyecto: [
        {
          id: "1",
          proyectName: "Brisas del Norte",
          region: "Antofagasta",
          codigo: "40950775",
        },
      ],
      cliente: "Catalán",
      avance: "35",
      estado: "Activo",
    },
    {
      proyecto: [
        {
          id: "1",
          proyectName: "Brisas del Norte",
          region: "Antofagasta",
          codigo: "40950775",
        },
      ],
      cliente: "Catalán",
      avance: "50",
      estado: "Activo",
    },
    {
      proyecto: [
        {
          id: "1",
          proyectName: "Brisas del Norte",
          region: "Antofagasta",
          codigo: "40950775",
        },
      ],
      cliente: "Catalán",
      avance: "30",
      estado: "Inactivo",
    },
    // puedes agregar más objetos de datos aquí
  ];

  return (
    <table
      className="w-full table-auto"
      //   style={{ width: "1500px" }}
    >
      <thead className="p-56">
        <tr className="text-[#0E436B] font-semibold text-sm">
          <TableHead>Proyecto</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Avance</TableHead>
          <TableHead>Estado</TableHead>
          <th className="w-1/8 text-leftright p-4"></th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr
            key={index}
            className="text-[#797979] font-medium text-sm border-t border-[#EAEAEA]"
          >
            {/* FIX THE RENDER PROPS */}
            <TableCell>{row.proyecto}</TableCell>
            <TableCell>{row.cliente}</TableCell>
            <TableCell>
              <AdvanceBar avance={row.avance} />
            </TableCell>
            {/* TODO: COMPONENTIZAR COMPONENT */}
            <TableCell>
              <ChipStatus status={row.estado}>{row.estado}</ChipStatus>
            </TableCell>
            <td className="w-2/4 p-4">
              <button className="px-4 py-2 text-[#097AFF] underline font-normal rounded">
                Ver Detalles
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
