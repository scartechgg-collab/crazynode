"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Zap, Shield, Clock, HardDrive, Headphones, Globe, ChevronRight } from "lucide-react";

type GameHero = {
  name: string;
  slug: string;
  startingPrice: number;
  description: string;
};

const heroGames: GameHero[] = [
  {
    name: "Minecraft Server Hosting",
    slug: "minecraft",
    startingPrice: 180,
    description: "Build, survive, and thrive in limitless worlds. Experience smooth, high-performance Minecraft hosting with instant setup, powerful hardware, and low-latency connections for every adventure.",
  },
  {
    name: "GTA V Server Hosting",
    slug: "gtav",
    startingPrice: 599,
    description: "Take your Grand Theft Auto V experience to the next level with reliable hosting designed for custom multiplayer communities, roleplay servers, and large-scale online gameplay.",
  },
  {
    name: "Hytale Server Hosting",
    slug: "hytale",
    startingPrice: 199,
    description: "Prepare for the next generation of sandbox adventures with powerful Hytale-ready hosting. Built for creativity, exploration, and community-driven gameplay from day one.",
  },
  {
    name: "FiveM Server Hosting",
    slug: "fivem",
    startingPrice: 299,
    description: "Launch and manage immersive GTA V roleplay servers with optimized FiveM hosting. Enjoy high performance, fast deployment, and stable connectivity.",
  },
];

const heroCards = [
  { icon: Clock, label: "99.99% Uptime" },
  { icon: Zap, label: "Instant Setup" },
  { icon: Shield, label: "DDoS Protection" },
  { icon: HardDrive, label: "NVMe SSD" },
  { icon: Headphones, label: "24/7 Support" },
  { icon: Globe, label: "Global Network" },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const game = heroGames[index];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroGames.length);
    }, 3400);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-dark-bg">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,59,102,0.08) 1px, transparent 0)", backgroundSize: "50px 50px" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,59,102,0.08) 0%, transparent 70%)" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px]" style={{ background: "radial-gradient(ellipse, rgba(255,59,102,0.12) 0%, transparent 70%)" }} />
        <motion.div animate={{ y: [0, -30, 0], x: [0, 15, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-30" style={{ background: "radial-gradient(circle, rgba(255,59,102,0.15) 0%, transparent 70%)" }} />
        <motion.div animate={{ y: [0, 20, 0], x: [0, -20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-20" style={{ background: "radial-gradient(circle, rgba(255,59,102,0.1) 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium glass border border-brand/20 text-brand">
              <Zap className="w-4 h-4" />
              Premium Game Hosting Platform
            </span>
          </motion.div>

          {/* Rotating game title */}
          <div className="mt-8 min-h-[4.4em] sm:min-h-[3.8em] lg:min-h-[3.2em] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.h1
                key={game.slug}
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -24, filter: "blur(6px)" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-white text-glow leading-[1.05]"
              >
                {game.name}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Per-game description */}
          <div className="min-h-[7.5rem] sm:min-h-[6rem] mt-4 max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.p
                key={`${game.slug}-desc`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.32 }}
                className="text-base sm:text-lg text-gray-400 leading-relaxed"
              >
                {game.description}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Price */}
          <div className="mt-4 flex flex-col items-center gap-2">
            <span className="text-gray-500 text-xs uppercase tracking-[.18em]">Starting From</span>
            <div className="flex items-center gap-1">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`${game.slug}-price`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="text-3xl sm:text-4xl font-extrabold text-price"
                >
                  ₹{game.startingPrice}
                </motion.span>
              </AnimatePresence>
              <span className="text-gray-500 text-sm">/month</span>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`/${game.slug}`} className="group relative px-8 py-4 bg-brand text-white font-semibold rounded-xl text-lg hover:bg-brand-dark transition-all duration-300 hover:shadow-xl hover:shadow-brand/25 flex items-center gap-2">
              <AnimatePresence mode="wait">
                <motion.span key={`${game.slug}-cta`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .15 }}>
                  Launch {game.name.split(" ")[0]}
                </motion.span>
              </AnimatePresence>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 rounded-xl bg-brand/20 blur-xl -z-10 group-hover:bg-brand/30 transition-all" />
            </Link>
            <Link href="#pricing" className="px-8 py-4 text-white font-semibold rounded-xl text-lg border border-dark-border hover:border-brand/50 transition-all duration-300 hover:bg-white/5">
              View Plans
            </Link>
          </div>

          {/* Carousel indicator */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {heroGames.map((g, i) => (
              <button
                key={g.slug}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show ${g.name}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-10 bg-brand" : "w-4 bg-white/15 hover:bg-white/30"}`}
              />
            ))}
          </div>

          {/* Hero feature cards */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {heroCards.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + i * 0.08 }}
                className="premium-card p-4 text-center group cursor-default"
              >
                <card.icon className="w-6 h-6 mx-auto text-brand mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-medium text-gray-400 group-hover:text-gray-300 transition-colors">{card.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Banner System */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl pointer-events-none" aria-hidden="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={game.slug}
            initial={{ opacity: 0, x: index % 2 === 0 ? 60 : -60, scale: 1.05 }}
            animate={{ opacity: 0.25, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: index % 2 === 0 ? -60 : 60, scale: 1.05 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={
                game.slug === "minecraft"
                  ? "https://wallpapers.com/images/hd/hd-minecraft-logo-3nehf0ctjgk3d0zp.jpg"
                  : game.slug === "gtav"
                  ? "https://wallpaperaccess.com/full/2800478.jpg"
                  : game.slug === "hytale"
                  ? "https://i.pinimg.com/originals/af/af/33/afaf3364291788889b172367cc557e60.jpg"
                  : game.slug === "fivem"
                  ? "https://wallpapers.com/images/high/fivem-43n2ssnbccc3aes1.jpg"
                  : undefined
              }
              alt=""
              className="w-full h-full object-cover rounded-3xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/40 to-transparent rounded-3xl" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-bg to-transparent z-10" />
    </section>
  );
}
