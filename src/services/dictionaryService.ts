/**
 * Free Dictionary API — no API key required
 * https://dictionaryapi.dev/
 */

export interface DictDefinition {
  definition: string;
  example?: string;
  synonyms: string[];
  antonyms: string[];
}

export interface DictMeaning {
  partOfSpeech: string;
  definitions: DictDefinition[];
  synonyms: string[];
  antonyms: string[];
}

export interface DictPhonetic {
  text?: string;
  audio?: string;
}

export interface DictionaryResult {
  word: string;
  phonetic?: string;
  phonetics: DictPhonetic[];
  meanings: DictMeaning[];
  sourceUrls?: string[];
}

export type DictionaryLookupStatus =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: DictionaryResult[] }
  | { status: "not_found"; query: string }
  | { status: "error"; message: string };

const API_BASE = "https://api.dictionaryapi.dev/api/v2/entries/en";

export async function lookupWord(
  word: string,
  signal?: AbortSignal
): Promise<DictionaryLookupStatus> {
  const q = word.trim().toLowerCase();
  if (!q) return { status: "idle" };

  try {
    const res = await fetch(`${API_BASE}/${encodeURIComponent(q)}`, {
      signal,
    });

    if (res.status === 404) {
      return { status: "not_found", query: q };
    }

    if (!res.ok) {
      return {
        status: "error",
        message: `Dictionary service returned ${res.status}. Try again shortly.`,
      };
    }

    const data = (await res.json()) as DictionaryResult[];
    if (!Array.isArray(data) || data.length === 0) {
      return { status: "not_found", query: q };
    }

    return { status: "success", data };
  } catch (err) {
    if ((err as Error).name === "AbortError") {
      return { status: "idle" };
    }
    return {
      status: "error",
      message: "Could not reach the dictionary. Check your connection.",
    };
  }
}

/** First available audio URL from phonetics */
export function getAudioUrl(entry: DictionaryResult): string | undefined {
  return entry.phonetics.find((p) => p.audio && p.audio.length > 0)?.audio;
}

/** Best phonetic text */
export function getPhoneticText(entry: DictionaryResult): string | undefined {
  if (entry.phonetic) return entry.phonetic;
  return entry.phonetics.find((p) => p.text)?.text;
}
