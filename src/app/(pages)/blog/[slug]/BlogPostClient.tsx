"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";

interface Post {
  title: string;
  slug: string;
  category: string;
  date: string;
  excerpt: string;
  readTime: string;
}

export default function BlogPostClient({ post }: { post: Post }) {
  return (
    <>
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-dark-bg" />
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,45,85,0.06) 1px, transparent 0)", backgroundSize: "50px 50px" }} />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-brand/10 text-brand text-xs font-medium rounded-full flex items-center gap-1">
                <Tag className="w-3 h-3" /> {post.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-500"><Calendar className="w-3 h-3" /> {post.date}</span>
              <span className="flex items-center gap-1 text-xs text-gray-500"><Clock className="w-3 h-3" /> {post.readTime} read</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">{post.title}</h1>
            <p className="text-lg text-gray-400 leading-relaxed">{post.excerpt}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="premium-card p-8 lg:p-12 prose-custom">
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>
                When it comes to game server performance, every millisecond matters. At CrazyNode, we&apos;ve spent years optimizing every layer of our infrastructure — from hardware selection to network routing — to ensure your players get the smoothest experience possible.
              </p>
              <h2 className="text-2xl font-bold text-white pt-4">Why Infrastructure Matters</h2>
              <p>
                Game servers are uniquely demanding workloads. Unlike web servers that can tolerate occasional latency spikes, game servers need consistent, predictable performance. A single moment of lag can mean the difference between victory and defeat for your players. That&apos;s why we deploy exclusively on AMD Ryzen 9 processors with boost clocks up to 5.7GHz, delivering the single-thread performance that game engines crave.
              </p>
              <p>
                Storage speed is equally critical. Our enterprise NVMe SSDs deliver read speeds up to 7,000 MB/s, meaning your worlds load in seconds, chunks generate instantly, and large modpacks initialize without the painful wait times common on cheaper hosting providers.
              </p>
              <h2 className="text-2xl font-bold text-white pt-4">Network Architecture</h2>
              <p>
                Our network is built on premium Tier-1 carriers with direct peering to major ISPs across every region we operate in. Each data center features redundant 10Gbps uplinks, and our anycast DDoS mitigation network can absorb attacks up to 1 Tbps without impacting legitimate player traffic.
              </p>
              <ul className="space-y-2 list-none pl-0">
                {[
                  "Sub-10ms latency within metro regions",
                  "Advanced route optimization for international players",
                  "Real-time traffic analysis and anomaly detection",
                  "Automatic failover between edge PoPs",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <h2 className="text-2xl font-bold text-white pt-4">Getting the Most From Your Server</h2>
              <p>
                Start by choosing the location closest to your player base — our 8 global locations cover all major regions. Use our one-click optimization profiles, which automatically tune server settings based on your player count and game mode. Schedule regular restarts during off-peak hours to clear memory leaks, and always keep your server software updated to the latest stable version.
              </p>
              <p>
                If you ever need help, our support team is available 24/7 with average response times under 5 minutes. We&apos;re gamers ourselves, and we treat your server like it&apos;s our own.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-dark-border flex items-center justify-between">
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-brand font-medium hover:gap-3 transition-all">
                <ArrowLeft className="w-4 h-4" /> More Articles
              </Link>
              <Link href="/register" className="px-5 py-2.5 bg-brand text-white text-sm font-semibold rounded-xl hover:bg-brand-dark transition-all">
                Start Hosting
              </Link>
            </div>
          </motion.article>
        </div>
      </section>
    </>
  );
}
