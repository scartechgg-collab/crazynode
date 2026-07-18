"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";

const plans = [
  { name: "Hobby", ram: "256 MB", cpu: "Shared", storage: "5 GB", price: 29 },
  { name: "Standard", ram: "512 MB", cpu: "1 Core", storage: "10 GB", price: 69 },
  { name: "Pro", ram: "1 GB", cpu: "2 Cores", storage: "20 GB", price: 129 },
  { name: "Enterprise", ram: "2 GB", cpu: "4 Cores", storage: "40 GB", price: 249 },
];

export default function DiscordBotClient() {
  return (
    <>
      <PageHeader badge="🤖 Discord Bot Hosting" title="Discord Bot" highlight="Hosting" description="Host your Discord bots 24/7 with Node.js, Python, Java support and instant deployment." />
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, i) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`premium-card p-6 flex flex-col ${i === 2 ? "border-brand/30 ring-1 ring-brand/20" : ""}`}>
                {i === 2 && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand text-white text-xs font-bold rounded-full">Popular</div>}
                <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                <div className="mb-4"><span className="text-3xl font-extrabold text-white">₹{plan.price}</span><span className="text-gray-500 text-sm">/mo</span></div>
                <div className="space-y-3 mb-6 flex-1">
                  <div className="flex items-center gap-3"><Check className="w-4 h-4 text-brand shrink-0" /><span className="text-sm text-gray-400">{plan.ram} RAM</span></div>
                  <div className="flex items-center gap-3"><Check className="w-4 h-4 text-brand shrink-0" /><span className="text-sm text-gray-400">{plan.cpu}</span></div>
                  <div className="flex items-center gap-3"><Check className="w-4 h-4 text-brand shrink-0" /><span className="text-sm text-gray-400">{plan.storage} SSD</span></div>
                  <div className="flex items-center gap-3"><Check className="w-4 h-4 text-brand shrink-0" /><span className="text-sm text-gray-400">24/7 Online</span></div>
                  <div className="flex items-center gap-3"><Check className="w-4 h-4 text-brand shrink-0" /><span className="text-sm text-gray-400">Node.js / Python</span></div>
                </div>
                <Link href="/register" className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all group ${i === 2 ? "bg-brand text-white hover:bg-brand-dark" : "border border-dark-border text-white hover:border-brand/50"}`}>
                  Deploy Bot <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
