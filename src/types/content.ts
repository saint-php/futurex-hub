/** Shared content types used by admin CRUD and public pages */

export interface AdminStory {
  id: string;
  title: string;
  author: string;
  summary: string;
  story: string;
  category: string;
  cover: string;
  readTime: string;
  age: string;
  difficulty: string;
  xpReward: number;
  coinReward: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminStoryCategory {
  id: string;
  title: string;
  description: string;
  icon?: string;
  color?: string;
}

export interface AdminQuestion {
  id: string;
  question: string;
  options: string[];
  answer: string;
}

export interface AdminTopic {
  id: string;
  title: string;
  summary: string;
  notes: string;
  questions: AdminQuestion[];
}

export interface AdminCourse {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  topics: AdminTopic[];
  createdAt?: string;
  updatedAt?: string;
}