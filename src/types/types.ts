export type User = {
  id: number | null;
  name: string;
  phone: number | null;
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

export type Personal = {
  id: string;
  name: string;
  cargo: string;
  specialty: string;
  fIngreso: string;
  state: string;
  phone: string;
  email: string;
};

export type Material = {
  name: string;
  metricUnit: string;
  unitsPerSinglePurchase: string;
  pricingPerSinglePurchase: string;
  providerName: string;
};

export type Client = {
  name: string;
  email: string;
  taxId: number | null;
  phone: number | null;
  adress: string;
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
