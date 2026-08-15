import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import AppPreview from "./AppPreview";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">

      {/* Ambient glow */}
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-[28rem] w-[28rem] rounded-full bg-cyan-500/20 blur-[140px]" />

      {/* Faint structural grid, fading toward the edges */}
      <div className="fx-grid-fade pointer-events-none absolute inset-0" />

      {/* Fine grain for depth */}
      <div className="fx-noise pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid min-h-[90vh] max-w-7xl items-center gap-20 px-6 py-16 lg:grid-cols-2">

        <div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-200 shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset]"
          >
            <Sparkles size={14} className="text-blue-300" />
            Africa's Next Learning Ecosystem
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-5xl font-black leading-[1.05] tracking-tight md:text-7xl"
          >
            Build the
            <br />
            <span className="bg-gradient-to-r from-white via-white to-blue-300 bg-clip-text text-transparent">
              Future of
            </span>
            <br />
            Learning.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 max-w-xl text-lg leading-8 text-slate-300"
          >
            FutureX-Hub Horixon is building Africa's next educational ecosystem,
            bringing together vocabulary building, children's storybooks,
            CBT practice, science learning, educational games and school
            management into one intelligent learning platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              to="/signup"
              className="group flex items-center gap-2 rounded-2xl bg-gradient-to-b from-blue-500 to-blue-600 px-7 py-4 text-lg font-semibold shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset,0_16px_36px_-12px_rgba(37,99,235,0.65)] transition-all duration-300 hover:from-blue-500 hover:to-blue-700 hover:shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset,0_20px_44px_-12px_rgba(37,99,235,0.75)] active:scale-[0.98]"
            >
              Get Started
              <ArrowRight
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/login"
              className="rounded-2xl border border-white/15 bg-white/[0.06] px-7 py-4 text-lg font-semibold backdrop-blur transition-all duration-300 hover:border-white/25 hover:bg-white/[0.1]"
            >
              Login
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-14 flex flex-wrap gap-10 border-t border-white/[0.08] pt-8"
          >
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-blue-400">
                6+
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Learning Apps
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold tracking-tight text-blue-400">
                1000+
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Learning Activities
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold tracking-tight text-blue-400">
                ∞
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Possibilities
              </p>
            </div>
          </motion.div>

        </div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="hidden lg:block"
        >
          <AppPreview />
        </motion.div>

      </div>

    </section>
  );
}
