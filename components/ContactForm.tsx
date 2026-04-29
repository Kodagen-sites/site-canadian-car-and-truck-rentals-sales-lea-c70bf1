"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { Loader2, CheckCircle2 } from "lucide-react";

type Status = "idle" | "submitting" | "ok" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Submission failed");
      setStatus("ok");
      e.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="brushed-card p-8 text-center">
        <CheckCircle2 className="mx-auto text-amber" size={32} />
        <h3 className="font-display text-2xl text-white mt-4">Message received.</h3>
        <p className="text-white/65 mt-3">
          A desk operator will be in touch within one business day. For same-day reservations, call
          <a className="text-amber hover:text-amber-glow ml-1.5" href={`tel:${siteConfig.contact.phone_local.replace(/\D/g, "")}`}>
            {siteConfig.contact.phone_local}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="brushed-card p-8 space-y-5">
      <h2 className="font-display text-2xl text-white">{siteConfig.contact.form.h2}</h2>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Name" name="name" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone" name="phone" type="tel" />
        <SelectField
          label="Topic"
          name="topic"
          options={siteConfig.contact.form.topic_options}
          required
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-[12px] uppercase tracking-eyebrow text-white/50 mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full bg-graphite/80 border border-white/15 rounded-md px-4 py-3 text-white placeholder:text-white/30 focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber/50"
          placeholder="What you need, dates, and any specifics on the vehicle class…"
        />
      </div>

      {error && (
        <p className="text-[13px] text-red-300 bg-red-900/20 border border-red-500/30 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary w-full justify-center disabled:opacity-60"
      >
        {status === "submitting" ? <Loader2 className="animate-spin" size={16} /> : null}
        {status === "submitting" ? "Sending…" : siteConfig.contact.form.submit_label}
      </button>
    </form>
  );
}

function Field(props: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={props.name} className="block text-[12px] uppercase tracking-eyebrow text-white/50 mb-1.5">
        {props.label}
        {props.required && <span className="text-amber ml-1">*</span>}
      </label>
      <input
        id={props.name}
        name={props.name}
        type={props.type ?? "text"}
        required={props.required}
        className="w-full bg-graphite/80 border border-white/15 rounded-md px-4 py-3 text-white placeholder:text-white/30 focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber/50"
      />
    </div>
  );
}

function SelectField(props: { label: string; name: string; options: string[]; required?: boolean }) {
  return (
    <div>
      <label htmlFor={props.name} className="block text-[12px] uppercase tracking-eyebrow text-white/50 mb-1.5">
        {props.label}
        {props.required && <span className="text-amber ml-1">*</span>}
      </label>
      <select
        id={props.name}
        name={props.name}
        required={props.required}
        defaultValue=""
        className="w-full bg-graphite/80 border border-white/15 rounded-md px-4 py-3 text-white focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber/50"
      >
        <option value="" disabled>Select…</option>
        {props.options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
