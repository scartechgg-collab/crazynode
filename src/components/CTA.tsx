"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Zap } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-dark-bg" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(255,45,85,0.08) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium glass border border-brand/20 text-brand mb-6">
            <Zap className="w-3 h-3" />
            Ready to get started?
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            Deploy Your Server <span className="gradient-text">Today</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
            Join thousands of gamers who trust CrazyNode for premium game server hosting. Start in under 60 seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="group px-8 py-4 bg-brand text-white font-semibold rounded-xl text-lg hover:bg-brand-dark transition-all hover:shadow-xl hover:shadow-brand/25 flex items-center gap-2">
              Get Started Now
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/contact" className="px-8 py-4 text-white font-semibold rounded-xl text-lg border border-dark-border hover:border-brand/50 transition-all hover:bg-white/5">
              Contact Sales
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
