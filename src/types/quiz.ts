export interface QuizQuestion {
  id: string;
  lessonId: string;
  question: string;
  options: string[];
  answer: string;
}