import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 py-24 text-center text-white">

      {/* Ambient blobs to match the hero's language */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-indigo-400/20 blur-[110px]" />
      <div className="fx-noise pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-2xl px-6">
        <h2 className="text-4xl font-black tracking-tight md:text-5xl">
          Ready to Start Learning?
        </h2>

        <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-blue-100">
          Join Future X and unlock the future of education.
        </p>

        <Link
          to="/signup"
          className="group mt-9 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 font-bold text-blue-700 shadow-[0_16px_36px_-12px_rgba(0,0,0,0.35)] transition-all duration-300 hover:shadow-[0_20px_44px_-12px_rgba(0,0,0,0.4)] active:scale-[0.98]"
        >
          Get Started
          <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}