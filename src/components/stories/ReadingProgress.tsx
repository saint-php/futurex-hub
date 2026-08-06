// src/components/stories/ReadingProgress.tsx
interface Props {
  progress: number; // 0–100
}

export default function ReadingProgress({ progress }: Props) {
  const clamped = Math.min(100, Math.max(0, progress));

  return (
    <div className="fixed left-0 right-0 top-0 z-50 h-1 bg-slate-200">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}