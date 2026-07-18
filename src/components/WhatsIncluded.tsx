"use client";

import { motion } from "framer-motion";
import { Zap, Shield, HardDrive, Headphones } from "lucide-react";

const includedFeatures = [
  { icon: Zap, title: "Instant Setup", desc: "Server deployed in under 60 seconds" },
  { icon: Shield, title: "DDoS Protection", desc: "Enterprise-grade 1 Tbps mitigation" },
  { icon: HardDrive, title: "NVMe Storage", desc: "7,000 MB/s read speed SSDs" },
  { icon: Headphones, title: "24/7 Support", desc: "Expert help available around the clock" },
];

export default function WhatsIncluded() {
  return (
    <section className="py-16 border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl font-bold text-white text-center mb-12">
          What&apos;s <span className="gradient-text">Included</span>
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {includedFeatures.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="premium-card p-6 text-center">
              <f.icon className="w-10 h-10 text-brand mx-auto mb-4" />
              <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
