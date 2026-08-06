// src/data/storyCategories.ts
export interface StoryCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  color: string;
  numberOfStories: number;
}

export const storyCategories: StoryCategory[] = [
  {
    id: "primary",
    title: "Primary Class",
    description: "Simple, engaging stories perfect for younger learners",
    icon: "📚",
    gradient: "from-blue-500 to-cyan-500",
    color: "bg-blue-50 border-blue-200",
    numberOfStories: 0,
  },
  {
    id: "secondary",
    title: "Secondary Class",
    description: "Richer stories for teens with deeper themes",
    icon: "🎓",
    gradient: "from-indigo-500 to-purple-500",
    color: "bg-indigo-50 border-indigo-200",
    numberOfStories: 0,
  },
  {
    id: "adventure",
    title: "Adventure",
    description: "Exciting journeys, exploration and courage",
    icon: "🗺️",
    gradient: "from-orange-500 to-amber-500",
    color: "bg-orange-50 border-orange-200",
    numberOfStories: 0,
  },
  {
    id: "funny",
    title: "Funny",
    description: "Light-hearted tales that make you smile",
    icon: "😂",
    gradient: "from-pink-500 to-rose-500",
    color: "bg-pink-50 border-pink-200",
    numberOfStories: 0,
  },
  {
    id: "educational",
    title: "Educational",
    description: "Stories that teach valuable lessons and knowledge",
    icon: "💡",
    gradient: "from-emerald-500 to-teal-500",
    color: "bg-emerald-50 border-emerald-200",
    numberOfStories: 0,
  },
  {
    id: "life-build",
    title: "Life Build",
    description: "Stories that build character, resilience and wisdom",
    icon: "❤️",
    gradient: "from-red-500 to-pink-500",
    color: "bg-red-50 border-red-200",
    numberOfStories: 0,
  },
];