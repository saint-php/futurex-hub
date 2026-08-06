// src/data/clubCategories.ts
export interface ClubCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  color: string;
  numberOfIdeas: number;
}

export const clubCategories: ClubCategory[] = [
  {
    id: "jets",
    title: "JETS",
    description: "Junior Engineers, Technologists & Scientists projects",
    icon: "🚀",
    gradient: "from-blue-500 to-cyan-500",
    color: "bg-blue-50 border-blue-200",
    numberOfIdeas: 0,
  },
  {
    id: "press",
    title: "Press Club",
    description: "Journalism, media, school newspaper & podcasts",
    icon: "📰",
    gradient: "from-slate-600 to-slate-800",
    color: "bg-slate-50 border-slate-200",
    numberOfIdeas: 0,
  },
  {
    id: "entrepreneurship",
    title: "Entrepreneurship",
    description: "Business ideas students can actually start",
    icon: "💼",
    gradient: "from-amber-500 to-orange-500",
    color: "bg-amber-50 border-amber-200",
    numberOfIdeas: 0,
  },
  {
    id: "stem-nexus",
    title: "STEM Nexus",
    description: "Science, Technology, Engineering & Mathematics hub",
    icon: "🔬",
    gradient: "from-emerald-500 to-teal-500",
    color: "bg-emerald-50 border-emerald-200",
    numberOfIdeas: 0,
  },
  {
    id: "drama",
    title: "Drama Club",
    description: "Acting, plays, storytelling and performance",
    icon: "🎭",
    gradient: "from-pink-500 to-rose-500",
    color: "bg-pink-50 border-pink-200",
    numberOfIdeas: 0,
  },
  {
    id: "music",
    title: "Music Club",
    description: "Choir, instruments, production and performance",
    icon: "🎵",
    gradient: "from-violet-500 to-purple-500",
    color: "bg-violet-50 border-violet-200",
    numberOfIdeas: 0,
  },
  {
    id: "debate",
    title: "Debate & Literary",
    description: "Public speaking, writing and critical thinking",
    icon: "🎤",
    gradient: "from-indigo-500 to-blue-600",
    color: "bg-indigo-50 border-indigo-200",
    numberOfIdeas: 0,
  },
  {
    id: "health",
    title: "Health & Wellness",
    description: "Mental health, fitness and first-aid awareness",
    icon: "💚",
    gradient: "from-green-500 to-lime-500",
    color: "bg-green-50 border-green-200",
    numberOfIdeas: 0,
  },
];