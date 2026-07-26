"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Server, ShoppingCart, User, LogOut, Package, CreditCard, Headphones, Loader2 } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/components/CartContext";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; name?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const { items, count, total } = useCart();

  useEffect(() => {
    fetch("/api/auth/me")
      .then(async (r) => {
        if (!r.ok) {
          router.push("/login");
          return null;
        }
        return r.json();
      })
      .then((d) => {
        if (d?.authenticated) {
          setUser({ email: d.email, name: d.name });
        }
        setLoading(false);
      })
      .catch(() => {
        router.push("/login");
      });
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg">
        <Loader2 className="w-8 h-8 text-brand animate-spin" />
      </div>
    );
  }

  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-3xl font-bold text-white">Welcome back, {user?.name || user?.email?.split("@")[0]}!</h1>
          <p className="text-gray-500 mt-2">{user?.email}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="premium-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-brand" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Cart Items</p>
                <p className="text-xl font-bold text-white">{count}</p>
              </div>
            </div>
            <p className="text-xs text-gray-600">Total value: ₹{total}</p>
          </div>
          <div className="premium-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Server className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Active Services</p>
                <p className="text-xl font-bold text-white">0</p>
              </div>
            </div>
            <p className="text-xs text-gray-600">No active servers yet</p>
          </div>
          <div className="premium-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Account Status</p>
                <p className="text-sm font-bold text-emerald-400">Active</p>
              </div>
            </div>
            <p className="text-xs text-gray-600">Verified account</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 premium-card p-6">
            <h3 className="font-bold text-white mb-4">Recent Orders</h3>
            {items.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                <p className="text-sm text-gray-500">No orders yet. Start by adding a plan to cart.</p>
                <Link href="/minecraft" className="inline-block mt-4 px-5 py-2 bg-brand text-white rounded-xl text-sm font-semibold hover:bg-brand-dark">
                  Browse Plans
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div>
                      <p className="text-sm font-semibold text-white">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.processor} • {item.ram}</p>
                    </div>
                    <p className="text-sm font-bold text-price">₹{item.price} x {item.quantity}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="premium-card p-6">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <User className="w-4 h-4" /> Account
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Email</span><span className="text-white">{user?.email}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Name</span><span className="text-white">{user?.name || "—"}</span></div>
              </div>
              <button onClick={handleLogout} className="mt-6 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-sm text-gray-400 hover:text-white">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>

            <div className="premium-card p-6">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Headphones className="w-4 h-4" /> Need Help?
              </h3>
              <p className="text-xs text-gray-500 mb-4">Our support team is available 24/7 to assist you.</p>
              <Link href="/contact" className="block text-center py-2.5 rounded-xl bg-brand text-white text-sm font-semibold hover:bg-brand-dark">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
