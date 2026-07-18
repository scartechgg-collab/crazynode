"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowUp,
  BookOpen,
  Building2,
  CheckCircle2,
  Cloud,
  Code2,
  Gamepad2,
  Globe2,
  Mail,
  MessageCircle,
  Play,
  Send,
  Server,
  ShieldCheck,
  AtSign,
} from "lucide-react";

const CRAZYNODE = {
  name: "CrazyNode",
  logo: "https://i.postimg.cc/fykv1Fgx/1000018451.png",
  email: "root@crazynode.in",
};

const hostingLinks = [
  { label: "Minecraft Hosting", href: "/minecraft", icon: Gamepad2 },
  { label: "GTA V Hosting", href: "/gtav", icon: Gamepad2 },
  { label: "Hytale Hosting", href: "/hytale", icon: Gamepad2 },
  { label: "FiveM Hosting", href: "/fivem", icon: Gamepad2 },
];

const cloudLinks = [
  { label: "VPS Hosting", href: "/vps" },
  { label: "DDoS Protection", href: "/#infrastructure" },
  { label: "Domain Registration", href: "/web-hosting" },
  { label: "Web Hosting", href: "/web-hosting" },
];

const resourcesLinks = [
  { label: "Documentation", href: "/knowledgebase" },
  { label: "Status Page", href: "/status" },
  { label: "Plugins & Mods", href: "/knowledgebase" },
  { label: "Server Status", href: "/status" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Infrastructure", href: "/#infrastructure" },
  { label: "Contact Us", href: "/contact" },
  { label: "Support Center", href: "/contact" },
];

const socialLinks = [
  { label: "Discord", href: "https://discord.gg/nyxor", icon: MessageCircle },
  { label: "GitHub", href: "https://github.com/nyxorcloud", icon: Code2 },
  { label: "X / Twitter", href: "https://x.com/nyxorcloud", icon: AtSign },
  { label: "YouTube", href: "https://youtube.com/@nyxorcloud", icon: Play },
  { label: "Telegram", href: "https://t.me/nyxorcloud", icon: Send },
];

function smoothScrollToTop() {
  const start = window.scrollY;
  const duration = 700;
  const startTime = performance.now();
  const easeInOut = (progress: number) => progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
  const frame = (now: number) => {
    const progress = Math.min((now - startTime) / duration, 1);
    window.scrollTo(0, start * (1 - easeInOut(progress)));
    if (progress < 1) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

function NavCard({ title, icon: Icon, links }: { title: string; icon: React.ElementType; links: { label: string; href: string; icon?: React.ElementType }[] }) {
  return (
    <div className="footer-card rounded-2xl p-5 flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-9 h-9 rounded-xl bg-brand/[.08] border border-brand/15 flex items-center justify-center">
          <Icon className="w-4 h-4 text-brand" />
        </span>
        <h3 className="text-sm font-bold text-white">{title}</h3>
      </div>
      <ul className="space-y-1.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="group flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors duration-200 py-1.5">
              {link.icon && <link.icon className="w-3 h-3 text-gray-600 group-hover:text-brand transition-colors" />}
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className="relative overflow-hidden border-t border-white/[.07] bg-[#070709]">
      <div className="absolute inset-0 opacity-[.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,59,102,0.6) 1px, transparent 0)", backgroundSize: "42px 42px" }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-brand/55 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Top: brand card (wide left) + 2 nav cards (top row) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
          {/* Brand Card */}
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="footer-card rounded-2xl p-6 sm:p-7 flex flex-col">
          <Link href="/" className="inline-flex items-center gap-4 group">
            <span className="w-16 h-16 rounded-2xl bg-white/[.04] border border-white/[.08] p-2 flex items-center justify-center overflow-hidden">
              <Image src={CRAZYNODE.logo} alt="CrazyNode logo" width={54} height={54} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
            </span>
            <div>
              <p className="text-base font-extrabold text-white">CrazyNode</p>
            </div>
          </Link>

          <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-white/[.035] border border-white/[.07] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Premium Game Hosting
          </span>

            <p className="mt-5 text-sm text-gray-400 leading-6">
              Premium cloud infrastructure built for developers, creators, businesses, and modern communities. High-performance servers with NVMe SSDs & DDoS protection included.
            </p>

            <div className="my-6 h-px bg-brand/40 w-16" />

          <a href={`mailto:${CRAZYNODE.email}`} className="inline-flex w-fit items-center gap-2 text-sm text-brand hover:text-white transition-colors">
            <Mail className="w-4 h-4" />{CRAZYNODE.email}
          </a>

            <div className="mt-5 flex items-center gap-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -2, scale: 1.05 }}
                  transition={{ duration: .2 }}
                  aria-label={social.label}
                  title={social.label}
                  className="w-9 h-9 rounded-lg bg-white/[.035] border border-white/[.07] flex items-center justify-center text-gray-500 hover:text-white hover:border-brand/35 hover:bg-brand/[.06] transition-all"
                >
                  <social.icon className="w-3.5 h-3.5" />
                </motion.a>
              ))}
            </div>

          <div className="mt-auto pt-6 flex items-start gap-2 text-[10px] text-gray-600 leading-5">
            <ShieldCheck className="w-3.5 h-3.5 mt-0.5 text-gray-500 shrink-0" />
            Premium game server hosting with enterprise-grade hardware and 24/7 support.
          </div>
          </motion.div>

          <NavCard title="Hosting" icon={Gamepad2} links={hostingLinks} />
          <NavCard title="Cloud Services" icon={Cloud} links={cloudLinks} />
        </div>

        {/* Bottom row: Resources + Company */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <NavCard title="Resources" icon={BookOpen} links={resourcesLinks} />
          <NavCard title="Company" icon={Building2} links={companyLinks} />
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-white/[.065] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">© 2026 NyxorCloud. All Rights Reserved.</p>
          <p className="text-xs text-gray-500">Powered by modern cloud infrastructure.</p>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/[.06] border border-emerald-500/15 px-3 py-1.5 text-[10px] font-medium text-emerald-400"><Activity className="w-3 h-3" />99.99% Uptime</span>
            <span className="rounded-full bg-brand/[.06] border border-brand/15 px-3 py-1.5 text-[10px] font-medium text-brand">v2.0 · Enterprise</span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 12, scale: .94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: .94 }}
            transition={{ duration: .25 }}
            type="button"
            onClick={smoothScrollToTop}
            className="fixed bottom-5 left-5 z-50 w-12 h-12 rounded-2xl glass-strong border border-brand/30 text-gray-300 hover:text-white hover:border-brand/55 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/25 transition-all shadow-xl shadow-black/30 flex items-center justify-center"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
