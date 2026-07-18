"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Brain, HardDrive, Zap, ChevronRight, Server } from "lucide-react";
import { VPS_CATEGORIES } from "@/lib/vpsPlans";

export default function VpsPlans() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium glass border border-brand/20 text-brand mb-4">
            <Server className="w-3.5 h-3.5" /> VPS Hosting
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            High-Performance <span className="gradient-text">VPS Hosting</span>
          </h2>
          <p className="mt-3 text-gray-400 max-w-xl mx-auto">Enterprise-grade virtual private servers with instant provisioning and full root access.</p>
        </motion.div>

        {VPS_CATEGORIES.map((category, catIndex) => (
          <div key={category.id} className="mb-16">
            <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: catIndex * 0.1 }} className="text-2xl font-bold text-white mb-8">
              {category.name}
            </motion.h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.tiers.map((tier, i) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: catIndex * 0.2 + i * 0.1 }}
                  className={`premium-card p-6 flex flex-col ${tier.popular ? "border-brand/30 ring-1 ring-brand/20" : ""}`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand text-white text-xs font-bold rounded-full shadow-lg shadow-brand/25">
                      POPULAR
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
                      <span>{tier.cpu}</span>
                    </li>
                  </ul>

                  <Link
                    href={`https://client.crazynode.in/order/vps/${category.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 group flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white bg-brand hover:bg-brand-dark transition-all hover:shadow-lg hover:shadow-brand/25"
                  >
                    Order Now
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}