/**
 * Show on dashboard (and free pages) when the user has not paid.
 * Entire card links to /dashboard/payment.
 */

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Crown, ArrowRight, Check } from "lucide-react";
import { useUserProfile } from "../../hooks/useUserProfile";
import { PRO_PRICE_LABEL } from "../../services/paymentService";

const MotionLink = motion(Link);

const FEATURES = ["Stories", "Courses", "Vocabulary", "CBT"];

export default function UpgradeBanner() {
  const { profile, loading } = useUserProfile();

  if (loading) return null;
  if (!profile) return null;
  if (profile.isPaid || profile.role === "admin") return null;

  return (
    <MotionLink
      to="/dashboard/payment"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.99 }}
      aria-label={`Unlock full Future X for ${PRO_PRICE_LABEL}`}
      className="group relative block overflow-hidden rounded-2xl p-[1px] shadow-[0_10px_30px_-14px_rgba(217,119,6,0.45)] transition-shadow hover:shadow-[0_16px_38px_-14px_rgba(217,119,6,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
    >
      {/* Gradient border */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-300 via-orange-300 to-amber-300 opacity-70 transition-opacity group-hover:opacity-100" />

      <div className="relative overflow-hidden rounded-[15px] bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 p-4 sm:p-5">
        {/* Hover shine sweep */}
        <div className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 transition-all duration-700 group-hover:left-[110%] group-hover:opacity-100" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-[0_6px_16px_-4px_rgba(217,119,6,0.6)] transition-transform group-hover:scale-105">
              <Crown size={19} strokeWidth={2.25} />
              <span className="absolute inset-0 rounded-xl ring-1 ring-white/40" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-bold text-slate-900">Unlock full Future X</p>
                <span className="rounded-full bg-amber-900/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-50">
                  {PRO_PRICE_LABEL} once
                </span>
              </div>

              <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                {FEATURES.map((f) => (
                  <span
                    key={f}
                    className="inline-flex items-center gap-1 text-xs font-medium text-slate-600"
                  >
                    <Check size={12} className="text-amber-600" strokeWidth={3} />
                    {f}
                  </span>
                ))}
              </div>
              <p className="mt-1.5 text-xs text-slate-500">
                Dictionary stays free, always.
              </p>
            </div>
          </div>

          {/* Visual affordance only — the whole card is the click target */}
          <div className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgba(15,23,42,0.5)] transition-all group-hover:bg-slate-800 group-hover:shadow-[0_10px_24px_-8px_rgba(15,23,42,0.6)]">
            Pay {PRO_PRICE_LABEL}
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </div>
        </div>
      </div>
    </MotionLink>
  );
}