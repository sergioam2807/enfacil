export type User = {
  id: number | null;
  name: string;
  phone: number | string | null;
  email: string;
  password: string;
};

export type Activity = {
  id: number | null;
  name: string;
  metricUnit: string;
  manPowerUnitPricing: string;
  materialsUnitPricing: string;
  materialsRecipeIds: string;
};

export type Personnel = {
  id: number;
  name: string;
  specialty: string;
  pricePerWorkDay: number | null;
  taxId: number | null;
  phone: number | null;
  email: string;
  created: string;
  state: string;
};

export type Material = {
  name: string;
  metricUnit: string;
  unitsPerSinglePurchase: string;
  pricingPerSinglePurchase: string;
  providerName: string;
};

export type Client = {
  id: number | string | null;
  name: string;
  email: string;
  taxId: number | string;
  phone: number | null;
  address: string;
};

export type Proyect = {
  id: string;
  proyect: string;
  type: string;
  fIngreso: string;
  fTermino: string;
  state: string;
  advance: string;
};
