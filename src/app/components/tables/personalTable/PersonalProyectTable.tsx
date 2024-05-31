import React from "react";
import userIcon from "../../../../../public/images/user.svg";
import Image from "next/image";
// import ActionButtons from "../actionTable/ActionButtons";
import TableHead from "../../common/TableHead";
import TableCell from "../../common/TableCell";
import ChipStatus from "../../chip/ChipStatus";

interface Proyect {
  id: string;
  proyect: string;
  fIngreso: string;
  fTermino: string;
  state: string;
}

interface proyectProps {
  proyectData: Proyect[];
}

const PersonalProyectTable = async ({ proyectData }: proyectProps) => {
  // const proyectData = await getProyectsData();

  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="text-[#0E436B] font-semibold text-sm">
          <th>&nbsp;</th>
          <TableHead>Proyecto</TableHead>
          <TableHead>F.inicio Proyecto</TableHead>
          <TableHead>F.término Proyecto</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Acciones</TableHead>
        </tr>
      </thead>
      <tbody>
        {proyectData?.map((row: Proyect) => (
          <tr
            key={row?.id}
            className="text-[#797979] font-medium text-sm border-t border-[#EAEAEA]"
          >
            <td className="text-left text-base pl-10 py-2">
              <div>
                <Image
                  src={userIcon}
                  alt="Search Icon"
                  width={54}
                  height={54}
                />
              </div>
            </td>
            <TableCell>{row?.proyect ?? "-"}</TableCell>
            <TableCell>{row?.fIngreso ?? "-"}</TableCell>
            <TableCell>{row?.fTermino ?? "-"}</TableCell>
            <TableCell>
              <ChipStatus status={row?.state ?? "Activo"}>
                {row?.state ?? "Activo"}
              </ChipStatus>
            </TableCell>
            <td className="text-left text-base">
              {/* <ActionButtons id={row?.id} /> */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// export async function getServerSideProps() {
//   try {
//     const proyectData = await getProyectsData();

//     return {
//       props: {
//         proyectData,
//       },
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       props: {
//         proyectData: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
//       },
//     };
//   }
// }

export default PersonalProyectTable;
