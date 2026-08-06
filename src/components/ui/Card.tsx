interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-16px_rgba(15,23,42,0.14)] transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300/80 hover:shadow-[0_4px_8px_rgba(15,23,42,0.04),0_24px_48px_-16px_rgba(15,23,42,0.18)] ${className}`}
    >
      {children}
    </div>
  );
}