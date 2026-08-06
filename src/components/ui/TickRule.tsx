type Props = {
  width?: number;
  ticks?: number;
  tone?: "gold" | "ink";
  className?: string;
};

/**
 * Signature mark: a brass measure-rule, evoking the idea of tracked,
 * measured progress. Used as a quiet underline beneath eyebrows and
 * section headings across the app instead of a generic divider.
 */
export default function TickRule({
  width = 96,
  ticks = 6,
  tone = "gold",
  className = "",
}: Props) {
  const stroke = tone === "gold" ? "#C9A24B" : "#14181F";
  const step = width / ticks;

  return (
    <svg
      width={width}
      height={10}
      viewBox={`0 0 ${width} 10`}
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <line x1="0" y1="1" x2={width} y2="1" stroke={stroke} strokeWidth="1.5" />
      {Array.from({ length: ticks + 1 }).map((_, i) => (
        <line
          key={i}
          x1={i * step}
          y1="1"
          x2={i * step}
          y2={i % 2 === 0 ? 9 : 5}
          stroke={stroke}
          strokeWidth="1.5"
        />
      ))}
    </svg>
  );
}
