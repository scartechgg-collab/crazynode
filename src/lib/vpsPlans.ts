export type VpsTier = {
  name: string;
  price: number;
  ram: string;
  storage: string;
  cpu: string;
  popular?: boolean;
};

export type VpsCategory = {
  id: string;
  name: string;
  tiers: VpsTier[];
};

export const VPS_CATEGORIES: VpsCategory[] = [
  {
    id: "epyc",
    name: "AMD EPYC VPS",
    tiers: [
      { name: "VPS 8GB", price: 699, ram: "8GB", storage: "80GB NVMe SSD", cpu: "2 vCPU" },
      { name: "VPS 16GB", price: 1299, ram: "16GB", storage: "160GB NVMe SSD", cpu: "4 vCPU", popular: true },
      { name: "VPS 32GB", price: 2499, ram: "32GB", storage: "320GB NVMe SSD", cpu: "6 vCPU" },
      { name: "VPS 64GB", price: 4999, ram: "64GB", storage: "640GB NVMe SSD", cpu: "8 vCPU" },
    ],
  },
  {
    id: "ryzen-9",
    name: "RYZEN 9 9950X VPS",
    tiers: [
      { name: "VPS 8GB", price: 1299, ram: "8GB", storage: "100GB NVMe SSD", cpu: "2 vCPU" },
      { name: "VPS 16GB", price: 2499, ram: "16GB", storage: "200GB NVMe SSD", cpu: "4 vCPU", popular: true },
      { name: "VPS 32GB", price: 4999, ram: "32GB", storage: "400GB NVMe SSD", cpu: "6 vCPU" },
      { name: "VPS 64GB", price: 9999, ram: "64GB", storage: "800GB NVMe SSD", cpu: "8 vCPU" },
    ],
  },
  {
    id: "ryzen-7",
    name: "RYZEN 7 7700X VPS",
    tiers: [
      { name: "VPS 8GB", price: 999, ram: "8GB", storage: "80GB NVMe SSD", cpu: "2 vCPU" },
      { name: "VPS 16GB", price: 1899, ram: "16GB", storage: "120GB NVMe SSD", cpu: "4 vCPU", popular: true },
      { name: "VPS 32GB", price: 3799, ram: "32GB", storage: "240GB NVMe SSD", cpu: "6 vCPU" },
      { name: "VPS 64GB", price: 7599, ram: "64GB", storage: "480GB NVMe SSD", cpu: "8 vCPU" },
    ],
  },
];