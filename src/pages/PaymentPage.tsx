/**
 * Pay ₦1,000 (Paystack) or skip (right after signup).
 * Also reachable anytime from the dashboard while unpaid.
 */

import { useCallback, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import {
  AlertCircle,
  Check,
  CreditCard,
  Loader2,
  Lock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useUserProfile } from "../hooks/useUserProfile";
import {
  getPaystackPublicKey,
  makePaymentReference,
  markUserPaid,
  PRO_PRICE_KOBO,
  PRO_PRICE_LABEL,
} from "../services/paymentService";

declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: Record<string, unknown>) => { openIframe: () => void };
    };
  }
}

const FEATURES = [
  "Story Books & reading rewards",
  "Study Courses, notes & quizzes",
  "Vocabulary lessons & exams practice",
  "CBT practice tests",
  "Progress, XP, coins & streaks",
];

const listContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.25 },
  },
};

const listItem: Variants = {
  hidden: { opacity: 0, x: -8 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function loadPaystackScript(): Promise<void> {
  if (window.PaystackPop) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(
      'script[src="https://js.paystack.co/v1/inline.js"]'
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      return;
    }
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Could not load Paystack"));
    document.body.appendChild(script);
  });
}

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const profileHook = useUserProfile() as {
    profile?: {
      isPaid?: boolean;
      role?: string;
      fullName?: string;
    } | null;
    refresh?: () => Promise<void>;
  };
  const { profile, refresh } = profileHook;

  const [paying, setPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fromSignup =
    searchParams.get("from") === "signup" ||
    (location.state as { fromSignup?: boolean } | null)?.fromSignup === true;

  const alreadyPaid = Boolean(profile?.isPaid) || profile?.role === "admin";

  const goDashboard = useCallback(() => {
    navigate("/dashboard", { replace: true });
  }, [navigate]);

  async function handlePay() {
    if (!user?.email) {
      setError("You must be logged in with an email to pay.");
      return;
    }

    setError(null);
    setPaying(true);

    try {
      await loadPaystackScript();
      const publicKey = getPaystackPublicKey();
      const reference = makePaymentReference(user.uid);

      if (!window.PaystackPop) {
        throw new Error("Paystack failed to load. Check your network.");
      }

      const handler = window.PaystackPop.setup({
        key: publicKey,
        email: user.email,
        amount: PRO_PRICE_KOBO,
        currency: "NGN",
        ref: reference,
        metadata: {
          userId: user.uid,
          fullName: profile?.fullName ?? user.displayName ?? "",
          custom_fields: [
            {
              display_name: "User ID",
              variable_name: "user_id",
              value: user.uid,
            },
          ],
        },
        callback: (response: { reference: string }) => {
          markUserPaid(user.uid, { reference: response.reference })
            .then(async () => {
              try {
                if (typeof refresh === "function") {
                  await refresh();
                }
              } catch {
                // ignore refresh errors
              }
              // Hard reload so PaidGuard always sees isPaid: true
              window.location.href = "/dashboard";
            })
            .catch((err) => {
              console.error(err);
              setError(
                "Payment succeeded but we could not unlock your account. Contact support with reference: " +
                  response.reference
              );
              setPaying(false);
            });
        },
        onClose: () => {
          setPaying(false);
        },
      });

      handler.openIframe();
    } catch (err) {
      setError(String((err as Error).message));
      setPaying(false);
    }
  }

  if (alreadyPaid) {
    return (
      <div className="mx-auto max-w-lg py-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6 text-center"
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-4 ring-emerald-50/60"
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/20" />
            <Check size={30} strokeWidth={2.5} className="relative" />
          </motion.div>
          <h1 className="text-2xl font-bold text-slate-900">You are unlocked</h1>
          <p className="text-sm text-slate-500">
            Full Future X features are already available on your account.
          </p>
          <button
            type="button"
            onClick={goDashboard}
            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgba(37,99,235,0.6)] transition-all hover:bg-blue-700 hover:shadow-[0_10px_24px_-8px_rgba(37,99,235,0.7)] active:scale-[0.98]"
          >
            Go to Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg space-y-6 py-6 sm:py-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_50px_-24px_rgba(15,23,42,0.25)]"
      >
        {/* Hero */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 px-6 py-8 text-white">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-20 left-1/4 h-48 w-48 rounded-full bg-cyan-400/10 blur-[90px]" />
          <div className="fx-noise pointer-events-none absolute inset-0" />

          <div className="relative">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur-sm">
              <Sparkles size={14} />
              One-time access
            </div>
            <h1 className="text-2xl font-black sm:text-3xl">Unlock Future X</h1>
            <p className="mt-2 text-sm text-blue-100">
              Pay once — get full learning features on this account.
            </p>
            <p className="mt-6 flex items-baseline gap-2 text-4xl font-black tracking-tight">
              {PRO_PRICE_LABEL}
              <span className="text-base font-semibold text-blue-100">NGN</span>
            </p>
          </div>
        </div>

        <div className="space-y-5 px-6 py-6">
          <motion.ul
            variants={listContainer}
            initial="hidden"
            animate="show"
            className="space-y-2.5"
          >
            {FEATURES.map((f) => (
              <motion.li
                key={f}
                variants={listItem}
                className="flex items-start gap-2.5 text-sm text-slate-700"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <Check size={12} strokeWidth={3} />
                </span>
                {f}
              </motion.li>
            ))}
          </motion.ul>

          <p className="flex items-center gap-2 text-xs text-slate-500">
            <Lock size={14} />
            Free for now: Dashboard home &amp; Dictionary only
          </p>

          {error && (
            <div className="flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <motion.button
            type="button"
            onClick={handlePay}
            disabled={paying || !user}
            whileHover={paying || !user ? undefined : { y: -1 }}
            whileTap={paying || !user ? undefined : { scale: 0.98 }}
            className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-b from-blue-500 to-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_24px_-10px_rgba(37,99,235,0.7)] transition hover:from-blue-500 hover:to-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {paying ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Opening Paystack…
              </>
            ) : (
              <>
                <CreditCard size={18} />
                Pay {PRO_PRICE_LABEL} with Paystack
              </>
            )}
          </motion.button>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
            <ShieldCheck size={13} className="text-emerald-500" />
            Secured by Paystack — your card details never touch our servers
          </div>

          {fromSignup ? (
            <button
              type="button"
              onClick={goDashboard}
              className="w-full rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
            >
              Skip for now
            </button>
          ) : (
            <button
              type="button"
              onClick={goDashboard}
              className="w-full text-center text-sm font-medium text-slate-500 transition-colors hover:text-slate-700 hover:underline"
            >
              Back to Dashboard
            </button>
          )}

          <p className="text-center text-[11px] leading-relaxed text-slate-400">
            You can pay later from the dashboard while your account stays in
            free mode.
          </p>
        </div>
      </motion.div>
    </div>
  );
}