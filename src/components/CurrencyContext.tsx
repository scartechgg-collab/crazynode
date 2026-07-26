"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Currency = "INR" | "USD" | "EUR";
type Rates = Record<Currency, number>; // base INR = 1, USD relative?

// Fixed rates for demo – INR base
const RATES: Rates = {
  INR: 1,
  USD: 1 / 86.5,
  EUR: 1 / 90.64,
};

const SYMBOLS: Record<Currency, string> = {
  INR: "₹",
  USD: "$",
  EUR: "€",
};

type CurrencyContextType = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  convert: (amountInr: number) => { value: string; symbol: string; raw: number };
  symbol: string;
};

const CurrencyContext = createContext<CurrencyContextType | null>(null);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("INR");

  useEffect(() => {
    const saved = localStorage.getItem("crazynode_currency") as Currency | null;
    if (saved && ["INR", "USD", "EUR"].includes(saved)) setCurrencyState(saved);
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem("crazynode_currency", c);
  };

  const convert = (amountInr: number) => {
    const rate = RATES[currency];
    const raw = amountInr * rate;
    const formatted = currency === "INR" ? raw.toFixed(0) : raw.toFixed(2);
    return { value: formatted, symbol: SYMBOLS[currency], raw };
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convert, symbol: SYMBOLS[currency] }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
};
