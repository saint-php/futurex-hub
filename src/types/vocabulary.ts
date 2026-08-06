export interface VocabularyCategory {
  id: string;
  title: string;
  description: string;

  icon: string;

  color: string;

  type: "general" | "subject" | "exam";

  lessons?: number;

  totalWords: number;

  featured?: boolean;
}