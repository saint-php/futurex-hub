interface ProgressProps {
  value: number;
}

export default function Progress({
  value,
}: ProgressProps) {
  return (
    <div className="mt-3">

      <div className="mb-2 flex justify-between text-sm">
        <span>Progress</span>
        <span>{value}%</span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-200">

        <div
          style={{ width: `${value}%` }}
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
        />

      </div>

    </div>
  );
}