interface SectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function Section({
  title,
  subtitle,
  children,
}: SectionProps) {
  return (
    <section className="space-y-6">

      <div>

        <h2 className="text-3xl font-bold text-slate-900">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-2 text-slate-500">
            {subtitle}
          </p>
        )}

      </div>

      {children}

    </section>
  );
}