import { siteConfig } from "@/lib/site-config";

export default function Process() {
  const { process } = siteConfig;

  return (
    <section id="process" className="border-b border-line bg-ink-900 py-24 sm:py-32">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12">
          <header className="lg:col-span-4">
            <span className="eyebrow">{process.eyebrow}</span>
            <h2 className="display-h2 mt-4">{process.h2}</h2>
          </header>

          <ol className="grid gap-px overflow-hidden rounded-lg border border-line bg-line lg:col-span-8 sm:grid-cols-2">
            {process.steps.map((step) => (
              <li key={step.n} className="bg-ink-900 p-8">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-3xl font-semibold text-accent">{step.n}</span>
                  <span className="h-px flex-1 bg-line" />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">
                  {step.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
