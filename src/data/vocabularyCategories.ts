import type { VocabularyCategory } from "../types/vocabulary";

export const vocabularyCategories: VocabularyCategory[] = [
  // ==========================
  // LEARNING COLLECTIONS
  // ==========================

  {
    id: "general",
    title: "General",
    description: "Study words from the entire Future X vocabulary library.",
    icon: "⭐",
    color: "bg-yellow-100",
    type: "general",
    totalWords: 750,
    featured: true,
  },

  {
    id: "animals",
    title: "Animals",
    description: "Wild and domestic animal vocabulary.",
    icon: "🐘",
    color: "bg-green-100",
    type: "subject",
    lessons: 18,
    totalWords: 180,
  },

  {
    id: "science",
    title: "Science",
    description: "General scientific vocabulary.",
    icon: "🧪",
    color: "bg-blue-100",
    type: "subject",
    lessons: 25,
    totalWords: 250,
  },

  {
    id: "technology",
    title: "Technology",
    description: "Computers, AI and modern technology.",
    icon: "💻",
    color: "bg-indigo-100",
    type: "subject",
    lessons: 21,
    totalWords: 210,
  },

  {
    id: "business",
    title: "Business",
    description: "Business, finance and entrepreneurship.",
    icon: "💼",
    color: "bg-orange-100",
    type: "subject",
    lessons: 16,
    totalWords: 160,
  },

  {
    id: "medicine",
    title: "Medicine",
    description: "Medical and health-related vocabulary.",
    icon: "🩺",
    color: "bg-red-100",
    type: "subject",
    lessons: 22,
    totalWords: 220,
  },

  {
    id: "food",
    title: "Food",
    description: "Food, cooking and nutrition.",
    icon: "🍎",
    color: "bg-lime-100",
    type: "subject",
    lessons: 15,
    totalWords: 150,
  },

  {
    id: "geography",
    title: "Geography",
    description: "Countries, climate and the physical world.",
    icon: "🌍",
    color: "bg-cyan-100",
    type: "subject",
    lessons: 18,
    totalWords: 180,
  },

  {
    id: "literature",
    title: "Literature",
    description: "Literary terms and expressions.",
    icon: "📚",
    color: "bg-purple-100",
    type: "subject",
    lessons: 12,
    totalWords: 120,
  },

  {
    id: "english",
    title: "English",
    description: "Grammar, vocabulary and expressions.",
    icon: "📝",
    color: "bg-sky-100",
    type: "subject",
    lessons: 30,
    totalWords: 300,
  },

  {
    id: "government",
    title: "Government",
    description: "Political science and civic education.",
    icon: "⚖️",
    color: "bg-gray-100",
    type: "subject",
    lessons: 14,
    totalWords: 140,
  },

  {
    id: "economics",
    title: "Economics",
    description: "Economic and financial terminology.",
    icon: "💰",
    color: "bg-emerald-100",
    type: "subject",
    lessons: 18,
    totalWords: 180,
  },

  // ==========================
  // EXAM COLLECTIONS
  // ==========================

  {
    id: "utme",
    title: "UTME",
    description: "Most common words tested in UTME.",
    icon: "📘",
    color: "bg-blue-100",
    type: "exam",
    totalWords: 500,
  },

  {
    id: "waec",
    title: "WAEC",
    description: "Frequently tested WAEC vocabulary.",
    icon: "📗",
    color: "bg-green-100",
    type: "exam",
    totalWords: 450,
  },

  {
    id: "neco",
    title: "NECO",
    description: "Important NECO examination words.",
    icon: "📕",
    color: "bg-red-100",
    type: "exam",
    totalWords: 420,
  },

  {
    id: "ielts",
    title: "IELTS",
    description: "Academic and IELTS vocabulary.",
    icon: "🌎",
    color: "bg-violet-100",
    type: "exam",
    totalWords: 600,
  },
  { id: "sat", title: "SAT", description: "SAT exam vocabulary.", icon: "📘", color: "bg-indigo-100", type: "exam", totalWords: 0 },
{ id: "gre", title: "GRE", description: "GRE exam vocabulary.", icon: "📗", color: "bg-emerald-100", type: "exam", totalWords: 0 },
{ id: "toefl", title: "TOEFL", description: "TOEFL exam vocabulary.", icon: "📙", color: "bg-amber-100", type: "exam", totalWords: 0 },
];