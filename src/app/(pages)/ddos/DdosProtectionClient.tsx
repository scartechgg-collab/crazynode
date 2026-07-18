"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, Zap, Globe2, Server, ChevronRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";

export default function DdosProtectionClient() {
  return (
    <>
      <PageHeader
        badge="🛡️ DDoS Protection"
        title="Crazy+"
        highlight="DDoS Protection"
        description="Enterprise-grade DDoS mitigation for your game servers, VPS, and web applications. Powered by Crazy+."
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">
              Best-in-Class <span className="gradient-text">DDoS Protection</span>
            </h2>
            <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
              Crazy+ is our proprietary DDoS mitigation platform designed to keep your services online during the largest attacks.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              { icon: ShieldCheck, title: "1 Tbps Mitigation", desc: "Absorb and filter attacks up to 1 terabit per second without impacting legitimate traffic." },
              { icon: Zap, title: "Instant Activation", desc: "Protection activates automatically within seconds of detecting an attack." },
              { icon: Globe2, title: "Global Network", desc: "8 scrubbing centers worldwide ensure low-latency protection regardless of attack origin." },
              { icon: Server, title: "Hardware Filtering", desc: "Dedicated FPGA-based appliances provide line-rate filtering with zero performance overhead." },
              { icon: ShieldCheck, title: "Zero Downtime", desc: "Our SLA guarantees 99.99% uptime even during sustained attacks." },
              { icon: Zap, title: "Always-On", desc: "Protection is active 24/7 — no manual intervention required." },
            ].map((feature, i) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="premium-card p-6 text-center">
                <feature.icon className="w-10 h-10 text-brand mx-auto mb-4" />
                <h3 className="text-base font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">How Crazy+ Works</h3>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { step: "1", title: "Detection", desc: "Our AI-powered monitoring system identifies attack patterns in real-time." },
                { step: "2", title: "Scrubbing", desc: "Malicious traffic is diverted to our global scrubbing centers for filtering." },
                { step: "3", title: "Delivery", desc: "Clean traffic is forwarded to your server with minimal latency impact." },
              ].map((step) => (
                <div key={step.step} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-brand">{step.step}</span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                  <p className="text-sm text-gray-500">{step.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 border-t border-dark-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl font-bold text-white mb-4">
            Ready for Enterprise Protection?
          </motion.h3>
          <p className="text-gray-400 mb-8">
            Crazy+ DDoS protection is included with all our hosting plans. For custom enterprise solutions, contact our team.
          </p>
          <Link
            href="https://client.crazynode.in/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand text-white font-semibold rounded-xl hover:bg-brand-dark transition-all hover:shadow-xl hover:shadow-brand/25 group"
          >
            Contact Sales
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}