"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Check } from "lucide-react";
import { GAME_SERVERS } from "@/lib/constants";

export default function GameSwitcher() {
  const [active, setActive] = useState(0);
  const game = GAME_SERVERS[active];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-dark-bg" />
      <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,45,85,0.04) 1px, transparent 0)", backgroundSize: "60px 60px" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium glass border border-brand/20 text-brand mb-4">
            🎮 Game Server Hosting
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Choose Your <span className="gradient-text">Game</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            Select your game below and deploy a premium server in under 60 seconds.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {GAME_SERVERS.map((g, i) => (
            <button
              key={g.id}
              onClick={() => setActive(i)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${active === i ? "bg-brand text-white shadow-lg shadow-brand/25" : "glass text-gray-400 hover:text-white hover:border-brand/30"}`}
            >
              <span className="mr-2">{g.icon}</span>
              {g.name}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-2 gap-8"
          >
            {/* Left Info */}
            <div className="premium-card p-8 lg:p-10">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl">{game.icon}</span>
                <div>
                  <h3 className="text-3xl font-bold text-white">{game.name} Hosting</h3>
                  <p className="text-brand font-medium">Starting at ₹{game.startingPrice}/mo</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-8">{game.description}</p>

              <div className="space-y-3 mb-8">
                {game.features.map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-brand" />
                    </div>
                    <span className="text-sm text-gray-300">{f}</span>
                  </div>
                ))}
              </div>

              {game.slug !== "minecraft" ? (
                <div className="flex items-center gap-3">
                  <button disabled className="px-6 py-3 bg-white/[0.02] border border-white/5 text-gray-500 rounded-xl text-sm font-semibold cursor-not-allowed">
                    Coming Soon
                  </button>
                  <span className="text-[10px] text-gray-500">Launching shortly</span>
                </div>
              ) : (
                <Link href={`/${game.slug}`} className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-dark transition-all hover:shadow-lg hover:shadow-brand/25 group">
                  Deploy {game.name} Server
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>

            {/* Right Specs */}
            <div className="space-y-4">
              <div className="premium-card p-6">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Hardware Specifications</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-dark-border">
                    <span className="text-gray-400">RAM</span>
                    <span className="font-semibold text-white">{game.specs.ram}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-dark-border">
                    <span className="text-gray-400">CPU</span>
                    <span className="font-semibold text-white">{game.specs.cpu}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-400">Storage</span>
                    <span className="font-semibold text-white">{game.specs.storage}</span>
                  </div>
                </div>
              </div>

              <div className="premium-card p-6">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Included With Every Plan</h4>
                <div className="grid grid-cols-2 gap-3">
                  {["Pterodactyl Panel", "Auto Backups", "DDoS Protection", "24/7 Support", "Free Subdomain", "NVMe SSD"].map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-gray-400">
                      <Check className="w-3.5 h-3.5 text-brand shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              <div className="premium-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Starting from</p>
                    <p className="text-3xl font-bold text-white">₹{game.startingPrice}<span className="text-sm text-gray-500 font-normal">/mo</span></p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Setup Time</p>
                    <p className="text-lg font-bold text-brand">Instant</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
