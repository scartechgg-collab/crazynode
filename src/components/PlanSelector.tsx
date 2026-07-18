"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Cpu, MapPin, Brain, HardDrive, Zap, ChevronRight, Server } from "lucide-react";
import { LOCATIONS, MINECRAFT_PROCESSORS, type Processor, type PlanTier } from "@/lib/plans";

type Category = "AMD" | "INTEL";
const CATEGORIES: Category[] = ["AMD", "INTEL"];

const CATEGORY_ACCENT: Record<Category, string> = {
  AMD: "from-orange-500/20 to-amber-500/10",
  INTEL: "from-sky-500/20 to-blue-500/10",
};

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

function PlanCard({ tier, location, isPopular }: { tier: PlanTier; location: string; isPopular?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative premium-card p-5 sm:p-6 flex flex-col ${isPopular ? "border-brand/40 ring-1 ring-brand/20" : ""}`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-brand text-white text-[10px] font-bold shadow-lg shadow-brand/25">
          Most Popular
        </div>
      )}

      <div className="text-center mb-5 pb-5 border-b border-white/[.07]">
        <p className="text-[10px] font-bold tracking-[.18em] text-gray-500 uppercase">{tier.name}</p>
        <p className="mt-2 text-3xl font-extrabold text-price">₹{tier.price.toLocaleString("en-IN")}<span className="text-sm text-gray-500 font-normal">/mo</span></p>
      </div>

      <ul className="space-y-3 text-xs text-gray-300 flex-1">
        <li className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-lg bg-white/[.04] border border-white/[.07] flex items-center justify-center"><Brain className="w-3.5 h-3.5 text-brand" /></span>
          <span>{tier.ram} RAM</span>
        </li>
        <li className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-lg bg-white/[.04] border border-white/[.07] flex items-center justify-center"><HardDrive className="w-3.5 h-3.5 text-brand" /></span>
          <span>{tier.storage}</span>
        </li>
        <li className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-lg bg-white/[.04] border border-white/[.07] flex items-center justify-center"><Zap className="w-3.5 h-3.5 text-brand" /></span>
          <span>CPU: {tier.cpu}</span>
        </li>
        {tier.perks.map((perk) => (
          <li key={perk.label} className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-lg bg-white/[.04] border border-white/[.07] flex items-center justify-center text-xs">{perk.icon}</span>
            <span>{perk.useLocation ? `${location} Location` : perk.label}</span>
          </li>
        ))}
      </ul>

      <Link href="/register" className="mt-6 group flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white bg-brand hover:bg-brand-dark transition-all hover:shadow-lg hover:shadow-brand/25">
        Order Now
        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
}

export default function PlanSelector({ gameName = "Minecraft", isFirstSection = false }: { gameName?: string; isFirstSection?: boolean }) {
  const [category, setCategory] = useState<Category>("AMD");
  const [processorId, setProcessorId] = useState<string | null>(null);
  const [locationId, setLocationId] = useState<string>(LOCATIONS[0].id);

  const processors = useMemo(() => MINECRAFT_PROCESSORS.filter((p) => p.category === category), [category]);
  const selected = useMemo<Processor | null>(() => MINECRAFT_PROCESSORS.find((p) => p.id === processorId) || null, [processorId]);
  const location = useMemo(() => LOCATIONS.find((l) => l.id === locationId) || LOCATIONS[0], [locationId]);

  return (
    <section className={`relative overflow-hidden ${isFirstSection ? "pt-36 sm:pt-44 pb-24" : "py-24"}`}>
      <div className="absolute inset-0 bg-dark-bg" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/[.06]" />
      {isFirstSection && (
        <>
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,59,102,0.06) 1px, transparent 0)", backgroundSize: "50px 50px" }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px]" style={{ background: "radial-gradient(ellipse, rgba(255,59,102,0.1) 0%, transparent 70%)" }} />
        </>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium glass border border-brand/20 text-brand mb-4">
            <Server className="w-3.5 h-3.5" /> Build Your Server
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Configure Your <span className="gradient-text">{gameName} Plan</span>
          </h2>
          <p className="mt-3 text-gray-400 max-w-xl mx-auto">Pick a region, choose your processor, and select a tier. Setup is instant.</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Step 1: Location */}
          <div className="premium-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-9 h-9 rounded-xl bg-brand/[.08] border border-brand/15 flex items-center justify-center"><MapPin className="w-4 h-4 text-brand" /></span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">Step 1</p>
                <h3 className="text-sm font-bold text-white">Location</h3>
              </div>
            </div>
            <div className="space-y-2">
              {LOCATIONS.map((loc) => (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => setLocationId(loc.id)}
                  className={`w-full text-left rounded-xl p-3 border transition-all ${locationId === loc.id ? "bg-brand/[.08] border-brand/40" : "bg-white/[.02] border-white/[.07] hover:bg-white/[.04]"}`}
                >
                  <p className="text-sm font-semibold text-white">{loc.label}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{loc.city} data center</p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Processor Category */}
          <div className="premium-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-9 h-9 rounded-xl bg-brand/[.08] border border-brand/15 flex items-center justify-center"><Cpu className="w-4 h-4 text-brand" /></span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">Step 2</p>
                <h3 className="text-sm font-bold text-white">Processor Category</h3>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => { setCategory(cat); setProcessorId(null); }}
                  className={`rounded-xl p-3 border text-sm font-bold transition-all bg-gradient-to-br ${CATEGORY_ACCENT[cat]} ${category === cat ? "border-brand/50 text-white shadow-lg shadow-brand/10" : "border-white/[.07] text-gray-400 hover:text-white"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="space-y-2">
              <AnimatePresence mode="wait">
                <motion.div key={category} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="space-y-2">
                  {processors.map((proc) => (
                    <button
                      key={proc.id}
                      type="button"
                      onClick={() => setProcessorId(proc.id)}
                      className={`w-full text-left rounded-xl p-3 border transition-all ${processorId === proc.id ? "bg-brand/[.08] border-brand/40" : "bg-white/[.02] border-white/[.07] hover:bg-white/[.04]"}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-white">{proc.name}</p>
                        {proc.badge && <span className="text-[9px] rounded-full bg-brand/10 border border-brand/15 px-2 py-0.5 text-brand font-medium">{proc.badge}</span>}
                      </div>
                      <p className="text-[10px] text-gray-500 mt-0.5">{proc.tiers.length} tiers available</p>
                    </button>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Step 3: Summary */}
          <div className="premium-card p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-9 h-9 rounded-xl bg-brand/[.08] border border-brand/15 flex items-center justify-center"><Zap className="w-4 h-4 text-brand" /></span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">Step 3</p>
                <h3 className="text-sm font-bold text-white">Summary</h3>
              </div>
            </div>
            <div className="space-y-3 text-xs flex-1">
              <div className="flex items-center justify-between py-2 border-b border-white/[.06]">
                <span className="text-gray-500">Location</span>
                <AnimatedValue value={location.label} />
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/[.06]">
                <span className="text-gray-500">Category</span>
                <AnimatedValue value={category} />
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-500">Processor</span>
                <AnimatedValue value={selected ? selected.name : "Not selected"} />
              </div>
            </div>
            <p className="mt-5 text-[10px] text-gray-500 leading-relaxed">
              🛡️ Enterprise DDoS Protection Included<br />
              🔧 Custom Plans Available (24GB–64GB RAM)<br />
              📩 <Link href="/contact" className="text-brand hover:underline">Contact Us</Link> For Custom Requirements
            </p>
          </div>
        </div>

        {/* Plans */}
        <div className="mt-14">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div key={`${selected.id}-${location.id}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
                <div className="text-center mb-8">
                  <p className="text-[10px] uppercase tracking-[.18em] text-gray-500 font-semibold">These are your {gameName} Server Plans</p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2">{selected.name} · {location.label}</h3>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {selected.tiers.map((tier) => (
                    <PlanCard key={tier.name} tier={tier} location={location.label} isPopular={tier.name === "PRO"} />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="text-center premium-card p-12">
                <Cpu className="w-10 h-10 text-gray-600 mx-auto mb-4" />
                <p className="text-sm font-semibold text-white">Pick a processor to view plans</p>
                <p className="text-xs text-gray-500 mt-2">Tiers, RAM, and storage options appear once you choose a CPU.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
