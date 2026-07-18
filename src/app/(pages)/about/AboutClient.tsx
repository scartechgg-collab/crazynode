"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Users, Globe } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import CTA from "@/components/CTA";

const values = [
  { icon: Zap, title: "Performance First", desc: "We obsess over every millisecond. Our infrastructure is optimized for the lowest possible latency and highest throughput." },
  { icon: Shield, title: "Security Always", desc: "Enterprise-grade DDoS protection, encrypted backups, and hardened servers keep your data and players safe." },
  { icon: Users, title: "Community Driven", desc: "Built by gamers, for gamers. We understand what server owners need because we are server owners." },
  { icon: Globe, title: "Global Reach", desc: "8 data centers worldwide ensure your players get the best experience no matter where they are." },
];

const timeline = [
  { year: "2022", title: "Founded", desc: "CrazyNode was born with a mission to provide premium hosting at fair prices." },
  { year: "2023", title: "1,000 Servers", desc: "Reached our first milestone of 1,000 active game servers." },
  { year: "2024", title: "Global Expansion", desc: "Expanded to 8 data center locations across 4 continents." },
  { year: "2025", title: "50,000 Clients", desc: "Celebrated 50,000 happy clients and 10,000+ active servers." },
  { year: "2026", title: "Enterprise Launch", desc: "Launched enterprise solutions with dedicated account management." },
];

export default function AboutClient() {
  return (
    <>
      <PageHeader badge="🏢 About Us" title="About" highlight="CrazyNode" description="We're on a mission to provide the most powerful, reliable, and affordable game server hosting on the planet." />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold text-white mb-6">Our <span className="gradient-text">Story</span></h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>CrazyNode was founded in 2022 by a team of passionate gamers and system administrators who were frustrated with the state of game server hosting. Slow hardware, poor support, and unreliable uptime were the norm — and we knew we could do better.</p>
                <p>Today, we power over 10,000 game servers for 50,000+ clients worldwide. Our infrastructure runs on the latest AMD Ryzen 9 processors, enterprise NVMe SSDs, and 1 Tbps DDoS protection to deliver an unmatched hosting experience.</p>
                <p>We&apos;re committed to continuous innovation, investing heavily in R&D to stay at the forefront of hosting technology and provide our clients with the best possible performance.</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid grid-cols-2 gap-4">
              {[{ val: "10,000+", label: "Active Servers" }, { val: "50,000+", label: "Happy Clients" }, { val: "99.99%", label: "Uptime SLA" }, { val: "8", label: "Global Locations" }].map((s) => (
                <div key={s.label} className="premium-card p-6 text-center">
                  <p className="text-2xl font-extrabold gradient-text mb-1">{s.val}</p>
                  <p className="text-sm text-gray-500">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Values */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Our <span className="gradient-text">Values</span></h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => (
                <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="premium-card p-6">
                  <v.icon className="w-10 h-10 text-brand mb-4" />
                  <h3 className="text-base font-bold text-white mb-2">{v.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h2 className="text-3xl font-bold text-white text-center mb-12">Our <span className="gradient-text">Journey</span></h2>
            <div className="max-w-3xl mx-auto space-y-0">
              {timeline.map((t, i) => (
                <motion.div key={t.year} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex gap-6 pb-8 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold text-sm shrink-0">{t.year}</div>
                    {i < timeline.length - 1 && <div className="w-px flex-1 bg-dark-border mt-2" />}
                  </div>
                  <div className="pb-8">
                    <h3 className="text-lg font-bold text-white">{t.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{t.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
