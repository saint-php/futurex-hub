import { Link } from "react-router-dom";
import {  Star, Trophy, Coins, Flame } from "lucide-react";
import { useUserProfile } from "../../hooks/useUserProfile";
import { useAuth } from "../../context/AuthContext";

export default function WelcomeCard() {
  const { user } = useAuth();
  const { profile } = useUserProfile();

  const name =
    profile?.fullName?.split(" ")[0] ||
    user?.displayName?.split(" ")[0] ||
    "Learner";

  const stats = [
    {
      label: "Level",
      value: profile?.level ?? 1,
      icon: Star,
      accent: "bg-amber-400/20 text-amber-100",
    },
    {
      label: "XP",
      value: profile?.xp ?? 0,
      icon: Trophy,
      accent: "bg-violet-400/20 text-violet-100",
    },
    {
      label: "Coins",
      value: profile?.coins ?? 0,
      icon: Coins,
      accent: "bg-sky-400/20 text-sky-100",
    },
    {
      label: "Streak",
      value: profile?.streak ?? 0,
      icon: Flame,
      accent: "bg-orange-400/20 text-orange-100",
    },
  ];

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 px-6 py-8 text-white shadow-xl shadow-indigo-500/20 sm:px-8 sm:py-9">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl"
      />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 max-w-xl space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-100/80">
            Welcome back
          </p>
          <h1 className="flex items-center gap-2 text-3xl font-black tracking-tight sm:text-4xl">
            <span className="truncate">{name}</span>
            <span className="inline-block shrink-0 origin-bottom animate-bounce text-2xl">
              👋
            </span>
          </h1>
          <p className="text-sm leading-relaxed text-blue-100/90 sm:text-[15px]">
            Continue building your vocabulary, earn XP, unlock achievements, and
            become a Future X champion.
          </p>
          <Link
            to="/dashboard/vocabulary"
            className="inline-flex items-center gap-2 pt-1 text-sm font-semibold text-white transition hover:gap-3"
          >
            
            
          </Link>
        </div>

        <div className="grid w-full grid-cols-2 gap-3 sm:max-w-xs lg:max-w-[280px]">
          {stats.map(({ label, value, icon: Icon, accent }) => (
            <div
              key={label}
              className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-3.5 py-3 backdrop-blur-md"
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${accent}`}
              >
                <Icon size={16} strokeWidth={2.25} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-blue-100/70">
                  {label}
                </p>
                <p className="truncate text-lg font-bold tabular-nums leading-tight">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}