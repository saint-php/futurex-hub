export interface CourseQuestion {
  id: string;
  question: string;
  options: string[];
  answer: string;
}

export interface CourseTopic {
  id: string;
  title: string;
  summary: string;
  notes: string;
  questions: CourseQuestion[];
}

export interface Course {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  topics: CourseTopic[];
}