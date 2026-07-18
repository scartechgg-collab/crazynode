"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Bot, Cloud, Gamepad2, Globe2, Server, Check } from "lucide-react";
import Link from "next/link";

const categories = [
  { name: "Minecraft Hosting", type: "Game", icon: "⛏️", price: 180, href: "/minecraft", summary: "Vanilla, Paper, Forge & Fabric", features: ["2 GB RAM", "One-click modpacks", "Unlimited slots"], featured: true },
  { name: "Discord Bot Hosting", type: "Automation", iconComponent: Bot, price: 49, href: "/discord-bot", summary: "Always-on bot runtime", features: ["Node.js & Python", "Git deployment", "Live logs"], featured: true },
  { name: "VPS Hosting", type: "Cloud", iconComponent: Cloud, price: 699, href: "/vps", summary: "Flexible virtual cloud compute", features: ["Root access", "NVMe storage", "Instant scaling"] },
  { name: "Dedicated Servers", type: "Cloud", iconComponent: Server, price: 4999, href: "/dedicated", summary: "Exclusive enterprise hardware", features: ["Dedicated CPU", "10 Gbps uplink", "Remote management"] },
  { name: "FiveM Hosting", type: "Game", icon: "🚗", price: 299, href: "/fivem", summary: "High-clock GTA roleplay servers", features: ["txAdmin included", "OneSync ready", "Artifact updates"], comingSoon: true },
  { name: "GTA V Hosting", type: "Game", icon: "🎮", price: 349, href: "/gtav", summary: "Mod-ready GTA multiplayer", features: ["8 GB RAM", "Custom resources", "Priority CPU"], comingSoon: true },
  { name: "Rust Hosting", type: "Game", icon: "🔧", price: 199, href: "/rust", summary: "Optimized survival performance", features: ["Oxide/uMod", "Auto-wipe", "Fast startup"], comingSoon: true },
  { name: "ARK Hosting", type: "Game", icon: "🦖", price: 249, href: "/ark", summary: "Powerful cluster-ready servers", features: ["Cluster support", "Mod manager", "Scheduled restarts"], comingSoon: true },
  { name: "CS2 Hosting", type: "Game", icon: "🎯", price: 149, href: "/cs2", summary: "Competitive low-latency nodes", features: ["High tick rate", "Workshop maps", "GOTV support"], comingSoon: true },
  { name: "Valheim Hosting", type: "Game", icon: "⚔️", price: 149, href: "/valheim", summary: "Persistent Viking worlds", features: ["Crossplay ready", "Thunderstore mods", "World backups"], comingSoon: true },
  { name: "Hytale Hosting", type: "Game", icon: "🏰", price: 99, href: "/hytale", summary: "Future-ready hosting platform", features: ["Day-one support", "Easy management", "Scalable RAM"], comingSoon: true },
  { name: "Web Hosting", type: "Web", iconComponent: Globe2, price: 79, href: "/web-hosting", summary: "Fast managed website hosting", features: ["Free SSL", "Email accounts", "Daily backups"], comingSoon: true },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[#070708]" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/[.06]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium glass text-gray-300 mb-4">
            <Gamepad2 className="w-3.5 h-3.5 text-brand" /> Complete Hosting Catalog
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">Choose Your <span className="gradient-text">Plan</span></h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">Every workload has a purpose-built home. Pick a category to see its complete plans and deploy in minutes.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map((category, index) => {
            const Icon = category.iconComponent;
            return (
              <motion.article
                key={category.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(index * .045, .35) }}
                className={`premium-card p-5 flex flex-col min-h-[300px] ${category.featured ? "border-brand/30" : ""}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="w-11 h-11 rounded-xl bg-white/[.04] border border-white/[.07] flex items-center justify-center text-xl">
                    {Icon ? <Icon className="w-5 h-5 text-gray-300" /> : category.icon}
                  </div>
                  <div className="flex items-center gap-2">
                    {"comingSoon" in category && <span className="rounded-full bg-brand/10 border border-brand/20 px-2 py-0.5 text-[8px] font-bold text-brand uppercase tracking-wider animate-pulse">Soon</span>}
                    {category.featured && <span className="rounded-full bg-brand/10 border border-brand/15 px-2.5 py-1 text-[9px] font-bold text-brand">Popular</span>}
                    <span className="rounded-full bg-white/[.035] border border-white/[.06] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-gray-500">{category.type}</span>
                  </div>
                </div>

                <div className="mt-5">
                  <h3 className="text-base font-bold text-white">{category.name}</h3>
                  <p className="mt-1 text-xs text-gray-500">{category.summary}</p>
                </div>

                <div className="mt-5 flex items-end gap-1 border-b border-white/[.06] pb-5">
                  <span className="text-xs text-gray-500 mb-1.5">from</span>
                  <span className="text-3xl font-extrabold text-white">₹{category.price.toLocaleString("en-IN")}</span>
                  <span className="text-xs text-gray-500 mb-1.5">/mo</span>
                </div>

                <div className="space-y-2.5 py-5 flex-1 relative">
                  {category.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2.5 text-xs text-gray-400">
                      <span className="w-4 h-4 rounded-full bg-white/[.04] flex items-center justify-center"><Check className="w-2.5 h-2.5 text-brand" /></span>
                      {feature}
                    </div>
                  ))}
                  {"comingSoon" in category && (
                    <div className="absolute inset-0 bg-dark-bg/85 backdrop-blur-[1.5px] flex items-center justify-center rounded-lg border border-brand/15">
                      <span className="px-2.5 py-1 bg-brand/10 border border-brand/20 rounded-full text-[9px] font-bold text-brand tracking-widest uppercase">
                        Coming Soon
                      </span>
                    </div>
                  )}
                </div>

                {"comingSoon" in category ? (
                  <button disabled className="w-full flex items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] py-3 text-xs font-semibold text-gray-600 cursor-not-allowed">
                    Coming Soon
                  </button>
                ) : (
                  <Link href={category.href} className="group flex items-center justify-between rounded-xl border border-white/[.08] bg-white/[.025] px-4 py-3 text-xs font-semibold text-white hover:border-brand/30 hover:bg-white/[.045] transition-all">
                    Explore plans
                    <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </Link>
                )}
              </motion.article>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-gray-500">
          <span className="inline-flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />Instant provisioning</span>
          <span className="hidden sm:block text-gray-700">•</span>
          <span>No setup fees</span>
          <span className="hidden sm:block text-gray-700">•</span>
          <span>24/7 infrastructure support</span>
        </div>
      </div>
    </section>
  );
}
