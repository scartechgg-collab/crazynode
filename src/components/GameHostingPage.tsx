"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, ChevronRight, Shield, Zap, HardDrive, Headphones } from "lucide-react";
import PageHeader from "./PageHeader";

interface GameHostingPageProps {
  game: {
    name: string;
    icon: string;
    description: string;
    startingPrice: number;
    features: string[];
    specs: { ram: string; cpu: string; storage: string };
  };
}

const plans = [
  { name: "Starter", ram: "2 GB", cpu: "1 Core", storage: "20 GB", price: 99 },
  { name: "Standard", ram: "4 GB", cpu: "2 Cores", storage: "50 GB", price: 199 },
  { name: "Pro", ram: "8 GB", cpu: "4 Cores", storage: "100 GB", price: 399 },
  { name: "Ultimate", ram: "16 GB", cpu: "6 Cores", storage: "250 GB", price: 799 },
];

export default function GameHostingPage({ game }: GameHostingPageProps) {
  return (
    <>
      <PageHeader
        badge={`${game.icon} ${game.name} Hosting`}
        title={`Premium ${game.name}`}
        highlight="Hosting"
        description={game.description}
      />

      {/* Plans */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`premium-card p-6 flex flex-col ${i === 2 ? "border-brand/30 ring-1 ring-brand/20" : ""}`}
              >
                {i === 2 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand text-white text-xs font-bold rounded-full">
                    Popular
                  </div>
                )}
                <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-extrabold text-white">₹{plan.price}</span>
                  <span className="text-gray-500 text-sm">/mo</span>
                </div>
                <div className="space-y-3 mb-6 flex-1 relative">
                  <div className="flex items-center gap-3"><Check className="w-4 h-4 text-brand shrink-0" /><span className="text-sm text-gray-400">{plan.ram} RAM</span></div>
                  <div className="flex items-center gap-3"><Check className="w-4 h-4 text-brand shrink-0" /><span className="text-sm text-gray-400">{plan.cpu}</span></div>
                  <div className="flex items-center gap-3"><Check className="w-4 h-4 text-brand shrink-0" /><span className="text-sm text-gray-400">{plan.storage} NVMe SSD</span></div>
                  {game.features.slice(0, 3).map((f) => (
                    <div key={f} className="flex items-center gap-3"><Check className="w-4 h-4 text-brand shrink-0" /><span className="text-sm text-gray-400">{f}</span></div>
                  ))}
                  
                  {/* Premium Coming Soon Overlay */}
                  <div className="absolute inset-0 bg-dark-bg/80 backdrop-blur-[2px] flex flex-col items-center justify-center rounded-xl border border-brand/20">
                    <span className="px-3 py-1 bg-brand/20 border border-brand/40 rounded-full text-[10px] font-bold text-brand tracking-widest uppercase animate-pulse-glow shadow-lg shadow-brand/10">
                      Coming Soon
                    </span>
                    <p className="text-[10px] text-gray-500 mt-2">Currently in final testing</p>
                  </div>
                </div>
                <button disabled className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold border border-white/5 bg-white/[0.02] text-gray-500 cursor-not-allowed">
                  Coming Soon
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 border-t border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            What&apos;s <span className="gradient-text">Included</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: "Instant Setup", desc: "Server deployed in under 60 seconds" },
              { icon: Shield, title: "DDoS Protection", desc: "Enterprise-grade 1 Tbps mitigation" },
              { icon: HardDrive, title: "NVMe Storage", desc: "7,000 MB/s read speed SSDs" },
              { icon: Headphones, title: "24/7 Support", desc: "Expert help available around the clock" },
            ].map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="premium-card p-6 text-center">
                <f.icon className="w-10 h-10 text-brand mx-auto mb-4" />
                <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
