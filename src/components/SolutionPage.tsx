"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Check } from "lucide-react";
import PageHeader from "./PageHeader";
import CTA from "./CTA";

interface SolutionPageProps {
  badge: string;
  title: string;
  highlight: string;
  description: string;
  features: { title: string; desc: string; icon: string }[];
  benefits: string[];
}

const iconMap: Record<string, string> = {
  code: "💻", rocket: "🚀", users: "👥", video: "🎥", briefcase: "💼", shield: "🛡️",
};

export default function SolutionPage({ badge, title, highlight, description, features, benefits }: SolutionPageProps) {
  return (
    <>
      <PageHeader badge={badge} title={title} highlight={highlight} description={description} />
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="premium-card p-6">
                  <span className="text-3xl mb-3 block">{iconMap[f.icon] || "⚡"}</span>
                  <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="premium-card p-8">
              <h3 className="text-xl font-bold text-white mb-6">Why {highlight} Choose CrazyNode</h3>
              <div className="space-y-4 mb-8">
                {benefits.map((b) => (
                  <div key={b} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-brand" />
                    </div>
                    <span className="text-sm text-gray-300">{b}</span>
                  </div>
                ))}
              </div>
              <Link href="https://client.crazynode.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-dark transition-all hover:shadow-lg hover:shadow-brand/25 group">
                Get Started <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
