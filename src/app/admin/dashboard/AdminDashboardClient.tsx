"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard, Gamepad2, Server, Bot, ShieldCheck, Megaphone,
  Globe2, Settings, LogOut, Save, Plus, Trash2, Eye, Loader2,
  ClipboardList, X, CheckCircle2, AlertTriangle, ChevronRight,
  Activity, Users, Zap, TrendingUp, Bell,
} from "lucide-react";

type Tab = "overview" | "hero" | "minecraft" | "vps" | "discord" | "locations" | "announcements" | "applications" | "branding";

// ─── Custom Confirm Modal ───────────────────────────────────────────────────
function ConfirmModal({
  open, title, message, onConfirm, onCancel, danger = false,
}: {
  open: boolean; title: string; message: string;
  onConfirm: () => void; onCancel: () => void; danger?: boolean;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0, y: 16 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="premium-card p-6 max-w-sm w-full shadow-2xl"
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${danger ? "bg-red-500/10 border border-red-500/20" : "bg-[#6c47ff]/10 border border-[#6c47ff]/20"}`}>
              <AlertTriangle className={`w-6 h-6 ${danger ? "text-red-400" : "text-[#6c47ff]"}`} />
            </div>
            <h3 className="text-lg font-bold mb-1">{title}</h3>
            <p className="text-sm text-gray-400 mb-6">{message}</p>
            <div className="flex gap-3">
              <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl border border-white/10 text-sm text-gray-400 hover:text-white hover:bg-white/[0.04] transition-all">
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${danger ? "bg-red-500 hover:bg-red-600 text-white" : "bg-[#6c47ff] hover:bg-[#5535d4] text-white"}`}
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Toast Notification ────────────────────────────────────────────────────
function Toast({ message, type }: { message: string; type: "success" | "error" }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 60, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl border text-sm font-medium ${
        type === "success"
          ? "bg-green-500/10 border-green-500/20 text-green-400"
          : "bg-red-500/10 border-red-500/20 text-red-400"
      }`}
    >
      {type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
      {message}
    </motion.div>
  );
}

export default function AdminDashboardClient() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("overview");
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [confirm, setConfirm] = useState<{ title: string; message: string; onConfirm: () => void; danger?: boolean } | null>(null);

  useEffect(() => {
    checkAuth();
    fetchContent();
  }, []);

  const showToast = useCallback((message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const checkAuth = async () => {
    const res = await fetch("/api/admin/me");
    if (!res.ok) router.push("/admin/login");
  };

  const fetchContent = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/content");
      const data = await res.json();
      setContent(data);
    } catch {}
    setLoading(false);
  };

  const saveKey = async (key: string, value: any) => {
    setSaving(key);
    try {
      const res = await fetch(`/api/content/${key}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value }),
      });
      if (!res.ok) throw new Error("Failed");
      setContent((prev) => ({ ...prev, [key]: value }));
      showToast(`✓ ${key.replace(/_/g, " ")} saved successfully`, "success");
    } catch {
      showToast(`Failed to save ${key}`, "error");
    } finally {
      setSaving(null);
    }
  };

  const showConfirm = (title: string, message: string, onConfirm: () => void, danger = false) => {
    setConfirm({ title, message, onConfirm, danger });
  };

  const handleLogout = () => {
    showConfirm("Sign Out", "Are you sure you want to log out of the admin panel?", async () => {
      setConfirm(null);
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
    });
  };

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "hero", label: "Hero / Banners", icon: Gamepad2 },
    { id: "announcements", label: "Announcements", icon: Megaphone },
    { id: "minecraft", label: "Minecraft Plans", icon: Server },
    { id: "vps", label: "VPS Plans", icon: Server },
    { id: "discord", label: "Discord Bot", icon: Bot },
    { id: "locations", label: "Locations", icon: Globe2 },
    { id: "applications", label: "Applications", icon: ClipboardList },
    { id: "branding", label: "Branding", icon: Settings },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070709] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#6c47ff]/10 border border-[#6c47ff]/20 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-[#6c47ff] animate-spin" />
          </div>
          <p className="text-sm text-gray-500">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070709] text-white">
      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} />}
      </AnimatePresence>

      {/* Confirm Modal */}
      {confirm && (
        <ConfirmModal
          open={!!confirm}
          title={confirm.title}
          message={confirm.message}
          danger={confirm.danger}
          onConfirm={confirm.onConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-white/[0.06] min-h-screen p-4 sticky top-0 h-screen overflow-y-auto flex flex-col">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-8 pt-2"
          >
            <div className="w-10 h-10 rounded-xl bg-[#6c47ff]/10 border border-[#6c47ff]/20 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#6c47ff]" />
            </div>
            <div>
              <p className="text-sm font-bold">CrazyNode</p>
              <p className="text-[10px] text-gray-500">Admin Panel</p>
            </div>
          </motion.div>

          {/* Nav */}
          <nav className="space-y-0.5 flex-1">
            {tabs.map((t, i) => (
              <motion.button
                key={t.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => setTab(t.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all relative ${
                  tab === t.id
                    ? "text-white"
                    : "text-gray-500 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {tab === t.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#6c47ff]/10 border border-[#6c47ff]/20 rounded-xl"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <t.icon className="w-4 h-4 relative z-10" />
                <span className="relative z-10">{t.label}</span>
              </motion.button>
            ))}
          </nav>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-red-400 hover:bg-red-500/[0.06] transition-all mt-4"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 min-h-screen overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              {tab === "overview" && <OverviewTab content={content} />}
              {tab === "hero" && <HeroTab content={content} onSave={saveKey} saving={saving} />}
              {tab === "announcements" && <AnnouncementsTab content={content} onSave={saveKey} saving={saving} />}
              {tab === "minecraft" && <MinecraftTab content={content} onSave={saveKey} saving={saving} showConfirm={showConfirm} />}
              {tab === "vps" && <VpsTab content={content} onSave={saveKey} saving={saving} showConfirm={showConfirm} />}
              {tab === "discord" && <DiscordTab content={content} onSave={saveKey} saving={saving} />}
              {tab === "locations" && <LocationsTab content={content} onSave={saveKey} saving={saving} />}
              {tab === "applications" && <ApplicationsTab showConfirm={showConfirm} showToast={showToast} />}
              {tab === "branding" && <BrandingTab content={content} onSave={saveKey} saving={saving} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

// ─── Overview Tab ──────────────────────────────────────────────────────────
function OverviewTab({ content }: { content: Record<string, any> }) {
  const stats = [
    { label: "Hero Games", value: content.hero_games?.length ?? 0, icon: Gamepad2, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
    { label: "Minecraft CPUs", value: content.minecraft_processors?.length ?? 0, icon: Server, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
    { label: "VPS Categories", value: content.vps_categories?.length ?? 0, icon: Activity, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
    { label: "Discord Plans", value: content.discord_bot_plans?.length ?? 0, icon: Bot, color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
    { label: "Locations", value: content.locations?.length ?? 0, icon: Globe2, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
    { label: "Announcements", value: content.announcements?.enabled ? 1 : 0, icon: Bell, color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Dashboard Overview</h1>
        <p className="text-sm text-gray-500">Control every aspect of your CrazyNode website from one place.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className={`premium-card p-5 border ${s.border} hover:scale-[1.02] transition-transform`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl ${s.bg} border ${s.border} flex items-center justify-center`}>
                <s.icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <TrendingUp className="w-3 h-3 text-gray-700" />
            </div>
            <p className="text-3xl font-bold mb-1">{s.value}</p>
            <p className="text-xs text-gray-500">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="premium-card p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-4 h-4 text-[#6c47ff]" />
          <h3 className="font-bold">Quick Guide</h3>
        </div>
        <ul className="text-sm text-gray-400 space-y-2">
          {[
            "All changes are saved to PostgreSQL via /api/content endpoints",
            "Frontend fetches from DB, falls back to defaults if empty",
            "Hero titles, banners, prices, descriptions are all editable live",
            "Applications tab — toggle open/close, build custom forms, view real submissions",
            "Use the Form Builder to create rich application questions",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <ChevronRight className="w-3 h-3 text-[#6c47ff] mt-0.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

// ─── Save Button Helper ────────────────────────────────────────────────────
function SaveBtn({ onClick, saving, id, label = "Save" }: { onClick: () => void; saving: string | null; id: string; label?: string }) {
  return (
    <button
      onClick={onClick}
      disabled={saving === id}
      className="px-5 py-2 bg-[#6c47ff] hover:bg-[#5535d4] rounded-xl text-sm font-semibold flex items-center gap-2 transition-all disabled:opacity-50"
    >
      {saving === id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
      {label}
    </button>
  );
}

// ─── Section Header ─────────────────────────────────────────────────────────
function SectionHeader({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
}

// ─── Field Input ─────────────────────────────────────────────────────────────
function FieldInput({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[10px] text-gray-500 uppercase tracking-wider">{label}</label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

const inputCls = "w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-sm focus:border-[#6c47ff]/50 outline-none transition-colors";
const selectCls = "w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-sm focus:border-[#6c47ff]/50 outline-none transition-colors";

// ─── Hero Tab ──────────────────────────────────────────────────────────────
function HeroTab({ content, onSave, saving }: any) {
  const [games, setGames] = useState(content.hero_games || []);
  useEffect(() => setGames(content.hero_games || []), [content.hero_games]);

  return (
    <div>
      <SectionHeader title="Hero / Banners">
        <SaveBtn onClick={() => onSave("hero_games", games)} saving={saving} id="hero_games" label="Save Hero" />
      </SectionHeader>

      <div className="space-y-4">
        {games.map((g: any, i: number) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="premium-card p-5">
            <div className="grid md:grid-cols-2 gap-4">
              <FieldInput label="Game Name">
                <input value={g.name} onChange={(e) => { const c = [...games]; c[i].name = e.target.value; setGames(c); }} className={inputCls} />
              </FieldInput>
              <FieldInput label="Slug">
                <input value={g.slug} onChange={(e) => { const c = [...games]; c[i].slug = e.target.value; setGames(c); }} className={inputCls} />
              </FieldInput>
              <FieldInput label="Starting Price (₹/mo)">
                <input type="number" value={g.startingPrice} onChange={(e) => { const c = [...games]; c[i].startingPrice = Number(e.target.value); setGames(c); }} className={inputCls} />
              </FieldInput>
              <FieldInput label="Banner URL">
                <input value={g.banner} onChange={(e) => { const c = [...games]; c[i].banner = e.target.value; setGames(c); }} className={inputCls} />
              </FieldInput>
              <div className="md:col-span-2">
                <FieldInput label="Description">
                  <textarea value={g.description} onChange={(e) => { const c = [...games]; c[i].description = e.target.value; setGames(c); }} rows={2} className={inputCls + " resize-none"} />
                </FieldInput>
              </div>
            </div>
            <div className="flex justify-end mt-3 pt-3 border-t border-white/[0.04]">
              <button onClick={() => setGames(games.filter((_: any, idx: number) => idx !== i))} className="text-xs text-red-400 flex items-center gap-1 hover:text-red-300 transition-colors">
                <Trash2 className="w-3 h-3" /> Remove Game
              </button>
            </div>
          </motion.div>
        ))}
        <button
          onClick={() => setGames([...games, { name: "New Game", slug: "new-game", startingPrice: 199, description: "", banner: "" }])}
          className="flex items-center gap-2 text-sm px-4 py-2 border border-white/10 rounded-xl hover:bg-white/5 transition-all"
        >
          <Plus className="w-4 h-4" /> Add Game
        </button>
      </div>
    </div>
  );
}

// ─── Announcements Tab ────────────────────────────────────────────────────
function AnnouncementsTab({ content, onSave, saving }: any) {
  const [ann, setAnn] = useState(content.announcements || { enabled: false, text: "", type: "info" });
  useEffect(() => setAnn(content.announcements || { enabled: false, text: "", type: "info" }), [content.announcements]);

  return (
    <div>
      <SectionHeader title="Announcements">
        <SaveBtn onClick={() => onSave("announcements", ann)} saving={saving} id="announcements" />
      </SectionHeader>

      <div className="premium-card p-6 space-y-5">
        <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/[0.06]">
          <div>
            <p className="text-sm font-semibold">Enable Announcement Banner</p>
            <p className="text-xs text-gray-500 mt-0.5">Show a banner to all site visitors</p>
          </div>
          <button
            onClick={() => setAnn({ ...ann, enabled: !ann.enabled })}
            className={`w-12 h-6 rounded-full border transition-all relative ${ann.enabled ? "bg-[#6c47ff]/20 border-[#6c47ff]/40" : "bg-white/[0.04] border-white/10"}`}
          >
            <span className={`absolute top-0.5 w-5 h-5 rounded-full transition-all ${ann.enabled ? "left-6 bg-[#6c47ff]" : "left-0.5 bg-gray-600"}`} />
          </button>
        </div>

        <FieldInput label="Announcement Text">
          <input value={ann.text} onChange={(e) => setAnn({ ...ann, text: e.target.value })} className={inputCls} placeholder="🔥 Summer promo: 30% off all plans!" />
        </FieldInput>

        <FieldInput label="Type">
          <select value={ann.type} onChange={(e) => setAnn({ ...ann, type: e.target.value })} className={selectCls}>
            <option value="info">Info</option>
            <option value="promo">Promo</option>
            <option value="warning">Warning</option>
          </select>
        </FieldInput>

        <div className={`p-3 rounded-xl border text-sm ${
          ann.type === "promo" ? "bg-purple-500/10 border-purple-500/20 text-purple-300" :
          ann.type === "warning" ? "bg-amber-500/10 border-amber-500/20 text-amber-300" :
          "bg-blue-500/10 border-blue-500/20 text-blue-300"
        }`}>
          Preview: {ann.text || "Your announcement text here"}
        </div>
      </div>
    </div>
  );
}

// ─── Minecraft Tab ────────────────────────────────────────────────────────
function MinecraftTab({ content, onSave, saving, showConfirm }: any) {
  const [processors, setProcessors] = useState(content.minecraft_processors || []);
  useEffect(() => setProcessors(content.minecraft_processors || []), [content.minecraft_processors]);

  const updateTier = (pIdx: number, tIdx: number, field: string, value: any) => {
    const copy = JSON.parse(JSON.stringify(processors));
    copy[pIdx].tiers[tIdx][field] = value;
    setProcessors(copy);
  };

  return (
    <div>
      <SectionHeader title="Minecraft Plans">
        <SaveBtn onClick={() => onSave("minecraft_processors", processors)} saving={saving} id="minecraft_processors" label="Save All" />
      </SectionHeader>

      {processors.map((proc: any, pIdx: number) => (
        <motion.div key={pIdx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="premium-card p-5 mb-5">
          <div className="grid md:grid-cols-4 gap-3 mb-4">
            <FieldInput label="CPU Name">
              <input value={proc.name} onChange={(e) => { const c = [...processors]; c[pIdx].name = e.target.value; setProcessors(c); }} className={inputCls} />
            </FieldInput>
            <FieldInput label="Category">
              <select value={proc.category} onChange={(e) => { const c = [...processors]; c[pIdx].category = e.target.value; setProcessors(c); }} className={selectCls}>
                <option>AMD</option>
                <option>INTEL</option>
              </select>
            </FieldInput>
            <FieldInput label="Badge">
              <input value={proc.badge || ""} onChange={(e) => { const c = [...processors]; c[pIdx].badge = e.target.value; setProcessors(c); }} className={inputCls} placeholder="e.g. POPULAR" />
            </FieldInput>
            <div className="flex items-end">
              <button
                onClick={() => showConfirm("Delete Processor", `Remove "${proc.name}"?`, () => setProcessors(processors.filter((_: any, i: number) => i !== pIdx)), true)}
                className="text-xs text-red-400 flex items-center gap-1 hover:text-red-300 px-3 py-2 border border-red-500/20 rounded-xl hover:bg-red-500/10 transition-all"
              >
                <Trash2 className="w-3 h-3" /> Remove CPU
              </button>
            </div>
          </div>

          <div className="bg-black/20 rounded-xl p-3 border border-white/[0.04]">
            <div className="grid grid-cols-6 gap-2 mb-2 px-1">
              {["Name", "Price ₹", "RAM", "Storage", "CPU %", ""].map((h) => (
                <p key={h} className="text-[10px] text-gray-600 uppercase">{h}</p>
              ))}
            </div>
            {proc.tiers.map((tier: any, tIdx: number) => (
              <div key={tIdx} className="grid grid-cols-6 gap-2 mb-2">
                {["name", "price", "ram", "storage", "cpu"].map((field) => (
                  <input
                    key={field}
                    type={field === "price" ? "number" : "text"}
                    value={tier[field]}
                    onChange={(e) => updateTier(pIdx, tIdx, field, field === "price" ? Number(e.target.value) : e.target.value)}
                    className="bg-black/30 border border-white/[0.06] rounded-lg px-2 py-1.5 text-xs focus:border-[#6c47ff]/50 outline-none"
                  />
                ))}
                <button
                  onClick={() => showConfirm("Delete Tier", `Remove "${tier.name}"?`, () => {
                    const c = JSON.parse(JSON.stringify(processors));
                    c[pIdx].tiers.splice(tIdx, 1);
                    setProcessors(c);
                  }, true)}
                  className="flex items-center justify-center text-red-400 hover:bg-red-500/10 rounded-lg"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                const c = JSON.parse(JSON.stringify(processors));
                c[pIdx].tiers.push({ name: "NEW", price: 100, ram: "2GB", storage: "10GB NVMe", cpu: "100%" });
                setProcessors(c);
              }}
              className="text-xs flex items-center gap-1 mt-1 px-3 py-1.5 border border-white/10 rounded-lg hover:bg-white/5 transition-all"
            >
              <Plus className="w-3 h-3" /> Add Tier
            </button>
          </div>
        </motion.div>
      ))}

      <button
        onClick={() => setProcessors([...processors, { id: `cpu-${Date.now()}`, name: "New CPU", category: "AMD", badge: "", tiers: [] }])}
        className="flex items-center gap-2 text-sm px-4 py-2 border border-white/10 rounded-xl hover:bg-white/5 transition-all"
      >
        <Plus className="w-4 h-4" /> Add Processor
      </button>
    </div>
  );
}

// ─── VPS Tab ───────────────────────────────────────────────────────────────
function VpsTab({ content, onSave, saving, showConfirm }: any) {
  const [cats, setCats] = useState(content.vps_categories || []);
  useEffect(() => setCats(content.vps_categories || []), [content.vps_categories]);

  return (
    <div>
      <SectionHeader title="VPS Plans">
        <SaveBtn onClick={() => onSave("vps_categories", cats)} saving={saving} id="vps_categories" label="Save VPS" />
      </SectionHeader>

      {cats.map((cat: any, cIdx: number) => (
        <motion.div key={cIdx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="premium-card p-5 mb-5">
          <div className="flex gap-3 mb-4">
            <input value={cat.name} onChange={(e) => { const c = [...cats]; c[cIdx].name = e.target.value; setCats(c); }} className={inputCls + " font-bold"} />
            <button
              onClick={() => showConfirm("Delete Category", `Remove "${cat.name}"?`, () => setCats(cats.filter((_: any, i: number) => i !== cIdx)), true)}
              className="text-red-400 hover:text-red-300 p-2 border border-red-500/20 rounded-xl hover:bg-red-500/10 transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-black/20 rounded-xl p-3 border border-white/[0.04]">
            <div className="grid grid-cols-5 gap-2 mb-2 px-1">
              {["Name", "Price ₹", "RAM", "Storage", "CPU"].map((h) => (
                <p key={h} className="text-[10px] text-gray-600 uppercase">{h}</p>
              ))}
            </div>
            {cat.tiers.map((tier: any, tIdx: number) => (
              <div key={tIdx} className="grid grid-cols-5 gap-2 mb-2">
                {["name", "price", "ram", "storage", "cpu"].map((field) => (
                  <input
                    key={field}
                    type={field === "price" ? "number" : "text"}
                    value={tier[field]}
                    onChange={(e) => {
                      const copy = JSON.parse(JSON.stringify(cats));
                      copy[cIdx].tiers[tIdx][field] = field === "price" ? Number(e.target.value) : e.target.value;
                      setCats(copy);
                    }}
                    className="bg-black/30 border border-white/[0.06] rounded-lg px-2 py-1.5 text-xs focus:border-[#6c47ff]/50 outline-none"
                  />
                ))}
              </div>
            ))}
            <button
              onClick={() => {
                const copy = JSON.parse(JSON.stringify(cats));
                copy[cIdx].tiers.push({ name: "VPS NEW", price: 699, ram: "8GB", storage: "80GB NVMe", cpu: "2 vCPU" });
                setCats(copy);
              }}
              className="text-xs flex items-center gap-1 mt-1 px-3 py-1.5 border border-white/10 rounded-lg hover:bg-white/5 transition-all"
            >
              <Plus className="w-3 h-3" /> Add Tier
            </button>
          </div>
        </motion.div>
      ))}

      <button
        onClick={() => setCats([...cats, { id: `cat-${Date.now()}`, name: "NEW CATEGORY", tiers: [] }])}
        className="flex items-center gap-2 text-sm px-4 py-2 border border-white/10 rounded-xl hover:bg-white/5 transition-all"
      >
        <Plus className="w-4 h-4" /> Add Category
      </button>
    </div>
  );
}

// ─── Discord Tab ───────────────────────────────────────────────────────────
function DiscordTab({ content, onSave, saving }: any) {
  const [plans, setPlans] = useState(content.discord_bot_plans || []);
  useEffect(() => setPlans(content.discord_bot_plans || []), [content.discord_bot_plans]);

  return (
    <div>
      <SectionHeader title="Discord Bot Plans">
        <SaveBtn onClick={() => onSave("discord_bot_plans", plans)} saving={saving} id="discord_bot_plans" />
      </SectionHeader>

      <div className="grid md:grid-cols-2 gap-4">
        {plans.map((p: any, i: number) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="premium-card p-5">
            <div className="grid grid-cols-2 gap-3 mb-3">
              {[
                { field: "name", label: "Plan Name", type: "text" },
                { field: "price", label: "Price ₹", type: "number" },
                { field: "ram", label: "RAM", type: "text" },
                { field: "storage", label: "Storage", type: "text" },
                { field: "cpu", label: "CPU", type: "text" },
                { field: "botSize", label: "Bot Size", type: "text" },
              ].map(({ field, label, type }) => (
                <FieldInput key={field} label={label}>
                  <input
                    type={type}
                    value={p[field]}
                    onChange={(e) => { const c = [...plans]; c[i][field] = type === "number" ? Number(e.target.value) : e.target.value; setPlans(c); }}
                    className={inputCls}
                  />
                </FieldInput>
              ))}
            </div>
            <button onClick={() => setPlans(plans.filter((_: any, idx: number) => idx !== i))} className="text-xs text-red-400 flex items-center gap-1 hover:text-red-300 transition-colors">
              <Trash2 className="w-3 h-3" /> Remove Plan
            </button>
          </motion.div>
        ))}
      </div>

      <button
        onClick={() => setPlans([...plans, { name: "NEW", price: 49, ram: "512MB", storage: "5GB NVMe", cpu: "50%", botSize: "Small Bots" }])}
        className="mt-4 flex items-center gap-2 text-sm px-4 py-2 border border-white/10 rounded-xl hover:bg-white/5 transition-all"
      >
        <Plus className="w-4 h-4" /> Add Plan
      </button>
    </div>
  );
}

// ─── Locations Tab ────────────────────────────────────────────────────────
function LocationsTab({ content, onSave, saving }: any) {
  const [locs, setLocs] = useState<any[]>(content.locations || []);
  useEffect(() => setLocs(content.locations || []), [content.locations]);

  return (
    <div>
      <SectionHeader title="Locations / Infrastructure">
        <SaveBtn onClick={() => onSave("locations", locs)} saving={saving} id="locations" />
      </SectionHeader>

      {locs.length === 0 ? (
        <div className="premium-card p-8 text-center">
          <Globe2 className="w-12 h-12 text-gray-700 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">No locations configured. Add your first datacenter location.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {locs.map((loc: any, i: number) => (
            <div key={i} className="premium-card p-4 grid md:grid-cols-4 gap-3">
              {["city", "country", "lat", "lng"].map((field) => (
                <FieldInput key={field} label={field}>
                  <input value={loc[field] || ""} onChange={(e) => { const c = [...locs]; c[i][field] = e.target.value; setLocs(c); }} className={inputCls} />
                </FieldInput>
              ))}
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => setLocs([...locs, { city: "Mumbai", country: "India", lat: "19.076", lng: "72.877" }])}
        className="mt-4 flex items-center gap-2 text-sm px-4 py-2 border border-white/10 rounded-xl hover:bg-white/5 transition-all"
      >
        <Plus className="w-4 h-4" /> Add Location
      </button>
    </div>
  );
}

// ─── Branding Tab ──────────────────────────────────────────────────────────
function BrandingTab({ content, onSave, saving }: any) {
  const [branding, setBranding] = useState(content.site_branding || { name: "CrazyNode", email: "root@crazynode.in", logo: "" });
  useEffect(() => setBranding(content.site_branding || { name: "CrazyNode", email: "root@crazynode.in", logo: "" }), [content.site_branding]);

  return (
    <div>
      <SectionHeader title="Branding & Contact">
        <SaveBtn onClick={() => onSave("site_branding", branding)} saving={saving} id="site_branding" />
      </SectionHeader>

      <div className="premium-card p-6 space-y-5 max-w-xl">
        <FieldInput label="Company Name">
          <input value={branding.name} onChange={(e) => setBranding({ ...branding, name: e.target.value })} className={inputCls} />
        </FieldInput>
        <FieldInput label="Email">
          <input value={branding.email} onChange={(e) => setBranding({ ...branding, email: e.target.value })} className={inputCls} />
        </FieldInput>
        <FieldInput label="Logo URL">
          <input value={branding.logo} onChange={(e) => setBranding({ ...branding, logo: e.target.value })} className={inputCls} placeholder="https://..." />
        </FieldInput>
        {branding.logo && (
          <div className="p-4 bg-black/20 rounded-xl border border-white/[0.06]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={branding.logo} alt="Logo preview" className="h-12 object-contain" />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Applications Tab ─────────────────────────────────────────────────────
type FieldType = "text" | "textarea" | "select" | "number" | "email" | "url" | "tel" | "date" | "range" | "checkbox" | "radio";

interface AppField {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
  placeholder?: string;
  options?: string[];
  min?: number;
  max?: number;
  description?: string;
}

interface AppTemplate {
  id: number;
  title: string;
  fields: AppField[];
  isOpen: boolean;
  closedMessage: string;
}

interface Submission {
  id: number;
  fullName: string;
  age: number;
  city: string;
  country: string;
  discord: string;
  email: string;
  skills: string[];
  hoursPerDay: string;
  contact: string | null;
  about: string;
  roleData: Record<string, any>;
  status: string;
  submittedAt: string;
}

const FIELD_TYPES: { value: FieldType; label: string; icon: string; desc: string }[] = [
  { value: "text", label: "Short Text", icon: "✏️", desc: "Single line text input" },
  { value: "textarea", label: "Long Text", icon: "📝", desc: "Multi-line paragraph answer" },
  { value: "select", label: "Dropdown", icon: "📋", desc: "Select from a list of options" },
  { value: "radio", label: "Radio / Choice", icon: "🔘", desc: "Pick one option from visible choices" },
  { value: "checkbox", label: "Checkbox", icon: "☑️", desc: "Yes/No or true/false toggle" },
  { value: "number", label: "Number", icon: "🔢", desc: "Numeric input with optional range" },
  { value: "range", label: "Slider", icon: "🎚️", desc: "Slide to pick a value in a range" },
  { value: "email", label: "Email", icon: "📧", desc: "Validated email address" },
  { value: "url", label: "URL / Link", icon: "🔗", desc: "Website or portfolio link" },
  { value: "tel", label: "Phone Number", icon: "📞", desc: "Phone / WhatsApp number" },
  { value: "date", label: "Date Picker", icon: "📅", desc: "Select a specific date" },
];

function FieldTypePickerModal({ open, onPick, onClose }: { open: boolean; onPick: (type: FieldType) => void; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className="premium-card p-6 max-w-2xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-bold">Choose Question Type</h3>
                <p className="text-xs text-gray-500 mt-0.5">Select the type of answer you want to collect</p>
              </div>
              <button onClick={onClose} className="text-gray-500 hover:text-white p-1.5 rounded-lg hover:bg-white/[0.04]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {FIELD_TYPES.map((ft) => (
                <button
                  key={ft.value}
                  onClick={() => onPick(ft.value)}
                  className="flex items-start gap-3 p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:bg-[#6c47ff]/10 hover:border-[#6c47ff]/30 transition-all text-left group"
                >
                  <span className="text-xl">{ft.icon}</span>
                  <div>
                    <p className="text-sm font-semibold group-hover:text-white transition-colors">{ft.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{ft.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SubmissionModal({ sub, onClose, onStatusChange }: { sub: Submission; onClose: () => void; onStatusChange: (id: number, status: string) => void }) {
  const statuses = ["Pending", "Reviewed", "Shortlisted", "Rejected"];
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8"
        style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="premium-card p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Application #{sub.id}</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-white p-1.5 rounded-lg hover:bg-white/[0.04]">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-5">
            {[
              ["Full Name", sub.fullName], ["Age", sub.age], ["City", sub.city],
              ["Country", sub.country], ["Discord", sub.discord], ["Email", sub.email],
              ["Hours/Day", sub.hoursPerDay], ["Contact", sub.contact || "—"],
            ].map(([label, value]) => (
              <div key={String(label)} className="p-3 bg-black/20 rounded-xl border border-white/[0.06]">
                <p className="text-[10px] text-gray-500 uppercase">{label}</p>
                <p className="text-sm mt-0.5">{String(value)}</p>
              </div>
            ))}
          </div>

          <div className="mb-4 p-3 bg-black/20 rounded-xl border border-white/[0.06]">
            <p className="text-[10px] text-gray-500 uppercase mb-1">Skills</p>
            <div className="flex flex-wrap gap-1.5">
              {(sub.skills as string[]).map((s: string) => (
                <span key={s} className="px-2 py-0.5 text-xs bg-[#6c47ff]/10 border border-[#6c47ff]/20 rounded-full">{s}</span>
              ))}
            </div>
          </div>

          <div className="mb-4 p-3 bg-black/20 rounded-xl border border-white/[0.06]">
            <p className="text-[10px] text-gray-500 uppercase mb-1">About</p>
            <p className="text-sm text-gray-300">{sub.about}</p>
          </div>

          {Object.keys(sub.roleData || {}).length > 0 && (
            <div className="mb-5 space-y-3">
              <p className="text-[10px] text-gray-500 uppercase">Role-Specific Answers</p>
              {Object.entries(sub.roleData).map(([k, v]) => (
                <div key={k} className="p-3 bg-black/20 rounded-xl border border-white/[0.06]">
                  <p className="text-[10px] text-gray-500 capitalize">{k.replace(/_/g, " ")}</p>
                  <p className="text-sm mt-0.5">{String(v)}</p>
                </div>
              ))}
            </div>
          )}

          <div>
            <p className="text-xs text-gray-500 mb-2">Update Status</p>
            <div className="flex flex-wrap gap-2">
              {statuses.map((s) => (
                <button
                  key={s}
                  onClick={() => onStatusChange(sub.id, s)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    sub.status === s
                      ? s === "Rejected" ? "bg-red-500/20 border-red-500/40 text-red-300"
                        : s === "Shortlisted" ? "bg-green-500/20 border-green-500/40 text-green-300"
                        : s === "Reviewed" ? "bg-blue-500/20 border-blue-500/40 text-blue-300"
                        : "bg-amber-500/20 border-amber-500/40 text-amber-300"
                      : "bg-white/[0.02] border-white/[0.06] text-gray-400 hover:border-white/20"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ApplicationsTab({ showConfirm, showToast }: { showConfirm: any; showToast: any }) {
  const [view, setView] = useState<"builder" | "submissions">("builder");
  const [template, setTemplate] = useState<AppTemplate | null>(null);
  const [loadingTemplate, setLoadingTemplate] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showTypePicker, setShowTypePicker] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loadingSubs, setLoadingSubs] = useState(false);
  const [selectedSub, setSelectedSub] = useState<Submission | null>(null);

  useEffect(() => {
    fetchTemplate();
  }, []);

  useEffect(() => {
    if (view === "submissions") fetchSubmissions();
  }, [view]);

  const fetchTemplate = async () => {
    setLoadingTemplate(true);
    try {
      const res = await fetch("/api/applications/template");
      const data = await res.json();
      setTemplate(data);
    } catch {
      showToast("Failed to load template", "error");
    }
    setLoadingTemplate(false);
  };

  const fetchSubmissions = async () => {
    setLoadingSubs(true);
    try {
      const res = await fetch("/api/applications/submissions");
      const data = await res.json();
      setSubmissions(Array.isArray(data) ? data : []);
    } catch {
      showToast("Failed to load submissions", "error");
    }
    setLoadingSubs(false);
  };

  const saveTemplate = async () => {
    if (!template) return;
    setSaving(true);
    try {
      const res = await fetch("/api/applications/template", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(template),
      });
      if (!res.ok) throw new Error("Failed");
      const updated = await res.json();
      setTemplate(updated);
      showToast("Application template saved!", "success");
    } catch {
      showToast("Failed to save template", "error");
    }
    setSaving(false);
  };

  const addField = (type: FieldType) => {
    if (!template) return;
    const newField: AppField = {
      id: `f_${Date.now()}`,
      label: FIELD_TYPES.find((f) => f.value === type)?.label || "New Question",
      type,
      required: true,
      placeholder: "",
      options: ["select", "radio"].includes(type) ? ["Option 1", "Option 2"] : undefined,
      min: ["range", "number"].includes(type) ? 0 : undefined,
      max: ["range", "number"].includes(type) ? 100 : undefined,
    };
    setTemplate({ ...template, fields: [...template.fields, newField] });
    setShowTypePicker(false);
  };

  const updateField = (idx: number, updates: Partial<AppField>) => {
    if (!template) return;
    const fields = [...template.fields];
    fields[idx] = { ...fields[idx], ...updates };
    setTemplate({ ...template, fields });
  };

  const removeField = (idx: number) => {
    if (!template) return;
    showConfirm(
      "Remove Question",
      `Remove "${template.fields[idx].label}"?`,
      () => setTemplate({ ...template, fields: template.fields.filter((_, i) => i !== idx) }),
      true
    );
  };

  const toggleOpen = () => {
    if (!template) return;
    const newVal = !template.isOpen;
    showConfirm(
      newVal ? "Open Applications" : "Close Applications",
      newVal
        ? "This will allow users to submit applications. Continue?"
        : "This will close applications and show the closed message to users. Continue?",
      () => {
        setTemplate({ ...template, isOpen: newVal });
        // Save immediately
        fetch("/api/applications/template", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...template, isOpen: newVal }),
        }).then(() => showToast(newVal ? "Applications opened!" : "Applications closed!", "success"));
      }
    );
  };

  const handleStatusChange = async (id: number, status: string) => {
    await fetch(`/api/applications/submissions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
    if (selectedSub?.id === id) setSelectedSub((prev) => prev ? { ...prev, status } : null);
    showToast(`Status updated to ${status}`, "success");
  };

  const handleDelete = (id: number) => {
    showConfirm("Delete Submission", "Permanently delete this application? This cannot be undone.", async () => {
      await fetch(`/api/applications/submissions/${id}`, { method: "DELETE" });
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
      if (selectedSub?.id === id) setSelectedSub(null);
      showToast("Submission deleted", "success");
    }, true);
  };

  const statusColor: Record<string, string> = {
    Pending: "bg-amber-500/10 border-amber-500/30 text-amber-400",
    Reviewed: "bg-blue-500/10 border-blue-500/30 text-blue-400",
    Shortlisted: "bg-green-500/10 border-green-500/30 text-green-400",
    Rejected: "bg-red-500/10 border-red-500/30 text-red-400",
  };

  if (loadingTemplate) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-[#6c47ff] animate-spin" />
      </div>
    );
  }

  if (!template) return null;

  return (
    <div>
      {showTypePicker && <FieldTypePickerModal open onPick={addField} onClose={() => setShowTypePicker(false)} />}
      {selectedSub && <SubmissionModal sub={selectedSub} onClose={() => setSelectedSub(null)} onStatusChange={handleStatusChange} />}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Applications</h2>
        <div className="flex items-center gap-3">
          {/* Open/Close Toggle */}
          <button
            onClick={toggleOpen}
            className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
              template.isOpen
                ? "bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20"
                : "bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20"
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${template.isOpen ? "bg-green-400 animate-pulse" : "bg-red-400"}`} />
            Applications {template.isOpen ? "Open" : "Closed"}
          </button>

          {/* View Tabs */}
          <div className="flex bg-black/30 border border-white/[0.06] rounded-xl p-1">
            <button
              onClick={() => setView("builder")}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${view === "builder" ? "bg-[#6c47ff] text-white" : "text-gray-400 hover:text-white"}`}
            >
              Form Builder
            </button>
            <button
              onClick={() => setView("submissions")}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${view === "submissions" ? "bg-[#6c47ff] text-white" : "text-gray-400 hover:text-white"}`}
            >
              Submissions {submissions.length > 0 ? `(${submissions.length})` : ""}
            </button>
          </div>
        </div>
      </div>

      {/* Closed Status Info */}
      {!template.isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 p-4 bg-red-500/5 border border-red-500/20 rounded-xl flex items-center gap-3"
        >
          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
          <div>
            <p className="text-sm text-red-300 font-medium">Applications are currently closed</p>
            <p className="text-xs text-gray-500 mt-0.5">Users will see: "{template.closedMessage}"</p>
          </div>
        </motion.div>
      )}

      {/* FORM BUILDER */}
      {view === "builder" && (
        <div>
          <div className="premium-card p-5 mb-5">
            <div className="grid md:grid-cols-2 gap-4">
              <FieldInput label="Application Title">
                <input
                  value={template.title}
                  onChange={(e) => setTemplate({ ...template, title: e.target.value })}
                  className={inputCls}
                  placeholder="Staff Application"
                />
              </FieldInput>
              <FieldInput label="Closed Message (shown to users)">
                <input
                  value={template.closedMessage}
                  onChange={(e) => setTemplate({ ...template, closedMessage: e.target.value })}
                  className={inputCls}
                  placeholder="Applications are closed..."
                />
              </FieldInput>
            </div>
            <p className="text-[10px] text-gray-600 mt-3">
              ℹ️ Step 1 (Personal Info) & Step 3 (T&Cs) are standard. Build Step 2 questions below.
            </p>
          </div>

          {/* Fields */}
          <div className="space-y-3 mb-4">
            <AnimatePresence>
              {template.fields.map((field, idx) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0 }}
                  className="premium-card p-5"
                >
                  {/* Field Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{FIELD_TYPES.find((f) => f.value === field.type)?.icon}</span>
                      <div>
                        <p className="text-xs font-semibold text-white">{FIELD_TYPES.find((f) => f.value === field.type)?.label}</p>
                        <p className="text-[10px] text-gray-600">Question #{idx + 1}</p>
                      </div>
                    </div>
                    <button onClick={() => removeField(idx)} className="text-red-400 hover:text-red-300 p-1.5 hover:bg-red-500/10 rounded-lg transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    <FieldInput label="Question Label">
                      <input value={field.label} onChange={(e) => updateField(idx, { label: e.target.value })} className={inputCls} />
                    </FieldInput>

                    <FieldInput label="Field Type">
                      <select
                        value={field.type}
                        onChange={(e) => updateField(idx, { type: e.target.value as FieldType })}
                        className={selectCls}
                      >
                        {FIELD_TYPES.map((ft) => (
                          <option key={ft.value} value={ft.value}>{ft.icon} {ft.label}</option>
                        ))}
                      </select>
                    </FieldInput>

                    <FieldInput label="Description / Helper Text">
                      <input value={field.description || ""} onChange={(e) => updateField(idx, { description: e.target.value })} className={inputCls} placeholder="Optional hint for applicants..." />
                    </FieldInput>

                    <FieldInput label="Required?">
                      <select value={field.required ? "true" : "false"} onChange={(e) => updateField(idx, { required: e.target.value === "true" })} className={selectCls}>
                        <option value="true">Yes — Required</option>
                        <option value="false">No — Optional</option>
                      </select>
                    </FieldInput>

                    {/* Placeholder for text types */}
                    {["text", "textarea", "number", "email", "url", "tel"].includes(field.type) && (
                      <FieldInput label="Placeholder Text">
                        <input value={field.placeholder || ""} onChange={(e) => updateField(idx, { placeholder: e.target.value })} className={inputCls} placeholder="e.g. Type your answer..." />
                      </FieldInput>
                    )}

                    {/* Options for select/radio */}
                    {["select", "radio"].includes(field.type) && (
                      <div className="md:col-span-2">
                        <FieldInput label="Options (one per line)">
                          <textarea
                            value={(field.options || []).join("\n")}
                            onChange={(e) => updateField(idx, { options: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })}
                            rows={3}
                            className={inputCls + " resize-none"}
                            placeholder={"Option 1\nOption 2\nOption 3"}
                          />
                        </FieldInput>
                      </div>
                    )}

                    {/* Min/Max for range/number */}
                    {["range", "number"].includes(field.type) && (
                      <>
                        <FieldInput label="Minimum Value">
                          <input type="number" value={field.min ?? 0} onChange={(e) => updateField(idx, { min: Number(e.target.value) })} className={inputCls} />
                        </FieldInput>
                        <FieldInput label="Maximum Value">
                          <input type="number" value={field.max ?? 100} onChange={(e) => updateField(idx, { max: Number(e.target.value) })} className={inputCls} />
                        </FieldInput>
                      </>
                    )}
                  </div>

                  {/* Live Preview */}
                  <div className="mt-4 pt-4 border-t border-white/[0.04]">
                    <p className="text-[10px] text-gray-600 mb-2 uppercase">Live Preview</p>
                    <FieldPreview field={field} />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Add Question + Save */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowTypePicker(true)}
              className="flex items-center gap-2 text-sm px-5 py-2.5 border border-[#6c47ff]/30 bg-[#6c47ff]/10 text-[#6c47ff] rounded-xl hover:bg-[#6c47ff]/20 transition-all font-medium"
            >
              <Plus className="w-4 h-4" /> Add Question
            </button>
            <button
              onClick={saveTemplate}
              disabled={saving}
              className="flex items-center gap-2 text-sm px-5 py-2.5 bg-[#6c47ff] hover:bg-[#5535d4] rounded-xl text-white font-semibold transition-all disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Template
            </button>
          </div>
        </div>
      )}

      {/* SUBMISSIONS */}
      {view === "submissions" && (
        <div>
          {loadingSubs ? (
            <div className="flex items-center justify-center h-40">
              <Loader2 className="w-6 h-6 text-[#6c47ff] animate-spin" />
            </div>
          ) : submissions.length === 0 ? (
            <div className="premium-card p-12 text-center">
              <Users className="w-12 h-12 text-gray-700 mx-auto mb-3" />
              <p className="text-gray-400">No submissions yet</p>
              <p className="text-xs text-gray-600 mt-1">Applications will appear here when users submit them</p>
            </div>
          ) : (
            <div className="premium-card overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-white/[0.02] border-b border-white/[0.06]">
                  <tr>
                    {["#", "Applicant", "Discord", "Status", "Submitted", "Actions"].map((h) => (
                      <th key={h} className="text-left p-4 font-medium text-gray-400 text-xs uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {submissions.map((sub, i) => (
                      <motion.tr
                        key={sub.id}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="p-4 text-gray-600 text-xs">{sub.id}</td>
                        <td className="p-4">
                          <p className="font-medium">{sub.fullName}</p>
                          <p className="text-xs text-gray-500">{sub.email}</p>
                        </td>
                        <td className="p-4 text-gray-400 text-xs">{sub.discord}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusColor[sub.status] || "bg-gray-500/10 border-gray-500/30 text-gray-400"}`}>
                            {sub.status}
                          </span>
                        </td>
                        <td className="p-4 text-gray-500 text-xs">
                          {new Date(sub.submittedAt).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            <button onClick={() => setSelectedSub(sub)} className="p-1.5 text-[#6c47ff] hover:bg-[#6c47ff]/10 rounded-lg transition-all" title="View">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDelete(sub.id)} className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-all" title="Delete">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Field Preview ─────────────────────────────────────────────────────────
function FieldPreview({ field }: { field: AppField }) {
  const cls = "w-full bg-black/30 border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-gray-300 outline-none pointer-events-none";

  switch (field.type) {
    case "textarea":
      return <textarea rows={2} className={cls + " resize-none"} readOnly placeholder={field.placeholder || "..."} />;
    case "select":
      return (
        <select className={cls}>
          <option>{(field.options || [])[0] || "Select option..."}</option>
        </select>
      );
    case "radio":
      return (
        <div className="flex flex-wrap gap-3">
          {(field.options || []).slice(0, 4).map((opt) => (
            <label key={opt} className="flex items-center gap-1.5 text-xs text-gray-400">
              <input type="radio" disabled /> {opt}
            </label>
          ))}
        </div>
      );
    case "checkbox":
      return <label className="flex items-center gap-2 text-xs text-gray-400"><input type="checkbox" disabled /> {field.label}</label>;
    case "range":
      return (
        <div>
          <input type="range" min={field.min ?? 0} max={field.max ?? 100} className="w-full" readOnly />
          <div className="flex justify-between text-[10px] text-gray-600 mt-1"><span>{field.min ?? 0}</span><span>{field.max ?? 100}</span></div>
        </div>
      );
    case "date":
      return <input type="date" className={cls} readOnly />;
    default:
      return <input type={field.type} className={cls} readOnly placeholder={field.placeholder || "..."} />;
  }
}
