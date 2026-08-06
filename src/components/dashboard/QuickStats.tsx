import { motion } from "framer-motion";
import {
  Flame,
  BookOpen,
  Trophy,
  Star,
  type LucideIcon,
} from "lucide-react";

import { useUserProfile } from "../../hooks/useUserProfile";

interface Stat {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

export default function QuickStats() {
  const { profile, loading } = useUserProfile();

  if (loading || !profile) {
    return (
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-28 animate-pulse rounded-2xl bg-slate-200"
          />
        ))}
      </section>
    );
  }

  const stats: Stat[] = [
    {
      label: "Level",
      value: profile.level.toString(),
      icon: Star,
      color: "text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100/70 ring-purple-100",
    },
    {
      label: "Day Streak",
      value: profile.streak.toString(),
      icon: Flame,
      color: "text-orange-500 bg-gradient-to-br from-orange-50 to-orange-100/70 ring-orange-100",
    },
    {
      label: "Words Learned",
      value: profile.totalWords.toString(),
      icon: BookOpen,
      color: "text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100/70 ring-blue-100",
    },
    {
      label: "XP",
      value: profile.xp.toString(),
      icon: Trophy,
      color: "text-amber-500 bg-gradient-to-br from-amber-50 to-amber-100/70 ring-amber-100",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map(({ label, value, icon: Icon, color }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: i * 0.05,
          }}
          whileHover={{ y: -3 }}
          className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-shadow duration-300 hover:shadow-[0_12px_28px_-14px_rgba(15,23,42,0.2)]"
        >
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl ring-1 ${color}`}
          >
            <Icon size={22} />
          </div>

          <div>
            <p className="text-2xl font-bold tracking-tight text-slate-900">
              {value}
            </p>

            <p className="text-sm text-slate-500">
              {label}
            </p>
          </div>
        </motion.div>
      ))}
    </section>
  );
}