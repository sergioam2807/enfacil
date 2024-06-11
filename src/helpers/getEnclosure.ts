interface Activity {
  activityUnits: number;
  activityMPUnitPrice: number;
  activityMaterialsUnitPrice: number;
  activityMarginPercentage: number;
}

interface Enclosure {
  enclosureID: number;
  enclosure?: string;
  quoteEnclosureActivities: Activity[];
}

interface Quote {
  id: number;
  title: string;
  quoteEnclosures: Enclosure[];
}

interface EnclosureInfo {
  id: number;
  nombreRecinto: string;
  unityCount: number;
  precioManoObraUnitario: number;
  precioMaterialesUnitario: number;
  manPowerTotal: number;
  materialsTotal: number;
  margin: number;
  totalActividad: number;
}

export interface QuoteInfo {
  idQuote: number;
  title: string;
  enclosures: EnclosureInfo[];
}

function getGroupedInfo(data: Quote[]): QuoteInfo[] {
  console.log("enclosure desde el maping", data);
  const quotesInfo: QuoteInfo[] = [];

  data?.forEach((quote: Quote) => {
    const enclosuresMap = new Map<number, EnclosureInfo>();

    quote.quoteEnclosures.forEach((enclosure: Enclosure) => {
      if (!enclosuresMap.has(enclosure.enclosureID)) {
        enclosuresMap.set(enclosure.enclosureID, {
          id: enclosure.enclosureID,
          nombreRecinto: enclosure.enclosure ? enclosure.enclosure : "N/A",
          unityCount: 0,
          precioManoObraUnitario: 0,
          precioMaterialesUnitario: 0,
          manPowerTotal: 0,
          materialsTotal: 0,
          margin: 0,
          totalActividad: 0,
        });
      }

      const enclosureInfo = enclosuresMap.get(enclosure.enclosureID);

      if (enclosureInfo) {
        enclosure.quoteEnclosureActivities.forEach((activity: Activity) => {
          enclosureInfo.unityCount = activity.activityUnits;
          enclosureInfo.manPowerTotal +=
            activity.activityMPUnitPrice * activity.activityUnits;
          enclosureInfo.materialsTotal +=
            activity.activityMaterialsUnitPrice * activity.activityUnits;
          enclosureInfo.margin = activity.activityMarginPercentage;
        });

        enclosureInfo.precioManoObraUnitario = enclosureInfo.unityCount
          ? enclosureInfo.manPowerTotal / enclosureInfo.unityCount
          : 0;
        enclosureInfo.precioMaterialesUnitario = enclosureInfo.unityCount
          ? enclosureInfo.materialsTotal / enclosureInfo.unityCount
          : 0;
      }
    });

    const enclosuresInfo = Array.from(enclosuresMap.values()).map(
      (enclosureInfo: EnclosureInfo) => {
        enclosureInfo.totalActividad =
          enclosureInfo.manPowerTotal +
          enclosureInfo.materialsTotal +
          (enclosureInfo.margin / 100) *
            (enclosureInfo.manPowerTotal + enclosureInfo.materialsTotal);
        return enclosureInfo;
      }
    );

    quotesInfo.push({
      idQuote: quote.id,
      title: quote.title,
      enclosures: enclosuresInfo,
    });
  });

  return quotesInfo;
}

export default getGroupedInfo;
