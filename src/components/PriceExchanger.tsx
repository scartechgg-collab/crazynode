"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRightLeft, BadgeIndianRupee, Info } from "lucide-react";

type Currency = "USD" | "EUR" | "INR";
type Pair = { from: Currency; to: Currency; rate: number };

const pairs: Pair[] = [
  { from: "USD", to: "INR", rate: 86.58 },
  { from: "EUR", to: "INR", rate: 90.64 },
  { from: "INR", to: "USD", rate: 1 / 86.58 },
  { from: "INR", to: "EUR", rate: 1 / 90.64 },
];

const symbols: Record<Currency, string> = { USD: "$", EUR: "€", INR: "₹" };
const names: Record<Currency, string> = { USD: "US Dollar", EUR: "Euro", INR: "Indian Rupee" };

function formatValue(value: number, currency: Currency) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "INR" ? 2 : 2,
  }).format(value);
}

export default function PriceExchanger() {
  const [activePair, setActivePair] = useState(0);
  const [amount, setAmount] = useState("10");
  const pair = pairs[activePair];
  const numericAmount = Number(amount) || 0;
  const converted = useMemo(() => numericAmount * pair.rate, [numericAmount, pair.rate]);

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[#09090b]" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/[.06]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium glass text-gray-300 mb-4">
            <BadgeIndianRupee className="w-3.5 h-3.5 text-brand" /> Price Exchanger
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">See Prices In Your <span className="gradient-text">Currency</span></h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">Quickly convert common hosting prices between USD, EUR, and INR before choosing a service.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="premium-card p-5 sm:p-8 lg:p-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-8">
            {pairs.map((item, index) => (
              <button
                key={`${item.from}-${item.to}`}
                type="button"
                onClick={() => setActivePair(index)}
                className={`rounded-xl border px-4 py-3 text-left transition-all duration-300 ${activePair === index ? "border-brand/35 bg-brand/[.07]" : "border-white/[.07] bg-white/[.025] hover:bg-white/[.045]"}`}
              >
                <div className="flex items-center gap-2 text-xs font-bold">
                  <span className={activePair === index ? "text-white" : "text-gray-400"}>{item.from}</span>
                  <ArrowRightLeft className={`w-3 h-3 ${activePair === index ? "text-brand" : "text-gray-600"}`} />
                  <span className={activePair === index ? "text-white" : "text-gray-400"}>{item.to}</span>
                </div>
                <p className="text-[10px] text-gray-600 mt-1">{symbols[item.from]}1 in {item.to}</p>
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-4 items-center">
            <div className="rounded-2xl border border-white/[.075] bg-[#0b0b0d] p-5 sm:p-6">
              <label htmlFor="exchange-amount" className="flex items-center justify-between text-xs text-gray-500 mb-5">
                <span>You pay</span><span>{names[pair.from]}</span>
              </label>
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 rounded-xl bg-white/[.045] border border-white/[.07] flex items-center justify-center text-lg font-bold text-gray-300">{symbols[pair.from]}</span>
                <input
                  id="exchange-amount"
                  inputMode="decimal"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value.replace(/[^0-9.]/g, ""))}
                  className="min-w-0 flex-1 bg-transparent text-3xl sm:text-4xl font-bold text-white outline-none"
                  aria-label={`Amount in ${pair.from}`}
                />
                <span className="text-sm font-bold text-gray-500">{pair.from}</span>
              </div>
            </div>

            <div className="mx-auto w-11 h-11 rounded-full border border-white/[.09] bg-white/[.035] flex items-center justify-center text-gray-400 rotate-90 lg:rotate-0">
              <ArrowRightLeft className="w-4 h-4" />
            </div>

            <motion.div key={`${activePair}-${amount}`} initial={{ opacity: 0.5 }} animate={{ opacity: 1 }} className="rounded-2xl border border-brand/20 bg-brand/[.045] p-5 sm:p-6">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-5"><span>You receive</span><span>{names[pair.to]}</span></div>
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 rounded-xl bg-brand/10 border border-brand/15 flex items-center justify-center text-lg font-bold text-brand">{symbols[pair.to]}</span>
                <p className="min-w-0 flex-1 text-2xl sm:text-3xl font-bold text-white truncate" title={formatValue(converted, pair.to)}>{formatValue(converted, pair.to)}</p>
                <span className="text-sm font-bold text-gray-500">{pair.to}</span>
              </div>
            </motion.div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl bg-white/[.025] border border-white/[.055] px-4 py-3">
            <p className="flex items-center gap-2 text-[11px] text-gray-500"><Info className="w-3.5 h-3.5 text-gray-600" />Indicative reference rates. Checkout displays the final billed amount.</p>
            <p className="text-[11px] font-medium text-gray-400">1 {pair.from} = {pair.rate.toFixed(pair.to === "INR" ? 2 : 4)} {pair.to}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
