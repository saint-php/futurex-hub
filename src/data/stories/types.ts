// src/data/stories/types.ts
export interface Story {
  id: string;
  title: string;
  category: string;
  author: string;
  cover: string;
  summary: string;
  story: string;
  age: string;
  readTime: string;
  difficulty: "Easy" | "Medium" | "Advanced";
  xpReward: number;
  coinReward: number;
  isPremium: boolean;
  createdAt: string;
  tags?: string[];
}