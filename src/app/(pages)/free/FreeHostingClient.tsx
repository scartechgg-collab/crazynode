"use client";

import { motion } from "framer-motion";
import { Gift, Brain, HardDrive, Zap, Database, ChevronRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export default function FreeHostingClient() {
  return (
    <>
      <PageHeader
        badge="🎁 Free Hosting"
        title="Earn Free"
        highlight="Game Hosting"
        description="Get free Minecraft server hosting by inviting friends to our Discord community. No credit card required."
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
              Join our Discord server and invite friends to earn free hosting credits.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { step: "1", title: "Join Discord", desc: "Join our official Discord server to get started." },
              { step: "2", title: "Invite Friends", desc: "Invite 8 friends to our Discord server using your unique invite link." },
              { step: "3", title: "Get Free Server", desc: "Once verified, you’ll receive a free Minecraft server with our standard specs." },
            ].map((step) => (
              <motion.div key={step.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
                <div className="w-16 h-16 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-brand">{step.step}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="premium-card p-8 max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-bold text-white mb-4">Free Server Specifications</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-3 justify-center"><Zap className="w-4 h-4 text-brand" /> 150% (Intel Xeon CPU)</li>
              <li className="flex items-center gap-3 justify-center"><Brain className="w-4 h-4 text-brand" /> 4 GB DDR4 ECC Memory</li>
              <li className="flex items-center gap-3 justify-center"><HardDrive className="w-4 h-4 text-brand" /> 8 GB SSD Storage</li>
              <li className="flex items-center gap-3 justify-center"><Database className="w-4 h-4 text-brand" /> 1 Database Space</li>
              <li className="flex items-center gap-3 justify-center text-gray-600"><span className="w-4 h-4" /> 0 Backup Slots</li>
              <li className="flex items-center gap-3 justify-center text-gray-600"><span className="w-4 h-4" /> 0 Additional Ports</li>
              <li className="flex items-center gap-3 justify-center"><Gift className="w-4 h-4 text-brand" /> Free Game Panel</li>
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="py-16 border-t border-dark-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl font-bold text-white mb-4">
            Ready to Get Started?
          </motion.h3>
          <p className="text-gray-400 mb-8">
            Join our Discord community and start inviting friends to earn your free server today.
          </p>
          <Link
            href="https://discord.gg/crazynode"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand text-white font-semibold rounded-xl hover:bg-brand-dark transition-all hover:shadow-xl hover:shadow-brand/25 group"
          >
            Join Discord
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}