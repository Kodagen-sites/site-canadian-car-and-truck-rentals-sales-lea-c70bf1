"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="card-industrial p-8 text-center">
        <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">Sent</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
          Thanks — we’ll get back to you.
        </h3>
        <p className="mt-3 text-sm text-white/65">
          The Langley desk receives messages during open hours. For same-day questions, calling the
          yard is faster.
        </p>
      </div>
    );
  }

  return (
    <form
      className="card-industrial p-6 sm:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
        Send a message
      </p>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
        Reach the desk in Langley
      </h3>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Phone" name="phone" type="tel" required />
        <Field label="Email" name="email" type="email" required className="sm:col-span-2" />
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium uppercase tracking-eyebrow text-white/60">
            Topic
          </label>
          <select
            name="topic"
            className="mt-1.5 w-full rounded-md border border-line bg-ink-900 px-3 py-2.5 text-sm text-white outline-none focus:border-accent"
            defaultValue="rental"
          >
            <option value="rental">Rental</option>
            <option value="purchase">Used vehicle purchase</option>
            <option value="financing">Financing</option>
            <option value="leasing">Leasing</option>
            <option value="other">Something else</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium uppercase tracking-eyebrow text-white/60">
            Message
          </label>
          <textarea
            name="message"
            rows={4}
            required
            className="mt-1.5 w-full rounded-md border border-line bg-ink-900 px-3 py-2.5 text-sm text-white outline-none focus:border-accent"
          />
        </div>
      </div>

      <button type="submit" className="btn-primary mt-6 w-full sm:w-auto">
        Send message
      </button>
      <p className="mt-3 text-xs text-white/45">
        Form is a stub — wire up to email/Resend or a CRM endpoint before launch.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-xs font-medium uppercase tracking-eyebrow text-white/60">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-1.5 w-full rounded-md border border-line bg-ink-900 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-accent"
      />
    </div>
  );
}
