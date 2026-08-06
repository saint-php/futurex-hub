import { BookOpen, CheckCircle2, Target, Heart } from "lucide-react";

type Props = {
  totalWords: number;
  learnedCount: number;
  accuracy: number;
  favoriteCount: number;
};

export default function StatsBar({
  totalWords,
  learnedCount,
  accuracy,
  favoriteCount,
}: Props) {
  const stats = [
    { label: "Total Words", value: totalWords, icon: BookOpen, color: "text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100/70 ring-purple-100" },
    { label: "Learned", value: learnedCount, icon: CheckCircle2, color: "text-green-600 bg-gradient-to-br from-green-50 to-green-100/70 ring-green-100" },
    { label: "Quiz Accuracy", value: `${accuracy}%`, icon: Target, color: "text-orange-500 bg-gradient-to-br from-orange-50 to-orange-100/70 ring-orange-100" },
    { label: "Favorites", value: favoriteCount, icon: Heart, color: "text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100/70 ring-blue-100" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map(({ label, value, icon: Icon, color }) => (
        <div
          key={label}
          className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-shadow duration-300 hover:shadow-[0_12px_28px_-14px_rgba(15,23,42,0.2)]"
        >
          <div className={`flex h-11 w-11 items-center justify-center rounded-xl ring-1 ${color}`}>
            <Icon size={20} />
          </div>
          <div>
            <p className="text-xl font-bold tracking-tight text-slate-900">{value}</p>
            <p className="text-xs text-slate-500">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}