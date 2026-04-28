import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center bg-ink-900 py-20">
      <div className="container-page text-center">
        <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">404</p>
        <h1 className="display-hero mt-4">Wrong turn.</h1>
        <p className="body-md mt-5 mx-auto max-w-md">
          That page isn’t on the lot. Try the home page, browse the services, or call the yard.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            Back home
          </Link>
          <Link href="/services" className="btn-secondary">
            See services
          </Link>
        </div>
      </div>
    </section>
  );
}
