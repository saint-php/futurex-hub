import { vocabulary } from "./data";
import WordCard from "./WordCard";

type Props = {
  favorites: number[];
  onToggleFavorite: (id: number) => void;
};

export default function FavoritesTab({ favorites, onToggleFavorite }: Props) {
  const favWords = vocabulary.filter((w) => favorites.includes(w.id));

  if (favWords.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white py-20 text-center">
        <p className="text-5xl">💔</p>
        <h3 className="mt-4 text-lg font-bold text-slate-900">No favorites yet</h3>
        <p className="mt-1 text-sm text-slate-500">
          Click the heart icon on any word to save it here
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {favWords.map((word) => (
        <WordCard
          key={word.id}
          word={word}
          isFavorite
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
