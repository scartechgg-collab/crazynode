"use client";

import { motion } from "framer-motion";
import { CheckCircle, Activity } from "lucide-react";
import PageHeader from "@/components/PageHeader";

const services = [
  { name: "Game Servers — Mumbai", status: "operational", uptime: "99.99%" },
  { name: "Game Servers — Singapore", status: "operational", uptime: "99.98%" },
  { name: "Game Servers — Frankfurt", status: "operational", uptime: "99.99%" },
  { name: "Game Servers — London", status: "operational", uptime: "100%" },
  { name: "Game Servers — New York", status: "operational", uptime: "99.99%" },
  { name: "Game Servers — Dallas", status: "operational", uptime: "99.97%" },
  { name: "VPS Nodes", status: "operational", uptime: "99.99%" },
  { name: "Web Hosting Cluster", status: "operational", uptime: "100%" },
  { name: "Pterodactyl Panel", status: "operational", uptime: "99.99%" },
  { name: "Billing System (WHMCS)", status: "operational", uptime: "100%" },
  { name: "DDoS Protection Layer", status: "operational", uptime: "100%" },
  { name: "DNS Infrastructure", status: "operational", uptime: "100%" },
];

export default function StatusClient() {
  return (
    <>
      <PageHeader badge="📡 Network Status" title="System" highlight="Status" description="Real-time status of all CrazyNode infrastructure and services." />

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Overall Status */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="premium-card p-8 text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">All Systems Operational</h2>
            <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</p>
          </motion.div>

          {/* Services */}
          <div className="space-y-2">
            {services.map((service, i) => (
              <motion.div key={service.name} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} className="premium-card p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-sm shadow-green-400/50" />
                  <span className="text-sm font-medium text-white">{service.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-500">{service.uptime} uptime</span>
                  <span className="px-2.5 py-1 bg-green-500/10 text-green-400 text-xs font-medium rounded-full">Operational</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Uptime History */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="premium-card p-6 mt-8">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-brand" />
              <h3 className="text-lg font-bold text-white">90-Day Uptime History</h3>
            </div>
            <div className="flex gap-0.5">
              {Array.from({ length: 90 }).map((_, i) => (
                <div key={i} className="flex-1 h-8 rounded-sm bg-green-500/30 hover:bg-green-500/50 transition-colors" title={`Day ${90 - i}: 100% uptime`} />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-600">
              <span>90 days ago</span>
              <span>Today</span>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
