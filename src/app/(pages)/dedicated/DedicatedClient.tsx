"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";

const plans = [
  { name: "DS-1", cpu: "Ryzen 5 5600X", ram: "32 GB DDR4", storage: "500 GB NVMe", bandwidth: "10 TB", price: 4999 },
  { name: "DS-2", cpu: "Ryzen 7 5800X", ram: "64 GB DDR4", storage: "1 TB NVMe", bandwidth: "20 TB", price: 7999 },
  { name: "DS-3", cpu: "Ryzen 9 5950X", ram: "128 GB DDR4", storage: "2 TB NVMe", bandwidth: "Unlimited", price: 12999 },
  { name: "DS-4", cpu: "Ryzen 9 7950X", ram: "128 GB DDR5", storage: "4 TB NVMe", bandwidth: "Unlimited", price: 19999 },
];

export default function DedicatedClient() {
  return (
    <>
      <PageHeader badge="🖧 Dedicated Servers" title="Bare Metal" highlight="Dedicated Servers" description="Full dedicated hardware with no resource sharing. Maximum performance for large-scale projects." />
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {plans.map((plan, i) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="premium-card p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                    <p className="text-brand font-medium">{plan.cpu}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-extrabold text-white">₹{plan.price.toLocaleString()}</span>
                    <span className="text-gray-500 text-sm">/mo</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[`${plan.ram} RAM`, plan.storage, `${plan.bandwidth} Transfer`, "1 Gbps Port", "Full Root Access", "IPMI Access", "DDoS Protection", "24/7 Support"].map((f) => (
                    <div key={f} className="flex items-center gap-2"><Check className="w-4 h-4 text-brand shrink-0" /><span className="text-sm text-gray-400">{f}</span></div>
                  ))}
                </div>
                <Link href="/contact" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold border border-dark-border text-white hover:border-brand/50 hover:bg-white/5 transition-all group">
                  Configure & Order <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
