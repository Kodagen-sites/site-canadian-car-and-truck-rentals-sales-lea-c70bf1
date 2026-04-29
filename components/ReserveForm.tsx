"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { Loader2, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";

const VEHICLE_CLASSES = siteConfig.rentalClasses.flatMap((cat) =>
  cat.items.map((label) => ({ category: cat.category, label }))
);

type Status = "idle" | "submitting" | "ok" | "error";

export default function ReserveForm() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    vehicle_class: "",
    pickup_date: "",
    return_date: "",
    pickup_location: "Langley — 20026 Fraser Hwy",
    driver_name: "",
    driver_email: "",
    driver_phone: "",
    notes: "",
  });

  const update = (field: keyof typeof form, value: string) => setForm({ ...form, [field]: value });

  async function submit() {
    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Reservation failed");
      setStatus("ok");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reservation failed");
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="brushed-card p-10 text-center">
        <CheckCircle2 className="mx-auto text-amber" size={36} />
        <h3 className="font-display text-3xl text-white mt-4">Reservation request received.</h3>
        <p className="text-white/70 mt-4 max-w-md mx-auto">
          A desk operator will confirm availability against the actual vehicle within one business day. For same-day pickup, call us at
          <a className="text-amber hover:text-amber-glow ml-1.5" href="tel:+16045328828">604-532-8828</a>.
        </p>
        <p className="text-white/50 text-sm mt-6 max-w-md mx-auto">{siteConfig.reserve.fine_print}</p>
      </div>
    );
  }

  return (
    <div className="brushed-card p-8 md:p-10">
      <ol className="flex items-center gap-2 mb-8 text-[12px] font-mono uppercase tracking-eyebrow">
        {siteConfig.reserve.step_labels.map((label, i) => {
          const n = i + 1;
          const active = n === step;
          const done = n < step;
          return (
            <li key={label} className="flex items-center gap-2">
              <span
                className={`inline-flex h-7 w-7 items-center justify-center rounded-full border ${
                  active ? "border-amber text-amber" : done ? "border-amber/60 bg-amber/15 text-amber" : "border-white/20 text-white/40"
                }`}
              >
                {n}
              </span>
              <span className={active ? "text-white" : done ? "text-amber/80" : "text-white/40"}>{label}</span>
              {n < siteConfig.reserve.step_labels.length && <span className="text-white/15">/</span>}
            </li>
          );
        })}
      </ol>

      {step === 1 && (
        <div className="space-y-5">
          <h2 className="font-display text-2xl text-white">Vehicle class</h2>
          <select
            value={form.vehicle_class}
            onChange={(e) => update("vehicle_class", e.target.value)}
            required
            className="w-full bg-graphite/80 border border-white/15 rounded-md px-4 py-3 text-white focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber/50"
          >
            <option value="">Select a class…</option>
            {siteConfig.rentalClasses.map((cat) => (
              <optgroup key={cat.category} label={cat.category}>
                {cat.items.map((it) => (
                  <option key={it} value={`${cat.category} · ${it}`}>{it}</option>
                ))}
              </optgroup>
            ))}
          </select>
          <p className="text-white/55 text-sm">
            Confirmation depends on real-time availability of the actual vehicle on the lot. The desk operator will hold the unit before deposit is taken.
          </p>
          <div className="flex justify-end pt-4">
            <button
              type="button"
              disabled={!form.vehicle_class}
              onClick={() => setStep(2)}
              className="btn-primary disabled:opacity-50"
            >
              Continue <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          <h2 className="font-display text-2xl text-white">Dates &amp; pickup</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <DateField label="Pickup date" value={form.pickup_date} onChange={(v) => update("pickup_date", v)} />
            <DateField label="Return date" value={form.return_date} onChange={(v) => update("return_date", v)} />
          </div>
          <TextField label="Pickup location" value={form.pickup_location} onChange={(v) => update("pickup_location", v)} />
          <div className="flex justify-between pt-4">
            <button type="button" onClick={() => setStep(1)} className="btn-secondary">
              <ArrowLeft size={14} /> Back
            </button>
            <button
              type="button"
              disabled={!form.pickup_date || !form.return_date}
              onClick={() => setStep(3)}
              className="btn-primary disabled:opacity-50"
            >
              Continue <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-5">
          <h2 className="font-display text-2xl text-white">Driver details</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <TextField label="Full name" value={form.driver_name} onChange={(v) => update("driver_name", v)} required />
            <TextField label="Phone" type="tel" value={form.driver_phone} onChange={(v) => update("driver_phone", v)} required />
          </div>
          <TextField label="Email" type="email" value={form.driver_email} onChange={(v) => update("driver_email", v)} required />
          <div>
            <label className="block text-[12px] uppercase tracking-eyebrow text-white/50 mb-1.5">
              Notes <span className="text-white/30 normal-case tracking-normal">(optional)</span>
            </label>
            <textarea
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              rows={3}
              className="w-full bg-graphite/80 border border-white/15 rounded-md px-4 py-3 text-white placeholder:text-white/30 focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber/50"
              placeholder="Trailer hitch needed, additional drivers, transmission preference, etc."
            />
          </div>
          {error && (
            <p className="text-[13px] text-red-300 bg-red-900/20 border border-red-500/30 rounded-md px-3 py-2">
              {error}
            </p>
          )}
          <div className="flex justify-between pt-4">
            <button type="button" onClick={() => setStep(2)} className="btn-secondary">
              <ArrowLeft size={14} /> Back
            </button>
            <button
              type="button"
              disabled={status === "submitting" || !form.driver_name || !form.driver_email || !form.driver_phone}
              onClick={submit}
              className="btn-primary disabled:opacity-50"
            >
              {status === "submitting" ? <Loader2 className="animate-spin" size={14} /> : null}
              {status === "submitting" ? "Sending…" : siteConfig.reserve.submit_label}
            </button>
          </div>
          <p className="text-white/40 text-xs leading-relaxed pt-2">{siteConfig.reserve.fine_print}</p>
        </div>
      )}
    </div>
  );
}

function TextField(props: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-[12px] uppercase tracking-eyebrow text-white/50 mb-1.5">
        {props.label}{props.required && <span className="text-amber ml-1">*</span>}
      </label>
      <input
        type={props.type ?? "text"}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        required={props.required}
        className="w-full bg-graphite/80 border border-white/15 rounded-md px-4 py-3 text-white placeholder:text-white/30 focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber/50"
      />
    </div>
  );
}

function DateField(props: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-[12px] uppercase tracking-eyebrow text-white/50 mb-1.5">{props.label}<span className="text-amber ml-1">*</span></label>
      <input
        type="date"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        required
        className="w-full bg-graphite/80 border border-white/15 rounded-md px-4 py-3 text-white focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber/50"
      />
    </div>
  );
}
