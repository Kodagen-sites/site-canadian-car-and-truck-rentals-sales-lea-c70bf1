import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import LoginForm from "./LoginForm";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ pending?: string; from?: string }>;

export default async function AdminLogin({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const provisioned = isSupabaseConfigured();
  const pending = sp.pending === "1" || !provisioned;

  return (
    <main className="min-h-screen flex items-center justify-center bg-graphite p-6">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center gap-3 justify-center mb-10">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-amber text-graphite font-display font-semibold tracking-tight">
            {siteConfig.brand.wordmark}
          </span>
          <span className="font-display text-base text-white">
            Canadian Car &amp; Truck — Admin
          </span>
        </Link>

        <div className="brushed-card p-8">
          {pending ? (
            <div className="space-y-4">
              <p className="eyebrow">Admin · Pending</p>
              <h1 className="font-display text-2xl text-white">Provisioning is deferred.</h1>
              <p className="text-white/70 text-[15px] leading-relaxed">
                Supabase project provisioning is pending due to a free-tier project cap on the org.
                See <code className="font-mono text-amber">provision/PROVISION-LATER.md</code> for the
                runbook. Once provisioning completes, this page becomes a working sign-in.
              </p>
              <div className="pt-4">
                <Link href="/" className="btn-secondary w-full justify-center">Back to site</Link>
              </div>
            </div>
          ) : (
            <LoginForm from={sp.from} />
          )}
        </div>
      </div>
    </main>
  );
}
