import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-white/[0.08] bg-slate-950/75 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link to="/" className="group flex items-center gap-3">
          <img
            src="/brand/logo.jpeg"
            alt="Future X"
            className="h-11 w-11 rounded-xl object-cover ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-105"
          />

          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">
              Future X
            </h1>

            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
              Learn · Play · Grow
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-2">

          <Link
            to="/login"
            className="rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-300 transition-all duration-200 hover:bg-white/[0.06] hover:text-white"
          >
            Log in
          </Link>

          <Link
            to="/signup"
            className="ml-1 rounded-xl bg-gradient-to-b from-blue-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_1px_0_0_rgba(255,255,255,0.2)_inset,0_8px_20px_-6px_rgba(37,99,235,0.6)] transition-all duration-200 hover:from-blue-500 hover:to-blue-700 hover:shadow-[0_1px_0_0_rgba(255,255,255,0.2)_inset,0_12px_28px_-6px_rgba(37,99,235,0.7)] active:scale-[0.98]"
          >
            Get Started
          </Link>

        </nav>

      </div>
    </motion.header>
  );
}