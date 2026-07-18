"use client";

import { motion } from "framer-motion";
import { Zap, Cpu, HardDrive, Shield, Activity, Globe, Database, Link as LinkIcon, Package, Server } from "lucide-react";
import { FEATURES } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  Zap, Cpu, HardDrive, Shield, Activity, Globe, Database, Link: LinkIcon, Package, Server,
};

export default function Features() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #060606 0%, #0a0a0a 50%, #060606 100%)" }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium glass border border-brand/20 text-brand mb-4">
            ⚡ Enterprise Infrastructure
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Why Choose <span className="gradient-text">CrazyNode</span>?
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            Enterprise-grade infrastructure designed for maximum gaming performance.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((feature, i) => {
            const Icon = iconMap[feature.icon] || Zap;
            const isLarge = i === 0 || i === 3;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`premium-card p-6 lg:p-8 group ${isLarge ? "md:col-span-2 lg:col-span-1" : ""}`}
              >
                <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center mb-5 group-hover:bg-brand/20 transition-colors">
                  <Icon className="w-6 h-6 text-brand" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
