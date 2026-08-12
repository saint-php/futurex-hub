import {
  BookOpen,
  Brain,
  Gamepad2,
  GraduationCap,
  Lightbulb,
  Library,
  Users,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import FeatureCard from "./FeatureCard";

export default function FeatureGrid() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <BookOpen size={30} />,
      title: "Vocabulary Builder",
      description:
        "Build powerful vocabulary through lessons, flashcards, quizzes and challenges.",
      path: "/dashboard/vocabulary",
    },
    {
      icon: <GraduationCap size={30} />,
      title: "CBT Practice",
      description:
        "Practice JAMB, WAEC and other examination questions with timed CBT sessions.",
      path: "/dashboard/cbt",
    },
    {
      icon: <Library size={30} />,
      title: "Study Courses",
      description:
        "Learn Biology, Chemistry, Physics and other subjects through structured courses.",
      path: "/dashboard/study-online",
    },
    {
      icon: <Brain size={30} />,
      title: "Story Books",
      description:
        "Read engaging educational, adventure, funny and life-building stories.",
      path: "/dashboard/stories",
    },
    {
      icon: <Gamepad2 size={30} />,
      title: "Educational Games",
      description:
        "Learn through play with fun, curriculum-linked games.",
      comingSoon: true,
    },
    {
      icon: <Lightbulb size={30} />,
      title: "Amazing Facts",
      description:
        "Discover fascinating facts and interesting things about science, life and the world.",
      path: "/dashboard/amazing-facts",
    },
    {
      icon: <Users size={30} />,
      title: "Clubs",
      description:
        "Discover and explore educational clubs, activities and opportunities.",
      path: "/dashboard/clubs",
    },
    {
      icon: <Search size={30} />,
      title: "Dictionary",
      description:
        "Look up words, meanings, pronunciations and useful vocabulary.",
      path: "/dashboard/dictionary",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
          What's inside
        </span>

        <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
          Everything You Need
        </h2>

        <p className="mt-4 text-[15px] leading-relaxed text-slate-500">
          One learning ecosystem designed to help students learn, practise,
          explore and grow.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            onClick={() => {
              if (!feature.comingSoon && feature.path) {
                navigate(feature.path);
              }
            }}
            className={
              feature.comingSoon
                ? "cursor-default"
                : "cursor-pointer"
            }
          >
            <FeatureCard
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
