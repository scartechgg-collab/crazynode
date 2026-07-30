"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Gamepad2,
  Server,
  Bot,
  ShieldCheck,
  Megaphone,
  Globe2,
  Settings,
  LogOut,
  Save,
  Plus,
  Trash2,
  Edit,
  Eye,
  Loader2,
  ClipboardList, // New Icon for Applications
} from "lucide-react";

type Tab = "overview" | "hero" | "minecraft" | "vps" | "discord" | "locations" | "announcements" | "branding" | "site" | "applications";

export default function AdminDashboardClient() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("overview");
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    checkAuth();
    fetchContent();
  }, []);

  const checkAuth = async () => {
    const res = await fetch("/api/admin/me");
    if (!res.ok) {
      router.push("/admin/login");
    }
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
      setMessage(`✅ ${key} saved`);
      setTimeout(() => setMessage(""), 2500);
    } catch (e) {
      setMessage(`❌ Failed to save ${key}`);
    } finally {
      setSaving(null);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "hero", label: "Hero / Banners", icon: Gamepad2 },
    { id: "announcements", label: "Announcements", icon: Megaphone },
    { id: "minecraft", label: "Minecraft Plans", icon: Server },
    { id: "vps", label: "VPS Plans", icon: Server },
    { id: "discord", label: "Discord Bot", icon: Bot },
    { id: "locations", label: "Locations", icon: Globe2 },
    { id: "applications", label: "Applications", icon: ClipboardList }, // New Tab
    { id: "branding", label: "Branding", icon: Settings },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070709] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-brand animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070709] text-white">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-white/[0.06] min-h-screen p-4 sticky top-0 h-screen overflow-y-auto">
          <div className="flex items-center gap-3 mb-8 pt-2">
            <div className="w-9 h-9 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-brand" />
            </div>
            <div>
              <p className="text-sm font-bold">CrazyNode Admin</p>
              <p className="text-[10px] text-gray-500">root@crazynode.in</p>
            </div>
          </div>

          <nav className="space-y-1">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${tab === t.id ? "bg-brand/10 border border-brand/20 text-white" : "text-gray-500 hover:text-white hover:bg-white/[0.04]"}`}
              >
                <t.icon className="w-4 h-4" />
                {t.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-6">
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-white hover:bg-white/[0.04]">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 p-8">
          {message && (
            <div className="fixed top-5 right-5 z-50 bg-black border border-white/10 px-4 py-2 rounded-xl text-sm shadow-xl">{message}</div>
          )}

          {tab === "overview" && <OverviewTab content={content} />}
          {tab === "hero" && <HeroTab content={content} onSave={saveKey} saving={saving} />}
          {tab === "announcements" && <AnnouncementsTab content={content} onSave={saveKey} saving={saving} />}
          {tab === "minecraft" && <MinecraftTab content={content} onSave={saveKey} saving={saving} setContent={setContent} />}
          {tab === "vps" && <VpsTab content={content} onSave={saveKey} saving={saving} setContent={setContent} />}
          {tab === "discord" && <DiscordTab content={content} onSave={saveKey} saving={saving} />}
          {tab === "locations" && <LocationsTab content={content} onSave={saveKey} saving={saving} />}
          {tab === "applications" && <ApplicationsTab content={content} onSave={saveKey} saving={saving} />}
          {tab === "branding" && <BrandingTab content={content} onSave={saveKey} saving={saving} />}
        </main>
      </div>
    </div>
  );
}

// ... (Keep all your existing tab components: OverviewTab, HeroTab, etc. exactly the same) ...
// I am omitting them here to save space, but DO NOT delete them from your file. 
// Just paste the ApplicationsTab below at the end of your file.

function ApplicationsTab({ content, onSave, saving }: any) {
  const [appTemplate, setAppTemplate] = useState(content.application_template || { title: "Staff Application", fields: [] });
  const [view, setView] = useState<"builder" | "submissions">("builder");

  useEffect(() => {
    setAppTemplate(content.application_template || { title: "Staff Application", fields: [] });
  }, [content.application_template]);

  // Mock submissions for UI demonstration
  const submissions = [
    { id: 1, name: "John Doe", discord: "johndoe", role: "Support Agent", date: "2024-05-15", status: "Pending" },
    { id: 2, name: "Jane Smith", discord: "janesmith", role: "Developer", date: "2024-05-14", status: "Reviewed" }
  ];

  const addField = () => {
    setAppTemplate({
      ...appTemplate,
      fields: [...appTemplate.fields, { id: `f_${Date.now()}`, label: "New Question", type: "text", required: true, placeholder: "" }]
    });
  };

  const updateField = (idx: number, key: string, value: any) => {
    const fields = [...appTemplate.fields];
    fields[idx] = { ...fields[idx], [key]: value };
    setAppTemplate({ ...appTemplate, fields });
  };

  const removeField = (idx: number) => {
    setAppTemplate({ ...appTemplate, fields: appTemplate.fields.filter((_: any, i: number) => i !== idx) });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-4">
          <button onClick={() => setView("builder")} className={`px-4 py-2 rounded-xl text-sm font-semibold ${view === "builder" ? "bg-brand text-white" : "border border-white/10 text-gray-400"}`}>Form Builder</button>
          <button onClick={() => setView("submissions")} className={`px-4 py-2 rounded-xl text-sm font-semibold ${view === "submissions" ? "bg-brand text-white" : "border border-white/10 text-gray-400"}`}>Submissions ({submissions.length})</button>
        </div>
        
        {view === "builder" && (
          <button onClick={() => onSave("application_template", appTemplate)} disabled={saving === "application_template"} className="px-4 py-2 bg-brand rounded-xl text-sm font-semibold flex items-center gap-2">
            {saving === "application_template" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Template
          </button>
        )}
      </div>

      {view === "builder" && (
        <div>
          <div className="premium-card p-5 mb-6">
            <label className="text-[11px] text-gray-500 uppercase">Application Title</label>
            <input value={appTemplate.title} onChange={(e) => setAppTemplate({ ...appTemplate, title: e.target.value })} className="w-full mt-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm" />
            <p className="text-[10px] text-gray-600 mt-2">Note: Step 1 (User Info) & Step 3 (T&Cs) are standard. Use this builder to create questions for Step 2.</p>
          </div>

          <div className="space-y-4">
            {appTemplate.fields.map((field: any, idx: number) => (
              <div key={field.id} className="premium-card p-4 grid grid-cols-12 gap-3 items-end">
                <div className="col-span-12 md:col-span-4">
                  <label className="text-[10px] text-gray-500 uppercase">Question Label</label>
                  <input value={field.label} onChange={(e) => updateField(idx, "label", e.target.value)} className="w-full mt-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm" />
                </div>
                <div className="col-span-6 md:col-span-2">
                  <label className="text-[10px] text-gray-500 uppercase">Type</label>
                  <select value={field.type} onChange={(e) => updateField(idx, "type", e.target.value)} className="w-full mt-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm">
                    <option value="text">Text Input</option>
                    <option value="textarea">Long Text</option>
                    <option value="select">Dropdown</option>
                  </select>
                </div>
                <div className="col-span-6 md:col-span-2">
                  <label className="text-[10px] text-gray-500 uppercase">Required?</label>
                  <select value={field.required} onChange={(e) => updateField(idx, "required", e.target.value === "true")} className="w-full mt-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div className="col-span-10 md:col-span-3">
                  <label className="text-[10px] text-gray-500 uppercase">Placeholder (If text/textarea)</label>
                  <input value={field.placeholder || ""} onChange={(e) => updateField(idx, "placeholder", e.target.value)} className="w-full mt-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm" />
                </div>
                <div className="col-span-2 md:col-span-1 flex justify-end">
                  <button onClick={() => removeField(idx)} className="text-red-400 p-2 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                </div>
                
                {field.type === "select" && (
                  <div className="col-span-12">
                    <label className="text-[10px] text-gray-500 uppercase">Options (Comma separated)</label>
                    <input 
                      value={field.options?.join(", ") || ""} 
                      onChange={(e) => updateField(idx, "options", e.target.value.split(",").map(s => s.trim()))} 
                      className="w-full mt-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm" 
                      placeholder="Option 1, Option 2, Option 3"
                    />
                  </div>
                )}
              </div>
            ))}
            
            <button onClick={addField} className="flex items-center gap-2 text-sm px-4 py-2 border border-white/10 rounded-xl hover:bg-white/5"><Plus className="w-4 h-4" /> Add Question</button>
          </div>
        </div>
      )}

      {view === "submissions" && (
        <div className="premium-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.02] border-b border-white/[0.06]">
              <tr>
                <th className="text-left p-4 font-medium text-gray-400">Applicant</th>
                <th className="text-left p-4 font-medium text-gray-400">Discord</th>
                <th className="text-left p-4 font-medium text-gray-400">Role</th>
                <th className="text-left p-4 font-medium text-gray-400">Date</th>
                <th className="text-left p-4 font-medium text-gray-400">Status</th>
                <th className="text-right p-4 font-medium text-gray-400">Action</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map(sub => (
                <tr key={sub.id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                  <td className="p-4 text-white">{sub.name}</td>
                  <td className="p-4 text-gray-400">{sub.discord}</td>
                  <td className="p-4 text-gray-400">{sub.role}</td>
                  <td className="p-4 text-gray-400">{sub.date}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${sub.status === "Pending" ? "bg-amber-500/10 text-amber-400" : "bg-green-500/10 text-green-400"}`}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-brand hover:text-brand-dark"><Eye className="w-4 h-4 inline" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Make sure to keep all your other existing functions (OverviewTab, HeroTab, etc.) below or above this.

function OverviewTab({ content }: { content: Record<string, any> }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Dashboard Overview</h1>
      <p className="text-sm text-gray-500 mb-8">Control every aspect of your CrazyNode website from one place.</p>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="premium-card p-5">
          <p className="text-xs text-gray-500">Hero Games</p>
          <p className="text-2xl font-bold mt-2">{content.hero_games?.length || 0}</p>
        </div>
        <div className="premium-card p-5">
          <p className="text-xs text-gray-500">Minecraft CPUs</p>
          <p className="text-2xl font-bold mt-2">{content.minecraft_processors?.length || 0}</p>
        </div>
        <div className="premium-card p-5">
          <p className="text-xs text-gray-500">VPS Categories</p>
          <p className="text-2xl font-bold mt-2">{content.vps_categories?.length || 0}</p>
        </div>
        <div className="premium-card p-5">
          <p className="text-xs text-gray-500">Discord Plans</p>
          <p className="text-2xl font-bold mt-2">{content.discord_bot_plans?.length || 0}</p>
        </div>
        <div className="premium-card p-5">
          <p className="text-xs text-gray-500">Announcement</p>
          <p className="text-sm font-bold mt-2 truncate">{content.announcements?.text?.slice(0, 40) || "None"}</p>
        </div>
      </div>

      <div className="mt-8 premium-card p-6">
        <h3 className="font-bold mb-2">How it works</h3>
        <ul className="text-sm text-gray-400 list-disc pl-5 space-y-1">
          <li>All changes are saved to Supabase / PostgreSQL via /api/content</li>
          <li>Frontend fetches from DB, falls back to defaults if empty</li>
          <li>Hero titles, banners, prices, descriptions are all editable live</li>
          <li>You can rename categories, edit prices, add/remove tiers without code</li>
        </ul>
      </div>
    </div>
  );
}

function HeroTab({ content, onSave, saving }: any) {
  const [games, setGames] = useState(content.hero_games || []);
  useEffect(() => setGames(content.hero_games || []), [content.hero_games]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Hero Section</h2>
        <button onClick={() => onSave("hero_games", games)} disabled={saving === "hero_games"} className="px-4 py-2 bg-brand rounded-xl text-sm font-semibold flex items-center gap-2">
          {saving === "hero_games" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Hero
        </button>
      </div>

      <div className="space-y-4">
        {games.map((g: any, i: number) => (
          <div key={i} className="premium-card p-5 grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] text-gray-500 uppercase">Name</label>
              <input value={g.name} onChange={(e) => {
                const c = [...games]; c[i].name = e.target.value; setGames(c);
              }} className="w-full mt-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-[11px] text-gray-500 uppercase">Slug</label>
              <input value={g.slug} onChange={(e) => {
                const c = [...games]; c[i].slug = e.target.value; setGames(c);
              }} className="w-full mt-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-[11px] text-gray-500 uppercase">Price (₹/mo)</label>
              <input type="number" value={g.startingPrice} onChange={(e) => {
                const c = [...games]; c[i].startingPrice = Number(e.target.value); setGames(c);
              }} className="w-full mt-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="text-[11px] text-gray-500 uppercase">Banner URL</label>
              <input value={g.banner} onChange={(e) => {
                const c = [...games]; c[i].banner = e.target.value; setGames(c);
              }} className="w-full mt-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="text-[11px] text-gray-500 uppercase">Description</label>
              <textarea value={g.description} onChange={(e) => {
                const c = [...games]; c[i].description = e.target.value; setGames(c);
              }} rows={3} className="w-full mt-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button onClick={() => setGames(games.filter((_: any, idx: number) => idx !== i))} className="text-xs text-red-400 flex items-center gap-1"><Trash2 className="w-3 h-3" /> Remove</button>
            </div>
          </div>
        ))}
        <button onClick={() => setGames([...games, { name: "New Game", slug: "new-game", startingPrice: 199, description: "", banner: "" }])} className="flex items-center gap-2 text-sm px-4 py-2 border border-white/10 rounded-xl hover:bg-white/5"><Plus className="w-4 h-4" /> Add Game</button>
      </div>
    </div>
  );
}

function AnnouncementsTab({ content, onSave, saving }: any) {
  const [ann, setAnn] = useState(content.announcements || { enabled: false, text: "", type: "info" });
  useEffect(() => setAnn(content.announcements || { enabled: false, text: "", type: "info" }), [content.announcements]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Announcements</h2>
        <button onClick={() => onSave("announcements", ann)} disabled={saving === "announcements"} className="px-4 py-2 bg-brand rounded-xl text-sm font-semibold flex items-center gap-2">
          {saving === "announcements" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save
        </button>
      </div>

      <div className="premium-card p-6 space-y-4">
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={ann.enabled} onChange={(e) => setAnn({ ...ann, enabled: e.target.checked })} /> Enabled</label>
        <div>
          <label className="text-[11px] text-gray-500 uppercase">Text</label>
          <input value={ann.text} onChange={(e) => setAnn({ ...ann, text: e.target.value })} className="w-full mt-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm" placeholder="🔥 Promo message" />
        </div>
        <div>
          <label className="text-[11px] text-gray-500 uppercase">Type</label>
          <select value={ann.type} onChange={(e) => setAnn({ ...ann, type: e.target.value })} className="w-full mt-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm">
            <option value="info">Info</option>
            <option value="promo">Promo</option>
            <option value="warning">Warning</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function MinecraftTab({ content, onSave, saving, setContent }: any) {
  const [processors, setProcessors] = useState(content.minecraft_processors || []);
  useEffect(() => setProcessors(content.minecraft_processors || []), [content.minecraft_processors]);

  const updateTier = (pIdx: number, tIdx: number, field: string, value: any) => {
    const copy = JSON.parse(JSON.stringify(processors));
    copy[pIdx].tiers[tIdx][field] = value;
    setProcessors(copy);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Minecraft Plans (Full Control)</h2>
        <button onClick={() => onSave("minecraft_processors", processors)} disabled={saving === "minecraft_processors"} className="px-4 py-2 bg-brand rounded-xl text-sm font-semibold flex items-center gap-2">
          {saving === "minecraft_processors" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save All Processors
        </button>
      </div>

      {processors.map((proc: any, pIdx: number) => (
        <div key={pIdx} className="premium-card p-5 mb-6">
          <div className="grid md:grid-cols-4 gap-3 mb-4">
            <div>
              <label className="text-[10px] text-gray-500">Name</label>
              <input value={proc.name} onChange={(e) => {
                const c = [...processors]; c[pIdx].name = e.target.value; setProcessors(c);
              }} className="w-full bg-black/30 border border-white/10 rounded-lg px-2 py-2 text-xs" />
            </div>
            <div>
              <label className="text-[10px] text-gray-500">Category</label>
              <select value={proc.category} onChange={(e) => {
                const c = [...processors]; c[pIdx].category = e.target.value; setProcessors(c);
              }} className="w-full bg-black/30 border border-white/10 rounded-lg px-2 py-2 text-xs">
                <option>AMD</option>
                <option>INTEL</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] text-gray-500">Badge</label>
              <input value={proc.badge || ""} onChange={(e) => {
                const c = [...processors]; c[pIdx].badge = e.target.value; setProcessors(c);
              }} className="w-full bg-black/30 border border-white/10 rounded-lg px-2 py-2 text-xs" />
            </div>
            <div className="flex items-end">
              <button onClick={() => setProcessors(processors.filter((_: any, i: number) => i !== pIdx))} className="text-xs text-red-400 flex items-center gap-1"><Trash2 className="w-3 h-3" /> Delete CPU</button>
            </div>
          </div>

          <div className="space-y-2">
            {proc.tiers.map((tier: any, tIdx: number) => (
              <div key={tIdx} className="grid grid-cols-6 gap-2 bg-white/[0.02] p-3 rounded-xl border border-white/[0.05]">
                <input value={tier.name} onChange={(e) => updateTier(pIdx, tIdx, "name", e.target.value)} placeholder="Name" className="bg-black/20 border border-white/10 rounded px-2 py-1 text-xs" />
                <input type="number" value={tier.price} onChange={(e) => updateTier(pIdx, tIdx, "price", Number(e.target.value))} className="bg-black/20 border border-white/10 rounded px-2 py-1 text-xs" />
                <input value={tier.ram} onChange={(e) => updateTier(pIdx, tIdx, "ram", e.target.value)} className="bg-black/20 border border-white/10 rounded px-2 py-1 text-xs" />
                <input value={tier.storage} onChange={(e) => updateTier(pIdx, tIdx, "storage", e.target.value)} className="bg-black/20 border border-white/10 rounded px-2 py-1 text-xs" />
                <input value={tier.cpu} onChange={(e) => updateTier(pIdx, tIdx, "cpu", e.target.value)} className="bg-black/20 border border-white/10 rounded px-2 py-1 text-xs" />
                <button onClick={() => {
                  const c = JSON.parse(JSON.stringify(processors));
                  c[pIdx].tiers.splice(tIdx, 1);
                  setProcessors(c);
                }} className="text-red-400"><Trash2 className="w-3 h-3" /></button>
              </div>
            ))}
            <button onClick={() => {
              const c = JSON.parse(JSON.stringify(processors));
              c[pIdx].tiers.push({ name: "NEW", price: 100, ram: "2GB", storage: "10GB NVMe", cpu: "100%", perks: [{ icon: "🛡️", label: "DDoS" }] });
              setProcessors(c);
            }} className="text-xs flex items-center gap-1 mt-2 px-3 py-1.5 border border-white/10 rounded-lg hover:bg-white/5"><Plus className="w-3 h-3" /> Add Tier</button>
          </div>
        </div>
      ))}

      <button onClick={() => setProcessors([...processors, { id: `cpu-${Date.now()}`, name: "New CPU", category: "AMD", badge: "", tiers: [] }])} className="flex items-center gap-2 text-sm px-4 py-2 border border-white/10 rounded-xl hover:bg-white/5"><Plus className="w-4 h-4" /> Add Processor</button>
    </div>
  );
}

function VpsTab({ content, onSave, saving, setContent }: any) {
  const [cats, setCats] = useState(content.vps_categories || []);
  useEffect(() => setCats(content.vps_categories || []), [content.vps_categories]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">VPS Plans</h2>
        <button onClick={() => onSave("vps_categories", cats)} disabled={saving === "vps_categories"} className="px-4 py-2 bg-brand rounded-xl text-sm font-semibold flex items-center gap-2">
          {saving === "vps_categories" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save VPS
        </button>
      </div>

      {cats.map((cat: any, cIdx: number) => (
        <div key={cIdx} className="premium-card p-5 mb-6">
          <div className="flex gap-3 mb-4">
            <input value={cat.name} onChange={(e) => {
              const c = [...cats]; c[cIdx].name = e.target.value; setCats(c);
            }} className="flex-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm font-bold" />
            <button onClick={() => setCats(cats.filter((_: any, i: number) => i !== cIdx))} className="text-red-400"><Trash2 className="w-4 h-4" /></button>
          </div>
          {cat.tiers.map((tier: any, tIdx: number) => (
            <div key={tIdx} className="grid grid-cols-5 gap-2 mb-2 bg-white/[0.02] p-2 rounded-xl">
              <input value={tier.name} onChange={(e) => {
                const copy = JSON.parse(JSON.stringify(cats)); copy[cIdx].tiers[tIdx].name = e.target.value; setCats(copy);
              }} className="bg-black/20 border border-white/10 rounded px-2 py-1 text-xs" />
              <input type="number" value={tier.price} onChange={(e) => {
                const copy = JSON.parse(JSON.stringify(cats)); copy[cIdx].tiers[tIdx].price = Number(e.target.value); setCats(copy);
              }} className="bg-black/20 border border-white/10 rounded px-2 py-1 text-xs" />
              <input value={tier.ram} onChange={(e) => {
                const copy = JSON.parse(JSON.stringify(cats)); copy[cIdx].tiers[tIdx].ram = e.target.value; setCats(copy);
              }} className="bg-black/20 border border-white/10 rounded px-2 py-1 text-xs" />
              <input value={tier.storage} onChange={(e) => {
                const copy = JSON.parse(JSON.stringify(cats)); copy[cIdx].tiers[tIdx].storage = e.target.value; setCats(copy);
              }} className="bg-black/20 border border-white/10 rounded px-2 py-1 text-xs" />
              <input value={tier.cpu} onChange={(e) => {
                const copy = JSON.parse(JSON.stringify(cats)); copy[cIdx].tiers[tIdx].cpu = e.target.value; setCats(copy);
              }} className="bg-black/20 border border-white/10 rounded px-2 py-1 text-xs" />
            </div>
          ))}
          <button onClick={() => {
            const copy = JSON.parse(JSON.stringify(cats));
            copy[cIdx].tiers.push({ name: "VPS NEW", price: 699, ram: "8GB", storage: "80GB NVMe", cpu: "2 vCPU" });
            setCats(copy);
          }} className="text-xs flex items-center gap-1 mt-2 px-3 py-1.5 border border-white/10 rounded-lg"><Plus className="w-3 h-3" /> Add Tier</button>
        </div>
      ))}
      <button onClick={() => setCats([...cats, { id: `cat-${Date.now()}`, name: "NEW CATEGORY", tiers: [] }])} className="flex items-center gap-2 text-sm px-4 py-2 border border-white/10 rounded-xl"><Plus className="w-4 h-4" /> Add Category</button>
    </div>
  );
}

function DiscordTab({ content, onSave, saving }: any) {
  const [plans, setPlans] = useState(content.discord_bot_plans || []);
  useEffect(() => setPlans(content.discord_bot_plans || []), [content.discord_bot_plans]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Discord Bot Plans</h2>
        <button onClick={() => onSave("discord_bot_plans", plans)} disabled={saving === "discord_bot_plans"} className="px-4 py-2 bg-brand rounded-xl text-sm font-semibold flex items-center gap-2">
          {saving === "discord_bot_plans" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {plans.map((p: any, i: number) => (
          <div key={i} className="premium-card p-4">
            <div className="grid grid-cols-2 gap-2">
              <input value={p.name} onChange={(e) => { const c = [...plans]; c[i].name = e.target.value; setPlans(c); }} className="bg-black/30 border border-white/10 rounded px-2 py-1 text-xs" placeholder="Name" />
              <input type="number" value={p.price} onChange={(e) => { const c = [...plans]; c[i].price = Number(e.target.value); setPlans(c); }} className="bg-black/30 border border-white/10 rounded px-2 py-1 text-xs" />
              <input value={p.ram} onChange={(e) => { const c = [...plans]; c[i].ram = e.target.value; setPlans(c); }} className="bg-black/30 border border-white/10 rounded px-2 py-1 text-xs" />
              <input value={p.storage} onChange={(e) => { const c = [...plans]; c[i].storage = e.target.value; setPlans(c); }} className="bg-black/30 border border-white/10 rounded px-2 py-1 text-xs" />
              <input value={p.cpu} onChange={(e) => { const c = [...plans]; c[i].cpu = e.target.value; setPlans(c); }} className="bg-black/30 border border-white/10 rounded px-2 py-1 text-xs" />
              <input value={p.botSize} onChange={(e) => { const c = [...plans]; c[i].botSize = e.target.value; setPlans(c); }} className="bg-black/30 border border-white/10 rounded px-2 py-1 text-xs" />
            </div>
            <button onClick={() => setPlans(plans.filter((_: any, idx: number) => idx !== i))} className="text-[11px] text-red-400 mt-2 flex items-center gap-1"><Trash2 className="w-3 h-3" /> Remove</button>
          </div>
        ))}
      </div>
      <button onClick={() => setPlans([...plans, { name: "NEW", price: 49, ram: "512MB", storage: "5GB NVMe", cpu: "50%", botSize: "Small Bots" }])} className="mt-4 flex items-center gap-2 text-sm px-4 py-2 border border-white/10 rounded-xl"><Plus className="w-4 h-4" /> Add Plan</button>
    </div>
  );
}

function LocationsTab({ content, onSave, saving }: any) {
  const [locs, setLocs] = useState(content.locations || []);
  useEffect(() => setLocs(content.locations || []), [content.locations]);

  // If not in content, show note
  if (!locs || locs.length === 0) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-6">Locations / Infrastructure</h2>
        <div className="premium-card p-6">
          <p className="text-sm text-gray-400">Locations are currently managed via code (LOCATIONS constant). You can add a custom locations table later. For now, this tab is a placeholder for editing lat/lng via site_settings key `locations`.</p>
        </div>
      </div>
    );
  }

  return <div>Locations editor placeholder: {JSON.stringify(locs).slice(0, 100)}</div>;
}

function BrandingTab({ content, onSave, saving }: any) {
  const [branding, setBranding] = useState(content.site_branding || { name: "CrazyNode", email: "root@crazynode.in", logo: "" });
  useEffect(() => setBranding(content.site_branding || { name: "CrazyNode", email: "root@crazynode.in", logo: "" }), [content.site_branding]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Branding & Contact</h2>
        <button onClick={() => onSave("site_branding", branding)} disabled={saving === "site_branding"} className="px-4 py-2 bg-brand rounded-xl text-sm font-semibold flex items-center gap-2">
          {saving === "site_branding" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save
        </button>
      </div>

      <div className="premium-card p-6 space-y-4">
        <div>
          <label className="text-[11px] text-gray-500 uppercase">Company Name</label>
          <input value={branding.name} onChange={(e) => setBranding({ ...branding, name: e.target.value })} className="w-full mt-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-[11px] text-gray-500 uppercase">Email</label>
          <input value={branding.email} onChange={(e) => setBranding({ ...branding, email: e.target.value })} className="w-full mt-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-[11px] text-gray-500 uppercase">Logo URL</label>
          <input value={branding.logo} onChange={(e) => setBranding({ ...branding, logo: e.target.value })} className="w-full mt-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm" />
        </div>
      </div>
    </div>
  );
}
