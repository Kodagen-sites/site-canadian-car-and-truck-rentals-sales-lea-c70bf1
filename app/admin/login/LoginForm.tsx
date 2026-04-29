"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";

export default function LoginForm({ from }: { from?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError(authError.message);
      setBusy(false);
      return;
    }
    router.push(from ?? "/admin");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <p className="eyebrow">Admin</p>
        <h1 className="font-display text-2xl text-white mt-2">Sign in</h1>
        <p className="text-white/55 text-sm mt-1">Owner and staff access only.</p>
      </div>

      <div>
        <label htmlFor="email" className="block text-[12px] uppercase tracking-eyebrow text-white/50 mb-1.5">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-graphite/80 border border-white/15 rounded-md px-4 py-3 text-white focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber/50"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-[12px] uppercase tracking-eyebrow text-white/50 mb-1.5">Password</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full bg-graphite/80 border border-white/15 rounded-md px-4 py-3 text-white focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber/50"
        />
      </div>

      {error && (
        <p className="text-[13px] text-red-300 bg-red-900/20 border border-red-500/30 rounded-md px-3 py-2">{error}</p>
      )}

      <button type="submit" disabled={busy} className="btn-primary w-full justify-center disabled:opacity-60">
        {busy ? <Loader2 className="animate-spin" size={14} /> : null}
        {busy ? "Signing in…" : "Sign In"}
      </button>
    </form>
  );
}
