import { motion, type Variants } from "framer-motion";
import { Trophy, Zap, Coins as CoinsIcon } from "lucide-react";
import { useUserProfile } from "../../hooks/useUserProfile";
import UpgradeBanner from "../payment/UpgradeBanner";

const statContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
};

const statItem: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 5) return "Burning the midnight oil";
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  if (hour < 21) return "Good evening";
  return "Working late";
}

export default function WelcomeCard() {
  const { profile, loading } = useUserProfile();

  const firstName = profile?.fullName?.split(" ")[0] || "there";
  const initial = firstName.charAt(0).toUpperCase();
  const greeting = getGreeting();

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 p-8 text-white shadow-[0_1px_0_0_rgba(255,255,255,0.14)_inset,0_24px_50px_-18px_rgba(37,99,235,0.55)] md:p-10"
      >
        {/* Ambient light + noise */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-28 left-1/4 h-64 w-64 rounded-full bg-cyan-400/10 blur-[110px]" />
        <div className="pointer-events-none absolute right-1/4 top-0 h-40 w-40 rounded-full bg-violet-400/10 blur-[90px]" />
        <div className="fx-noise pointer-events-none absolute inset-0" />

        {/* One-time shimmer sweep on load */}
        <motion.div
          aria-hidden
          initial={{ x: "-120%" }}
          animate={{ x: "220%" }}
          transition={{ duration: 1.3, delay: 0.15, ease: "easeInOut" }}
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent"
        />

        <div className="relative">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-lg font-bold backdrop-blur-sm shadow-inner">
              {loading ? "" : initial}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-200">
                {greeting}
              </p>
              <h1 className="mt-0.5 flex items-center text-2xl font-bold leading-tight tracking-tight md:text-3xl">
                {loading ? "Loading..." : firstName}
                {!loading && (
                  <motion.span
                    className="ml-1.5 inline-block origin-[70%_70%]"
                    animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                    transition={{ duration: 1.4, delay: 0.6, ease: "easeInOut" }}
                  >
                    👋
                  </motion.span>
                )}
              </h1>
            </div>
          </div>

          <p className="mt-4 max-w-md leading-relaxed text-blue-100/90">
            Continue where you left off, or explore something new in the Future
            X ecosystem.
          </p>

          {!loading && profile && (
            <motion.div
              variants={statContainer}
              initial="hidden"
              animate="show"
              className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-6"
            >
              <motion.div
                variants={statItem}
                whileHover={{ y: -2 }}
                className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 backdrop-blur-sm transition-colors hover:bg-white/[0.14]"
              >
                <Trophy size={16} className="text-amber-300" strokeWidth={2.5} />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-200">
                    Level
                  </p>
                  <h3 className="mt-0.5 text-2xl font-bold tracking-tight">
                    {profile.level}
                  </h3>
                </div>
              </motion.div>

              <motion.div
                variants={statItem}
                whileHover={{ y: -2 }}
                className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 backdrop-blur-sm transition-colors hover:bg-white/[0.14]"
              >
                <Zap size={16} className="text-cyan-300" strokeWidth={2.5} />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-200">
                    XP
                  </p>
                  <h3 className="mt-0.5 text-2xl font-bold tracking-tight">
                    {profile.xp}
                  </h3>
                </div>
              </motion.div>

              <motion.div
                variants={statItem}
                whileHover={{ y: -2 }}
                className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 backdrop-blur-sm transition-colors hover:bg-white/[0.14]"
              >
                <CoinsIcon size={16} className="text-yellow-300" strokeWidth={2.5} />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-200">
                    Coins
                  </p>
                  <h3 className="mt-0.5 text-2xl font-bold tracking-tight">
                    {profile.coins}
                  </h3>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Pay CTA for unpaid users — sits under the welcome card */}
      <div className="mt-4">
        <UpgradeBanner />
      </div>
    </>
  );
}