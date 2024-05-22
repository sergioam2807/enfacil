"use client";

import TitleComponent from "@/app/components/common/TitleComponent";
import BaseTableCard from "@/app/components/tables/table/BaseTableCard";
import TableCotizacion from "@/app/components/tables/cotizacionTable/TableCotizacion";
import TableCotizacionActual from "@/app/components/tables/cotizacionTable/TableCotizacionActual";
import { useEffect, useState } from "react";
import {
  getActivityTokenData,
  getEnclosureData,
  postQuoteEnclosuresMultipleActivities,
  postQuoteWhitEnclosureData,
} from "@/app/api/data";
import { formatPrice } from "@/helpers/capitaliizeFirstLetter";
import { useRouter } from "next/navigation";
// import { CreateButton } from "@/app/components/common/CreateButton";
import { useClientQuoteStore } from "@/store/store";
import { Enclosure } from "./detalle/page";

export default function Cotizaciones() {
  const [enclosureData, setEnclosureData] = useState<any[]>([]);
  const [enclosureAdded, setEnclosureAdded] = useState<any[]>([]);
  const [activityData, setActivityData] = useState<any[]>([]);
  const [totals, setTotals] = useState<
    { manPowerTotal: number; materialsTotal: number }[]
  >([]);
  const [quoteTotal, setQuoteTotal] = useState({
    materials: 0,
    manPower: 0,
    generalExpenses: 0,
    finalTotal: 0,
  });
  const { clientId, title, quoteId } = useClientQuoteStore();

  const route = useRouter();

  const handleData = (data: any) => {
    setEnclosureAdded(data);
  };

  const handleTotalChange = (totalsQuote: {
    materials: number;
    manPower: number;
    generalExpenses: number;
    finalTotal: number;
  }) => {
    setQuoteTotal(totalsQuote);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (token) {
        getEnclosureData(token).then((data) => {
          setEnclosureData(data?.data);
        });

        const fetchData = async () => {
          const data = await getActivityTokenData(token);
          setActivityData(data.data);
        };

        fetchData();
      }
    }
  }, []);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const clientName =
  //       localStorage.getItem("selectedClientName") || "Nombre del cliente";
  //     console.log("clientName", clientName);
  //     setClientName(clientName);
  //   }
  // }, []);

  // useEffect(() => {
  //   const handleStorageChange = (e: StorageEvent) => {
  //     if (e.key === "selectedClientName") {
  //       setClientName(e.newValue || "Nombre del cliente");
  //     }
  //   };

  //   window.addEventListener("storage", handleStorageChange);

  //   return () => {
  //     window.removeEventListener("storage", handleStorageChange);
  //   };
  // }, []);

  useEffect(() => {
    const newEnclosureData = enclosureData?.map((enclosure: any) => {
      let manPowerTotal = 0;
      let materialsTotal = 0;

      const activityNames = enclosure?.activitiesInEnclosure?.split(", ");

      activityNames?.forEach((name: string) => {
        const activity = activityData.find(
          (activity) => activity.name.trim() === name.trim()
        );
        if (activity) {
          manPowerTotal += activity.manPowerUnitPricing;
          materialsTotal += activity.materialsUnitPricing;
        }
      });

      return { ...enclosure, manPowerTotal, materialsTotal };
    });

    setTotals(newEnclosureData);
  }, [activityData]);

  const combinedData = enclosureAdded.map((enclosure: any) => {
    const totalsForEnclosure = totals.find(
      (total: any) => total.id === enclosure.id
    );
    return { ...enclosure, ...totalsForEnclosure };
  });

  //TODO: Refactor this

  // useEffect(() => {
  //   const handleUnload = () => {
  //     localStorage.removeItem("quoteData");
  //   };

  //   window.addEventListener("beforeunload", handleUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleUnload);
  //   };
  // }, []);

  console.log("enclosureAdded", enclosureAdded);
  console.log("activityData", activityData);
  console.log("combinedData", combinedData);

  const handleFinishQuote = async () => {
    const token = localStorage.getItem("token");
    const quoteDataItem = localStorage.getItem("quoteData");

    if (!quoteDataItem) {
      console.error("quoteData not found in localStorage");
      return;
    }

    const quoteData = JSON.parse(quoteDataItem);
    if (token && quoteData) {
      const quoteWithEnclosure = {
        quote: {
          title: title,
          clientId: clientId,
        },
        quoteEnclosures: enclosureAdded.map((enclosure: Enclosure) => ({
          quoteId: quoteId,
          enclosureID: enclosure.id,
        })),
      };
      console.log("quoteWithEnclosure", quoteWithEnclosure);
      try {
        const data = await postQuoteWhitEnclosureData(
          token,
          quoteWithEnclosure
        );
        console.log(data);

        const quoteEnclosuresActivitys = quoteData.enclosures.flatMap(
          (enclosure: any, index: number) => {
            return activityData
              .map((activity) => {
                if (enclosure[activity.name] !== "-") {
                  return {
                    quoteEnclosureId: 0,
                    activityId: 0,
                    activityMPUnitPrice: enclosure.manPowerTotal,
                    activityMaterialsUnitPrice: enclosure.materialsTotal,
                    activityUnits: enclosure.unityCount,
                    activityMarginPercentage: enclosure.margin,
                    activityAdvancementPercentage: 0,
                  };
                }
              })
              .filter(Boolean);
          }
        );

        const quoteEnclosureData = {
          quoteEnclosure: {
            quoteId: quoteId,
            enclosureId: enclosureAdded[0]?.id,
          },
          quoteEnclosuresActivitys,
        };

        const data2 = await postQuoteEnclosuresMultipleActivities(
          token,
          quoteEnclosureData
        );
        console.log(data2);

        route.push("cotizaciones/detalle");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="pr-5 pb-5">
      <div>
        <div>
          <div className="flex justify-between items-center">
            <TitleComponent titleName={"Cotización"} />
          </div>
        </div>
        <div className="text-[#0E436B] font-semibold text-xl mb-7">
          Cliente: {title}
        </div>
      </div>
      <div className={`h-[300px] overflow-y-auto`}>
        <BaseTableCard>
          <TableCotizacion cotizacionData={enclosureData} onData={handleData} />
        </BaseTableCard>
      </div>

      <div className="flex justify-between items-center">
        <TitleComponent titleName={"Cotización actual"} />
        {/* <div className="flex text-[#797979] bg-white px-4 py-2 font-semibold items-center text-md gap-2">
          <input type="checkbox" className="border-[#49454F]" />
          Aplicar a todos
        </div> */}
      </div>
      <div className={`h-[300px] overflow-y-auto`}>
        <BaseTableCard>
          <TableCotizacionActual
            cotizacionData={combinedData}
            onTotalChange={handleTotalChange}
          />
        </BaseTableCard>
      </div>
      <div>
        <div className="flex flex-col bg-[#FFFFFF]  mt-8 rounded-lg w-full h-fit py-8 px-6 gap-4">
          <div>
            <span className="text-[#0E436B] font-semibold text-xl ">
              Resumen
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#0E436B] font-semibold text-md ">
              Total materiales
            </span>
            <span className="text-[#797979] font-semibold text-md ">
              {formatPrice(quoteTotal.materials)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#0E436B] font-semibold text-md ">
              Total mano de obra
            </span>
            <span className="text-[#797979] font-semibold text-md ">
              {formatPrice(quoteTotal.manPower)}
            </span>
          </div>
          {/*<div className="flex justify-between">
            <span className="text-[#0E436B] font-semibold text-md ">
              Gastos generales
            </span>
            <span className="text-[#797979] font-semibold text-md ">
              {formatPrice(quoteTotal.generalExpenses)}
            </span>
  </div>*/}
          <div className="flex justify-between">
            <span className="text-[#0E436B] font-semibold text-md ">
              Total Final
            </span>
            <span className="text-[#797979] font-semibold text-md ">
              {formatPrice(quoteTotal.finalTotal)}
            </span>
          </div>
        </div>
        <div className="w-full flex justify-end py-6">
          <button
            onClick={handleFinishQuote}
            className="bg-custom-blue p-3 flex rounded-md text-white h-fit"
          >
            Finalizar cotización
          </button>
        </div>
      </div>
    </div>
  );
}
