interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold tracking-tight text-slate-900">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-2.5 max-w-2xl text-[15px] leading-relaxed text-slate-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}