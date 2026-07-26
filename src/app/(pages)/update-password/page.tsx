"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setReady(!!data.session));
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || session) setReady(true);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    if (password.length < 6) return setError("Password must be at least 6 characters");
    if (password !== confirm) return setError("Passwords do not match");
    if (!supabase) return setError("Supabase is not configured");

    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (updateError) return setError(updateError.message);
    setSuccess(true);
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-32 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="premium-card p-8 w-full max-w-md">
        {success ? (
          <div className="text-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white">Password Updated</h1>
            <p className="text-sm text-gray-500 mt-2">You can now sign in with your new password.</p>
            <Link href="/login" className="inline-block mt-6 px-6 py-3 rounded-xl bg-brand text-white font-semibold">Go to Login</Link>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-white text-center">Set New Password</h1>
            <p className="text-sm text-gray-500 text-center mt-2 mb-8">Open this page from your Supabase recovery email.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password" className="w-full pl-11 pr-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-sm text-white outline-none focus:border-brand/50" />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Confirm new password" className="w-full pl-11 pr-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-sm text-white outline-none focus:border-brand/50" />
              </div>
              {error && <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>}
              {!ready && <p className="text-xs text-amber-300">Waiting for a valid recovery session…</p>}
              <button disabled={loading || !ready} className="w-full py-3 bg-brand disabled:opacity-40 text-white rounded-xl font-semibold flex items-center justify-center gap-2">
                {loading && <Loader2 className="w-4 h-4 animate-spin" />} Update Password
              </button>
            </form>
          </>
        )}
      </motion.div>
    </section>
  );
}
