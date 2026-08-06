import { BookOpen, CheckCircle2, Flame, Target } from "lucide-react";
import { useUserProfile } from "../../hooks/useUserProfile";

export default function ProgressCard() {
  const { profile, loading } = useUserProfile();

  const xp = profile?.xp ?? 0;
  const level = profile?.level ?? 1;
  const totalWords = profile?.totalWords ?? 0;
  const completedLessons = profile?.completedLessons ?? 0;
  const streak = profile?.streak ?? 0;

  const xpIntoLevel = xp % 100;
  const progressPct = Math.min(100, xpIntoLevel);

  if (loading) {
    return (
      <div className="animate-pulse rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="h-5 w-28 rounded bg-slate-100" />
        <div className="mt-6 h-24 rounded-2xl bg-slate-50" />
        <div className="mt-4 space-y-3">
          <div className="h-12 rounded-xl bg-slate-50" />
          <div className="h-12 rounded-xl bg-slate-50" />
        </div>
      </div>
    );
  }

  const metrics = [
    {
      label: "Words Learned",
      value: totalWords,
      icon: BookOpen,
      color: "text-blue-600 bg-blue-50",
    },
    {
      label: "Lessons Done",
      value: completedLessons,
      icon: CheckCircle2,
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      label: "Day Streak",
      value: streak,
      icon: Flame,
      color: "text-orange-600 bg-orange-50",
    },
  ];

  return (
    <div className="space-y-5">
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Your Progress
            </p>
            <h3 className="mt-1 truncate text-xl font-bold text-slate-900">
              Level {level}
            </h3>
          </div>
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <Target size={20} strokeWidth={2.25} />
          </div>
        </div>

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between gap-2 text-xs font-medium text-slate-500">
            <span className="truncate tabular-nums">
              {xpIntoLevel} / 100 XP
            </span>
            <span className="shrink-0 tabular-nums">{progressPct}%</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="mt-2 truncate text-xs text-slate-400">
            {100 - xpIntoLevel} XP to Level {level + 1}
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
          Stats
        </p>
        <ul className="space-y-3">
          {metrics.map(({ label, value, icon: Icon, color }) => (
            <li
              key={label}
              className="flex min-w-0 items-center gap-3 rounded-2xl bg-slate-50/80 px-3.5 py-3"
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${color}`}
              >
                <Icon size={16} strokeWidth={2.25} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs text-slate-500">{label}</p>
                <p className="truncate text-base font-bold tabular-nums text-slate-900">
                  {value}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-3xl border border-dashed border-blue-200 bg-blue-50/50 px-5 py-4">
        <p className="text-xs font-semibold text-blue-700">💡 Daily tip</p>
        <p className="mt-1.5 text-sm leading-relaxed text-blue-900/80">
          Review 5 words a day. Consistency beats intensity for long-term
          memory.
        </p>
      </div>
    </div>
  );
}