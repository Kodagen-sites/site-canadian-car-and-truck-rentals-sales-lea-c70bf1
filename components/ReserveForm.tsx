"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

type Step = 1 | 2 | 3;

export default function ReserveForm() {
  const [step, setStep] = useState<Step>(1);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="card-industrial p-8 text-center">
        <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">Reservation submitted</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
          The desk has it.
        </h3>
        <p className="mt-3 text-sm text-white/65">
          We’ll call to confirm pickup window, vehicle, and pricing during open hours. For same-day
          requests, calling the yard directly is faster.
        </p>
        <a href={`tel:${siteConfig.contact.phone}`} className="btn-secondary mt-6">
          {siteConfig.contact.phoneDisplay}
        </a>
      </div>
    );
  }

  return (
    <form
      className="card-industrial p-6 sm:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      {/* Progress strip */}
      <div className="mb-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-eyebrow">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className={`flex h-7 flex-1 items-center justify-center rounded-sm border ${
              n === step
                ? "border-accent bg-accent/10 text-accent"
                : n < step
                ? "border-line bg-ink-800 text-white/60"
                : "border-line/60 bg-ink-900 text-white/35"
            }`}
          >
            Step {n}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
              Step 1 · Vehicle
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              What are you renting?
            </h3>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { val: "car", label: "Car or SUV" },
              { val: "van", label: "Van" },
              { val: "moving-truck", label: "Moving truck" },
              { val: "trailer", label: "Trailer" },
            ].map((opt) => (
              <label
                key={opt.val}
                className="flex cursor-pointer items-center gap-3 rounded-md border border-line bg-ink-900 p-4 text-sm text-white/85 has-[:checked]:border-accent has-[:checked]:bg-accent/5"
              >
                <input type="radio" name="class" value={opt.val} className="accent-accent" defaultChecked={opt.val === "car"} />
                {opt.label}
              </label>
            ))}
          </div>

          <button type="button" onClick={() => setStep(2)} className="btn-primary">
            Continue →
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
              Step 2 · Dates
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              Pickup & return
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Pickup date" name="pickup_date" type="date" required />
            <Field label="Return date" name="return_date" type="date" required />
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => setStep(1)} className="btn-secondary">
              ← Back
            </button>
            <button type="button" onClick={() => setStep(3)} className="btn-primary">
              Continue →
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
              Step 3 · Contact
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              Where do we confirm?
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" name="name" required />
            <Field label="Phone" name="phone" type="tel" required />
            <Field label="Email" name="email" type="email" required className="sm:col-span-2" />
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium uppercase tracking-eyebrow text-white/60">
                Notes
              </label>
              <textarea
                name="notes"
                rows={3}
                placeholder="Same-day pickup? Specific vehicle? Trailer hitch class?"
                className="mt-1.5 w-full rounded-md border border-line bg-ink-900 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-accent"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => setStep(2)} className="btn-secondary">
              ← Back
            </button>
            <button type="submit" className="btn-primary">
              Submit reservation request
            </button>
          </div>

          <p className="text-xs text-white/45">
            Form is a stub — wire up to email/Resend or a booking system before launch. Stock and
            pricing are confirmed by the desk after submission.
          </p>
        </div>
      )}
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
