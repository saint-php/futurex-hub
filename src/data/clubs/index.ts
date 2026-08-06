// src/data/clubs/index.ts
import type { ClubIdea } from "./types";
import { jetsIdeas } from "./jetsIdeas";
import { pressIdeas } from "./pressIdeas";
import { entrepreneurshipIdeas } from "./entrepreneurshipIdeas";
import { stemIdeas } from "./stemIdeas";
import { dramaIdeas } from "./dramaIdeas";
import { musicIdeas } from "./musicIdeas";
import { debateIdeas } from "./debateIdeas";
import { healthIdeas } from "./healthIdeas";
import { clubCategories } from "../clubCategories";

export type { ClubIdea } from "./types";

export const allClubIdeas: ClubIdea[] = [
  ...jetsIdeas,
  ...pressIdeas,
  ...entrepreneurshipIdeas,
  ...stemIdeas,
  ...dramaIdeas,
  ...musicIdeas,
  ...debateIdeas,
  ...healthIdeas,
];

export function getIdeasByCategory(categoryId: string): ClubIdea[] {
  return allClubIdeas.filter(
    (idea) => idea.category.toLowerCase() === categoryId.toLowerCase()
  );
}

export function getIdeaById(id: string): ClubIdea | undefined {
  return allClubIdeas.find((idea) => idea.id === id);
}

export function getClubCategoriesWithCounts() {
  return clubCategories.map((cat) => ({
    ...cat,
    numberOfIdeas: getIdeasByCategory(cat.id).length,
  }));
}