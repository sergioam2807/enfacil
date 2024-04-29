export const capitalizeFirstLetter = (string: string) => {
  if (string === undefined) {
    return "";
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export function formatTaxId(taxId: number | string) {
  const cleaned = ("" + taxId).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{2})(\d{3})(\d{3})(\d{1})$/);
  if (match) {
    return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
  }
  return taxId.toString();
}

export function cleanTaxId(taxId: string) {
  return taxId.replace(/\D/g, "");
}

export function formatPrice(price: number) {
  if (isNaN(price)) {
    return "-";
  }
  return price.toLocaleString("es-CL", { style: "currency", currency: "CLP" });
}

//DATE FORMATER
export function formatDate(dateString: string) {
  if (!dateString) {
    return "-";
  }

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
