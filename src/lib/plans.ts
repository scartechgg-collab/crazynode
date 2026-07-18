export type PlanPerk = {
  icon: string;
  label: string;
  useLocation?: boolean; // if true, label is replaced with "{Location} Location"
};

export type PlanTier = {
  name: string;
  price: number;
  ram: string;
  storage: string;
  cpu: string;
  perks: PlanPerk[];
};

export type Processor = {
  id: string;
  name: string;
  category: "AMD" | "INTEL";
  badge?: string;
  tiers: PlanTier[];
};

export const LOCATIONS = [
  { id: "india", label: "India", city: "Mumbai" },
  { id: "singapore", label: "Singapore", city: "Singapore" },
  { id: "dubai", label: "Dubai", city: "Dubai" },
] as const;

const standardPerks: PlanPerk[] = [
  { icon: "🛡️", label: "DDoS Protection" },
  { icon: "📍", label: "Location", useLocation: true },
];

const freePanelPerks: PlanPerk[] = [
  { icon: "🎁", label: "Free Panel" },
];

const panelBackupPerks: PlanPerk[] = [
  { icon: "🎁", label: "Panel + Backups" },
];

// Ryzen 9 9950X — flagship tier
const ryzen9Tiers: PlanTier[] = [
  { name: "STARTER", price: 180, ram: "2GB", storage: "25GB NVMe SSD", cpu: "100%", perks: standardPerks },
  { name: "BASIC", price: 360, ram: "4GB", storage: "50GB NVMe SSD", cpu: "150%", perks: standardPerks },
  { name: "PRO", price: 540, ram: "6GB", storage: "75GB NVMe SSD", cpu: "200%", perks: standardPerks },
  { name: "ADVANCED", price: 720, ram: "8GB", storage: "100GB NVMe SSD", cpu: "250%", perks: standardPerks },
  { name: "ELITE", price: 900, ram: "10GB", storage: "125GB NVMe SSD", cpu: "300%", perks: standardPerks },
  { name: "TITAN", price: 1080, ram: "12GB", storage: "150GB NVMe SSD", cpu: "350%", perks: standardPerks },
  { name: "SUPREME", price: 1440, ram: "16GB", storage: "200GB NVMe SSD", cpu: "450%", perks: standardPerks },
  { name: "ENTERPRISE", price: 2160, ram: "24GB", storage: "300GB NVMe SSD", cpu: "600%", perks: standardPerks },
  { name: "ULTRA ENTERPRISE", price: 2880, ram: "32GB", storage: "400GB NVMe SSD", cpu: "800%", perks: standardPerks },
  { name: "INFINITY", price: 4320, ram: "48GB", storage: "600GB NVMe SSD", cpu: "1200%", perks: standardPerks },
  { name: "OMEGA", price: 5760, ram: "64GB", storage: "800GB NVMe SSD", cpu: "1600%", perks: standardPerks },
];

// Ryzen 7 7700X — value performance tier
const ryzen7Tiers: PlanTier[] = [
  { name: "STARTER", price: 149, ram: "2GB", storage: "25GB NVMe SSD", cpu: "100%", perks: standardPerks },
  { name: "BASIC", price: 299, ram: "4GB", storage: "50GB NVMe SSD", cpu: "150%", perks: standardPerks },
  { name: "PRO", price: 449, ram: "6GB", storage: "75GB NVMe SSD", cpu: "200%", perks: standardPerks },
  { name: "ADVANCED", price: 599, ram: "8GB", storage: "100GB NVMe SSD", cpu: "250%", perks: standardPerks },
  { name: "ELITE", price: 749, ram: "10GB", storage: "125GB NVMe SSD", cpu: "300%", perks: standardPerks },
  { name: "TITAN", price: 899, ram: "12GB", storage: "150GB NVMe SSD", cpu: "350%", perks: standardPerks },
  { name: "SUPREME", price: 1199, ram: "16GB", storage: "200GB NVMe SSD", cpu: "450%", perks: standardPerks },
  { name: "ENTERPRISE", price: 1799, ram: "24GB", storage: "300GB NVMe SSD", cpu: "600%", perks: standardPerks },
  { name: "ULTRA ENTERPRISE", price: 2399, ram: "32GB", storage: "400GB NVMe SSD", cpu: "800%", perks: standardPerks },
  { name: "INFINITY", price: 3599, ram: "48GB", storage: "600GB NVMe SSD", cpu: "1200%", perks: standardPerks },
  { name: "OMEGA", price: 4799, ram: "64GB", storage: "800GB NVMe SSD", cpu: "1600%", perks: standardPerks },
];

// AMD EPYC — workstation-class tier
const epycTiers: PlanTier[] = [
  { name: "STARTER", price: 120, ram: "2GB", storage: "25GB NVMe SSD", cpu: "100%", perks: standardPerks },
  { name: "BASIC", price: 240, ram: "4GB", storage: "50GB NVMe SSD", cpu: "150%", perks: standardPerks },
  { name: "PRO", price: 360, ram: "6GB", storage: "75GB NVMe SSD", cpu: "200%", perks: standardPerks },
  { name: "ADVANCED", price: 480, ram: "8GB", storage: "100GB NVMe SSD", cpu: "250%", perks: standardPerks },
  { name: "ELITE", price: 600, ram: "10GB", storage: "125GB NVMe SSD", cpu: "300%", perks: standardPerks },
  { name: "TITAN", price: 720, ram: "12GB", storage: "150GB NVMe SSD", cpu: "350%", perks: standardPerks },
  { name: "SUPREME", price: 840, ram: "14GB", storage: "175GB NVMe SSD", cpu: "400%", perks: standardPerks },
  { name: "BEAST", price: 960, ram: "16GB", storage: "200GB NVMe SSD", cpu: "450%", perks: standardPerks },
  { name: "ENTERPRISE", price: 1440, ram: "24GB", storage: "300GB NVMe SSD", cpu: "600%", perks: standardPerks },
  { name: "ULTRA ENTERPRISE", price: 1920, ram: "32GB", storage: "400GB NVMe SSD", cpu: "800%", perks: standardPerks },
  { name: "INFINITY", price: 2880, ram: "48GB", storage: "600GB NVMe SSD", cpu: "1200%", perks: standardPerks },
];

// Intel Xeon — enterprise budget tier
const xeonTiers: PlanTier[] = [
  { name: "STARTER", price: 70, ram: "2GB", storage: "25GB NVMe SSD", cpu: "100%", perks: freePanelPerks },
  { name: "BASIC", price: 140, ram: "4GB", storage: "50GB NVMe SSD", cpu: "150%", perks: freePanelPerks },
  { name: "PRO", price: 210, ram: "6GB", storage: "75GB NVMe SSD", cpu: "200%", perks: panelBackupPerks },
  { name: "ADVANCED", price: 280, ram: "8GB", storage: "100GB NVMe SSD", cpu: "250%", perks: panelBackupPerks },
  { name: "ELITE", price: 350, ram: "10GB", storage: "125GB NVMe SSD", cpu: "300%", perks: panelBackupPerks },
  { name: "TITAN", price: 420, ram: "12GB", storage: "150GB NVMe SSD", cpu: "350%", perks: panelBackupPerks },
  { name: "SUPREME", price: 490, ram: "14GB", storage: "175GB NVMe SSD", cpu: "400%", perks: panelBackupPerks },
  { name: "BEAST", price: 560, ram: "16GB", storage: "200GB NVMe SSD", cpu: "450%", perks: panelBackupPerks },
];

export const MINECRAFT_PROCESSORS: Processor[] = [
  { id: "ryzen-9-9950x", name: "Ryzen 9 9950X", category: "AMD", badge: "Flagship", tiers: ryzen9Tiers },
  { id: "ryzen-7-7700x", name: "Ryzen 7 7700X", category: "AMD", badge: "Sweet Spot", tiers: ryzen7Tiers },
  { id: "epyc", name: "AMD EPYC", category: "AMD", badge: "Workstation", tiers: epycTiers },
  { id: "xeon", name: "Intel Xeon", category: "INTEL", badge: "Budget", tiers: xeonTiers },
];
