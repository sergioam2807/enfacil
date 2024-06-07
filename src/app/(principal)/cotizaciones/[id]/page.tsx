"use client";
import TitleComponent from "@/app/components/common/TitleComponent";
import Image from "next/image";
import pencil from "@/../public/images/pencilIcon.svg";
import download from "@/../public/images/dowload.svg";
import BaseTableCard from "@/app/components/tables/table/BaseTableCard";
import TableCotizacionDetalle from "@/app/components/tables/cotizacionTable/TableCotizacionDetalle";
import { useEffect, useState } from "react";
import { formatPrice } from "@/helpers/capitaliizeFirstLetter";
import ModalCotizacion from "@/app/components/modal/ModalCotizacion";
import { useQuoteStore } from "@/store/store";

export interface Enclosure {
  id: number;
  title: string;
  activities: number;
  activityOne: string;
  activityTwo: string;
  activityThree: string;
  activitiesInEnclosure: string;
  manPowerTotal: number;
  materialsTotal: number;
  unityCount: number;
  workUnit: string;
  margin: number;
}

interface Totals {
  materials: number;
  manPower: number;
  generalExpenses: number;
  finalTotal: number;
}

export interface QuoteData {
  enclosures: Enclosure[];
  totals: Totals;
  clientId: string;
  clientName: string;
  data: any;
}

export default function CotizacionDetalle({
  params,
}: {
  params: { id: string };
}) {
  const [quoteFinalData, setQuoteFinalData] = useState<QuoteData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [quoteId, setQuoteId] = useState(null);
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null);
  const [loading, setLoading] = useState(true);
  const { quote } = useQuoteStore();

  console.log("quote", quote);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const quoteData = localStorage?.getItem("quoteData");
    if (quoteData) {
      const parsedData = JSON.parse(quoteData);
      setQuoteFinalData(parsedData);
    }
  }, []);

  console.log("params.id", params.id);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/QuoteApi/GetFullQuotes?id=${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => {
        if (data) {
          const jsonData = JSON.parse(data);
          console.log(jsonData);
          setQuoteData(jsonData);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("quoteData", quoteData?.data[0].client?.name);

  return (
    <div className="pr-5 pb-5">
      <div>
        <TitleComponent titleName={"Cotización"} />
        <div className="text-[#0E436B] font-semibold text-xl mb-7">
          {quote.projectName ?? ""}
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[#0E436B] font-semibold text-xl mb-7">
            Cliente:{" "}
            {quoteFinalData?.clientName || quoteData?.data[0]?.client?.name}
          </div>
          <div className="flex justify-between items-center pb-7">
            <div className="flex gap-4">
              <div>
                <button
                  onClick={openModal}
                  className={`text-sm font-medium bg-custom-blue text-[#FFFFFF]  rounded-md px-3 py-3 mx-4 flex items-center flex-grow`}
                >
                  <Image
                    src={pencil}
                    alt="edit"
                    width={23}
                    height={23}
                    className="mr-2"
                  />
                  Convertir a proyecto
                </button>
                {modalOpen && (
                  <ModalCotizacion
                    quoteFinalData={quoteFinalData}
                    closeModal={closeModal}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`h-[400px] overflow-y-auto`}>
        <BaseTableCard>
          <TableCotizacionDetalle quoteFinalData={quoteFinalData?.enclosures} />
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
            <span className="text-[#797979] font-semibold text-md ">
              {formatPrice(
                (quoteFinalData?.totals?.materials ||
                  quote.totalMaterialsPricing) ??
                  0
              )}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#0E436B] font-semibold text-md ">
              Total mano de obra
            </span>
            <span className="text-[#797979] font-semibold text-md ">
              {formatPrice(
                (quoteFinalData?.totals?.manPower ||
                  quote.totalManPowerUnitPricing) ??
                  0
              )}
            </span>
          </div>
          {/* <div className="flex justify-between">
            <span className="text-[#0E436B] font-semibold text-md ">
              Gastos generales
            </span>
            <span className="text-[#797979] font-semibold text-md ">$0</span>
          </div> */}
          <div className="flex justify-between">
            <span className="text-[#0E436B] font-semibold text-md ">
              Total Final
            </span>
            <span className="text-[#797979] font-semibold text-md ">
              {formatPrice(
                (quoteFinalData?.totals?.finalTotal || quote.finalPrice) ?? 0
              )}
            </span>
          </div>
        </div>
        {/* <div className="w-full flex justify-end py-6">
          <button className="bg-custom-blue p-3 flex rounded-md text-white h-fit gap-1">
            <Image src={download} alt="edit" width={23} height={23} />
            Descargar PDF
          </button>
        </div> */}
      </div>
    </div>
  );
}
