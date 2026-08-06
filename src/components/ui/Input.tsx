import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  type = "text",
  className = "",
  ...props
}: Props) {
  return (
    <input
      type={type}
      {...props}
      className={`
        w-full
        rounded-xl
        border
        border-slate-300
        px-4
        py-3
        outline-none
        transition-all
        duration-300
        placeholder:text-slate-400
        focus:border-blue-500
        focus:ring-4
        focus:ring-blue-100
        ${className}
      `}
    />
  );
}