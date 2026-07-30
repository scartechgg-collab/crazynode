"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Server,
  Gamepad2,
  Globe2,
  Cloud,
  Cpu,
  HardDrive,
  Bot,
  Code2,
  Users,
  Video,
  Briefcase,
  Info,
  Newspaper,
  Rocket,
  Handshake,
  Mail,
  BookOpen,
  Activity,
  LifeBuoy,
  ShoppingCart,
  User as UserIcon,
  DollarSign,
  LogOut,
  LayoutDashboard,
  ClipboardList,
} from "lucide-react";
import { COMPANY, NAV_ITEMS } from "@/lib/constants";
import { useCart } from "./CartContext";
import { useCurrency, type Currency } from "./CurrencyContext";

const iconMap: Record<string, React.ElementType> = {
  "Minecraft Hosting": Gamepad2,
  "FiveM Hosting": Gamepad2,
  "GTA V Hosting": Gamepad2,
  "Rust Hosting": Gamepad2,
  "ARK Hosting": Gamepad2,
  "CS2 Hosting": Gamepad2,
  "Valheim Hosting": Gamepad2,
  "Hytale Hosting": Gamepad2,
  "VPS Hosting": Cloud,
  "Dedicated Servers": HardDrive,
  "Web Hosting": Globe2,
  "Discord Bot Hosting": Bot,
  "DDoS Protection": Cpu,
  "Free Hosting": Server,
  "Developers": Code2,
  "Communities": Users,
  "Streamers": Video,
  "Businesses": Briefcase,
  "About Us": Info,
  "Blog": Newspaper,
  "Careers": Rocket,
  "Partners": Handshake,
  "Contact": Mail,
  "Knowledgebase": BookOpen,
  "Network Status": Activity,
  "Submit Ticket": LifeBuoy,
  "Game Hosting": Gamepad2,
  "Applications": ClipboardList,
};

const descMap: Record<string, string> = {
  "Minecraft Hosting": "Vanilla, Paper, Forge & Fabric",
  "FiveM Hosting": "Premium GTA V roleplay servers",
  "GTA V Hosting": "Mod-ready multiplayer",
  "Rust Hosting": "Survival optimized performance",
  "ARK Hosting": "Cluster-ready dinosaur worlds",
  "CS2 Hosting": "Competitive 128-tick nodes",
  "Valheim Hosting": "Persistent Viking realms",
  "Hytale Hosting": "Day-one ready hosting",
  "VPS Hosting": "Flexible cloud compute",
  "Dedicated Servers": "Bare metal enterprise gear",
  "Web Hosting": "Managed website hosting",
  "Discord Bot Hosting": "Always-on bot runtime",
  "DDoS Protection": "Crazy+ 1 Tbps shield",
  "Free Hosting": "8 Discord invites = 1 server",
  "Developers": "APIs, Docker, Git workflows",
  "Communities": "Multi-server networks",
  "Streamers": "Creator-grade performance",
  "Businesses": "SLA-backed enterprise cloud",
  "About Us": "Our story and mission",
  "Blog": "Guides, updates, insights",
  "Careers": "Join our team",
  "Partners": "Reseller & affiliate program",
  "Contact": "Reach our support team",
  "Knowledgebase": "Guides & tutorials",
  "Network Status": "Real-time system status",
  "Submit Ticket": "Get help from support",
  "Applications": "Join CrazyNode",
};

interface NavChild {
  label: string;
  href?: string;
  children?: NavChild[];
}
interface NavItem {
  label: string;
  href?: string;
  children?: NavChild[];
}

const panelLinks = [
  { label: "VPS Panel", detail: "Cloud instances", href: "https://www.crazynode.in", icon: Server },
  { label: "Game Panel", detail: "Server control", href: "https://client.crazynode.in", icon: Gamepad2 },
  { label: "Web Panel", detail: "Sites & domains", href: "https://client.crazynode.in", icon: Globe2 },
];

function MegaDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };
  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };
  const flatChildren: NavChild[] = [];
  const nestedGroups: { title: string; items: NavChild[] }[] = [];
  item.children?.forEach((child) => {
    if (child.children && child.children.length > 0) {
      nestedGroups.push({ title: child.label, items: child.children });
    } else {
      flatChildren.push(child);
    }
  });
  const hasNestedGroups = nestedGroups.length > 0;
  const totalItems = flatChildren.length + nestedGroups.reduce((acc, g) => acc + g.items.length, 0);
  const isWide = totalItems > 5 || hasNestedGroups;

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200">
        {item.label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && item.children && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.22 }}
            className={`absolute top-full ${isWide ? "left-1/2 -translate-x-1/2" : "left-0"} mt-2 z-50`}
            style={{ minWidth: isWide ? "640px" : "320px" }}
          >
            <div className="glass-strong rounded-2xl p-4 shadow-2xl shadow-black/60 border border-white/[.08]">
              <p className="px-2 pt-1 pb-3 text-[10px] font-semibold uppercase tracking-[.18em] text-gray-600">
                {item.label} · {totalItems} options
              </p>
              {hasNestedGroups && (
                <>
                  {nestedGroups.map((group) => (
                    <div key={group.title} className="mb-3">
                      <p className="px-2 mb-2 text-[10px] font-bold text-brand uppercase tracking-wider">{group.title}</p>
                      <div className="grid grid-cols-2 gap-1.5">
                        {group.items.map((sub, i) => {
                          const Icon = iconMap[sub.label] || Server;
                          return (
                            <motion.div key={sub.label} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                              <Link href={sub.href || "#"} className="group flex items-start gap-3 rounded-xl p-2.5 hover:bg-white/[.05] border border-transparent hover:border-white/[.08] transition-all">
                                <span className="w-8 h-8 rounded-lg bg-white/[.04] border border-white/[.07] flex items-center justify-center shrink-0 group-hover:border-brand/30 group-hover:bg-brand/[.06] transition-all">
                                  <Icon className="w-3.5 h-3.5 text-brand" />
                                </span>
                                <span className="min-w-0 flex-1">
                                  <span className="block text-xs font-semibold text-white truncate">{sub.label}</span>
                                  <span className="block text-[10px] text-gray-500 truncate">{descMap[sub.label] || "Premium hosting"}</span>
                                </span>
                              </Link>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                  {flatChildren.length > 0 && (
                    <>
                      <div className="my-3 h-px bg-white/[.06]" />
                      <p className="px-2 mb-2 text-[10px] font-bold text-brand uppercase tracking-wider">More Services</p>
                      <div className="grid grid-cols-2 gap-1.5">
                        {flatChildren.map((child, i) => {
                          const Icon = iconMap[child.label] || Server;
                          return (
                            <motion.div key={child.label} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                              <Link href={child.href || "#"} className="group flex items-start gap-3 rounded-xl p-2.5 hover:bg-white/[.05] border border-transparent hover:border-white/[.08] transition-all">
                                <span className="w-8 h-8 rounded-lg bg-white/[.04] border border-white/[.07] flex items-center justify-center shrink-0 group-hover:border-brand/30 group-hover:bg-brand/[.06] transition-all">
                                  <Icon className="w-3.5 h-3.5 text-brand" />
                                </span>
                                <span className="min-w-0 flex-1">
                                  <span className="block text-xs font-semibold text-white truncate">{child.label}</span>
                                  <span className="block text-[10px] text-gray-500 truncate">{descMap[child.label] || "Premium service"}</span>
                                </span>
                              </Link>
                            </motion.div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </>
              )}
              {!hasNestedGroups && (
                <div className="grid grid-cols-1 gap-1.5">
                  {flatChildren.map((child, i) => {
                    const Icon = iconMap[child.label] || Server;
                    return (
                      <motion.div key={child.label} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                        <Link href={child.href || "#"} className="group flex items-start gap-3 rounded-xl p-3 hover:bg-white/[.05] border border-transparent hover:border-white/[.08] transition-all">
                          <span className="w-9 h-9 rounded-lg bg-white/[.04] border border-white/[.07] flex items-center justify-center shrink-0 group-hover:border-brand/30 group-hover:bg-brand/[.06] transition-all">
                            <Icon className="w-4 h-4 text-brand" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-semibold text-white">{child.label}</span>
                            <span className="block text-[11px] text-gray-500 mt-0.5">{descMap[child.label] || "Premium service"}</span>
                          </span>
                          <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-brand group-hover:translate-x-0.5 transition-all mt-1.5" />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PanelDropdown() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
  return (
    <div ref={containerRef} className="relative hidden lg:block">
      <button
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-brand rounded-lg hover:bg-brand-dark transition-all hover:shadow-lg hover:shadow-brand/30"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        Panel
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            className="absolute right-0 top-full mt-2 w-72 rounded-2xl glass-strong p-3 shadow-2xl shadow-black/60 border border-white/[.08]"
            role="menu"
          >
            <p className="px-2 pt-1 pb-2 text-[10px] font-semibold uppercase tracking-[.18em] text-gray-600">Open a control panel</p>
            {panelLinks.map((panel, i) => (
              <motion.div key={panel.label} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Link
                  href={panel.href}
                  target="_blank"
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-3 rounded-xl p-3 hover:bg-white/[.05] border border-transparent hover:border-white/[.08] transition-all"
                  role="menuitem"
                >
                  <span className="w-10 h-10 rounded-xl bg-brand/[.08] border border-brand/15 flex items-center justify-center group-hover:bg-brand/[.15] transition-all">
                    <panel.icon className="w-4 h-4 text-brand" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-white">{panel.label}</span>
                    <span className="block text-xs text-gray-500 mt-0.5">{panel.detail}</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-brand group-hover:translate-x-0.5 transition-all" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CartIcon() {
  const { count } = useCart();
  const [animate, setAnimate] = useState(false);
  const prevCount = useRef(count);

  useEffect(() => {
    if (count > prevCount.current) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 600);
    }
    prevCount.current = count;
  }, [count]);

  return (
    <Link href="/cart" className="relative w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-gray-400 hover:text-white hover:border-brand/30 hover:bg-brand/[0.08] transition-all group">
      <ShoppingCart className={`w-4 h-4 ${animate ? "animate-bounce" : ""}`} />
      {count > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-brand text-white text-[10px] font-bold flex items-center justify-center shadow-lg shadow-brand/20"
        >
          {count}
        </motion.span>
      )}
    </Link>
  );
}

function CurrencySelector() {
  const [open, setOpen] = useState(false);
  const { currency, setCurrency } = useCurrency();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const currencies: { code: Currency; label: string; symbol: string }[] = [
    { code: "INR", label: "Indian Rupee", symbol: "₹" },
    { code: "USD", label: "US Dollar", symbol: "$" },
    { code: "EUR", label: "Euro", symbol: "€" },
  ];

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-gray-400 hover:text-white hover:border-brand/30 transition-all"
        aria-label="Select currency"
      >
        <DollarSign className="w-4 h-4" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute right-0 top-full mt-2 w-48 rounded-2xl glass-strong p-2 shadow-2xl border border-white/[0.08] z-50"
          >
            <p className="px-3 py-2 text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Select Currency</p>
            {currencies.map((c) => (
              <button
                key={c.code}
                onClick={() => {
                  setCurrency(c.code as Currency);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all ${currency === c.code ? "bg-brand/10 text-white border border-brand/20" : "text-gray-400 hover:text-white hover:bg-white/[0.05]"}`}
              >
                <span className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-white/[0.05] flex items-center justify-center text-xs">{c.symbol}</span>
                  {c.code}
                </span>
                <span className="text-[11px] text-gray-500">{c.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function UserMenu() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<{ email: string; name?: string } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.authenticated) setUser({ email: d.email, name: d.name });
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setOpen(false);
    window.location.href = "/";
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(true)}
        className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-gray-400 hover:text-white hover:border-brand/30 transition-all"
        aria-label="User menu"
      >
        <UserIcon className="w-4 h-4" />
      </button>
      <div onMouseLeave={() => setOpen(false)} className="absolute right-0 top-full pt-2">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="w-56 rounded-2xl glass-strong p-2 shadow-2xl border border-white/[0.08] z-50"
            >
              {user ? (
                <>
                  <div className="px-3 py-3 border-b border-white/[0.06] mb-2">
                    <p className="text-sm font-semibold text-white truncate">{user.name || user.email}</p>
                    <p className="text-[11px] text-gray-500 truncate">{user.email}</p>
                  </div>
                  <Link href="/dashboard" onClick={() => setOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/[0.05] transition-all">
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </Link>
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/[0.05] transition-all">
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/[0.05] transition-all">
                    <UserIcon className="w-4 h-4" /> Login
                  </Link>
                  <Link href="/register" onClick={() => setOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/[0.05] transition-all">
                    <Users className="w-4 h-4" /> Register
                  </Link>
                  <div className="mt-2 pt-2 border-t border-white/[0.06]">
                    <p className="px-3 py-1 text-[10px] text-gray-600">New to CrazyNode? Create account and get 20% off.</p>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [subExpanded, setSubExpanded] = useState<string | null>(null);
  const { count } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-80 bg-dark-bg border-l border-dark-border z-50 lg:hidden overflow-y-auto"
          >
            <div className="flex items-center justify-between p-5 border-b border-dark-border">
              <span className="text-lg font-bold gradient-text">CrazyNode</span>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5" aria-label="Close menu">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 flex gap-2 border-b border-dark-border">
              <Link href="/cart" onClick={onClose} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.07] text-sm">
                <ShoppingCart className="w-4 h-4" /> Cart {count > 0 && <span className="bg-brand text-white text-[10px] px-1.5 py-0.5 rounded-full">{count}</span>}
              </Link>
              <Link href="/login" onClick={onClose} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-brand text-white text-sm">
                <UserIcon className="w-4 h-4" /> Account
              </Link>
            </div>

            <nav className="p-4 space-y-1">
              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  {item.href ? (
                    <Link href={item.href} onClick={onClose} className="block px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      <button onClick={() => setExpanded(expanded === item.label ? null : item.label)} className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                        {item.label}
                        <ChevronDown className={`w-4 h-4 transition-transform ${expanded === item.label ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {expanded === item.label && item.children && (
                          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden pl-4">
                            {item.children.map((child) => (
                              <div key={child.label}>
                                {child.href ? (
                                  <Link href={child.href} onClick={onClose} className="block px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                                    {child.label}
                                  </Link>
                                ) : (
                                  <>
                                    <button onClick={() => setSubExpanded(subExpanded === child.label ? null : child.label)} className="flex w-full items-center justify-between px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                                      {child.label}
                                      <ChevronDown className={`w-3 h-3 transition-transform ${subExpanded === child.label ? "rotate-180" : ""}`} />
                                    </button>
                                    <AnimatePresence>
                                      {subExpanded === child.label && child.children && (
                                        <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden pl-4">
                                          {child.children.map((sub) => (
                                            <Link key={sub.label} href={sub.href || "#"} onClick={onClose} className="block px-4 py-2 text-sm text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                                              {sub.label}
                                            </Link>
                                          ))}
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </>
                                )}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </div>
              ))}
            </nav>

            <div className="p-4 border-t border-dark-border">
              <p className="px-1 mb-3 text-xs font-semibold uppercase tracking-wider text-gray-600">Panels</p>
              <div className="space-y-2 mb-4">
                {panelLinks.map((panel) => (
                  <Link key={panel.label} href={panel.href} target="_blank" onClick={onClose} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[.03] border border-white/[.06] text-sm text-gray-300 hover:text-white transition-colors">
                    <panel.icon className="w-4 h-4 text-brand" />
                    {panel.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass-strong shadow-lg shadow-black/30" : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <Image src={COMPANY.logo} alt={COMPANY.name} width={36} height={36} className="rounded-lg" />
              <span className="text-xl font-bold gradient-text hidden sm:block">CrazyNode</span>
            </Link>

            <nav className="hidden lg:flex items-center">
              {NAV_ITEMS.map((item) =>
                item.href ? (
                  <Link key={item.label} href={item.href} className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <MegaDropdown key={item.label} item={item} />
                )
              )}
            </nav>

            <div className="flex items-center gap-2.5">
              <PanelDropdown />
              <div className="hidden md:flex items-center gap-2">
                <CurrencySelector />
                <CartIcon />
                <UserMenu />
              </div>
              <div className="flex md:hidden items-center gap-2">
                <CartIcon />
                <UserMenu />
              </div>
              <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors" aria-label="Open menu">
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
