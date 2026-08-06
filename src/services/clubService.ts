// src/services/clubService.ts
import {
  allClubIdeas,
  getIdeasByCategory,
  getIdeaById,
  getClubCategoriesWithCounts,
  type ClubIdea,
} from "../data/clubs";

export async function fetchAllClubIdeas(): Promise<ClubIdea[]> {
  return Promise.resolve(allClubIdeas);
}

export async function fetchIdeasByCategory(
  categoryId: string
): Promise<ClubIdea[]> {
  return Promise.resolve(getIdeasByCategory(categoryId));
}

export async function fetchIdeaById(id: string): Promise<ClubIdea | null> {
  return Promise.resolve(getIdeaById(id) ?? null);
}

export async function fetchClubCategories() {
  return Promise.resolve(getClubCategoriesWithCounts());
}