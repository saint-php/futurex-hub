import { Link } from "react-router-dom";

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function Button({
  children,
  to,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-gradient-to-b from-blue-500 to-blue-600 text-white shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset,0_10px_24px_-8px_rgba(37,99,235,0.55)] hover:from-blue-500 hover:to-blue-700 hover:shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset,0_16px_32px_-10px_rgba(37,99,235,0.6)] active:scale-[0.98]"
      : variant === "secondary"
      ? "bg-white text-slate-900 border border-slate-200 shadow-sm hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98]"
      : "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900";

  const base = `inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 font-semibold tracking-tight transition-all duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 ${styles} ${className}`;

  if (to) {
    return (
      <Link to={to} className={base}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={base}>
      {children}
    </button>
  );
}