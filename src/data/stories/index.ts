// src/data/stories/index.ts
import type { Story } from "./types";
import { primaryStories } from "./primaryStories";
import { secondaryStories } from "./secondaryStories";
import { adventureStories } from "./adventureStories";
import { funnyStories } from "./funnyStories";
import { educationalStories } from "./educationalStories";
import { lifeBuildStories } from "./lifeBuildStories";
import { storyCategories } from "../storyCategories";

export type { Story } from "./types";

export const allStories: Story[] = [
  ...primaryStories,
  ...secondaryStories,
  ...adventureStories,
  ...funnyStories,
  ...educationalStories,
  ...lifeBuildStories,
];

export function getStoriesByCategory(categoryId: string): Story[] {
  return allStories.filter(
    (s) => s.category.toLowerCase() === categoryId.toLowerCase()
  );
}

export function getStoryById(id: string): Story | undefined {
  return allStories.find((s) => s.id === id);
}

export function getCategoriesWithCounts() {
  return storyCategories.map((cat) => ({
    ...cat,
    numberOfStories: getStoriesByCategory(cat.id).length,
  }));
}

export function searchStories(query: string): Story[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return allStories.filter(
    (s) =>
      s.title.toLowerCase().includes(q) ||
      s.summary.toLowerCase().includes(q) ||
      s.author.toLowerCase().includes(q) ||
      s.tags?.some((t) => t.toLowerCase().includes(q))
  );
}