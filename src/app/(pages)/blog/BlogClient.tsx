"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { BLOG_POSTS } from "@/lib/constants";

const categories = ["All", ...Array.from(new Set(BLOG_POSTS.map((p) => p.category)))];

export default function BlogClient() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.category === filter);

  return (
    <>
      <PageHeader badge="📝 Blog" title="Latest" highlight="Articles" description="Guides, tutorials, news, and insights from the CrazyNode team." />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === cat ? "bg-brand text-white" : "glass text-gray-400 hover:text-white"}`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <motion.article key={post.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="premium-card overflow-hidden group">
                <div className="h-48 bg-gradient-to-br from-brand/10 to-dark-card flex items-center justify-center">
                  <span className="text-6xl opacity-20">📝</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2.5 py-1 bg-brand/10 text-brand text-xs font-medium rounded-full">{post.category}</span>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-brand transition-colors line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">{post.date}</span>
                    <Link href={`/blog/${post.slug}`} className="flex items-center gap-1 text-xs text-brand font-medium hover:gap-2 transition-all">
                      Read More <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
