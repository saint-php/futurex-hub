import { ArrowRight } from "lucide-react";

type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export default function FeatureCard({ icon, title, description }: Props) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_28px_-16px_rgba(15,23,42,0.12)] transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-[0_4px_10px_rgba(15,23,42,0.04),0_32px_56px_-20px_rgba(37,99,235,0.25)]">

      {/* Soft directional glow that appears on hover */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/0 blur-3xl transition-colors duration-500 group-hover:bg-blue-500/10" />

      <div className="relative mb-6 inline-flex rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/70 p-4 text-blue-600 ring-1 ring-blue-100 transition-transform duration-300 group-hover:scale-105">
        {icon}
      </div>

      <h3 className="relative text-xl font-bold tracking-tight text-slate-900">
        {title}
      </h3>

      <p className="relative mt-3 leading-7 text-[15px] text-slate-500">
        {description}
      </p>

      <div className="relative mt-7 flex items-center gap-2 text-sm font-semibold text-blue-600">
        Learn More
        <ArrowRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </div>

    </div>
  );
}