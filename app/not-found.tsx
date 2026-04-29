import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="container-narrow py-32 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <p className="eyebrow mb-4">Off the lot</p>
        <h1 className="font-display text-display-lg text-white">Page not found.</h1>
        <p className="text-white/65 mt-4 max-w-md">
          The route you tried isn&apos;t one we run. Head back to the home page or call the desk directly.
        </p>
        <div className="mt-10 flex gap-3">
          <Link href="/" className="btn-primary">Back to home</Link>
          <a href="tel:+16045328828" className="btn-secondary">Call 604-532-8828</a>
        </div>
      </main>
      <Footer />
    </>
  );
}
