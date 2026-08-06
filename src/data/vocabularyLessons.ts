export interface Lesson {
  id: string;
  category: string;
  title: string;
  words: number;
  xp: number;
  difficulty: "Easy" | "Medium" | "Hard";
}

export const vocabularyLessons: Lesson[] = [
  {
    id: "animals-1",
    category: "animals",
    title: "Domestic Animals",
    words: 20,
    xp: 50,
    difficulty: "Easy",
  },
  {
    id: "animals-2",
    category: "animals",
    title: "Wild Animals",
    words: 25,
    xp: 60,
    difficulty: "Easy",
  },
  {
    id: "animals-3",
    category: "animals",
    title: "Animal Habitats",
    words: 30,
    xp: 80,
    difficulty: "Medium",
  },

  {
    id: "science-1",
    category: "science",
    title: "Scientific Terms",
    words: 20,
    xp: 50,
    difficulty: "Easy",
  },
  {
    id: "science-2",
    category: "science",
    title: "Laboratory Equipment",
    words: 30,
    xp: 80,
    difficulty: "Medium",
  },

  {
    id: "technology-1",
    category: "technology",
    title: "Computer Basics",
    words: 20,
    xp: 50,
    difficulty: "Easy",
  },
  {
    id: "technology-2",
    category: "technology",
    title: "Internet & AI",
    words: 30,
    xp: 80,
    difficulty: "Medium",
  },
];