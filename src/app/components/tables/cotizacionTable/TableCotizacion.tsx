import React from "react";
import TableHead from "../../common/TableHead";
import TableCell from "../../common/TableCell";
import ciclebutton from "../../../../../public/images/circlebutton.svg";
import Link from "next/link";
import Image from "next/image";

interface Cotizacion {
  id: string;
  recinto: string;
  activities: string;
  activityOne: number;
  activityTwo: string;
  activityTree: number;
}

interface cotizacionProps {
  materialData: Cotizacion[];
}

const TableCotizacion = () => {
  const cotizacionData: Cotizacion[] = [
    {
      id: "1",
      recinto: "Recinto 1",
      activities: "Actividad 1",
      activityOne: 10,
      activityTwo: "Actividad 2",
      activityTree: 20,
    },
    {
      id: "2",
      recinto: "Recinto 2",
      activities: "Actividad 3",
      activityOne: 15,
      activityTwo: "Actividad 4",
      activityTree: 25,
    },
  ];
  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="text-[#0E436B] font-semibold text-sm">
          <th className="text-left pb-8 pt-5 pl-10">Recinto</th>
          <TableHead>Cantidad Actividades</TableHead>
          <TableHead>Actividad 1</TableHead>
          <TableHead>Actividad 2</TableHead>
          <TableHead>Actividad 3</TableHead>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {cotizacionData?.map((row: Cotizacion) => (
          <tr
            key={row?.id}
            className="text-[#797979] font-medium text-sm border-t border-[#EAEAEA]"
          >
            <td className="text-left pb-8 pt-5 pl-10">{row.recinto ?? "-"}</td>
            <TableCell>{row.activities ?? "-"}</TableCell>
            <TableCell>{row.activityOne ?? "-"}</TableCell>
            <TableCell>{row.activityTwo ?? "-"}</TableCell>
            <TableCell>{row.activityTree ?? "-"}</TableCell>
            <td className="text-left text-base">
              <Link href={"#"}>
                <Image
                  src={ciclebutton}
                  alt="edit"
                  width={23}
                  height={23}
                  className="mr-2"
                />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableCotizacion;
