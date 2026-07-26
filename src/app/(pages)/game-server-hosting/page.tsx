"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, Gamepad2, Server, Cpu, ShieldCheck, Zap } from "lucide-react";
import { GAME_SERVERS } from "@/lib/constants";

const gameImages: Record<string, string> = {
  minecraft: "https://wallpapers.com/images/hd/hd-minecraft-logo-3nehf0ctjgk3d0zp.jpg",
  gtav: "https://wallpaperaccess.com/full/2800478.jpg",
  hytale: "https://i.pinimg.com/originals/af/af/33/afaf3364291788889b172367cc557e60.jpg",
  fivem: "https://wallpapers.com/images/high/fivem-43n2ssnbccc3aes1.jpg",
  rust: "https://files.catbox.moe/etu4p7.png",
  ark: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=600&h=400&fit=crop",
  cs2: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop",
  valheim: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&h=400&fit=crop",
};

export default function GameServerHostingPage() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return GAME_SERVERS.filter((g) => g.name.toLowerCase().includes(q) || g.description.toLowerCase().includes(q));
  }, [search]);

  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium glass border border-brand/20 text-brand mb-4">
            <Gamepad2 className="w-3.5 h-3.5" /> All Supported Games
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            Game Server <span className="gradient-text">Hosting</span>
          </h1>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">Browse all games we support. From Minecraft to FiveM, Rust, ARK and more — instant setup, DDoS protection, NVMe SSDs.</p>
        </div>

        <div className="max-w-2xl mx-auto mb-10 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search games... (e.g. Minecraft, Rust, FiveM)" className="w-full pl-11 pr-4 py-3.5 bg-[#111113] border border-white/[0.08] rounded-2xl text-sm text-white placeholder:text-gray-600 focus:border-brand/30 outline-none" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((game, i) => {
            const img = gameImages[game.id] || gameImages["minecraft"];
            return (
              <motion.div key={game.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="premium-card overflow-hidden group flex flex-col">
                <div className="relative h-40 overflow-hidden">
                  <img src={img} alt={game.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur border border-white/10 text-[10px] text-white">
                    <span className="text-base">{game.icon}</span> {game.name}
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/20 text-[10px] text-emerald-400 font-semibold">From ₹{game.startingPrice}/mo</div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-base font-bold text-white">{game.name} Hosting</h3>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-3 leading-relaxed">{game.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {game.features.slice(0, 3).map((f) => (
                      <span key={f} className="text-[10px] px-2 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-gray-400">{f}</span>
                    ))}
                  </div>
                  <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] text-gray-500">
                      <span className="flex items-center gap-1"><Cpu className="w-3 h-3" /> {game.specs.cpu.split(" ")[0]} {game.specs.cpu.split(" ")[1]}</span>
                      <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> DDoS</span>
                    </div>
                    <Link href={`/${game.slug}`} className="text-xs font-semibold text-brand hover:text-white transition-colors flex items-center gap-1">View Plans <Zap className="w-3 h-3" /></Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Gamepad2 className="w-10 h-10 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500">No games found for &quot;{search}&quot;. Try Minecraft, FiveM, Rust...</p>
          </div>
        )}

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-20 premium-card p-8 text-center">
          <h3 className="text-2xl font-bold text-white">Don&apos;t see your game?</h3>
          <p className="text-sm text-gray-500 mt-2">We support 100+ games via custom JAR / Docker. Contact us and we&apos;ll set it up.</p>
          <Link href="/contact" className="inline-block mt-6 px-6 py-3 bg-brand text-white rounded-xl text-sm font-semibold hover:bg-brand-dark">Request a Game</Link>
        </motion.div>
      </div>
    </div>
  );
}
