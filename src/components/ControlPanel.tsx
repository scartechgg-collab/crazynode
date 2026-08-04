"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, FolderOpen, GitBranch, PackageOpen, Network, Users, ShieldCheck, HelpCircle, ChevronRight } from "lucide-react";

const panelScreens = [
  { id: "console", name: "Console", icon: Terminal, image: "https://i.ibb.co/vCRt4465/console.png", desc: "Real-time server logs, live resource monitoring & direct console command execution." },
  { id: "files", name: "Files", icon: FolderOpen, image: "https://i.ibb.co/6RCmy2mL/files.png", desc: "Clean file manager with drag-and-drop uploads, editor syntax highlighting, and archiver." },
  { id: "versions", name: "Version Changer", icon: GitBranch, image: "https://i.postimg.cc/nrrTrTbS/Version-C.png", desc: "Switch between Spigot, Paper, Fabric & Vanilla versions instantly with automated backups." },
  { id: "modpacks", name: "Modpack Installer", icon: PackageOpen, image: "https://i.postimg.cc/KjjQjQSs/Modpack-I.png", desc: "One-click installation for thousands of CurseForge & Modrinth modpacks effortlessly." },
  { id: "sftp", name: "SFTP", icon: Network, image: "https://i.ibb.co/TqgRVtkB/sftp.png", desc: "Ultra-secure file transfer protocol access with password protection & encryption." },
  { id: "players", name: "Player Manager", icon: Users, image: "https://i.postimg.cc/FR8Gf3r1/Player-M.png", desc: "Comprehensive player lists, permissions configuration, and online tracking." },
];

export default function ControlPanel() {
  const [activeIdx, setActiveIdx] = useState(0);

  // Auto-play cycle through screens
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % panelScreens.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const activeScreen = panelScreens[activeIdx];

  return (
    <section className="relative py-24 overflow-hidden" id="control-panel">
      <div className="absolute inset-0 bg-dark-bg" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/[.06]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium glass border border-brand/20 text-brand mb-4">
            ⚡ Product Showcase
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Inside Our <span className="gradient-text">Control Panel</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            A sleek, high-performance interface designed for total server mastery. Experience the modern CrazyNode panel.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[.35fr_.65fr] gap-8 items-start">
          {/* Side Panel Selector */}
          <div className="space-y-3">
            {panelScreens.map((screen, i) => {
              const Icon = screen.icon;
              const isActive = i === activeIdx;
              return (
                <button
                  key={screen.id}
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  className={`w-full text-left rounded-xl p-4 border transition-all duration-300 flex items-center justify-between ${
                    isActive
                      ? "bg-brand/[.08] border-brand/40 shadow-lg shadow-brand/5 ring-1 ring-brand/20"
                      : "bg-white/[.02] border-white/[.06] hover:bg-white/[.04] hover:border-white/[.12]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                      isActive ? "bg-brand/10 border-brand/30" : "bg-white/[.03] border-white/[.08] text-gray-500"
                    }`}>
                      <Icon className={`w-4 h-4 ${isActive ? "text-brand" : ""}`} />
                    </span>
                    <div>
                      <p className={`text-sm font-bold transition-all ${isActive ? "text-white" : "text-gray-400"}`}>{screen.name}</p>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? "text-brand translate-x-1" : "text-gray-600"}`} />
                </button>
              );
            })}
          </div>

          {/* Showcase Image Stage */}
          <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="premium-card p-3 rounded-3xl relative overflow-hidden bg-gradient-to-b from-dark-surface to-dark-bg border border-white/[0.08]">
            {/* Fake Browser Top Frame */}
            <div className="bg-[#0e1016] px-4 py-3 flex items-center gap-2 border-b border-white/[0.06] rounded-t-2xl">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/60" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <span className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <div className="mx-auto bg-black/40 px-12 py-1 rounded-full text-[10px] text-gray-500 flex items-center gap-2">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                panel.crazynode.in/servers/{activeScreen.id}
              </div>
            </div>

            {/* Dynamic Image Container */}
            <div className="relative overflow-hidden rounded-b-2xl border-x border-b border-white/[0.05] bg-[#070709]" style={{ aspectRatio: "1.82" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeScreen.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full h-full"
                >
                  <img
                    src={activeScreen.image}
                    alt={activeScreen.name}
                    className="w-full h-full object-cover object-left-top rounded-b-2xl"
                  />
                  {/* Soft shading overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/50 via-transparent to-transparent pointer-events-none rounded-b-2xl" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Floating Description Card */}
            <div className="absolute bottom-6 left-6 right-6 glass-strong rounded-2xl p-5 border border-white/[0.08] backdrop-blur-md">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeScreen.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, delay: 0.05 }}
                >
                  <div className="flex items-center gap-2 mb-1.5 text-brand">
                    <activeScreen.icon className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{activeScreen.name} Platform</span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">{activeScreen.desc}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
