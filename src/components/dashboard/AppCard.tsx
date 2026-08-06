import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, type LucideIcon } from "lucide-react";

export interface AppCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  path?: string;
  comingSoon?: boolean;
}

export default function AppCard({
  title,
  description,
  icon: Icon,
  color,
  path,
  comingSoon = false,
}: AppCardProps) {
  const navigate = useNavigate();
  const disabled = comingSoon || !path;

  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={() => path && navigate(path)}
      whileHover={disabled ? undefined : { y: -6 }}
      transition={{ duration: 0.2 }}
      className={[
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-7 pt-6 text-left shadow-[0_1px_2px_rgba(15,23,42,0.04),0_10px_24px_-16px_rgba(15,23,42,0.14)] transition-shadow duration-300",
        disabled
          ? "cursor-not-allowed"
          : "hover:border-slate-300/80 hover:shadow-[0_4px_10px_rgba(15,23,42,0.04),0_28px_48px_-18px_rgba(15,23,42,0.22)]",
      ].join(" ")}
    >
      {/* Top accent line, uses the same gradient as the icon tile */}
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${color}`} />

      {/* Status badge, pinned so it never collides with the title */}
      <span
        className={[
          "absolute right-6 top-5 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide",
          comingSoon
            ? "bg-slate-100 text-slate-400"
            : "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100",
        ].join(" ")}
      >
        {comingSoon ? "Soon" : "Live"}
      </span>

      <div
        className={[
          "mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset,0_10px_20px_-8px_rgba(15,23,42,0.35)] transition-transform duration-300",
          color,
          disabled ? "" : "group-hover:scale-105",
        ].join(" ")}
      >
        <Icon size={26} />
      </div>

      <h3
        className={[
          "pr-10 text-xl font-bold tracking-tight",
          disabled ? "text-slate-400" : "text-slate-900",
        ].join(" ")}
      >
        {title}
      </h3>

      <p
        className={[
          "mt-2 min-h-[44px] text-sm leading-6",
          disabled ? "text-slate-350 text-slate-400" : "text-slate-500",
        ].join(" ")}
      >
        {description}
      </p>

      <div className="mt-6">
        {comingSoon ? (
          <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-400">
            Notify me when ready
          </span>
        ) : (
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 transition-colors duration-300 group-hover:bg-blue-100">
            Continue
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        )}
      </div>
    </motion.button>
  );
}