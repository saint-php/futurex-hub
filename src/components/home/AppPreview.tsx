import { motion } from "framer-motion";
import {
  BookOpen,
  GraduationCap,
  Gamepad2,
  Atom,
  School,
  BookMarked,
} from "lucide-react";

const apps = [
  {
    title: "Vocabulary Builder",
    icon: <BookOpen size={26} />,
    color: "from-blue-500 to-cyan-500",
    live: true,
  },
  {
    title: "StoryVerse",
    icon: <BookMarked size={26} />,
    color: "from-purple-500 to-pink-500",
    live: false,
  },
  {
    title: "CBT Practice",
    icon: <GraduationCap size={26} />,
    color: "from-green-500 to-emerald-500",
    live: false,
  },
  {
    title: "Science",
    icon: <Atom size={26} />,
    color: "from-orange-500 to-red-500",
    live: false,
  },
  {
    title: "Games",
    icon: <Gamepad2 size={26} />,
    color: "from-yellow-500 to-orange-500",
    live: false,
  },
  {
    title: "School Portal",
    icon: <School size={26} />,
    color: "from-indigo-500 to-blue-600",
    live: false,
  },
];

export default function AppPreview() {
  return (
    <div className="grid grid-cols-2 gap-5 lg:grid-cols-3">
      {apps.map((app, index) => (
        <motion.div
          key={app.title}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * 0.1,
            duration: 0.5,
          }}
          whileHover={{
            scale: 1.04,
            y: -8,
          }}
          className="group relative flex h-40 cursor-pointer flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 p-5 shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset,0_20px_40px_-16px_rgba(0,0,0,0.5)] backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_1px_0_0_rgba(255,255,255,0.1)_inset,0_28px_56px_-16px_rgba(0,0,0,0.6)]"
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${app.color} opacity-90 transition-opacity duration-300 group-hover:opacity-100`}
          />

          <div className="fx-noise pointer-events-none absolute inset-0 opacity-40" />

          {/* Status badge — pinned, single line, never wraps or clips */}
          <span
            className={[
              "absolute right-4 top-4 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide backdrop-blur-sm",
              app.live
                ? "bg-white text-slate-900"
                : "bg-black/25 text-white/80 ring-1 ring-white/20",
            ].join(" ")}
          >
            {app.live ? "Live" : "Soon"}
          </span>

          <div className="relative flex h-full flex-col text-white">
            <div className="mb-4 inline-flex w-fit rounded-2xl bg-white/15 p-2.5 ring-1 ring-white/20 backdrop-blur-sm">
              {app.icon}
            </div>

            <h3 className="mt-auto text-base font-bold leading-snug tracking-tight">
              {app.title}
            </h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
}