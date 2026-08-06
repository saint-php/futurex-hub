export interface StudyResource {
  id: string;
  title: string;
  description: string;
  subject: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  type: "Video" | "Article" | "Course" | "Practice";
  url: string;
  duration?: string;
  icon: string;
  color: string;
}

export const studySubjects = [
  { id: "english", title: "English", icon: "📖", color: "bg-blue-100 text-blue-700" },
  { id: "maths", title: "Mathematics", icon: "🔢", color: "bg-violet-100 text-violet-700" },
  { id: "science", title: "Science", icon: "🔬", color: "bg-emerald-100 text-emerald-700" },
  { id: "exam-prep", title: "Exam Prep", icon: "🎯", color: "bg-amber-100 text-amber-700" },
  { id: "tech", title: "Technology", icon: "💻", color: "bg-cyan-100 text-cyan-700" },
  { id: "business", title: "Business", icon: "💼", color: "bg-rose-100 text-rose-700" },
] as const;

export const studyResources: StudyResource[] = [
  {
    id: "eng-1",
    title: "IELTS Speaking Strategies",
    description: "Master fluency, coherence, and vocabulary for IELTS Speaking bands 7+.",
    subject: "english",
    level: "Intermediate",
    type: "Course",
    url: "https://www.youtube.com/results?search_query=IELTS+speaking+strategies",
    duration: "45 min",
    icon: "🗣️",
    color: "bg-blue-50 border-blue-200",
  },
  {
    id: "eng-2",
    title: "Academic Writing Essentials",
    description: "Structure essays, use formal tone, and avoid common grammar traps.",
    subject: "english",
    level: "Intermediate",
    type: "Article",
    url: "https://www.youtube.com/results?search_query=academic+writing+english",
    duration: "30 min",
    icon: "✍️",
    color: "bg-blue-50 border-blue-200",
  },
  {
    id: "eng-3",
    title: "Vocabulary Builder Daily",
    description: "Learn high-frequency exam words with context and collocations.",
    subject: "english",
    level: "Beginner",
    type: "Practice",
    url: "/dashboard/vocabulary",
    duration: "15 min",
    icon: "📝",
    color: "bg-blue-50 border-blue-200",
  },
  {
    id: "math-1",
    title: "Algebra Foundations",
    description: "Equations, inequalities, and problem-solving techniques for UTME/WAEC.",
    subject: "maths",
    level: "Beginner",
    type: "Video",
    url: "https://www.youtube.com/results?search_query=algebra+foundations+WAEC",
    duration: "1 hr",
    icon: "📐",
    color: "bg-violet-50 border-violet-200",
  },
  {
    id: "math-2",
    title: "Exam-Style Word Problems",
    description: "Translate real-world scenarios into equations and solve step by step.",
    subject: "maths",
    level: "Intermediate",
    type: "Practice",
    url: "https://www.youtube.com/results?search_query=math+word+problems+UTME",
    duration: "40 min",
    icon: "🧮",
    color: "bg-violet-50 border-violet-200",
  },
  {
    id: "sci-1",
    title: "Photosynthesis Explained",
    description: "Clear breakdown of the process, equations, and exam-focused tips.",
    subject: "science",
    level: "Beginner",
    type: "Video",
    url: "https://www.youtube.com/results?search_query=photosynthesis+explained+WAEC",
    duration: "25 min",
    icon: "🌿",
    color: "bg-emerald-50 border-emerald-200",
  },
  {
    id: "sci-2",
    title: "Human Body Systems",
    description: "Digestive, circulatory, and respiratory systems for biology exams.",
    subject: "science",
    level: "Intermediate",
    type: "Course",
    url: "https://www.youtube.com/results?search_query=human+body+systems+biology",
    duration: "1.5 hr",
    icon: "🫀",
    color: "bg-emerald-50 border-emerald-200",
  },
  {
    id: "exam-1",
    title: "UTME English Crash Course",
    description: "Comprehension, lexics, and oral forms tailored to JAMB UTME.",
    subject: "exam-prep",
    level: "Intermediate",
    type: "Course",
    url: "https://www.youtube.com/results?search_query=JAMB+UTME+English+crash+course",
    duration: "2 hr",
    icon: "🎓",
    color: "bg-amber-50 border-amber-200",
  },
  {
    id: "exam-2",
    title: "WAEC Past Questions Walkthrough",
    description: "Worked solutions and examiner tips for recent WAEC papers.",
    subject: "exam-prep",
    level: "Advanced",
    type: "Practice",
    url: "https://www.youtube.com/results?search_query=WAEC+past+questions+solutions",
    duration: "1 hr",
    icon: "📋",
    color: "bg-amber-50 border-amber-200",
  },
  {
    id: "tech-1",
    title: "Intro to Coding Logic",
    description: "Variables, loops, and problem-solving — no prior experience needed.",
    subject: "tech",
    level: "Beginner",
    type: "Video",
    url: "https://www.youtube.com/results?search_query=introduction+to+programming+logic",
    duration: "50 min",
    icon: "⌨️",
    color: "bg-cyan-50 border-cyan-200",
  },
  {
    id: "tech-2",
    title: "Digital Literacy Essentials",
    description: "Online safety, research skills, and productive use of the internet.",
    subject: "tech",
    level: "Beginner",
    type: "Article",
    url: "https://www.youtube.com/results?search_query=digital+literacy+for+students",
    duration: "20 min",
    icon: "🛡️",
    color: "bg-cyan-50 border-cyan-200",
  },
  {
    id: "biz-1",
    title: "Personal Finance Basics",
    description: "Budgeting, saving, and understanding interest for young learners.",
    subject: "business",
    level: "Beginner",
    type: "Course",
    url: "https://www.youtube.com/results?search_query=personal+finance+basics+students",
    duration: "35 min",
    icon: "💰",
    color: "bg-rose-50 border-rose-200",
  },
];

export function getResourcesBySubject(subjectId: string): StudyResource[] {
  return studyResources.filter((r) => r.subject === subjectId);
}
