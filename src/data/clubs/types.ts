// src/data/clubs/types.ts
export interface ClubIdea {
  id: string;
  category: string;
  title: string;
  summary: string;
  description: string;
  steps: string[];
  materials: string[];
  safetyPrecautions: string[];
  difficulty: "Easy" | "Medium" | "Advanced";
  ageGroup: string;
  timeNeeded: string;
  xpReward: number;
  coinReward: number;
  tags?: string[];
  icon: string;

  // Special fields
  script?: string;                    // for Drama
  debateGuide?: {                     // for Debate
    principles: string[];
    howToDebate: string[];
    topics: {
      motion: string;
      propositionPoints: string[];
      oppositionPoints: string[];
      writeUp: string;
    }[];
  };
}