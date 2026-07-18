"use client";

import { motion } from "framer-motion";
import PageHeader from "./PageHeader";

interface Section {
  title: string;
  content: string;
}

export default function LegalPage({ badge, title, highlight, description, sections }: { badge: string; title: string; highlight: string; description: string; sections: Section[] }) {
  return (
    <>
      <PageHeader badge={badge} title={title} highlight={highlight} description={description} />
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="premium-card p-8 lg:p-12">
            <p className="text-sm text-gray-500 mb-8">Last updated: January 1, 2026</p>
            <div className="space-y-8">
              {sections.map((s, i) => (
                <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
                  <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center text-brand text-sm font-bold shrink-0">{i + 1}</span>
                    {s.title}
                  </h2>
                  <p className="text-sm text-gray-400 leading-relaxed pl-11">{s.content}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
