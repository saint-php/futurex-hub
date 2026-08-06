import { useNavigate } from "react-router-dom";
import { BookOpen, GraduationCap, Sparkles, ArrowRight } from "lucide-react";

const features = [
  {
    id: "dictionary",
    title: "Dictionary",
    description: "Look up any word — meaning, example, synonym & antonym.",
    path: "/dashboard/dictionary",
    icon: BookOpen,
    gradient: "from-blue-600 to-indigo-600",
    badge: "Search",
  },
  {
    id: "study-online",
    title: "Study Courses",
    description: "Curated courses, videos and practice for every subject.",
    path: "/dashboard/study-online",
    icon: GraduationCap,
    gradient: "from-emerald-600 to-teal-600",
    badge: "Learn X",
  },
  {
    id: "amazing-facts",
    title: "Amazing Facts",
    description: "Mind-blowing facts to spark curiosity every day.",
    path: "/dashboard/amazing-facts",
    icon: Sparkles,
    gradient: "from-amber-500 to-orange-600",
    badge: "Discover",
  },
] as const;

export default function FeatureHub() {
  const navigate = useNavigate();

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Explore More
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Tools and content to level up your learning journey.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => navigate(f.path)}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
            >
              <div
                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${f.gradient} text-white shadow-sm`}
              >
                <Icon size={22} />
              </div>
              <span className="absolute right-4 top-4 rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {f.badge}
              </span>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600">
                {f.title}
              </h3>
              <p className="mt-1.5 text-sm leading-snug text-slate-500">
                {f.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 opacity-0 transition group-hover:opacity-100">
                Open <ArrowRight size={14} />
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
