import {
  BookOpen,
  BookMarked,
  FileText,
  
  Lightbulb,
  Gamepad2,
} from "lucide-react";

import WelcomeCard from "../components/dashboard/WelcomeCard";
import QuickStats from "../components/dashboard/QuickStats";
import AppCard from "../components/dashboard/AppCard";
import FeatureHub from "../components/dashboard/FeatureHub";

const apps = [
  {
    title: "Vocabulary Builder",
    description:
      "Learn thousands of words with flashcards, quizzes and smart revision.",
    icon: BookOpen,
    color: "from-blue-500 to-cyan-500",
    path: "/dashboard/vocabulary",
    comingSoon: false,
  },
  {
  title: "Story Books",
  description: "Read exciting, level-appropriate stories and earn XP.",
  icon: BookMarked,
  color: "from-purple-500 to-pink-500",
  path: "/dashboard/stories",
  comingSoon: false,
},
  {
    title: "CBT Practice",
    description: "Practice past questions in a real exam-style format.",
    icon: FileText,
    color: "from-green-500 to-emerald-500",
    path: "/dashboard/cbt",
    comingSoon: false,
  },
 {
  title: "Club Ideas",
  description: "Practical ideas to start and run amazing school clubs.",
  icon: Lightbulb, // import { Lightbulb } from "lucide-react"
  color: "from-amber-500 to-orange-500",
  path: "/dashboard/clubs",
  comingSoon: false,
},
  {
    title: "Educational Games",
    description: "Learn through play with fun, curriculum-linked games.",
    icon: Gamepad2,
    color: "from-indigo-500 to-violet-500",
    comingSoon: true,
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-10">
      <WelcomeCard />

      <QuickStats />
<FeatureHub />
      <section>
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Explore Future X
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              One learning apps is live — the rest are on the way.
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {apps.map((app) => (
            <AppCard key={app.title} {...app} />
          ))}
        </div>
      </section>
    </div>
  );
}