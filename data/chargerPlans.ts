export interface ChargerPlan {
  id: string;
  name: string;
  capacityRange: string;
  investmentDisplay: string;
  investmentAmount: number; // in Rupees
  investmentRange: string;
  franchiseeSharePercent: number; // e.g. 85%
  gunMultiplier: number; // scale multiplier for simultaneous charging bays
  defaultSpaceSqFt?: number;
  defaultDailySessions?: number;
  defaultAvgEnergy?: number;
}

export const CHARGER_PLANS: ChargerPlan[] = [
  {
    id: "60kw",
    name: "60 kW",
    capacityRange: "60 kW Dual Gun Fast Charger",
    investmentDisplay: "₹42 Lakhs",
    investmentAmount: 4200000,
    investmentRange: "₹40 – ₹45 Lakhs",
    franchiseeSharePercent: 0.85,
    gunMultiplier: 1.8,
    defaultSpaceSqFt: 400,
    defaultDailySessions: 18,
    defaultAvgEnergy: 26,
  },
  {
    id: "120kw",
    name: "120 kW",
    capacityRange: "120 kW Heavy Fast Charger",
    investmentDisplay: "₹72 Lakhs",
    investmentAmount: 7200000,
    investmentRange: "₹70 – ₹75 Lakhs",
    franchiseeSharePercent: 0.85,
    gunMultiplier: 2.2,
    defaultSpaceSqFt: 600,
    defaultDailySessions: 26,
    defaultAvgEnergy: 32,
  },
  {
    id: "superhub",
    name: "Super Hub",
    capacityRange: "240 kW – 800 kW Commercial Hub",
    investmentDisplay: "₹1.35 Cr",
    investmentAmount: 13500000,
    investmentRange: "₹1.2 Cr – ₹1.5 Cr",
    franchiseeSharePercent: 0.85,
    gunMultiplier: 3.8,
    defaultSpaceSqFt: 1200,
    defaultDailySessions: 45,
    defaultAvgEnergy: 38,
  },
];
