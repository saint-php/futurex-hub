/**
 * Live counts from vocabulary.ts only — never use static totalWords.
 */
import {
  vocabulary,
  getWordCategories,
  type VocabularyEntry,
} from "./vocabulary";

function norm(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");
}

function tagsOf(entry: VocabularyEntry): string[] {
  return getWordCategories(entry).map(norm);
}

export function entryMatchesCategory(
  entry: VocabularyEntry,
  categoryId: string,
  categoryTitle?: string
): boolean {
  const tags = tagsOf(entry);
  const candidates = [categoryId, categoryTitle]
    .filter(Boolean)
    .map((s) => norm(s as string));

  return candidates.some((c) => tags.includes(c));
}

export function liveWordCount(
  categoryId: string,
  categoryTitle?: string
): number {
  return vocabulary.filter((w) =>
    entryMatchesCategory(w, categoryId, categoryTitle)
  ).length;
}

export function liveWordsForCategory(
  categoryId: string,
  categoryTitle?: string
): VocabularyEntry[] {
  return vocabulary.filter((w) =>
    entryMatchesCategory(w, categoryId, categoryTitle)
  );
}