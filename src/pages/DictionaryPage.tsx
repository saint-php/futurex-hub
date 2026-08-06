import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  BookOpen,
  Volume2,
  Loader2,
  Sparkles,
} from "lucide-react";
import { vocabulary, type VocabularyEntry } from "../data/vocabulary";
import {
  lookupWord,
  getAudioUrl,
  getPhoneticText,
  type DictionaryResult,
  type DictionaryLookupStatus,
} from "../services/dictionaryService";

export default function DictionaryPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [apiState, setApiState] = useState<DictionaryLookupStatus>({
    status: "idle",
  });
  const [localSelected, setLocalSelected] = useState<VocabularyEntry | null>(
    null
  );
  const abortRef = useRef<AbortController | null>(null);

  // Debounce input
  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(query.trim()), 350);
    return () => window.clearTimeout(t);
  }, [query]);

  // Local matches (instant)
  const localResults = useMemo(() => {
    const q = debounced.toLowerCase();
    if (!q) return [];
    return vocabulary
      .filter(
        (w) =>
          w.word.toLowerCase().includes(q) ||
          w.meaning.toLowerCase().includes(q)
      )
      .slice(0, 12);
  }, [debounced]);

  // API lookup
  useEffect(() => {
    setLocalSelected(null);

    if (!debounced) {
      setApiState({ status: "idle" });
      return;
    }

    // Only hit API for single-word-ish queries (allow hyphen)
    const isWordLike = /^[a-zA-Z][a-zA-Z'-]*$/.test(debounced);
    if (!isWordLike) {
      setApiState({ status: "idle" });
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setApiState({ status: "loading" });

    lookupWord(debounced, controller.signal).then((result) => {
      if (!controller.signal.aborted) setApiState(result);
    });

    return () => controller.abort();
  }, [debounced]);

  function playAudio(url: string) {
    try {
      const audio = new Audio(url);
      void audio.play();
    } catch {
      // ignore
    }
  }

  const apiEntry: DictionaryResult | undefined =
    apiState.status === "success" ? apiState.data[0] : undefined;

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Header */}
      <div>
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:underline"
        >
          <ArrowLeft size={16} />
          Dashboard
        </button>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-sm">
            <BookOpen size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Dictionary
            </h1>
            <p className="text-sm text-slate-500">
             
              Future X word bank
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type any English word…"
         className="w-full h-14 rounded-2xl border border-slate-200 bg-white pl-11 pr-12 text-sm font-medium text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          autoFocus
        />
        {apiState.status === "loading" && (
          <Loader2
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-blue-500"
          />
        )}
      </div>

      {/* API result */}
      {apiEntry && (
        <article className="rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-3xl font-black capitalize text-slate-900">
              {apiEntry.word}
            </h2>
            {getPhoneticText(apiEntry) && (
              <span className="text-sm font-medium text-slate-500">
                {getPhoneticText(apiEntry)}
              </span>
            )}
            {getAudioUrl(apiEntry) && (
              <button
                type="button"
                onClick={() => playAudio(getAudioUrl(apiEntry)!)}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-blue-700 shadow-sm transition hover:bg-blue-100"
                title="Play pronunciation"
              >
                <Volume2 size={14} />
                Listen
              </button>
            )}
          </div>

          <div className="mt-6 space-y-6">
            {apiEntry.meanings.map((meaning, mi) => (
              <div key={mi}>
                <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  {meaning.partOfSpeech}
                </p>
                <ol className="mt-2 space-y-3">
                  {meaning.definitions.slice(0, 3).map((def, di) => (
                    <li key={di} className="text-sm leading-relaxed text-slate-700">
                      <span className="font-semibold text-slate-400">
                        {di + 1}.
                      </span>{" "}
                      {def.definition}
                      {def.example && (
                        <p className="mt-1 pl-4 text-slate-500 italic">
                          “{def.example}”
                        </p>
                      )}
                    </li>
                  ))}
                </ol>
                {(meaning.synonyms.length > 0 ||
                  meaning.definitions.some((d) => d.synonyms.length > 0)) && (
                  <p className="mt-2 text-xs text-slate-500">
                    <span className="font-bold text-emerald-700">Synonyms: </span>
                    {[
                      ...meaning.synonyms,
                      ...meaning.definitions.flatMap((d) => d.synonyms),
                    ]
                      .filter((v, i, a) => a.indexOf(v) === i)
                      .slice(0, 6)
                      .join(", ")}
                  </p>
                )}
                {(meaning.antonyms.length > 0 ||
                  meaning.definitions.some((d) => d.antonyms.length > 0)) && (
                  <p className="mt-1 text-xs text-slate-500">
                    <span className="font-bold text-rose-700">Antonyms: </span>
                    {[
                      ...meaning.antonyms,
                      ...meaning.definitions.flatMap((d) => d.antonyms),
                    ]
                      .filter((v, i, a) => a.indexOf(v) === i)
                      .slice(0, 6)
                      .join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </article>
      )}

      {apiState.status === "not_found" && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
          No dictionary entry found for “{apiState.query}”. Check spelling, or
          try a root form of the word.
        </div>
      )}

      {apiState.status === "error" && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-900">
          {apiState.message}
        </div>
      )}

      {/* Future X local bank */}
      {localResults.length > 0 && (
        <section>
          <div className="mb-3 flex items-center gap-2">
            <Sparkles size={16} className="text-amber-500" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              In your Future X vocabulary
            </h3>
          </div>

          {localSelected ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h4 className="text-xl font-bold text-slate-900">
                  {localSelected.word}
                </h4>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold uppercase text-slate-600">
                  {localSelected.difficulty}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-700">
                {localSelected.meaning}
              </p>
              <p className="mt-2 text-sm italic text-slate-500">
                “{localSelected.example}”
              </p>
              <div className="mt-3 flex flex-wrap gap-3 text-xs">
                {localSelected.synonym && (
                  <span>
                    <span className="font-bold text-emerald-700">Syn: </span>
                    {localSelected.synonym}
                  </span>
                )}
                {localSelected.antonym && (
                  <span>
                    <span className="font-bold text-rose-700">Ant: </span>
                    {localSelected.antonym}
                  </span>
                )}
              </div>
              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() =>
                    navigate(`/dashboard/vocabulary/word/${localSelected.id}`)
                  }
                  className="text-sm font-semibold text-blue-600 hover:underline"
                >
                  Open flashcard →
                </button>
                <button
                  type="button"
                  onClick={() => setLocalSelected(null)}
                  className="text-sm font-medium text-slate-500 hover:underline"
                >
                  Back to list
                </button>
              </div>
            </div>
          ) : (
            <ul className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm divide-y divide-slate-100">
              {localResults.map((w) => (
                <li key={String(w.id)}>
                  <button
                    type="button"
                    onClick={() => setLocalSelected(w)}
                    className="flex w-full items-start gap-3 px-5 py-3.5 text-left transition hover:bg-slate-50"
                  >
                    <span className="font-bold text-slate-900">{w.word}</span>
                    <span className="min-w-0 flex-1 truncate text-sm text-slate-500">
                      {w.meaning}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {!debounced && (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-10 text-center">
          <Search size={32} className="mx-auto text-slate-300" />
          <p className="mt-3 text-sm font-medium text-slate-500">
            Type any English word for a full dictionary definition
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Pronunciation · parts of speech · examples · synonyms
          </p>
        </div>
      )}
    </div>
  );
}
