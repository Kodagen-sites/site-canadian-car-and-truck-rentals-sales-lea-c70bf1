import { siteConfig } from "@/lib/site-config";

const ICONS: Record<string, string> = {
  yard: "▦",
  desk: "▤",
  local: "◉",
  ready: "▶",
};

export default function Benefits() {
  const { benefits } = siteConfig;

  return (
    <section className="border-b border-line bg-ink-800/40 py-24 sm:py-32">
      <div className="container-page">
        <div className="max-w-3xl">
          <span className="eyebrow">{benefits.eyebrow}</span>
          <h2 className="display-h2 mt-4">{benefits.h2}</h2>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {benefits.items.map((item) => (
            <div
              key={item.label}
              className="flex flex-col gap-4 bg-ink-900 p-8 transition-colors hover:bg-ink-800"
            >
              <span className="grid h-12 w-12 place-items-center rounded border border-line/80 bg-ink-800 font-mono text-xl text-accent">
                {ICONS[item.icon] ?? "◇"}
              </span>
              <h3 className="display-h3">{item.label}</h3>
              <p className="text-sm leading-relaxed text-white/65">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
