"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Cpu, MapPin, Brain, HardDrive, Zap, ChevronRight, Server, ShoppingCart } from "lucide-react";
import { VPS_CATEGORIES as DEFAULT_VPS, type VpsCategory, type VpsTier } from "@/lib/vpsPlans";
import { vpsProductUrl } from "@/lib/productUrls";
import { useCart } from "./CartContext";
import { useCurrency } from "./CurrencyContext";

function AnimatedValue({ value }: { value: string }) {
  return (
    <span className="relative inline-flex overflow-hidden align-middle">
      <AnimatePresence mode="wait">
        <motion.span
          key={value}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="block text-white font-semibold"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function PlanCard({ tier, categoryId, isPopular }: { tier: VpsTier; categoryId: string; isPopular?: boolean }) {
  const { addToCart, lastAdded } = useCart();
  const { convert, symbol } = useCurrency();
  const id = `vps-${categoryId}-${tier.name}`;
  const isLastAdded = lastAdded === id;
  const priceConverted = convert(tier.price);

  const handleAddToCart = () => {
    addToCart({
      id,
      name: `${tier.name} - ${categoryId}`,
      processor: categoryId,
      price: tier.price,
      ram: tier.ram,
      storage: tier.storage,
      cpu: tier.cpu,
      url: vpsProductUrl(categoryId, tier.name),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative premium-card p-5 sm:p-6 flex flex-col ${isPopular ? "border-brand/40 ring-1 ring-brand/20" : ""} ${isLastAdded ? "ring-2 ring-emerald-400/50 border-emerald-400/30" : ""}`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-brand text-white text-[10px] font-bold shadow-lg shadow-brand/25">POPULAR</div>
      )}
      <div className="text-center mb-5 pb-5 border-b border-white/[.07]">
        <p className="text-[10px] font-bold tracking-[.18em] text-gray-500 uppercase">{tier.name}</p>
        <p className="mt-2 text-3xl font-extrabold text-price">{symbol}{priceConverted.value}<span className="text-sm text-gray-500 font-normal">/mo</span></p>
      </div>
      <ul className="space-y-3 text-xs text-gray-300 flex-1">
        <li className="flex items-center gap-3"><span className="w-7 h-7 rounded-lg bg-white/[.04] border border-white/[.07] flex items-center justify-center"><Brain className="w-3.5 h-3.5 text-brand" /></span><span>{tier.ram} RAM</span></li>
        <li className="flex items-center gap-3"><span className="w-7 h-7 rounded-lg bg-white/[.04] border border-white/[.07] flex items-center justify-center"><HardDrive className="w-3.5 h-3.5 text-brand" /></span><span>{tier.storage}</span></li>
        <li className="flex items-center gap-3"><span className="w-7 h-7 rounded-lg bg-white/[.04] border border-white/[.07] flex items-center justify-center"><Zap className="w-3.5 h-3.5 text-brand" /></span><span>{tier.cpu}</span></li>
      </ul>
      <div className="mt-6 grid grid-cols-[1fr_auto] gap-2">
        <button onClick={handleAddToCart} className={`group flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all ${isLastAdded ? "bg-emerald-500 text-white" : "bg-white/[0.06] border border-white/[0.08] text-white hover:bg-white/[0.1]"}`}>
          <ShoppingCart className={`w-4 h-4 ${isLastAdded ? "animate-bounce" : "group-hover:scale-110 transition-transform"}`} />
          {isLastAdded ? "Added!" : "Cart"}
        </button>
        <Link href={vpsProductUrl(categoryId, tier.name)} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-sm font-semibold text-white bg-brand hover:bg-brand-dark transition-all hover:shadow-lg hover:shadow-brand/25">
          Order <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function VpsSelector() {
  const [processorId, setProcessorId] = useState<string | null>(null);
  const [allCats, setAllCats] = useState<VpsCategory[]>(DEFAULT_VPS);

  useEffect(() => {
    fetch("/api/content/vps_categories")
      .then((r) => r.json())
      .then((d) => {
        if (d.value && Array.isArray(d.value) && d.value.length > 0) setAllCats(d.value);
      })
      .catch(() => {});
  }, []);

  const selected = useMemo<VpsCategory | null>(() => allCats.find((p: VpsCategory) => p.id === processorId) || null, [processorId, allCats]);

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-dark-bg" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/[.06]" />
      <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(227,23,78,0.06) 1px, transparent 0)", backgroundSize: "50px 50px" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium glass border border-brand/20 text-brand mb-4">
            <Server className="w-3.5 h-3.5" /> Build Your VPS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Configure Your <span className="gradient-text">VPS</span>
          </h2>
          <p className="mt-3 text-gray-400 max-w-xl mx-auto">Choose your processor and select a tier. Setup is instant.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {/* Step 1: Processor */}
          <div className="premium-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-9 h-9 rounded-xl bg-brand/[.08] border border-brand/15 flex items-center justify-center"><Cpu className="w-4 h-4 text-brand" /></span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">Step 1</p>
                <h3 className="text-sm font-bold text-white">Choose Processor</h3>
              </div>
            </div>
            <div className="space-y-2">
              <AnimatePresence mode="wait">
                <motion.div key="processors" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="space-y-2">
                  {allCats.map((proc: VpsCategory) => (
                    <button
                      key={proc.id}
                      type="button"
                      onClick={() => setProcessorId(proc.id)}
                      className={`w-full text-left rounded-xl p-3 border transition-all ${processorId === proc.id ? "bg-brand/[.08] border-brand/40" : "bg-white/[.02] border-white/[.07] hover:bg-white/[.04]"}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-white">{proc.name}</p>
                      </div>
                      <p className="text-[10px] text-gray-500 mt-0.5">{proc.tiers.length} tiers available</p>
                    </button>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Step 2: Summary */}
          <div className="premium-card p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-9 h-9 rounded-xl bg-brand/[.08] border border-brand/15 flex items-center justify-center"><Zap className="w-4 h-4 text-brand" /></span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">Step 2</p>
                <h3 className="text-sm font-bold text-white">Summary</h3>
              </div>
            </div>
            <div className="space-y-3 text-xs flex-1">
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-500">Processor</span>
                <AnimatedValue value={selected ? selected.name : "Not selected"} />
              </div>
            </div>
            <p className="mt-5 text-[10px] text-gray-500 leading-relaxed">
              🛡️ Enterprise DDoS Protection Included<br />
              🔧 Custom Plans Available<br />
              📩 <Link href="/contact" className="text-brand hover:underline">Contact Us</Link> For Custom Requirements
            </p>
          </div>
        </div>

        {/* Plans */}
        <div className="mt-14">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div key={selected.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
                <div className="text-center mb-8">
                  <p className="text-[10px] uppercase tracking-[.18em] text-gray-500 font-semibold">These are your VPS Plans</p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2">{selected.name}</h3>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {selected.tiers.map((tier) => (
                    <PlanCard key={tier.name} tier={tier} categoryId={selected.id} isPopular={tier.popular} />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="text-center premium-card p-12">
                <Cpu className="w-10 h-10 text-gray-600 mx-auto mb-4" />
                <p className="text-sm font-semibold text-white">Pick a processor to view plans</p>
                <p className="text-xs text-gray-500 mt-2">Tiers and specifications appear once you choose a CPU.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}