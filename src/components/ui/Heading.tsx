type HeadingProps = {
  title: string;
  subtitle?: string;
  center?: boolean;
};

export default function Heading({ title, subtitle, center = false }: HeadingProps) {
  return (
    <div className={center ? "text-center" : ""}>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-2.5 text-[15px] leading-relaxed text-slate-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}