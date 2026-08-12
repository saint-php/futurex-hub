/**
 * Merged story loader: static seed data + Firestore admin content.
 *
 * Drop-in replacement for the functions in storyService.ts.
 * Static stories win on ID conflict (or flip the order if you prefer admin wins).
 *
 * Usage — in storyService.ts either:
 *   A) Re-export from here, or
 *   B) Copy these functions over your existing fetch* implementations.
 */

import {
  allStories,
  getStoriesByCategory as staticByCategory,
  getStoryById as staticById,
  getCategoriesWithCounts as staticCategories,
  
  type Story,
} from "../data/stories";
import type { StoryCategory } from "../data/storyCategories";
import {
  listStories as fsListStories,
  listStoryCategories as fsListCategories,
  getStory as fsGetStory,
} from "./adminContentService";
import type { AdminStory, AdminStoryCategory } from "../types/content";

function adminToStory(s: AdminStory): Story {
  return {
    id: s.id,
    title: s.title,
    author: s.author,
    summary: s.summary,
    story: s.story,
    category: s.category,
    cover: s.cover,
    readTime: s.readTime,
    age: s.age,
    difficulty: s.difficulty,
    xpReward: s.xpReward,
    coinReward: s.coinReward,
  } as Story;
}

function adminToCategory(
  c: AdminStoryCategory,
  numberOfStories: number
): StoryCategory & { numberOfStories: number } {
  return {
    id: c.id,
    title: c.title,
    description: c.description ?? "",
    icon: c.icon,
    color: c.color,
    numberOfStories,
  } as StoryCategory & { numberOfStories: number };
}

/** Firestore first, then static — static overwrites same id (seed stays stable). */
function mergeById<T extends { id: string }>(remote: T[], local: T[]): T[] {
  const map = new Map<string, T>();
  for (const item of remote) map.set(item.id, item);
  for (const item of local) map.set(item.id, item);
  return Array.from(map.values());
}

async function safeRemoteStories(): Promise<AdminStory[]> {
  try {
    return await fsListStories();
  } catch (err) {
    console.warn("[mergedStoryService] Firestore stories unavailable", err);
    return [];
  }
}

async function safeRemoteCategories(): Promise<AdminStoryCategory[]> {
  try {
    return await fsListCategories();
  } catch (err) {
    console.warn("[mergedStoryService] Firestore categories unavailable", err);
    return [];
  }
}

export async function fetchAllStories(): Promise<Story[]> {
  const remote = (await safeRemoteStories()).map(adminToStory);
  return mergeById(remote, allStories);
}

export async function fetchStoriesByCategory(
  categoryId: string
): Promise<Story[]> {
  const remote = (await safeRemoteStories())
    .filter((s) => s.category === categoryId)
    .map(adminToStory);
  const local = staticByCategory(categoryId);
  return mergeById(remote, local);
}

export async function fetchStoryById(id: string): Promise<Story | null> {
  const local = staticById(id);
  if (local) return local;

  try {
    const remote = await fsGetStory(id);
    return remote ? adminToStory(remote) : null;
  } catch {
    return null;
  }
}

export async function fetchCategories(): Promise<
  (StoryCategory & { numberOfStories: number })[]
> {
  const [remoteCats, remoteStories, localCats] = await Promise.all([
    safeRemoteCategories(),
    safeRemoteStories(),
    Promise.resolve(staticCategories()),
  ]);

  // Count stories per category across both sources
  const all = mergeById(
    remoteStories.map(adminToStory),
    allStories
  );
  const countMap = new Map<string, number>();
  for (const s of all) {
    countMap.set(s.category, (countMap.get(s.category) ?? 0) + 1);
  }

  const remoteMapped = remoteCats.map((c) =>
    adminToCategory(c, countMap.get(c.id) ?? 0)
  );

  // Merge categories by id; prefer local title/description if both exist
  const byId = new Map<string, StoryCategory & { numberOfStories: number }>();
  for (const c of remoteMapped) byId.set(c.id, c);
  for (const c of localCats) {
    byId.set(c.id, {
      ...c,
      numberOfStories: countMap.get(c.id) ?? c.numberOfStories ?? 0,
    });
  }

  return Array.from(byId.values()).sort((a, b) =>
    a.title.localeCompare(b.title)
  );
}

export async function searchAllStories(query: string): Promise<Story[]> {
  const q = query.trim().toLowerCase();
  if (!q) return fetchAllStories();

  const all = await fetchAllStories();
  return all.filter(
    (s) =>
      s.title.toLowerCase().includes(q) ||
      s.summary?.toLowerCase().includes(q) ||
      s.author?.toLowerCase().includes(q) ||
      s.story?.toLowerCase().includes(q)
  );
}

// Keep these stubs so existing imports don't break
export async function markStoryAsRead(uid: string, storyId: string) {
  console.log(`[mergedStoryService] markStoryAsRead → ${uid} / ${storyId}`);
  return Promise.resolve();
}

export async function toggleBookmark(uid: string, storyId: string) {
  console.log(`[mergedStoryService] toggleBookmark → ${uid} / ${storyId}`);
  return Promise.resolve();
}

export async function getUserStoryProgress(_uid: string) {
  return Promise.resolve({
    completed: [] as string[],
    bookmarked: [] as string[],
  });
}
