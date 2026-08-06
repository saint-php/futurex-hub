// src/components/stories/StoryHeader.tsx
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
  subtitle?: string;
  onBack?: () => void;
}

export default function StoryHeader({ title, subtitle, onBack }: Props) {
  const navigate = useNavigate();

  return (
    <div className="mb-6">
      <button
        type="button"
        onClick={onBack ?? (() => navigate(-1))}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:underline"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h1>
      {subtitle && (
        <p className="mt-1.5 text-sm text-slate-500">{subtitle}</p>
      )}
    </div>
  );
}