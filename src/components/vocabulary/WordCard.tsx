import { Volume2 } from "lucide-react";
import type { VocabWord } from "./data";

const difficultyStyles: Record<VocabWord["difficulty"], string> = {
  Easy: "bg-green-50 text-green-600",
  Medium: "bg-amber-50 text-amber-600",
  Hard: "bg-red-50 text-red-600",
};

type Props = {
  word: VocabWord;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
};

export default function WordCard({ word, isFavorite, onToggleFavorite }: Props) {
  function speak() {
    if (!("speechSynthesis" in window)) return;
    const utterance = new SpeechSynthesisUtterance(word.word);
    utterance.lang = "en-US";
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  }

  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5">
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="text-lg font-bold text-slate-900">{word.word}</h3>
        <div className="flex shrink-0 gap-1.5">
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600">
            {word.category}
          </span>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${difficultyStyles[word.difficulty]}`}
          >
            {word.difficulty}
          </span>
        </div>
      </div>

      <p className="text-sm text-slate-600">{word.meaning}</p>
      <p className="mt-2 text-sm italic text-slate-400">"{word.example}"</p>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
        <div className="flex gap-3 text-xs">
          <span className="text-green-600">🟢 {word.synonym}</span>
          <span className="text-red-500">🔴 {word.antonym}</span>
        </div>
        <div className="flex shrink-0 gap-1">
          <button
            onClick={() => onToggleFavorite(word.id)}
            title="Favorite"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-lg hover:bg-slate-100"
          >
            {isFavorite ? "❤️" : "🤍"}
          </button>
          <button
            onClick={speak}
            title="Pronounce"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
          >
            <Volume2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
