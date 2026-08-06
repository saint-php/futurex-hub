import { useState } from "react";
import { Shuffle, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { vocabulary } from "./data";

type Props = {
  learned: number[];
  onMarkLearned: (id: number) => void;
};

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function FlashcardsTab({ learned, onMarkLearned }: Props) {
  const [order, setOrder] = useState(() => shuffle(vocabulary.map((_, i) => i)));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const word = vocabulary[order[index]];
  const isLearned = learned.includes(word.id);

  function go(delta: number) {
    setFlipped(false);
    setIndex((i) => (i + delta + order.length) % order.length);
  }

  function handleShuffle() {
    setOrder(shuffle(vocabulary.map((_, i) => i)));
    setIndex(0);
    setFlipped(false);
  }

  return (
    <div className="mx-auto max-w-xl">
      <div
        onClick={() => setFlipped((f) => !f)}
        className="flex min-h-[320px] cursor-pointer flex-col items-center justify-center rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-10 text-center transition-transform hover:scale-[1.01]"
      >
        {!flipped ? (
          <>
            <span className="mb-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-600">
              {word.category} • {word.difficulty}
            </span>
            <h2 className="text-3xl font-black text-slate-900">{word.word}</h2>
            <p className="mt-4 text-sm text-slate-400">Click to reveal meaning</p>
          </>
        ) : (
          <>
            <span className="mb-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-600">
              {word.category} • {word.difficulty}
            </span>
            <h2 className="text-2xl font-black text-slate-900">{word.word}</h2>
            <p className="mt-3 font-medium text-slate-700">{word.meaning}</p>
            <p className="mt-2 text-sm italic text-slate-500">"{word.example}"</p>
            <div className="mt-4 flex gap-4 text-xs">
              <span className="text-green-600">🟢 {word.synonym}</span>
              <span className="text-red-500">🔴 {word.antonym}</span>
            </div>
          </>
        )}
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          onClick={() => go(-1)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={handleShuffle}
          className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
        >
          <Shuffle size={16} /> Shuffle
        </button>
        <button
          onClick={() => onMarkLearned(word.id)}
          disabled={isLearned}
          className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
        >
          <Check size={16} /> {isLearned ? "Learned" : "Mark Learned"}
        </button>
        <button
          onClick={() => go(1)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <p className="mt-4 text-center text-xs text-slate-400">
        Card {index + 1} of {order.length}
      </p>
    </div>
  );
}
