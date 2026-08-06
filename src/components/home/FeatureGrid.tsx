import {
  BookOpen,
  Brain,
  Gamepad2,
  GraduationCap,
  School,
  Atom,
} from "lucide-react";

import FeatureCard from "./FeatureCard";

export default function FeatureGrid() {
  const features = [
    {
      icon: <BookOpen size={30} />,
      title: "Vocabulary Builder",
      description: "Build powerful vocabulary through fun learning.",
    },
    {
      icon: <GraduationCap size={30} />,
      title: "CBT Practice",
      description: "Prepare for JAMB, WAEC and school exams.",
    },
    {
      icon: <Atom size={30} />,
      title: "Science",
      description: "Interactive Biology, Chemistry and Physics.",
    },
    {
      icon: <Brain size={30} />,
      title: "AI Learning",
      description: "Personalised intelligent learning experience.",
    },
    {
      icon: <Gamepad2 size={30} />,
      title: "Educational Games",
      description: "Learn while playing engaging games.",
    },
    {
      icon: <School size={30} />,
      title: "School Portal",
      description: "Results, attendance and management system.",
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
          One platform, six learning apps — built to grow with every stage of
          a student's journey.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
}