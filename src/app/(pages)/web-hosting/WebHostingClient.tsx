"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";

const plans = [
  { name: "Basic", storage: "10 GB SSD", sites: "1 Website", email: "5 Emails", ssl: true, price: 49 },
  { name: "Business", storage: "50 GB SSD", sites: "10 Websites", email: "25 Emails", ssl: true, price: 149 },
  { name: "Enterprise", storage: "200 GB SSD", sites: "Unlimited", email: "Unlimited", ssl: true, price: 399 },
];

export default function WebHostingClient() {
  return (
    <>
      <PageHeader badge="🌐 Web Hosting" title="Premium" highlight="Web Hosting" description="Fast, secure, and reliable web hosting with free SSL, daily backups, and 99.99% uptime guarantee." />
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`premium-card p-6 flex flex-col ${i === 1 ? "border-brand/30 ring-1 ring-brand/20" : ""}`}>
                {i === 1 && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand text-white text-xs font-bold rounded-full">Popular</div>}
                <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                <div className="mb-4"><span className="text-3xl font-extrabold text-white">₹{plan.price}</span><span className="text-gray-500 text-sm">/mo</span></div>
                <div className="space-y-3 mb-6 flex-1 relative">
                  {[plan.storage, plan.sites, plan.email, "Free SSL", "Daily Backups", "cPanel Access"].map((f) => (
                    <div key={f} className="flex items-center gap-3"><Check className="w-4 h-4 text-brand shrink-0" /><span className="text-sm text-gray-400">{f}</span></div>
                  ))}
                  
                  {/* Premium Coming Soon Overlay */}
                  <div className="absolute inset-0 bg-dark-bg/85 backdrop-blur-[2px] flex flex-col items-center justify-center rounded-xl border border-brand/20">
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
    </>
  );
}
