import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface AppCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  link: string;
}

export default function AppCard({
  title,
  description,
  icon,
  color,
  link,
}: AppCardProps) {
  return (
    <Link
      to={link}
      className="group block overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
      <div
        className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl ${color} text-white`}
      >
        {icon}
      </div>

      <h3 className="text-2xl font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-3 min-h-[48px] text-sm leading-6 text-slate-500">
        {description}
      </p>

      <div className="mt-6 flex items-center gap-2 font-semibold text-blue-600">
        Open
        <ArrowRight
          size={18}
          className="transition-transform group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}