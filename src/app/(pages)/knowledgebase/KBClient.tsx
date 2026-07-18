"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { KB_CATEGORIES } from "@/lib/constants";

export default function KBClient() {
  const [search, setSearch] = useState("");
  const filtered = search ? KB_CATEGORIES.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())) : KB_CATEGORIES;

  return (
    <>
      <PageHeader badge="📚 Knowledgebase" title="Help" highlight="Center" description="Find guides, tutorials, and answers to common questions." />

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search */}
          <div className="relative max-w-xl mx-auto mb-12">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-12 pr-4 py-4 bg-dark-card border border-dark-border rounded-2xl text-white placeholder-gray-600 focus:border-brand/50 focus:outline-none transition-colors"
            />
          </div>

          {/* Categories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map((cat, i) => (
              <motion.div key={cat.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Link href={`/knowledgebase/${cat.slug}`} className="premium-card p-6 block group h-full">
                  <span className="text-3xl mb-3 block">{cat.icon}</span>
                  <h3 className="text-base font-bold text-white mb-1 group-hover:text-brand transition-colors">{cat.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{cat.articles} articles</p>
                  <div className="flex items-center gap-1 text-xs text-brand font-medium">
                    Browse <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
