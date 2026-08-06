export interface CBTQuestionInstance {
  id: string;
  subjectId: string;
  subjectTitle: string;
  topicTitle: string;
  question: string;
  options: string[]; // shuffled
  answer: string;
}

export interface CBTSession {
  questions: CBTQuestionInstance[];
  durationMinutes: number;
  subjectIds: string[];
}

/** Per-subject caps — each selected subject gets its own allowance. */
export const MAX_QUESTIONS_ENGLISH = 60;
export const MAX_QUESTIONS_OTHER_SUBJECT = 40;
export const MAX_SUBJECTS = 9;